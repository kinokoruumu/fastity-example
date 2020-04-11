import React from 'react';
import { RouteActionPayload } from '../../routing/types';

export async function action(): Promise<RouteActionPayload> {
  return {
    content: <h1>Second</h1>,
  };
}
