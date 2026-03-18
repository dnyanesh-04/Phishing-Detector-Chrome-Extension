chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkPhishing") {
    fetch(chrome.runtime.getURL("phishing_domains.json"))
      .then((response) => response.json())
      .then((data) => {
        const domain = new URL(request.url).hostname;
        const isPhishing = data.phishing.some((suspiciousDomain) =>
          domain.includes(suspiciousDomain)
        );
        sendResponse({ isPhishing });
      });
    return true;
  }
});