// Listen for messages from the background script
/* global chrome */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getExplanation") {
        const selectedText = request.text;

        // Define your backend service URL
        const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Replace with your actual backend URL

        // Make API request to get explanation
        fetch(`${BASE_URL}/api/explain`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: selectedText }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.success) {
                // Send the explanation back to the background script
                        chrome.runtime.sendMessage({
                            action: "setExplanation",
                            explanation: data.content.explanation
                        });
                    } else {
                        chrome.runtime.sendMessage({
                            action: "setExplanation",
                            explanation: "Failed to get explanation. Please try again."
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching explanation:", error);
                    chrome.runtime.sendMessage({
                        action: "setExplanation",
                        explanation: "An error occurred while fetching the explanation."
                    });
                });
    }
});

// Listen for text selection
document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        // You can use this to implement additional custom functionality
        // on text selection if needed
    }
}); 