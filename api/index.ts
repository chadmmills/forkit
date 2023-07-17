import type { ORM } from "api:orm";

import type { RouteHandlerArgs, RouteHandlerReturn } from "api:router";

export type ApiHandlerArgs = RouteHandlerArgs<ORM>;

export type ApiHandlerResponse = RouteHandlerReturn;
