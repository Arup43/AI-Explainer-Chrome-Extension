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

  return (
    <div className="options-container">
      <h1>AI Explainer Options</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="language">Language</label>
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

        <div className="form-group">
          <label htmlFor="maxLen">Maximum Explanation Length</label>
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
        </div>

        <div className="form-group">
          <label htmlFor="explanationMode">Explanation Mode</label>
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

        <div className="form-group">
          <label htmlFor="theme">Theme</label>
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

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </button>

        {saveMessage && <div className="save-message">{saveMessage}</div>}
      </form>
    </div>
  );
}
