import React from "react";
import ReactDOM from "react-dom";
import { loadableReady } from "@loadable/component";

loadableReady(async () => {
  const app = document.getElementById("app");

  try {
    ReactDOM.hydrate(<h1>hogehoge</h1>, app);
  } catch (e) {
    console.error("Client bootstrapping error");
  }
});
