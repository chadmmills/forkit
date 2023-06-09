import { type Serve } from "bun"

import { makeFetch } from "./make-fetch"
import { Router } from "../router"

const tree = {
  lookup(path: string) {
    return () => new Response(path)
  }
}

const router = new Router(tree)

const fetch = makeFetch(router)

export default {
  port: 3008,
  fetch,
} satisfies Serve
