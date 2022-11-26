import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
// import "./Style.css";
import "./Style_design.css";
import "./Navigation.css";
import "./Player.css";
import App from "./components/App";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// reportWebVitals();
