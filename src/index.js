import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store/index"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connector from "./connector";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Connector />
  </BrowserRouter>
  </Provider>
);
