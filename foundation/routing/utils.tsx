import React from "react";
import { LoadableLibrary } from "@loadable/component";
import { Route } from "universal-router";
import { FatalHttpError, NotFoundHttpError } from "../utils/HttpUtils";
import { HttpStatusCode } from "../utils/StatusCodeUtils";
import { ChildRouteAction, PageRoute, RouteActionPayload } from "./types";

function combineRoutePath(route: Route): string {
  let path = "";

  if (route.parent != null) {
    const parent = combineRoutePath(route.parent);
    path = `${parent === "/" ? "" : parent}${route.path}`;
  } else {
    path = route.path === "" ? "/" : (route.path as string);
  }

  return path === "" ? "/" : path;
}

export function action(library: LoadableLibrary<PageRoute>): ChildRouteAction {
  return ({ params, route }) => ({
    library,
    path: combineRoutePath(route),
    params,
  });
}

export function createErrorResponse(e: Error): RouteActionPayload {
  // handle 404
  if (e instanceof NotFoundHttpError) {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
      content: <h1>404</h1>,
    };
  }

  // handle 50x
  if (e instanceof FatalHttpError) {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      content: <h1>500</h1>,
    };
  }

  return {
    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    content: <h1>500</h1>,
  };
}
