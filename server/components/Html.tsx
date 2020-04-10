import React from "react";
import { ChunkExtractor } from "@loadable/server";

export type Props = {
  children: string;
  extractor: ChunkExtractor;
};

export const Html = ({ children, extractor }: Props) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />

      {extractor.getScriptElements({ async: false, defer: true })}
    </body>
  </html>
);
