import { describe, test, expect } from "bun:test";
import { mapRouteHandlersToFilePaths } from "./map-route-handlers-to-file-paths";
import type { RouteHandlerModule } from "./route-handler";

describe("mapRouteHandlersToFilePaths()", () => {
  test("should return an Map of route handlers to file paths", async () => {
    let basePath = "/something/";
    let paths = ["/something/here.ts"];
    let importRouteModule = async () => ({ get: () => new Response("hello") });
    let validate = (_: string, mod: unknown) => mod as RouteHandlerModule<any>;
    let map = await mapRouteHandlersToFilePaths(basePath, paths, {
      importRouteModule,
      validate,
    });

    expect(map.get("here")).toBeDefined();
  });

  test("should throw if the route handler is invalid", async () => {
    let basePath = "/something/";
    let paths = ["/something/here.ts"];
    let importRouteModule = async () => ({});
    let validate = (_: string, __: unknown) => {
      throw new Error("Invalid");
    };

    try {
      await mapRouteHandlersToFilePaths(basePath, paths, {
        importRouteModule,
        validate,
      });
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
