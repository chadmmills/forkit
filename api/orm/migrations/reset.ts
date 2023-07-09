import { DB } from "../db.ts";
import { call as setup } from "./setup.ts";

type Tdb = {
  close: () => void;
  filename: string;
  query: (q: string) => {
    run: () => void;
  };
};

type Config = {
  logger: (msg: string) => void;
  next: (inputs: string[], db: Tdb) => void;
};

export async function call<T extends Tdb>(
  _: any,
  db: T,
  config: Config = { logger: console.info, next: setup },
) {
  const { logger, next } = config;

  let newDb = DB.reset(db);
  logger("Removed database...");

  next(_, newDb);
}
