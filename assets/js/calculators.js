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
    var confirmEl = document.getElementById("pc-confirm");

    function runPanel() {
      var loads = [];
      loadEls.forEach(function (el) {
        if (el.checked) loads.push(parseFloat(el.value) || 0);
      });
      var r = panelCheck(parseFloat(panelEl.value) || 0, loads);
      // Completeness gate: a screening verdict is only as good as its
      // inputs. Until the visitor has picked a panel size AND confirmed
      // the load list is complete, the estimate is incomplete and must
      // not produce an affirmative verdict — an empty or partial list
      // otherwise makes almost any panel look like it has room.
      var panelChosen = panelEl.value !== "";
      var complete = panelChosen && confirmEl && confirmEl.checked;
      if (panelChosen) {
        estEl.textContent = amps(r.estLoad);
        usableEl.textContent = amps(r.usable);
        remainEl.textContent = amps(r.remaining);
      } else {
        estEl.textContent = "—";
        usableEl.textContent = "—";
        remainEl.textContent = "—";
      }
      if (!complete) {
        verdictEl.classList.remove("ok");
        verdictEl.classList.add("warn");
        verdictTitle.textContent = "Can't call it yet — more info needed";
        verdictBody.textContent = "A screen is only as good as its inputs: pick your panel size and confirm the list covers every major load you've got. Anything big that's not listed (a second HVAC, pool gear, shop equipment) makes any verdict a guess. This is a rough screening estimate, not an NEC load calculation — the real answer comes from a proper load calculation on site.";
      } else if (r.hasRoom) {
        verdictEl.classList.remove("warn");
        verdictEl.classList.add("ok");
        verdictTitle.textContent = "Likely room for a 60 A EV circuit";
        verdictBody.textContent = "On these numbers your panel probably has the headroom. This is educational screening only, not installation approval. A proper on-site load calculation is required. Moore Electric does not offer EV charger circuits or panel upgrades.";
      } else {
        verdictEl.classList.remove("ok");
        verdictEl.classList.add("warn");
        verdictTitle.textContent = "Close to the line — a real load calculation is recommended";
        verdictBody.textContent = "That doesn't always mean a panel upgrade — demand isn't nameplate, and there are smart options (load management, a smaller circuit). It does mean: don't guess. Get the real calculation before anyone sells you anything.";
      }
    }
    panelEl.addEventListener("change", runPanel);
    loadEls.forEach(function (el) { el.addEventListener("change", runPanel); });
    if (confirmEl) confirmEl.addEventListener("change", runPanel);
    runPanel();
  }
})();
