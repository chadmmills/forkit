import { call as setup } from "./migrations/setup.ts";
import { call as migrate } from "./migrations/migrate.ts";
import { call as generate } from "./migrations/generate.ts";
import { call as generateTypes } from "./gen-types.ts";

const tasks: { [key: string]: () => void } = {
  setup,
  migrate,
  generate,
  generateTypes,
};

const task = process.argv[2].split("--task=")[1];

const callFn = tasks[task];

if (callFn) {
  console.info("Running forkit CLI command...");
  callFn();
} else {
  console.error("No CLI task found!");
}
