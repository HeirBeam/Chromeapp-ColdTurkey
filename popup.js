document.getElementById("start").addEventListener("click", () => {
    const website = document.getElementById("website").value.trim();
    const minutes = parseInt(document.getElementById("minutes").value, 10) || 0;
    const seconds = parseInt(document.getElementById("seconds").value, 10) || 0;
    const totalSeconds = minutes * 60 + seconds;
  
    if (website && totalSeconds > 0) {
      const delay = totalSeconds * 1000; // Convert to milliseconds
  
      chrome.storage.local.get({ trackedWebsites: [] }, (data) => {
        const trackedWebsites = data.trackedWebsites;
  
        // Add or update the website and timer in the list
        const existingIndex = trackedWebsites.findIndex(item => item.website === website);
        if (existingIndex > -1) {
          trackedWebsites[existingIndex].timeLimit = delay; // Update time limit if site is already in list
        } else {
          trackedWebsites.push({ website, timeLimit: delay });
        }
  
        // Save the updated list back to storage
        chrome.storage.local.set({ trackedWebsites }, () => {
          document.getElementById("status").innerText = `Tabs from ${website} will close after ${minutes} minute(s) and ${seconds} second(s).`;
          displayTrackedWebsites(); // Update the list display
          chrome.runtime.sendMessage({ action: "updateSettings" });
        });
      });
    } else {
      document.getElementById("status").innerText = "Please enter a valid website and time.";
    }
  });
  
  // Display tracked websites in the popup
  function displayTrackedWebsites() {
    const websiteList = document.getElementById("website-list");
    websiteList.innerHTML = ""; // Clear current list
  
    chrome.storage.local.get({ trackedWebsites: [] }, (data) => {
      data.trackedWebsites.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.website} - ${item.timeLimit / 1000} seconds`;
  
        // Remove button for each website
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeTrackedWebsite(index));
  
        listItem.appendChild(removeButton);
        websiteList.appendChild(listItem);
      });
    });
  }
  
  // Remove a specific website from tracked list
  function removeTrackedWebsite(index) {
    chrome.storage.local.get({ trackedWebsites: [] }, (data) => {
      const trackedWebsites = data.trackedWebsites;
      trackedWebsites.splice(index, 1); // Remove the selected website
  
      chrome.storage.local.set({ trackedWebsites }, () => {
        displayTrackedWebsites(); // Update the list display
        chrome.runtime.sendMessage({ action: "updateSettings" });
      });
    });
  }
  
  // Clear all tracked websites
  document.getElementById("clearAll").addEventListener("click", () => {
    chrome.storage.local.set({ trackedWebsites: [] }, () => {
      displayTrackedWebsites();
      chrome.runtime.sendMessage({ action: "updateSettings" });
      document.getElementById("status").innerText = "All tracked websites have been cleared.";
    });
  });
  
  // Initialize the display of tracked websites on popup load
  document.addEventListener("DOMContentLoaded", () => {
    displayTrackedWebsites();
  });
  