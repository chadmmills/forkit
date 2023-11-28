import { randomUUID } from "node:crypto";

type Config = {
  writeFile: (path: string, data: string) => void;
  getID: () => string;
  logger: (message: string) => void;
};

export async function call(
  inputs: string[],
  _: any,
  config: Config = {
    writeFile: Bun.write,
    getID: randomUUID,
    logger: console.info,
  },
) {
  config.logger(`Creating migration '${inputs[0]}':`);

  const timestamp = Date.now();
  const uuid = config.getID();
  const fileName = `${timestamp}_${uuid}_${inputs[0]}.ts`;
  const path = `orm/migrations/files/${fileName}`;

  config.logger(` '${fileName}'`);

  const contents = `export function up(): string {
  // Put your migration code here.
}

export function down(): string | void {
}
`;

  config.writeFile(path, contents);
}
