import { Database } from "bun:sqlite";

export class DB {
  constructor(env: string = "development") {
    return new Database(`forkit-${env}.sqlite`);
  }
}
