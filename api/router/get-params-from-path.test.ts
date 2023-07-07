import { expect, test, describe } from "bun:test";

import { getParamsFromPath } from "./get-params-from-path";

describe("getParamsFromPath", () => {
  test("should return empty object if no path", () => {
    expect(getParamsFromPath("/", "/index.ts")).toEqual({});
  });

  test("should return empty object if no params segments", () => {
    expect(getParamsFromPath("/foo", "/foo.ts")).toEqual({});
  });

  test("should return object with params based on path", () => {
    expect(
      getParamsFromPath("/foo/bar/lax/got", "/foo/$id/lax/$name.ts"),
    ).toEqual({ id: "bar", name: "got" });
  });
});
