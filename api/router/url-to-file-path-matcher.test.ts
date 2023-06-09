import { describe, test, expect } from "bun:test"

import { urlPathToFilePathMatcher } from "./url-to-file-path-matcher"


describe("url-to-file-path-matcher", () => {
  test("should match root to index.ts", () => {
    expect(urlPathToFilePathMatcher("/", "/index.ts")).toBe(true);
  })

  test("should match param to file path", () => {
    expect(urlPathToFilePathMatcher("/foo/bar", "/foo/:id")).toBe(true);
  })

  test("should match nested param to file path", () => {
    expect(urlPathToFilePathMatcher("/foo/bar/baz", "/foo/:id/baz")).toBe(true);
  })

  test("should not match nested file path", () => {
    expect(urlPathToFilePathMatcher("/foo/bar", "/foo/bee")).toBe(false);
  })
})
