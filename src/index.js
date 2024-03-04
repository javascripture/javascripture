/**
 * External dependencies
 */
import React from "react";
import { render } from "react-dom";

import App from "./app";

let ContentRoot;
window.renderApp = () => {
  ContentRoot = render(<App />, document.getElementById("content"));
};

if (module.hot) {
  module.hot.accept("./app", () => {
    const NextRootContainer = require("./app").default;
    ContentRoot = render(
      <NextRootContainer />,
      document.getElementById("content")
    );
  });
}

window.updateAppComponent = (key, value) => {
  // Update state of topmost parent when this method is called
  const newState = {};
  newState[key] = value;
  ContentRoot.setState(newState);
};
