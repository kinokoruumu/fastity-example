import React from "react";
import ReactDOM from "react-dom";

async function initApp() {
  const app = document.getElementById("app");

  try {
    ReactDOM.hydrate(<h1>hoge</h1>, app);
  } catch (e) {
    console.error("Client bootstrapping error");
  }
}

initApp();
