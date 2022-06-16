import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextFile } from "./context/contextFile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextFile>
      <App />
    </ContextFile>
  </React.StrictMode>
);
