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
  console.info("Call from gen-types.ts");

  let dbSchema = dbSchemaToJSTypes(getSchemaFromDb(db));

  let fileConentLines = [""];
  for (let table of dbSchema) {
    fileConentLines.push(`export type ${table.name} = {`);

    for (let column of table.fields) {
      fileConentLines.push(
        `${column.name}: ${column.type}${!column.isRequired ? " | null" : ""};`,
      );
    }

    fileConentLines.push("}\n");
  }

  writeToFile("api/orm/gen.ts", fileConentLines.join("\n"));
}
