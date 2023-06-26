import { Database } from "bun:sqlite";

import { call as setup } from "./migrations/setup.ts";
import { call as schema } from "./migrations/schema.ts";
import { call as migrate } from "./migrations/migrate.ts";
import { call as generate } from "./migrations/generate.ts";
import { call as generateTypes } from "./gen-types.ts";

import { DB } from "./db.ts";

const db = new DB(process.env.NODE_ENV).instance();

type CallFn = (db: Database) => void;

const tasks: { [key: string]: CallFn } = {
  setup,
  schema,
  migrate,
  generate,
  generateTypes,
};

const task = process.argv[2].split("--task=")[1];

const callFn = tasks[task];

if (callFn) {
  console.info("Running forkit CLI command...");
  callFn(db);
} else {
  console.error("No CLI task found!");
}

db.close();
