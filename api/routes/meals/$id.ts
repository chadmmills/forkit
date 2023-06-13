import type { RouteHandlerArgs } from "api:router"

export function get({ req, params, respondWith }: RouteHandlerArgs) {
  console.log("Params from ", req.url, params);

  respondWith({
    json: [
      { id: 1, name: "Chinese food" },
      { id: 2, name: "Pizza" },
      { id: 3, name: "Tacos" },
      { id: 4, name: "Sushi" },
      { id: 5, name: "Burgers" },
    ]
  })
}
