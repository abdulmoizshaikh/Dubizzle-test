import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { debugContextDevtool } from "react-context-devtool";

// configure dotenv
require("dotenv").config();

const container = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);

// to run ContextDevtool only in development mode
if (process.env.NODE_ENV === "development") {
  /**
   configure react context devtool for debugging state
   */
  let options = {
    debugReducer: true, //by default true
    debugContext: true, //by default true
  };

  debugContextDevtool(container, options);
}
