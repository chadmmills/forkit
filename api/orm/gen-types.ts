import dbSchemaToJSTypes from "./db-schema-to-js-types.ts";
import getSchema from "./get-schema.ts";

type Config = {
  getSchemaFromDb: typeof getSchema;
  writeToFile: (path: string, content: string) => void;
  ormMethodsFromTemplate?: (dbType: {
    name: string;
    dbTable: { name: string };
  }) => string;
};

async function fileWriter(path: string, content: string) {
  let proc = Bun.spawn(["bunx", "prettier", "--stdin-filepath", path], {
    stdin: new Response(content),
  });

  let result = await new Response(proc.stdout).text();
  Bun.write(path, result);
}

function makeORMMethodsFromTemplate(dbType: {
  name: string;
  dbTable: { name: string };
}) {
  return `
{{tableName}}: {
  all() {
    return db.query<{{typeName}}, any>("SELECT * FROM {{tableName}}").all();
  },
  create(data: {{typeName}}Input) {
    const id = randomUUID();
    const dataWithId: {{typeName}}Input & { id: string } = { ...data, id };
    const columns = Object.keys(dataWithId).join(", ");
    const preparedValues = Object.keys(dataWithId).map((k) => "$" + k).join(", ");
    const preparedValuesObject = Object.keys(dataWithId).reduce(
      (acc, key) => {
        acc["$" + key] = dataWithId[key as keyof {{typeName}}];
        return acc;
      },
      {} as Record<string, any>,
    );

    return db.query<{{typeName}}, any>(
      \`INSERT INTO {{tableName}} (\${columns}) VALUES (\${preparedValues})\`
    ).run(preparedValuesObject);
  },
},`
    .replace(/{{typeName}}/g, dbType.name)
    .replace(/{{tableName}}/g, dbType.dbTable.name);
}

export async function call(_: any, db: any, config?: Config) {
  const {
    getSchemaFromDb = getSchema,
    writeToFile = fileWriter,
    ormMethodsFromTemplate = makeORMMethodsFromTemplate,
  } = config || {};
  console.info("Generating ts types from db schema... gem.ts");

  let dbSchema = getSchemaFromDb(db);
  let dbTypes = dbSchemaToJSTypes(dbSchema);

  let fileConentLines = [
    'import { randomUUID } from "node:crypto";',
    "",
    `import { DB } from "./db.ts"`,
    "",
    "const db = new DB(process.env.NODE_ENV).instance()",
    "",
    `type ToOptional<T> = {
    [K in keyof T]-?: T[K] extends null | undefined ? T[K] | undefined : T[K];
  };`,
    "",
  ];

  // Generate Types
  for (let dbType of dbTypes) {
    fileConentLines.push(`export type ${dbType.name} = {`);

    for (let column of dbType.fields) {
      fileConentLines.push(
        `${column.name}: ${column.type}${!column.isRequired ? " | null" : ""};`,
      );
    }

    fileConentLines.push("}\n");

    fileConentLines.push(
      `export type ${dbType.name}Input = ToOptional<Omit<${dbType.name}, "id">>\n`,
    );
  }

  // Generate orm
  fileConentLines.push("export const orm = {");

  for (let dbType of dbTypes) {
    fileConentLines.push(ormMethodsFromTemplate(dbType));
  }

  fileConentLines.push("}\n");

  fileConentLines.push("export type ORM = typeof orm");

  await writeToFile("api/orm/gen.ts", fileConentLines.join("\n"));
}
