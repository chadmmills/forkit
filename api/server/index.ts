import { type Serve } from "bun"

import { makeFetch } from "./make-fetch"
import { Router, RouterTree } from "../router"

const fileMap = new Map<string, () => Response>([ ["/", () => new Response("index") ] ])

const tree = new RouterTree(fileMap)

const router = new Router(tree)

const fetch = makeFetch(router)

export default {
  port: 3008,
  fetch,
} satisfies Serve
