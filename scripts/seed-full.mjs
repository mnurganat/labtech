/**
 * Full catalog seed — based on mcs.kz reference
 * Adds new categories + products to Firestore
 * Run: node scripts/seed-full.mjs
 */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6-FoFfqXEXAzxIBi3dHiknNhv9OZ_p0I",
  authDomain: "maulsharif-landing.firebaseapp.com",
  projectId: "maulsharif-landing",
  storageBucket: "maulsharif-landing.appspot.com",
  messagingSenderId: "1055803688651",
  appId: "1:1055803688651:web:ff7b72b7e879e9e498e9c2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
const NEW_CATEGORIES = [
  {
    id: "xray",
    slug: "xray",
    name: { ru: "Рентгенология", kz: "Рентгенология", en: "X-Ray & Radiology" },
    description: {
      ru: "Цифровые рентгеновские аппараты, флюорографы и дентальные системы",
      kz: "Цифрлық рентген аппараттары, флюорографтар",
      en: "Digital X-ray systems, fluorographs and dental imaging",
    },
    order: 6,
  },
  {
    id: "physio",
    slug: "physio",
    name: { ru: "Физиотерапия", kz: "Физиотерапия", en: "Physiotherapy" },
    description: {
      ru: "Электротерапия, ультразвуковая терапия, ударно-волновая терапия и реабилитация",
      kz: "Электртерапия, ультрадыбыстық терапия және оңалту",
      en: "Electrotherapy, ultrasound therapy, shockwave and rehabilitation",
    },
    order: 7,
  },
  {
    id: "cardiology",
    slug: "cardiology",
    name: { ru: "Кардиология", kz: "Кардиология", en: "Cardiology" },
    description: {
      ru: "ЭКГ-аппараты, холтеровское мониторирование, СМАД и нагрузочные тесты",
      kz: "ЭКГ аппараттары, холтер мониторингі және СБАД",
      en: "ECG machines, Holter monitoring, ABPM and stress testing",
    },
    order: 8,
  },
  {
    id: "neurology",
    slug: "neurology",
    name: { ru: "Неврология", kz: "Неврология", en: "Neurology" },
    description: {
      ru: "ЭЭГ, ЭНМГ, вызванные потенциалы, магнитная стимуляция",
      kz: "ЭЭГ, ЭНМГ, туындатылған потенциалдар",
      en: "EEG, ENMG, evoked potentials, magnetic stimulation",
    },
    order: 9,
  },
  {
    id: "endoscopy",
    slug: "endoscopy",
    name: { ru: "Эндоскопия", kz: "Эндоскопия", en: "Endoscopy" },
    description: {
      ru: "Видеоэндоскопические системы, гастроскопы, колоноскопы",
      kz: "Бейнеэндоскопиялық жүйелер, гастроскоптар",
      en: "Video endoscopy systems, gastroscopes, colonoscopes",
    },
    order: 10,
  },
];

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const NEW_PRODUCTS = [

  // ── УЗИ (3 existing, add 3 more) ──────────────────────────────────────────
  {
    id: "mindray-dc-80",
    slug: "mindray-dc-80",
    category: "ultrasound",
    brand: "Mindray",
    name: {
      ru: "Mindray DC-80",
      kz: "Mindray DC-80",
      en: "Mindray DC-80",
    },
    description: {
      ru: "Ультразвуковая диагностическая система экспертного класса с технологией Zone Sonography и расширенными возможностями визуализации. Широко применяется в акушерстве, гинекологии и абдоминальной диагностике.",
      kz: "Zone Sonography технологиясы бар эксперттік класты ультрадыбыстық диагностикалық жүйе.",
      en: "Expert-class ultrasound system with Zone Sonography technology for OB/GYN and abdominal diagnostics.",
    },
    specs: {
      "Класс системы": ["Экспертный"],
      "Технология": ["Zone Sonography Technology"],
      "Режимы сканирования": ["B, M, Color, PW, CW, TDI"],
      "Датчики": ["Конвексный, линейный, секторный, внутриполостной"],
      "Экран": ["21.5\" LED HD монитор"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "sonosite-pxp",
    slug: "sonosite-pxp",
    category: "ultrasound",
    brand: "Sonosite",
    name: {
      ru: "Sonosite PX",
      kz: "Sonosite PX",
      en: "Sonosite PX",
    },
    description: {
      ru: "Портативная ультразвуковая система для использования в условиях точки оказания медицинской помощи (POAM). Идеальна для скорой помощи, реанимации и выездной работы.",
      kz: "Жедел жәрдем және реанимация үшін портативті ультрадыбыстық жүйе.",
      en: "Point-of-care portable ultrasound system ideal for emergency medicine and critical care.",
    },
    specs: {
      "Тип": ["Портативный, точка помощи"],
      "Вес": ["3.9 кг"],
      "Защита": ["IP45 (водо- и пылезащита)"],
      "Аккумулятор": ["До 4 часов работы"],
      "Режимы": ["2D, M-режим, Color, PW Doppler"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "canon-aplio-i800",
    slug: "canon-aplio-i800",
    category: "ultrasound",
    brand: "Canon Medical",
    name: {
      ru: "Canon Aplio i800",
      kz: "Canon Aplio i800",
      en: "Canon Aplio i800",
    },
    description: {
      ru: "Флагманская ультразвуковая система Canon Medical с технологией Precision Imaging и искусственным интеллектом. Превосходное качество изображения для самых сложных диагностических задач.",
      kz: "Precision Imaging технологиясы және жасанды интеллект бар Canon Medical флагмандық жүйесі.",
      en: "Canon Medical flagship ultrasound with Precision Imaging technology and AI-assisted diagnosis.",
    },
    specs: {
      "Технология": ["Precision Imaging", "AI-assisted diagnosis"],
      "Режимы": ["B, M, Color, PW, CW, TDI, 3D/4D"],
      "Экран": ["23\" Full HD монитор"],
      "Применение": ["Радиология, кардиология, акушерство"],
    },
    bestseller: true,
    inStock: true,
  },

  // ── МРТ (existing: GE Signa Creator, add more) ──────────────────────────
  {
    id: "siemens-magnetom-altea",
    slug: "siemens-magnetom-altea",
    category: "mri",
    brand: "Siemens Healthineers",
    name: {
      ru: "Siemens MAGNETOM Altea 1.5T",
      kz: "Siemens MAGNETOM Altea 1.5T",
      en: "Siemens MAGNETOM Altea 1.5T",
    },
    description: {
      ru: "МРТ-система 1.5 Тесла с технологией BioMatrix и широким каналом 70 см. Оптимальна для клиник с высокой пропускной способностью — позволяет сканировать пациентов любой комплекции.",
      kz: "BioMatrix технологиясы бар 1.5 Тесла МРТ жүйесі, 70 см кең канал.",
      en: "1.5T MRI with BioMatrix technology and 70 cm wide bore for patient-friendly scanning.",
    },
    specs: {
      "Напряжённость поля": ["1.5 Тесла"],
      "Диаметр тоннеля": ["70 см (Wide Bore)"],
      "Длина тоннеля": ["137 см"],
      "Технология": ["BioMatrix", "Tim 4G коил-система"],
      "Скорость слайдов": ["До 180 000 слайдов/час"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "philips-ingenia-ambition",
    slug: "philips-ingenia-ambition",
    category: "mri",
    brand: "Philips",
    name: {
      ru: "Philips Ingenia Ambition 1.5T",
      kz: "Philips Ingenia Ambition 1.5T",
      en: "Philips Ingenia Ambition 1.5T",
    },
    description: {
      ru: "Первый в мире МРТ 1.5Т с системой BlueSeal — полностью герметичным магнитом без необходимости дозаправки гелием. Экономит до 20% эксплуатационных затрат.",
      kz: "BlueSeal жүйесі бар әлемдегі алғашқы 1.5Т МРТ — гелийді қайта толтыруды қажет етпейді.",
      en: "World's first 1.5T MRI with BlueSeal fully-sealed magnet — no helium refills needed.",
    },
    specs: {
      "Напряжённость поля": ["1.5 Тесла"],
      "Технология магнита": ["BlueSeal (герметичный, без гелиевых дозаправок)"],
      "Диаметр тоннеля": ["70 см"],
      "Экономия": ["До 20% снижение операционных затрат"],
      "dStream": ["Цифровой ВЧ-тракт"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "ge-signa-artist",
    slug: "ge-signa-artist",
    category: "mri",
    brand: "GE HealthCare",
    name: {
      ru: "GE SIGNA Artist 1.5T",
      kz: "GE SIGNA Artist 1.5T",
      en: "GE SIGNA Artist 1.5T",
    },
    description: {
      ru: "МРТ-система нового поколения с ИИ-технологией AIR Recon DL для улучшения качества изображения в реальном времени. Увеличивает пропускную способность без потери диагностического качества.",
      kz: "AIR Recon DL ИИ технологиясы бар жаңа буын МРТ жүйесі.",
      en: "Next-gen MRI with AIR Recon DL AI technology for real-time image enhancement.",
    },
    specs: {
      "Напряжённость поля": ["1.5 Тесла"],
      "ИИ-технология": ["AIR Recon DL"],
      "Коилы": ["AIR Technology коилы"],
      "Диаметр тоннеля": ["70 см"],
    },
    bestseller: false,
    inStock: true,
  },

  // ── КТ (existing: Canon Aquilion ONE, add more) ──────────────────────────
  {
    id: "siemens-somatom-go-top",
    slug: "siemens-somatom-go-top",
    category: "ct",
    brand: "Siemens Healthineers",
    name: {
      ru: "Siemens SOMATOM go.Top",
      kz: "Siemens SOMATOM go.Top",
      en: "Siemens SOMATOM go.Top",
    },
    description: {
      ru: "Компьютерный томограф 128-срезов с технологией ADMIRE (Advanced Modelled Iterative Reconstruction) и ультрабыстрым временем вращения 0.285 с. Идеален для кардио- и ангиографических исследований.",
      kz: "ADMIRE технологиясы бар 128-кесінділ КТ томографы, 0.285 с айналу уақыты.",
      en: "128-slice CT with ADMIRE iterative reconstruction and 0.285s ultra-fast rotation for cardiac imaging.",
    },
    specs: {
      "Количество срезов": ["128"],
      "Скорость вращения": ["0.285 с"],
      "Технология реконструкции": ["ADMIRE (итеративная)"],
      "Детектор": ["120 ряд × 0.6 мм"],
      "Применение": ["Кардиология, ангиография, онкология"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "philips-incisive-ct",
    slug: "philips-incisive-ct",
    category: "ct",
    brand: "Philips",
    name: {
      ru: "Philips Incisive CT 128",
      kz: "Philips Incisive CT 128",
      en: "Philips Incisive CT 128",
    },
    description: {
      ru: "КТ-система с революционными трубками NanoPanel Prism с наноструктурным покрытием анода. Беспрецедентный срок службы трубки и стабильность дозы при любых условиях сканирования.",
      kz: "NanoPanel Prism нанопанелі бар революциялық КТ жүйесі.",
      en: "CT system with NanoPanel Prism tubes featuring nano-structured anode for unmatched tube life.",
    },
    specs: {
      "Количество срезов": ["128"],
      "Технология трубки": ["NanoPanel Prism"],
      "Гарантия трубки": ["До 7 лет / 6 млн оборотов"],
      "IQon": ["Спектральная КТ (опция)"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "ge-revolution-ct",
    slug: "ge-revolution-ct",
    category: "ct",
    brand: "GE HealthCare",
    name: {
      ru: "GE Revolution CT 256",
      kz: "GE Revolution CT 256",
      en: "GE Revolution CT 256",
    },
    description: {
      ru: "Мощный 256-срезовый КТ с детектором 16 см, позволяющий захватить всё сердце за один оборот. Технология ASiR-V снижает дозу облучения до 82% при сохранении качества изображения.",
      kz: "16 см детекторы бар 256 кесінділ КТ — бір айналымда жүректі толық сканерлейді.",
      en: "256-slice CT with 16cm detector capturing the entire heart in one rotation. ASiR-V reduces dose by up to 82%.",
    },
    specs: {
      "Количество срезов": ["256"],
      "Охват детектора": ["16 см (one-beat cardiac)"],
      "Снижение дозы": ["До 82% (ASiR-V)"],
      "Скорость вращения": ["0.28 с"],
    },
    bestseller: false,
    inStock: false,
  },

  // ── Лаборатория (add more) ────────────────────────────────────────────────
  {
    id: "mindray-bc-7500",
    slug: "mindray-bc-7500",
    category: "laboratory",
    brand: "Mindray",
    name: {
      ru: "Mindray BC-7500",
      kz: "Mindray BC-7500",
      en: "Mindray BC-7500",
    },
    description: {
      ru: "Гематологический анализатор с 6-частичной дифференцировкой лейкоцитов. Производительность до 120 образцов/час с использованием технологии SF Cube. Подходит для лабораторий средней и высокой нагрузки.",
      kz: "SF Cube технологиясымен 6 санды лейкоциттер дифференциациясы бар гематологиялық анализатор.",
      en: "6-part diff hematology analyzer with SF Cube technology, 120 samples/hour throughput.",
    },
    specs: {
      "Параметры": ["109 параметров, 26 гистограмм"],
      "Дифференцировка": ["6-частичная DIFF лейкоцитов"],
      "Производительность": ["120 образцов/час"],
      "Технология": ["SF Cube (тройная оптика + два лазера)"],
      "Объём образца": ["17.5 мкл (венозная кровь)"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "roche-cobas-6800",
    slug: "roche-cobas-6800",
    category: "laboratory",
    brand: "Roche",
    name: {
      ru: "Roche cobas 6800",
      kz: "Roche cobas 6800",
      en: "Roche cobas 6800",
    },
    description: {
      ru: "Высокопроизводительная система молекулярной диагностики для ПЦР-анализов. Полная автоматизация от образца до результата. Производительность до 384 теста в серии.",
      kz: "ПЦР анализдеріне арналған жоғары өнімді молекулалық диагностика жүйесі.",
      en: "High-throughput molecular diagnostics system for PCR testing, fully automated sample-to-result.",
    },
    specs: {
      "Производительность": ["384 теста/серия"],
      "Автоматизация": ["Полная (от образца до результата)"],
      "Вирусная нагрузка": ["ВИЧ, ГВ, ГС, ЦМВ и др."],
      "Сертификация": ["CE-IVD, FDA"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "siemens-advia-2120i",
    slug: "siemens-advia-2120i",
    category: "laboratory",
    brand: "Siemens Healthineers",
    name: {
      ru: "Siemens ADVIA 2120i",
      kz: "Siemens ADVIA 2120i",
      en: "Siemens ADVIA 2120i",
    },
    description: {
      ru: "Полностью автоматизированный гематологический анализатор с уникальной технологией цитохимического окрашивания. Производительность 120 образцов/час. Эталон в диагностике заболеваний крови.",
      kz: "Цитохимиялық бояу технологиясы бар толық автоматтандырылған гематологиялық анализатор.",
      en: "Fully automated hematology analyzer with unique cytochemical staining technology, 120 samples/hour.",
    },
    specs: {
      "Параметры": ["До 58 параметров"],
      "Производительность": ["120 образцов/час"],
      "Технология": ["Лазерная цитохимия + пероксидаза"],
      "Ретикулоциты": ["Полная панель автоматически"],
    },
    bestseller: true,
    inStock: true,
  },

  // ── Рентгенология (новая категория) ──────────────────────────────────────
  {
    id: "philips-digitaldiagnost-c90",
    slug: "philips-digitaldiagnost-c90",
    category: "xray",
    brand: "Philips",
    name: {
      ru: "Philips DigitalDiagnost C90",
      kz: "Philips DigitalDiagnost C90",
      en: "Philips DigitalDiagnost C90",
    },
    description: {
      ru: "Цифровая рентгеновская система прямой радиографии высочайшего класса с детектором 43×43 см. Технология ClarityIQ снижает дозу облучения до 80% по сравнению с аналоговыми системами.",
      kz: "ClarityIQ технологиясы бар жоғары сыныпты цифрлық рентген жүйесі, 43×43 см детектор.",
      en: "High-end digital radiography with 43×43cm detector. ClarityIQ reduces dose by up to 80%.",
    },
    specs: {
      "Детектор": ["43 × 43 см CsI (цезий-йод)"],
      "Разрешение": ["5.0 LP/mm"],
      "Снижение дозы": ["До 80% (ClarityIQ)"],
      "Позиционирование": ["Автоматическое с коллимацией по детектору"],
      "Рабочие позиции": ["Стоя, лёжа, педиатрия"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "samsung-gc85a",
    slug: "samsung-gc85a",
    category: "xray",
    brand: "Samsung",
    name: {
      ru: "Samsung GC85A",
      kz: "Samsung GC85A",
      en: "Samsung GC85A",
    },
    description: {
      ru: "Универсальный цифровой рентгеновский аппарат с двумя детекторами. Поддержка сложных укладок и детского протокола. Технология PIXI снижает дозу при сохранении диагностического качества.",
      kz: "Екі детекторы бар әмбебап цифрлық рентген аппараты. PIXI технологиясы.",
      en: "Versatile digital X-ray with dual detectors. PIXI technology reduces patient dose.",
    },
    specs: {
      "Детекторы": ["Два — 43×43 и 35×43 см"],
      "Технология": ["PIXI (Pattern-based Image eXposure Indicator)"],
      "ИИ": ["S-Vue Imaging AI"],
      "Нагрузка стола": ["До 300 кг"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "siemens-multix-impact",
    slug: "siemens-multix-impact",
    category: "xray",
    brand: "Siemens Healthineers",
    name: {
      ru: "Siemens Multix Impact",
      kz: "Siemens Multix Impact",
      en: "Siemens Multix Impact",
    },
    description: {
      ru: "Надёжная и экономичная цифровая рентгеновская система для клиник общей практики и районных больниц. Высокая производительность при минимальных затратах на обслуживание.",
      kz: "Жалпы практикалық клиникалар мен аудандық ауруханаларға арналған сенімді цифрлық рентген жүйесі.",
      en: "Reliable and cost-effective digital X-ray system for general practices and district hospitals.",
    },
    specs: {
      "Класс": ["Начальный / средний"],
      "Детектор": ["43 × 43 см FP (опция беспроводной)"],
      "Применение": ["Грудная клетка, скелет, педиатрия"],
      "Интеграция": ["RIS/PACS, DICOM 3.0"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "ge-definium-6000",
    slug: "ge-definium-6000",
    category: "xray",
    brand: "GE HealthCare",
    name: {
      ru: "GE Definium 6000",
      kz: "GE Definium 6000",
      en: "GE Definium 6000",
    },
    description: {
      ru: "Высокопроизводительная система прямой цифровой радиографии с беспроводными детекторами CsI. Снабжена системой автопозиционирования ClearGuard и встроенными протоколами для 450+ укладок.",
      kz: "Сымсыз CsI детекторлары бар жоғары өнімді тікелей цифрлық рентгенография жүйесі.",
      en: "High-throughput DR system with wireless CsI detectors, auto-positioning, and 450+ anatomical protocols.",
    },
    specs: {
      "Детектор": ["Беспроводной CsI 43×43 см"],
      "Протоколы": ["450+ анатомических укладок"],
      "Автопозиционирование": ["ClearGuard система"],
      "Производительность": ["До 100 снимков/час"],
    },
    bestseller: false,
    inStock: false,
  },

  // ── Физиотерапия (новая категория) ────────────────────────────────────────
  {
    id: "btl-4000-smart",
    slug: "btl-4000-smart",
    category: "physio",
    brand: "BTL",
    name: {
      ru: "BTL-4000 Smart",
      kz: "BTL-4000 Smart",
      en: "BTL-4000 Smart",
    },
    description: {
      ru: "Многофункциональный аппарат электротерапии с TENS, EMS, интерференционными и диадинамическими токами. Оснащён сенсорным экраном с предустановленными протоколами лечения для 200+ нозологий.",
      kz: "TENS, EMS токтары бар көп функциялы электртерапия аппараты, 200+ нозологиялық протоколдар.",
      en: "Multifunction electrotherapy unit with TENS, EMS, interferential and diadynamic currents. 200+ treatment protocols.",
    },
    specs: {
      "Виды токов": ["TENS, EMS, Interferential, Diadynamic, Galvanic"],
      "Каналы": ["4 независимых канала"],
      "Протоколы": ["200+ предустановленных программ"],
      "Экран": ["7\" сенсорный цветной"],
      "Выходная мощность": ["До 100 мА"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "btl-5000-swt",
    slug: "btl-5000-swt",
    category: "physio",
    brand: "BTL",
    name: {
      ru: "BTL-5000 SWT Topline",
      kz: "BTL-5000 SWT Topline",
      en: "BTL-5000 SWT Topline",
    },
    description: {
      ru: "Аппарат ударно-волновой терапии топ-класса с баллистической и фокусированной ударной волной. Эффективен при лечении хронических болевых синдромов, плантарного фасциита, кальцинозов и спортивных травм.",
      kz: "Баллистикалық және фокусталған соққы толқыны бар жоғары сыныпты ударно-волновой терапия аппараты.",
      en: "Top-of-line shockwave therapy unit with ballistic and focused applicators for chronic pain and sports injuries.",
    },
    specs: {
      "Тип волны": ["Баллистическая + фокусированная"],
      "Частота": ["1–21 Гц"],
      "Давление": ["1–5 бар (баллистика)", "До 0.55 мДж/мм² (фокус)"],
      "Показания": ["Фасциит, тендиноз, кальциноз, миофасциальный синдром"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "chattanooga-intelect-mobile",
    slug: "chattanooga-intelect-mobile",
    category: "physio",
    brand: "Chattanooga",
    name: {
      ru: "Chattanooga Intelect Mobile 2",
      kz: "Chattanooga Intelect Mobile 2",
      en: "Chattanooga Intelect Mobile 2",
    },
    description: {
      ru: "Мобильный комбинированный аппарат ультразвуковой и электрической терапии от мирового лидера DJO. Компактный дизайн для кабинетов физиотерапии с небольшим пространством. Тихий и надёжный.",
      kz: "DJO әлемдік көшбасшысынан мобильді комбинирленген ультрадыбыстық және электр терапия аппараты.",
      en: "Mobile combination US/electrotherapy unit from DJO, compact design for any physiotherapy setting.",
    },
    specs: {
      "Режимы": ["Ультразвук 1 МГц + 3 МГц", "Электротерапия (TENS, EMS, IF)"],
      "Мощность УЗ": ["До 3 Вт/см²"],
      "Комбинирование": ["Одновременный US + электро"],
      "Вес": ["4.5 кг"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "enraf-nonius-sonopuls",
    slug: "enraf-nonius-sonopuls",
    category: "physio",
    brand: "Enraf-Nonius",
    name: {
      ru: "Enraf-Nonius Sonopuls 492",
      kz: "Enraf-Nonius Sonopuls 492",
      en: "Enraf-Nonius Sonopuls 492",
    },
    description: {
      ru: "Профессиональный аппарат ультразвуковой терапии с двухчастотным датчиком 1/3 МГц. Широко применяется при лечении мышечно-суставной патологии, постоперационной реабилитации и спортивной медицине.",
      kz: "1/3 МГц жиілікті датчигі бар кәсіби ультрадыбыстық терапия аппараты.",
      en: "Professional ultrasound therapy unit with dual-frequency 1/3MHz transducer for musculoskeletal rehabilitation.",
    },
    specs: {
      "Частоты": ["1 МГц и 3 МГц (переключаемые)"],
      "Площадь ERA": ["5 см²"],
      "Режимы": ["Непрерывный, импульсный 1:4, 1:9"],
      "Интенсивность": ["0.1–3.0 Вт/см²"],
    },
    bestseller: false,
    inStock: true,
  },

  // ── Кардиология (новая категория) ────────────────────────────────────────
  {
    id: "schiller-cardiovit-at-102",
    slug: "schiller-cardiovit-at-102",
    category: "cardiology",
    brand: "Schiller",
    name: {
      ru: "Schiller CARDIOVIT AT-102 G2",
      kz: "Schiller CARDIOVIT AT-102 G2",
      en: "Schiller CARDIOVIT AT-102 G2",
    },
    description: {
      ru: "12-канальный электрокардиограф второго поколения с цветным экраном, интерпретацией AIM и сетевым подключением. Стандарт кардиологических отделений в Казахстане и СНГ.",
      kz: "AIM интерпретациясы бар 12 арналды екінші буын электрокардиограф.",
      en: "12-channel second-generation ECG with AIM interpretation, color screen and network connectivity.",
    },
    specs: {
      "Каналы": ["12 одновременных"],
      "Интерпретация": ["AIM (автоматическая)"],
      "Экран": ["6\" цветной TFT"],
      "Память": ["До 1000 ЭКГ"],
      "Связь": ["LAN, Wi-Fi, USB, SD-карта"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "meditech-abpm-06",
    slug: "meditech-abpm-06",
    category: "cardiology",
    brand: "Meditech",
    name: {
      ru: "Meditech ABPM-06",
      kz: "Meditech ABPM-06",
      en: "Meditech ABPM-06",
    },
    description: {
      ru: "Монитор суточного артериального давления (СМАД) с пульсовым анализом. Измеряет АД, ЧСС, определяет суточный профиль и вариабельность. Программное обеспечение MediBase поддерживает 15 языков.",
      kz: "Тәуліктік қан қысымын мониторлайтын СМАД + пульстық анализ. MediBase бағдарламасы.",
      en: "24-hour ambulatory blood pressure monitor with pulse wave analysis. MediBase software, 15 languages.",
    },
    specs: {
      "Параметры": ["АД систол/диастол/пульс, тип аритмии"],
      "Интервалы измерений": ["Днём — каждые 15 мин, ночью — каждые 30 мин"],
      "Память": ["До 200 измерений"],
      "Аккумулятор": ["4 × AA, до 48 часов"],
      "ПО": ["MediBase (Windows)"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "neirosoft-poly-spectrum-sm",
    slug: "neirosoft-poly-spectrum-sm",
    category: "cardiology",
    brand: "Neirosoft",
    name: {
      ru: "Поли-Спектр-СМ (Холтер)",
      kz: "Поли-Спектр-СМ (Холтер)",
      en: "Poly-Spectrum-SM (Holter)",
    },
    description: {
      ru: "Система суточного мониторирования ЭКГ (Холтер) от российского производителя Нейрософт. Полная запись 12 отведений, анализ сегмента ST, детекция аритмий. Сертифицирован в РК.",
      kz: "Нейрософт компаниясының 12 канал жазбасы бар ЭКГ (Холтер) тәуліктік мониторлау жүйесі.",
      en: "12-lead Holter ECG monitoring system by Neirosoft. Full ST-segment analysis and arrhythmia detection.",
    },
    specs: {
      "Отведения": ["12 одновременных"],
      "Память": ["Flash до 72 часов"],
      "Аккумулятор": ["До 48 часов"],
      "Анализ": ["ST, аритмии, вариабельность ритма (ВРС)"],
      "Сертификат": ["РК, РФ"],
    },
    bestseller: false,
    inStock: true,
  },

  // ── Неврология (новая категория) ──────────────────────────────────────────
  {
    id: "neirosoft-neuron-spectrum-5",
    slug: "neirosoft-neuron-spectrum-5",
    category: "neurology",
    brand: "Neirosoft",
    name: {
      ru: "Нейрон-Спектр-5 (ЭЭГ)",
      kz: "Нейрон-Спектр-5 (ЭЭГ)",
      en: "Neuron-Spectrum-5 (EEG)",
    },
    description: {
      ru: "Компьютерный электроэнцефалограф 32-канальный с видеосинхронизацией. Полный комплекс для диагностики эпилепсии, нарушений сна и функциональных состояний мозга. Разработка НЕЙРОСОФТ, Россия.",
      kz: "Бейне синхронизациясы бар 32 арналды компьютерлік электроэнцефалограф. НЕЙРОСОФТ.",
      en: "32-channel EEG with video synchronization for epilepsy diagnosis and sleep studies. Neirosoft, Russia.",
    },
    specs: {
      "Каналы": ["32 (расширение до 64)"],
      "Видеосинхронизация": ["Full HD камера в комплекте"],
      "АЦП": ["24 бит"],
      "Артефакты": ["Система подавления артефактов"],
      "Протоколы": ["Эпилепсия, сон, когнитивные ВП"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "neirosoft-neuro-mvp-8",
    slug: "neirosoft-neuro-mvp-8",
    category: "neurology",
    brand: "Neirosoft",
    name: {
      ru: "Нейро МВП-8 (ЭНМГ)",
      kz: "Нейро МВП-8 (ЭНМГ)",
      en: "Neuro MVP-8 (ENMG)",
    },
    description: {
      ru: "8-канальный электронейромиограф для диагностики заболеваний нервно-мышечной системы. Полный комплект методик: ЭНМГ, ВП, тремор, ССВП, АСВП, ЗВОАЭ. Применяется в неврологических и нейрохирургических отделениях.",
      kz: "ЭНМГ, туындатылған потенциалдар, тремор диагностикасына арналған 8 арналды электронейромиограф.",
      en: "8-channel ENMG for nerve-muscle diagnostics: ENMG, EP, tremor, SSEP, BAEP, DPOAE.",
    },
    specs: {
      "Каналы": ["8"],
      "Методики": ["ЭНМГ, ССВП, АСВП, ЗВОАЭ, ВМО, тремор"],
      "Стимуляция": ["Электрическая + магнитная (опция)"],
      "Усилитель": ["Гальваническая развязка, 24 бит"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "nihon-kohden-neuropack",
    slug: "nihon-kohden-neuropack",
    category: "neurology",
    brand: "Nihon Kohden",
    name: {
      ru: "Nihon Kohden Neuropack S1",
      kz: "Nihon Kohden Neuropack S1",
      en: "Nihon Kohden Neuropack S1",
    },
    description: {
      ru: "Компактная система вызванных потенциалов и электромиографии от японского производителя. Нейропак S1 сочетает ЭМГ, ВП и нейромониторинг в одном устройстве. Широко используется в интраоперационном мониторинге.",
      kz: "Жапон өндірушісінің компактты туындатылған потенциалдар және ЭМГ жүйесі.",
      en: "Compact EMG/EP system from Nihon Kohden. Combines EMG, evoked potentials and intraoperative monitoring.",
    },
    specs: {
      "Каналы": ["4 + стимулятор"],
      "Методики": ["ЭМГ, ВМО, ССВП, АСВП, ЗВП"],
      "Монитор": ["10.4\" встроенный"],
      "Интраоп.": ["Мониторинг в операционной"],
    },
    bestseller: false,
    inStock: false,
  },

  // ── Эндоскопия (новая категория) ──────────────────────────────────────────
  {
    id: "olympus-evis-x1",
    slug: "olympus-evis-x1",
    category: "endoscopy",
    brand: "Olympus",
    name: {
      ru: "Olympus EVIS X1",
      kz: "Olympus EVIS X1",
      en: "Olympus EVIS X1",
    },
    description: {
      ru: "Флагманская видеоэндоскопическая система Olympus нового поколения с технологиями TXI, RDI и EDOF. Обеспечивает высочайшее качество визуализации для ранней диагностики новообразований ЖКТ.",
      kz: "TXI, RDI технологиялары бар Olympus флагмандық видеоэндоскопиялық жүйесі.",
      en: "Next-gen Olympus video endoscopy with TXI, RDI and EDOF technologies for early cancer detection.",
    },
    specs: {
      "Разрешение": ["4K Ultra HD"],
      "Технологии": ["TXI, RDI, EDOF"],
      "Применение": ["Гастроскопия, колоноскопия, бронхоскопия"],
      "Совместимость": ["Все эндоскопы серии 190"],
    },
    bestseller: true,
    inStock: true,
  },
  {
    id: "fujifilm-eluxeo-7000",
    slug: "fujifilm-eluxeo-7000",
    category: "endoscopy",
    brand: "Fujifilm",
    name: {
      ru: "Fujifilm ELUXEO 7000",
      kz: "Fujifilm ELUXEO 7000",
      en: "Fujifilm ELUXEO 7000",
    },
    description: {
      ru: "Видеоэндоскопическая система с уникальной мультисветодиодной технологией BLI (Blue Light Imaging) и LCI (Linked Color Imaging). Улучшенная контрастность слизистой для диагностики ранних новообразований.",
      kz: "BLI және LCI технологиялары бар бірегей мультисветодиодты видеоэндоскопиялық жүйе.",
      en: "Video endoscopy system with BLI and LCI multi-LED technology for enhanced mucosal contrast.",
    },
    specs: {
      "Технология": ["BLI (Blue Light Imaging)", "LCI (Linked Color Imaging)"],
      "Разрешение": ["Full HD 1080p"],
      "Источник света": ["Multi-LED (не лампа, не лазер)"],
      "Применение": ["Гастроэнтерология, пульмонология"],
    },
    bestseller: false,
    inStock: true,
  },
  {
    id: "pentax-epk-i7010",
    slug: "pentax-epk-i7010",
    category: "endoscopy",
    brand: "Pentax Medical",
    name: {
      ru: "Pentax Medical EPK-i7010",
      kz: "Pentax Medical EPK-i7010",
      en: "Pentax Medical EPK-i7010",
    },
    description: {
      ru: "Высококлассная видеоэндоскопическая система с технологией i-scan OE (Optical Enhancement). Два режима улучшения изображения — поверхностный и тональный — для чёткого выявления патологических изменений.",
      kz: "i-scan OE технологиясы бар жоғары сыныпты видеоэндоскопиялық жүйе.",
      en: "Premium video endoscopy with i-scan OE technology for surface and tone enhancement imaging.",
    },
    specs: {
      "Технология": ["i-scan OE (Optical Enhancement)"],
      "Режимы": ["Поверхностный, тональный, контрастный"],
      "Разрешение": ["Full HD"],
      "Применение": ["ЖКТ, бронхология, ЛОР"],
    },
    bestseller: false,
    inStock: true,
  },
];

// ─── SEED FUNCTION ─────────────────────────────────────────────────────────────
async function seed() {
  console.log("🚀 Starting full catalog seed...\n");

  // 1. Add new categories
  console.log("📁 Adding categories...");
  for (const cat of NEW_CATEGORIES) {
    const ref = doc(db, "categories", cat.id);
    await setDoc(ref, cat, { merge: true });
    console.log(`   ✅ Category: ${cat.name.ru}`);
  }

  // 2. Add products in batches of 20
  console.log("\n📦 Adding products...");
  const BATCH_SIZE = 20;
  for (let i = 0; i < NEW_PRODUCTS.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const chunk = NEW_PRODUCTS.slice(i, i + BATCH_SIZE);
    for (const p of chunk) {
      const ref = doc(db, "products", p.id);
      batch.set(ref, p, { merge: true });
    }
    await batch.commit();
    chunk.forEach(p => console.log(`   ✅ Product: ${p.name.ru} (${p.category})`));
  }

  console.log(`\n✨ Done! Added ${NEW_CATEGORIES.length} categories and ${NEW_PRODUCTS.length} products.`);
  console.log("\n📊 Summary by category:");
  const byCat = {};
  NEW_PRODUCTS.forEach(p => { byCat[p.category] = (byCat[p.category] || 0) + 1; });
  Object.entries(byCat).forEach(([cat, count]) => console.log(`   ${cat}: ${count} products`));

  process.exit(0);
}

seed().catch(err => { console.error("❌ Error:", err); process.exit(1); });
