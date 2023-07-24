import { getFilesFromDirectory } from "api:lib/get-files-from-directory";
import type { Migration } from "./";

type Config = {
  getMigrationFiles: () => string[];
  moduleImport: (path: string) => Promise<{ down?: () => string }>;
  logger?: (msg: string) => void;
};

function getFiles(): string[] {
  return getFilesFromDirectory("api/orm/migrations/files");
}

async function importer(path: string): Promise<{ down?: () => string }> {
  console.log("cwd", process.cwd());
  return await import(process.cwd() + "/" + path);
}

type DB = {
  query: <T>(sql: string) => {
    get: (id: string) => T | undefined | null;
    run: () => void;
  };
};

export async function call<T extends DB>(_: any, db: T, config?: Config) {
  const {
    getMigrationFiles = getFiles,
    moduleImport = importer,
    logger = console.log,
  } = config || {};

  const migrationFilePathsDesc = getMigrationFiles().sort().reverse();

  for (const filePath of migrationFilePathsDesc) {
    let migrationId = filePath.split("_")[1];
    let stmt = db.query<Migration>("SELECT * FROM migrations WHERE id = ?");
    let result = stmt.get(migrationId);

    if (result?.applied_at) {
      const migrateModule = await moduleImport(filePath);

      try {
        if (!migrateModule.down) {
          throw new Error(
            `Migration file ${filePath} does
            not have a down function`,
          );
        }

        let migrationDownStmt = db.query(migrateModule.down());
        migrationDownStmt.run();
        let uuid = migrationId;
        if (result?.id) {
          let updateStmt = db.query(
            `UPDATE migrations SET applied_at = null WHERE id = '${uuid}'`,
          );
          updateStmt.run();
        }

        logger(`Migration successfully rolled back - ${filePath}`);
        break;
      } catch (e) {
        console.error("Unable to run rollback migration for ", filePath, e);
        break;
      }
    }
  }
}
