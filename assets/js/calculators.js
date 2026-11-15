/* ============================================================
   MOORE ELECTRIC — calculators page logic (vanilla JS, no deps)
   1) "What does it cost to run?" — watts x hours x rate
   2) "EV charger & panel load checker" — rough screening only:
      nameplate amps summed, x 0.8 demand factor, compared
      against 80% of panel rating. NOT an NEC load calculation.
   3) "Generator & 30A vs. 50A inlet sizer" — sums running watts
      plus largest startup surge to compare against 30A/50A inlets.
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

  function generatorCheck(runningWatts, surgeAddWatts) {
    var peakWatts = runningWatts + surgeAddWatts;
    var recommendedInlet = (runningWatts <= 6000 && peakWatts <= 7500) ? "30A" : "50A";
    return {
      runningWatts: runningWatts,
      peakWatts: peakWatts,
      recommendedInlet: recommendedInlet
    };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      costToRun: costToRun,
      panelCheck: panelCheck,
      generatorCheck: generatorCheck,
      EV_CIRCUIT_AMPS: EV_CIRCUIT_AMPS
    };
  }
  if (typeof document === "undefined") return;

  /* ---------------- i18n strings ---------------- */

  var lang = (document.documentElement.getAttribute("lang") || "en").slice(0, 2);
  if (lang !== "es" && lang !== "vi") lang = "en";

  var COPY = {
    en: {
      kwhSuffix: " kWh/day",
      pcNeedTitle: "Can't call it yet — more info needed",
      pcNeedBody: "A screen is only as good as its inputs: pick your panel size and confirm the list covers every major load you've got. Anything big that's not listed (a second HVAC, pool gear, shop equipment) makes any verdict a guess. This is a rough screening estimate, not an NEC load calculation — the real answer comes from a proper load calculation on site.",
      pcRoomTitle: "Likely room for a 60 A EV circuit",
      pcRoomBody: "On these numbers your panel probably has the headroom. The real answer comes from a proper load calculation on site — that's the $75 visit, credited toward the job if you hire me.",
      pcTightTitle: "Close to the line — a real load calculation is recommended",
      pcTightBody: "That doesn't always mean a panel upgrade — demand isn't nameplate, and there are smart options (load management, a smaller circuit). It does mean: don't guess. Get the real calculation before anyone sells you anything.",
      gcNoneTitle: "Select at least one circuit to size your inlet",
      gcNoneBody: "Check the circuits you want powered during an outage — fridge, Wi-Fi, lights, window AC, or central HVAC — to compare 30A vs. 50A interlock inlet setups.",
      gc30Title: "30 A Inlet (L14-30P) + Interlock Kit Fits",
      gc30Body: "A 30-amp inlet handles up to 7,200 W surge / 5,760 W continuous (240V). On a portable 6,500–7,500W generator, a 30A inlet + interlock kit cleanly runs your essentials. Consider stepping up to a 50A inlet if you want headroom for future additions.",
      gc50Title: "50 A Inlet (SS2-50P) + Interlock Kit Recommended",
      gc50Body: "Your running or startup load exceeds a 30A inlet. A 50-amp inlet supports up to 12,000 W / 9,600 W continuous — ideal for Gulf Coast homes running a window AC or central HVAC (often with a soft-start kit). Call for an exact panel & interlock quote.",
      gcStandbyBody: "At 12,000+ W peak draw, an automatic standby generator with a dedicated transfer switch (or load-shedding a 50A interlock) is usually the smart play. Call (228) 224-9150 and we'll size it on site.",
      standbyLabel: "50 A / Standby"
    },
    es: {
      kwhSuffix: " kWh/día",
      pcNeedTitle: "Falta información — aún no se puede confirmar",
      pcNeedBody: "Una evaluación depende de sus datos: seleccione el tamaño de su panel y confirme que la lista incluye cada carga grande de su hogar (segundo aire acondicionado, equipo de piscina o taller). Esta es una estimación inicial, no un cálculo oficial NEC — la respuesta real viene con una evaluación en el sitio.",
      pcRoomTitle: "Probable espacio para un circuito EV de 60 A",
      pcRoomBody: "Con estos números su panel probablemente tiene capacidad disponible. La confirmación exacta se hace con un cálculo de carga en su hogar — la visita de $75 se acredita al trabajo si me contrata.",
      pcTightTitle: "Cerca del límite — se recomienda cálculo de carga en sitio",
      pcTightBody: "Eso no siempre significa cambiar el panel — existen opciones inteligentes como gestión de carga o un circuito más pequeño. Significa no adivinar: obtenga el cálculo real antes de gastar de más.",
      gcNoneTitle: "Seleccione al menos un circuito para dimensionar su entrada",
      gcNoneBody: "Marque los circuitos esenciales durante un apagón — refrigerador, internet, luces, aire de ventana o A/C central — para comparar kits de interbloqueo de 30A frente a 50A.",
      gc30Title: "Entrada de 30 A (L14-30P) + Kit de Interbloqueo es suficiente",
      gc30Body: "Una entrada de 30 amperios soporta hasta 7,200 W pico / 5,760 W continuos (240V). Con un generador portátil de 6,500–7,500W, el kit de 30A cubre sus esenciales de tormenta.",
      gc50Title: "Entrada de 50 A (SS2-50P) + Kit de Interbloqueo recomendada",
      gc50Body: "Su carga supera la capacidad de una entrada de 30A. Una entrada de 50 amperios soporta hasta 12,000 W / 9,600 W continuos — ideal para hogares en la Costa del Golfo con A/C de ventana o central con arrancador suave.",
      gcStandbyBody: "Con picos superiores a 12,000 W, normalmente conviene un generador automático de respaldo con transferencia automática o gestión de cargas en 50A. Llame al (228) 224-9150 para evaluarlo en sitio.",
      standbyLabel: "50 A / Respaldo"
    },
    vi: {
      kwhSuffix: " kWh/ngày",
      pcNeedTitle: "Chưa thể kết luận — cần thêm thông tin",
      pcNeedBody: "Ước tính chỉ chính xác khi đủ dữ liệu: hãy chọn cỡ tủ điện và xác nhận danh sách đã gồm mọi tải lớn trong nhà (máy lạnh thứ hai, thiết bị hồ bơi, xưởng). Đây chỉ là ước lượng sơ bộ, không thay thế tính toán tải NEC tại nhà.",
      pcRoomTitle: "Khả năng cao tủ điện đủ chỗ cho mạch sạc EV 60 A",
      pcRoomBody: "Theo các thông số này tủ điện của quý khách có thể còn dư tải. Kết quả chính xác sẽ được đo và tính tải thực tế tại nhà — phí khảo sát $75 được trừ vào tiền công nếu quý khách thuê tôi.",
      pcTightTitle: "Gần sát giới hạn — nên đo và tính tải thực tế",
      pcTightBody: "Điều này không phải lúc nào cũng cần thay tủ điện — đôi khi có thể dùng bộ quản lý tải hoặc mạch công suất vừa phải. Hãy tính toán chuẩn trước khi quyết định nâng cấp.",
      gcNoneTitle: "Chọn ít nhất một nhóm thiết bị để tính ổ cắm",
      gcNoneBody: "Đánh dấu những thiết bị cần chạy khi mất điện mùa bão — tủ lạnh, Wi-Fi, đèn, máy lạnh cửa sổ hoặc máy lạnh trung tâm — để so sánh bộ interlock 30A và 50A.",
      gc30Title: "Hộp cắm 30 A (L14-30P) + Bộ Interlock đáp ứng đủ",
      gc30Body: "Hộp cắm 30A tải được tối đa 7,200 W khởi động / 5,760 W liên tục (240V). Với máy phát di động 6,500–7,500W, bộ interlock 30A chạy gọn các thiết bị thiết yếu trong nhà.",
      gc50Title: "Khuyên dùng hộp cắm 50 A (SS2-50P) + Bộ Interlock",
      gc50Body: "Tải chạy hoặc dòng khởi động vượt quá mức 30A. Hộp cắm 50A hỗ trợ tối đa 12,000 W / 9,600 W liên tục — rất phù hợp nhà vùng ven biển chạy máy lạnh cửa sổ hoặc máy lạnh trung tâm có bộ khởi động mềm.",
      gcStandbyBody: "Với đỉnh tải trên 12,000 W, máy phát điện dự phòng tự động kèm cầu dao chuyển nguồn ATS (hoặc chia tải hợp lý trên cổng 50A) là giải pháp an toàn nhất. Gọi (228) 224-9150 để khảo sát trực tiếp.",
      standbyLabel: "50 A / Tự động"
    }
  };
  var t = COPY[lang];

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
  function wattsStr(v) {
    return Math.round(v).toLocaleString("en-US") + " W";
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
      kwhEl.textContent = r.kwhDay.toFixed(1) + t.kwhSuffix;
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
        verdictTitle.textContent = t.pcNeedTitle;
        verdictBody.textContent = t.pcNeedBody;
      } else if (r.hasRoom) {
        verdictEl.classList.remove("warn");
        verdictEl.classList.add("ok");
        verdictTitle.textContent = t.pcRoomTitle;
        verdictBody.textContent = t.pcRoomBody;
      } else {
        verdictEl.classList.remove("ok");
        verdictEl.classList.add("warn");
        verdictTitle.textContent = t.pcTightTitle;
        verdictBody.textContent = t.pcTightBody;
      }
    }
    panelEl.addEventListener("change", runPanel);
    loadEls.forEach(function (el) { el.addEventListener("change", runPanel); });
    if (confirmEl) confirmEl.addEventListener("change", runPanel);
    runPanel();
  }

  /* ---------------- calculator 3: generator inlet sizer ---------------- */

  var genLoadEls = document.querySelectorAll(".gc-load");
  if (genLoadEls.length) {
    var gcRunEl = document.getElementById("gc-running");
    var gcPeakEl = document.getElementById("gc-peak");
    var gcInletEl = document.getElementById("gc-inlet");
    var gcVerdictEl = document.getElementById("gc-verdict");
    var gcVerdictTitle = document.getElementById("gc-verdict-title");
    var gcVerdictBody = document.getElementById("gc-verdict-body");

    function runGen() {
      var runSum = 0;
      var maxSurge = 0;
      var count = 0;
      genLoadEls.forEach(function (el) {
        if (el.checked) {
          count++;
          runSum += parseFloat(el.value) || 0;
          var s = parseFloat(el.getAttribute("data-surge")) || 0;
          if (s > maxSurge) maxSurge = s;
        }
      });
      var g = generatorCheck(runSum, maxSurge);
      gcRunEl.textContent = wattsStr(g.runningWatts);
      gcPeakEl.textContent = wattsStr(g.peakWatts);

      if (count === 0) {
        gcInletEl.textContent = "—";
        gcVerdictEl.classList.remove("ok");
        gcVerdictEl.classList.add("warn");
        gcVerdictTitle.textContent = t.gcNoneTitle;
        gcVerdictBody.textContent = t.gcNoneBody;
      } else if (g.recommendedInlet === "30A") {
        gcInletEl.textContent = "30 A";
        gcVerdictEl.classList.remove("warn");
        gcVerdictEl.classList.add("ok");
        gcVerdictTitle.textContent = t.gc30Title;
        gcVerdictBody.textContent = t.gc30Body;
      } else if (g.peakWatts <= 12000 && g.runningWatts <= 10500) {
        gcInletEl.textContent = "50 A";
        gcVerdictEl.classList.remove("warn");
        gcVerdictEl.classList.add("ok");
        gcVerdictTitle.textContent = t.gc50Title;
        gcVerdictBody.textContent = t.gc50Body;
      } else {
        gcInletEl.textContent = t.standbyLabel;
        gcVerdictEl.classList.remove("ok");
        gcVerdictEl.classList.add("warn");
        gcVerdictTitle.textContent = t.gc50Title;
        gcVerdictBody.textContent = t.gcStandbyBody;
      }
    }
    genLoadEls.forEach(function (el) { el.addEventListener("change", runGen); });
    runGen();
  }
})();
