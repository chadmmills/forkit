type Params = Record<string, string>;
export type RespondWithArgs = Response | string | { json: Record<string, any> };
type RespondWith = (response: RespondWithArgs) => Response;
export type RouteHandlerArgs<T> = {
  req: Request;
  orm: T;
  params: Params;
  respondWith: RespondWith;
  payload?: unknown;
};
export type RouteHandlerReturn = Response;
type RouteHandler<T> = (args: RouteHandlerArgs<T>) => Response;

export type RouteHandlerModule<T> = {
  get?: RouteHandler<T>;
  post?: RouteHandler<T>;
  patch?: RouteHandler<T>;
  put?: RouteHandler<T>;
  delete?: RouteHandler<T>;
};

export type RouteHandlerMap<T> = Map<string, RouteHandlerModule<T>>;
