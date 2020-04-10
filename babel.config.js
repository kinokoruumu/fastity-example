module.exports = (api) => {
  const presets = ["@babel/preset-react", "@babel/preset-typescript"];

  const plugins = [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
  ];

  /**
   * for Node.js
   */
  if (api.env("node")) {
    plugins.push(
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-transform-react-inline-elements",
    );
  }

  /**
   * for Modern Browser
   * @see https://browserl.ist/?q=last+5+ChromeAndroid+versions%2C+last+2+Chrome+versions%2C+last+2+Safari+major+versions%2C+last+2+Firefox+versions%2C+last+2+Edge+major+versions%2C+iOS+%3E%3D+11%2C+not+ie+%3C%3D+11
   */
  if (api.env((name) => name.endsWith("_browser"))) {
    presets.unshift([
      "@babel/preset-env",
      {
        modules: false,
        targets:
          "last 5 ChromeAndroid versions, last 2 Chrome versions, last 2 Safari major versions, last 2 Firefox versions, last 2 Edge major versions, iOS >= 11, not ie <= 11",
      },
    ]);

    plugins.push(
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-react-inline-elements",
    );
  }

  return {
    presets,
    plugins,
  };
};
