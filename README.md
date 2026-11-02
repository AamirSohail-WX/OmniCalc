# OmniCalc — Official Website

Static website for OmniCalc, written in plain **HTML5, CSS3 and vanilla JavaScript**. No frameworks, no build step, no backend.

## Open it locally
Double-click `index.html` (it works from the file system), or serve the folder with any static server, e.g. `python -m http.server` and open http://localhost:8000.
Note: browsers only honour a download's custom filename over http(s); on GitHub Releases the filename comes from the release asset.

## Structure
```
index.html                Home
pages/                    downloads.html, about.html, instructions.html (How to Use), contact.html, privacy.html
css/                      style.css (colors/layout), responsive.css, animations.css
js/                       config.js (EDIT THIS), theme.js, navigation.js, main.js, downloads.js, gallery.js, documentation.js
assets/logo/              original OmniCalc four-square logo + favicons
assets/screenshots/       omnicalc-preview-01..05.png  (placeholders - replace)
assets/images/            og-image.png (social preview)
WEBSITE-SETUP.md          step-by-step customization guide
WEBSITE-TEST-REPORT.md    what was tested, and what was not
```

## Publish
Upload the whole folder to GitHub Pages, Netlify, Cloudflare Pages or any static host. All paths are relative. Then follow "Publishing checklist" in `WEBSITE-SETUP.md`.

## Source of the content
Feature descriptions were written from the OmniCalc source (v1.1.0: `package.json`, `README.md`, `FEATURES_STATUS.md`, `src/app/tools.ts` and the feature screens), not from memory. The OmniCalc application code was not modified.
