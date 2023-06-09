import { describe, test, expect } from "bun:test"

import { Router } from './';

describe('Router', () => {
  test('implements the .find method', () => {
    let tree = { lookup(path: string) { return () => new Response(path) } }
    let router = new Router(tree)
    let req = new Request('http://localhost:8787');

      expect(router.find(req)).toBeInstanceOf(Function);
  });
})
