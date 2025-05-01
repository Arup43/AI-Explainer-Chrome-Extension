import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Options from "./Options.jsx";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Options />
    </ThemeProvider>
  </StrictMode>
);
