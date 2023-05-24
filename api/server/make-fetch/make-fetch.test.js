// TEST file
import { describe, test, expect } from "api:test";
import { makeFetch } from './';
describe("makeFetch", () => {
    test("returns a fetchable function for bun Serve", () => {
        expect(makeFetch()).toBeInstanceOf(Function);
    });
});
