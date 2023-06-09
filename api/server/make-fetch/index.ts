type Routable = {
  find(req: Request): (() => Response) | undefined
}

export function makeFetch(router: Routable) {
  return (req: Request) => {
    const handler = router.find(req)
    if (handler) {
      // handler({ req, db, json() {}, setHeader() {}, setStatus() {} }) // or something
      return handler()
    }

    return new Response(null, { status: 404 })
  }
}
