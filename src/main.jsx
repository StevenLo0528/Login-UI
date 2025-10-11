import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import BaseQueryClient from "./api/base/BaseQueryClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BaseQueryClient>
        <App />
      </BaseQueryClient>
    </BrowserRouter>
  </React.StrictMode>
);
