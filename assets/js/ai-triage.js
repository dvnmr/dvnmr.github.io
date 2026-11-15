/* Moore Electric 228 — High-Voltage Interactive Fault Triage, Punch-List Bundler & AI-to-AI API */
(function (root) {
  "use strict";

  var DATA = {"cities":["Biloxi","Gulfport","Ocean Springs","D'Iberville","Long Beach","Pass Christian","Bay St. Louis","Pascagoula","Gautier","Waveland","Moss Point","Wiggins"],"diagnostics":[{"id":"warm-panel","urgency":"EMERGENCY","diy_save_pct":0,"keywords":["warm","hot","heat","buzz","buzzing","hum","humming","crackle","crackling","spark","sparking","smoke","smell","burning","melted","odor","panel","breaker box","caliente","tibio","zumbido","chispa","quemado","humo","olor","nóng","kêu rè","tóe lửa","mùi khét","cháy","tủ điện"],"urgency_label":{"en":"EMERGENCY · CALL NOW","es":"EMERGENCIA · LLAMAR YA","vi":"KHẨN CẤP · GỌI NGAY"},"title":{"en":"Warm, buzzing, crackling, or burning odor at panel","es":"Panel tibio, zumbido, chispas u olor a quemado","vi":"Tủ điện nóng, kêu rè, tóe lửa hoặc có mùi khét"},"cause":{"en":"High-resistance loose main lug, corroded utility meter stab, or arcing busbar — common on humid salt-air Gulf Coast homes.","es":"Terminal principal flojo, barra corroída por salitre o arco eléctrico interno — riesgo alto de incendio.","vi":"Đầu cốt tổng bị lỏng, thanh cái rỉ muối biển hoặc phóng hồ quang bên trong — nguy cơ cháy rất cao."},"checks":{"en":["Keep the metal dead-front panel cover closed — do NOT probe inside.","Turn off heavy 240V breakers (AC, dryer, oven) ONLY if breaker handles feel cool.","If you smell melting insulation or hear popping, clear the room and call (228) 224-9150."],"es":["NO abra la tapa metálica interior ni toque cables.","Apague brekers grandes (aire, secadora, horno) SOLO si el frente no está caliente.","Si huele plástico quemado o chisporrotea, aléjese y llame al (228) 224-9150."],"vi":["TUYỆT ĐỐI KHÔNG tháo nắp sắt bảo vệ bên trong tủ điện.","Chỉ gạt tắt cầu dao 240V lớn (máy lạnh, máy sấy) nếu tay cầm vẫn nguội.","Nếu có mùi nhựa cháy hoặc tiếng nổ lách tách, tránh xa tủ và gọi ngay (228) 224-9150."]},"isolators":[{"q":{"en":"What symptom do you notice most?","es":"¿Qué síntoma nota más?","vi":"Dấu hiệu rõ nhất là gì?"},"options":[{"id":"buzz","label":{"en":"Buzzing / humming","es":"Zumbido eléctrico","vi":"Tiếng kêu rè liên tục"},"note":{"en":"Continuous buzzing indicates a loose lug or failing breaker jaw vibrating at 60Hz under load.","es":"El zumbido continuo indica un terminal flojo o mordaza vibrando bajo carga.","vi":"Tiếng rè liên tục thường do đầu kẹp cầu dao lỏng hoặc thanh cái đánh lửa."},"override_urgency":"EMERGENCY"},{"id":"smell","label":{"en":"Burning odor / warm cover","es":"Olor a quemado / tibio","vi":"Mùi khét / nắp tủ nóng"},"note":{"en":"Thermal degradation of insulation is active — immediate same-day isolation required before bus damage spreads.","es":"Hay sobrecalentamiento activo — requiere aislamiento urgente hoy mismo.","vi":"Vỏ dây hoặc cầu dao đang sinh nhiệt cao — cần xử lý khẩn cấp trong ngày."},"override_urgency":"EMERGENCY"}]},{"q":{"en":"Do you know the panel brand?","es":"¿Sabe la marca del panel?","vi":"Quý khách có biết hiệu tủ điện?"},"options":[{"id":"legacy","label":{"en":"Federal Pacific / Zinsco / Old","es":"FPE / Zinsco / Antiguo","vi":"Tủ cũ FPE / Zinsco"},"note":{"en":"Legacy FPE/Zinsco busbars are known for no-trip failure and overheating.","es":"Los paneles FPE o Zinsco antiguos fallan al dispararse y recalientan barras.","vi":"Tủ FPE/Zinsco đời cũ hay bị kẹt cầu dao không nhảy và nóng thanh cái."}},{"id":"modern","label":{"en":"Square D / Eaton / Siemens / Unsure","es":"Square D / Eaton / No sé","vi":"Square D / Eaton / Không rõ"},"note":{"en":"Even modern panels suffer salt-air lug oxidation and torque loosening over time.","es":"Incluso paneles modernos sufren oxidación por salitre y tornillos flojos.","vi":"Tủ đời mới vẫn có thể bị lỏng vít siết hoặc rỉ hơi muối tại vùng biển."}}]}],"route":{"en":"/emergency-electrician","es":"/es/emergency-electrician","vi":"/vi/emergency-electrician"},"route_label":{"en":"Emergency Dispatch Info","es":"Servicio de Emergencia","vi":"Sửa Điện Khẩn Cấp"}},{"id":"gfci-coastal","urgency":"PRIORITY","diy_save_pct":0,"keywords":["gfci","gfi","reset","test","outdoor","patio","porch","dock","pool","rain","humidity","bathroom","garage","kitchen","salt","wet","trip","tripping","outlet","exterior","baño","garaje","salitre","lluvia","salta","toma","ngoài trời","hiên nhà","phòng tắm","nhà xe","mưa","ẩm","nhảy nút","ổ cắm"],"urgency_label":{"en":"PRIORITY · COASTAL FAULT","es":"PRIORIDAD · FALLA COSTERA","vi":"ƯU TIÊN · SỰ CỐ VÙNG BIỂN"},"title":{"en":"Outdoor, patio, garage, or bath GFCI keeps tripping","es":"El GFCI de patio, garaje o baño salta repetidamente","vi":"Ổ GFCI ngoài trời, nhà xe hoặc phòng tắm hay nhảy"},"cause":{"en":"Moisture inside exterior extension cords/covers, salt-corroded receptacle screws, or worn internal GFCI sensing coil.","es":"Humedad en cajas exteriores, salitre oxidando terminales o sensor GFCI agotado.","vi":"Hơi ẩm lọt vào hộp ngoài trời, hơi muối ăn mòn ốc đồng hoặc hỏng bo cảm biến GFCI."},"checks":{"en":["Note which exterior extension cords, freezers, or patio appliances share the circuit.","Notice whether the GFCI indicator LED is dark, amber/red, or trips again immediately.","Spot any garage, bath, or utility GFCI mounted uphill that may feed outside outlets."],"es":["Anote qué extensiones, neveras o bombas exteriores comparten ese circuito.","Observe si la luz indicadora del GFCI está apagada, roja/ámbar o salta al instante.","Ubique si hay otro GFCI maestro en garaje o lavandería conectado en serie."],"vi":["Ghi chú các dây nối ngoài trời, tủ đông hay máy bơm đang cắm chung mạch đó.","Quan sát đèn báo GFCI đang tắt, nháy đỏ/vàng hay nhảy ngay lập tức.","Tìm xem trong nhà xe hoặc phòng giặt có ổ GFCI nào nối tiếp ra sân không."]},"isolators":[{"q":{"en":"Where is this GFCI?","es":"¿Dónde está el GFCI?","vi":"Ổ GFCI nằm ở khu vực nào?"},"options":[{"id":"outdoor","label":{"en":"Patio / Exterior / Dock","es":"Patio / Exterior / Muelle","vi":"Ngoài sân / Hiên / Bến tàu"},"note":{"en":"Gulf Coast salt fog corrodes cheap brass/steel boxes rapidly — needs a Weather-Resistant (WR) GFCI + gasketed in-use cover.","es":"El salitre oxida cajas comunes — requiere GFCI WR resistente a intemperie y tapa hermética.","vi":"Hơi muối biển làm rỉ nhanh ổ thường — cần thay ổ chống ẩm WR kèm nắp kín nước."}},{"id":"indoor","label":{"en":"Garage / Bath / Kitchen","es":"Garaje / Baño / Cocina","vi":"Nhà xe / Phòng tắm / Bếp"},"note":{"en":"Often linked downstream to outdoor outlets or garage fridge motors causing ground leakage.","es":"Suele alimentar tomas exteriores o sufrir picos por compresores de refrigerador.","vi":"Thường cấp nối tiếp ra ngoài sân hoặc nhảy do dòng rò nhỏ từ tủ lạnh/độ ẩm."}}]},{"q":{"en":"When does it trip?","es":"¿Cuándo se dispara?","vi":"Khi nào nút GFCI bị nhảy?"},"options":[{"id":"instant","label":{"en":"Trips IMMEDIATELY empty","es":"Salta AL INSTANTE vacío","vi":"Nhảy NGAY TỨC THÌ dù đã rút hết"},"note":{"en":"Dead ground/neutral fault in box or failed GFCI electronics — stop resetting and replace/trace.","es":"Falla directa a tierra o GFCI dañado internamente — requiere reemplazo y revisión de caja.","vi":"Chạm đất hoặc hỏng mạch GFCI — không nên cố bấm lại, cần đo dây và thay ổ mới."},"override_urgency":"PRIORITY"},{"id":"rain","label":{"en":"Only after rain / humidity","es":"Solo tras lluvia o humedad","vi":"Chỉ nhảy sau mưa hoặc ẩm ướt"},"note":{"en":"Water intrusion inside an outdoor outlet cover or buried splice is triggering millisecond GFCI protection.","es":"Filtración de agua en tapa exterior o empalme subterráneo disparando la protección.","vi":"Nước mưa ngấm vào hộp cắm hoặc mối nối ngoài trời làm bộ bảo vệ rò ngắt mạch."}}]}],"route":{"en":"/blog-coastal-outlet-gfci-troubleshooting","es":"/es/blog-coastal-outlet-gfci-troubleshooting","vi":"/vi/blog-coastal-outlet-gfci-troubleshooting"},"route_label":{"en":"Coastal GFCI Guide","es":"Guía GFCI Costera","vi":"Hướng Dẫn GFCI Biển"}},{"id":"flickering-neutral","urgency":"PRIORITY","diy_save_pct":0,"keywords":["flicker","flickering","dim","dimming","bright","blink","blinking","neutral","lights","led","ac kicks on","compressor","voltage","surge","microwave","parpadea","parpadean","luces","neutro","bajan","suben","chớp","nhấp nháy","đèn mờ","sụt áp","dây nguội"],"urgency_label":{"en":"PRIORITY · VOLTAGE DROP","es":"PRIORIDAD · CAÍDA DE VOLTAJE","vi":"ƯU TIÊN · SỤT ÁP"},"title":{"en":"Lights flicker or dim when AC, microwave, or dryer starts","es":"Luces parpadean o bajan al encender aire o microondas","vi":"Đèn chớp, lúc mờ lúc sáng khi máy lạnh hay lò vi sóng chạy"},"cause":{"en":"Loose neutral lug in main panel/meter base, utility service splice corrosion, or incompatible LED dimmer.","es":"Neutro flojo en tablero o medidor, empalme de acometida corroído o dimmer incompatible.","vi":"Lỏng dây nguội tổng trong tủ điện/đồng hồ hoặc công tắc dimmer không tương thích đèn LED."},"checks":{"en":["Watch whether ONLY one room dims or the ENTIRE house dims while other lights get unusually bright.","Test turning off any wall dimmer switches to see if LED flicker stops.","Note whether flicker worsens in wind or high humidity outside."],"es":["Observe si ocurre solo en un cuarto o si TODA la casa sube y baja de intensidad.","Pruebe apagar algún dimmer de pared para descartar incompatibilidad LED.","Note si empeora cuando hay viento fuerte en la acometida exterior."],"vi":["Quan sát xem chỉ bị ở 1 phòng hay CẢ NHÀ lúc tối sầm lúc sáng rực bất thường.","Thử tắt các công tắc dimmer chỉnh sáng đèn LED xem hiện tượng chớp có hết không.","Để ý xem đèn có chớp mạnh hơn khi ngoài trời gió lớn không."]},"isolators":[{"q":{"en":"Where are lights flickering?","es":"¿Dónde parpadean?","vi":"Đèn chớp ở phạm vi nào?"},"options":[{"id":"whole-house","label":{"en":"Whole house / Bright + Dim surges","es":"Toda la casa / Sube y baja","vi":"Cả nhà lúc sáng rực lúc tối"},"note":{"en":"OPEN MAIN NEUTRAL WARNING: Can burn out HVAC boards & fridges cleanly. Call Devin & utility TODAY.","es":"ALERTA DE NEUTRO ABIERTO: Puede quemar tarjetas de aire y neveras. Llame HOY mismo.","vi":"CẢNH BÁO ĐỨT DÂY NGUỘI TỔNG: Dễ làm cháy bo máy lạnh và tủ lạnh. Cần kiểm tra GẤP trong ngày."},"override_urgency":"EMERGENCY"},{"id":"one-room","label":{"en":"Just one circuit / room","es":"Solo un cuarto o circuito","vi":"Chỉ 1 phòng hoặc 1 dãy đèn"},"note":{"en":"Points to a loose neutral wire-nut splice on that branch circuit or noisy dimmer.","es":"Apunta a empalme neutro flojo en ese circuito específico o interruptor desgastado.","vi":"Thường do lỏng mối nối dây nguội tại hộp công tắc/ổ cắm trên riêng nhánh đó."}}]},{"q":{"en":"Only during heavy motors?","es":"¿Solo con motores grandes?","vi":"Có chỉ bị khi máy nặng khởi động?"},"options":[{"id":"motor-dip","label":{"en":"Yes — AC / Dryer / Microwave","es":"Sí — Aire / Secadora / Micro","vi":"Đúng — Lúc máy lạnh/máy sấy chạy"},"note":{"en":"High startup current pulls voltage down across weak aluminum service lugs or shared neutrals.","es":"La corriente de arranque revela terminales flojos en barras o conductores sobrecargados.","vi":"Dòng đề-pa lớn làm lộ rõ đầu cốt bị lỏng hoặc quá tải thanh cái."}},{"id":"constant","label":{"en":"Random / constant flicker","es":"Constante o aleatorio","vi":"Chớp ngẫu nhiên liên tục"},"note":{"en":"Check LED bulb driver/dimmer compatibility or arcing loose stab inside a wall box.","es":"Revisar dimmer LED incompatible o falso contacto constante en caja de pared.","vi":"Kiểm tra công tắc dimmer LED hoặc mối nối bị move bên trong hộp âm tường."}}]}],"route":{"en":"/panel-upgrades","es":"/es/panel-upgrades","vi":"/vi/panel-upgrades"},"route_label":{"en":"Panel Diagnostics","es":"Revisión de Panel","vi":"Kiểm Tra Tủ Điện"}},{"id":"dead-half-room","urgency":"STANDARD","diy_save_pct":0,"keywords":["dead","outlets out","no power","not working","half","bedroom","room out","didnt trip","didn't trip","breaker okay","open splice","backstab","lost power","tomas muertas","sin corriente","mitad","cuarto sin luz","no saltó","mất điện","nửa phòng","không nhảy cầu dao","ổ cắm chết","không có điện"],"urgency_label":{"en":"STANDARD · OPEN SPLICE","es":"ESTÁNDAR · EMPALME ABIERTO","vi":"TIÊU CHUẨN · HỞ MỐI NỐI"},"title":{"en":"Dead outlet chain or half a room out, breaker NOT tripped","es":"Toma o medio cuarto sin corriente sin que el breaker salte","vi":"Mất điện nửa phòng nhưng cầu dao KHÔNG hề nhảy"},"cause":{"en":"Loose push-in (backstab) wire behind one upstream receptacle breaking the daisy chain, or hidden tripped GFCI.","es":"Cable suelto en inserción trasera (backstab) cortando la cadena o GFCI oculto disparado.","vi":"Dây gài lỗ sau lưng ổ cắm (backstab) bị lỏng mất tiếp xúc hoặc dính GFCI ẩn ở phòng khác."},"checks":{"en":["Note every bathroom, garage, kitchen, or porch GFCI indicator light that looks dark or amber.","Notice which wall switches control half-hot lamps or feel warm on the faceplate.","Note which breaker is labeled for that room and whether the handle sits in the middle position."],"es":["Observe si algún GFCI en baños, cocina, garaje o porche muestra luz roja/ámbar o apagada.","Anote qué interruptores de pared controlan tomas o si alguna tapa se siente tibia.","Revise visualmente el tablero para ver si algún breaker quedó a mitad de recorrido."],"vi":["Quan sát đèn báo GFCI ở phòng tắm, bếp, nhà xe hoặc hiên xem có ổ nào báo đỏ/tắt.","Ghi chú công tắc tường nào điều khiển ổ đèn hay mặt ổ nào hơi ấm.","Nhìn tủ điện xem tay gạt cầu dao phòng đó có đang nằm lưng chừng giữa ON/OFF không."]},"isolators":[{"q":{"en":"How much of the home is dark?","es":"¿Qué parte perdió energía?","vi":"Mất điện phạm vi bao nhiêu?"},"options":[{"id":"half-house","label":{"en":"Half the house + 240V AC/dryer weak","es":"Media casa y equipos 240V fallan","vi":"Nửa căn nhà + mất máy 240V"},"note":{"en":"DROP IN ONE HOT LEG (L1/L2): Could be failed main breaker lug or utility meter leg — urgent check needed.","es":"PÉRDIDA DE UNA FASE DE ENTRADA: Falla en breaker principal o medidor — requiere atención prioritaria.","vi":"MẤT 1 PHA TỔNG (L1/L2): Hỏng một bên cầu dao tổng hoặc ngoài đồng hồ — cần kiểm tra sớm."},"override_urgency":"EMERGENCY"},{"id":"branch","label":{"en":"3–6 outlets / lights on one room wall","es":"Varios tomas en un cuarto o pared","vi":"Vài ổ cắm hoặc đèn 1 góc phòng"},"note":{"en":"Classic open daisy-chain splice behind one working or dead receptacle — fixed cleanly with pigtail side-wiring.","es":"Falla clásica en empalme de cadena — se corrige con uniones pigtail atornilladas lateralmente.","vi":"Đúng bệnh hở mối nối truyền tiếp sau lưng ổ cắm — sửa dứt điểm bằng đấu vòng pigtail."}}]},{"q":{"en":"What were you running right before?","es":"¿Qué estaba usando justo antes?","vi":"Ngay trước khi mất điện có dùng gì?"},"options":[{"id":"heavy-plug","label":{"en":"Space heater / vacuum / hair dryer","es":"Calentador / aspiradora / secador","vi":"Máy sưởi / máy hút bụi / sấy tóc"},"note":{"en":"High current heated a weak backstab contact until it separated open inside the wall box.","es":"La carga alta calentó un empalme trasero débil hasta desconectarlo dentro de la caja.","vi":"Dòng tải nặng làm nóng chảy tiếp điểm gài sau lưng ổ cắm khiến mạch phía sau mất điện."}},{"id":"sudden","label":{"en":"Nothing heavy — suddenly dead","es":"Nada pesado — se fue de golpe","vi":"Không cắm gì nặng — tự nhiên mất"},"note":{"en":"Devin traces the open neutral/hot leg node-by-node with tone/impedance meters without tearing walls.","es":"Rastreo de circuito punto por punto sin romper paredes innecesariamente.","vi":"Dùng máy dò mạch chuyên dụng xác định đúng hộp bị hở mà không cần đục tường."}}]}],"route":{"en":"/troubleshooting-repair","es":"/es/troubleshooting-repair","vi":"/vi/troubleshooting-repair"},"route_label":{"en":"Fault Tracing Info","es":"Rastreo de Fallas","vi":"Dò Tìm Mất Điện"}},{"id":"breaker-trips-load","urgency":"STANDARD","diy_save_pct":0,"keywords":["breaker trips","keeps tripping","overload","space heater","hair dryer","microwave","trips immediately","short circuit","afci","dedicated circuit","breaker wont stay","breaker salta","disyuntor","sobrecarga","cortocircuito","calentador","cầu dao nhảy","quá tải","chập điện","nhảy ngay","máy sưởi"],"urgency_label":{"en":"STANDARD · OVERLOAD / SHORT","es":"ESTÁNDAR · SOBRECARGA","vi":"TIÊU CHUẨN · QUÁ TẢI"},"title":{"en":"Breaker keeps tripping when appliances run (or instantly)","es":"El breaker salta con electrodomésticos o al instante","vi":"Cầu dao nhảy khi bật thiết bị hoặc bật lên là nhảy ngay"},"cause":{"en":"Shared 15A circuit pushed over 1,800W, fatigued breaker thermal element, or direct short/ground fault.","es":"Circuito de 15A excediendo 1,800W, breaker debilitado o cortocircuito directo.","vi":"Mạch 15A dùng chung vượt quá 1,800W, cầu dao già yếu hoặc đang chập mạch trực tiếp."},"checks":{"en":["Note which appliances (space heater, microwave, hair dryer) were running when it tripped.","Do NOT repeatedly force a tripped breaker back on — leave it OFF for meter tracing.","Look at whether the breaker has a white/purple/blue TEST button (AFCI/GFCI combo)."],"es":["Anote qué aparatos (calentador, microondas, secador) estaban encendidos al saltar.","NO fuerce un breaker que vuelve a dispararse — déjelo apagado para diagnóstico.","Observe si el breaker tiene botón TEST (protección AFCI/GFCI)."],"vi":["Ghi nhớ thiết bị nào (máy sưởi, lò vi sóng, máy sấy) đang chạy đúng lúc bị nhảy.","KHÔNG cố gạt lại nhiều lần nếu cầu dao bật ra ngay — để yên OFF cho thợ đo kiểm.","Xem cầu dao đó có nút nhấn TEST nhỏ trên thân (loại AFCI/GFCI) hay không."]},"isolators":[{"q":{"en":"How quickly does it trip?","es":"¿Qué tan rápido salta?","vi":"Cầu dao nhảy nhanh mức nào?"},"options":[{"id":"instant-trip","label":{"en":"SNAPS OFF immediately empty","es":"Salta AL INSTANTE vacío","vi":"Gạt lên NHẢY TỨC THÌ dù trống"},"note":{"en":"Active short circuit or pinned wire screw — do NOT keep resetting. Needs fault isolation.","es":"Cortocircuito activo o cable pellizcado — no reintentar; requiere aislamiento de falla.","vi":"Đang chạm chập nóng-nguội hoặc cấn dây vào vít — cần ngắt hẳn để thợ dò điểm chập."},"override_urgency":"PRIORITY"},{"id":"after-min","label":{"en":"After 5–20 mins under heavy load","es":"Tras 5–20 min con carga","vi":"Chạy 5–20 phút mới nhảy"},"note":{"en":"Thermal overload — pulling >15A on shared bedroom/bath lines or needing a dedicated 20A circuit.","es":"Sobrecarga térmica — requiere repartir cargas o instalar circuito dedicado de 20A.","vi":"Nhảy do quá tải nhiệt — nên kéo thêm 1 đường 20A riêng cho thiết bị nặng."}}]},{"q":{"en":"Has a TEST button on the breaker?","es":"¿Tiene botón TEST?","vi":"Cầu dao có nút TEST không?"},"options":[{"id":"afci","label":{"en":"Yes — AFCI / GFCI Test button","es":"Sí — Botón TEST (AFCI/GFCI)","vi":"Có nút nhấn TEST"},"note":{"en":"AFCI breakers trip on vacuum brush arcing or shared neutral wiring across adjacent circuits.","es":"Los AFCI detectan arcos en escobillas de motor o neutros cruzados entre circuitos.","vi":"Loại AFCI rất nhạy với mô-tơ chổi than hoặc hiện tượng đấu chéo dây nguội giữa 2 mạch."}},{"id":"std-brk","label":{"en":"Standard handle only","es":"Solo palanca estándar","vi":"Cầu dao thường không có nút"},"note":{"en":"We measure real clamp-on amperage draw and inspect breaker busbar stab tension.","es":"Medimos amperaje real bajo carga y verificamos mordaza del disyuntor.","vi":"Sẽ kẹp đồng hồ ampe đo tải thực và kiểm tra độ bám thanh cái."}}]}],"route":{"en":"/services","es":"/es/services","vi":"/vi/services"},"route_label":{"en":"Dedicated Circuits","es":"Circuitos Dedicados","vi":"Kéo Mạch Riêng"}},{"id":"ev-hot-plug","urgency":"PRIORITY","diy_save_pct":0,"keywords":["ev","tesla","rivian","charger","wall connector","nema 14-50","14-50","50a","60a","car charger","charging slows","hot plug","melted outlet","cargador ev","auto eléctrico","enchufe caliente","baja potencia","sạc xe điện","tesla","nóng phích","giảm dòng sạc"],"urgency_label":{"en":"PRIORITY · EV CONTINUOUS LOAD","es":"PRIORIDAD · CARGADOR EV","vi":"ƯU TIÊN · SẠC XE ĐIỆN EV"},"title":{"en":"EV charger slowing down, warm plug, or tripping 50A breaker","es":"Cargador EV se calienta, baja potencia o dispara breaker 50A","vi":"Sạc xe điện EV bị nóng phích, tự giảm dòng hoặc nhảy cầu dao"},"cause":{"en":"Cheap builder-grade dryer NEMA 14-50 receptacle overheating under 8-hour EV duty, or un-torqued aluminum lugs.","es":"Toma doméstica barata derritiéndose por carga continua EV o terminal flojo.","vi":"Dùng ổ máy sấy loại thường nên nóng chảy tiếp điểm khi sạc xe nhiều giờ liên tục."},"checks":{"en":["Throttle your vehicle / EVSE charge current down to 24A temporarily in the app.","Inspect the face of the outlet when unplugged — any brown/melted plastic means STOP charging.","Verify whether you have 100A, 150A, or 200A main service (try /calculators EV panel checker)."],"es":["Reduzca temporalmente la corriente a 24A en la app de su auto.","Revise si la toma muestra plástico derretido o marrón — si es así, DETENGA la carga.","Verifique si su panel es 100A, 150A o 200A."],"vi":["Tạm giảm dòng sạc trong app xe xuống 24A để tránh phát nhiệt quá mức.","Kiểm tra mặt ổ cắm — thấy ngả vàng/nâu hay mùi nhựa khét là NGỪNG SẠC NGAY.","Xem tủ chính nhà là 100A, 150A hay 200A (thử tính nhanh ở trang /vi/calculators)."]},"isolators":[{"q":{"en":"How is the EVSE connected?","es":"¿Cómo está conectado?","vi":"Bộ sạc nối kiểu nào?"},"options":[{"id":"plug-1450","label":{"en":"NEMA 14-50 Wall Outlet","es":"Toma de pared NEMA 14-50","vi":"Ổ cắm tường NEMA 14-50"},"note":{"en":"Upgrade cheap residential receptacles to heavy EV-grade commercial receptacles (Bryant/Hubbell) or hardwire.","es":"Reemplazar toma común por toma grado industrial EV (Bryant/Hubbell) o conexión directa.","vi":"Cần thay sang ổ chuyên dụng EV chịu tải nhiệt cao (Bryant/Hubbell) hoặc đấu cứng."}},{"id":"hardwire","label":{"en":"Hardwired / New Install","es":"Cableado directo / Nuevo","vi":"Đấu cứng / Cần lắp mới"},"note":{"en":"Hardwiring eliminates plug-blade heating and unlocks full 48A charging on a continuous-rated 60A circuit.","es":"La conexión directa elimina puntos calientes de enchufe y habilita 48A en circuito de 60A.","vi":"Đấu cứng bỏ qua chân phích cắm, chạy bền 48A liên tục trên cầu dao 60A."}}]},{"q":{"en":"See discoloration or warm plug?","es":"¿Ve calor o decoloración?","vi":"Có thấy nóng hay cháy sém?"},"options":[{"id":"brown","label":{"en":"YES — Hot plug / browned plastic","es":"SÍ — Enchufe caliente / oscuro","vi":"CÓ — Phích rất nóng hoặc sém nâu"},"note":{"en":"Imminent thermal melt risk — unplug charger and replace burnt receptacle + cut back oxidized copper.","es":"Riesgo inminente de fusión — desconecte el cargador y reemplace toma y cable oxidado.","vi":"Nguy cơ chảy nhựa cháy nổ cao — rút sạc và thay ổ + cắt bỏ đoạn dây đã cháy."},"override_urgency":"EMERGENCY"},{"id":"throttle","label":{"en":"App just throttled amps / planning","es":"Solo baja amperaje / cotización","vi":"Chỉ thấy app hạ dòng / cần lắp"},"note":{"en":"Devin checks lug torque, wire gauge (#6 Cu / #4), and panel headroom cleanly.","es":"Verificamos torque de terminales, calibre de cobre y capacidad del tablero.","vi":"Đo kiểm tra lại cỡ dây đồng, lực siết cốt và công suất dự phòng của tủ."}}]}],"route":{"en":"/ev-charger-install","es":"/es/ev-charger-install","vi":"/vi/ev-charger-install"},"route_label":{"en":"EV Charger Service","es":"Instalación EV","vi":"Lắp Sạc EV An Toàn"}},{"id":"generator-storm","urgency":"STANDARD","diy_save_pct":0,"keywords":["generator","interlock","transfer switch","30a","50a","inlet","hurricane","storm","backup","surge","whole home surge","soft start","l14-30","generador","interbloqueo","tormenta","huracán","respaldo","sobretensiones","máy phát điện","interlock","cổng 30a","cổng 50a","mùa bão","chống sét"],"urgency_label":{"en":"PLANNING · STORM READINESS","es":"PLANIFICACIÓN · TORMENTAS","vi":"CHUẨN BỊ · MÙA BÃO"},"title":{"en":"Generator interlock kit, 30A/50A inlet, or whole-home surge","es":"Interbloqueo de generador, toma 30A/50A o protector contra picos","vi":"Lắp bộ khóa máy phát Interlock, cổng 30A/50A hoặc chống sét tổng"},"cause":{"en":"Safe hurricane backup hookup to main panel without window extension cords or dangerous backfeed.","es":"Conexión segura de respaldo al tablero principal sin cables peligrosos ni retorno eléctrico.","vi":"Đấu nối nguồn máy phát mùa bão an toàn qua tủ chính, không phát ngược lưới điện."},"checks":{"en":["Snap a photo of the breaker panel door sticker and main breaker location (top/side).","Note your portable generator's running watts & outlet plug (L14-30 30A vs 14-50 50A).","Try our Storm Generator Sizer on /calculators to confirm whether 30A or 50A fits."],"es":["Tome foto de la etiqueta dentro de la puerta del panel y ubicación del breaker principal.","Revise los vatios continuos de su generador y tipo de toma (30A L14-30 o 50A).","Pruebe nuestra calculadora de generador en /es/calculators."],"vi":["Chụp hình tem thông số cánh tủ điện chính và vị trí cầu dao tổng.","Xem công suất chạy liên tục và cổng ra trên máy phát (L14-30 30A hay 50A).","Thử tính công suất trên trang /vi/calculators trước khi chọn cổng cắm."]},"isolators":[{"q":{"en":"What power level do you want?","es":"¿Qué nivel de respaldo busca?","vi":"Nhu cầu chạy mùa bão?"},"options":[{"id":"30a","label":{"en":"Fridges, lights, Wi-Fi & window AC (30A)","es":"Nevera, luces, Wi-Fi (30A)","vi":"Tủ lạnh, đèn, Wi-Fi & lạnh nhỏ (30A)"},"note":{"en":"NEMA L14-30 exterior inlet + interlock bracket handles essentials up to 7,200W cleanly.","es":"Entrada NEMA L14-30 + kit de interbloqueo maneja cargas esenciales hasta 7,200W.","vi":"Cổng ngoài NEMA L14-30 + thanh gài Interlock kéo gọn thiết bị thiết yếu tới 7,200W."}},{"id":"50a","label":{"en":"Run Central HVAC / Heavy 50A Inlet","es":"Aire central / Entrada pesada 50A","vi":"Kéo điều hòa trung tâm (50A)"},"note":{"en":"50A CS6375 inlet + HVAC soft-start kit lets larger portable/inverter generators carry central cooling.","es":"Entrada 50A + kit soft-start en el aire central permite respaldo completo durante calor extremo.","vi":"Cổng 50A kèm bộ khởi động mềm soft-start giúp máy phát kéo nổi điều hòa lớn."}}]},{"q":{"en":"Panel placement?","es":"¿Ubicación del panel?","vi":"Vị trí tủ điện chính?"},"options":[{"id":"garage-inlet","label":{"en":"Exterior wall / Garage","es":"Pared exterior / Garaje","vi":"Ngoài tường / Nhà xe"},"note":{"en":"Allows clean short conduit run directly to a weatherproof generator inlet outside away from windows.","es":"Permite canalización corta hasta una toma exterior segura lejos de ventanas.","vi":"Thuận tiện đi ống nối cổng cắm máy phát ngoài trời cách xa cửa sổ."}},{"id":"surge-too","label":{"en":"Add Whole-Home Surge Protection too","es":"Añadir protector contra picos","vi":"Lắp kèm chống sét tổng cả nhà"},"note":{"en":"Smart coastal combo: Type 1/2 surge protection clamps grid re-energize spikes right after storm restoration.","es":"Combinación ideal: protege tarjetas electrónicas cuando regresa la luz tras tormentas.","vi":"Kết hợp cực chuẩn bảo vệ bo mạch điện tử khi điện lưới đóng lại sau bão."}}]}],"route":{"en":"/generator-install","es":"/es/generator-install","vi":"/vi/generator-install"},"route_label":{"en":"Generator Interlocks","es":"Generador e Interlock","vi":"Máy Phát & Interlock"}},{"id":"controls-automation","urgency":"PRIORITY","diy_save_pct":0,"keywords":["vfd","plc","motor","three phase","3 phase","3-phase","contactor","relay","control","controls","automation","sensor","4-20ma","pump","lift station","esp32","power conversion","inverter","switchgear","restaurant","trifásico","relé","control","automatización","bomba","3 pha","biến tần","rơ-le","mô-tơ","điều khiển","tự động hóa","bơm"],"urgency_label":{"en":"INDUSTRIAL / CONTROLS · COMMERCIAL","es":"INDUSTRIAL / CONTROL · COMERCIAL","vi":"CÔNG NGHIỆP / ĐIỀU KHIỂN"},"title":{"en":"Three-phase motor, VFD fault, pump relay, or control panel","es":"Falla en motor trifásico, VFD, relé de bomba o panel de control","vi":"Sự cố mô-tơ 3 pha, biến tần VFD, rơ-le bơm hoặc tủ điều khiển"},"cause":{"en":"Single-phased contactor contact, noisy 4-20mA sensor loop, tripped overload relay, or blown 24VDC/120VAC control fuse.","es":"Contactor con fase perdida, señal 4-20mA con ruido, relevador térmico o fusible de control.","vi":"Khởi động từ cháy tiếp điểm mất pha, nhiễu tín hiệu 4-20mA hoặc đứt cầu chì mạch điều khiển."},"checks":{"en":["Photograph or write down the exact VFD / PLC fault code on the screen BEFORE hitting Reset.","Verify local disconnect switch and 24VDC / 120VAC control circuit breaker/fuses.","Note whether a float switch, pressure transducer, or safety interlock is holding the run signal open."],"es":["Fotografíe o anote el código exacto en la pantalla del VFD/PLC ANTES de reiniciar.","Verifique fusibles de control (24VDC/120VAC) y desconectador local.","Revise si algún flotador, sensor de presión o paro de emergencia bloquea el arranque."],"vi":["Chụp hình hoặc ghi đúng mã lỗi trên màn hình VFD / PLC TRƯỚC KHI bấm Reset.","Kiểm tra cầu chì / aptomat mạch điều khiển 24VDC hoặc 120VAC.","Xem phao báo mức, cảm biến áp suất hoặc nút dừng khẩn E-Stop có đang ngắt lệnh chạy không."]},"isolators":[{"q":{"en":"System architecture?","es":"¿Tipo de sistema?","vi":"Hệ thống thuộc loại nào?"},"options":[{"id":"vfd-motor","label":{"en":"VFD / 3-Phase Motor Starter","es":"VFD / Arrancador Trifásico","vi":"Biến tần VFD / Mô-tơ 3 pha"},"note":{"en":"Check phase-to-phase balance, shielded motor cable grounding, and overload trip curve.","es":"Revisamos balance entre fases, tierra de cable apantallado y disparo térmico.","vi":"Đo cân bằng điện áp 3 pha, kiểm tra tiếp địa chống nhiễu và rơ-le nhiệt."}},{"id":"plc-pump","label":{"en":"PLC / Pump / Power Conversion","es":"PLC / Bomba / Conversión","vi":"PLC / Tủ bơm / Chuyển nguồn"},"note":{"en":"Devin debugs ladder logic I/O, float/pressure loops, inverter transfer gear, and ESP32 telemetry.","es":"Diagnóstico esquemático de señales E/S, lazos 4-20mA, inversores y telemetría.","vi":"Kiểm tra theo sơ đồ mạch điều khiển, cảm biến 4-20mA, biến áp và bộ đổi nguồn."}}]},{"q":{"en":"Production impact?","es":"¿Impacto operativo?","vi":"Mức độ ảnh hưởng?"},"options":[{"id":"down","label":{"en":"Equipment / shop completely down","es":"Equipo crítico detenido","vi":"Máy ngừng chạy hoàn toàn"},"note":{"en":"Priority dispatch to restore power/controls and isolate root failure cleanly.","es":"Atención prioritaria para restablecer el sistema con diagnóstico técnico directo.","vi":"Ưu tiên xử lý nhanh khôi phục mạch điều khiển và động lực."},"override_urgency":"EMERGENCY"},{"id":"intermittent","label":{"en":"Intermittent fault / upgrade","es":"Falla intermitente / mejora","vi":"Lỗi chập chờn / cần nâng cấp"},"note":{"en":"Scheduled schematic audit, contactor swap, or clean DIN-rail panel rewiring.","es":"Revisión programada de tablero, cambio de contactores o cableado en riel DIN.","vi":"Sắp xếp kiểm tra tủ điều khiển, thay khởi động từ hoặc đi lại dây DIN chuẩn gọn."}}]}],"route":{"en":"/services","es":"/es/services","vi":"/vi/services"},"route_label":{"en":"Controls & Automation","es":"Control y Automatización","vi":"Hệ Thống Điều Khiển"}}],"bundles":[{"id":"gfci-swap","est_min":45,"name":{"en":"Replace coastal / exterior GFCI outlets","es":"Cambiar tomas GFCI exteriores","vi":"Thay ổ GFCI chống ẩm ngoài trời"},"route":"/switches-dimmers"},{"id":"fan-install","est_min":75,"name":{"en":"Mount ceiling fan (standard or tall ceiling)","es":"Instalar ventilador de techo","vi":"Lắp quạt trần cân bằng"},"route":"/ceiling-fans"},{"id":"dimmers-switches","est_min":40,"name":{"en":"Swap smart switches / LED dimmers","es":"Cambiar interruptores o dimmers LED","vi":"Thay công tắc thông minh / dimmer LED"},"route":"/switches-dimmers"},{"id":"exterior-lights","est_min":90,"name":{"en":"Install floodlights / soffit / dock lighting","es":"Instalar reflectores / luces exteriores","vi":"Lắp đèn pha sân vườn / bến tàu"},"route":"/lighting"},{"id":"ev-circuit","est_min":150,"name":{"en":"Run dedicated 240V EV charger circuit","es":"Instalar circuito 240V para EV","vi":"Đi đường dây 240V sạc xe EV"},"route":"/ev-charger-install"},{"id":"whole-surge","est_min":60,"name":{"en":"Install whole-home Type 1/2 surge protector","es":"Protector contra sobretensiones en panel","vi":"Lắp chống sét tổng tại tủ điện"},"route":"/surge-protection"},{"id":"gen-interlock","est_min":150,"name":{"en":"Add 30A/50A generator interlock kit","es":"Kit interbloqueo 30A/50A generador","vi":"Lắp bộ Interlock máy phát 30A/50A"},"route":"/generator-install"},{"id":"panel-audit","est_min":45,"name":{"en":"Clean panel labeling & thermal/lug checkup","es":"Revisión y etiquetado del panel principal","vi":"Kiểm tra siết cốt & dán nhãn tủ điện"},"route":"/panel-upgrades"}]};
  var URGENCY_RANK = { STANDARD: 1, PRIORITY: 2, EMERGENCY: 3 };

  var UI = {
    en: {
      tabs: [
        ["triage", "⚡ Fault Analyzer"],
        ["bundle", "🛠️ 1-Visit Punch-List"],
        ["agent", "🤖 AI Agent Terminal"]
      ],
      searchLabel: "Describe what's happening in plain English:",
      searchPh: "e.g., outdoor GFCI tripping after rain, half room dead, panel buzzing...",
      matchPrefix: "Auto-matched:",
      pickSymptom: "Or select a common fault profile:",
      isoHeading: "Narrow it down (2 quick questions):",
      diyHeading: "Safe pre-arrival observations for Devin (tick what applies):",
      cityLabel: "City / Area (228 Coast):",
      noteLabel: "Optional detail (panel brand, breaker size):",
      notePh: "e.g., back patio outlet near AC unit...",
      statUrgency: "Priority Level",
      statDiy: "DIY Save Chance",
      statVisit: "$75 Visit (Credited)",
      statDone: "Checks Verified",
      causeLabel: "Likely root cause:",
      verdictEmergencyTitle: "ACTIVE ELECTRICAL HAZARD · CALL IMMEDIATELY",
      verdictDoneTitle: "ALL OBSERVATIONS LOGGED · READY FOR DISPATCH",
      verdictDoneBody: "All 3 pre-arrival observations are attached below. Text Devin this exact triage summary for an upfront diagnostic visit ($75 credited toward your repair).",
      verdictCheckTitle: "NEEDS PROFESSIONAL METER TRACE · $75 VISIT (CREDITED)",
      verdictCheckBody: "0% DIY — electrical faults shouldn't be guessed at. Tick any observations above to attach them to your dispatch text ($75 visit is credited toward your repair).",
      priceRule: "$75 on-site diagnostic — 100% credited toward the repair if you hire me. Written quote before work starts.",
      smsBtn: "Text Devin This Readout →",
      callBtn: "Call (228) 224-9150",
      bundleIntro: "Check off small fixes to bundle into ONE organized trip (pay one $75 visit instead of separate trips):",
      statJobs: "Jobs Selected",
      statWindow: "Est. On-Site Time",
      statTrip: "Visit Fee Count",
      bundleVerdictEmpty: "Pick 1 or more items on the left to build a consolidated quote list.",
      bundleVerdictReady: "1-Visit Punch-List Ready — bundled jobs priced upfront in writing before work begins.",
      bundleBtn: "Text Bundled List to Devin →",
      agentIntro: "Test live natural-language queries against window.MooreElectricAI or copy the deterministic JSON returned to AI assistants:",
      presets: [
        "outdoor GFCI keeps tripping after rain",
        "half my bedroom outlets are dead breaker didnt trip",
        "EV charger plug getting warm on 50A outlet"
      ],
      runBtn: "Run Live Query →",
      copyBtn: "Copy Live JSON",
      copiedBtn: "Copied ✓",
      linksTitle: "Crawlable AI / OpenAPI Endpoints:",
      emergencyNote: "URGENT SAFETY: Keep the dead-front metal cover closed. Call +1 (228) 224-9150 directly."
    },
    es: {
      tabs: [
        ["triage", "⚡ Analizador de Fallas"],
        ["bundle", "🛠️ Lista en 1 Visita"],
        ["agent", "🤖 Terminal Agente IA"]
      ],
      searchLabel: "Describa lo que ocurre en su casa o negocio:",
      searchPh: "Ej., el GFCI del patio salta tras llover, medio cuarto sin luz, panel tibio...",
      matchPrefix: "Coincidencia:",
      pickSymptom: "O elija un síntoma frecuente:",
      isoHeading: "Aisle la falla (2 preguntas rápidas):",
      diyHeading: "Observaciones previas seguras para Devin (marque lo observado):",
      cityLabel: "Ciudad / Área (Costa 228):",
      noteLabel: "Detalle opcional (amperaje, marca, ubicación):",
      notePh: "Ej., toma trasera junto al aire...",
      statUrgency: "Nivel de Prioridad",
      statDiy: "Prob. Bricolaje",
      statVisit: "Visita $75 (Acreditable)",
      statDone: "Pruebas Hechas",
      causeLabel: "Causa probable:",
      verdictEmergencyTitle: "PELIGRO ELÉCTRICO ACTIVO · LLAME DE INMEDIATO",
      verdictDoneTitle: "OBSERVACIONES REGISTRADAS · LISTO PARA ENVIAR",
      verdictDoneBody: "Las 3 observaciones previas quedaron adjuntas abajo. Envíe este resumen por texto a Devin para su visita diagnóstica ($75 acreditados a su reparación).",
      verdictCheckTitle: "REQUIERE DIAGNÓSTICO PROFESIONAL · VISITA $75 (ACREDITADA)",
      verdictCheckBody: "0% bricolaje — no adivine con fallas eléctricas. Marque lo observado arriba para incluirlo en su mensaje a Devin ($75 acreditados a la reparación).",
      priceRule: "Visita diagnóstica de $75 — 100% acreditable al trabajo si me contrata. Presupuesto escrito antes de empezar.",
      smsBtn: "Enviar Diagnóstico por Texto →",
      callBtn: "Llamar (228) 224-9150",
      bundleIntro: "Marque varias tareas para combinarlas en UNA sola visita y evitar cargos repetidos:",
      statJobs: "Tareas Elegidas",
      statWindow: "Tiempo Estimado",
      statTrip: "Cargo de Visita",
      bundleVerdictEmpty: "Seleccione 1 o más tareas para armar su cotización en una visita.",
      bundleVerdictReady: "Lista Consolidada Lista — todo se cotiza por escrito antes de iniciar.",
      bundleBtn: "Enviar Lista por Texto →",
      agentIntro: "Pruebe consultas en vivo contra window.MooreElectricAI o copie el JSON determinista para asistentes IA:",
      presets: [
        "el GFCI del patio salta cuando llueve",
        "medio cuarto sin corriente pero no saltó el breaker",
        "enchufe de cargador EV caliente"
      ],
      runBtn: "Ejecutar →",
      copyBtn: "Copiar JSON",
      copiedBtn: "Copiado ✓",
      linksTitle: "Endpoints Directos para IA / OpenAPI:",
      emergencyNote: "SEGURIDAD URGENTE: No abra la tapa metálica del tablero. Llame al +1 (228) 224-9150."
    },
    vi: {
      tabs: [
        ["triage", "⚡ Phân Tích Sự Cố"],
        ["bundle", "🛠️ Gộp Việc 1 Lần Ghé"],
        ["agent", "🤖 API Trợ Lý AI"]
      ],
      searchLabel: "Mô tả ngắn tình trạng điện nhà quý khách:",
      searchPh: "Ví dụ: ổ ngoài sân nhảy sau mưa, mất điện nửa phòng, tủ kêu rè...",
      matchPrefix: "Đã khớp:",
      pickSymptom: "Hoặc chọn nhóm sự cố phổ biến:",
      isoHeading: "Thu hẹp nguyên nhân (2 câu hỏi nhanh):",
      diyHeading: "Quan sát an toàn trước khi Devin đến (đánh dấu mục đã kiểm tra):",
      cityLabel: "Khu vực (Mã vùng 228):",
      noteLabel: "Ghi chú thêm (hiệu tủ điện, vị trí):",
      notePh: "Ví dụ: ổ ngoài hiên gần cục nóng máy lạnh...",
      statUrgency: "Mức Độ Khẩn",
      statDiy: "Tự Sửa (DIY)",
      statVisit: "Phí Ghé $75 (Được Trừ)",
      statDone: "Đã Kiểm Tra",
      causeLabel: "Nguyên nhân thường gặp:",
      verdictEmergencyTitle: "NGUY CƠ MẤT AN TOÀN ĐIỆN · GỌI NGAY",
      verdictDoneTitle: "ĐÃ GHI NHẬN ĐỦ THÔNG TIN · SẴN SÀNG GỬI THỢ",
      verdictDoneBody: "Đã đính kèm đủ 3 ghi nhận bên dưới. Nhắn ngay kết quả này cho Devin để sắp lịch kiểm tra ($75 trừ thẳng vào tiền sửa).",
      verdictCheckTitle: "CẦN ĐO KIỂM CHUYÊN NGHIỆP · PHÍ KHẢO SÁT $75 (ĐƯỢC TRỪ)",
      verdictCheckBody: "0% tự sửa — không nên tự đoán sự cố điện. Hãy đánh dấu các biểu hiện bên trên để đính kèm vào tin nhắn gửi Devin ($75 được trừ vào tiền sửa).",
      priceRule: "Phí tới kiểm tra $75 — trừ 100% vào tiền công nếu đồng ý sửa. Báo giá văn bản trước khi làm.",
      smsBtn: "Nhắn Kết Quả Cho Devin →",
      callBtn: "Gọi (228) 224-9150",
      bundleIntro: "Chọn nhiều hạng mục nhỏ để gộp trong MỘT chuyến ghé, tránh tốn phí đi lại nhiều lần:",
      statJobs: "Số Hạng Mục",
      statWindow: "Thời Gian Dự Kiến",
      statTrip: "Số Lần Tính Phí Ghé",
      bundleVerdictEmpty: "Chọn ít nhất 1 mục bên trái để gộp báo giá 1 lần ghé.",
      bundleVerdictReady: "Đã Sẵn Sàng Gộp 1 Chuyến — báo giá tổng rõ ràng bằng văn bản trước khi thi công.",
      bundleBtn: "Gửi Danh Sách Cho Devin →",
      agentIntro: "Thử truy vấn tự nhiên trực tiếp qua window.MooreElectricAI hoặc sao chép JSON chuẩn cho AI:",
      presets: [
        "ổ GFCI ngoài hiên hay nhảy sau mưa",
        "mất điện nửa phòng nhưng cầu dao không nhảy",
        "sạc xe điện EV bị nóng phích cắm"
      ],
      runBtn: "Chạy Thử →",
      copyBtn: "Sao Chép JSON",
      copiedBtn: "Đã Sao Chép ✓",
      linksTitle: "Đường Dẫn OpenAPI / AI Công Khai:",
      emergencyNote: "AN TOÀN KHẨN CẤP: Không tháo nắp sắt tủ điện. Gọi ngay +1 (228) 224-9150."
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

  function matchSymptom(idOrQuery, lang) {
    lang = normLang(lang);
    for (var i = 0; i < DATA.diagnostics.length; i++) {
      if (DATA.diagnostics[i].id === idOrQuery) {
        return { item: DATA.diagnostics[i], score: 100, exact: true };
      }
    }
    var q = String(idOrQuery || "").trim().toLowerCase();
    if (!q) {
      return { item: DATA.diagnostics[1], score: 0, exact: false };
    }
    var tokens = q.split(/[^a-z0-9à-ỹáéíóúñ-]+/i).filter(function (w) { return w.length >= 2; });
    var best = DATA.diagnostics[1];
    var bestScore = -1;
    for (var j = 0; j < DATA.diagnostics.length; j++) {
      var d = DATA.diagnostics[j];
      var score = 0;
      var kws = d.keywords || [];
      for (var k = 0; k < kws.length; k++) {
        var kw = String(kws[k]).toLowerCase();
        if (q.indexOf(kw) !== -1) score += kw.indexOf(" ") !== -1 ? 8 : 5;
      }
      var hay = (d.id + " " + d.title[lang] + " " + d.cause[lang]).toLowerCase();
      for (var t = 0; t < tokens.length; t++) {
        if (hay.indexOf(tokens[t]) !== -1) score += 2;
      }
      if (score > bestScore) {
        bestScore = score;
        best = d;
      }
    }
    return { item: best, score: bestScore, exact: false };
  }

  function diagnose(idOrQuery, lang, city, note, opts) {
    lang = normLang(lang);
    city = city || "Biloxi";
    opts = opts || {};
    var matched = matchSymptom(idOrQuery, lang);
    var d = matched.item;
    var effUrgency = d.urgency;
    var isoNotes = [];
    var pickedLabels = [];

    if (d.isolators) {
      var qIds = [opts.q1Id, opts.q2Id];
      for (var qIdx = 0; qIdx < d.isolators.length; qIdx++) {
        var iso = d.isolators[qIdx];
        var selId = qIds[qIdx] || iso.options[0].id;
        for (var oIdx = 0; oIdx < iso.options.length; oIdx++) {
          var opt = iso.options[oIdx];
          if (opt.id === selId) {
            isoNotes.push(opt.note[lang]);
            pickedLabels.push(opt.label[lang]);
            if (opt.override_urgency && (URGENCY_RANK[opt.override_urgency] || 0) > (URGENCY_RANK[effUrgency] || 0)) {
              effUrgency = opt.override_urgency;
            }
            break;
          }
        }
      }
    }

    var checks = d.checks[lang] || [];
    var checkedCount = 0;
    if (Array.isArray(opts.checkedChecks)) {
      for (var ci = 0; ci < opts.checkedChecks.length; ci++) {
        if (opts.checkedChecks[ci]) checkedCount++;
      }
    }
    var totalChecks = checks.length;
    var baseSave = typeof d.diy_save_pct === "number" ? d.diy_save_pct : 0;
    var diySavePct = baseSave;
    if (totalChecks > 0 && checkedCount > 0) {
      var ratioLeft = Math.max(0, (totalChecks - checkedCount) / totalChecks);
      diySavePct = Math.round(baseSave * ratioLeft);
    }
    var allChecked = totalChecks > 0 && checkedCount >= totalChecks;

    var urgLabel = effUrgency === "EMERGENCY"
      ? (lang === "es" ? "EMERGENCIA · LLAMAR YA" : (lang === "vi" ? "KHẨN CẤP · GỌI NGAY" : "EMERGENCY · CALL NOW"))
      : d.urgency_label[lang];

    var prefix = lang === "es"
      ? "Hola Devin, en " + city + " — "
      : (lang === "vi" ? "Chào Devin, ở " + city + " — " : "Hi Devin, in " + city + " — ");
    var smsParts = [prefix + d.title[lang] + " [" + effUrgency + "]"];
    if (pickedLabels.length) smsParts.push("Isolator: " + pickedLabels.join(" + "));
    if (allChecked) smsParts.push("Pre-arrival checks logged (" + checkedCount + "/" + totalChecks + ")");
    if (note) smsParts.push("Note: " + note);
    var smsBody = smsParts.join(" | ");

    return {
      matchedId: d.id,
      matchScore: matched.score,
      urgency: effUrgency,
      urgencyLabel: urgLabel,
      title: d.title[lang],
      cause: d.cause[lang],
      isolators: d.isolators || [],
      isolatorNotes: isoNotes,
      isolatorSummary: pickedLabels,
      freeChecks: checks,
      checkedCount: checkedCount,
      allChecksDone: allChecked,
      diySavePct: diySavePct,
      recommendedUrl: "https://228mooreelectric.com" + d.route[lang],
      routePath: d.route[lang],
      routeLabel: d.route_label[lang],
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
    var estMinutes = 0;
    for (var j = 0; j < DATA.bundles.length; j++) {
      if (set[DATA.bundles[j].id]) {
        estMinutes += DATA.bundles[j].est_min || 45;
        picked.push({
          id: DATA.bundles[j].id,
          name: DATA.bundles[j].name[lang],
          route: DATA.bundles[j].route,
          estMin: DATA.bundles[j].est_min || 45
        });
      }
    }
    var hrs = estMinutes > 0 ? (Math.max(1, Math.round((estMinutes / 60) * 2) / 2)) : 0;
    var names = picked.map(function (p) { return p.name; });
    var prefix = lang === "es"
      ? "Hola Devin, lista de una visita en " + city + ": "
      : (lang === "vi" ? "Chào Devin, gộp danh sách làm ở " + city + ": " : "Hi Devin, 1-visit punch list in " + city + ": ");
    var smsBody = prefix + (names.length ? names.join("; ") : "General quote") + (note ? " | Note: " + note : "");
    return {
      count: picked.length,
      selectedIds: picked.map(function (p) { return p.id; }),
      items: picked,
      estMinutes: estMinutes,
      estWindowHours: hrs,
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
      clientJsApi: "window.MooreElectricAI.diagnose(idOrQuery, lang, city, note, opts)"
    };
  }

  var MooreElectricAI = {
    version: "1.1.0",
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
      query: "",
      diagId: DATA.diagnostics[1].id,
      q1Id: DATA.diagnostics[1].isolators[0].options[0].id,
      q2Id: DATA.diagnostics[1].isolators[1].options[0].id,
      checked: [],
      city: "Biloxi",
      note: "",
      picked: ["gfci-swap", "panel-audit"],
      agentQuery: t.presets[0]
    };

    function setActiveDiag(id) {
      state.diagId = id;
      for (var i = 0; i < DATA.diagnostics.length; i++) {
        if (DATA.diagnostics[i].id === id) {
          var d = DATA.diagnostics[i];
          state.q1Id = d.isolators[0].options[0].id;
          state.q2Id = d.isolators[1].options[0].id;
          state.checked = [];
          break;
        }
      }
    }

    function badgeClass(u) {
      return u === "EMERGENCY" ? "emg" : (u === "PRIORITY" ? "pri" : "std");
    }

    function buildShellOnce() {
      var cityOpts = "";
      for (var c = 0; c < DATA.cities.length; c++) {
        var cname = DATA.cities[c];
        cityOpts += '<option value="' + escHtml(cname) + '"' + (cname === state.city ? " selected" : "") + ">" + escHtml(cname) + ", MS</option>";
      }

      var tabsHtml = '<div class="triage-tabs" role="tablist">';
      for (var i = 0; i < t.tabs.length; i++) {
        var tb = t.tabs[i];
        tabsHtml += '<button type="button" class="triage-tab' + (i === 0 ? " on" : "") + '" data-tab="' + tb[0] + '" role="tab" aria-selected="' + (i === 0) + '">' + escHtml(tb[1]) + "</button>";
      }
      tabsHtml += "</div>";

      var pillsHtml = "";
      for (var k = 0; k < DATA.diagnostics.length; k++) {
        var d = DATA.diagnostics[k];
        pillsHtml += '<button type="button" class="triage-pill" data-diag="' + d.id + '">' +
          '<span class="triage-dot ' + badgeClass(d.urgency) + '"></span>' +
          "<span>" + escHtml(d.title[lang]) + "</span></button>";
      }

      var bundleRows = "";
      for (var b = 0; b < DATA.bundles.length; b++) {
        var item = DATA.bundles[b];
        var isPicked = state.picked.indexOf(item.id) !== -1;
        bundleRows += '<label class="load-row"><input type="checkbox" data-bundle="' + item.id + '"' + (isPicked ? " checked" : "") + "> " +
          escHtml(item.name[lang]) + '<span class="la">~' + (item.est_min || 45) + " min</span></label>";
      }

      var presetBtns = "";
      for (var p = 0; p < t.presets.length; p++) {
        presetBtns += '<button type="button" class="chip' + (p === 0 ? " active" : "") + '" data-preset="' + escHtml(t.presets[p]) + '">' + escHtml(t.presets[p]) + "</button>";
      }

      el.innerHTML =
        '<div class="triage-shell">' +
          tabsHtml +
          '<div data-view="triage">' +
            '<div class="triage-search">' +
              '<label class="triage-lbl" for="tr-q-' + lang + '">' + escHtml(t.searchLabel) + "</label>" +
              '<div class="triage-search-row">' +
                '<input id="tr-q-' + lang + '" type="search" data-nl-search value="" placeholder="' + escHtml(t.searchPh) + '" autocomplete="off">' +
                '<span class="triage-match-tag" data-match-tag></span>' +
              "</div>" +
            "</div>" +
            '<div class="triage-grid">' +
              '<div class="triage-left">' +
                '<p class="triage-lbl">' + escHtml(t.pickSymptom) + "</p>" +
                '<div class="triage-pills">' + pillsHtml + "</div>" +
                '<div class="triage-fields">' +
                  '<div class="field"><label for="tr-city-' + lang + '">' + escHtml(t.cityLabel) + '</label><select id="tr-city-' + lang + '" data-city>' + cityOpts + "</select></div>" +
                  '<div class="field"><label for="tr-note-' + lang + '">' + escHtml(t.noteLabel) + '</label><input id="tr-note-' + lang + '" type="text" data-note placeholder="' + escHtml(t.notePh) + '"></div>' +
                "</div>" +
              "</div>" +
              '<div class="triage-out calc-card" data-triage-out aria-live="polite"></div>' +
            "</div>" +
          "</div>" +
          '<div data-view="bundle" hidden>' +
            '<div class="triage-grid">' +
              '<div class="triage-left">' +
                '<p class="triage-lbl">' + escHtml(t.bundleIntro) + "</p>" +
                '<div class="load-list">' + bundleRows + "</div>" +
                '<div class="triage-fields">' +
                  '<div class="field"><label for="bu-city-' + lang + '">' + escHtml(t.cityLabel) + '</label><select id="bu-city-' + lang + '" data-city>' + cityOpts + "</select></div>" +
                  '<div class="field"><label for="bu-note-' + lang + '">' + escHtml(t.noteLabel) + '</label><input id="bu-note-' + lang + '" type="text" data-note placeholder="' + escHtml(t.notePh) + '"></div>' +
                "</div>" +
              "</div>" +
              '<div class="triage-out calc-card" data-bundle-out aria-live="polite"></div>' +
            "</div>" +
          "</div>" +
          '<div data-view="agent" hidden>' +
            '<div class="triage-agent">' +
              '<p class="triage-lbl">' + escHtml(t.agentIntro) + "</p>" +
              '<div class="chips" data-agent-presets>' + presetBtns + "</div>" +
              '<div class="triage-search-row" style="margin-bottom:16px">' +
                '<input type="search" data-agent-query value="' + escHtml(state.agentQuery) + '">' +
                '<button type="button" class="btn btn-volt btn-sm" data-run-agent>' + escHtml(t.runBtn) + "</button>" +
              "</div>" +
              '<pre class="triage-code" data-agent-code></pre>' +
              '<div class="triage-actions" style="margin-bottom:18px">' +
                '<button type="button" class="btn btn-volt btn-sm" data-copy-json>' + escHtml(t.copyBtn) + "</button>" +
                '<a class="btn btn-ghost btn-sm" href="/openapi.json" target="_blank" rel="noopener">OpenAPI 3.1 Spec →</a>' +
              "</div>" +
              '<div class="share-row" style="margin-top:0">' +
                '<span class="share-label" style="align-self:center">' + escHtml(t.linksTitle) + "</span>" +
                '<a class="share-btn" href="/api/triage.json" target="_blank" rel="noopener">/api/triage.json</a>' +
                '<a class="share-btn" href="/openapi.json" target="_blank" rel="noopener">/openapi.json</a>' +
                '<a class="share-btn" href="/.well-known/ai-plugin.json" target="_blank" rel="noopener">ai-plugin.json</a>' +
                '<a class="share-btn" href="/.well-known/ai-entity.json" target="_blank" rel="noopener">ai-entity.json</a>' +
                '<a class="share-btn" href="/llms.txt" target="_blank" rel="noopener">/llms.txt</a>' +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>";
    }

    function updateDynamicPanels() {
      var tabBtns = el.querySelectorAll("[data-tab]");
      for (var ti = 0; ti < tabBtns.length; ti++) {
        var on = tabBtns[ti].getAttribute("data-tab") === state.tab;
        tabBtns[ti].classList.toggle("on", on);
        tabBtns[ti].setAttribute("aria-selected", on ? "true" : "false");
      }
      var views = el.querySelectorAll("[data-view]");
      for (var vi = 0; vi < views.length; vi++) {
        views[vi].hidden = views[vi].getAttribute("data-view") !== state.tab;
      }

      var pillBtns = el.querySelectorAll("[data-diag]");
      for (var pi = 0; pi < pillBtns.length; pi++) {
        pillBtns[pi].classList.toggle("on", pillBtns[pi].getAttribute("data-diag") === state.diagId);
      }

      var res = diagnose(state.diagId, lang, state.city, state.note, {
        q1Id: state.q1Id,
        q2Id: state.q2Id,
        checkedChecks: state.checked
      });

      var tagEl = el.querySelector("[data-match-tag]");
      if (tagEl) {
        tagEl.textContent = state.query.trim() ? (t.matchPrefix + " " + res.matchedId.toUpperCase()) : "";
      }

      var isoHtml = '<div class="triage-iso"><p class="triage-lbl">' + escHtml(t.isoHeading) + "</p>";
      for (var qi = 0; qi < res.isolators.length; qi++) {
        var iso = res.isolators[qi];
        var selVal = qi === 0 ? state.q1Id : state.q2Id;
        isoHtml += '<div class="triage-iso-q"><span>' + escHtml(iso.q[lang]) + '</span><div class="chips">';
        for (var oi = 0; oi < iso.options.length; oi++) {
          var opt = iso.options[oi];
          isoHtml += '<button type="button" class="chip' + (opt.id === selVal ? " active" : "") + '" data-iso-idx="' + qi + '" data-iso-id="' + opt.id + '">' + escHtml(opt.label[lang]) + "</button>";
        }
        isoHtml += "</div></div>";
      }
      if (res.isolatorNotes.length) {
        isoHtml += '<p class="triage-iso-note">' + escHtml(res.isolatorNotes.join(" ")) + "</p>";
      }
      isoHtml += "</div>";

      var checksHtml = '<div class="triage-checks-wrap"><p class="triage-lbl">' + escHtml(t.diyHeading) + '</p><div class="load-list">';
      for (var ci = 0; ci < res.freeChecks.length; ci++) {
        var isChk = !!state.checked[ci];
        checksHtml += '<label class="load-row"><input type="checkbox" data-diy-idx="' + ci + '"' + (isChk ? " checked" : "") + "><span>" + escHtml(res.freeChecks[ci]) + "</span></label>";
      }
      checksHtml += "</div></div>";

      var verdictClass = "warn";
      var vTitle = t.verdictCheckTitle;
      var vBody = t.verdictCheckBody;
      if (res.urgency === "EMERGENCY") {
        verdictClass = "warn";
        vTitle = t.verdictEmergencyTitle;
        vBody = t.emergencyNote;
      } else if (res.allChecksDone) {
        verdictClass = "ok";
        vTitle = t.verdictDoneTitle;
        vBody = t.verdictDoneBody;
      }

      var primaryBtnCls = res.urgency === "EMERGENCY" ? "btn btn-red" : "btn btn-volt";
      var triageOut = el.querySelector("[data-triage-out]");
      triageOut.innerHTML =
        '<span class="triage-badge ' + badgeClass(res.urgency) + '">' + escHtml(res.urgencyLabel) + "</span>" +
        '<h3 style="margin:12px 0 8px">' + escHtml(res.title) + "</h3>" +
        '<p class="triage-cause"><b>' + escHtml(t.causeLabel) + "</b> " + escHtml(res.cause) + "</p>" +
        '<div class="calc-results">' +
          '<div class="stat"><b>' + escHtml(res.urgency) + "</b><span>" + escHtml(t.statUrgency) + "</span></div>" +
          '<div class="stat"><b>' + res.diySavePct + '%</b><span>' + escHtml(t.statDiy) + "</span></div>" +
          '<div class="stat"><b>$75</b><span>' + escHtml(t.statVisit) + "</span></div>" +
        "</div>" +
        isoHtml +
        checksHtml +
        '<div class="verdict ' + verdictClass + '" style="margin-top:14px"><h3>' + escHtml(vTitle) + "</h3><p>" + escHtml(vBody) + "</p></div>" +
        '<div class="calc-cta">' +
          '<a class="' + primaryBtnCls + '" href="' + escHtml(res.smsHref) + '">' + escHtml(t.smsBtn) + "</a>" +
          '<a class="btn btn-ghost" href="tel:+12282249150">' + escHtml(t.callBtn) + "</a>" +
          '<a class="btn btn-ghost btn-sm" href="' + escHtml(res.routePath) + '">' + escHtml(res.routeLabel) + " →</a>" +
        "</div>";

      var bun = bundleJobs(state.picked, lang, state.city, state.note);
      var bundleOut = el.querySelector("[data-bundle-out]");
      var pickedList = "";
      for (var bi = 0; bi < bun.items.length; bi++) {
        pickedList += '<li><span>✓ ' + escHtml(bun.items[bi].name) + '</span><a href="' + escHtml(bun.items[bi].route) + '">Details →</a></li>';
      }
      bundleOut.innerHTML =
        '<div class="calc-results" style="margin-top:0;padding-top:0;border-top:0">' +
          '<div class="stat"><b>' + bun.count + "</b><span>" + escHtml(t.statJobs) + "</span></div>" +
          '<div class="stat"><b>' + (bun.estWindowHours ? "~" + bun.estWindowHours + "h" : "0h") + "</b><span>" + escHtml(t.statWindow) + "</span></div>" +
          '<div class="stat"><b>1× $75</b><span>' + escHtml(t.statTrip) + "</span></div>" +
        "</div>" +
        '<div class="verdict ' + (bun.count ? "ok" : "warn") + '" style="margin-top:18px">' +
          "<h3>" + escHtml(bun.count ? t.bundleVerdictReady : t.bundleVerdictEmpty) + "</h3>" +
          "<p>" + escHtml(t.priceRule) + "</p>" +
        "</div>" +
        (pickedList ? '<ul class="triage-picked" style="margin-top:14px">' + pickedList + "</ul>" : "") +
        '<div class="calc-cta">' +
          '<a class="btn btn-volt" href="' + escHtml(bun.smsHref) + '">' + escHtml(t.bundleBtn) + "</a>" +
          '<a class="btn btn-ghost" href="tel:+12282249150">' + escHtml(t.callBtn) + "</a>" +
        "</div>";

      var agentOut = el.querySelector("[data-agent-code]");
      if (agentOut) {
        var agentRes = diagnose(state.agentQuery, lang, state.city, state.note);
        agentOut.textContent = JSON.stringify({
          query: state.agentQuery,
          diagnosis: agentRes,
          manifest: getManifest()
        }, null, 2);
      }
    }

    buildShellOnce();
    updateDynamicPanels();

    el.addEventListener("click", function (ev) {
      var tabBtn = ev.target.closest("[data-tab]");
      if (tabBtn) {
        state.tab = tabBtn.getAttribute("data-tab");
        updateDynamicPanels();
        return;
      }
      var diagBtn = ev.target.closest("[data-diag]");
      if (diagBtn) {
        state.query = "";
        var searchIn = el.querySelector("[data-nl-search]");
        if (searchIn) searchIn.value = "";
        setActiveDiag(diagBtn.getAttribute("data-diag"));
        updateDynamicPanels();
        return;
      }
      var isoBtn = ev.target.closest("[data-iso-idx]");
      if (isoBtn) {
        var idx = isoBtn.getAttribute("data-iso-idx");
        var val = isoBtn.getAttribute("data-iso-id");
        if (idx === "0") state.q1Id = val;
        else state.q2Id = val;
        updateDynamicPanels();
        return;
      }
      var preBtn = ev.target.closest("[data-preset]");
      if (preBtn) {
        var pq = preBtn.getAttribute("data-preset");
        state.agentQuery = pq;
        var aq = el.querySelector("[data-agent-query]");
        if (aq) aq.value = pq;
        var chips = el.querySelectorAll("[data-preset]");
        for (var ci = 0; ci < chips.length; ci++) chips[ci].classList.toggle("active", chips[ci] === preBtn);
        updateDynamicPanels();
        return;
      }
      if (ev.target.closest("[data-run-agent]")) {
        var aqIn = el.querySelector("[data-agent-query]");
        if (aqIn) state.agentQuery = aqIn.value;
        updateDynamicPanels();
        return;
      }
      var copyBtn = ev.target.closest("[data-copy-json]");
      if (copyBtn) {
        var pre = el.querySelector("[data-agent-code]");
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
        var selects = el.querySelectorAll("[data-city]");
        for (var i = 0; i < selects.length; i++) selects[i].value = state.city;
        updateDynamicPanels();
      } else if (ev.target.matches("[data-diy-idx]")) {
        var ci = parseInt(ev.target.getAttribute("data-diy-idx"), 10);
        state.checked[ci] = !!ev.target.checked;
        updateDynamicPanels();
      } else if (ev.target.matches("[data-bundle]")) {
        var bid = ev.target.getAttribute("data-bundle");
        var pos = state.picked.indexOf(bid);
        if (ev.target.checked && pos === -1) state.picked.push(bid);
        else if (!ev.target.checked && pos !== -1) state.picked.splice(pos, 1);
        updateDynamicPanels();
      }
    });

    el.addEventListener("input", function (ev) {
      if (ev.target.matches("[data-nl-search]")) {
        state.query = ev.target.value;
        if (state.query.trim()) {
          var m = matchSymptom(state.query, lang);
          if (m.item.id !== state.diagId) {
            setActiveDiag(m.item.id);
          }
        }
        updateDynamicPanels();
      } else if (ev.target.matches("[data-note]")) {
        state.note = ev.target.value;
        var notes = el.querySelectorAll("[data-note]");
        for (var i = 0; i < notes.length; i++) {
          if (notes[i] !== ev.target) notes[i].value = state.note;
        }
        updateDynamicPanels();
      } else if (ev.target.matches("[data-agent-query]")) {
        state.agentQuery = ev.target.value;
      }
    });
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
