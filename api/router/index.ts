type RouterableTree = {
  lookup(path: string): (() => Response) | undefined
}

export class Router {
  routerTree: RouterableTree;

  constructor(routerTree: RouterableTree) {
    this.routerTree = routerTree;
  }

  find(req: Request) {
    return this.routerTree.lookup(new URL(req.url).pathname)
  }
}

