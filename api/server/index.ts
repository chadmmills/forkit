import { type Serve } from "bun"

import { makeFetch } from "./make-fetch"
import { mapRouteHandlersToFilePaths, Router, RouterTree } from "../router"
import { getFilesFromDirectory } from "../lib/get-files-from-directory"

const BASE_ROUTE_PATH = process.cwd() + "/api/routes"

const fileMap = await mapRouteHandlersToFilePaths(
  BASE_ROUTE_PATH,
  getFilesFromDirectory(BASE_ROUTE_PATH))

const tree = new RouterTree(fileMap)

const router = new Router(tree)

const fetch = makeFetch(router)

export default {
  port: 3008,
  fetch,
} satisfies Serve
