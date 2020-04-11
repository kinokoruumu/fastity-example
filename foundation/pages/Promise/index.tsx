import React from 'react';
import { RouteActionContext, RouteActionPayload } from '../../routing/types';

export async function action({
  firstOrPush,
}: RouteActionContext): Promise<RouteActionPayload> {
  if (firstOrPush) {
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  }
  return {
    content: <h1>Promise</h1>,
  };
}
