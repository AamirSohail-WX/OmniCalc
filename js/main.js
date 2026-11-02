/* Fills text/links from OMNICALC_CONFIG: version, creator, email, GitHub. Nothing is hard-coded in the HTML. */
(function () {
  var c = window.OMNICALC_CONFIG;
  if (!c) return;
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = el
      .getAttribute("data-cfg")
      .split(".")
      .reduce(function (o, k) {
        return o && o[k];
      }, c);
    if (v) el.textContent = v;
  });
  // Links that depend on a value the owner may not have filled in yet.
  function pending(a, text) {
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
    a.setAttribute("title", text);
    a.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }
  document.querySelectorAll("[data-github]").forEach(function (a) {
    if (c.contact.github) {
      a.href = c.contact.github;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      pending(a, "GitHub repository link coming soon");
    }
  });
  document.querySelectorAll("[data-mail]").forEach(function (a) {
    var subject = a.getAttribute("data-mail");
    if (c.contact.email) {
      a.href =
        "mailto:" + c.contact.email + "?subject=" + encodeURIComponent(subject);
    } else {
      pending(a, "Email address coming soon");
    }
  });
  document.querySelectorAll("[data-email-text]").forEach(function (el) {
    el.textContent = c.contact.email || "Email address coming soon";
  });
  document.querySelectorAll("[data-contact-pending]").forEach(function (el) {
    el.hidden = !!(c.contact.email && c.contact.github);
  });
})();
