/* How to Use page: searchable docs, active-section highlight, mobile sidebar. */
(function () {
  var nav = document.querySelector(".doc-nav");
  if (!nav) return;
  var secs = Array.prototype.slice.call(document.querySelectorAll(".doc-sec")),
    links = Array.prototype.slice.call(nav.querySelectorAll("li a"));
  var input = document.getElementById("doc-search"),
    empty = document.getElementById("doc-empty"),
    live = document.getElementById("doc-live");
  var wide = matchMedia("(min-width: 901px)");
  function sync() {
    if (wide.matches) nav.setAttribute("open", "");
    else nav.removeAttribute("open");
  }
  sync();
  wide.addEventListener("change", sync);
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      if (!wide.matches) nav.removeAttribute("open");
    });
  });

  /* Search: shows only sections containing every typed word. */
  secs.forEach(function (s) {
    s._text = s.textContent.toLowerCase();
  });
  input.addEventListener("input", function () {
    var words = input.value.toLowerCase().split(/\s+/).filter(Boolean),
      shown = 0;
    secs.forEach(function (s, k) {
      var ok = words.every(function (w) {
        return s._text.indexOf(w) !== -1;
      });
      s.hidden = !ok;
      links[k].parentNode.hidden = !ok;
      if (ok) shown++;
    });
    /* hide a group heading when every item under it is hidden */
    nav.querySelectorAll(".grp").forEach(function (g) {
      var n = g.nextElementSibling,
        any = false;
      while (n && !n.classList.contains("grp")) {
        if (!n.hidden) any = true;
        n = n.nextElementSibling;
      }
      g.hidden = !any;
    });
    empty.hidden = shown > 0;
    live.textContent = words.length
      ? shown + " section" + (shown === 1 ? "" : "s") + " found"
      : "";
  });

  /* Active section indicator */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + e.target.id,
            );
          });
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    secs.forEach(function (s) {
      io.observe(s);
    });
  }
})();
