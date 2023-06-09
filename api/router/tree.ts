type HandlerMap = Map<string, () => Response>;
type PathMatcher = (urlPath: string, filePath: string) => boolean;

type RouterTreeOptions = {
  pathMatcher: PathMatcher;
}

const pathMatcher: PathMatcher = (_, __) => true

export class RouterTree {
  handlerMap: HandlerMap;
  pathMatcher: PathMatcher;

  constructor(handlerMap: HandlerMap, options: RouterTreeOptions = { pathMatcher }) {
    this.handlerMap = handlerMap;
    this.pathMatcher = options.pathMatcher;
  }

  lookup(urlPath: string) {
    for (const [filePath, handler] of this.handlerMap) {
      if (this.pathMatcher(urlPath, filePath)) {
        return handler;
      }
    }
  }
}
