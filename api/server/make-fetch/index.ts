import type { Router } from 'api:router'

export function makeFetch(router: Router) {
  return (req: Request) => {
    const handler = router.find(req)
    if (handler) {
      // handler({ req, db, json() {}, setHeader() {}, setStatus() {} }) // or something
      return handler()
    }

    return new Response(null, { status: 404 })
  }
}
