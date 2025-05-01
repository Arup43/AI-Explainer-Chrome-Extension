import { useState, useEffect, useContext } from "react";
import { getSettings, saveAllSettings } from "./services/settingsService";
import { ThemeContext } from "./context/ThemeContext";
import "./Options.css";

export default function Options() {
  const [settings, setSettings] = useState({
    language: "English",
    maxLen: 500,
    explanationMode: "simple",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Load settings when component mounts
    const loadSettings = async () => {
      const currentSettings = await getSettings();
      setSettings({
        language: currentSettings.language,
        maxLen: currentSettings.maxLen,
        explanationMode: currentSettings.explanationMode,
      });
    };

    loadSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For maxLen, convert to number
    if (name === "maxLen") {
      setSettings({
        ...settings,
        [name]: parseInt(value, 10),
      });
    } else {
      setSettings({
        ...settings,
        [name]: value,
      });
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Save all settings including the theme
      await saveAllSettings({
        ...settings,
        theme,
      });
      setSaveMessage("Settings saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 3000);
    } catch {
      setSaveMessage("Error saving settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Icons for settings in SVG format
  const icons = {
    language: (
      <svg
        className="settings-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    maxLen: (
      <svg
        className="settings-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="21" y1="6" x2="3" y2="6"></line>
        <line x1="15" y1="12" x2="3" y2="12"></line>
        <line x1="17" y1="18" x2="3" y2="18"></line>
      </svg>
    ),
    explanationMode: (
      <svg
        className="settings-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    ),
    theme: (
      <svg
        className="settings-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ),
  };

  return (
    <div className="options-container">
      <div className="options-header">
        <h1>AI Explainer Settings</h1>
      </div>

      <div className="options-content">
        <form onSubmit={handleSubmit}>
          <div className="option-card">
            <div className="form-group">
              <label htmlFor="language">{icons.language} Language</label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleInputChange}
                required
              >
                <option value="English">English</option>
                <option value="Bengali">Bengali</option>
              </select>
            </div>
          </div>

          <div className="option-card">
            <div className="form-group">
              <label htmlFor="maxLen">
                {icons.maxLen} Maximum Explanation Length
              </label>
              <div className="input-with-label">
                <input
                  type="number"
                  id="maxLen"
                  name="maxLen"
                  min="100"
                  max="2000"
                  value={settings.maxLen}
                  onChange={handleInputChange}
                  required
                />
                <span>characters</span>
              </div>
            </div>
          </div>

          <div className="option-card">
            <div className="form-group">
              <label htmlFor="explanationMode">
                {icons.explanationMode} Explanation Mode
              </label>
              <select
                id="explanationMode"
                name="explanationMode"
                value={settings.explanationMode}
                onChange={handleInputChange}
                required
              >
                <option value="simple">Simple</option>
                <option value="detailed">Detailed</option>
                <option value="technical">Technical</option>
              </select>
            </div>
          </div>

          <div className="option-card">
            <div className="form-group">
              <label htmlFor="theme">{icons.theme} Theme</label>
              <select
                id="theme"
                name="theme"
                value={theme}
                onChange={handleThemeChange}
                required
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="btn-container">
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>

          {saveMessage && <div className="save-message">{saveMessage}</div>}
        </form>
      </div>
    </div>
  );
}
