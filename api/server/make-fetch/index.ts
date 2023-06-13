import type { RouteHandlerModule } from "../../router/route-handler.ts"

type Routable = {
  find(req: Request): RouteHandlerModule | undefined
}

export function makeFetch(router: Routable) {
  return (req: Request) => {
    const handler = router.find(req)
    if (handler) {
      // handler({ req, db, json() {}, setHeader() {}, setStatus() {} }) // or something
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

      return handlerFn({ req })
    }

    return new Response("Not found", { status: 404 })
  }
}
