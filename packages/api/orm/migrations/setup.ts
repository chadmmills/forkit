type Tdb = {
  query: (q: string) => {
    run: () => void;
  };
};

export async function call<T extends Tdb>(_: any, db: T) {
  console.info("Setting up database...");

  const createQ = db.query(
    `CREATE TABLE IF NOT EXISTS migrations (
      id TEXT PRIMARY KEY,
      applied_at INTEGER NOT NULL
    )`,
  );

  createQ.run();
}
