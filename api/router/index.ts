export type Router = {
  find(req: Request): (() => Response) | undefined
}
