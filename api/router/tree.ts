import { urlPathToFilePathMatcher } from "./url-to-file-path-matcher.ts"

type HandlerMap = Map<string, () => Response>;
type PathMatcher = (urlPath: string, filePath: string) => boolean;

type RouterTreeOptions = {
  pathMatcher: PathMatcher;
}

export class RouterTree {
  handlerMap: HandlerMap;
  pathMatcher: PathMatcher;

  constructor(handlerMap: HandlerMap, options: RouterTreeOptions = { pathMatcher: urlPathToFilePathMatcher }) {
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
