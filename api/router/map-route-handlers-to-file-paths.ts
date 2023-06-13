import type { RouteHandlerModule, RouteHandlerMap } from "./route-handler"


type RouteHandlerMapConfig = {
  importRouteModule: (path: string) => Promise<unknown>
  validate: typeof validateRouteHandler
}

function validateRouteHandler(path: string, handler: unknown): RouteHandlerModule {
  if (!handler) {
    throw new Error(`${path} Route handler is undefined`)
  }

  if (typeof handler === "object") {
    const handlerObject = handler as RouteHandlerModule
    if (!handlerObject.get && !handlerObject.post && !handlerObject.patch && !handlerObject.put && !handlerObject.delete) {
      throw new Error(`${path} - Route handler is an object, but does not have a get, post, patch, put, or delete method`)
    }

    return handlerObject
  }

  throw new Error(`${path} Route handler is not valid`)
}


export async function mapRouteHandlersToFilePaths(basePath: string, paths: string[], config: RouteHandlerMapConfig = {
  importRouteModule: async (path: string) => await import(path),
  validate: validateRouteHandler}): Promise<RouteHandlerMap> {
  let fileMap = new Map<string, RouteHandlerModule>()

  await Promise.all(paths.map(async (path) => {
    const handler = config.validate(path, await config.importRouteModule(path))
    const route = path.replace(basePath, "").replace(".ts", "")
    fileMap.set(route, handler)
  }))

  return fileMap
}
