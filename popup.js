chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  chrome.runtime.sendMessage(
    { action: "checkPhishing", url: currentTab.url },
    (response) => {
      const status = document.getElementById("status");
      if (response?.isPhishing) {
        status.textContent = "⚠️ This site may be a phishing attempt!";
        status.style.color = "red";
      } else {
        status.textContent = "✅ This site appears to be safe.";
        status.style.color = "green";
      }
    }
  );
});