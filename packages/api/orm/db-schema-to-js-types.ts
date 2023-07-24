import { Schema, Table } from "./get-schema.ts";

type JSType = {
  name: string;
  fields: JSField[];
  dbTable: Table;
};

type JSField = {
  name: string;
  type: string;
  isRequired: boolean;
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function sigularize(str: string) {
  return str.replace(/s$/, "");
}

function toJSType(sqlType: string): string {
  switch (sqlType.toLowerCase()) {
    case "text":
      return "string";
    case "string":
      return "string";
    case "integer":
      return "number";
    case "real":
      return "number";
    case "blob":
      return "Uint8Array";
    case "boolean":
      return "boolean";
    default:
      return "any";
  }
}

export default function dbSchemaToJSTypes(schema: Schema): JSType[] {
  return schema.tables.map((table) => ({
    // Keep reference to the db table data
    dbTable: table,
    name: capitalize(sigularize(table.name)),
    fields: table.columns.map((column) => ({
      name: column.name,
      type: toJSType(column.type),
      isRequired: !column.isNullable,
    })),
  }));
}
