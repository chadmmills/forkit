import { expect, test, describe } from "vitest";
import { FormData } from "@remix-run/node";

import validate from "./";

describe("validate()", () => {
  test("should get types right", () => {
    let fd = new FormData();
    fd.set("name", "John");

    let validation = validate({ name: true }, fd);

    expect(validation.isValid).toBeTruthy();
  });

  test("should fail required", () => {
    let fd = new FormData();
    fd.set("label", "John");

    let validation = validate({ name: true }, fd);

    expect(validation.isValid).toBeFalsy();
    expect(validation.errors.name).toEqual(["is required"]);
  });

  test("should handle multiple fields", () => {
    let fd = new FormData();
    fd.set("name", "John");

    let validation = validate({ name: true, pw: true }, fd);

    expect(validation.isValid).toBeFalsy();
  });
});
