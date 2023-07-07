import { getFilesFromDirectory } from "api:lib/get-files-from-directory";
import type { Migration } from "./";

type Config = {
  getMigrationFiles: () => string[];
  moduleImport: (
    path: string,
  ) => Promise<{ up: () => string; down?: () => string }>;
  logger?: (msg: string) => void;
};

function getFiles(): string[] {
  return getFilesFromDirectory("api/orm/migrations/files");
}

async function importer(path: string) {
  console.log("cwd", process.cwd());
  return await import(process.cwd() + "/" + path);
}

type DB = {
  query: <T>(sql: string) => {
    get: (id: string) => T | undefined | null;
  };
  run: (sql: string) => void;
};

export async function call<T extends DB>(_: any, db: T, config?: Config) {
  const {
    getMigrationFiles = getFiles,
    moduleImport = importer,
    logger = console.log,
  } = config || {};

  const migrationFilePaths = getMigrationFiles();

  for (const filePath of migrationFilePaths) {
    let migrationId = filePath.split("_")[1];
    let stmt = db.query<Migration>("SELECT * FROM migrations WHERE id = ?");
    let result = stmt.get(migrationId);

    if (!result?.applied_at) {
      const migrateModule = await moduleImport(filePath);
      try {
        db.run(migrateModule.up());
        let time = Date.now();
        let uuid = migrationId;
        if (result?.id) {
          db.run(
            `UPDATE migrations SET applied_at = ${time} WHERE id = '${uuid}'`,
          );
        } else {
          db.run(
            `INSERT INTO migrations (id, applied_at) VALUES ('${uuid}', ${time})`,
          );
        }

        logger(`Migration successful - ${filePath}`);
      } catch (e) {
        console.error("Unable to run migration for ", filePath, e);
      }
    }
  }
}
