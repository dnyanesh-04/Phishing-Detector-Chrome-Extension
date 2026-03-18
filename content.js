chrome.runtime.sendMessage(
  { action: "checkPhishing", url: window.location.href },
  (response) => {
    if (response?.isPhishing) {
      alert("⚠️ Warning: This site may be a phishing attempt!");
    }
  }
);