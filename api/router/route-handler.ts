type Params = Record<string, string>
export type RespondWithArgs = Response | string | { json: Record<string, any> }
type RespondWith = (response: RespondWithArgs) => Response
export type RouteHandlerArgs = { req: Request, params: Params, respondWith: RespondWith, payload?: unknown }
export type RouteHandlerReturn = Response
type RouteHandler = (args: RouteHandlerArgs) => Response

export type RouteHandlerModule = {
  get?: RouteHandler
  post?: RouteHandler
  patch?: RouteHandler
  put?: RouteHandler
  delete?: RouteHandler
}

export type RouteHandlerMap = Map<string, RouteHandlerModule>

