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
  var powerDone = false;
  function buildPowerOn() {
    if (REDUCED || powerDone) return;
    // only run on the homepage hero
    if (!document.querySelector(".hero[data-poweron]")) return;
    powerDone = true;

    var veil = document.createElement("div");
    veil.className = "flash-veil";
    document.body.appendChild(veil);

    var po = document.createElement("div");
    po.className = "poweron";
    po.setAttribute("role", "button");
    po.setAttribute("tabindex", "0");
    po.setAttribute("aria-label", "Flip the breaker to power on the site");
    po.innerHTML =
      '<svg class="po-bolt" viewBox="0 0 72 110" aria-hidden="true"><path d="M40 4 L14 62 L32 62 L28 106 L58 44 L38 44 Z"/></svg>' +
      '<div class="breaker" aria-hidden="true"><div class="slot"><div class="lever">OFF</div></div></div>' +
      '<div class="po-label">Flip the breaker</div>';
    document.body.appendChild(po);
    document.body.style.overflow = "hidden";

    var boltPath = po.querySelector(".po-bolt path");
    var len = boltPath.getTotalLength();
    boltPath.style.strokeDasharray = len;
    boltPath.style.strokeDashoffset = len;

    function ignite() {
      if (po.classList.contains("lit")) return;
      po.classList.add("lit");
      po.querySelector(".breaker").classList.add("on");
      po.querySelector(".lever").textContent = "ON";
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
            onComplete: function () { po.remove(); veil.remove(); document.body.style.overflow = ""; }
          });
        } else {
          veil.style.transition = "opacity .1s"; veil.style.opacity = "1";
          setTimeout(function () { veil.style.transition = "opacity .5s"; veil.style.opacity = "0"; }, 120);
          po.style.transition = "transform .9s cubic-bezier(.7,0,.3,1)"; po.style.transform = "translateY(-100%)";
          setTimeout(function () { po.remove(); veil.remove(); document.body.style.overflow = ""; }, 1100);
        }
        // hero flicker-in then kinetic type
        var hero = document.querySelector(".hero");
        hero.classList.add("power-flash");
        setTimeout(function () { hero.classList.remove("power-flash"); }, 600);
        playKinetic(hero);
      }, 620);
    }

    po.addEventListener("click", ignite);
    po.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ignite(); }
    });
    // auto-ignite after 4s so nobody is stuck
    setTimeout(function () { if (document.body.contains(po) && !po.classList.contains("lit")) ignite(); }, 4000);
    // escape hatch
    setTimeout(function () { if (document.body.contains(po)) { po.remove(); veil.remove(); document.body.style.overflow = ""; playKinetic(document); } }, 9000);
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
    function open(i) {
      lastFocus = document.activeElement;
      show(i); lb.classList.add("open");
      document.body.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    shots.forEach(function (s, i) {
      s.addEventListener("click", function () { open(i); });
      s.setAttribute("tabindex", "0");
      s.setAttribute("role", "button");
      s.setAttribute("aria-label", "View photo: " + s.querySelector("img").alt);
      s.addEventListener("keydown", function (e) { if (e.key === "Enter") open(i); });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
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
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q"), a = item.querySelector(".faq-a");
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function (o) {
          o.classList.remove("open");
          o.querySelector(".faq-a").style.maxHeight = "0px";
          o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------------- quote form -> mailto ---------------- */
  function initForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return (document.getElementById(id) || {}).value || ""; };
      var subject = "Estimate request — " + v("f-service") + " — " + v("f-name");
      var body = [
        "Name: " + v("f-name"),
        "Phone: " + v("f-phone"),
        "Service needed: " + v("f-service"),
        "Best time to call: " + v("f-time"),
        "",
        "Details:",
        v("f-details")
      ].join("\n");
      window.location.href = "mailto:228mooreelectric@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var note = document.getElementById("form-note");
      if (note) note.textContent = "Opening your email app — or just call (228) 224-9150.";
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
  initForm();

  // power-on runs after first paint; kinetic for subpages plays immediately
  if (document.querySelector(".hero[data-poweron]")) {
    window.addEventListener("load", function () { setTimeout(buildPowerOn, 350); });
    // fallback if load already fired
    if (document.readyState === "complete") setTimeout(buildPowerOn, 350);
  } else {
    playKinetic(document);
  }

  // footer year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
