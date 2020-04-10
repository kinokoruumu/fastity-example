import fastify from "fastify";
import fastifyStatic from "fastify-static";
import * as path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Html } from "./components/Html";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

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
  appServer.get("*", async (_, reply) => {
    const extractor = new ChunkExtractor({
      statsFile: CHUNK_STATS,
      entrypoints: ["bootstrap"],
    });

    let body = "";

    try {
      body = ReactDOMServer.renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <h1>hogehoge</h1>
        </ChunkExtractorManager>,
      );
    } catch (e) {
      throw e;
    }

    const html = ReactDOMServer.renderToStaticMarkup(
      <Html extractor={extractor}>{body}</Html>,
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
