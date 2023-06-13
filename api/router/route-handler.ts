type Params = Record<string, string>
type RouteHander = (args: { req: Request, params: Params }) => Response

export type RouteHandlerModule = {
  get?: RouteHander
  post?: RouteHander
  patch?: RouteHander
  put?: RouteHander
  delete?: RouteHander
}

export type RouteHandlerMap = Map<string, RouteHandlerModule>

