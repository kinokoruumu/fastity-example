import React from "react";

export type Props = {
  children: string;
};

export const Html = ({ children }: Props) => (
  <html lang="ja">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
      <script src="/assets/bootstrap.7acfc897c1b040baf17e.js"></script>
    </body>
  </html>
);
