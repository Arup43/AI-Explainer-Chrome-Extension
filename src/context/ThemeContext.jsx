import { createContext, useState, useEffect } from "react";

/* global chrome */

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Load theme from storage on initialization
    chrome.storage.sync.get(["theme"], (result) => {
      if (result.theme) {
        setTheme(result.theme);
      }
    });
  }, []);

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
    // Save theme to storage
    chrome.storage.sync.set({ theme: newTheme });
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    applyTheme(newTheme);
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
