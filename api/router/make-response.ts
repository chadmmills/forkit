import { RespondWithArgs } from "./route-handler.ts";

export function makeResponse(responseLike: RespondWithArgs): Response {
  if (typeof responseLike === "string") {
    return new Response(responseLike);
  }

  if (responseLike instanceof Response) {
    return responseLike;
  }

  if ("html" in responseLike) {
    return new Response(responseLike.html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  if ("json" in responseLike) {
    return new Response(JSON.stringify(responseLike.json), {
      headers: { "Content-Type": "application/json" },
    });
  }

  throw new Error("Unknown response type");
}
