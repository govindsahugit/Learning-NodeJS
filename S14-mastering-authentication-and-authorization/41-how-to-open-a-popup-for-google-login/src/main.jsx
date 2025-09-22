import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Popup from "./Popup.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Popup />
  </StrictMode>
);
