# Website setup & customization guide

Almost everything lives in **`js/config.js`**. Open it in VS Code; every field has a comment.

## 1. Change the application version
In `js/config.js` change `version: "1.1.0"`. All download cards update. A single download can override it with its own `version: "..."` line.

## 2. Add GitHub download URLs
1. On GitHub create a Release and upload your three files (APK, installer, portable EXE).
2. Right-click each asset > *Copy link address*.
3. Paste into `downloads.android.url`, `downloads.windows64.url`, `downloads.portable.url`. Also fill `filename`.
Example: `https://github.com/USER/REPO/releases/download/v1.1.0/OmniCalc-1.1.0-x64.exe`
Until `url` is filled, that button shows "Download coming soon." and downloads nothing. Once filled, the click downloads directly (no popup).
The app builds produce `OmniCalc-<version>-x64.exe` (installer) and `OmniCalc-<version>-portable.exe` (see `electron-builder.yml`).

## 3. Update file sizes
Change `size: "To be added"` to e.g. `size: "78 MB"` for each download.

## 4. Replace the five screenshots
Save your screenshots as `assets/screenshots/omnicalc-preview-01.png` ... `-05.png` (same names, overwrite). Recommended 1280x800 (16:10). Also edit each `caption` and `alt` in `config.js` so they describe the real image.

## 5. Change the creator email
`contact.email: "you@example.com"` in `config.js`. The three contact buttons then open the visitor's email app with the subjects *Bug Report — OmniCalc*, *Feature Suggestion — OmniCalc* and *General Inquiry — OmniCalc*.

## 6. Add the GitHub repository
`contact.github: "https://github.com/USER/REPO"`. The footer and Contact page links activate automatically.

## 7. Change website text
Home, Downloads, About, Contact and Privacy text is in the `.html` files. Documentation text is in `pages/instructions.html` (one `<section class="doc-sec">` per topic; the sidebar entry is the `<a href="#id">` in the list at the top of the page).

## 8. Change colors
`css/style.css`, top of file: the `:root { ... }` block is the light theme, `:root[data-theme="dark"] { ... }` is the dark theme.

## 9. Change the logo
Replace `assets/logo/omnicalc-logo.png` (512x512), `favicon.svg`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` (180x180) and `logo-192.png`, keeping the same names. The logo in the navigation bar is that PNG.

## 10. Add another screenshot
Put `omnicalc-preview-06.png` into `assets/screenshots/` and add one line to `screenshots` in `config.js`:
`{ file: "omnicalc-preview-06.png", caption: "My caption", alt: "Description of the image" },`
The gallery, counter, dots and lightbox update automatically.

## Publishing checklist
- [ ] Replace `https://YOUR-DOMAIN.example/` with your real address in `config.js` (`website`) and in the `<head>` of every `.html` file (canonical, `og:url`, `og:image`). A find-and-replace across the folder does it.
- [ ] Add email and GitHub URL; add download URLs, sizes and filenames.
- [ ] Replace the five placeholder screenshots.
- [ ] Optional: add your photo to the About page yourself (none is included, as requested).

## Things to double-check about the app (found while inspecting it)
- The Windows installer and portable `.exe` and the Android APK had **not been built/verified** in the project files I was given (its README says the NSIS installer step was never run). Build and test them before publishing the links.
- The Android project says `versionName "1.0"` while the app is `1.1.0`. Consider aligning them (`android/app/build.gradle`); the website shows one version for all downloads unless you override it per download.
- Android minimum version on the Downloads page (Android 7.0, API 24) comes from `android/variables.gradle`; Windows 10/11 comes from the app README.


## Release information pages
- The homepage `What's New` panel is in `index.html`. Update its version, release date and summary when publishing a new release.
- `pages/old-versions.html` contains the release archive, platform requirements and known-issues notice. Keep archived downloads only when the corresponding release assets are available.
- The current 1.1.0 release is marked as the first official release (2 November 2026); no older public release is claimed or linked.
