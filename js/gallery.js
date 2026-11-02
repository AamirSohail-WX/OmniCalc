/* Screenshot gallery + lightbox. No autoplay. Images come from OMNICALC_CONFIG.screenshots. */
(function () {
  var c = window.OMNICALC_CONFIG,
    root = document.querySelector("[data-gallery]");
  if (!c || !root) return;
  var prefix = document.body.getAttribute("data-root") || "",
    shots = c.screenshots,
    n = shots.length,
    i = 0;
  var src = function (k) {
    return prefix + c.screenshotFolder + shots[k].file;
  };
  var track = root.querySelector(".g-track"),
    dots = root.querySelector(".g-dots"),
    count = root.querySelector(".g-count"),
    cap = root.querySelector(".g-caption");
  var ICON = {
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };

  shots.forEach(function (s, k) {
    var li = document.createElement("li");
    li.setAttribute("aria-label", k + 1 + " of " + n);
    li.innerHTML =
      '<button type="button" class="g-open" aria-label="View larger: ' +
      s.caption +
      '"><img src="' +
      src(k) +
      '" alt="' +
      s.alt +
      '" width="1280" height="800"' +
      (k ? ' loading="lazy"' : "") +
      "></button>";
    li.querySelector("button").addEventListener("click", function () {
      openBox(k);
    });
    track.appendChild(li);
    var d = document.createElement("button");
    d.type = "button";
    d.className = "g-dot";
    d.setAttribute("aria-label", "Show image " + (k + 1) + ": " + s.caption);
    d.addEventListener("click", function () {
      show(k);
    });
    dots.appendChild(d);
  });
  function show(k) {
    i = (k + n) % n;
    track.style.transform = "translateX(-" + i * 100 + "%)";
    track.querySelectorAll("li").forEach(function (li, j) {
      li.setAttribute("aria-hidden", j !== i);
      li.querySelector("button").tabIndex = j === i ? 0 : -1;
    });
    dots.querySelectorAll(".g-dot").forEach(function (d, j) {
      d.setAttribute("aria-current", j === i);
    });
    count.textContent = i + 1 + " / " + n;
    cap.textContent = shots[i].caption;
  }
  root.querySelector("[data-prev]").addEventListener("click", function () {
    show(i - 1);
  });
  root.querySelector("[data-next]").addEventListener("click", function () {
    show(i + 1);
  });
  root.addEventListener("keydown", function (e) {
    if (!e.target.closest(".lightbox")) {
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    }
  });
  show(0);

  /* Lightbox */
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Screenshot viewer");
  box.innerHTML =
    '<span class="lb-count" aria-live="polite"></span><button class="icon-btn lb-close" type="button" aria-label="Close viewer">' +
    ICON.close +
    '</button><button class="icon-btn lb-prev" type="button" aria-label="Previous image">' +
    ICON.prev +
    '</button><img alt=""><button class="icon-btn lb-next" type="button" aria-label="Next image">' +
    ICON.next +
    "</button>";
  document.body.appendChild(box);
  var img = box.querySelector("img"),
    lbCount = box.querySelector(".lb-count"),
    opener = null,
    closeBtn = box.querySelector(".lb-close");
  function paint() {
    img.src = src(i);
    img.alt = shots[i].alt;
    lbCount.textContent = i + 1 + " / " + n + " - " + shots[i].caption;
    show(i);
  }
  function openBox(k) {
    opener = document.activeElement;
    i = k;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
    paint();
    closeBtn.focus();
  }
  function closeBox() {
    box.classList.remove("open");
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }
  closeBtn.addEventListener("click", closeBox);
  box.querySelector(".lb-prev").addEventListener("click", function () {
    i = (i - 1 + n) % n;
    paint();
  });
  box.querySelector(".lb-next").addEventListener("click", function () {
    i = (i + 1) % n;
    paint();
  });
  box.addEventListener("click", function (e) {
    if (e.target === box) closeBox();
  });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") closeBox();
    else if (e.key === "ArrowLeft") {
      i = (i - 1 + n) % n;
      paint();
    } else if (e.key === "ArrowRight") {
      i = (i + 1) % n;
      paint();
    } else if (e.key === "Tab") {
      /* keep focus inside the dialog */
      var f = box.querySelectorAll("button"),
        first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
