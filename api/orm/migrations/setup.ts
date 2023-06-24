type Tdb = {
  query: (q: string) => {
    run: () => void;
  };
};

export function call<T extends Tdb>(db: T) {
  console.info("Setting up database...");

  const createQ = db.query(
    `CREATE TABLE IF NOT EXISTS migrations (
      id STRING PRIMARY KEY,
      applied_at INTEGER NOT NULL
    )`
  );

  createQ.run();
}
