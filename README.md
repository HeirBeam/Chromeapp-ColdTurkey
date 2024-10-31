
# Tab Auto Closer Chrome Extension

I had been spending too much time on youtube so I decided to create and extension to put a time limit on the time I spend on youtube.
Automatically close tabs from specified websites after a set period. This extension allows you to add websites and a time limit so that tabs from those sites will close automatically each time they’re opened.

### Features

- Set a time limit for specific websites, and tabs from those sites will close automatically after the time has elapsed.
- Track multiple websites with different time limits.
- Easily view and manage tracked websites from the extension popup.
- Option to remove individual websites or clear all tracked websites at once.

### Installation

1. **Clone or Download the Repository**:
   - Clone this repository to your local machine or download the ZIP file and extract it.

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** in the top-right corner.
   - Click **Load unpacked** and select the folder containing the extension files.

3. **Pin the Extension** (optional):
   - Click the puzzle piece icon in the top-right corner of Chrome.
   - Pin **Tab Auto Closer** to make it easily accessible.

### Usage

1. **Set a Website and Timer**:
   - Click on the **Tab Auto Closer** icon in the Chrome toolbar.
   - Enter a website URL (e.g., `youtube.com`) in the **Website** field.
   - Specify a time in **Minutes** and/or **Seconds**.
   - Click **Start Timer** to save the website and start the timer.

2. **View and Manage Tracked Websites**:
   - In the popup, scroll down to the **Tracked Websites** section to view all saved websites and their timers.
   - Each tracked website has a **Remove** button, allowing you to delete it from the list.
   - Use the **Clear All** button to remove all tracked websites.

3. **Automatic Tab Closure**:
   - Tabs from any tracked website will automatically close after the specified time each time they’re opened.

### Example

1. Add `youtube.com` with a 20-second timer.
2. Open a new tab and go to `youtube.com`.
3. After 20 seconds, the tab will automatically close.
4. Re-opening `youtube.com` will restart the 20-second timer for that tab.

### Files

- `manifest.json`: The extension's configuration file, specifying permissions and loading scripts.
- `popup.html`: The popup UI displayed when you click the extension icon.
- `popup.js`: Handles the logic for adding and managing websites and timers.
- `background.js`: Manages tab events and applies time limits to each website’s tabs.
- `popup.css`: Styling for the popup, making it visually appealing and user-friendly.


### Troubleshooting

- **Tabs Closing Unexpectedly**: Ensure no unwanted websites remain in the tracked list. Use the **Clear All** button to reset if needed.
- **Extension Not Closing Tabs**: Confirm the site matches the pattern. Adjust the website URL if necessary.
