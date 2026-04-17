/**
 * Adds FAQ + bundle (комплектация) fields to existing products in Firestore.
 * Run: node scripts/seed-faq-bundle.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0FdE-DuHsH72z1STiZ4c_GY-8VW1fKBQ",
  authDomain: "maulsharif-landing.firebaseapp.com",
  projectId: "maulsharif-landing",
  storageBucket: "maulsharif-landing.appspot.com",
  messagingSenderId: "770624671558",
  appId: "1:770624671558:web:aee3ac29fb9b0491e3c1e5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ──────────────────────────────────────────────────────────────────────────────
// Data: slug → { faq, bundle }
// ──────────────────────────────────────────────────────────────────────────────
const updates = {
  /* ─── Diagnostics ─── */
  "nihon-kohden-ecg-1550": {
    bundle: {
      ru: ["ЭКГ аппарат Nihon Kohden ECG-1550", "10 электродов для конечностей и грудных отведений", "Термобумага 50 рулонов", "Кабель пациента", "Руководство пользователя (рус/каз)", "Гарантийный талон 2 года"],
      en: ["Nihon Kohden ECG-1550 device", "10 limb and chest lead electrodes", "50 rolls of thermal paper", "Patient cable", "User manual (RU/KZ)", "2-year warranty card"],
      kz: ["Nihon Kohden ECG-1550 аппараты", "10 электрод", "Жылулық қағаз 50 орам", "Пациент кабелі", "Пайдаланушы нұсқаулығы", "2 жылдық кепілдік"],
    },
    faq: [
      {
        q: { ru: "Подходит ли аппарат для холтеровского мониторирования?", en: "Does it support Holter monitoring?", kz: "Аппарат холтерлік мониторлауға жарамды ма?" },
        a: { ru: "ECG-1550 — стационарный ЭКГ-аппарат, предназначенный для снятия плёнки. Для суточного мониторирования Nihon Kohden предлагает серию Cardiofax Holter.", en: "ECG-1550 is a resting ECG device. For 24-hour monitoring, Nihon Kohden offers the Cardiofax Holter series.", kz: "ECG-1550 — тыныштық күйіндегі ЭКГ аппараты. Тәуліктік мониторлауға Cardiofax Holter сериясы ұсынылады." },
      },
      {
        q: { ru: "Можно ли распечатать результат сразу?", en: "Can results be printed immediately?", kz: "Нәтижені бірден басып шығаруға болады ма?" },
        a: { ru: "Да, встроенный термопринтер позволяет распечатать ЭКГ непосредственно после записи, а также экспортировать данные по USB.", en: "Yes, the built-in thermal printer allows immediate ECG printout. Data can also be exported via USB.", kz: "Иә, кірістірілген термопринтер ЭКГ-ны бірден басып шығарады. Деректерді USB арқылы экспорттауға болады." },
      },
      {
        q: { ru: "Предоставляется ли обучение персонала?", en: "Is staff training provided?", kz: "Персоналға оқыту ұсынылады ма?" },
        a: { ru: "Да, при поставке SUNCAR проводит бесплатный инструктаж медицинского персонала на базе нашего учебного центра в Алматы.", en: "Yes, SUNCAR provides free on-site staff training upon delivery.", kz: "Иә, жеткізу кезінде SUNCAR Алматы оқу орталығында тегін нұсқаулық өткізеді." },
      },
    ],
  },

  /* ─── MRI ─── */
  "siemens-magnetom-altea": {
    bundle: {
      ru: ["МРТ система Siemens MAGNETOM Altea", "Головная катушка Tim+Dot", "Катушка для позвоночника 32-канальная", "Периферийная катушка (тело)", "Система управления пациентом", "Охлаждающая установка (чиллер)", "UPS 40 кВА", "Комплект монтажных материалов", "Техническая документация", "Обучение персонала (7 дней)"],
      en: ["Siemens MAGNETOM Altea MRI system", "Tim+Dot Head coil", "32-channel spine coil", "Body coil", "Patient monitoring system", "Chiller cooling unit", "40 kVA UPS", "Installation kit", "Technical documentation", "Staff training (7 days)"],
      kz: ["Siemens MAGNETOM Altea МРТ жүйесі", "Бас катушкасы Tim+Dot", "32 арналы омыртқа катушкасы", "Дене катушкасы", "Пациентті бақылау жүйесі", "Суыту қондырғысы", "40 кВА UPS", "Монтаж жинағы", "Техникалық құжаттама", "Персоналды оқыту (7 күн)"],
    },
    faq: [
      {
        q: { ru: "Каков минимальный размер помещения для установки?", en: "What is the minimum room size for installation?", kz: "Орнату үшін минималды бөлме өлшемі қандай?" },
        a: { ru: "Для MAGNETOM Altea требуется помещение не менее 50 м² с высотой потолка от 3 м. Необходима RF-экранировка и подводка электропитания 63 А, 3-фазное.", en: "MAGNETOM Altea requires a room of at least 50 m² with ceiling height from 3 m. RF shielding and 63A 3-phase power supply are required.", kz: "MAGNETOM Altea 50 м² бөлме, 3 м төбе биіктігі, RF экрандау және 63А 3 фазалы қуат талап етеді." },
      },
      {
        q: { ru: "Поддерживает ли аппарат расширенные MR-спектроскопию?", en: "Does it support advanced MR spectroscopy?", kz: "Кеңейтілген МР-спектроскопияны қолдайды ма?" },
        a: { ru: "Да, MAGNETOM Altea поддерживает 1H и 31P спектроскопию, а также диффузионно-тензорную визуализацию (DTI) при установке соответствующего ПО.", en: "Yes, MAGNETOM Altea supports 1H and 31P spectroscopy and DTI with optional software packages.", kz: "Иә, MAGNETOM Altea 1H және 31P спектроскопиясын және DTI бейнелеуді қолдайды." },
      },
      {
        q: { ru: "Какова гарантия на систему?", en: "What is the warranty?", kz: "Жүйеге кепілдік қандай?" },
        a: { ru: "Гарантийный срок — 24 месяца с момента ввода в эксплуатацию. SUNCAR обеспечивает приоритетный выезд инженера в течение 24 часов.", en: "Warranty period is 24 months from commissioning. SUNCAR provides priority engineer dispatch within 24 hours.", kz: "Кепілдік мерзімі — пайдалануға берілгеннен бастап 24 ай. SUNCAR 24 сағат ішінде инженер жібереді." },
      },
    ],
  },

  /* ─── CT ─── */
  "siemens-somatom-go-top": {
    bundle: {
      ru: ["КТ система Siemens SOMATOM go.Top", "Стол пациента", "Инжектор контрастного вещества (опция)", "Рабочая станция syngo.via", "UPS 80 кВА", "Высоковольтный кабельный комплект", "Детектор Stellar Infinity", "Охлаждающая установка", "Монтажный комплект", "Обучение персонала (5 дней)"],
      en: ["Siemens SOMATOM go.Top CT system", "Patient table", "Contrast injector (optional)", "syngo.via workstation", "80 kVA UPS", "High-voltage cable kit", "Stellar Infinity detector", "Cooling unit", "Installation kit", "Staff training (5 days)"],
      kz: ["Siemens SOMATOM go.Top КТ жүйесі", "Пациент үстелі", "Контраст инжекторы (опция)", "syngo.via жұмыс станциясы", "80 кВА UPS", "Жоғары вольтты кабель жинағы", "Stellar Infinity детекторы", "Суыту қондырғысы", "Монтаж жинағы", "Персоналды оқыту (5 күн)"],
    },
    faq: [
      {
        q: { ru: "Какова доза облучения пациента по сравнению с обычным КТ?", en: "How does patient radiation dose compare to conventional CT?", kz: "Пациентке сәуле дозасы қалыпты КТ-мен салыстырғанда қандай?" },
        a: { ru: "SOMATOM go.Top использует технологию CARE Dose4D, которая автоматически снижает дозу до 60% по сравнению с фиксированными параметрами без потери диагностического качества.", en: "SOMATOM go.Top uses CARE Dose4D technology, automatically reducing dose by up to 60% without compromising diagnostic quality.", kz: "SOMATOM go.Top CARE Dose4D технологиясын пайдаланып дозаны 60%-ке дейін автоматты азайтады." },
      },
      {
        q: { ru: "Возможна ли кардиосинхронизация?", en: "Is cardiac gating possible?", kz: "Жүрек синхронизациясы мүмкін бе?" },
        a: { ru: "Да, опциональный пакет Cardiac CT обеспечивает проспективную и ретроспективную кардиосинхронизацию с реконструкцией коронарных артерий.", en: "Yes, the optional Cardiac CT package enables prospective and retrospective gating for coronary artery imaging.", kz: "Иә, Cardiac CT пакеті коронарлы артерияларды бейнелеу мүмкіндігін береді." },
      },
    ],
  },

  /* ─── Ultrasound ─── */
  "mindray-dc-80": {
    bundle: {
      ru: ["УЗИ система Mindray DC-80", "Линейный датчик L14-6WU", "Конвексный датчик C5-2", "Кардиологический датчик P4-2E", "Принтер SONY A6B (опция)", "Тележка с системой хранения", "Дополнительный монитор 23\"", "UPS", "Гель ультразвуковой 5 л"],
      en: ["Mindray DC-80 ultrasound system", "L14-6WU linear transducer", "C5-2 convex transducer", "P4-2E cardiac transducer", "SONY A6B printer (optional)", "Trolley with storage", "23\" secondary monitor", "UPS", "5L ultrasound gel"],
      kz: ["Mindray DC-80 УДЗ жүйесі", "L14-6WU сызықты датчик", "C5-2 конвекстік датчик", "P4-2E жүрек датчигі", "SONY A6B принтері (опция)", "Сақтау жүйесі бар арба", "23\" қосымша монитор", "UPS", "УДЗ гелі 5 л"],
    },
    faq: [
      {
        q: { ru: "Поддерживает ли DC-80 эластографию?", en: "Does DC-80 support elastography?", kz: "DC-80 эластографияны қолдайды ма?" },
        a: { ru: "Да, Mindray DC-80 поддерживает компрессионную эластографию и ARFI (акустическую радиационно-импульсную) эластографию для оценки жёсткости тканей.", en: "Yes, DC-80 supports compression elastography and ARFI elastography for tissue stiffness assessment.", kz: "Иә, DC-80 компрессиялық және ARFI эластографиясын қолдайды." },
      },
      {
        q: { ru: "Есть ли возможность 3D/4D визуализации?", en: "Is 3D/4D imaging available?", kz: "3D/4D бейнелеу мүмкіндігі бар ма?" },
        a: { ru: "Да, при подключении объёмного датчика V11-3WU система поддерживает режимы 3D/4D, включая iLive для акушерства.", en: "Yes, with the V11-3WU volumetric transducer the system supports 3D/4D modes including iLive for obstetrics.", kz: "Иә, V11-3WU датчигімен 3D/4D, акушерия үшін iLive режимдерін қолдайды." },
      },
      {
        q: { ru: "Как долго длится поставка?", en: "How long does delivery take?", kz: "Жеткізу қанша уақытқа созылады?" },
        a: { ru: "Стандартный срок поставки от склада в Алматы — 10–15 рабочих дней. Монтаж и ввод в эксплуатацию занимают 1–2 дня.", en: "Standard delivery from Almaty warehouse is 10–15 business days. Installation and commissioning take 1–2 days.", kz: "Алматы қоймасынан стандартты жеткізу — 10–15 жұмыс күні. Монтаж 1–2 күн." },
      },
    ],
  },

  /* ─── X-Ray ─── */
  "philips-digitaldiagnost-c90": {
    bundle: {
      ru: ["Рентгеновский аппарат Philips DigitalDiagnost C90", "Детектор 43×43 см (беспроводной)", "Детектор 35×43 см", "Стойка стоя (Bucky)", "Горизонтальный стол пациента", "Генератор 65 кВт", "Рабочая станция IntelliSpace DR System", "UPS 20 кВА", "Свинцовые средства защиты (4 комплекта)"],
      en: ["Philips DigitalDiagnost C90 X-ray system", "43×43 cm wireless detector", "35×43 cm detector", "Upright Bucky stand", "Horizontal patient table", "65 kW generator", "IntelliSpace DR System workstation", "20 kVA UPS", "Lead protection kit (4 sets)"],
      kz: ["Philips DigitalDiagnost C90 рентген аппараты", "43×43 см сымсыз детектор", "35×43 см детектор", "Тік Bucky стенді", "Горизонталды пациент үстелі", "65 кВт генератор", "IntelliSpace DR жұмыс станциясы", "20 кВА UPS", "Қорғаныс жинағы (4 жиын)"],
    },
    faq: [
      {
        q: { ru: "Совместима ли система с уже имеющимся PACS?", en: "Is the system compatible with existing PACS?", kz: "Жүйе бар PACS-пен үйлесімді ме?" },
        a: { ru: "Да, DigitalDiagnost C90 поддерживает стандарт DICOM 3.0, что обеспечивает интеграцию с любой PACS/RIS системой.", en: "Yes, DigitalDiagnost C90 supports DICOM 3.0, enabling integration with any PACS/RIS system.", kz: "Иә, DigitalDiagnost C90 DICOM 3.0 стандартын қолдайды, кез келген PACS/RIS жүйесімен интеграция мүмкін." },
      },
      {
        q: { ru: "Можно ли делать педиатрические снимки?", en: "Can it be used for paediatric imaging?", kz: "Педиатриялық суреттер жасауға болады ма?" },
        a: { ru: "Да, система оснащена специальными педиатрическими протоколами с оптимизацией дозы UNIQUE и возможностью использования мягких тканевых алгоритмов.", en: "Yes, the system features paediatric protocols with UNIQUE dose optimization and soft-tissue imaging algorithms.", kz: "Иә, жүйеде педиатриялық протоколдар, UNIQUE дозаны оңтайландыру бар." },
      },
    ],
  },

  /* ─── Cardiology ─── */
  "schiller-cardiovit-at-102": {
    bundle: {
      ru: ["ЭКГ аппарат Schiller CARDIOVIT AT-102", "10 мультиразовых электродов", "Термобумага A4 100 листов", "Кабель ЭКГ 10-отводный", "Педиатрические электроды (опция)", "Чехол для транспортировки", "Руководство пользователя (рус/каз)"],
      en: ["Schiller CARDIOVIT AT-102 ECG device", "10 reusable electrodes", "100 sheets A4 thermal paper", "10-lead ECG cable", "Paediatric electrodes (optional)", "Carry case", "User manual (RU/KZ)"],
      kz: ["Schiller CARDIOVIT AT-102 ЭКГ аппараты", "10 қайта пайдаланылатын электрод", "A4 жылулық қағаз 100 парақ", "10 отводты ЭКГ кабелі", "Педиатриялық электродтар (опция)", "Тасымалдау сөмкесі", "Пайдаланушы нұсқаулығы"],
    },
    faq: [
      {
        q: { ru: "Поддерживается ли передача данных по Wi-Fi?", en: "Is Wi-Fi data transfer supported?", kz: "Wi-Fi арқылы деректер жіберу мүмкін бе?" },
        a: { ru: "Да, CARDIOVIT AT-102 опционально поддерживает Wi-Fi и LAN для передачи ЭКГ на рабочую станцию или в МИС.", en: "Yes, CARDIOVIT AT-102 optionally supports Wi-Fi and LAN for ECG transfer to a workstation or HIS.", kz: "Иә, CARDIOVIT AT-102 Wi-Fi және LAN арқылы ЭКГ жіберуді қолдайды." },
      },
      {
        q: { ru: "Работает ли аппарат от батареи?", en: "Does it operate on battery?", kz: "Аппарат батареядан жұмыс істей ме?" },
        a: { ru: "Да, встроенный Li-Ion аккумулятор обеспечивает до 200 записей ЭКГ без подключения к сети.", en: "Yes, the built-in Li-Ion battery supports up to 200 ECG recordings without mains power.", kz: "Иә, кірістірілген Li-Ion аккумулятор желісіз 200 ЭКГ жазуды қамтамасыз етеді." },
      },
    ],
  },

  /* ─── Physio ─── */
  "btl-4000-smart": {
    bundle: {
      ru: ["Физиотерапевтический аппарат BTL-4000 Smart", "Терапевтические электроды 4 шт.", "Набор соединительных кабелей", "Вакуумные электроды (опция)", "Поворотный кронштейн для крепления", "Руководство пользователя (рус/каз)", "Гарантия 2 года"],
      en: ["BTL-4000 Smart physiotherapy device", "4 therapeutic electrodes", "Connecting cable set", "Vacuum electrodes (optional)", "Swivel mounting bracket", "User manual (RU/KZ)", "2-year warranty"],
      kz: ["BTL-4000 Smart физиотерапия аппараты", "4 терапиялық электрод", "Қосылыс кабелі жинағы", "Вакуумды электродтар (опция)", "Бұрылмалы кронштейн", "Пайдаланушы нұсқаулығы", "2 жылдық кепілдік"],
    },
    faq: [
      {
        q: { ru: "Какие методы воздействия поддерживает BTL-4000 Smart?", en: "What treatment modalities does BTL-4000 Smart support?", kz: "BTL-4000 Smart қандай емдеу тәсілдерін қолдайды?" },
        a: { ru: "Аппарат поддерживает: TENS, микротоковую терапию, интерференционные токи (IFC), русские токи и диадинамические токи (DDT).", en: "The device supports TENS, microcurrent therapy, interferential currents (IFC), Russian currents, and diadynamic currents (DDT).", kz: "Аппарат TENS, микроток терапиясы, интерференциялық токтар, орыс токтары және диадинамикалық токтарды қолдайды." },
      },
      {
        q: { ru: "Есть ли готовые лечебные программы?", en: "Are there preset treatment programs?", kz: "Дайын емдеу бағдарламалары бар ма?" },
        a: { ru: "Да, в памяти аппарата хранится более 200 предустановленных клинических программ, а также возможность сохранять до 30 пользовательских протоколов.", en: "Yes, the device has over 200 preset clinical programs and allows saving up to 30 custom protocols.", kz: "Иә, аппаратта 200-ден астам алдын ала орнатылған клиникалық бағдарлама және 30 пайдаланушы протоколы бар." },
      },
    ],
  },

  /* ─── Neurology ─── */
  "neurosoft-neuron-spektr-5": {
    bundle: {
      ru: ["ЭЭГ система Нейрон-Спектр-5", "Шлем с 21 Ag/AgCl электродом", "Усилитель 35-канальный", "Ноутбук с ПО (Windows 11 Pro)", "Гель электродный 200 мл", "Игольчатые электроды (опция)", "Жёсткий кейс для транспортировки"],
      en: ["Neuron-Spektr-5 EEG system", "21-electrode Ag/AgCl cap", "35-channel amplifier", "Laptop with software (Windows 11 Pro)", "200 ml electrode gel", "Needle electrodes (optional)", "Hard transport case"],
      kz: ["Нейрон-Спектр-5 ЭЭГ жүйесі", "21 Ag/AgCl электродты қалпақша", "35 арналы күшейткіш", "Бағдарламалы ноутбук (Windows 11 Pro)", "Электродты гель 200 мл", "Ине электродтар (опция)", "Тасымалдау кейсі"],
    },
    faq: [
      {
        q: { ru: "Какое количество каналов ЭЭГ поддерживает система?", en: "How many EEG channels does the system support?", kz: "Жүйе қанша ЭЭГ арнасын қолдайды?" },
        a: { ru: "Базовая конфигурация — 24 канала ЭЭГ + 8 полиграфических каналов (ЭМГ, ЭОГ, ЭКГ). Расширение до 48 каналов доступно опционально.", en: "Base configuration: 24 EEG channels + 8 polygraph channels (EMG, EOG, ECG). Expansion to 48 channels is available optionally.", kz: "Негізгі конфигурация: 24 ЭЭГ арнасы + 8 полиграфиялық арна. 48 арнаға дейін кеңейту мүмкін." },
      },
      {
        q: { ru: "Подходит ли система для детской нейрофизиологии?", en: "Is the system suitable for paediatric neurophysiology?", kz: "Жүйе педиатриялық нейрофизиологияға жарамды ма?" },
        a: { ru: "Да, Нейрон-Спектр-5 включает педиатрические нормы и специальные алгоритмы анализа, соответствующие возрастным особенностям ЭЭГ.", en: "Yes, Neuron-Spektr-5 includes paediatric norms and dedicated analysis algorithms for age-specific EEG patterns.", kz: "Иә, жүйеде педиатриялық нормалар және жас ерекшеліктеріне арналған алгоритмдер бар." },
      },
    ],
  },

  /* ─── Endoscopy ─── */
  "olympus-evis-x1": {
    bundle: {
      ru: ["Видеосистема Olympus EVIS X1", "Видеогастроскоп GIF-1TQ190", "Видеоколоноскоп CF-HQ190L", "Монитор OEV262H 26\" Full HD", "Рабочая станция CV-1500", "Набор чистящих щёток", "Аспирационный насос", "Инсуффлятор CO₂", "Хирургическая тележка", "Установочный комплект"],
      en: ["Olympus EVIS X1 video system", "GIF-1TQ190 video gastroscope", "CF-HQ190L video colonoscope", "OEV262H 26\" Full HD monitor", "CV-1500 workstation", "Cleaning brush set", "Suction pump", "CO₂ insufflator", "Surgical trolley", "Installation kit"],
      kz: ["Olympus EVIS X1 бейне жүйесі", "GIF-1TQ190 бейне гастроскоп", "CF-HQ190L бейне колоноскоп", "OEV262H 26\" Full HD монитор", "CV-1500 жұмыс станциясы", "Тазалау щёткалары жинағы", "Аспирациялық сорғы", "CO₂ инсуффлятор", "Хирургиялық арба", "Монтаж жинағы"],
    },
    faq: [
      {
        q: { ru: "Поддерживает ли система хромоэндоскопию?", en: "Does the system support chromoendoscopy?", kz: "Жүйе хромоэндоскопияны қолдайды ма?" },
        a: { ru: "Да, EVIS X1 оснащён технологией TXI (Texture and Colour Enhancement Imaging) и NBI для улучшенной визуализации слизистой без красителей.", en: "Yes, EVIS X1 features TXI (Texture and Colour Enhancement Imaging) and NBI for enhanced mucosal visualization without dyes.", kz: "Иә, EVIS X1 TXI (Texture and Colour Enhancement Imaging) және NBI технологиялармен жабдықталған." },
      },
      {
        q: { ru: "Нужна ли специальная дезинфекционная машина?", en: "Is a special disinfection machine required?", kz: "Арнайы дезинфекциялық машина керек пе?" },
        a: { ru: "Olympus рекомендует мойку-дезинфектор ETD серии (или аналог). SUNCAR предлагает полный пакет «эндоскопический кабинет» включая ETD54.", en: "Olympus recommends an ETD-series washer-disinfector. SUNCAR offers a full 'endoscopy suite' package including ETD54.", kz: "Olympus ETD сериялы жуу-дезинфекциялауды ұсынады. SUNCAR ETD54 қоса толық жиын ұсынады." },
      },
      {
        q: { ru: "Сертифицирован ли аппарат в Казахстане?", en: "Is the device certified in Kazakhstan?", kz: "Аппарат Қазақстанда сертификатталған ба?" },
        a: { ru: "Да, все поставляемые SUNCAR эндоскопические системы Olympus имеют регистрационное удостоверение Министерства здравоохранения РК.", en: "Yes, all Olympus endoscopy systems supplied by SUNCAR hold registration certificates from the Kazakhstan Ministry of Health.", kz: "Иә, SUNCAR жеткізетін барлық Olympus эндоскопиялық жүйелер ҚР Денсаулық сақтау министрлігінің тіркеу куәлігіне ие." },
      },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────────────────
async function main() {
  const col = collection(db, "products");
  const snapshot = await getDocs(col);

  let updated = 0;
  let skipped = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const slug = data.slug;

    if (!updates[slug]) {
      skipped++;
      continue;
    }

    const patch = updates[slug];
    await updateDoc(doc(db, "products", docSnap.id), patch);
    console.log(`✅ Updated: ${slug}`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
