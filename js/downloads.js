/* Download cards. Every card reads its data from OMNICALC_CONFIG.downloads - no URLs in the HTML.
   Empty URL  -> click is cancelled and "Download coming soon." is shown (nothing is downloaded).
   Real URL   -> the link is a normal direct download (no popup, no intermediate page). */
(function () {
  var c = window.OMNICALC_CONFIG;
  if (!c) return;
  document.querySelectorAll("[data-download]").forEach(function (card) {
    var d = c.downloads[card.getAttribute("data-download")];
    if (!d) return;
    var vals = {
      version: d.version || c.version,
      size: d.size,
      format: d.format,
      platform: d.platform,
      requirements: d.requirements,
    };
    Object.keys(vals).forEach(function (k) {
      var el = card.querySelector('[data-field="' + k + '"]');
      if (el && vals[k]) el.textContent = vals[k];
    });
    var btn = card.querySelector("[data-dl-btn]"),
      status = card.querySelector("[data-dl-status]");
    var url = (d.url || "").trim();
    if (url) {
      btn.setAttribute("href", url);
      btn.setAttribute("download", d.filename || "");
      btn.removeAttribute("role");
      return;
    }
    btn.setAttribute("href", "#");
    btn.setAttribute("role", "button");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      status.textContent = "Download coming soon.";
    });
  });
})();
