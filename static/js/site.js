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

  var links = [].slice.call(nav.querySelectorAll('a[href^="#"]'));
  var targets = links
    .map(function (a) {
      return { link: a, el: document.querySelector(a.getAttribute("href")) };
    })
    .filter(function (t) {
      return t.el;
    });

  // The reading line sits just below the sticky bar, and below where an
  // anchor click parks a section (html { scroll-padding-top }). The active
  // section is the LAST one whose top has crossed it — picking the first
  // one inside a band would credit the outgoing section's tail instead.
  var LINE = 120;

  // Clicking a link wins over the spy until the smooth scroll settles.
  var lockedUntil = 0;

  function setActive(current) {
    targets.forEach(function (t) {
      t.link.classList.toggle("is-active", t === current);
    });
  }

  function spy() {
    if (!targets.length || Date.now() < lockedUntil) return;

    var current = targets[0];
    targets.forEach(function (t) {
      if (t.el.getBoundingClientRect().top <= LINE) current = t;
    });

    // The last section is often too short to ever cross the line on its own.
    var atBottom =
      Math.ceil(window.innerHeight + window.scrollY) >= root.scrollHeight - 2;
    if (atBottom) current = targets[targets.length - 1];

    setActive(current);
  }

  targets.forEach(function (t) {
    t.link.addEventListener("click", function () {
      lockedUntil = Date.now() + 800;
      setActive(t);
    });
  });

  var ticking = false;
  function onFrame() {
    ticking = false;
    nav.classList.toggle("is-stuck", nav.getBoundingClientRect().top <= 0);
    spy();
  }
  function schedule() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onFrame);
    }
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  onFrame();
})();
