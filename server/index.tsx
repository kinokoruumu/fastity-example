import fastify from "fastify";
import fastifyStatic from "fastify-static";
import * as path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Html } from "./components/Html";
import { configureStore } from "../store/index";
import { createRouter } from "../foundation/routing/index";
import { createMiddleware } from "../foundation/routing/Middleware";
import { HttpStatusCode } from "../foundation/utils/StatusCodeUtils";
import { locationChange } from "../store/routing/actions/LocationChangeAction";
import { RouteRenderer } from "../store/routing/containers/RouteRenderer";
import { AppContainer } from "../foundation/containers/AppContainer";

const APP_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
const CHUNK_STATS = path.resolve(__dirname, "loadable-stats.json");

const appServer = fastify();

// 静的ファイルの配信
appServer.register(fastifyStatic, {
  prefix: "/assets",
  root: path.join(__dirname, "public"),
});

appServer.after(() => {
  /**
   * for React
   */
  appServer.get("*", async (request, reply) => {
    const extractor = new ChunkExtractor({
      statsFile: CHUNK_STATS,
      entrypoints: ["bootstrap"],
    });

    const history = createMemoryHistory({
      initialEntries: [request.req.url as string],
    });
    const store = configureStore({
      history,
      preloadedState: {},
    });

    const router = createRouter({ store, history }, createMiddleware(false));

    const {
      statusCode,
      params,
      redirectTo,
      layout,
      content,
    } = await router.resolve(history.location.pathname);

    if (redirectTo != null) {
      reply.redirect(
        statusCode != null ? statusCode : HttpStatusCode.FOUND,
        `${redirectTo}`,
      );
    }

    store.dispatch(
      locationChange({
        hash: history.location.hash,
        action: history.action,
        pathname: history.location.pathname,
        key: history.location.pathname,
        search: history.location.search,
        params: typeof params === "string" ? params : ({} as any), // TODO: as any消す
        status: statusCode != null ? statusCode : HttpStatusCode.OK,
      }),
    );

    const sheet = new ServerStyleSheet();
    let body = "";
    let styleTags: React.ReactElement<{}>[] = [];

    try {
      body = ReactDOMServer.renderToString(
        sheet.collectStyles(
          <ChunkExtractorManager extractor={extractor}>
            <Provider store={store}>
              <RouteRenderer
                history={history}
                router={router}
                initialLayout={layout}
                component={AppContainer}
              >
                {content}
              </RouteRenderer>
            </Provider>
          </ChunkExtractorManager>,
        ),
      );

      styleTags = sheet.getStyleElement();
    } catch (e) {
      sheet.seal();
      throw e;
    }

    const preloadedState = store.getState();

    const html = ReactDOMServer.renderToStaticMarkup(
      <Html
        extractor={extractor}
        styleTags={styleTags}
        preloadedState={preloadedState}
      >
        {body}
      </Html>,
    );

    reply
      .status(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<!doctype html>${html}`);
  });
});

/**
 * Launch servers
 */
appServer.listen(APP_PORT, "0.0.0.0", (err) => {
  if (err != null) {
    console.error(`failed to appServer listening on ${APP_PORT}`);
  } else {
    console.info(`appServer listening on ${APP_PORT}`);
  }
});
