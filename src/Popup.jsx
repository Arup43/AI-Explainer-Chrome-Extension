import { useState, useEffect, useContext } from "react";
import "./Popup.css";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { ThemeContext } from "./context/ThemeContext";
import { getSettings } from "./services/settingsService";

/* global chrome */

export default function Popup() {
  const [selectedText, setSelectedText] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // Use a fixed backend URL instead of allowing user input
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Retrieve the selected text and explanation from storage
    chrome.storage.local.get(["selectedText"], (result) => {
      if (result.selectedText) {
        setSelectedText(result.selectedText);

        // Clear previous explanation when new text is selected
        setExplanation(""); // Clear the previous explanation

        // If there's selected text, fetch the explanation
        fetchExplanation(result.selectedText);
      } else {
        setIsLoading(false);
        setError(
          "No text selected. Please select text on a webpage and try again."
        );
      }
    });
  }, []);

  const fetchExplanation = async (text) => {
    setIsLoading(true);
    setError("");
    setExplanation(""); // Clear any existing explanation while loading

    try {
      // Get user settings first
      const settings = await getSettings();

      const response = await fetch(`${BACKEND_URL}/api/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language: settings.language,
          maxLen: settings.maxLen,
          explanationMode: settings.explanationMode,
        }),
      });

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Failed to parse response as JSON");
      }

      if (data && data.success) {
        setExplanation(data.content.explanation);
      } else {
        console.error(
          "API returned success: false or missing data structure",
          data
        );
        setError(
          `Failed to get explanation. ${data?.message || "Please try again."}`
        );
      }
    } catch (err) {
      console.error("Fetch error details:", err);
      setError(
        `An error occurred while fetching the explanation: ${err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`popup-container ${theme}`}>
      <h1 className="popup-title">AI Explainer</h1>

      <div className="popup-content">
        {selectedText && (
          <div className="selected-text">
            <h2>Selected Text:</h2>
            <p>{selectedText}</p>
          </div>
        )}

        <div className="explanation-container">
          <h2>Explanation:</h2>
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading explanation...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : explanation ? (
            <ReactMarkdown
              className="markdown-content"
              rehypePlugins={[rehypeSanitize]} // For security
            >
              {explanation}
            </ReactMarkdown>
          ) : (
            <div className="instructions">
              Select text on any webpage, right-click and choose "Explain
              Selected Text" to get an explanation.
            </div>
          )}
        </div>

        <div className="settings-link">
          <a href="options.html" target="_blank">
            Settings
          </a>
        </div>
      </div>
    </div>
  );
}
