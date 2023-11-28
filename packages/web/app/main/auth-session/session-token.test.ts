import { expect, test, describe } from "vitest";

import { create } from "./session-token";

describe("create session token", () => {
  test("should return a jwt if email and password are valid", async () => {
    expect(
      create({
        email: "ok",
        password: "ok",
      })
    ).toEqual("jwt");
  });
});
