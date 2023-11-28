import { Request, FormData } from "@remix-run/node";
import { expect, test, describe } from "vitest";

import AuthSession from ".";

describe("AuthSession", () => {
  test("Should show errors when no email is provided", async () => {
    let req = new Request("http://example.com", {
      method: "POST",
      body: new FormData(),
    });

    let session = new AuthSession(req);
    await session.create();

    expect(session.isValid).toBeFalsy();
    expect(session.errors.email).toEqual(["is required"]);
  });

  test("it should show errors from requestJWTForSession", async () => {
    let fd = new FormData();
    fd.set("email", "hey");
    fd.set("password", "password");

    let jwtRequest = async () => {
      return { isError: true, errors: { "*": ["Email/pw combo is invalid"] } };
    };

    let req = new Request("http://example.com", {
      method: "POST",
      body: fd,
    });

    let session = new AuthSession(req, { requestJWTForSession: jwtRequest });
    await session.create();

    expect(session.isValid).toBeFalsy();
    expect(session.errors["*"]).toEqual(["Email/pw combo is invalid"]);
  });
});
