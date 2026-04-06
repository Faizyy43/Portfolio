import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import ThemeProvider from "./context/ThemeContext.jsx";
import ScrollToTop from "./utils/scrollToTop";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
