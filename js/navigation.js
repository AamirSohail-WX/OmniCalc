/* Mobile menu + back-to-top button. */
(function () {
  var header = document.querySelector(".site-header"),
    btn = document.querySelector("[data-menu-btn]");
  if (header && btn) {
    function set(open) {
      header.setAttribute("data-open", open);
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () {
      set(header.getAttribute("data-open") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.getAttribute("data-open") === "true") {
        set(false);
        btn.focus();
      }
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        set(false);
      });
    });
    window.addEventListener("resize", function () {
      if (innerWidth > 760) set(false);
    });
  }
  var top = document.querySelector("[data-to-top]");
  if (top) {
    addEventListener(
      "scroll",
      function () {
        top.classList.toggle("show", scrollY > 600);
      },
      { passive: true },
    );
    top.addEventListener("click", function () {
      scrollTo({ top: 0 });
    });
  }
})();
