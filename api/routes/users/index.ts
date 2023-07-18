import type { ApiHandlerArgs, ApiHandlerResponse } from "api/index.ts";

const html = `
<!DOCTYPE html>
<html>
  <body>
    <h1>User</h1>
    <form action="/users" method="post">
      <label for="name">Name:
        <input type="text" id="name" name="name" />
          </label>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
`;

export function get({ respondWith }: ApiHandlerArgs): ApiHandlerResponse {
  return respondWith({ html })
}

export function post({ respondWith }: ApiHandlerArgs): ApiHandlerResponse {
  return respondWith({ html: "User created" })
}
