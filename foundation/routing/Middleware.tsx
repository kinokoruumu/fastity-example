import React from 'react';
import { LoadableLibrary } from '@loadable/component';
import { renderToStaticMarkup } from 'react-dom/server';
import { QueryParams } from 'universal-router';
import { HttpStatusCode } from '../utils/StatusCodeUtils';
import { DeferPageAction, Middleware, PageAction, PageRoute } from './types';
import { createErrorResponse } from './utils';
import { FatalHttpError } from '../utils/HttpUtils';

function extractRouteAction(
  Component: LoadableLibrary<PageRoute>,
): Promise<PageRoute> {
  return new Promise((resolve) => {
    renderToStaticMarkup(
      <Component>
        {(m) => {
          resolve(m);

          return null;
        }}
      </Component>,
    );
  });
}

export function createMiddleware(isBrowser: boolean): Middleware {
  const storedHistories = new Set<string>();

  return async (ctx) => {
    let action: PageAction;
    let deferAction: DeferPageAction | undefined;
    let path: string;
    let params: QueryParams;

    try {
      let library: LoadableLibrary<PageRoute>;
      ({ library, path, params } = await ctx.next());
      await library.load();
      ({ action, deferAction } = await extractRouteAction(library));
    } catch (e) {
      return {
        statusCode: HttpStatusCode.NOT_FOUND,
        content: <h1>404</h1>,
      };
    }

    try {
      // 50x 系エラーが発生している状態ではページアクションを実行させない
      if (ctx.store.getState().app.fatal) {
        throw new FatalHttpError();
      }

      let firstOrPush = false;
      // 初回かつクライアントの場合、firstOrPush は false
      if (storedHistories.size !== 0 || !isBrowser) {
        // サーバ or 2回目以降の遷移の場合、storedHistories にすでに含まれているか、
        // action が PUSH であるかのチェックを行う
        firstOrPush =
          !storedHistories.has(ctx.pathname) || ctx.history.action === 'PUSH';
      }

      storedHistories.add(ctx.pathname);

      const payload = await action({
        ...ctx,
        firstOrPush,
        params,
      });

      if (deferAction != null) {
        // deferAction に渡す firstOrPush は、初回の CSR では常に true が入るようにする
        deferAction = deferAction.bind(null, {
          ...ctx,
          firstOrPush: firstOrPush || storedHistories.size === 1,
          params,
        });
      }

      return {
        path,
        params,
        deferAction,
        ...payload,
      };
    } catch (e) {
      return createErrorResponse(e);
    }
  };
}
