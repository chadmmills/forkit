type Config = {
  writeFile: () => void;
};

export function call(
  inputs: string[],
  _: any,
  config: Config = { writeFile: () => {} }
) {
  console.info(`Creating migration '${inputs[0]}'...`);
  // Create new migrations file with naming convention
  // uuid_timestamp_migration_name
  config.writeFile();
}
