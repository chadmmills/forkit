type Params = Record<string, string>
export type RouteHandlerArgs = { req: Request, params: Params }
type RouteHandler = (args: RouteHandlerArgs) => Response

export type RouteHandlerModule = {
  get?: RouteHandler
  post?: RouteHandler
  patch?: RouteHandler
  put?: RouteHandler
  delete?: RouteHandler
}

export type RouteHandlerMap = Map<string, RouteHandlerModule>

