import { expect, describe, test } from "bun:test";

import { call } from "./migrate";

describe("migrate", () => {
  test("migration file has been run", () => {
    let calls = {
      moduleImport: 0,
    };

    let db = {
      query: () => ({
        get: (): any => {},
      }),
      run: () => {},
      exec: () => {},
    };

    let moduleImport = async () => ({
      up: () => {
        calls.moduleImport++;
        return "CREATE TABLE users (id INTEGER PRIMARY KEY)";
      },
    });

    let files = ["1234_users.ts"];

    call([], db, { getMigrationFiles: () => files, moduleImport });

    expect(calls.moduleImport).toBe(0);
  });

  test("migration file has not been run", async () => {
    let runCallArgs: string[] = [];
    let calls = {
      moduleImport: 0,
    };

    let db = {
      query: () => ({
        get: (_: string): any => undefined,
      }),
      run: (stmt: string) => {
        runCallArgs.push(stmt);
      },
    };

    let moduleImport = async () => ({
      up: () => {
        calls.moduleImport++;
        return "CREATE TABLE users (id INTEGER PRIMARY KEY)";
      },
    });

    let files = ["1234_users.ts"];

    await call([], db, { getMigrationFiles: () => files, moduleImport });

    expect(calls.moduleImport).toBe(1);
    expect(runCallArgs[0]).toMatch(/CREATE TABLE users/);
    expect(runCallArgs[1]).toMatch(/INSERT INTO migrations/);
  });

  test("Should re-apply migration if already exists but not applied", async () => {
    let runCallArgs: string[] = [];

    let db = {
      query: () => ({
        get: (_: string): any => ({
          id: "1234",
        }),
      }),
      run: (stmt: string) => {
        runCallArgs.push(stmt);
      },
    };

    let moduleImport = async () => ({
      up: () => {
        return "CREATE TABLE users (id INTEGER PRIMARY KEY)";
      },
    });

    let files = ["time_1234_users.ts"];

    await call([], db, { getMigrationFiles: () => files, moduleImport });

    expect(runCallArgs[1]).toMatch(/UPDATE migrations SET applied_at = \d+/);
  });
});
