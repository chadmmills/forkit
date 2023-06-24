import { expect, describe, test } from "bun:test";

import { call } from "./setup.ts";

describe("db:setup", () => {
  test("should create a database", () => {
    const DB = { query: () => ({ run: () => {} }) };

    expect(() => call(DB)).not.toThrow();
  });
});
