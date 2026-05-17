chrome.runtime.sendMessage(
  {
    action: "checkPhishing",
    url: window.location.href
  },

  (response) => {

    if (!response)
      return;

    const oldBanner =
      document.getElementById(
        "phishing-banner"
      );

    if (oldBanner)
      oldBanner.remove();

    const banner =
      document.createElement("div");

    banner.id =
      "phishing-banner";

    banner.style.position =
      "fixed";

    banner.style.top = "0";

    banner.style.left = "0";

    banner.style.width = "100%";

    banner.style.padding =
      "15px";

    banner.style.fontSize =
      "18px";

    banner.style.fontWeight =
      "bold";

    banner.style.textAlign =
      "center";

    banner.style.zIndex =
      "999999999";

    if (response.isPhishing) {

      banner.innerHTML =
        `⚠ PHISHING DETECTED | Risk Score: ${response.riskScore}/100`;

      banner.style.background =
        "red";

    } else {

      banner.innerHTML =
        `✅ Website is Safe | Risk Score: ${response.riskScore}/100`;

      banner.style.background =
        "green";
    }

    banner.style.color =
      "white";

    document.body.prepend(
      banner
    );
  }
);