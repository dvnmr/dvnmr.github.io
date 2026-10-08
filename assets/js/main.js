/* ============================================================
   MOORE ELECTRIC — main.js
   Motion budget: power-on + kinetic type + scroll reveals.
   Everything else is CSS. Vanilla JS; GSAP only enhances.
   - 60fps: transforms/opacity only, passive listeners, rAF cursor
   - Accessible: reduced-motion disables all of it, keyboard BA slider
   - Resilient: every GSAP block guards `window.gsap`; IO fallback
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var doc = document.documentElement;

  if (reduceMotion) doc.classList.add("reduced-motion");
  if (!hasGsap) doc.classList.add("no-gsap");
  doc.classList.remove("no-js");

  /* ---------- 1. POWER-ON SIGNATURE MOMENT ---------- */
  var poweron = document.getElementById("poweron");
  var boltPath = document.getElementById("boltPath");

  function finishPowerOn() {
    if (!poweron || poweron.classList.contains("done")) return;
    poweron.classList.add("done");
    poweron.setAttribute("aria-hidden", "true");
    heroEntrance();
  }

  if (poweron && !reduceMotion && hasGsap && boltPath) {
    var len = boltPath.getTotalLength();
    boltPath.style.strokeDasharray = len;
    boltPath.style.strokeDashoffset = len;
    // Bolt draws itself, then the hero "lights up"
    gsap.to(boltPath, {
      strokeDashoffset: 0, duration: 0.85, ease: "power2.inOut",
      onComplete: function () {
        gsap.to(poweron, {
          opacity: 0, duration: 0.4, ease: "power2.out", delay: 0.15,
          onComplete: finishPowerOn
        });
      }
    });
    // Skippable: tap anywhere to skip
    poweron.addEventListener("click", finishPowerOn, { passive: true });
    // Hard ceiling: never trap the visitor
    setTimeout(finishPowerOn, 2200);
  } else {
    finishPowerOn();
  }

  /* ---------- 2. KINETIC TYPE HERO ---------- */
  function splitChars(el) {
    var text = el.textContent;
    el.setAttribute("aria-hidden", "true");
    el.textContent = "";
    var frag = document.createDocumentFragment();
    text.split("").forEach(function (c) {
      var s = document.createElement("span");
      s.className = "ch";
      s.textContent = c === " " ? "\u00A0" : c;
      frag.appendChild(s);
    });
    el.appendChild(frag);
    return el.querySelectorAll(".ch");
  }

  function heroEntrance() {
    var lines = document.querySelectorAll("#heroTitle .ht-line[data-split]");
    var heroBits = document.querySelectorAll(".reveal-hero");
    if (hasGsap && !reduceMotion && lines.length) {
      var chars = [];
      lines.forEach(function (line) { splitChars(line); });
      document.querySelectorAll("#heroTitle .ch").forEach(function (c) { chars.push(c); });
      gsap.set(chars, { yPercent: 110, opacity: 0 });
      gsap.set(heroBits, { y: 18, opacity: 0 });
      var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(chars, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.028 })
        .to(heroBits, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.55");
      // Subtle hero-bg settle (transform only, compositor-friendly)
      var bg = document.querySelector(".hero-bg img");
      if (bg) {
        gsap.fromTo(bg, { scale: 1.12 }, { scale: 1.06, duration: 2.4, ease: "power2.out" });
      }
    } else {
      // No-JS / no-GSAP / reduced-motion: content is simply visible (CSS classes handle it)
      document.querySelectorAll(".reveal-hero").forEach(function (el) {
        el.style.opacity = "1"; el.style.transform = "none";
      });
    }
  }

  /* ---------- 3. SCROLL REVEALS ---------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-group]");
  if (hasGsap && !reduceMotion && typeof window.ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    revealEls.forEach(function (el) {
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: function () { el.classList.add("in"); }
      });
    });
    // Counters run when visible
    document.querySelectorAll("[data-count]").forEach(setupCounter);
  } else if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll("[data-count]").forEach(function (el) { cio.observe(el); });
  } else {
    // Everything visible; counters set to final values
    revealEls.forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll("[data-count]").forEach(function (el) { setCounterFinal(el); });
  }

  function setCounterFinal(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    el.textContent = target.toFixed(dec);
  }

  function runCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (hasGsap && !reduceMotion) {
      var obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 1.6, ease: "power2.out",
        onUpdate: function () { el.textContent = obj.v.toFixed(dec); }
      });
    } else {
      setCounterFinal(el);
    }
  }

  function setupCounter(el) {
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: function () { runCounter(el); }
    });
  }

  /* ---------- 4. BEFORE / AFTER SLIDER ---------- */
  (function beforeAfter() {
    var slider = document.getElementById("baSlider");
    if (!slider) return;
    var before = document.getElementById("baBefore");
    var handle = document.getElementById("baHandle");
    var dragging = false;

    function setPos(clientX) {
      var r = slider.getBoundingClientRect();
      var pct = ((clientX - r.left) / r.width) * 100;
      setFromPct(pct);
    }
    function setFromPct(pct) {
      pct = Math.max(2, Math.min(98, pct));
      // clip-path keeps the before image full-size; only the reveal changes
      before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
      slider.setAttribute("aria-valuenow", Math.round(pct));
    }

    slider.addEventListener("pointerdown", function (e) {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      setPos(e.clientX);
    });
    slider.addEventListener("pointermove", function (e) {
      if (dragging) setPos(e.clientX);
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
      slider.addEventListener(ev, function () { dragging = false; });
    });
    slider.addEventListener("keydown", function (e) {
      var cur = parseFloat(slider.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") { setFromPct(cur - 5); e.preventDefault(); }
      if (e.key === "ArrowRight") { setFromPct(cur + 5); e.preventDefault(); }
    });
    // Gentle intro nudge (respects reduced motion)
    if (!reduceMotion && hasGsap && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            io.disconnect();
            var o = { p: 50 };
            gsap.to(o, {
              p: 62, duration: 0.9, ease: "power2.inOut", yoyo: true, repeat: 1,
              onUpdate: function () { setFromPct(o.p); }
            });
          }
        });
      }, { threshold: 0.5 });
      io.observe(slider);
    }
  })();

  /* ---------- 5. LIGHTBOX (gallery) ---------- */
  (function lightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".work-item"));
    var lb = document.getElementById("lightbox");
    if (!items.length || !lb) return;
    var img = document.getElementById("lbImg");
    var cap = document.getElementById("lbCaption");
    var idx = 0, lastFocus = null;
    var touchX = null;

    function open(i, opener) {
      idx = (i + items.length) % items.length;
      lastFocus = opener || document.activeElement;
      var it = items[idx];
      img.src = it.getAttribute("data-full");
      img.alt = it.querySelector("img").alt || "";
      cap.textContent = it.getAttribute("data-caption") || "";
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add("open"); });
      document.body.style.overflow = "hidden";
      document.getElementById("lbClose").focus();
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      setTimeout(function () { lb.hidden = true; }, 300);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function nav(d) { open(idx + d); }

    items.forEach(function (it, i) {
      it.addEventListener("click", function () { open(i, it); });
    });
    document.getElementById("lbClose").addEventListener("click", close);
    document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); nav(-1); });
    document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); nav(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") nav(-1);
      if (e.key === "ArrowRight") nav(1);
    });
    // Swipe
    lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) nav(dx < 0 ? 1 : -1);
      touchX = null;
    }, { passive: true });
  })();

  /* ---------- 6. STICKY CALL BAR + HEADER COMPRESS ---------- */
  (function chrome() {
    var bar = document.getElementById("stickyCall");
    var header = document.getElementById("siteHeader");
    var hero = document.querySelector(".hero");
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle("scrolled", y > 40);
      if (bar && hero) {
        var past = y > hero.offsetHeight * 0.55;
        var nearQuote = false;
        var qf = document.getElementById("quoteForm");
        if (qf) {
          var r = qf.getBoundingClientRect();
          nearQuote = r.top < window.innerHeight && r.bottom > 0;
        }
        // Hide while the quote form is on screen (don't cover the CTA)
        bar.classList.toggle("visible", past && !nearQuote);
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ---------- 7. MOBILE NAV ---------- */
  (function mobileNav() {
    var btn = document.getElementById("navToggle");
    var nav = document.getElementById("mobileNav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  })();

  /* ---------- 8. MAGNETIC BUTTONS (desktop, fine pointer only) ---------- */
  if (finePointer && !reduceMotion && hasGsap) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      var xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
      var yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        xTo(Math.max(-14, Math.min(14, dx * 0.22)));
        yTo(Math.max(-10, Math.min(10, dy * 0.22)));
      });
      btn.addEventListener("mouseleave", function () { xTo(0); yTo(0); });
    });
  }

  /* ---------- 9. CURSOR GLOW (desktop, fine pointer only) ---------- */
  if (finePointer && !reduceMotion) {
    var glow = document.getElementById("cursorGlow");
    if (glow) {
      var gx = -400, gy = -400, tx = -400, ty = -400, active = false;
      document.addEventListener("mousemove", function (e) {
        tx = e.clientX; ty = e.clientY;
        if (!active) { active = true; glow.classList.add("on"); raf(); }
      }, { passive: true });
      document.addEventListener("mouseleave", function () {
        active = false; glow.classList.remove("on");
      });
      function raf() {
        if (!active) return;
        gx += (tx - gx) * 0.12;
        gy += (ty - gy) * 0.12;
        glow.style.transform = "translate(" + (gx - 170) + "px," + (gy - 170) + "px)";
        requestAnimationFrame(raf);
      }
    }
  }

  /* ---------- 10. TICKER: duplicate for seamless loop ---------- */
  (function ticker() {
    var track = document.getElementById("tickerTrack");
    if (!track || reduceMotion) return;
    track.innerHTML += track.innerHTML; // two copies => -50% loop is seamless
  })();

  /* ---------- 11. QUOTE FORM: mailto with structured body ---------- */
  (function quoteForm() {
    var form = document.getElementById("quoteForm");
    if (!form) return;
    form.addEventListener("submit", function () {
      // Let the mailto proceed; the structured field names carry the data.
      // (Static site — no backend. The mailto opens the visitor's mail app
      // addressed to 228mooreelectric@gmail.com with labeled fields.)
    });
  })();
})();
