import { getFilesFromDirectory } from "api:lib/get-files-from-directory";

import type { Migration } from "./";

type Config = {
  getMigrationFiles: () => string[];
  logger: (msg: string) => void;
};

function getFiles(): string[] {
  return getFilesFromDirectory("orm/migrations/files");
}

type DB = {
  query: <T>(sql: string) => {
    all: () => T[];
  };
  run: (sql: string) => void;
};

export async function call<T extends DB>(_: any, db: T, config?: Config) {
  const { getMigrationFiles = getFiles, logger = console.log } = config || {};

  const migrationFilesNames = getMigrationFiles().sort();

  const migrations = db.query<Migration>("SELECT * FROM migrations").all();

  for (let migrationFileName of migrationFilesNames) {
    let [_, id, ...rest] = migrationFileName.split("_");
    let migrationName = rest.join("_").split(".")[0];

    let migrationRecord = migrations.find((m) => m.id === id);

    logger(
      `[${migrationRecord?.applied_at ? "x" : " "}] ${id} - ${migrationName}`,
    );
  }
}
