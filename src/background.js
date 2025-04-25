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

        // Send a message to the content script
        chrome.tabs.sendMessage(tab.id, {
            action: "getExplanation",
            text: selectedText
        });
    }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setExplanation") {
        // Store the explanation in Chrome storage
        chrome.storage.local.set({ explanation: request.explanation });
    }
}); 