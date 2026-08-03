(function () {
  "use strict";

  /* ---------------------------------------------------------------- theme */

  var root = document.documentElement;

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode — the toggle still works for this page view */
      }
    });
  });

  /* ------------------------------------------------------------ section nav */

  var nav = document.querySelector(".sectionnav");
  if (!nav) return;

  // Shadow line only once the bar has actually stuck to the top.
  var ticking = false;
  function syncStuck() {
    nav.classList.toggle("is-stuck", nav.getBoundingClientRect().top <= 0);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(syncStuck);
      }
    },
    { passive: true }
  );
  syncStuck();

  /* -------------------------------------------------------------- scrollspy */

  var links = [].slice.call(nav.querySelectorAll('a[href^="#"]'));
  if (!links.length || !("IntersectionObserver" in window)) return;

  var targets = links
    .map(function (a) {
      return { link: a, el: document.querySelector(a.getAttribute("href")) };
    })
    .filter(function (t) {
      return t.el;
    });
  if (!targets.length) return;

  var visible = new Set();

  function highlight() {
    // Document order wins, so the topmost section in the reading band is active.
    var current = targets.filter(function (t) {
      return visible.has(t.el);
    })[0];
    if (!current) return;
    targets.forEach(function (t) {
      t.link.classList.toggle("is-active", t === current);
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      highlight();
    },
    // Band from just under the sticky bar down to ~1/3 of the viewport.
    { rootMargin: "-88px 0px -66% 0px", threshold: 0 }
  );

  targets.forEach(function (t) {
    observer.observe(t.el);
  });
})();
