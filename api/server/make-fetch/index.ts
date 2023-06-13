import type { RespondWithArgs, RouteHandlerModule } from "api:router"
import { getParamsFromPath } from "../../router/get-params-from-path.ts"
import { makeResponse } from "../../router/make-response.ts"

type Route = {
  path: string
  handler: RouteHandlerModule
}

type Routable = {
  find(req: Request): Route | undefined
}

type Config = {
  getParams: (url: string, path: string) => Record<string, string>
  makeResponse: (responseLike: RespondWithArgs) => Response
}

export function makeFetch(router: Routable, config: Config = { getParams: getParamsFromPath, makeResponse }) {
  return (req: Request) => {
    const maybeRoute = router.find(req)
    if (maybeRoute) {
      // handler({ req, db, json() {}, setHeader() {}, setStatus() {} }) // or something
      let handler = maybeRoute.handler
      let handlerFn
      switch (req.method) {
        case "GET":
          handlerFn = handler.get
          break
        case "POST":
          handlerFn = handler.post
          break
        case "PATCH":
          handlerFn = handler.patch
          break
        case "PUT":
          handlerFn = handler.put
          break
        case "DELETE":
          handlerFn = handler.delete
          break
      }

      if (!handlerFn) {
        return new Response(null, { status: 404 })
      }

      const params = config.getParams(new URL(req.url).pathname, maybeRoute.path)

      return handlerFn({ req, params, respondWith: config.makeResponse })
    }

    return new Response("Not found", { status: 404 })
  }
}
