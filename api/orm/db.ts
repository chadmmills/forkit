import { Database } from "bun:sqlite";

export class DB {
  private db: Database;
  constructor(env: string = "development") {
    this.db = new Database(`forkit-${env}.sqlite`);
  }

  instance() {
    return this.db;
  }
}
