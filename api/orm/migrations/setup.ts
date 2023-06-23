import { DB } from "../db";

const forkitDb = new DB(process.env.NODE_ENV);

export function call() {
  console.info("Called from setup.ts");
}
