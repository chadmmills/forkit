import { Database } from "bun:sqlite";

import { call as setup } from "./migrations/setup.ts";
import { call as reset } from "./migrations/reset.ts";
import { call as schema } from "./migrations/schema.ts";
import { call as migrate } from "./migrations/migrate.ts";
import { call as migrateDown } from "./migrations/migrate-down.ts";
import { call as migrateList } from "./migrations/migrate-list.ts";
import { call as generate } from "./migrations/generate.ts";
import { call as generateTypes } from "./gen-types.ts";

import { DB } from "./db.ts";

const db = new DB(process.env.NODE_ENV).instance();

type Args = string[];

export type CallFn = (
  inputs: Args,
  db: Database,
  config?: any,
) => Promise<void>;

const tasks: { [key: string]: CallFn } = {
  setup,
  reset,
  schema,
  migrate,
  migrateDown,
  migrateList,
  generate,
  generateTypes,
};

const task = process.argv[2].split("--task=")[1];
const cliArgs = process.argv.slice(3);

const callFn = tasks[task];

if (callFn) {
  console.info("Running forkit CLI command...");
  await callFn(cliArgs, db);
} else {
  console.error("No CLI task found!");
}

db.close();
