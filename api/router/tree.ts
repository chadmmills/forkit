import { urlPathToFilePathMatcher } from "./url-to-file-path-matcher.ts";

type HandlerMap<T> = Map<string, T>;
type PathMatcher = (urlPath: string, filePath: string) => boolean;

type RouterTreeOptions = {
  pathMatcher: PathMatcher;
};

export class RouterTree<T> {
  handlerMap: HandlerMap<T>;
  pathMatcher: PathMatcher;

  constructor(
    handlerMap: HandlerMap<T>,
    options: RouterTreeOptions = { pathMatcher: urlPathToFilePathMatcher }
  ) {
    this.handlerMap = handlerMap;
    this.pathMatcher = options.pathMatcher;
  }

  lookup(urlPath: string) {
    for (const [filePath, handler] of this.handlerMap) {
      if (this.pathMatcher(urlPath, filePath)) {
        return { path: filePath, handler };
      }
    }
  }
}
