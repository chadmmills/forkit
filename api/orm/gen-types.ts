import dbSchemaToJSTypes from "./db-schema-to-js-types.ts";
import getSchema from "./get-schema.ts";

type Config = {
  getSchemaFromDb: typeof getSchema;
  writeToFile: (path: string, content: string) => void;
};

async function fileWriter(path: string, content: string) {
  let proc = Bun.spawn(["bunx", "prettier", "--stdin-filepath", path], {
    stdin: new Response(content),
  });

  let result = await new Response(proc.stdout).text();
  Bun.write(path, result);
}

export async function call(_: any, db: any, config?: Config) {
  const { getSchemaFromDb = getSchema, writeToFile = fileWriter } =
    config || {};
  console.info("Generating ts types from db schema... gem.ts");

  let dbSchema = getSchemaFromDb(db);
  let dbTypes = dbSchemaToJSTypes(dbSchema);

  let fileConentLines = [
    `import { DB } from "./db.ts"`,
    "",
    "const db = new DB(process.env.NODE_ENV).instance()",
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
    fileConentLines.push(`${dbType.name}: {`);
    fileConentLines.push(`all: async () => {`);
    fileConentLines.push(
      `return db.query<${dbType.name}, any>(\`SELECT * FROM ${dbType.dbTable.name}\`).all()`,
    );
    fileConentLines.push("},");
    fileConentLines.push("},");
  }

  fileConentLines.push("}\n");

  fileConentLines.push("export type ORM = typeof orm");

  writeToFile("api/orm/gen.ts", fileConentLines.join("\n"));
}
