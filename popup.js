document.getElementById("start").addEventListener("click", () => {
    const website = document.getElementById("website").value.trim();
    const minutes = parseInt(document.getElementById("minutes").value, 10) || 0;
    const seconds = parseInt(document.getElementById("seconds").value, 10) || 0;
    const totalSeconds = minutes * 60 + seconds;
  
    if (website && totalSeconds > 0) {
      const delay = totalSeconds * 1000; // Convert to milliseconds
  
      // Store the delay time and website
      chrome.storage.local.set({ timeLimit: delay, targetWebsite: website, startTime: Date.now() }, () => {
        document.getElementById("status").innerText = `Tabs from ${website} will close in ${minutes} minute(s) and ${seconds} second(s).`;
        document.getElementById("countdown").innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        chrome.runtime.sendMessage({ action: "startTimer" });
  
        // Start countdown display
        startCountdown(delay);
      });
    } else {
      document.getElementById("status").innerText = "Please enter a valid website and time.";
    }
  });
  
  // Countdown display function
  function startCountdown(delay) {
    const countdownElement = document.getElementById("countdown");
    const interval = setInterval(() => {
      chrome.storage.local.get(["startTime", "timeLimit"], (data) => {
        const elapsed = Date.now() - data.startTime;
        const timeLeft = Math.max(data.timeLimit - elapsed, 0);
  
        const minutesLeft = Math.floor(timeLeft / 60000);
        const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
        countdownElement.innerText = `Time left: ${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  
        if (timeLeft <= 0) {
          clearInterval(interval); // Stop the countdown when time runs out
          countdownElement.innerText = "Time's up!";
        }
      });
    }, 1000);
  }
  