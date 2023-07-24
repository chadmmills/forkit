import { Database } from "bun:sqlite";

import getSchema from "../get-schema";

type Config = {
  getSchemaFromDb: typeof getSchema;
};

export async function call<T extends Database>(_: any, db: T, config?: Config) {
  const { getSchemaFromDb = getSchema } = config || {};

  console.info("Printing out schema...");

  const tables = getSchemaFromDb(db).tables;

  for (const table of tables) {
    console.info(`\nTable: ${table.name}`);
    for (const tableInfoRow of table.columns) {
      console.info(
        `  ${tableInfoRow.name} (${tableInfoRow.type}) ${
          tableInfoRow.isPrimaryKey ? "pk" : tableInfoRow.isNullable ? "" : "*"
        }`,
      );
    }
  }
}
