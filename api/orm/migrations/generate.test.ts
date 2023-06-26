import { describe, expect, test } from "bun:test";

import { call } from "./generate";

describe("generate migrations file", () => {
  test("should call create file function", () => {
    let fakeFile = "";

    let writeFile = () => {
      fakeFile = "fake file";
    };

    call([], {}, { writeFile });

    expect(fakeFile).toBe("fake file");
  });
});
