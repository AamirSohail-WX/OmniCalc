/* Theme handling. Loaded in <head> WITHOUT defer so the right theme is set before the page paints (no flash). */
(function () {
  var KEY = "omnicalc-theme",
    root = document.documentElement;
  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function systemTheme() {
    return window.matchMedia &&
      matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  function apply(t) {
    root.setAttribute("data-theme", t);
  }
  apply(stored() || systemTheme());

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    function label() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme",
      );
      btn.setAttribute(
        "title",
        dark ? "Switch to light theme" : "Switch to dark theme",
      );
    }
    label();
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      label();
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {
        /* storage blocked: theme still changes for this visit */
      }
    });
  });
})();
