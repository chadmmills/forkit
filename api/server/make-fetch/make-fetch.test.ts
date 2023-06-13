import { describe, test, expect, mock } from "bun:test"

import { makeFetch } from './';

describe("makeFetch", () => {
  test("returns undefined if no route is found", () => {
    const router = { find: () => undefined }

    expect(
      makeFetch(router)(new Request("example.com")).status
    ).toBe(404)
  })

  test("returns a route from Router", () => {
    const get = () => new Response("Hello, World!", { status: 200 })
    const router = { find() { return { path: "/hey", handler: { get } } } }

    expect(
      makeFetch(router)(new Request("example.com")).status
    ).toBe(200)
  })
})


