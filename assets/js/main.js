// Progressive enhancement only — content and navigation must work with this
// disabled. See .claude/rules/conventions.md.
//
// Overdrive pass ("The Living Garage"). Everything here is additive: the
// boot overlay, hero canvas scene, HUD rail, brackets, and scanline layers
// are all injected by this script, so the no-JS page renders the plain
// static site. Per D-06, motion runs on every machine — there is no
// prefers-reduced-motion bail-out (Jim's explicit call: the OS flag is too
// often set by Windows performance presets to gate the whole experience).

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  var FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* =====================================================================
     Terminal boot takeover — once per tab session. Types a diagnostic
     self-test, then wipes up to reveal the page. Click or keypress skips.
     ===================================================================== */

  function runBoot(onDone) {
    var booted = false;
    try {
      booted = sessionStorage.getItem("mllc-booted") === "1";
    } catch (e) {
      /* storage blocked — boot every load rather than never */
    }
    if (booted || !("animate" in Element.prototype)) {
      onDone(false);
      return;
    }
    try {
      sessionStorage.setItem("mllc-booted", "1");
    } catch (e) {
      /* ignore */
    }

    var LINES = [
      { text: "MAYBE LLC // DIAGNOSTIC MODE", cls: "boot__head" },
      { text: "SCANNING PORTFOLIO ..." },
      { text: "01 REPAIRVECTOR ........ ", ok: true },
      { text: "02 ZEPHYRPHOTO ......... ", ok: true },
      { text: "03 RESCUERICH .......... ", ok: true },
      { text: "ALL SYSTEMS CLEAR", cls: "boot__ok" }
    ];

    var overlay = document.createElement("div");
    overlay.className = "boot";
    overlay.setAttribute("aria-hidden", "true");
    var log = document.createElement("div");
    log.className = "boot__log";
    overlay.appendChild(log);

    var lineEls = LINES.map(function (line) {
      var el = document.createElement("div");
      el.className = "boot__line" + (line.cls ? " " + line.cls : "");
      log.appendChild(el);
      return el;
    });

    var cursor = document.createElement("span");
    cursor.className = "boot__cursor";

    document.body.appendChild(overlay);
    document.documentElement.style.overflow = "hidden";

    // Time-based typing: progress derives from elapsed wall-clock time, so
    // throttled timers (background/occluded tabs) slow the tick rate but
    // never stretch the total duration. A hard cap force-finishes anyway.
    var CHAR_MS = 6;
    var LINE_PAUSE = 55;
    var finished = false;
    var timer = null;

    var schedule = [];
    var acc = 100; // lead-in
    LINES.forEach(function (line) {
      var start = acc;
      acc += line.text.length * CHAR_MS + LINE_PAUSE;
      schedule.push({ start: start, end: acc - LINE_PAUSE });
    });
    var total = acc;
    var t0 = performance.now();

    function okSpan() {
      var s = document.createElement("span");
      s.className = "boot__ok";
      s.textContent = "OK";
      return s;
    }

    function render(elapsed) {
      for (var i = 0; i < LINES.length; i++) {
        var line = LINES[i];
        var slot = schedule[i];
        var el = lineEls[i];
        if (elapsed >= slot.end) {
          if (el.dataset.done !== "1") {
            el.dataset.done = "1";
            el.textContent = line.text;
            if (line.ok) el.appendChild(okSpan());
          }
        } else if (elapsed >= slot.start) {
          var chars = Math.floor((elapsed - slot.start) / CHAR_MS);
          el.textContent = line.text.slice(0, chars);
          el.appendChild(cursor);
          return;
        } else {
          return;
        }
      }
    }

    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      render(total + 1);
      lineEls[lineEls.length - 1].appendChild(cursor);
      document.removeEventListener("keydown", finish);
      overlay.removeEventListener("pointerdown", finish);
      setTimeout(function () {
        overlay.classList.add("boot--out");
        setTimeout(function () {
          overlay.remove();
          document.documentElement.style.overflow = "";
        }, 520);
        onDone(true);
      }, 240);
    }

    function tick() {
      if (finished) return;
      var elapsed = performance.now() - t0;
      if (elapsed >= total) {
        finish();
        return;
      }
      render(elapsed);
      timer = setTimeout(tick, 24);
    }

    document.addEventListener("keydown", finish);
    overlay.addEventListener("pointerdown", finish);
    lineEls[0].appendChild(cursor);
    timer = setTimeout(tick, 24);
    setTimeout(finish, total + 1500); // hard cap, throttling-proof
  }

  /* =====================================================================
     Hero entrance — plays right after the boot wipe.
     ===================================================================== */

  function heroEntrance() {
    [".hero__title", ".hero__lede", ".hero__cta"].forEach(function (sel, i) {
      var el = document.querySelector(sel);
      if (!el) return;
      el.animate(
        [
          { opacity: 0, transform: "translateY(26px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 800, delay: i * 110, easing: EASE, fill: "backwards" }
      );
    });
  }

  /* =====================================================================
     The Living Garage — hero canvas scene. Three parallax grid layers
     drifting, a periodic diagnostic scan-beam, dust motes that catch the
     light, and a cursor-following lamp. Pauses off-screen / hidden tab.
     ===================================================================== */

  function heroScene() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var canvas = document.createElement("canvas");
    canvas.className = "hero__scene";
    canvas.setAttribute("aria-hidden", "true");
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    hero.insertBefore(canvas, hero.firstChild);
    hero.classList.add("hero--live");

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0;
    var h = 0;

    function resize() {
      var rect = hero.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var LAYERS = [
      { gap: 112, alpha: 0.028, depth: 30, drift: 6.5 },
      { gap: 56, alpha: 0.02, depth: 16, drift: 3.5 },
      { gap: 28, alpha: 0.011, depth: 7, drift: 1.8 }
    ];

    var pointer = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45, s: 0, ts: 0 };
    var BEAM_PERIOD = 14000;
    var BEAM_SWEEP = 1700;
    var rafId = null;
    var running = false;

    if (FINE_POINTER) {
      hero.addEventListener("pointermove", function (e) {
        var rect = hero.getBoundingClientRect();
        pointer.tx = (e.clientX - rect.left) / rect.width;
        pointer.ty = (e.clientY - rect.top) / rect.height;
        pointer.ts = 1;
      });
      hero.addEventListener("pointerleave", function () {
        pointer.ts = 0;
      });
    }

    function frame(now) {
      if (!running) return;

      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.s += (pointer.ts - pointer.s) * 0.06;

      ctx.clearRect(0, 0, w, h);

      // parallax blueprint grid
      var px = (pointer.x - 0.5) * 2;
      var py = (pointer.y - 0.5) * 2;
      LAYERS.forEach(function (L) {
        var ox = ((now / 1000) * L.drift + px * L.depth) % L.gap;
        var oy = (py * L.depth) % L.gap;
        ctx.strokeStyle = "rgba(148, 163, 184, " + L.alpha + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var x = -L.gap + ox; x < w + L.gap; x += L.gap) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
        }
        for (var y = -L.gap + oy; y < h + L.gap; y += L.gap) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
        }
        ctx.stroke();
      });

      ctx.globalCompositeOperation = "lighter";

      // periodic diagnostic scan-beam
      var phase = (now % BEAM_PERIOD) / BEAM_SWEEP;
      if (phase <= 1) {
        var beamX = (-0.18 + phase * 1.36) * w;
        var half = w * 0.09;
        var g = ctx.createLinearGradient(beamX - half, 0, beamX + half, 0);
        g.addColorStop(0, "rgba(37, 99, 235, 0)");
        g.addColorStop(0.5, "rgba(96, 165, 250, 0.07)");
        g.addColorStop(1, "rgba(37, 99, 235, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(beamX - half, 0, half * 2, h);
        var core = ctx.createLinearGradient(beamX - 6, 0, beamX + 6, 0);
        core.addColorStop(0, "rgba(147, 197, 253, 0)");
        core.addColorStop(0.5, "rgba(147, 197, 253, 0.11)");
        core.addColorStop(1, "rgba(147, 197, 253, 0)");
        ctx.fillStyle = core;
        ctx.fillRect(beamX - 6, 0, 12, h);
      }

      // cursor lamp
      if (pointer.s > 0.01) {
        var cx = pointer.x * w;
        var cy = pointer.y * h;
        var lamp = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340);
        lamp.addColorStop(0, "rgba(96, 165, 250, " + 0.11 * pointer.s + ")");
        lamp.addColorStop(1, "rgba(96, 165, 250, 0)");
        ctx.fillStyle = lamp;
        ctx.fillRect(cx - 340, cy - 340, 680, 680);
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }

    var heroVisible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
        if (heroVisible && !document.hidden) start();
        else stop();
      }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else if (heroVisible) start();
    });
    start();
  }

  /* =====================================================================
     3D tilt + glare on the venture preview frames (fine pointers only).
     ===================================================================== */

  function frameTilt() {
    if (!FINE_POINTER) return;
    document.querySelectorAll(".venture__preview").forEach(function (preview) {
      var frameEl = preview.querySelector(".venture__frame");
      if (!frameEl) return;
      var rx = 0, ry = 0, trx = 0, try_ = 0;
      var rafId = null;

      function step() {
        rx += (trx - rx) * 0.14;
        ry += (try_ - ry) * 0.14;
        frameEl.style.transform =
          "perspective(1100px) rotateX(" + rx.toFixed(3) + "deg) rotateY(" + ry.toFixed(3) + "deg)";
        if (Math.abs(trx - rx) < 0.01 && Math.abs(try_ - ry) < 0.01) {
          if (trx === 0 && try_ === 0) frameEl.style.transform = "";
          rafId = null;
          return;
        }
        rafId = requestAnimationFrame(step);
      }
      function go() {
        if (rafId === null) rafId = requestAnimationFrame(step);
      }

      preview.addEventListener("pointermove", function (e) {
        var rect = frameEl.getBoundingClientRect();
        var nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        var ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        trx = -ny * 6;
        try_ = nx * 8;
        frameEl.style.setProperty("--glare-x", (nx * 120).toFixed(1) + "%");
        frameEl.style.setProperty("--glare-o", "1");
        go();
      });
      preview.addEventListener("pointerleave", function () {
        trx = 0;
        try_ = 0;
        frameEl.style.setProperty("--glare-o", "0");
        go();
      });
    });
  }

  /* =====================================================================
     CRT power-on: when a frame scrolls into view its screenshot snaps on
     like a monitor (bright horizontal line expanding), scanlines fade,
     status dots run fault -> signal -> clear, corner brackets draw in,
     and the verified badge stamps.
     ===================================================================== */

  function powerOns() {
    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

    function powerOn(preview) {
      var frameEl = preview.querySelector(".venture__frame");
      var img = frameEl && frameEl.querySelector("img");
      if (!img) return;

      img.animate(
        [
          { transform: "scaleY(0.006)", filter: "brightness(7) saturate(0)" },
          { transform: "scaleY(1.03)", filter: "brightness(1.7) saturate(0.7)", offset: 0.55 },
          { transform: "scaleY(1)", filter: "brightness(1) saturate(1)" }
        ],
        { duration: 850, easing: EASE }
      );

      var lines = document.createElement("div");
      lines.className = "crt-lines";
      frameEl.appendChild(lines);
      lines
        .animate([{ opacity: 0.75 }, { opacity: 0 }], { duration: 1300, easing: "ease-out" })
        .onfinish = function () {
          lines.remove();
        };

      preview.querySelectorAll(".venture__browser-bar .venture__dot").forEach(function (dot, i) {
        dot.animate(
          [
            { opacity: 0.15, transform: "scale(1)" },
            { opacity: 1, transform: "scale(1.6)", offset: 0.6 },
            { opacity: 1, transform: "scale(1)" }
          ],
          { duration: 360, delay: 250 + i * 170, easing: "ease-out", fill: "backwards" }
        );
      });

      ["tl", "tr", "bl", "br"].forEach(function (corner, i) {
        var b = document.createElement("span");
        b.className = "frame-bracket frame-bracket--" + corner;
        frameEl.appendChild(b);
        b.animate(
          [
            { opacity: 0, transform: "scale(1.8)" },
            { opacity: 0.55, transform: "scale(1)" }
          ],
          { duration: 450, delay: 450 + i * 70, easing: EASE, fill: "backwards" }
        );
      });

      var badge = preview.querySelector(".venture__badge");
      if (badge) {
        badge.animate(
          [
            { opacity: 0, transform: "scale(0.85)" },
            { opacity: 1, transform: "scale(1)" }
          ],
          { duration: 450, delay: 900, easing: EASE, fill: "backwards" }
        );
      }
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          powerOn(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll(".venture__preview").forEach(function (p) {
      io.observe(p);
    });
  }

  /* =====================================================================
     HUD scan rail — live scroll telemetry on the right edge (>=900px,
     hidden by CSS below that).
     ===================================================================== */

  function hud() {
    var main = document.getElementById("main");
    if (!main) return;
    var el = document.createElement("div");
    el.className = "hud";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<div class="hud__track"><div class="hud__thumb"></div></div><div class="hud__label"></div>';
    document.body.appendChild(el);
    var thumb = el.querySelector(".hud__thumb");
    var label = el.querySelector(".hud__label");

    var sections = [
      { id: "top", name: "HERO" },
      { id: "ventures", name: "VENTURES" },
      { id: "about", name: "ABOUT" }
    ];

    var pending = false;
    function update() {
      pending = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      thumb.style.top = (p * (150 - 26)).toFixed(1) + "px";
      var name = sections[0].name;
      var probe = window.scrollY + window.innerHeight * 0.4;
      sections.forEach(function (s) {
        var sec = document.getElementById(s.id);
        if (sec && sec.offsetTop <= probe) name = s.name;
      });
      if (p > 0.96) name = "CONTACT";
      label.textContent = name + " · " + Math.round(p * 100) + "%";
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!pending) {
          pending = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", update);
    update();
  }

  /* ===== ignition ===== */

  runBoot(function (played) {
    heroScene();
    if (played) heroEntrance();
  });
  frameTilt();
  powerOns();
  hud();
})();
