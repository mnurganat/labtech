/**
 * Seed: кабинеты/оснащение ЛПУ
 * Данные взяты с mcs.kz + моковые поставщики для демонстрации агрегатора
 * Run: node scripts/seed-offices.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, query, where, limit } from "firebase/firestore";

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

// ─── Поставщики (справочник) ─────────────────────────────────────────────────
const SUNCAR    = (productSlug, price) => ({ name: "SUNCAR Healthcare", type: "internal",  productSlug, price, currency: "KZT", url: `https://suncar.kz/ru/catalog` });
const ZETA      = (price) => ({ name: "Zeta",              type: "external", url: "https://zeta.kz",             price, currency: "KZT" });
const LAB_TECH  = (price) => ({ name: "Lab Technology",    type: "external", url: "https://labtech.kz",          price, currency: "KZT" });
const MED_SOL   = (price) => ({ name: "Medical Solution",  type: "external", url: "https://medsolution.kz",      price, currency: "KZT" });
const KAZMED    = (price) => ({ name: "Казмедприбор",      type: "external", url: "https://kazmedpribor.kz",     price, currency: "KZT" });
const NEIROSOFT = (productSlug, price) => ({ name: "Нейрософт / SUNCAR", type: "internal",  productSlug, price, currency: "KZT" });

// ─── Кабинеты ────────────────────────────────────────────────────────────────
const offices = [

  // ══════════════════════════════════════════════════════════════════════════
  // 1. КАБИНЕТ НЕВРОПАТОЛОГА
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "neuropathologist",
    sectionCategory: "ambulatory",
    order: 1,
    totalEstimate: 12489901,
    imageUrl: null,
    iconKey: "brain",
    name: {
      ru: "Кабинет невропатолога",
      kz: "Невропатолог кабинеті",
      en: "Neurologist's Office",
    },
    description: {
      ru: "Комплексное оснащение кабинета невролога: от мебели и компьютерной техники до специализированного диагностического оборудования — ЭЭГ, УЗДГ, эхоэнцефалографа и электронейромиографа.",
      kz: "Неврологиялық кабинетті кешенді жабдықтау: жиһаздан және компьютерлік техникадан бастап арнаулы диагностикалық жабдыққа дейін — ЭЭГ, УЗДГ, эхоэнцефалограф және электронейромиограф.",
      en: "Complete neurologist's office setup: furniture and IT equipment through to specialised diagnostic devices — EEG, transcranial Doppler, echoencephalograph, and electroneuromyograph.",
    },
    items: [
      // ── Мебель ───────────────────────────────────────────────────────────
      {
        id: "neuro-desk",
        name: { ru: "Стол врачебный", kz: "Дәрігерлік үстел", en: "Doctor's Desk" },
        model: "СК 12",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          ZETA(28500),
          MED_SOL(29000),
        ],
      },
      {
        id: "neuro-chairs",
        name: { ru: "Стулья", kz: "Орындықтар", en: "Chairs" },
        model: "СМ 7/1",
        category: "furniture",
        quantity: 2,
        unit: "шт.",
        suppliers: [
          ZETA(8000),
          LAB_TECH(7500),
        ],
      },
      {
        id: "neuro-cabinet",
        name: { ru: "Шкаф универсальный", kz: "Әмбебап шкаф", en: "Universal Cabinet" },
        model: "ШР 2",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          ZETA(50200),
          MED_SOL(52000),
        ],
      },
      {
        id: "neuro-bedside",
        name: { ru: "Тумбочка", kz: "Тумбочка", en: "Bedside Table" },
        model: "ТВ 3",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          ZETA(27200),
        ],
      },
      {
        id: "neuro-couch",
        name: { ru: "Кушетка медицинская", kz: "Медициналық кушетка", en: "Medical Examination Couch" },
        model: "с регулируемым подголовником",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          ZETA(30600),
          LAB_TECH(32000),
        ],
      },
      {
        id: "neuro-patient-chair",
        name: { ru: "Кресло пациента", kz: "Пациент кресло", en: "Patient Chair" },
        model: "МОК-00052",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          ZETA(38015),
          MED_SOL(39000),
        ],
      },
      {
        id: "neuro-procedure-table",
        name: { ru: "Столик процедурный", kz: "Процедуралық үстел", en: "Procedure Table" },
        model: "СИ-05/01",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          KAZMED(50800),
          MED_SOL(52000),
        ],
      },
      // ── Оргтехника / прочее ───────────────────────────────────────────────
      {
        id: "neuro-computer",
        name: { ru: "Компьютер с принтером", kz: "Компьютер мен принтер", en: "Computer with Printer" },
        model: null,
        category: "other",
        quantity: 1,
        unit: "комплект",
        suppliers: [
          LAB_TECH(200000),
          MED_SOL(195000),
        ],
      },
      {
        id: "neuro-ac",
        name: { ru: "Кондиционер с установкой", kz: "Кондиционер орнатумен", en: "Air Conditioner with Installation" },
        model: "Elenberg CSH-09J",
        category: "other",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          LAB_TECH(77000),
        ],
      },
      {
        id: "neuro-recirculator",
        name: { ru: "Рециркулятор воздуха", kz: "Ауа рециркуляторы", en: "Air Recirculator" },
        model: "Тион А100",
        category: "equipment",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          SUNCAR("neirosoft-poly-spectrum-sm", 197000),
          LAB_TECH(195000),
        ],
      },
      {
        id: "neuro-kit",
        name: { ru: "Набор врача (тонометр, фонендоскоп, термометр)", kz: "Дәрігер жинағы", en: "Doctor's Kit (tonometer, stethoscope, thermometer)" },
        model: null,
        category: "consumable",
        quantity: 1,
        unit: "комплект",
        suppliers: [
          SUNCAR(null, 7900),
          LAB_TECH(8200),
          MED_SOL(7700),
        ],
      },
      // ── Диагностическое оборудование ─────────────────────────────────────
      {
        id: "neuro-eeg",
        name: { ru: "Электроэнцефалограф компьютерный", kz: "Компьютерлік электроэнцефалограф", en: "Computerised EEG" },
        model: "Нейрон-Спектр-4",
        category: "equipment",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          NEIROSOFT("neirosoft-neuron-spectrum-5", 2208165),
          LAB_TECH(2350000),
        ],
      },
      {
        id: "neuro-dopplerograph",
        name: { ru: "Ультразвуковой Допплерограф", kz: "Ультрадыбыстық Допплерограф", en: "Transcranial Doppler" },
        model: "Сономед 300М-1С (2-канальный)",
        category: "equipment",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          SUNCAR("mindray-dc-80", 4630618),
          MED_SOL(4750000),
        ],
      },
      {
        id: "neuro-echoencel",
        name: { ru: "Эхоэнцефалограф", kz: "Эхоэнцефалограф", en: "Echoencephalograph" },
        model: "СОНОМЕД-315-С",
        category: "equipment",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          SUNCAR(null, 1839188),
          LAB_TECH(1900000),
        ],
      },
      {
        id: "neuro-enmg",
        name: { ru: "Нейромиограф (компьютерный ЭНМГ-комплекс)", kz: "Нейромиограф", en: "Electroneuromyograph (computer ENMG complex)" },
        model: "Нейро-МВП-Микро",
        category: "equipment",
        quantity: 1,
        unit: "шт.",
        suppliers: [
          NEIROSOFT("neirosoft-neuro-mvp-4", 3520032),
          LAB_TECH(3650000),
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. РЕГИСТРАТУРА
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "reception",
    sectionCategory: "ambulatory",
    order: 2,
    totalEstimate: 1083200,
    imageUrl: null,
    iconKey: "monitor",
    name: {
      ru: "Регистратура",
      kz: "Тіркеу бөлімі",
      en: "Reception Desk",
    },
    description: {
      ru: "Оснащение регистратуры: мебель, компьютерная техника, кассовый аппарат, терминал оплаты, рециркулятор воздуха.",
      kz: "Тіркеу бөлімін жабдықтау: жиһаз, компьютерлік техника, кассалық аппарат, төлем терминалы.",
      en: "Reception desk setup: furniture, IT equipment, cash register, payment terminal, air recirculator.",
    },
    items: [
      {
        id: "reg-chairs",
        name: { ru: "Стулья", kz: "Орындықтар", en: "Chairs" },
        model: "СМ 7/1",
        category: "furniture",
        quantity: 3,
        unit: "шт.",
        suppliers: [ZETA(4000), LAB_TECH(3800)],
      },
      {
        id: "reg-computer",
        name: { ru: "Компьютер с принтером", kz: "Компьютер мен принтер", en: "Computer with Printer" },
        model: null,
        category: "other",
        quantity: 1,
        unit: "комплект",
        suppliers: [LAB_TECH(200000), MED_SOL(195000)],
      },
      {
        id: "reg-ac",
        name: { ru: "Кондиционер с установкой", kz: "Кондиционер орнатумен", en: "Air Conditioner with Installation" },
        model: "Elenberg CSH-09J",
        category: "other",
        quantity: 1,
        unit: "шт.",
        suppliers: [LAB_TECH(77000)],
      },
      {
        id: "reg-recirculator",
        name: { ru: "Рециркулятор воздуха", kz: "Ауа рециркуляторы", en: "Air Recirculator" },
        model: "Тион А100",
        category: "equipment",
        quantity: 1,
        unit: "шт.",
        suppliers: [SUNCAR(null, 197000), LAB_TECH(195000)],
      },
      {
        id: "reg-bedside",
        name: { ru: "Тумбочка", kz: "Тумбочка", en: "Bedside Table" },
        model: "ТВ 3",
        category: "furniture",
        quantity: 1,
        unit: "шт.",
        suppliers: [ZETA(27200)],
      },
      {
        id: "reg-cash",
        name: { ru: "Кассовый аппарат", kz: "Кассалық аппарат", en: "Cash Register" },
        model: null,
        category: "other",
        quantity: 1,
        unit: "шт.",
        suppliers: [LAB_TECH(160000), MED_SOL(158000)],
      },
      {
        id: "reg-terminal",
        name: { ru: "Терминал оплаты", kz: "Төлем терминалы", en: "Payment Terminal" },
        model: "Pax D210 Nord OnlineKZ",
        category: "other",
        quantity: 1,
        unit: "шт.",
        suppliers: [LAB_TECH(160000)],
      },
      {
        id: "reg-furniture",
        name: { ru: "Мебель регистратуры", kz: "Тіркеу жиһазы", en: "Reception Furniture Set" },
        model: null,
        category: "furniture",
        quantity: 1,
        unit: "комплект",
        suppliers: [ZETA(250000), MED_SOL(260000)],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. КАБИНЕТ КАРДИОЛОГА
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "cardiologist",
    sectionCategory: "ambulatory",
    order: 3,
    totalEstimate: 4850000,
    imageUrl: null,
    iconKey: "heart",
    name: {
      ru: "Кабинет кардиолога",
      kz: "Кардиолог кабинеті",
      en: "Cardiologist's Office",
    },
    description: {
      ru: "Оснащение кабинета кардиолога: стандартная мебель, ЭКГ-аппарат, суточный монитор АД (СМАД), холтеровский монитор ЭКГ.",
      kz: "Кардиолог кабинетін жабдықтау: стандартты жиһаз, ЭКГ аппараты, тәуліктік АҚ мониторы (СМАД), холтерлік ЭКГ монитор.",
      en: "Cardiologist's office setup: standard furniture, ECG device, ambulatory blood pressure monitor (ABPM), Holter ECG monitor.",
    },
    items: [
      { id: "cardio-desk", name: { ru: "Стол врачебный", kz: "Дәрігерлік үстел", en: "Doctor's Desk" }, model: "СК 12", category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(28500), MED_SOL(29000)] },
      { id: "cardio-chairs", name: { ru: "Стулья", kz: "Орындықтар", en: "Chairs" }, model: "СМ 7/1", category: "furniture", quantity: 2, unit: "шт.", suppliers: [ZETA(8000), LAB_TECH(7500)] },
      { id: "cardio-couch", name: { ru: "Кушетка медицинская", kz: "Медициналық кушетка", en: "Medical Couch" }, model: null, category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(30600), LAB_TECH(32000)] },
      { id: "cardio-cabinet", name: { ru: "Шкаф медицинский", kz: "Медициналық шкаф", en: "Medical Cabinet" }, model: "ШР 2", category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(50200)] },
      { id: "cardio-computer", name: { ru: "Компьютер с принтером", kz: "Компьютер мен принтер", en: "Computer with Printer" }, model: null, category: "other", quantity: 1, unit: "комплект", suppliers: [LAB_TECH(200000)] },
      { id: "cardio-ecg", name: { ru: "Электрокардиограф 12-канальный", kz: "12 арналы электрокардиограф", en: "12-lead ECG" }, model: "Поли-Спектр-8/Е", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spektr-8e", 450000), LAB_TECH(480000)] },
      { id: "cardio-abpm", name: { ru: "Суточный монитор АД (СМАД)", kz: "Тәуліктік АҚ мониторы (СМАД)", en: "24h Blood Pressure Monitor (ABPM)" }, model: "BPLab", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-bplab-smad", 580000), MED_SOL(600000)] },
      { id: "cardio-holter", name: { ru: "Холтер ЭКГ (суточный монитор ЭКГ)", kz: "Холтер ЭКГ мониторы", en: "Holter ECG Monitor" }, model: "Поли-Спектр-СМ", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spectrum-sm", 1839188), LAB_TECH(1900000)] },
      { id: "cardio-kit", name: { ru: "Набор врача", kz: "Дәрігер жинағы", en: "Doctor's Kit" }, model: null, category: "consumable", quantity: 1, unit: "комплект", suppliers: [SUNCAR(null, 7900), LAB_TECH(8200)] },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 4. КАБИНЕТ РЕНТГЕНОЛОГИИ
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "radiology",
    sectionCategory: "ambulatory",
    order: 4,
    totalEstimate: 18500000,
    imageUrl: null,
    iconKey: "radiation",
    name: {
      ru: "Кабинет рентгенологии",
      kz: "Рентгенология кабинеті",
      en: "Radiology Room",
    },
    description: {
      ru: "Цифровой рентгенологический кабинет: цифровая рентгенографическая установка с беспроводным детектором, рабочая станция, средства радиационной защиты персонала и пациентов.",
      kz: "Сандық рентгенологиялық кабинет: сымсыз детекторы бар сандық рентгенографиялық қондырғы, жұмыс станциясы, персонал мен пациенттерді радиациялық қорғау құралдары.",
      en: "Digital radiology room: digital radiography unit with wireless detector, workstation, radiation protection for staff and patients.",
    },
    items: [
      { id: "xray-unit", name: { ru: "Цифровой рентгеновский аппарат", kz: "Сандық рентген аппараты", en: "Digital X-ray Unit" }, model: "Philips DigitalDiagnost C90", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR("philips-digitaldiagnost-c90", 15000000), MED_SOL(15500000)] },
      { id: "xray-workstation", name: { ru: "Рабочая станция врача", kz: "Дәрігер жұмыс станциясы", en: "Radiologist Workstation" }, model: null, category: "other", quantity: 1, unit: "шт.", suppliers: [LAB_TECH(350000), MED_SOL(380000)] },
      { id: "xray-protection", name: { ru: "Свинцовые средства защиты (фартуки, воротники)", kz: "Қорғасын қорғаныс құралдары", en: "Lead Protection (aprons, collars)" }, model: null, category: "consumable", quantity: 1, unit: "комплект", suppliers: [KAZMED(120000), LAB_TECH(130000)] },
      { id: "xray-screen", name: { ru: "Защитный экран передвижной", kz: "Жылжымалы қорғаныш экраны", en: "Mobile Protective Screen" }, model: null, category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(350000), MED_SOL(360000)] },
      { id: "xray-desk", name: { ru: "Стол врача-рентгенолога", kz: "Рентгенолог үстелі", en: "Radiologist's Desk" }, model: null, category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(45000), MED_SOL(47000)] },
      { id: "xray-couch", name: { ru: "Кушетка для пациента", kz: "Пациент кушеткасы", en: "Patient Couch" }, model: null, category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(30600), LAB_TECH(32000)] },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 5. КАБИНЕТ УЗИ
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ultrasound-room",
    sectionCategory: "ambulatory",
    order: 5,
    totalEstimate: 6800000,
    imageUrl: null,
    iconKey: "waves",
    name: {
      ru: "Кабинет УЗИ",
      kz: "УДЗ кабинеті",
      en: "Ultrasound Room",
    },
    description: {
      ru: "Кабинет ультразвуковой диагностики: многофункциональный УЗИ-аппарат экспертного класса, кушетка, рабочее место врача.",
      kz: "Ультрадыбыстық диагностика кабинеті: сарапшы сыныпты көп функциялы УДЗ аппараты, кушетка, дәрігер жұмыс орны.",
      en: "Ultrasound diagnostic room: expert-class multi-purpose ultrasound, couch, physician workstation.",
    },
    items: [
      { id: "uzi-device", name: { ru: "УЗИ-аппарат экспертного класса", kz: "Сарапшы сыныпты УДЗ аппараты", en: "Expert-class Ultrasound" }, model: "Mindray DC-80", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR("mindray-dc-80", 5500000), MED_SOL(5700000), LAB_TECH(5650000)] },
      { id: "uzi-couch", name: { ru: "Кушетка смотровая", kz: "Тексеру кушеткасы", en: "Examination Couch" }, model: null, category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(30600), LAB_TECH(32000)] },
      { id: "uzi-desk", name: { ru: "Стол врача", kz: "Дәрігер үстелі", en: "Doctor's Desk" }, model: null, category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(28500), MED_SOL(29000)] },
      { id: "uzi-chair", name: { ru: "Кресло врача", kz: "Дәрігер кресло", en: "Doctor's Chair" }, model: null, category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(18000), LAB_TECH(17500)] },
      { id: "uzi-gel", name: { ru: "Гель ультразвуковой (упаковка)", kz: "Ультрадыбыстық гель", en: "Ultrasound Gel (pack)" }, model: null, category: "consumable", quantity: 5, unit: "л", suppliers: [SUNCAR(null, 2500), LAB_TECH(2300)] },
      { id: "uzi-printer", name: { ru: "Принтер для снимков SONY", kz: "SONY суретке принтер", en: "SONY Image Printer" }, model: "SONY UP-D898", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 320000), MED_SOL(330000)] },
    ],
  },

];

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const col = collection(db, "offices");

  for (const office of offices) {
    // Check if already exists
    const q = query(col, where("slug", "==", office.slug), limit(1));
    const snap = await getDocs(q);

    if (!snap.empty) {
      console.log(`🔄 Already exists, skipping: ${office.slug}`);
      continue;
    }

    const ref = doc(col);
    await setDoc(ref, { id: ref.id, ...office });
    console.log(`✅ Created: ${office.slug} (${office.name.ru})`);
  }

  console.log("\n✅ Done.");
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
