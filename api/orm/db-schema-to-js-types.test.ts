import { describe, expect, test } from "bun:test";
import dbSchemaToJSTypes from "./db-schema-to-js-types";

describe("db-schema-to-js-types", () => {
  test("should convert schema to types", () => {
    let schema = {
      tables: [
        {
          name: "users",
          columns: [
            {
              name: "id",
              type: "text",
              isNullable: false,
              isPrimaryKey: true,
              defaultValue: null,
            },
          ],
        },
      ],
    };

    expect(dbSchemaToJSTypes(schema)).toEqual([
      {
        name: "User",
        fields: [
          {
            name: "id",
            type: "string",
            isRequired: true,
          },
        ],
      },
    ]);
  });
});
