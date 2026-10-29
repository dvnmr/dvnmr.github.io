/* ============================================================
   MOORE ELECTRIC — calculators page logic (vanilla JS, no deps)
   1) "What does it cost to run?" — watts x hours x rate
   2) "EV charger & panel load checker" — rough screening only:
      nameplate amps summed, x 0.8 demand factor, compared
      against 80% of panel rating. NOT an NEC load calculation.
   Pure math functions are exported for node-based verification
   when run outside the browser.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- pure math ---------------- */

  function costToRun(watts, hoursPerDay, ratePerKwh) {
    var kwhDay = (watts / 1000) * hoursPerDay;
    var perDay = kwhDay * ratePerKwh;
    var perYear = perDay * 365;
    var perMonth = perYear / 12;
    return { kwhDay: kwhDay, perDay: perDay, perMonth: perMonth, perYear: perYear };
  }

  var EV_CIRCUIT_AMPS = 60;   /* a typical Level 2 EV circuit */
  var DEMAND_FACTOR = 0.8;    /* screening guidance only — not NEC-exact */
  var USABLE_FRACTION = 0.8;  /* compare against 80% of panel rating */

  function panelCheck(panelAmps, loadAmpsList) {
    var nameplate = 0;
    for (var i = 0; i < loadAmpsList.length; i++) nameplate += loadAmpsList[i];
    var estLoad = nameplate * DEMAND_FACTOR;
    var usable = panelAmps * USABLE_FRACTION;
    var remaining = usable - estLoad;
    return {
      nameplate: nameplate,
      estLoad: estLoad,
      usable: usable,
      remaining: remaining,
      hasRoom: remaining >= EV_CIRCUIT_AMPS
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { costToRun: costToRun, panelCheck: panelCheck, EV_CIRCUIT_AMPS: EV_CIRCUIT_AMPS };
  }
  if (typeof document === "undefined") return;

  /* ---------------- helpers ---------------- */

  function num(el, fallback) {
    var v = parseFloat(el.value);
    return isNaN(v) || v < 0 ? fallback : v;
  }
  function money(v) {
    return v.toLocaleString("en-US", { style: "currency", currency: "USD" });
  }
  function amps(v) {
    return Math.round(v) + " A";
  }

  /* ---------------- calculator 1: cost to run ---------------- */

  var wattsEl = document.getElementById("cr-watts");
  if (wattsEl) {
    var hoursEl = document.getElementById("cr-hours");
    var rateEl = document.getElementById("cr-rate");
    var dayEl = document.getElementById("cr-day");
    var monthEl = document.getElementById("cr-month");
    var yearEl = document.getElementById("cr-year");
    var kwhEl = document.getElementById("cr-kwh");
    var chips = document.querySelectorAll(".chip[data-watts]");

    function runCost() {
      var r = costToRun(num(wattsEl, 0), num(hoursEl, 0), num(rateEl, 0));
      dayEl.textContent = money(r.perDay);
      monthEl.textContent = money(r.perMonth);
      yearEl.textContent = money(r.perYear);
      kwhEl.textContent = r.kwhDay.toFixed(1) + " kWh/day";
    }
    [wattsEl, hoursEl, rateEl].forEach(function (el) {
      el.addEventListener("input", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        runCost();
      });
    });
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        wattsEl.value = chip.getAttribute("data-watts");
        runCost();
      });
    });
    runCost();
  }

  /* ---------------- calculator 2: panel load checker ---------------- */

  var panelEl = document.getElementById("pc-panel");
  if (panelEl) {
    var loadEls = document.querySelectorAll(".pc-load");
    var estEl = document.getElementById("pc-est");
    var usableEl = document.getElementById("pc-usable");
    var remainEl = document.getElementById("pc-remaining");
    var verdictEl = document.getElementById("pc-verdict");
    var verdictTitle = document.getElementById("pc-verdict-title");
    var verdictBody = document.getElementById("pc-verdict-body");

    function runPanel() {
      var loads = [];
      loadEls.forEach(function (el) {
        if (el.checked) loads.push(parseFloat(el.value) || 0);
      });
      var r = panelCheck(parseFloat(panelEl.value) || 0, loads);
      estEl.textContent = amps(r.estLoad);
      usableEl.textContent = amps(r.usable);
      remainEl.textContent = amps(r.remaining);
      if (r.hasRoom) {
        verdictEl.classList.remove("warn");
        verdictEl.classList.add("ok");
        verdictTitle.textContent = "Likely room for a 60 A EV circuit";
        verdictBody.textContent = "On these numbers your panel probably has the headroom. The real answer comes from a proper load calculation on site — that's the $75 visit, credited toward the job if you hire me.";
      } else {
        verdictEl.classList.remove("ok");
        verdictEl.classList.add("warn");
        verdictTitle.textContent = "Close to the line — a real load calculation is recommended";
        verdictBody.textContent = "That doesn't always mean a panel upgrade — demand isn't nameplate, and there are smart options (load management, a smaller circuit). It does mean: don't guess. Get the real calculation before anyone sells you anything.";
      }
    }
    panelEl.addEventListener("change", runPanel);
    loadEls.forEach(function (el) { el.addEventListener("change", runPanel); });
    runPanel();
  }
})();
