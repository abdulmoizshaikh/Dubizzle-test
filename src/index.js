import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { debugContextDevtool } from "react-context-devtool";


const container = document.getElementById("root");


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container);

/**
 configure react context devtool for debugging state
 */
let options = {
  debugReducer: true, //by default true
  debugContext: true, //by default true
};

debugContextDevtool(container, options);
