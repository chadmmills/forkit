type DB = {
  query: <T>(sql: string) => {
    all: () => T[];
  };
};

export type Schema = {
  tables: Table[];
};

export type Table = {
  name: string;
  columns: Column[];
};

type Column = {
  name: string;
  type: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  defaultValue: string | number | boolean | null;
};

type SQLliteColumn = {
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
};

export default function getSchema(db: DB): Schema {
  let tables = db
    .query<Table>(`SELECT name FROM sqlite_schema WHERE type = 'table'`)
    .all();

  for (let table of tables) {
    let columns = db
      .query<SQLliteColumn>(`PRAGMA table_info('${table.name}')`)
      .all();

    table.columns = columns.map((column) => ({
      name: column.name,
      type: column.type,
      isNullable: column.notnull === 0,
      isPrimaryKey: column.pk === 1,
      defaultValue: column.dflt_value,
    }));
  }

  return { tables };
}
