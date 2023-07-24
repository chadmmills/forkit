import { expect, describe, test } from "bun:test";

import { call } from "./gen-types.ts";

describe("gen-types", () => {
  test("call", async () => {
    let writeToFileResult: { path: string; content: string }[] = [];

    let writeToFile = (path: string, content: string) => {
      writeToFileResult.push({ path, content });
    };

    let getSchemaFromDb = () => ({
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
            {
              name: "name",
              type: "text",
              isNullable: true,
              isPrimaryKey: false,
              defaultValue: null,
            },
          ],
        },
      ],
    });

    await call("", {}, { getSchemaFromDb, writeToFile });

    expect(writeToFileResult[0].content).toInclude("name: string | null;");
  });
});
