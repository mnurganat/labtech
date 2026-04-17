import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoViWrtVm45ZNU0Wj04Qe33Vk7wVc_-Kc",
  authDomain: "maulsharif-landing.firebaseapp.com",
  projectId: "maulsharif-landing",
  storageBucket: "maulsharif-landing.firebasestorage.app",
  messagingSenderId: "116884173405",
  appId: "1:116884173405:web:94d8536e524de9685593b4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── CATEGORIES ───────────────────────────────────────────────
const categories = [
  {
    id: "diagnostics",
    slug: "diagnostics",
    order: 1,
    name: {
      ru: "Функциональная диагностика",
      kz: "Функционалдық диагностика",
      en: "Functional Diagnostics",
    },
  },
  {
    id: "laboratory",
    slug: "laboratory",
    order: 2,
    name: {
      ru: "Лабораторное оборудование",
      kz: "Зертханалық жабдық",
      en: "Laboratory Equipment",
    },
  },
  {
    id: "mri",
    slug: "mri",
    order: 3,
    name: { ru: "МРТ", kz: "МРТ", en: "MRI" },
  },
  {
    id: "ct",
    slug: "ct",
    order: 4,
    name: { ru: "КТ", kz: "КТ", en: "CT" },
  },
  {
    id: "ultrasound",
    slug: "ultrasound",
    order: 5,
    name: { ru: "УЗИ", kz: "УДЗ", en: "Ultrasound" },
  },
];

// ─── BRANDS ───────────────────────────────────────────────────
const brands = [
  { id: "philips",   name: "Philips",          order: 1 },
  { id: "siemens",   name: "Siemens Healthineers", order: 2 },
  { id: "ge",        name: "GE HealthCare",    order: 3 },
  { id: "samsung",   name: "Samsung Medison",  order: 4 },
  { id: "canon",     name: "Canon Medical",    order: 5 },
  { id: "schiller",  name: "Schiller",         order: 6 },
  { id: "sysmex",    name: "Sysmex",           order: 7 },
  { id: "beckman",   name: "Beckman Coulter",  order: 8 },
];

