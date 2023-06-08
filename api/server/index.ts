import { type Serve } from "bun"

import { makeFetch } from "./make-fetch"

// const Router = new MakeRouter()
const Router = {
  find(_: Request) {
    return () => new Response("Hello, World!", { status: 200 })
  }
}

const fetch = makeFetch(Router)

export default {
  port: 3008,
  fetch,
} satisfies Serve
