import React from 'react';
import { RouteActionPayload } from '../../routing/types';
import { Link } from '../../components/atoms/Link';

export async function action(): Promise<RouteActionPayload> {
  return {
    content: (
      <div>
        <h1>Top</h1>
        <div>
          <Link href="/second">/second</Link>
        </div>
        <div>
          <Link href="/promise">/promise</Link>
        </div>
      </div>
    ),
  };
}
