import type { ApiHandlerArgs, ApiHandlerResponse } from "api/index.ts";
import { z } from "zod";

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
  return respondWith({ html });
}

export function post({
  respondWith,
  payload,
  orm,
}: ApiHandlerArgs): ApiHandlerResponse {
  console.log("payload", payload);
  const formData = new URLSearchParams(String(payload));
  console.log("formData", formData);
  const userInput = payloadSchema.parse(Object.fromEntries(formData));

  console.log("userInput", userInput);

  orm.users.create({ email: "hey@example.com", password: "123" });

  let users = orm.users.all();

  console.log("users", users);

  return respondWith({ html: "User created" });
}

const payloadSchema = z.object({
  name: z.string(),
});
