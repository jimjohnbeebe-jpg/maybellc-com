// Progressive enhancement only — content and navigation must work with this
// disabled. See .claude/rules/conventions.md.
//
// Everything below the year stamp is motion: the "boot sequence" (hero
// entrance + per-venture diagnostic self-test sweep) and the hero "work
// lamp" (pointer-tracked grid mask with a lagging glow). All of it bails
// out under prefers-reduced-motion and leaves the static page untouched.

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("animate" in Element.prototype)
  ) {
    return;
  }

  var EASE_OUT_QUINT = "cubic-bezier(0.22, 1, 0.36, 1)";

  /* ===== boot sequence: hero ===== */

  // Gates the hero-grid-in keyframe in styles.css.
  document.documentElement.classList.add("js-boot");

  [".hero__title", ".hero__lede", ".hero__cta"].forEach(function (sel, i) {
    var el = document.querySelector(sel);
    if (!el) return;
    el.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 700,
        delay: 150 + i * 160,
        easing: EASE_OUT_QUINT,
        fill: "backwards"
      }
    );
  });

  /* ===== boot sequence: venture self-test sweep ===== */

  // Each preview frame's browser-bar dots light fault -> signal -> clear as
  // the frame scrolls into view; the "documentation verified" badge stamps
  // in only after the sweep clears. .is-pending (the dimmed pre-state) is
  // applied here, not in the markup, so the no-JS page shows everything lit.
  if ("IntersectionObserver" in window) {
    var previews = document.querySelectorAll(".venture__preview");

    var sweep = function (preview) {
      var dots = preview.querySelectorAll(".venture__browser-bar .venture__dot");
      var DOT_STEP = 180;
      var DOT_DURATION = 340;

      dots.forEach(function (dot, i) {
        dot.animate(
          [
            { opacity: 0.2, transform: "scale(1)" },
            { opacity: 1, transform: "scale(1.35)", offset: 0.6 },
            { opacity: 1, transform: "scale(1)" }
          ],
          {
            duration: DOT_DURATION,
            delay: i * DOT_STEP,
            easing: "ease-out",
            fill: "backwards"
          }
        );
      });

      var sweepEnd = (dots.length - 1) * DOT_STEP + DOT_DURATION;

      var badge = preview.querySelector(".venture__badge");
      if (badge) {
        badge.animate(
          [
            { opacity: 0, transform: "scale(0.92)" },
            { opacity: 1, transform: "scale(1)" }
          ],
          {
            duration: 420,
            delay: sweepEnd,
            easing: EASE_OUT_QUINT,
            fill: "backwards"
          }
        );
      }

      // The WAAPI fills own the visuals from here; drop the dimmed pre-state
      // once the dots are lit so the page never depends on the class again.
      setTimeout(function () {
        preview.classList.remove("is-pending");
      }, sweepEnd + 40);
    };

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          sweep(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    previews.forEach(function (preview) {
      preview.classList.add("is-pending");
      io.observe(preview);
    });
  }

  /* ===== work lamp ===== */

  // The hero grid's radial mask (--lamp-x/y) tracks the pointer; a
  // torque-blue glow (--glow-x/y) trails it on a slower lerp. Touch/coarse
  // pointers get a slow autonomous drift instead, paused while the hero is
  // off-screen or the tab is hidden. The rAF loop self-stops when settled.
  var hero = document.querySelector(".hero");
  if (hero) {
    var HOME_X = 42;
    var HOME_Y = 42;
    var lamp = { x: HOME_X, y: HOME_Y };
    var glow = { x: HOME_X, y: HOME_Y };
    var target = { x: HOME_X, y: HOME_Y };
    var rafId = null;
    var drifting = false;
    var heroVisible = true;

    var step = function (now) {
      if (drifting) {
        target.x = HOME_X + 26 * Math.sin(now * 0.00021);
        target.y = HOME_Y + 20 * Math.sin(now * 0.00013 + 1.7);
      }

      lamp.x += (target.x - lamp.x) * 0.14;
      lamp.y += (target.y - lamp.y) * 0.14;
      glow.x += (target.x - glow.x) * 0.06;
      glow.y += (target.y - glow.y) * 0.06;

      hero.style.setProperty("--lamp-x", lamp.x.toFixed(2) + "%");
      hero.style.setProperty("--lamp-y", lamp.y.toFixed(2) + "%");
      hero.style.setProperty("--glow-x", glow.x.toFixed(2) + "%");
      hero.style.setProperty("--glow-y", glow.y.toFixed(2) + "%");

      var settled =
        !drifting &&
        Math.abs(target.x - lamp.x) < 0.05 &&
        Math.abs(target.y - lamp.y) < 0.05 &&
        Math.abs(target.x - glow.x) < 0.05 &&
        Math.abs(target.y - glow.y) < 0.05;

      rafId = settled ? null : requestAnimationFrame(step);
    };

    var start = function () {
      if (rafId === null) rafId = requestAnimationFrame(step);
    };
    var stop = function () {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      hero.addEventListener("pointermove", function (e) {
        var rect = hero.getBoundingClientRect();
        target.x = ((e.clientX - rect.left) / rect.width) * 100;
        target.y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.classList.add("hero--lamp-on");
        start();
      });
      hero.addEventListener("pointerleave", function () {
        target.x = HOME_X;
        target.y = HOME_Y;
        hero.classList.remove("hero--lamp-on");
        start();
      });
    } else if ("IntersectionObserver" in window) {
      drifting = true;
      hero.classList.add("hero--lamp-on");

      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible && !document.hidden) start();
        else stop();
      }).observe(hero);

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop();
        else if (heroVisible) start();
      });
    }
  }
})();
