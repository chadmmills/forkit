import { z } from "zod";

import type { ApiHandlerArgs, ApiHandlerResponse } from "api/index.ts";

export function post({ payload }: ApiHandlerArgs): ApiHandlerResponse {
  let body = payloadParser(payload);
  let session = AuthSession.create(body);

  if (session.ok) {
    throw new Response("", { status: 404 });
  }

  return new Response(JSON.stringify({}), {
                     headers: { "content-type": "application/json" },
                     status: 400,
                    })
}

const sessionPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(255),
});

// used to parse the body of a request
export const payloadParser = (raw: unknown, parser: typeof sessionPayloadSchema = sessionPayloadSchema) => {
  return parser.parse(raw);
};
