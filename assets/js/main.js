/* ============================================================
   MOORE ELECTRIC — phoenix-oct7 interactions
   Power-on sequence · kinetic type · scroll reveals · lightbox
   Vanilla + optional GSAP. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE_POINTER = window.matchMedia("(pointer: fine)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && typeof window.ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    hasGSAP = false;
  }

  var PHONE_TEL = "tel:+12282249150";

  /* ---------------- kinetic split ---------------- */
  function splitWords(el) {
    var fullText = el.textContent.trim().replace(/\s+/g, " ");
    el.setAttribute("aria-label", fullText);
    // walk child nodes so inner spans (e.g. .stroke) survive the split
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.textContent = "";
    function maskWord(word, parent) {
      var mask = document.createElement("span");
      mask.className = "k-mask";
      mask.setAttribute("aria-hidden", "true");
      var w = document.createElement("span");
      w.className = "k-word";
      w.textContent = word;
      mask.appendChild(w);
      parent.appendChild(mask);
    }
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.trim().replace(/\s+/g, " ").split(" ").forEach(function (word, i, arr) {
          if (!word) return;
          maskWord(word, el);
          el.appendChild(document.createTextNode(" "));
        });
      } else if (node.nodeType === 1) {
        var clone = node.cloneNode(false);
        clone.removeAttribute("data-kinetic");
        node.textContent.trim().replace(/\s+/g, " ").split(" ").forEach(function (word) {
          if (!word) return;
          maskWord(word, clone);
          clone.appendChild(document.createTextNode(" "));
        });
        el.appendChild(clone);
        el.appendChild(document.createTextNode(" "));
      }
    });
  }

  function playKinetic(scope) {
    var words = scope.querySelectorAll(".k-word");
    if (!words.length || REDUCED) return;
    if (hasGSAP) {
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.045, delay: 0.15 });
    } else {
      words.forEach(function (w, i) {
        setTimeout(function () { w.style.transform = "translateY(0)"; w.style.transition = "transform .7s cubic-bezier(.2,.8,.2,1)"; }, 150 + i * 45);
      });
    }
  }

  /* ---------------- power-on sequence ---------------- */
  var powerDone = false; var PO_STRINGS = { vi: { label: "Bật cầu dao", skip: "Bỏ qua &rarr;", aria: "Bật cầu dao để khởi động trang", off: "TẮT", on: "BẬT" }, es: { label: "Activa el interruptor", skip: "Omitir &rarr;", aria: "Activa el interruptor para encender el sitio", off: "APAGADO", on: "ENCENDIDO" } }; var PO_DEFAULT = { label: "Flip the breaker", skip: "Skip &rarr;", aria: "Flip the breaker to power on the site", off: "OFF", on: "ON" }; function poStrings() { var l = (document.documentElement.lang || "en").toLowerCase().slice(0, 2); return PO_STRINGS[l] || PO_DEFAULT; }
  function buildPowerOn() {
    if (REDUCED || powerDone) return;
    // only run on the homepage hero
    if (!document.querySelector(".hero[data-poweron]")) return;
    powerDone = true;

    var veil = document.createElement("div");
    veil.className = "flash-veil";
    document.body.appendChild(veil);

    var po = document.createElement("div");
    po.className = "poweron"; var T = poStrings();
    po.setAttribute("role", "button");
    po.setAttribute("tabindex", "0");
    po.setAttribute("aria-label", "Flip the breaker to power on the site");
    po.removeAttribute("role");
    po.removeAttribute("tabindex");
    po.removeAttribute("aria-label");
    po.innerHTML =
      '<svg class="po-bolt" viewBox="0 0 72 110" aria-hidden="true"><path d="M40 4 L14 62 L32 62 L28 106 L58 44 L38 44 Z"/></svg>' +
      '<button class="po-flip" type="button" aria-label="' + T.aria + '"><span class="breaker" aria-hidden="true"><span class="slot"><span class="lever">' + T.off + '</span></span></span></button>' +
      '<div class="po-label" aria-hidden="true">' + T.label + '</div>' +
      '<button class="po-skip" type="button">' + T.skip + '</button>';
    document.body.appendChild(po);
    // non-blocking: overlay is click-through except its own controls;
    // the visitor can tap call links behind it immediately. No scroll lock.

    var boltPath = po.querySelector(".po-bolt path");
    var len = boltPath.getTotalLength();
    boltPath.style.strokeDasharray = len;
    boltPath.style.strokeDashoffset = len;

    function ignite() {
      if (po.classList.contains("lit")) return;
      po.classList.add("lit");
      po.querySelector(".breaker").classList.add("on");
      po.querySelector(".lever").textContent = T.on;
      // bolt draws
      if (hasGSAP) {
        gsap.to(boltPath, { strokeDashoffset: 0, duration: 0.5, ease: "power2.in" });
      } else {
        boltPath.style.transition = "stroke-dashoffset .5s ease-in";
        boltPath.style.strokeDashoffset = "0";
      }
      setTimeout(function () {
        // white flash + lift
        if (hasGSAP) {
          gsap.to(veil, { opacity: 1, duration: 0.08 });
          gsap.to(veil, { opacity: 0, duration: 0.5, delay: 0.1 });
          gsap.to(po, {
            yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.12,
            onComplete: function () { po.remove(); veil.remove(); }
          });
        } else {
          veil.style.transition = "opacity .1s"; veil.style.opacity = "1";
          setTimeout(function () { veil.style.transition = "opacity .5s"; veil.style.opacity = "0"; }, 120);
          po.style.transition = "transform .9s cubic-bezier(.7,0,.3,1)"; po.style.transform = "translateY(-100%)";
          setTimeout(function () { po.remove(); veil.remove(); }, 1100);
        }
        // hero flicker-in then kinetic type
        var hero = document.querySelector(".hero");
        hero.classList.add("power-flash");
        setTimeout(function () { hero.classList.remove("power-flash"); }, 600);
        playKinetic(hero);
      }, 620);
    }

    function dismiss() {
      if (document.body.contains(po)) { po.remove(); }
      if (document.body.contains(veil)) { veil.remove(); }
      playKinetic(document.querySelector(".hero") || document);
    }
    po.querySelector(".po-flip").addEventListener("click", ignite);
    po.querySelector(".po-skip").addEventListener("click", dismiss);
    // auto-ignite after 2.5s so nobody waits
    setTimeout(function () { if (document.body.contains(po) && !po.classList.contains("lit")) ignite(); }, 2500);
    // escape hatch
    setTimeout(dismiss, 9000);
  }

  /* ---------------- scroll reveals ---------------- */
  function initReveals() {
    var els = document.querySelectorAll(".rv");
    if (!els.length) return;
    if (REDUCED || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function initParallax() {
    if (REDUCED || !hasGSAP) return;
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      gsap.to(el, {
        yPercent: parseFloat(el.getAttribute("data-parallax")) || -12,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, scrub: true, start: "top bottom", end: "bottom top" }
      });
    });
  }

  /* ---------------- nav + callbar ---------------- */
  function initChrome() {
    var nav = document.querySelector(".nav");
    var bar = document.querySelector(".callbar");
    var hero = document.querySelector(".hero, .subhero");
    function onScroll() {
      var y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 40);
      if (bar) {
        var past = hero ? y > hero.offsetHeight * 0.55 : y > 500;
        bar.classList.toggle("show", past);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- custom cursor + magnetic ---------------- */
  function initCursor() {
    if (!FINE_POINTER || REDUCED) return;
    var dot = document.createElement("div"); dot.className = "cursor-dot";
    var ring = document.createElement("div"); ring.className = "cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, .shot, .faq-q").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("hovering"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("hovering"); });
    });
    // magnetic buttons
    if (hasGSAP) {
      document.querySelectorAll(".btn").forEach(function (btn) {
        btn.addEventListener("mousemove", function (e) {
          var r = btn.getBoundingClientRect();
          gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.28, duration: 0.3 });
        });
        btn.addEventListener("mouseleave", function () { gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.4)" }); });
      });
    }
  }

  /* ---------------- gallery lightbox ---------------- */
  function initLightbox() {
    var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
    if (!shots.length) return;
    var lb = document.createElement("div");
    lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close viewer">✕</button>' +
      '<img alt="">' +
      '<div class="lb-cap"></div>' +
      '<div class="lb-nav"><button class="lb-btn lb-prev" aria-label="Previous photo">←</button>' +
      '<span class="lb-count"></span>' +
      '<button class="lb-btn lb-next" aria-label="Next photo">→</button></div>';
    document.body.appendChild(lb);
    var img = lb.querySelector("img"), cap = lb.querySelector(".lb-cap"), count = lb.querySelector(".lb-count");
    var idx = 0, lastFocus = null;

    function show(i) {
      idx = (i + shots.length) % shots.length;
      var sImg = shots[idx].querySelector("img");
      img.src = sImg.src; img.alt = sImg.alt;
      var fc = shots[idx].querySelector("figcaption");
      cap.textContent = fc ? fc.textContent : sImg.alt;
      count.textContent = (idx + 1) + " / " + shots.length;
    }
    var pageRoots = [];
    function setInert(on) {
      if (on) {
        pageRoots = Array.prototype.slice.call(document.querySelectorAll("header.nav, main, footer, .callbar, .poweron"));
        pageRoots.forEach(function (el) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); });
      } else {
        pageRoots.forEach(function (el) { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); });
        pageRoots = [];
      }
    }
    function focusables() {
      return Array.prototype.slice.call(lb.querySelectorAll("button, [href], [tabindex]:not([tabindex='-1'])"))
        .filter(function (el) { return !el.disabled && el.offsetParent !== null; });
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i); lb.classList.add("open");
      document.body.style.overflow = "hidden";
      setInert(true);
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      setInert(false);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    shots.forEach(function (s, i) {
      s.addEventListener("click", function () { open(i); });
      s.setAttribute("tabindex", "0");
      s.setAttribute("role", "button");
      s.setAttribute("aria-label", "View photo: " + s.querySelector("img").alt);
      s.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowLeft") { show(idx - 1); return; }
      if (e.key === "ArrowRight") { show(idx + 1); return; }
      if (e.key !== "Tab") return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // touch swipe
    var tx = 0;
    lb.addEventListener("touchstart", function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaq() {
    // native details/summary: accessible + no-JS readable by default.
    // JS only adds accordion behavior (close others when one opens).
    document.querySelectorAll("details.faq-item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        document.querySelectorAll("details.faq-item[open]").forEach(function (o) {
          if (o !== item) o.removeAttribute("open");
        });
      });
    });
  }

  /* ---------------- boot ---------------- */
  document.querySelectorAll("[data-kinetic]").forEach(splitWords);

  if (REDUCED) {
    document.querySelectorAll(".k-word").forEach(function (w) { w.style.transform = "none"; });
  }

  initReveals();
  initParallax();
  initChrome();
  initCursor();
  initLightbox();
  initFaq();

  // power-on runs after first paint; kinetic for subpages plays immediately
  if (document.querySelector(".hero[data-poweron]")) {
    window.addEventListener("load", function () { setTimeout(buildPowerOn, 350); });
    // fallback if load already fired
    if (document.readyState === "complete") setTimeout(buildPowerOn, 350);
  } else {
    playKinetic(document);
  }

  // SAFETY NET: force kinetic words visible after 4s if animation never completed
  // (protects against CDN failures, JS errors, or animation stalls)
  setTimeout(function () {
    document.querySelectorAll(".k-word").forEach(function (w) {
      w.style.transform = "translateY(0)";
      w.style.transition = "transform .5s ease-out";
      if (typeof window.gsap !== "undefined") {
        try { gsap.set(w, { yPercent: 0, clearProps: "transform" }); } catch (e) {}
      }
    });
  }, 4000);

  // footer year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
