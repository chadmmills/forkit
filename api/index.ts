type ORM = {};

import type { RouteHandlerArgs, RouteHandlerReturn } from "api:router";

export type ApiHandlerArgs = RouteHandlerArgs<ORM>;

export type ApiHandlerResponse = RouteHandlerReturn;
