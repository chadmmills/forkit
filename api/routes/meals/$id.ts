import type { RouteHandlerArgs } from "api:router"

export function get({ req, params }: RouteHandlerArgs) {
  console.log("Params from ", req.url, params);

  return new Response(`Hello from ${params.id}`);
}
