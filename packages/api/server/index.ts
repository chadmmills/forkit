import { type Serve } from "bun";

import { makeFetch } from "./make-fetch";
import {
  mapRouteHandlersToFilePaths,
  RouteHandlerModule,
  Router,
  RouterTree,
} from "../router";
import { orm } from "api:orm";
import type { ORM } from "api:orm";
import { getFilesFromDirectory } from "../lib/get-files-from-directory";

const BASE_ROUTE_PATH = process.cwd() + "/routes";

const fileMap = await mapRouteHandlersToFilePaths(
  BASE_ROUTE_PATH,
  getFilesFromDirectory(BASE_ROUTE_PATH),
);

const tree = new RouterTree<RouteHandlerModule<ORM>>(fileMap);

const router = new Router(tree);

const fetch = makeFetch(router, orm);

export default {
  port: 3008,
  fetch: middlewares(fetch, logRequest),
} satisfies Serve;


type MiddlewareFn = (req: Request, res: Response) => Promise<Response>;

function middlewares(...fns: MiddlewareFn[]) {
  return async function (req: Request): Promise<Response> {
    let current: Response = new Response(null, { status: 404 });
    for (let fn of fns) {
      current = await fn(req, current);
    }

    return current;
  };
}

function logRequest(req: Request, res: Response): Promise<Response> {
  console.info(req.method + ": " + new URL(req.url).pathname + " " + res.status);

  return Promise.resolve(res);
}
