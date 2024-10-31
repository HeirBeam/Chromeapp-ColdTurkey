let timers = {};

// Function to close a tab after the specified delay if it matches the target website
function closeTabAfterDelay(tabId, url, delay, targetWebsite) {
  if (timers[tabId]) clearTimeout(timers[tabId]); // Clear previous timer if any

  // Check if the tab URL includes the target website
  if (url.includes(targetWebsite)) {
    timers[tabId] = setTimeout(() => {
      chrome.tabs.remove(tabId);
      delete timers[tabId];
    }, delay);
  }
}

// Listen for messages from popup.js to start the timer
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startTimer") {
    chrome.storage.local.get(["timeLimit", "targetWebsite"], (data) => {
      const delay = data.timeLimit; // Time in milliseconds
      const targetWebsite = data.targetWebsite;

      // Get all currently open tabs
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => closeTabAfterDelay(tab.id, tab.url, delay, targetWebsite));
      });

      // Monitor new tabs and apply the same delay if they match the target website
      chrome.tabs.onCreated.addListener((tab) => {
        closeTabAfterDelay(tab.id, tab.url, delay, targetWebsite);
      });
    });
  }
});

// Cleanup when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  if (timers[tabId]) {
    clearTimeout(timers[tabId]);
    delete timers[tabId];
  }
});
