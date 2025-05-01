/* global chrome */

// Default settings
const defaultSettings = {
    language: 'English',
    maxLen: 500,
    explanationMode: 'simple',
    theme: 'light'
};

// Get all settings from storage
export const getSettings = async () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get(Object.keys(defaultSettings), (result) => {
            // Merge with default settings for any missing values
            resolve({ ...defaultSettings, ...result });
        });
    });
};

// Save a specific setting
export const saveSetting = async (key, value) => {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: value }, () => {
            resolve();
        });
    });
};

// Save all settings at once
export const saveAllSettings = async (settings) => {
    return new Promise((resolve) => {
        chrome.storage.sync.set(settings, () => {
            resolve();
        });
    });
}; 