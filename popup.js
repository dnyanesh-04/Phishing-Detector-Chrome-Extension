chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },

  (tabs) => {

    const currentTab =
      tabs[0];

    chrome.runtime.sendMessage(
      {
        action:
          "checkPhishing",

        url:
          currentTab.url
      },

      (response) => {

        const status =
          document.getElementById(
            "status"
          );

        if (!response)
          return;

        let message = "";

        if (response.isPhishing) {

          message +=
            "⚠ Dangerous website detected!\n\n";

          status.style.color =
            "red";

        } else {

          message +=
            "✅ Website appears safe.\n\n";

          status.style.color =
            "green";
        }

        message +=
          `Risk Score: ${response.riskScore}/100\n`;

        message +=
          response.isHTTPS
            ? "🔒 HTTPS Enabled\n"
            : "⚠ No HTTPS\n";

        if (
          response.suspiciousFound
        ) {
          message +=
            "⚠ Suspicious keywords detected\n";
        }

        if (
          response.typoDetected
        ) {
          message +=
            "⚠ Typosquatting detected\n";
        }

        status.textContent =
          message;
      }
    );
  }
);