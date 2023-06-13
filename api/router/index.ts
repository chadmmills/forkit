export { RouterTree } from "./tree.ts"
export { mapRouteHandlersToFilePaths } from "./map-route-handlers-to-file-paths.ts"

export type { RouteHandlerArgs } from "./route-handler.ts"

type RouterableTree<T> = {
  lookup(path: string): T | undefined
}

export class Router<T> {
  routerTree: RouterableTree<T>;

  constructor(routerTree: RouterableTree<T>) {
    this.routerTree = routerTree;
  }

  find(req: Request) {
    return this.routerTree.lookup(new URL(req.url).pathname)
  }
}

