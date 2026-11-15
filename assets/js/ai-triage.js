/* Moore Electric 228 — Instant Fault Triage, Punch-List Bundler & AI-to-AI API */
(function (root) {
  "use strict";

  var DATA = {"cities":["Biloxi","Gulfport","Ocean Springs","D'Iberville","Long Beach","Pass Christian","Bay St. Louis","Pascagoula","Gautier","Waveland","Moss Point","Wiggins"],"diagnostics":[{"id":"warm-panel","urgency":"EMERGENCY","urgency_label":{"en":"EMERGENCY · CALL NOW","es":"EMERGENCIA · LLAMAR YA","vi":"KHẨN CẤP · GỌI NGAY"},"title":{"en":"Warm, buzzing, crackling, or burning odor at panel","es":"Panel tibio, zumbido, chispas u olor a quemado","vi":"Tủ điện nóng, kêu rè, tóe lửa hoặc có mùi khét"},"cause":{"en":"High-resistance loose main lug, corroded utility meter stab, or arcing busbar connection — fire hazard common on salt-air coast.","es":"Terminal principal flojo, barra corroída por salitre o arco eléctrico interno — riesgo alto de incendio.","vi":"Đầu cốt tổng bị lỏng, thanh cái bị rỉ muối hoặc phóng hồ quang bên trong — nguy cơ cháy rất cao."},"checks":{"en":["Do NOT open the dead-front metal cover or poke inside.","Turn off heavy 240V breakers (AC, dryer, oven) only if the handle isn't hot.","If you smell melting insulation or hear popping, evacuate the room and call (228) 224-9150."],"es":["NO abra la tapa metálica interior ni toque cables.","Apague brekers grandes (aire, secadora, horno) solo si el frente no está caliente.","Si huele plástico quemado o chisporrotea, aléjese y llame al (228) 224-9150."],"vi":["TUYỆT ĐỐI KHÔNG tháo nắp sắt bảo vệ bên trong tủ điện.","Chỉ gạt tắt các cầu dao 240V lớn (máy lạnh, máy sấy) nếu mặt tủ không bị nóng.","Nếu có mùi nhựa cháy hoặc tiếng nổ lách tách, tránh xa tủ và gọi ngay (228) 224-9150."]},"route":{"en":"/emergency-electrician","es":"/es/emergency-electrician","vi":"/vi/emergency-electrician"},"route_label":{"en":"Emergency Dispatch Info","es":"Servicio de Emergencia","vi":"Sửa Điện Khẩn Cấp"}},{"id":"gfci-coastal","urgency":"PRIORITY","urgency_label":{"en":"PRIORITY · COASTAL FAULT","es":"PRIORIDAD · FALLA COSTERA","vi":"ƯU TIÊN · SỰ CỐ VÙNG BIỂN"},"title":{"en":"Outdoor / patio / garage / bathroom GFCI keeps tripping","es":"El GFCI de patio, garaje o baño salta repetidamente","vi":"Ổ GFCI ngoài trời, nhà xe hoặc phòng tắm hay nhảy"},"cause":{"en":"Moisture inside outdoor extension cords/boxes, salt-corroded receptacle screws, or failed internal GFCI sensor coil.","es":"Humedad en cajas exteriores, salitre oxidando tornillos o sensor GFCI dañado.","vi":"Ẩm ướt thấm vào hộp ngoài trời, hơi muối ăn mòn ốc đồng hoặc hỏng mạch cảm biến GFCI."},"checks":{"en":["Unplug every cord, freezer, fountain, or timer plugged outdoors.","Press RESET firmly (wait for the click) while everything is unplugged.","Check behind garage storage for a second linked GFCI feeding the circuit."],"es":["Desconecte extensiones exteriores, bombas o congeladores del circuito.","Presione RESET firme con todo desconectado.","Revise el garaje o lavandería por otro GFCI maestro encadenado."],"vi":["Rút hết phích cắm máy bơm, dây nối ngoài sân, tủ đông khỏi mạch đó.","Nhấn mạnh nút RESET khi đã rút sạch toàn bộ tải.","Kiểm tra trong nhà xe hoặc phòng giặt xem có ổ GFCI khác mắc nối tiếp không."]},"route":{"en":"/blog-coastal-outlet-gfci-troubleshooting","es":"/es/blog-coastal-outlet-gfci-troubleshooting","vi":"/vi/blog-coastal-outlet-gfci-troubleshooting"},"route_label":{"en":"Coastal GFCI Guide","es":"Guía GFCI Costera","vi":"Hướng Dẫn GFCI Biển"}},{"id":"flickering-neutral","urgency":"PRIORITY","urgency_label":{"en":"PRIORITY · VOLTAGE DROP","es":"PRIORIDAD · CAÍDA DE VOLTAJE","vi":"ƯU TIÊN · SỤT ÁP"},"title":{"en":"Lights flicker or dim when AC, microwave, or dryer kicks on","es":"Luces parpadean cuando arranca el aire o microondas","vi":"Đèn chớp hoặc mờ đi khi máy lạnh, lò vi sóng chạy"},"cause":{"en":"Loose neutral lug in main panel/meter base or utility service drop splice degrading under load.","es":"Neutro flojo en el tablero/medidor o empalme de acometida deteriorado.","vi":"Dây nguội (neutral) bị lỏng trong tủ chính hoặc ngoài đồng hồ bị oxi hóa."},"checks":{"en":["Note whether ONLY one room flickers or the WHOLE house brightens/dims together.","Whole-house bright-then-dim surges indicate a failing main neutral — call MS Power & Devin right away.","Check if flicker stops when one specific dimmer switch or ceiling fan is turned off."],"es":["Observe si ocurre solo en un cuarto o en TODA la casa a la vez.","Si unas luces brillan demasiado mientras otras bajan, es neutro principal flojo — llame hoy.","Pruebe apagar un dimmer sospechoso para descartar compatibilidad LED."],"vi":["Để ý xem đèn chỉ chớp ở 1 phòng hay CẢ NHÀ lúc sáng rực lúc tối sầm.","Nếu cả nhà vừa lóe sáng vừa sụt áp, dây nguội tổng sắp đứt — cần kiểm tra gấp.","Thử tắt công tắc dimmer đèn LED xem hiện tượng chớp có hết không."]},"route":{"en":"/panel-upgrades","es":"/es/panel-upgrades","vi":"/vi/panel-upgrades"},"route_label":{"en":"Panel Diagnostics","es":"Revisión de Panel","vi":"Kiểm Tra Tủ Điện"}},{"id":"dead-half-room","urgency":"STANDARD","urgency_label":{"en":"STANDARD · OPEN SPLICE","es":"ESTÁNDAR · EMPALME ABIERTO","vi":"TIÊU CHUẨN · HỞ MỐI NỐI"},"title":{"en":"Dead outlet chain or half a room out, breaker NOT tripped","es":"Varios tomas muertos en fila sin que el breaker haya saltado","vi":"Mất điện nửa phòng nhưng cầu dao KHÔNG nhảy"},"cause":{"en":"Loose stab-in (backstab) wire behind one working or dead receptacle, or an upstream tripped GFCI in another room.","es":"Cable suelto en conexión trasera rápida (backstab) o GFCI escondido disparado.","vi":"Lỗ gài dây sau lưng ổ cắm (backstab) bị lỏng tiếp xúc hoặc dính chuỗi GFCI ở phòng khác."},"checks":{"en":["Walk every bathroom, garage, kitchen counter, and porch pressing every GFCI RESET button.","Notice if half a duplex outlet works while a wall switch stays off (switched half-hot outlet).","Flip the suspected breaker fully OFF then back ON."],"es":["Busque en todos los baños, cocina, garaje y porche cualquier botón RESET de GFCI.","Revise si un interruptor de pared controla la mitad de ese tomacorriente.","Baje el breaker sospechoso completamente a OFF y regréselo a ON."],"vi":["Đi kiểm tra tất cả phòng tắm, bếp, nhà xe, hiên nhà và nhấn lại mọi nút RESET GFCI.","Thử bật tắt công tắc tường xem nửa ổ cắm đó có nối qua công tắc đèn không.","Gạt cầu dao nghi ngờ về hẳn OFF rồi bật lại ON."]},"route":{"en":"/troubleshooting-repair","es":"/es/troubleshooting-repair","vi":"/vi/troubleshooting-repair"},"route_label":{"en":"Fault Tracing Info","es":"Rastreo de Fallas","vi":"Dò Tìm Mất Điện"}},{"id":"breaker-trips-load","urgency":"STANDARD","urgency_label":{"en":"STANDARD · OVERLOAD / SHORT","es":"ESTÁNDAR · SOBRECARGA","vi":"TIÊU CHUẨN · QUÁ TẢI"},"title":{"en":"Breaker trips after running space heater, hair dryer, or AC","es":"El breaker salta al usar calentador, secador o microondas","vi":"Cầu dao nhảy khi bật máy sưởi, máy sấy tóc hoặc bếp"},"cause":{"en":"Circuit sharing >1,800W (15A) across two rooms, aging weak thermal breaker, or shared neutral miswired.","es":"Circuito compartido con más de 1,800W en 15A o disyuntor térmico debilitado.","vi":"Quá nhiều thiết bị công suất lớn dùng chung mạch 15A hoặc cầu dao già yếu."},"checks":{"en":["Unplug space heater or microwave and move one high-watt appliance to a kitchen/bathroom 20A GFCI circuit.","If the breaker trips INSTANTLY with zero devices plugged in, stop resetting — call for short-circuit isolation."],"es":["Mueva el calentador o microondas a otro circuito independiente de 20A.","Si el breaker salta AL INSTANTE con todo desenchufado, hay cortocircuito y requiere revisión."],"vi":["Rút bớt máy sưởi hoặc chuyển sang ổ bếp/phòng tắm 20A riêng biệt.","Nếu vừa gạt lên cầu dao NHẢY TỨC THÌ dù đã rút sạch phích, mạch bị chập — ngừng bật lại và gọi thợ."]},"route":{"en":"/services","es":"/es/services","vi":"/vi/services"},"route_label":{"en":"Dedicated Circuits","es":"Circuitos Dedicados","vi":"Kéo Mạch Riêng"}},{"id":"ev-hot-plug","urgency":"PRIORITY","urgency_label":{"en":"PRIORITY · EV CONTINUOUS LOAD","es":"PRIORIDAD · CARGADOR EV","vi":"ƯU TIÊN · SẠC XE ĐIỆN EV"},"title":{"en":"EV charger slowing down, warm plug, or tripping 50A breaker","es":"Cargador EV se calienta, baja potencia o dispara breaker 50A","vi":"Sạc xe điện EV bị nóng phích, tự giảm dòng hoặc nhảy cầu dao"},"cause":{"en":"Builder-grade $12 NEMA 14-50 dryer outlet melting under 8-hour EV continuous heat, or undersized wire/panel.","es":"Toma doméstica barata derritiéndose por carga continua EV o terminal mal apretado.","vi":"Dùng ổ máy sấy loại thường nên nóng chảy tiếp điểm khi sạc xe nhiều tiếng liên tục."},"checks":{"en":["Lower your vehicle/EVSE amperage cap to 24A temporarily and sniff around the receptacle for hot Bakelite smell.","Any browning around NEMA 14-50 prongs requires immediate swap to commercial EV-grade receptacle or 60A hardwire."],"es":["Reduzca temporalmente la carga en el vehículo a 24A y revise si el enchufe muestra marcas oscuras.","Cualquier decoloración exige reemplazo urgente por toma grado industrial EV o conexión directa (hardwire)."],"vi":["Tạm hạ dòng sạc trong app xe xuống 24A và ngửi kiểm tra xem ổ cắm có mùi khét nhẹ không.","Thấy chân phích ngả nâu phải thay ngay ổ chuyên dụng EV chịu nhiệt hoặc đấu cứng 60A."]},"route":{"en":"/ev-charger-install","es":"/es/ev-charger-install","vi":"/vi/ev-charger-install"},"route_label":{"en":"EV Charger Service","es":"Instalación EV","vi":"Lắp Sạc EV An Toàn"}},{"id":"generator-storm","urgency":"STANDARD","urgency_label":{"en":"PLANNING · STORM READINESS","es":"PLANIFICACIÓN · TORMENTAS","vi":"CHUẨN BỊ · MÙA BÃO"},"title":{"en":"Need safe generator interlock, 30A/50A inlet, or whole-home surge","es":"Instalar interbloqueo de generador, toma 30A/50A o protector de picos","vi":"Lắp bộ khóa máy phát điện Interlock, cổng 30A/50A hoặc chống sét"},"cause":{"en":"Preparing Biloxi/Gulf Coast panel for hurricane outage season without extension cords through windows or dangerous backfeed.","es":"Preparar el hogar para huracanes alimentando el panel de forma segura sin retorno eléctrico.","vi":"Chuẩn bị điện dự phòng mùa bão an toàn qua tủ chính, không phát ngược ra lưới."},"checks":{"en":["Snap a photo of your open breaker panel directory + label inside the door and generator nameplate wattage.","Run our Generator Inlet Sizer on /calculators or send the photo directly to Devin via text."],"es":["Tome foto de la etiqueta dentro de la puerta del panel y la placa de vatios del generador.","Use la calculadora en /es/calculators o envíe la foto directo por mensaje de texto."],"vi":["Chụp hình tem thông số bên trong cánh tủ điện chính và nhãn công suất máy phát điện.","Tính thử tại /vi/calculators hoặc nhắn kèm hình trực tiếp cho Devin."]},"route":{"en":"/generator-install","es":"/es/generator-install","vi":"/vi/generator-install"},"route_label":{"en":"Generator Interlocks","es":"Generador e Interlock","vi":"Máy Phát & Interlock"}},{"id":"controls-automation","urgency":"PRIORITY","urgency_label":{"en":"INDUSTRIAL / CONTROLS · COMMERCIAL","es":"INDUSTRIAL / CONTROL · COMERCIAL","vi":"CÔNG NGHIỆP / ĐIỀU KHIỂN"},"title":{"en":"Three-phase motor, VFD fault, pump relay, or control panel issue","es":"Falla en motor trifásico, VFD, relé de bomba o panel de control","vi":"Sự cố mô-tơ 3 pha, biến tần VFD, rơ-le bơm hoặc tủ điều khiển"},"cause":{"en":"Single-phasing contactor, noisy 4–20mA sensor loop, burnt control transformer, or VFD over-current fault.","es":"Contactor con fase perdida, señal 4-20mA con ruido, transformador dañado o falla en VFD.","vi":"Khởi động từ mất pha, nhiễu tín hiệu cảm biến, cháy biến áp điều khiển hoặc lỗi VFD."},"checks":{"en":["Record the exact VFD / PLC fault code on the display before hitting RESET.","Check incoming control power fuses (24VDC / 120VAC) and disconnect state before dispatching."],"es":["Anote el código exacto de falla en la pantalla del VFD/PLC antes de reiniciar.","Verifique fusibles de control (24VDC/120VAC) y desconectadores antes de llamar."],"vi":["Chụp hoặc ghi lại mã lỗi chính xác trên màn hình biến tần VFD / PLC trước khi reset.","Kiểm tra cầu chì mạch điều khiển 24VDC/120VAC trước khi liên hệ."]},"route":{"en":"/services","es":"/es/services","vi":"/vi/services"},"route_label":{"en":"Controls & Automation","es":"Control y Automatización","vi":"Hệ Thống Điều Khiển"}}],"bundles":[{"id":"gfci-swap","name":{"en":"Replace coastal/exterior GFCI outlets","es":"Cambiar tomas GFCI exteriores","vi":"Thay ổ GFCI chống ẩm ngoài trời"},"route":"/switches-dimmers"},{"id":"fan-install","name":{"en":"Mount ceiling fan (standard or tall ceiling)","es":"Instalar ventilador de techo","vi":"Lắp quạt trần cân bằng"},"route":"/ceiling-fans"},{"id":"dimmers-switches","name":{"en":"Swap smart switches / LED dimmers","es":"Cambiar interruptores o dimmers LED","vi":"Thay công tắc thông minh / dimmer LED"},"route":"/switches-dimmers"},{"id":"exterior-lights","name":{"en":"Install floodlights / soffit / dock lighting","es":"Instalar reflectores / luces exteriores","vi":"Lắp đèn pha sân vườn / bến tàu"},"route":"/lighting"},{"id":"ev-circuit","name":{"en":"Run dedicated 240V EV charger circuit","es":"Instalar circuito 240V para EV","vi":"Đi đường dây 240V sạc xe EV"},"route":"/ev-charger-install"},{"id":"whole-surge","name":{"en":"Install whole-home Type 1/2 surge protector","es":"Protector contra sobretensiones en panel","vi":"Lắp chống sét tổng tại tủ điện"},"route":"/surge-protection"},{"id":"gen-interlock","name":{"en":"Add 30A/50A generator interlock kit","es":"Kit interbloqueo 30A/50A generador","vi":"Lắp bộ Interlock máy phát 30A/50A"},"route":"/generator-install"},{"id":"panel-audit","name":{"en":"Clean panel labeling & thermal/lug checkup","es":"Revisión y etiquetado del panel principal","vi":"Kiểm tra siết cốt & dán nhãn tủ điện"},"route":"/panel-upgrades"}]};

  var UI = {
    en: {
      tabs: [
        ["triage", "⚡ Instant Fault Triage"],
        ["bundle", "🛠️ Build a Job Punch-List"],
        ["agent", "🤖 AI-to-AI / Agent API"]
      ],
      pickSymptom: "1. Pick what your electrical system is doing:",
      cityLabel: "City / Area (228 Coast):",
      noteLabel: "Optional quick detail (breaker size, panel brand, location):",
      notePh: "e.g., patio GFCI keeps tripping after rain...",
      freeTitle: "Free 30-second checks before paying $75:",
      causeLabel: "Likely cause:",
      priceRule: "$75 on-site diagnostic — 100% credited toward the repair if you hire me. Written quote before work starts.",
      smsBtn: "Text Devin This Readout →",
      callBtn: "Call (228) 224-9150",
      bundleIntro: "Combine multiple small jobs in ONE visit so you only pay the $75 diagnostic visit once (and credited if hired):",
      selectedPrefix: "Selected jobs:",
      bundleTipEmpty: "Tap 1 or more items above to build a single-visit punch-list for Devin.",
      bundleTipReady: "Bundling these keeps everything in one organized trip with written upfront pricing.",
      bundleBtn: "Send Multi-Job List via Text →",
      agentIntro: "Live deterministic machine-to-machine payload exposed on window.MooreElectricAI & CORS-open JSON endpoints:",
      copyBtn: "Copy Live JSON Payload",
      copiedBtn: "Copied to Clipboard ✓",
      linksTitle: "Direct Crawlable AI / OpenAPI Endpoints:",
      emergencyNote: "URGENT: Do not open the panel cover. Call +1 (228) 224-9150 immediately."
    },
    es: {
      tabs: [
        ["triage", "⚡ Diagnóstico Rápido"],
        ["bundle", "🛠️ Lista Multi-Trabajo"],
        ["agent", "🤖 API para IA / Agentes"]
      ],
      pickSymptom: "1. Seleccione el síntoma eléctrico:",
      cityLabel: "Ciudad / Área (Costa 228):",
      noteLabel: "Detalle opcional (amperaje, marca del panel, ubicación):",
      notePh: "Ej. el GFCI del patio salta cuando llueve...",
      freeTitle: "Pruebas gratis de 30 segundos antes de pagar $75:",
      causeLabel: "Causa probable:",
      priceRule: "Visita diagnóstica de $75 — 100% acreditable al trabajo si me contrata. Presupuesto escrito antes de iniciar.",
      smsBtn: "Enviar Diagnóstico por Texto →",
      callBtn: "Llamar (228) 224-9150",
      bundleIntro: "Agrupe varios trabajos pequeños en UNA sola visita y evite cargos repetidos:",
      selectedPrefix: "Trabajos elegidos:",
      bundleTipEmpty: "Toque 1 o más opciones arriba para armar su lista de una sola visita.",
      bundleTipReady: "Combinar estas tareas permite cotizar todo por escrito en un solo viaje.",
      bundleBtn: "Enviar Lista por Texto →",
      agentIntro: "Objeto JSON determinista expuesto en vivo en window.MooreElectricAI y endpoints públicos:",
      copyBtn: "Copiar JSON en Vivo",
      copiedBtn: "Copiado ✓",
      linksTitle: "Endpoints Directos para IA y OpenAPI:",
      emergencyNote: "URGENTE: No abra la tapa del panel. Llame al +1 (228) 224-9150 de inmediato."
    },
    vi: {
      tabs: [
        ["triage", "⚡ Sàng Lọc Sự Cố"],
        ["bundle", "🛠️ Gộp Danh Sách Việc"],
        ["agent", "🤖 API Cho Trợ Lý AI"]
      ],
      pickSymptom: "1. Chọn tình trạng hệ thống điện đang gặp:",
      cityLabel: "Khu vực (Mã vùng 228):",
      noteLabel: "Ghi chú thêm nếu có (tên tủ, vị trí ổ cắm):",
      notePh: "Ví dụ: ổ GFCI ngoài hiên hay nhảy sau mưa...",
      freeTitle: "Bước tự kiểm tra miễn phí trước khi tốn $75:",
      causeLabel: "Nguyên nhân thường gặp:",
      priceRule: "Phí tới kiểm tra $75 — được trừ 100% vào tiền công nếu đồng ý sửa. Báo giá rõ trước khi làm.",
      smsBtn: "Nhắn Kết Quả Cho Devin →",
      callBtn: "Gọi (228) 224-9150",
      bundleIntro: "Gộp nhiều việc nhỏ vào CÙNG MỘT chuyến ghé để tiết kiệm thời gian và phí đi lại:",
      selectedPrefix: "Đã chọn:",
      bundleTipEmpty: "Chọn 1 hoặc nhiều mục bên trên để gộp báo giá trong 1 lần ghé.",
      bundleTipReady: "Làm gọn các hạng mục trong một lần giúp tiết kiệm chi phí rõ ràng.",
      bundleBtn: "Gửi Danh Sách Qua Tin Nhắn →",
      agentIntro: "Dữ liệu JSON chuẩn cho AI tương tác qua window.MooreElectricAI & API công khai:",
      copyBtn: "Sao Chép JSON",
      copiedBtn: "Đã Sao Chép ✓",
      linksTitle: "Đường Dẫn OpenAPI / AI Công Khai:",
      emergencyNote: "KHẨN CẤP: Không tự mở nắp tủ điện. Hãy gọi ngay +1 (228) 224-9150."
    }
  };

  function normLang(lang) {
    return UI[lang] ? lang : "en";
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildSMS(text) {
    return "sms:+12282249150?body=" + encodeURIComponent(String(text || ""));
  }

  function diagnose(idOrQuery, lang, city, note) {
    lang = normLang(lang);
    city = city || "Biloxi";
    var q = String(idOrQuery || "").toLowerCase();
    var match = DATA.diagnostics[0];
    for (var i = 0; i < DATA.diagnostics.length; i++) {
      if (DATA.diagnostics[i].id === idOrQuery) {
        match = DATA.diagnostics[i];
        break;
      }
    }
    if (q && match.id !== idOrQuery) {
      for (var j = 0; j < DATA.diagnostics.length; j++) {
        var d = DATA.diagnostics[j];
        var hay = (d.id + " " + d.title[lang] + " " + d.cause[lang]).toLowerCase();
        if (hay.indexOf(q) !== -1) {
          match = d;
          break;
        }
      }
    }
    var prefix = lang === "es"
      ? "Hola Devin, necesito revisión en " + city + ": "
      : (lang === "vi" ? "Chào Devin, tôi ở " + city + " cần kiểm tra: " : "Hi Devin, in " + city + " — ");
    var smsBody = prefix + match.title[lang] + " [" + match.urgency + "]" + (note ? " | Note: " + note : "");
    return {
      matchedId: match.id,
      urgency: match.urgency,
      urgencyLabel: match.urgency_label[lang],
      title: match.title[lang],
      cause: match.cause[lang],
      freeChecks: match.checks[lang],
      recommendedUrl: "https://228mooreelectric.com" + match.route[lang],
      routePath: match.route[lang],
      routeLabel: match.route_label[lang],
      estimateRule: UI[lang].priceRule,
      smsBody: smsBody,
      smsHref: buildSMS(smsBody)
    };
  }

  function bundleJobs(ids, lang, city, note) {
    lang = normLang(lang);
    city = city || "Biloxi";
    var set = {};
    if (Array.isArray(ids)) {
      for (var i = 0; i < ids.length; i++) set[ids[i]] = true;
    }
    var picked = [];
    for (var j = 0; j < DATA.bundles.length; j++) {
      if (set[DATA.bundles[j].id]) {
        picked.push({ id: DATA.bundles[j].id, name: DATA.bundles[j].name[lang], route: DATA.bundles[j].route });
      }
    }
    var names = picked.map(function (p) { return p.name; });
    var prefix = lang === "es"
      ? "Hola Devin, lista de trabajos en " + city + ": "
      : (lang === "vi" ? "Chào Devin, danh sách việc cần làm ở " + city + ": " : "Hi Devin, one-visit punch list in " + city + ": ");
    var smsBody = prefix + (names.length ? names.join("; ") : "General electrical quote") + (note ? " | Note: " + note : "");
    return {
      count: picked.length,
      selectedIds: picked.map(function (p) { return p.id; }),
      items: picked,
      city: city,
      smsBody: smsBody,
      smsHref: buildSMS(smsBody)
    };
  }

  function getManifest() {
    return {
      business: "Moore Electric (228 Moore Electric)",
      owner: "Devin Anthony Moore",
      phone: "+1-228-224-9150",
      baseCity: "Biloxi, MS",
      diagnosticFeeUsd: 75,
      creditedTowardWorkIfHired: true,
      supportedLanguages: ["en", "es", "vi"],
      diagnosticIds: DATA.diagnostics.map(function (d) { return d.id; }),
      bundleIds: DATA.bundles.map(function (b) { return b.id; }),
      endpoints: {
        triageCatalog: "https://228mooreelectric.com/api/triage.json",
        openApiSpec: "https://228mooreelectric.com/openapi.json",
        aiPluginManifest: "https://228mooreelectric.com/.well-known/ai-plugin.json",
        entityGraph: "https://228mooreelectric.com/.well-known/ai-entity.json",
        llmsTxt: "https://228mooreelectric.com/llms.txt"
      },
      clientJsApi: "window.MooreElectricAI.diagnose(idOrQuery, lang, city, note)"
    };
  }

  var MooreElectricAI = {
    version: "1.0.0",
    cities: DATA.cities,
    diagnostics: DATA.diagnostics,
    bundleItems: DATA.bundles,
    diagnose: diagnose,
    bundleJobs: bundleJobs,
    buildSMS: buildSMS,
    getManifest: getManifest
  };

  root.MooreElectricAI = MooreElectricAI;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = MooreElectricAI;
  }

  function mountWidget(el) {
    var lang = normLang(el.getAttribute("data-lang") || "en");
    var t = UI[lang];
    var state = {
      tab: "triage",
      diagId: DATA.diagnostics[1].id,
      city: "Biloxi",
      note: "",
      picked: ["gfci-swap", "panel-audit"]
    };

    function badgeClass(u) {
      return u === "EMERGENCY" ? "emg" : (u === "PRIORITY" ? "pri" : "std");
    }

    function render() {
      var res = diagnose(state.diagId, lang, state.city, state.note);
      var bun = bundleJobs(state.picked, lang, state.city, state.note);

      var tabsHtml = '<div class="triage-tabs" role="tablist">';
      for (var i = 0; i < t.tabs.length; i++) {
        var tb = t.tabs[i];
        var active = state.tab === tb[0];
        tabsHtml += '<button type="button" class="triage-tab' + (active ? ' on' : '') + '" data-tab="' + tb[0] + '" role="tab" aria-selected="' + active + '">' + escHtml(tb[1]) + '</button>';
      }
      tabsHtml += '</div>';

      var cityOpts = "";
      for (var c = 0; c < DATA.cities.length; c++) {
        var cname = DATA.cities[c];
        cityOpts += '<option value="' + escHtml(cname) + '"' + (cname === state.city ? ' selected' : '') + '>' + escHtml(cname) + ', MS</option>';
      }

      var bodyHtml = "";
      if (state.tab === "triage") {
        var pills = "";
        for (var k = 0; k < DATA.diagnostics.length; k++) {
          var d = DATA.diagnostics[k];
          var on = d.id === state.diagId;
          pills += '<button type="button" class="triage-pill' + (on ? ' on' : '') + '" data-diag="' + d.id + '">' +
            '<span class="triage-dot ' + badgeClass(d.urgency) + '"></span>' +
            '<span>' + escHtml(d.title[lang]) + '</span></button>';
        }
        var checks = "";
        for (var m = 0; m < res.freeChecks.length; m++) {
          checks += "<li>" + escHtml(res.freeChecks[m]) + "</li>";
        }
        bodyHtml =
          '<div class="triage-grid">' +
            '<div class="triage-left">' +
              '<p class="triage-lbl">' + escHtml(t.pickSymptom) + '</p>' +
              '<div class="triage-pills">' + pills + '</div>' +
              '<div class="triage-fields">' +
                '<label><span>' + escHtml(t.cityLabel) + '</span><select data-city>' + cityOpts + '</select></label>' +
                '<label><span>' + escHtml(t.noteLabel) + '</span><input type="text" data-note value="' + escHtml(state.note) + '" placeholder="' + escHtml(t.notePh) + '"></label>' +
              '</div>' +
            '</div>' +
            '<div class="triage-out">' +
              '<span class="triage-badge ' + badgeClass(res.urgency) + '">' + escHtml(res.urgencyLabel) + '</span>' +
              '<h3>' + escHtml(res.title) + '</h3>' +
              '<p class="triage-cause"><b>' + escHtml(t.causeLabel) + '</b> ' + escHtml(res.cause) + '</p>' +
              (res.urgency === "EMERGENCY" ? '<div class="triage-alert">' + escHtml(t.emergencyNote) + '</div>' : '') +
              '<div class="triage-box">' +
                '<p class="triage-lbl">' + escHtml(t.freeTitle) + '</p>' +
                '<ul class="triage-checks">' + checks + '</ul>' +
              '</div>' +
              '<p class="triage-rule">' + escHtml(res.estimateRule) + '</p>' +
              '<div class="triage-actions">' +
                '<a class="btn" href="' + escHtml(res.smsHref) + '">' + escHtml(t.smsBtn) + '</a>' +
                '<a class="btn ghost" href="tel:+12282249150">' + escHtml(t.callBtn) + '</a>' +
                '<a class="btn ghost" href="' + escHtml(res.routePath) + '">' + escHtml(res.routeLabel) + ' →</a>' +
              '</div>' +
            '</div>' +
          '</div>';
      } else if (state.tab === "bundle") {
        var chips = "";
        for (var b = 0; b < DATA.bundles.length; b++) {
          var item = DATA.bundles[b];
          var isPicked = state.picked.indexOf(item.id) !== -1;
          chips += '<button type="button" class="triage-pill' + (isPicked ? ' on' : '') + '" data-bundle="' + item.id + '">' +
            '<span class="triage-chk">' + (isPicked ? '✓' : '+') + '</span>' +
            '<span>' + escHtml(item.name[lang]) + '</span></button>';
        }
        var pickedList = "";
        for (var p = 0; p < bun.items.length; p++) {
          pickedList += '<li><span>✓ ' + escHtml(bun.items[p].name) + '</span><a href="' + escHtml(bun.items[p].route) + '">Details →</a></li>';
        }
        bodyHtml =
          '<div class="triage-grid">' +
            '<div class="triage-left">' +
              '<p class="triage-lbl">' + escHtml(t.bundleIntro) + '</p>' +
              '<div class="triage-pills">' + chips + '</div>' +
              '<div class="triage-fields">' +
                '<label><span>' + escHtml(t.cityLabel) + '</span><select data-city>' + cityOpts + '</select></label>' +
                '<label><span>' + escHtml(t.noteLabel) + '</span><input type="text" data-note value="' + escHtml(state.note) + '" placeholder="' + escHtml(t.notePh) + '"></label>' +
              '</div>' +
            '</div>' +
            '<div class="triage-out">' +
              '<span class="triage-badge pri">' + escHtml(t.selectedPrefix + ' ' + bun.count) + '</span>' +
              '<p class="triage-rule">' + escHtml(bun.count ? t.bundleTipReady : t.bundleTipEmpty) + '</p>' +
              (pickedList ? '<ul class="triage-picked">' + pickedList + '</ul>' : '') +
              '<p class="triage-rule">' + escHtml(t.priceRule) + '</p>' +
              '<div class="triage-actions">' +
                '<a class="btn" href="' + escHtml(bun.smsHref) + '">' + escHtml(t.bundleBtn) + '</a>' +
                '<a class="btn ghost" href="tel:+12282249150">' + escHtml(t.callBtn) + '</a>' +
              '</div>' +
            '</div>' +
          '</div>';
      } else {
        var livePayload = JSON.stringify({
          manifest: getManifest(),
          sampleDiagnoseCall: res,
          samplePunchListCall: bun
        }, null, 2);
        bodyHtml =
          '<div class="triage-agent">' +
            '<p class="triage-lbl">' + escHtml(t.agentIntro) + '</p>' +
            '<div class="triage-api-links">' +
              '<span class="triage-lbl">' + escHtml(t.linksTitle) + '</span> ' +
              '<a href="/api/triage.json" target="_blank" rel="noopener">/api/triage.json</a> · ' +
              '<a href="/openapi.json" target="_blank" rel="noopener">/openapi.json</a> · ' +
              '<a href="/.well-known/ai-plugin.json" target="_blank" rel="noopener">/.well-known/ai-plugin.json</a> · ' +
              '<a href="/.well-known/ai-entity.json" target="_blank" rel="noopener">/.well-known/ai-entity.json</a> · ' +
              '<a href="/llms.txt" target="_blank" rel="noopener">/llms.txt</a>' +
            '</div>' +
            '<pre class="triage-code">' + escHtml(livePayload) + '</pre>' +
            '<div class="triage-actions">' +
              '<button type="button" class="btn" data-copy-json>' + escHtml(t.copyBtn) + '</button>' +
              '<a class="btn ghost" href="/openapi.json" target="_blank" rel="noopener">OpenAPI 3.1 Spec →</a>' +
            '</div>' +
          '</div>';
      }

      el.innerHTML = '<div class="triage-shell">' + tabsHtml + bodyHtml + '</div>';
    }

    el.addEventListener("click", function (ev) {
      var tabBtn = ev.target.closest("[data-tab]");
      if (tabBtn) {
        state.tab = tabBtn.getAttribute("data-tab");
        render();
        return;
      }
      var diagBtn = ev.target.closest("[data-diag]");
      if (diagBtn) {
        state.diagId = diagBtn.getAttribute("data-diag");
        render();
        return;
      }
      var bunBtn = ev.target.closest("[data-bundle]");
      if (bunBtn) {
        var bid = bunBtn.getAttribute("data-bundle");
        var idx = state.picked.indexOf(bid);
        if (idx === -1) state.picked.push(bid);
        else state.picked.splice(idx, 1);
        render();
        return;
      }
      var copyBtn = ev.target.closest("[data-copy-json]");
      if (copyBtn) {
        var pre = el.querySelector(".triage-code");
        if (pre && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(pre.textContent).then(function () {
            copyBtn.textContent = t.copiedBtn;
          });
        }
      }
    });

    el.addEventListener("change", function (ev) {
      if (ev.target.matches("[data-city]")) {
        state.city = ev.target.value;
        render();
      }
    });

    el.addEventListener("input", function (ev) {
      if (ev.target.matches("[data-note]")) {
        state.note = ev.target.value;
        var outBtns = el.querySelectorAll(".triage-actions a.btn[href^='sms:']");
        var updatedHref = state.tab === "bundle"
          ? bundleJobs(state.picked, lang, state.city, state.note).smsHref
          : diagnose(state.diagId, lang, state.city, state.note).smsHref;
        for (var i = 0; i < outBtns.length; i++) {
          outBtns[i].setAttribute("href", updatedHref);
        }
      }
    });

    render();
  }

  if (typeof document !== "undefined" && document.querySelectorAll) {
    var init = function () {
      var nodes = document.querySelectorAll("[data-ai-triage]");
      for (var i = 0; i < nodes.length; i++) {
        mountWidget(nodes[i]);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
