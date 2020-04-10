import Router from "universal-router";
import { routes } from "../routes";
import { Middleware, RouterContext } from "./types";

export function createRouter(
  context: RouterContext,
  middleware: Middleware,
): Router<RouterContext> {
  return new Router(
    {
      path: "",
      children: routes,
      action: middleware,
    },
    { context },
  );
}
