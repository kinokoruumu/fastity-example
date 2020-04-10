import React from "react";
import { RouteActionContext, RouteActionPayload } from "../../routing/types";

export async function action({}: RouteActionContext): Promise<
  RouteActionPayload
> {
  return {
    content: <h1>Second</h1>,
  };
}
