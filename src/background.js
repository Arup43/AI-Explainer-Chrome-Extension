// Create context menu item
/* global chrome */
chrome.contextMenus.create({
    id: "explainSelectedText",
    title: "Explain Selected Text",
    contexts: ["selection"]
});

// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "explainSelectedText") {
        const selectedText = info.selectionText;

        // Store the selected text in Chrome storage
        chrome.storage.local.set({ selectedText }, () => {
            // Open the popup
            chrome.action.openPopup();
        });
    }
});

// Add this to your background.js
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        // Set default settings on first install
        chrome.storage.sync.set({
            language: 'English',
            maxLen: 500,
            explanationMode: 'simple',
            theme: 'light'
        });
    }
});