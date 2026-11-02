# Website test report

Date: 2026-11-02. Tested by an automated script (Playwright + Chromium 141, headless, Linux) against the finished files, then again against the extracted ZIP. Nothing below is assumed; "Not tested" lists what could not be done.

## Passed (automated, Chromium)
- Static: every local href/src resolves to a file
- Static: every docs deep-link anchor exists
- All 6 pages load with no console/page errors and no failed requests
- No horizontal overflow at 320px (6 pages)
- No horizontal overflow at 375px (6 pages)
- No horizontal overflow at 430px (6 pages)
- No horizontal overflow at 768px (6 pages)
- No horizontal overflow at 1024px (6 pages)
- No horizontal overflow at 1440px (6 pages)
- Theme follows system (light) with no saved choice
- Toggle switches to dark
- Theme persists on another page
- Theme persists after refresh
- System dark preference respected; theme set before first paint
- Mobile: menu hidden by default
- Mobile: menu opens, aria-expanded=true
- Mobile: Escape closes menu
- Mobile: menu link navigates
- Gallery: starts at 1 / 5, 5 slides, 5 dots
- Gallery: next/prev (wraps)
- Gallery: indicator jumps to slide 3, aria-current set
- Lightbox opens
- Lightbox: arrow key next
- Lightbox: prev button
- Lightbox: focus stays trapped inside dialog
- Lightbox: Escape closes and focus returns to the thumbnail
- Downloads: 3 cards show version 1.1.0 + size placeholder from config
- Downloads: empty URL -> 'Download coming soon.' on every card, no download, no navigation
- Docs: search narrows sections — 1/21
- Docs: no-results message
- Docs: sidebar click scrolls and marks active link
- Docs: back-to-top appears, scrolls to top
- Docs: back-to-top returns to top
- Docs (mobile): sidebar collapses into 'On this page' disclosure
- Contact (empty config): mail links inactive, notice visible, no errors
- Footer GitHub link is inert (no empty href) when unset
- Downloads (temp config, served over local HTTP): configured URL starts a direct download with the configured filename, no popup
- Downloads (temp config): other (empty) cards still say coming soon
- Contact (temp config): 3 mailto links with correct encoded subjects — mailto:dev@example.com?subject=Bug%20Report%20%E2%80%94%20OmniCalc
- Contact/footer (temp config): GitHub link set, opens in new tab with rel=noopener
- A11y: one <h1> per page, skip link, lang, alt on images
- A11y: first Tab reaches skip link and it becomes visible
- A11y: reduced-motion disables transitions

Viewports tested: 320, 375, 430, 768, 1024, 1440 px (Chromium viewport emulation). Screenshots were also inspected by eye (home light/dark, mobile downloads page, docs).

## Color contrast (computed from the CSS tokens, WCAG formula)
| Pair | Ratio | Result |
|---|---|---|
| Light: body text #111111 on #fbfbfa | 18.2:1 | Pass (AA, 4.5:1) |
| Light: muted text #5a5a57 on #fbfbfa | 6.7:1 | Pass (AA, 4.5:1) |
| Light: muted text on card #ffffff | 6.9:1 | Pass (AA, 4.5:1) |
| Dark: body text #f5f5f4 on #0b0b0b | 18.0:1 | Pass (AA, 4.5:1) |
| Dark: muted text #a5a5a1 on #0b0b0b | 8.0:1 | Pass (AA, 4.5:1) |
| Dark: muted text on card #141414 | 7.5:1 | Pass (AA, 4.5:1) |
| Light: button text #fff on #111 | 18.9:1 | Pass (AA, 4.5:1) |
| Dark: button text #0b0b0b on #f5f5f4 | 18.0:1 | Pass (AA, 4.5:1) |

## Failed
None in the final run. Two early failures were test-setup issues, fixed and re-run: (1) the back-to-top test did not wait for smooth scrolling to finish; (2) a custom download filename is ignored by browsers for `file://` pages, so the download test now runs over local HTTP.

## Not tested
- **Firefox and Safari** (Firefox is not installed in the test environment; no Apple devices). Code uses standard features (`color-mix`, `backdrop-filter`, `IntersectionObserver`); `color-mix` needs a 2023+ browser version.
- **Real phones/tablets** (Android, iPhone). Only viewport emulation was used.
- **Screen readers** (NVDA, VoiceOver, TalkBack). Labels, roles, live regions and focus handling are present and keyboard-tested, but not heard.
- A full automated accessibility audit (axe/Lighthouse) was not run.

## Requires real-world verification
- **Real downloads.** No download URLs exist yet. Behaviour with configured URLs was tested with a temporary local file (removed before packaging). Test with your real GitHub Release links, including the browser's download prompt.
- The Windows installer, portable build and Android APK themselves (the website only links to them).
- Email buttons were checked only for the correct `mailto:` link and encoded subject, not for opening an actual mail app.
- Canonical/Open Graph tags contain the placeholder domain until you publish.
