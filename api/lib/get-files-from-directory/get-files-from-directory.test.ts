import { describe, test, expect } from "bun:test";

import { getFilesFromDirectory } from "./";

describe("getFilesFromDirectory()", () => {
  test("should return an array of files", () => {
    const readFileFn = () => [{ path: "/file.txt", isDirectory: false }];
    const files = getFilesFromDirectory("/User/some/path", readFileFn);

    expect(files).toBeInstanceOf(Array);
  });

  test("should handle nested directories", () => {
    let run = 0
    const readFileFn = () => {
      if (run > 1) {
        return [{ path: "/folder-file.txt", isDirectory: false }];
      }
      run++
      return [{ path: "/folder", isDirectory: true }, { path: "/file.txt", isDirectory: false }];
    }

    const files = getFilesFromDirectory("/User/some/path", readFileFn);

    expect(files).toEqual(["/folder", "/file.txt"]);
  })
})
