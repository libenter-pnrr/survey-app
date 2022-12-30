import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement !== null) {
  createRoot(rootElement).render(<App />);
}
