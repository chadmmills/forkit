import { Database } from "bun:sqlite";

export async function call<T extends Database>(_: any, db: T) {
  console.info("Printing out schema...");

  const createQ = db.query<{ name: string }, any>(
    `SELECT name, sql
    FROM sqlite_schema
    WHERE type = 'table';`
  );

  const result = createQ.all();

  for (const table of result) {
    const tableInfoQ = db
      .query<
        {
          name: string;
          type: string;
          notnull: number;
          dflt_value: string | null;
          pk: number;
        },
        any
      >(`PRAGMA table_info(${table.name});`)
      .all();

    console.info(`\nTable: ${table.name}`);
    for (const tableInfoRow of tableInfoQ) {
      console.info(
        `  ${tableInfoRow.name} (${tableInfoRow.type}) ${
          tableInfoRow.pk === 1 ? "*" : ""
        }`
      );
    }
  }
}
