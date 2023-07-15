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
{{typeName}}: {
  all() {
    return db.query<{{typeName}}, any>("SELECT * FROM {{tableName}}").all();
  },
  create(data: ToOptional<{{typeName}}>) {
    return db.query<{{typeName}}, any>(
      \`INSERT INTO {{tableName}} (\${Object.keys(data).join(", ")}) VALUES (\${Object.keys(data).map((k) => "$" + k).join(", ")})\`
    ).run(data);
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
  for (let table of dbTypes) {
    fileConentLines.push(`export type ${table.name} = {`);

    for (let column of table.fields) {
      fileConentLines.push(
        `${column.name}: ${column.type}${!column.isRequired ? " | null" : ""};`,
      );
    }

    fileConentLines.push("}\n");
  }

  // Generate orm
  fileConentLines.push("export const orm = {");

  for (let dbType of dbTypes) {
    fileConentLines.push(ormMethodsFromTemplate(dbType));
    // fileConentLines.push(`${dbType.name}: {`);
    // fileConentLines.push(`all() {`);
    // fileConentLines.push(
    //   `return db.query<${dbType.name}, any>(\`SELECT * FROM ${dbType.dbTable.name}\`).all()`,
    // );
    // fileConentLines.push("},");
    // fileConentLines.push("},");
    // }
  }

  fileConentLines.push("}\n");

  fileConentLines.push("export type ORM = typeof orm");

  await writeToFile("api/orm/gen.ts", fileConentLines.join("\n"));
}