// ─── PRODUCTS ─────────────────────────────────────────────────
const products = [
  // ── ULTRASOUND ──
  {
    id: "philips-epiq-elite",
    slug: "philips-epiq-elite",
    category: "ultrasound",
    brand: "Philips",
    isBestseller: true,
    imageUrl: "",
    name: {
      ru: "Philips EPIQ Elite",
      kz: "Philips EPIQ Elite",
      en: "Philips EPIQ Elite",
    },
    description: {
      ru: "Флагманская ультразвуковая система с технологией PureWave и нST-детектором. Высочайшее качество изображения для кардиологии, акушерства и общей эхографии.",
      kz: "PureWave технологиясы мен nST детекторы бар флагмандық ультрадыбыстық жүйе. Кардиология, акушерлік және жалпы эхография үшін ең жоғары сапалы бейне.",
      en: "Flagship ultrasound system with PureWave technology and nST detector. Highest image quality for cardiology, obstetrics, and general echography.",
    },
    specs: {
      ru: ["Технология PureWave", "nST-детектор", "5D эхография", "Эластография"],
      en: ["PureWave Technology", "nST Detector", "5D Echography", "Elastography"],
    },
  },
  {
    id: "samsung-rs85a",
    slug: "samsung-rs85a",
    category: "ultrasound",
    brand: "Samsung Medison",
    isBestseller: true,
    imageUrl: "",
    name: {
      ru: "Samsung RS85A Prestige",
      kz: "Samsung RS85A Prestige",
      en: "Samsung RS85A Prestige",
    },
    description: {
      ru: "Премиальная ультразвуковая система с ИИ-диагностикой S-Detect. Автоматический анализ узлов щитовидной железы и молочных желез.",
      kz: "S-Detect ЖИ диагностикасы бар премиум ультрадыбыстық жүйе. Қалқанша және сүт безі түйіндерін автоматты талдау.",
      en: "Premium ultrasound system with S-Detect AI diagnostics. Automatic thyroid and breast nodule analysis.",
    },
    specs: {
      ru: ["AI-диагностика S-Detect", "Crystal Architecture", "Elite ST", "MV-Flow"],
      en: ["S-Detect AI", "Crystal Architecture", "Elite ST", "MV-Flow"],
    },
  },
  {
    id: "ge-logiq-e10",
    slug: "ge-logiq-e10",
    category: "ultrasound",
    brand: "GE HealthCare",
    isBestseller: false,
    imageUrl: "",
    name: { ru: "GE LOGIQ E10", kz: "GE LOGIQ E10", en: "GE LOGIQ E10" },
    description: {
      ru: "Мультипараметрическая ультразвуковая система с технологией cSound. Предназначена для радиологии и интервенционных процедур.",
      kz: "cSound технологиясы бар көп параметрлі ультрадыбыстық жүйе. Радиология және интервенционды процедуралар үшін.",
      en: "Multiparametric ultrasound system with cSound technology. Designed for radiology and interventional procedures.",
    },
    specs: {
      ru: ["Технология cSound", "Contrast Enhanced UltraSound", "XDclear 2.0"],
      en: ["cSound Technology", "Contrast Enhanced UltraSound", "XDclear 2.0"],
    },
  },
  // ── MRI ──
  {
    id: "siemens-magnetom-altea",
    slug: "siemens-magnetom-altea",
    category: "mri",
    brand: "Siemens Healthineers",
    isBestseller: true,
    imageUrl: "",
    name: {
      ru: "Siemens MAGNETOM Altea",
      kz: "Siemens MAGNETOM Altea",
      en: "Siemens MAGNETOM Altea",
    },
    description: {
      ru: "МРТ-система 1.5 Тл с технологией BioMatrix. Персонализированная МРТ для широкого спектра клинических применений, включая кардиологию и онкологию.",
      kz: "BioMatrix технологиясы бар 1.5 Тл МРТ жүйесі. Кардиология және онкология қоса алғанда, клиникалық қолданулардың кең спектрі үшін жекелендірілген МРТ.",
      en: "1.5T MRI system with BioMatrix technology. Personalized MRI for a wide range of clinical applications including cardiology and oncology.",
    },
    specs: {
      ru: ["1.5 Тл", "BioMatrix сенсоры", "TimTX TrueShape", "Dot-технологии"],
      en: ["1.5T", "BioMatrix sensors", "TimTX TrueShape", "Dot-technologies"],
    },
  },
  {
    id: "ge-signa-premier",
    slug: "ge-signa-premier",
    category: "mri",
    brand: "GE HealthCare",
    isBestseller: false,
    imageUrl: "",
    name: {
      ru: "GE SIGNA Premier 3T",
      kz: "GE SIGNA Premier 3T",
      en: "GE SIGNA Premier 3T",
    },
    description: {
      ru: "MR-система 3 Тл с технологией AIR Recon DL. Ускоренное получение изображений с помощью глубокого обучения для превосходного качества.",
      kz: "AIR Recon DL технологиясы бар 3 Тл МР жүйесі. Жоғары сапа үшін терең оқыту арқылы жеделдетілген кескін алу.",
      en: "3T MR system with AIR Recon DL technology. Deep learning accelerated imaging for superior quality.",
    },
    specs: {
      ru: ["3 Тл", "AIR Recon DL", "AIR Coils", "HyperSense"],
      en: ["3T", "AIR Recon DL", "AIR Coils", "HyperSense"],
    },
  },
  // ── CT ──
  {
    id: "siemens-somatom-go-now",
    slug: "siemens-somatom-go-now",
    category: "ct",
    brand: "Siemens Healthineers",
    isBestseller: true,
    imageUrl: "",
    name: {
      ru: "Siemens SOMATOM go.Now",
      kz: "Siemens SOMATOM go.Now",
      en: "Siemens SOMATOM go.Now",
    },
    description: {
      ru: "Компактный 16-срезовый КТ-сканер с планшетным управлением. Идеален для небольших клиник и отделений скорой помощи.",
      kz: "Планшетті басқармасы бар компактты 16 кесімді КТ сканері. Шағын клиникалар мен жедел жәрдем бөлімшелері үшін тамаша.",
      en: "Compact 16-slice CT scanner with tablet-based control. Ideal for small clinics and emergency departments.",
    },
    specs: {
      ru: ["16 срезов", "Tablet Workflow", "CARE Dose4D", "SAFIRE реконструкция"],
      en: ["16-slice", "Tablet Workflow", "CARE Dose4D", "SAFIRE reconstruction"],
    },
  },
  {
    id: "canon-aquilion-one",
    slug: "canon-aquilion-one",
    category: "ct",
    brand: "Canon Medical",
    isBestseller: false,
    imageUrl: "",
    name: {
      ru: "Canon Aquilion ONE / PRISM Edition",
      kz: "Canon Aquilion ONE / PRISM Edition",
      en: "Canon Aquilion ONE / PRISM Edition",
    },
    description: {
      ru: "320-срезовый КТ-сканер с технологией широкого детектора. Позволяет охватить весь орган за один оборот гентри.",
      kz: "Кең детектор технологиясы бар 320 кесімді КТ сканері. Бір гентри айналымында бүкіл мүшені қамтуға мүмкіндік береді.",
      en: "320-slice CT scanner with wide detector technology. Covers the entire organ in a single gantry rotation.",
    },
    specs: {
      ru: ["320 срезов", "16 см покрытие", "Технология PRISM", "AiCE реконструкция"],
      en: ["320-slice", "16cm coverage", "PRISM Technology", "AiCE reconstruction"],
    },
  },
  // ── DIAGNOSTICS ──
  {
    id: "schiller-cardiovit-at-102",
    slug: "schiller-cardiovit-at-102",
    category: "diagnostics",
    brand: "Schiller",
    isBestseller: true,
    imageUrl: "",
    name: {
      ru: "Schiller CARDIOVIT AT-102",
      kz: "Schiller CARDIOVIT AT-102",
      en: "Schiller CARDIOVIT AT-102",
    },
    description: {
      ru: "12-канальный электрокардиограф с интерпретацией ЭКГ. Компактный и надёжный для клинической и амбулаторной кардиологии.",
      kz: "ЭКГ интерпретациясы бар 12 арналы электрокардиограф. Клиникалық және амбулаториялық кардиология үшін компактты және сенімді.",
      en: "12-channel electrocardiograph with ECG interpretation. Compact and reliable for clinical and ambulatory cardiology.",
    },
    specs: {
      ru: ["12 каналов", "Автоинтерпретация", "Базы данных ЭКГ", "USB/LAN"],
      en: ["12 channels", "Auto-interpretation", "ECG database", "USB/LAN"],
    },
  },
  {
    id: "ge-mac-5500-hd",
    slug: "ge-mac-5500-hd",
    category: "diagnostics",
    brand: "GE HealthCare",
    isBestseller: false,
    imageUrl: "",
    name: {
      ru: "GE MAC 5500 HD",
      kz: "GE MAC 5500 HD",
      en: "GE MAC 5500 HD",
    },
    description: {
      ru: "Профессиональный 12-канальный ЭКГ с HD-технологией. Инновационная фильтрация для четких сигналов даже при движении пациента.",
      kz: "HD технологиясы бар кәсіби 12 арналы ЭКГ. Науқас қозғалысында да анық сигналдар үшін инновациялық сүзгілеу.",
      en: "Professional 12-channel ECG with HD technology. Innovative filtering for clear signals even during patient movement.",
    },
    specs: {
      ru: ["12 каналов HD", "SMART арритмия", "Беспроводная связь", "Сенсорный экран"],
      en: ["12 HD channels", "SMART arrhythmia", "Wireless", "Touchscreen"],
    },
  },
  // ── LABORATORY ──
  {
    id: "sysmex-xn-9000",
    slug: "sysmex-xn-9000",
    category: "laboratory",
    brand: "Sysmex",
    isBestseller: true,
    imageUrl: "",
    name: {
      ru: "Sysmex XN-9000",
      kz: "Sysmex XN-9000",
      en: "Sysmex XN-9000",
    },
    description: {
      ru: "Автоматический гематологический анализатор с высокой производительностью. 500 тестов в час, полный ОАК с лейкоцитарной формулой.",
      kz: "Жоғары өнімділікпен автоматты гематологиялық анализатор. Сағатына 500 тест, лейкоциттік формуламен толық ОАҚ.",
      en: "High-throughput automated hematology analyzer. 500 tests per hour, complete CBC with differential.",
    },
    specs: {
      ru: ["500 тестов/час", "Расширенная лейкоцитарная формула", "Ретикулоциты", "Полная автоматизация"],
      en: ["500 tests/h", "Extended differential", "Reticulocytes", "Full automation"],
    },
  },
  {
    id: "beckman-au5800",
    slug: "beckman-au5800",
    category: "laboratory",
    brand: "Beckman Coulter",
    isBestseller: false,
    imageUrl: "",
    name: {
      ru: "Beckman Coulter AU5800",
      kz: "Beckman Coulter AU5800",
      en: "Beckman Coulter AU5800",
    },
    description: {
      ru: "Высокопроизводительный биохимический анализатор. До 10 000 тестов в час, 360 позиций для реагентов, полная автоматизация лаборатории.",
      kz: "Жоғары өнімді биохимиялық анализатор. Сағатына 10 000 тестке дейін, реагенттерге арналған 360 орын, зертхананы толық автоматтандыру.",
      en: "High-throughput biochemistry analyzer. Up to 10,000 tests per hour, 360 reagent positions, full lab automation.",
    },
    specs: {
      ru: ["10 000 тестов/час", "360 позиций реагентов", "ISE модуль", "Тест на ПСА"],
      en: ["10,000 tests/h", "360 reagent positions", "ISE module", "PSA testing"],
    },
  },
];

async function seed() {
  console.log("🌱 Seeding Firestore...\n");

  // Categories
  const catBatch = writeBatch(db);
  for (const cat of categories) {
    catBatch.set(doc(db, "categories", cat.id), cat);
  }
  await catBatch.commit();
  console.log(`✓ ${categories.length} categories`);

  // Brands
  const brandBatch = writeBatch(db);
  for (const brand of brands) {
    brandBatch.set(doc(db, "brands", brand.id), brand);
  }
  await brandBatch.commit();
  console.log(`✓ ${brands.length} brands`);

  // Products (batch by 10)
  for (let i = 0; i < products.length; i += 10) {
    const batch = writeBatch(db);
    const chunk = products.slice(i, i + 10);
    for (const product of chunk) {
      batch.set(doc(db, "products", product.id), product);
    }
    await batch.commit();
  }
  console.log(`✓ ${products.length} products`);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e.message);
  process.exit(1);
});
