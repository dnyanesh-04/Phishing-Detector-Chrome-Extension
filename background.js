chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === "checkPhishing") {

    const API_KEY = "YOUR_API_KEY_HERE";

    const suspiciousKeywords = [
      "login",
      "verify",
      "secure",
      "bank",
      "update",
      "password"
    ];

    const suspiciousTypos = [
      "faceb00k",
      "g00gle",
      "paypaI",
      "arnazon",
      "micr0soft"
    ];

    const lowerURL = request.url.toLowerCase();

    const suspiciousFound =
      suspiciousKeywords.some(word =>
        lowerURL.includes(word)
      );

    const typoDetected =
      suspiciousTypos.some(domain =>
        lowerURL.includes(domain)
      );

    const isHTTPS =
      request.url.startsWith("https://");

    fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          client: {
            clientId: "phishing-detector",
            clientVersion: "1.0"
          },

          threatInfo: {

            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE"
            ],

            platformTypes: [
              "ANY_PLATFORM"
            ],

            threatEntryTypes: [
              "URL"
            ],

            threatEntries: [
              {
                url: request.url
              }
            ]
          }
        })
      }
    )

    .then(response => response.json())

    .then(data => {

      const isPhishing =
        data.matches && data.matches.length > 0;

      let riskScore = 0;

      if (!isHTTPS)
        riskScore += 30;

      if (suspiciousFound)
        riskScore += 30;

      if (typoDetected)
        riskScore += 40;

      if (isPhishing)
        riskScore += 100;

      chrome.storage.local.get(
        ["history"],
        (result) => {

          let history =
            result.history || [];

          history.unshift({
            url: request.url,
            phishing: isPhishing,
            riskScore: riskScore,
            time: new Date().toLocaleString()
          });

          history = history.slice(0, 20);

          chrome.storage.local.set({
            history: history
          });
        }
      );

      sendResponse({

        isPhishing: isPhishing,

        suspiciousFound:
          suspiciousFound,

        typoDetected:
          typoDetected,

        isHTTPS:
          isHTTPS,

        riskScore:
          riskScore
      });

    })

    .catch(error => {

      console.error(error);

      sendResponse({
        isPhishing: false
      });

    });

    return true;
  }
});