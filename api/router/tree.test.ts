import { describe, test, expect } from "bun:test";

import { RouterTree } from "./tree.ts";

describe("Router Tree", () => {
  test("should take in a map of paths to handlers", () => {
    let fileMap = new Map<string, () => Response>([["/", () => new Response("Hello World!") ]]);

    let pathMatcher = (_: string, __: string) => true;

    const tree = new RouterTree(fileMap, { pathMatcher } )

    expect(tree.lookup("/")).toBeDefined()
  })

  test("should take a map and return nothing if handler is not found", () => {
    let fileMap = new Map<string, () => Response>();
    let pathMatcher = (_: string, __: string) => false;

    const tree = new RouterTree(fileMap, { pathMatcher } )

    expect(tree.lookup("/")).toBeUndefined()
  })
})
