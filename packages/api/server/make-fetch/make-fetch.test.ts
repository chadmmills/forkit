import { describe, test, expect } from "bun:test";

import { makeFetch } from "./";

describe("makeFetch", () => {
  test("returns undefined if no route is found", async () => {
    const router = { find: () => undefined };

    expect(
      (await makeFetch(router, {})(new Request("http://example.com"))).status,
    ).toBe(404);
  });

  test("returns a route from Router", async () => {
    const get = () => new Response("Hello, World!", { status: 200 });
    const router = {
      find() {
        return { path: "/hey", handler: { get } };
      },
    };
    const getParams = () => ({});
    const makeResponse = () => new Response("Hello, World!", { status: 200 });

    expect(
      (
        await makeFetch(router, { getParams, makeResponse })(
          new Request("http://example.com"),
        )
      ).status,
    ).toBe(200);
  });
});
