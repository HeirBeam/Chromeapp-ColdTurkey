let timers = {};

// Function to set a timer to close a tab after the specified delay
function closeTabAfterDelay(tabId, url, delay) {
  if (timers[tabId]) clearTimeout(timers[tabId]); // Clear previous timer if any

  timers[tabId] = setTimeout(() => {
    chrome.tabs.remove(tabId);
    delete timers[tabId];
  }, delay);
}

// Function to handle tab events based on tracked websites
function handleTabEvent(tab) {
  chrome.storage.local.get({ trackedWebsites: [] }, (data) => {
    const trackedWebsites = data.trackedWebsites;

    // Check if this tab URL matches any tracked website
    const matchedWebsite = trackedWebsites.find(item => tab.url.includes(item.website));
    if (matchedWebsite) {
      closeTabAfterDelay(tab.id, tab.url, matchedWebsite.timeLimit);
    } else if (timers[tab.id]) {
      // If the tab no longer matches any tracked website, clear its timer
      clearTimeout(timers[tab.id]);
      delete timers[tab.id];
    }
  });
}

// Apply settings to all tabs when settings are updated
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateSettings") {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => handleTabEvent(tab));
    });
  }
});

// Monitor newly created and updated tabs
chrome.tabs.onCreated.addListener(handleTabEvent);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    handleTabEvent(tab); // Only apply timer when the tab has fully loaded
  }
});

// Cleanup when a tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  if (timers[tabId]) {
    clearTimeout(timers[tabId]);
    delete timers[tabId];
  }
});
