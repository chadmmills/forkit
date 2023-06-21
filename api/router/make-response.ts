export function makeResponse(
  responseLike: Response | string | { json: Record<string, any> }
) {
  if (typeof responseLike === "string") {
    return new Response(responseLike);
  }

  if (responseLike instanceof Response) {
    return responseLike;
  }

  if ("json" in responseLike) {
    return new Response(JSON.stringify(responseLike.json), {
      headers: { "Content-Type": "application/json" },
    });
  }

  throw new Error("Unknown response type");
}
