import { describe, test, expect } from "bun:test"

import { makeFetch } from './';

describe("makeFetch", () => {
  test("returns a fetchable function for bun Serve", () => {
    const router = { find: () => undefined }

    expect(
      makeFetch(router)
    ).toBeInstanceOf(Function)
  })

  test("returns undefined if no route is found", () => {
    const router = { find: () => undefined }

    expect(true).toBe(false)

    expect(
      makeFetch(router)(new Request("example.com")).status
    ).toBe(404)
  })

  test("returns a route from Router", () => {
    const router = { find() { return () => new Response("Hello, World!", { status: 200 }) } }

    expect(
      makeFetch(router)(new Request("example.com")).status
    ).toBe(200)

  })
})


