import { Database } from "bun:sqlite";

export class DB {
  private db: Database;
  sqlFile: string;

  constructor(env: string = "development") {
    this.sqlFile = `forkit-${env}.sqlite`;
    this.db = new Database(this.sqlFile);
  }

  instance() {
    return this.db;
  }

  static reset(
    db: { close: () => void; filename: string },
    cmd: (args: string[]) => void = Bun.spawnSync,
  ) {
    db.close();
    let fileName = db.filename;

    cmd(["rm", fileName]);

    return new Database(fileName);
  }
}
