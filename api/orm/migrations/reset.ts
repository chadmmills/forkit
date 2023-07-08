type Tdb = {
  filename: string;
};

type Config = {
  logger: (msg: string) => void;
  cmd: (parts: string[]) => void;
};

export async function call<T extends Tdb>(
  _: any,
  db: T,
  config: Config = { logger: console.info, cmd: Bun.spawnSync },
) {
  const { logger, cmd } = config;
  // Bun run command to remove database
  cmd(["rm", db.filename]);
  logger("Removed database...");
}
