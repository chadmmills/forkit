import { describe, expect, test } from "bun:test";

import { call } from "./generate";

describe("generate migrations file", () => {
  test("should call create file function", () => {
    let fakeFile = "";

    let writeFile = () => {
      fakeFile = "fake file";
    };

    let getID = () => "fake-id";

    call(["create_users"], {}, { writeFile, getID });

    expect(fakeFile).toBe("fake file");
  });
});
