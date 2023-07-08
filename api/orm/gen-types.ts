import getSchema from "./get-schema.ts";

type Config = {
  getSchemaFromDb: typeof getSchema;
};

export async function call(_: any, db: any, config?: Config) {
  const { getSchemaFromDb = getSchema } = config || {};
  console.info("Call from gen-types.ts");

  console.log(getSchemaFromDb(db));
}
