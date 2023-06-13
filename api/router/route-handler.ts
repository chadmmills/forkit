type Params = Record<string, string>
export type RespondWithArgs = Response | string | { json: Record<string, any> }
type RespondWith = (response: RespondWithArgs) => void
export type RouteHandlerArgs = { req: Request, params: Params, respondWith: RespondWith }
type RouteHandler = (args: RouteHandlerArgs) => Response

export type RouteHandlerModule = {
  get?: RouteHandler
  post?: RouteHandler
  patch?: RouteHandler
  put?: RouteHandler
  delete?: RouteHandler
}

export type RouteHandlerMap = Map<string, RouteHandlerModule>

