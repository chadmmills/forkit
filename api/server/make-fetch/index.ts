import type { ORM } from "api:orm";
import type { RespondWithArgs, RouteHandlerModule } from "api:router";
import { getParamsFromPath } from "../../router/get-params-from-path.ts";
import { makeResponse } from "../../router/make-response.ts";

type Route = {
  path: string;
  handler: RouteHandlerModule<ORM>;
};

type Routable = {
  find(req: Request): Route | undefined;
};

type Config = {
  getParams: (url: string, path: string) => Record<string, string>;
  makeResponse: (responseLike: RespondWithArgs) => Response;
};

export function makeFetch(
  router: Routable,
  orm: ORM,
  config: Config = { getParams: getParamsFromPath, makeResponse },
) {
  return async (req: Request) => {
    const maybeRoute = router.find(req);
    if (maybeRoute) {
      // handler({ req, db, json() {}, setHeader() {}, setStatus() {} }) // or something
      let handler = maybeRoute.handler;
      let handlerFn;
      switch (req.method) {
        case "GET":
          handlerFn = handler.get;
          break;
        case "POST":
          handlerFn = handler.post;
          break;
        case "PATCH":
          handlerFn = handler.patch;
          break;
        case "PUT":
          handlerFn = handler.put;
          break;
        case "DELETE":
          handlerFn = handler.delete;
          break;
      }

      if (!handlerFn) {
        return new Response(null, { status: 404 });
      }

      const params = config.getParams(
        new URL(req.url).pathname,
        maybeRoute.path,
      );

      let payload;
      const chunks: Uint8Array[] = [];
      if (req.body) {
        for await (const chunk of req.body) {
          chunks.push(chunk);
        }
        const concatenatedChunks = new Uint8Array(
          chunks.reduce((acc, chunk) => acc + chunk.length, 0),
        );

        let offset = 0;
        for (const chunk of chunks) {
          concatenatedChunks.set(chunk, offset);
          offset += chunk.length;
        }

        const decoder = new TextDecoder();
        const text = decoder.decode(concatenatedChunks);

        payload = text;
        if (req.headers.get("Content-Type")?.includes("application/json")) {
          payload = JSON.parse(text);
        }
      }

      return handlerFn({
        req,
        orm,
        params,
        respondWith: config.makeResponse,
        payload,
      });
    }

    return new Response("Not found", { status: 404 });
  };
}
