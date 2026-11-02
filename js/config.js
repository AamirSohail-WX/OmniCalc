/* ==========================================================================
   OMNICALC WEBSITE - CENTRAL CONFIGURATION  (edit THIS file, not the HTML)
   See WEBSITE-SETUP.md for step-by-step instructions.
   ========================================================================== */
var OMNICALC_CONFIG = {
  // 1) APP VERSION - shown on every download card. A download can override it with its own "version".
  version: "1.1.0", // matches package.json of the OmniCalc app

  // 2) WEBSITE ADDRESS - used only in canonical/social tags. Replace in the HTML <head> too (see setup guide).
  website: "https://YOUR-DOMAIN.example/",

  // 3) DOWNLOADS - paste GitHub Release asset URLs into "url".
  //    Leave url as "" and the button shows "Download coming soon." (nothing is downloaded).
  //    Right-click the asset on the Release page > "Copy link address".
  android: {
  url: "https://github.com/AamirSohail-WX/OmniCalc/releases/download/v1.1.0/OmniCalc-1.1.0.apk",
  filename: "OmniCalc-1.1.0.apk",
  size: "3.82 MB",
  platform: "Android",
  format: "APK",
  requirements: "Android 7.0 (API 24) or newer",
},
windows64: {
  url: "https://github.com/AamirSohail-WX/OmniCalc/releases/download/v1.1.0/OmniCalc-1.1.0-x64.exe",
  filename: "OmniCalc-1.1.0-x64.exe",
  size: "113.17 MB",
  platform: "Windows 64-bit",
  format: "Installer (.exe)",
  requirements: "Windows 10 or 11, 64-bit",
},
portable: {
  url: "https://github.com/AamirSohail-WX/OmniCalc/releases/download/v1.1.0/OmniCalc-1.1.0-portable.exe",
  filename: "OmniCalc-1.1.0-portable.exe",
  size: "103.02 MB",
  platform: "Windows 64-bit",
  format: "Portable (.exe)",
  requirements: "Windows 10 or 11, 64-bit",
},

  // 4) CONTACT - leave empty until you have them. Empty values show "coming soon" instead of broken links.
  contact: {
    email: "aamirsohail.wx@gmail.com", // e.g. "yourname@example.com"
    github: "https://github.com/AamirSohail-WX/OmniCalc",
  },

  // 5) CREATOR
  creator: {
    name: "Mrhi3e",
    fullName: "Aamir Sohail",
    description: "Independent student developer from Pakistan",
  },

  // 6) SCREENSHOTS - files live in assets/screenshots/. Replace the PNG files (same names) or edit this list.
  //    To add a screenshot: put the file in assets/screenshots/ and add a line here.
  screenshotFolder: "assets/screenshots/",
  screenshots: [
    {
      file: "Capture.png",
      caption: "Home screen",
      alt: "OmniCalc home screen (placeholder image)",
    },
    {
      file: "pc 1.png",
      caption: "Scientific calculator",
      alt: "OmniCalc scientific calculator (placeholder image)",
    },
    {
      file: "pc 2.png",
      caption: "Graphing",
      alt: "OmniCalc graphing tool (placeholder image)",
    },
    {
      file: "pc3.png",
      caption: "Equation solver",
      alt: "OmniCalc equation solver (placeholder image)",
    },
    {
      file: "pc4.png",
      caption: "Unit converter",
      alt: "OmniCalc unit converter (placeholder image)",
    },
  ],
};
