Phishing Detector Chrome Extension

A Chrome Extension that detects phishing and malicious websites using Google Safe Browsing API along with additional heuristic-based security checks such as:

HTTPS detection
Suspicious keyword detection
Typosquatting detection
URL risk scoring
Detection history storage
Features
Google Safe Browsing Integration

Checks URLs against Google's real-time phishing and malware database.

HTTPS Detection

Detects whether a website uses secure HTTPS protocol.

Suspicious Keyword Detection

Identifies suspicious words commonly used in phishing URLs such as:

login
verify
password
secure
bank
Typosquatting Detection

Detects fake domains imitating trusted brands such as:

faceb00k
g00gle
arnazon
micr0soft
Risk Scoring System

Calculates a risk score based on:

phishing detection
HTTPS usage
suspicious keywords
typosquatting indicators
Detection History

Stores previously scanned websites locally using Chrome Storage API.

Automatic Website Banner

Displays real-time warning/safe banner on websites.

Technologies Used
JavaScript
Chrome Extension Manifest V3
Google Safe Browsing API
Chrome Storage API
HTML
CSS
Project Structure
phishing-detector/
│
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── style.css
└── README.md
Installation
1. Clone Repository
git clone https://github.com/your-username/phishing-detector.git
2. Open Chrome Extensions

Go to:

chrome://extensions

Enable:

Developer Mode
3. Load Extension

Click:

Load unpacked

Select the project folder.

Google Safe Browsing API Setup
Enable API

Open:

Google Cloud Console

Enable:

Safe Browsing API
Create API Key

Go to:

APIs & Services → Credentials
Create API Key
Replace inside background.js:
const API_KEY = "YOUR_API_KEY";

with your actual API key.

Testing
Safe Website
https://example.com

Expected:

✅ Website Safe
HTTP Website
http://neverssl.com

Expected:

⚠ No HTTPS
Typosquatting Test
https://faceb00k.com

Expected:

⚠ Typosquatting detected
Google Phishing Test
https://testsafebrowsing.appspot.com/s/phishing.html

Expected:

⚠ PHISHING DETECTED
Future Improvements
Machine Learning phishing classifier
WHOIS integration
Domain age checking
Screenshot reporting system
Real-time blacklist caching
Browser notification alerts
Learning Outcomes

This project helped in understanding:

Browser Extension Development
Manifest V3 Architecture
Threat Intelligence APIs
Phishing Detection Techniques
URL Heuristics
Chrome Storage API
Asynchronous JavaScript
Author

Dnyanesh Bharat Mohite

Cybersecurity & Web Development Enthusiast

License

This project is for educational and research purposes.
