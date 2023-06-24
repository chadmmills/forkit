import { Database } from "bun:sqlite";

export class DB {
  db: Database;
  constructor(env: string = "development") {
    this.db = new Database(`forkit-${env}.sqlite`);
  }

  instance() {
    return this.db;
  }
}
