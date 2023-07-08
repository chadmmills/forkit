import { z } from "zod";

import type { ApiHandlerArgs, ApiHandlerResponse } from "api/index.ts";

export function get({
  req,
  params,
  respondWith,
}: ApiHandlerArgs): ApiHandlerResponse {
  console.log("Params from ", req.url, params);

  return respondWith({
    json: [
      { id: 1, name: "Chinese food" },
      { id: 2, name: "Pizza" },
      { id: 3, name: "Tacos" },
      { id: 4, name: "Sushi" },
      { id: 5, name: "Burgers" },
    ],
  });
}

export function post({
  req,
  params,
  respondWith,
  payload,
}: ApiHandlerArgs): ApiHandlerResponse {
  console.log("Params from ", req.url, params);
  console.log("Payload from ", req.url, payload);
  try {
    let result = payloadParser(payload);
    console.log("Parsed payload from ", req.url, result);
  } catch (error) {
    console.error(error);
    return new Response("Bad Request", { status: 400 });
  }

  return respondWith({
    json: { id: 1, name: "Chinese food" },
  });
}

const schema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

// used to parse the body of a request
export const payloadParser = (raw: unknown, parser: typeof schema = schema) => {
  return parser.parse(raw);
};
