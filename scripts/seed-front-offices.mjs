/**
 * Seed: Front Office — 26 кабинетов
 * Данные взяты с mcs.kz/front-office/
 * Run: node scripts/seed-front-offices.mjs
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
const SUNCAR    = (slug, price) => ({ name: "SUNCAR Healthcare", type: "internal",  productSlug: slug, price, currency: "KZT", url: "https://suncar.kz/ru/catalog" });
const NEIROSOFT = (slug, price) => ({ name: "Нейрософт / SUNCAR", type: "internal", productSlug: slug, price, currency: "KZT" });
const ZETA      = (price) => ({ name: "Zeta",              type: "external", url: "https://zeta.kz",             price, currency: "KZT" });
const LAB_TECH  = (price) => ({ name: "Lab Technology",    type: "external", url: "https://labtech.kz",          price, currency: "KZT" });
const MED_SOL   = (price) => ({ name: "Medical Solution",  type: "external", url: "https://medsolution.kz",      price, currency: "KZT" });
const KAZMED    = (price) => ({ name: "Казмедприбор",      type: "external", url: "https://kazmedpribor.kz",     price, currency: "KZT" });

// ─── Стандартная мебель (переиспользуется) ────────────────────────────────────
const std = (prefix) => [
  { id: `${prefix}-desk`,    name: { ru: "Стол врачебный",       kz: "Дәрігерлік үстел",        en: "Doctor's Desk"        }, model: "СК 12",               category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(28500), LAB_TECH(30000)] },
  { id: `${prefix}-chairs`,  name: { ru: "Стулья",               kz: "Орындықтар",               en: "Chairs"               }, model: "СМ 7/1",              category: "furniture",  quantity: 2, unit: "шт.",     suppliers: [ZETA(8000),  LAB_TECH(7500)]  },
  { id: `${prefix}-cabinet`, name: { ru: "Шкаф универсальный",   kz: "Әмбебап шкаф",             en: "Universal Cabinet"    }, model: "ШР 2",                category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(50200), MED_SOL(52000)]  },
  { id: `${prefix}-bedside`, name: { ru: "Тумбочка",             kz: "Тумбочка",                 en: "Bedside Table"        }, model: "ТВ 3",                category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(27200)]                  },
  { id: `${prefix}-couch`,   name: { ru: "Кушетка медицинская",  kz: "Медициналық кушетка",      en: "Medical Couch"        }, model: "с рег. подголовником", category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(30600), LAB_TECH(32000)] },
  { id: `${prefix}-pc`,      name: { ru: "Компьютер с принтером",kz: "Компьютер мен принтер",    en: "Computer with Printer"}, model: null,                  category: "other",      quantity: 1, unit: "комплект",suppliers: [LAB_TECH(200000), MED_SOL(195000)] },
  { id: `${prefix}-ac`,      name: { ru: "Кондиционер с установкой", kz: "Кондиционер орнатумен",en: "Air Conditioner"      }, model: "Elenberg CSH-09J",    category: "other",      quantity: 1, unit: "шт.",     suppliers: [LAB_TECH(77000)]              },
  { id: `${prefix}-recirc`,  name: { ru: "Рециркулятор воздуха", kz: "Ауа рециркуляторы",        en: "Air Recirculator"     }, model: "Тион А100",           category: "equipment",  quantity: 1, unit: "шт.",     suppliers: [SUNCAR(null, 197000), LAB_TECH(195000)] },
];
const kit    = (prefix) => ({ id: `${prefix}-kit`, name: { ru: "Набор врача (тонометр, фонендоскоп, термометр)", kz: "Дәрігер жинағы", en: "Doctor's Kit" }, model: null, category: "consumable", quantity: 1, unit: "комплект", suppliers: [SUNCAR(null, 7900), LAB_TECH(8200)] });
const procT  = (prefix) => ({ id: `${prefix}-proc`, name: { ru: "Столик процедурный", kz: "Процедуралық үстел", en: "Procedure Table" }, model: "СИ-05/01", category: "furniture", quantity: 1, unit: "шт.", suppliers: [KAZMED(50800), MED_SOL(52000)] });

// ─── Кабинеты ────────────────────────────────────────────────────────────────
const offices = [

  // ═══════════════════════════════════════════
  // 1. АЛЛЕРГОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "allergologist", sectionCategory: "ambulatory", order: 10, iconKey: "stethoscope",
    totalEstimate: 804850,
    name: { ru: "Кабинет аллерголога",        kz: "Аллерголог кабинеті",       en: "Allergist's Office"        },
    description: { ru: "Стандартное оснащение кабинета аллерголога: мебель, компьютер, рециркулятор воздуха, фармацевтический холодильник, набор противошоковый.", kz: "Аллерголог кабинетін стандартты жабдықтау: жиһаз, компьютер, ауа рециркуляторы, фармацевтикалық тоңазытқыш.", en: "Standard allergist setup: furniture, computer, air recirculator, pharmaceutical refrigerator, anti-shock kit." },
    items: [
      ...std("allerg"),
      { id: "allerg-fridge", name: { ru: "Холодильник фармацевтический", kz: "Фармацевтикалық тоңазытқыш", en: "Pharmaceutical Refrigerator" }, model: "POZIS ХФ-250-2", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 173300), LAB_TECH(180000)] },
      { id: "allerg-shock",  name: { ru: "Набор противошоковый",          kz: "Шокқа қарсы жинақ",           en: "Anti-shock Kit"              }, model: null, category: "consumable", quantity: 1, unit: "шт.", suppliers: [MED_SOL(5000), LAB_TECH(5500)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 2. АУДИОМЕТРИЯ
  // ═══════════════════════════════════════════
  {
    slug: "audiometry", sectionCategory: "ambulatory", order: 11, iconKey: "ear",
    totalEstimate: 4442208,
    name: { ru: "Кабинет аудиометрии",         kz: "Аудиометрия кабинеті",      en: "Audiometry Room"           },
    description: { ru: "Кабинет аудиометрии: многофункциональный компьютерный аудиометрический комплекс Нейро-Аудио для исследования слуховых вызванных потенциалов и отоакустической эмиссии.", kz: "Аудиометрия кабинеті: Нейро-Аудио компьютерлік кешені.", en: "Audiometry room with Neuro-Audio multi-function computer complex for evoked potentials and OAE." },
    items: [
      { id: "audio-desk",    name: { ru: "Стол врачебный",       kz: "Дәрігерлік үстел",   en: "Doctor's Desk"    }, model: "СК 12",    category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(28500), LAB_TECH(30000)] },
      { id: "audio-chairs",  name: { ru: "Стулья",               kz: "Орындықтар",         en: "Chairs"           }, model: "СМ 7/1",   category: "furniture", quantity: 2, unit: "шт.",     suppliers: [ZETA(8000),  LAB_TECH(7500)]  },
      { id: "audio-cabinet", name: { ru: "Шкаф универсальный",   kz: "Әмбебап шкаф",       en: "Universal Cabinet"}, model: "ШР 2",     category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(50200), MED_SOL(52000)]  },
      { id: "audio-bedside", name: { ru: "Тумбочка",             kz: "Тумбочка",           en: "Bedside Table"    }, model: "ТВ 3",     category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(27200)]                  },
      { id: "audio-recirc",  name: { ru: "Рециркулятор воздуха", kz: "Ауа рециркуляторы",  en: "Air Recirculator" }, model: "Тион А100",category: "equipment", quantity: 1, unit: "шт.",     suppliers: [SUNCAR(null, 197000), LAB_TECH(195000)] },
      { id: "audio-audiom",  name: { ru: "Аудиометрический комплекс Нейро-Аудио", kz: "Нейро-Аудио аудиометриялық кешені", en: "Neuro-Audio Audiometry Complex" }, model: "Нейро-Аудио (ВП и ОАЭ)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuro-audio", 4200708), LAB_TECH(4350000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 3. ГАСТРОЭНТЕРОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "gastroenterologist", sectionCategory: "ambulatory", order: 12, iconKey: "stethoscope",
    totalEstimate: 626500,
    name: { ru: "Кабинет гастроэнтеролога",    kz: "Гастроэнтеролог кабинеті",  en: "Gastroenterologist's Office"},
    description: { ru: "Стандартное оснащение кабинета гастроэнтеролога: мебель, компьютерная техника, рециркулятор воздуха, кушетка.", kz: "Гастроэнтеролог кабинетін стандартты жабдықтау.", en: "Standard gastroenterologist office: furniture, computer equipment, air recirculator." },
    items: [...std("gastro"), kit("gastro")],
  },

  // ═══════════════════════════════════════════
  // 4. ГИНЕКОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "gynecologist", sectionCategory: "ambulatory", order: 13, iconKey: "heart",
    totalEstimate: 11200000,
    name: { ru: "Кабинет гинеколога",          kz: "Гинеколог кабинеті",        en: "Gynecologist's Office"     },
    description: { ru: "Комплексное оснащение гинекологического кабинета: гинекологическое кресло, кольпоскоп, кардиотокограф, коагулятор, гистероскоп, УЗИ-аппарат акушерский.", kz: "Гинекологиялық кабинетті кешенді жабдықтау: гинекологиялық кресло, кольпоскоп, кардиотокограф, коагулятор, гистероскоп, акушерлік УДЗ аппараты.", en: "Full gynecology room: gynecological chair, colposcope, cardiotocograph, coagulator, hysteroscope, obstetric ultrasound." },
    items: [
      ...std("gyn"),
      { id: "gyn-gyn-chair",  name: { ru: "Кресло гинекологическое",      kz: "Гинекологиялық кресло",     en: "Gynecological Chair"        }, model: "МОК-00057",        category: "furniture",  quantity: 1, unit: "шт.", suppliers: [ZETA(24865), MED_SOL(26000)] },
      procT("gyn"),
      { id: "gyn-light",      name: { ru: "Светильник передвижной",        kz: "Жылжымалы шам",             en: "Mobile Surgical Light"      }, model: "ПР-6-12",          category: "equipment",  quantity: 1, unit: "шт.", suppliers: [KAZMED(784700), MED_SOL(800000)] },
      { id: "gyn-uv",         name: { ru: "Шкаф для стерилизации УФ",      kz: "УК стерилизациялық шкаф",   en: "UV Sterilisation Cabinet"   }, model: "УФК-2",            category: "equipment",  quantity: 1, unit: "шт.", suppliers: [KAZMED(156000), LAB_TECH(160000)] },
      { id: "gyn-colpo",      name: { ru: "Видеокольпоскоп цифровой",      kz: "Цифрлық бейнекольпоскоп",   en: "Digital Video Colposcope"   }, model: "C3 Edan",          category: "equipment",  quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 850000), MED_SOL(870000)] },
      { id: "gyn-ctg",        name: { ru: "Кардиотокограф",                kz: "Кардиотокограф",             en: "Cardiotocograph (CTG)"      }, model: "Сономед 250",      category: "equipment",  quantity: 1, unit: "шт.", suppliers: [SUNCAR("sonom-250", 680000), LAB_TECH(700000)] },
      { id: "gyn-coag",       name: { ru: "Коагулятор хирургический",      kz: "Хирургиялық коагулятор",    en: "Surgical Coagulator"        }, model: "DT-400Р",          category: "equipment",  quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 1965600), MED_SOL(2000000)] },
      { id: "gyn-hyster",     name: { ru: "Гистероскопический комплекс",   kz: "Гистероскопиялық кешен",    en: "Hysteroscopy System"        }, model: null,               category: "equipment",  quantity: 1, unit: "шт.", suppliers: [MED_SOL(950000), LAB_TECH(980000)] },
      { id: "gyn-uzi",        name: { ru: "УЗИ-аппарат акушерский",        kz: "Акушерлік УДЗ аппараты",    en: "Obstetric Ultrasound"       }, model: "Arrieta V60 (Hitachi)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR("hitachi-arietta-v60", 5272065), MED_SOL(5400000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 5. ДЕРМАТОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "dermatologist", sectionCategory: "ambulatory", order: 14, iconKey: "stethoscope",
    totalEstimate: 4180000,
    name: { ru: "Кабинет дерматолога",         kz: "Дерматолог кабинеті",       en: "Dermatologist's Office"    },
    description: { ru: "Оснащение кабинета дерматолога: дермаскоп, лампа Вуда, криотерапевтический аппарат, сосуд Дьюара, кольпоскоп видеодерматоскоп.", kz: "Дерматолог кабинетін жабдықтау: дермаскоп, Вуд шамы, криотерапия аппараты.", en: "Dermatologist's office: dermatoscope, Wood's lamp, cryotherapy device, Dewar vessel, video dermatoscope." },
    items: [
      ...std("derm"),
      { id: "derm-wood",  name: { ru: "Лампа Вуда",               kz: "Вуд шамы",              en: "Wood's Lamp"             }, model: "ОЛДД-01",          category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 26400),   LAB_TECH(28000)]  },
      { id: "derm-mag",   name: { ru: "Лупа с подсветкой 20x",    kz: "Жарықтандырылған ұлғайтқыш", en: "Magnifying Lamp 20x" }, model: null,               category: "equipment", quantity: 1, unit: "шт.", suppliers: [LAB_TECH(103500), MED_SOL(105000)] },
      { id: "derm-colpo", name: { ru: "Видеокольпоскоп цифровой", kz: "Цифрлық бейнекольпоскоп",   en: "Digital Video Colposcope" }, model: "C3 Edan",     category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 850000), MED_SOL(870000)] },
      { id: "derm-dewar", name: { ru: "Сосуд Дьюара",             kz: "Дьюар ыдысы",           en: "Dewar Vessel"            }, model: "СДС-35М",          category: "equipment", quantity: 1, unit: "шт.", suppliers: [LAB_TECH(536300), MED_SOL(550000)] },
      { id: "derm-cryo",  name: { ru: "Криотерапевтический аппарат", kz: "Криотерапиялық аппарат", en: "Cryotherapy Device"   }, model: "КРИОТОН-3",        category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 2998800), MED_SOL(3100000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 6. ДЕТСКИЙ КАРДИОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "pediatric-cardiologist", sectionCategory: "ambulatory", order: 15, iconKey: "heart",
    totalEstimate: 2200000,
    name: { ru: "Кабинет детского кардиолога", kz: "Балалар кардиологы кабинеті", en: "Pediatric Cardiologist's Office" },
    description: { ru: "Оснащение кабинета детского кардиолога: ЭКГ, суточный монитор АД, пульсоксиметр, набор противошоковый, фармацевтический холодильник.", kz: "Балалар кардиологы кабинетін жабдықтау: ЭКГ, тәуліктік АҚ монитор, пульсоксиметр.", en: "Pediatric cardiologist office: ECG, 24h blood pressure monitor, pulse oximeter, anti-shock kit." },
    items: [
      ...std("pedcard"),
      { id: "pedcard-fridge", name: { ru: "Холодильник фармацевтический", kz: "Фармацевтикалық тоңазытқыш", en: "Pharmaceutical Refrigerator" }, model: "POZIS ХФ-250-2", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 173300), LAB_TECH(180000)] },
      { id: "pedcard-ecg",    name: { ru: "Электрокардиограф 12-канальный", kz: "12 арналы электрокардиограф", en: "12-lead ECG" }, model: "Поли-Спектр-8/Е", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spektr-8e", 450000), LAB_TECH(480000)] },
      { id: "pedcard-ox",     name: { ru: "Пульсоксиметр",                  kz: "Пульсоксиметр",              en: "Pulse Oximeter"              }, model: "IP-1010",         category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 294900), MED_SOL(300000)] },
      { id: "pedcard-shock",  name: { ru: "Набор противошоковый",           kz: "Шокқа қарсы жинақ",          en: "Anti-shock Kit"              }, model: null,              category: "consumable", quantity: 1, unit: "шт.", suppliers: [MED_SOL(5000), LAB_TECH(5500)] },
      kit("pedcard"),
    ],
  },

  // ═══════════════════════════════════════════
  // 7. ДЕТСКИЙ НЕВРОПАТОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "pediatric-neurologist", sectionCategory: "ambulatory", order: 16, iconKey: "brain",
    totalEstimate: 8200000,
    name: { ru: "Кабинет детского невропатолога", kz: "Балалар невропатологы кабинеті", en: "Pediatric Neurologist's Office" },
    description: { ru: "Оснащение кабинета детского невропатолога: ЭЭГ, ультразвуковой допплерограф, эхоэнцефалограф, набор врача.", kz: "Балалар невропатологы кабинетін жабдықтау: ЭЭГ, УДЗ допплерограф, эхоэнцефалограф.", en: "Pediatric neurologist office: EEG, transcranial Doppler, echoencephalograph." },
    items: [
      ...std("pednr"),
      { id: "pednr-pchair",  name: { ru: "Кресло пациента", kz: "Пациент кресло", en: "Patient Chair" }, model: "МОК-00052", category: "furniture", quantity: 1, unit: "шт.", suppliers: [ZETA(38015), MED_SOL(39000)] },
      procT("pednr"),
      kit("pednr"),
      { id: "pednr-eeg",     name: { ru: "Электроэнцефалограф компьютерный", kz: "Компьютерлік ЭЭГ", en: "Computerised EEG" }, model: "Нейрон-Спектр-4", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuron-spectrum-4", 2208165), LAB_TECH(2350000)] },
      { id: "pednr-dopp",    name: { ru: "Ультразвуковой Допплерограф",      kz: "УДЗ Допплерограф", en: "Transcranial Doppler" }, model: "Сономед 300М-1С", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 2500000), MED_SOL(2600000)] },
      { id: "pednr-echo",    name: { ru: "Эхоэнцефалограф",                 kz: "Эхоэнцефалограф",  en: "Echoencephalograph" }, model: "СОНОМЕД-315-С",   category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 1839188), LAB_TECH(1900000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 8. КАРДИОЛОГ (расширенный)
  // ═══════════════════════════════════════════
  {
    slug: "cardiologist-full", sectionCategory: "ambulatory", order: 17, iconKey: "heart",
    totalEstimate: 31500000,
    name: { ru: "Кабинет кардиолога (полное оснащение)", kz: "Кардиолог кабинеті (толық жабдықтау)", en: "Cardiologist's Office (Full)" },
    description: { ru: "Полное оснащение кардиологического кабинета: ЭКГ, СМАД, холтер, спирометр, дефибриллятор-монитор, нагрузочные тесты (тредмил, велоэргометр), УЗИ экспертного класса.", kz: "Кардиолог кабинетін толық жабдықтау: ЭКГ, СМАД, Холтер, спирометр, дефибриллятор, жүктемелік сынақтар, сарапшы УДЗ.", en: "Full cardiology office: ECG, ABPM, Holter, spirometer, defibrillator-monitor, stress tests (treadmill, ergometer), expert-class ultrasound." },
    items: [
      ...std("cardfull"),
      procT("cardfull"),
      { id: "cardfull-ecg",    name: { ru: "Электрокардиограф 12-канальный",   kz: "12 арналы ЭКГ",      en: "12-lead ECG"                }, model: "Поли-Спектр-8/Е",  category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spektr-8e", 450000),  LAB_TECH(480000)]   },
      { id: "cardfull-abpm",   name: { ru: "Суточный монитор АД (СМАД)",       kz: "Тәуліктік АД монитор", en: "24h ABPM"                  }, model: "БиПиЛАБ",          category: "equipment", quantity: 3, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-bplab", 1078178),          MED_SOL(1100000)]   },
      { id: "cardfull-holter", name: { ru: "Холтер ЭКГ (суточный монитор)",   kz: "Холтер ЭКГ монитор",  en: "Holter ECG Monitor"         }, model: "Поли-Спектр-СМ",   category: "equipment", quantity: 3, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spectrum-sm", 1173578),LAB_TECH(1200000)]   },
      { id: "cardfull-spiro",  name: { ru: "Спирометр компьютерный",           kz: "Компьютерлік спирометр", en: "Computerised Spirometer"  }, model: "Спиро-Спектр",     category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-spiro-spektr", 569273),    LAB_TECH(590000)]   },
      { id: "cardfull-defib",  name: { ru: "Дефибриллятор-монитор",            kz: "Дефибриллятор-монитор", en: "Defibrillator-Monitor"     }, model: "ДКИ-Н-10 Аксион", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 1561200),                          MED_SOL(1600000)]   },
      { id: "cardfull-tread",  name: { ru: "Бегущая дорожка (тредмил)",        kz: "Жүгіру жолы (тредмил)", en: "Treadmill (Stress Test)"   }, model: "Valiant (Lode BV)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 5961600),                          MED_SOL(6100000)]   },
      { id: "cardfull-ergo",   name: { ru: "Велоэргометр",                     kz: "Велоэргометр",           en: "Cycle Ergometer"           }, model: "Corival (Lode BV)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 2152800),                          MED_SOL(2200000)]   },
      { id: "cardfull-uzi",    name: { ru: "УЗИ экспертного класса",           kz: "Сарапшы сыныпты УДЗ",   en: "Expert-class Ultrasound"   }, model: "Arrieta V60 (Hitachi)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR("hitachi-arietta-v60", 17677441),        MED_SOL(18000000)]  },
      kit("cardfull"),
    ],
  },

  // ═══════════════════════════════════════════
  // 9. МАММОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "mammologist", sectionCategory: "ambulatory", order: 18, iconKey: "stethoscope",
    totalEstimate: 1400000,
    name: { ru: "Кабинет маммолога",           kz: "Маммолог кабинеті",         en: "Mammologist's Office"      },
    description: { ru: "Оснащение кабинета маммолога: УЗИ-аппарат, стандартная мебель, компьютер, рециркулятор воздуха.", kz: "Маммолог кабинетін жабдықтау: УДЗ аппараты, стандартты жиһаз.", en: "Mammologist's office: ultrasound, standard furniture, computer, air recirculator." },
    items: [
      ...std("mammo"),
      { id: "mammo-uzi", name: { ru: "УЗИ-аппарат", kz: "УДЗ аппараты", en: "Ultrasound Machine" }, model: "Arrieta V60 (Hitachi)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR("hitachi-arietta-v60", 626500), MED_SOL(650000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 10. НЕЙРОФИЗИОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "neurophysiologist", sectionCategory: "ambulatory", order: 19, iconKey: "brain",
    totalEstimate: 6809238,
    name: { ru: "Кабинет нейрофизиолога",      kz: "Нейрофизиолог кабинеті",    en: "Neurophysiologist's Office"},
    description: { ru: "Кабинет нейрофизиолога: ЭЭГ, ЭНМГ-комплекс, исследование вызванных потенциалов, ЭКГ, анализ вариабельности ритма сердца.", kz: "Нейрофизиолог кабинеті: ЭЭГ, ЭНМГ кешені, шақырылған потенциалдарды зерттеу, ЭКГ, жүрек ырғағының өзгергіштігін талдау.", en: "Neurophysiologist's office: EEG, ENMG complex, evoked potentials, ECG, heart rate variability analysis." },
    items: [
      ...std("neurofi"),
      { id: "neurofi-pchair",  name: { ru: "Кресло пациента с аксессуарами", kz: "Пациент кресло", en: "Patient Chair with Accessories" }, model: "Olsen Industria",  category: "furniture", quantity: 1, unit: "шт.", suppliers: [MED_SOL(2355700), LAB_TECH(2400000)] },
      procT("neurofi"),
      kit("neurofi"),
      { id: "neurofi-eeg",     name: { ru: "Электроэнцефалограф компьютерный", kz: "Компьютерлік ЭЭГ",    en: "Computerised EEG"    }, model: "Нейрон-Спектр-4",      category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuron-spectrum-4", 1725700), LAB_TECH(1800000)] },
      { id: "neurofi-enmg",    name: { ru: "ЭНМГ-комплекс (нейромиограф)",    kz: "ЭНМГ кешені",         en: "ENMG Complex (2-channel)" }, model: "Нейро-МВП-Микро",  category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuro-mvp-micro", 1765271), LAB_TECH(1820000)] },
      { id: "neurofi-hrv",     name: { ru: "Система анализа вариабельности ритма сердца", kz: "ЖРӨ талдау жүйесі", en: "HRV Analysis System" }, model: "Поли-Спектр-Ритм", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spectrum-ritm", 277367), LAB_TECH(290000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 11. НЕЙРОХИРУРГ
  // ═══════════════════════════════════════════
  {
    slug: "neurosurgeon", sectionCategory: "ambulatory", order: 20, iconKey: "brain",
    totalEstimate: 1954940,
    name: { ru: "Кабинет нейрохирурга",        kz: "Нейрохирург кабинеті",      en: "Neurosurgeon's Office"     },
    description: { ru: "Оснащение консультативного кабинета нейрохирурга: эхоэнцефалограф, негатоскоп, стандартная мебель.", kz: "Нейрохирург кеңесу кабинетін жабдықтау: эхоэнцефалограф, негатоскоп, стандартты жиһаз.", en: "Neurosurgeon's consultation office: echoencephalograph, negatoscope, standard furniture." },
    items: [
      ...std("neurochir"),
      { id: "neurochir-echo",   name: { ru: "Эхоэнцефалограф",  kz: "Эхоэнцефалограф", en: "Echoencephalograph" }, model: "СОНОМЕД-315-С", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 1243940), LAB_TECH(1300000)] },
      { id: "neurochir-negat",  name: { ru: "Негатоскоп",        kz: "Негатоскоп",       en: "Negatoscope"        }, model: "НМ-02",         category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(84500), LAB_TECH(88000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 12. НЕФРОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "nephrologist", sectionCategory: "ambulatory", order: 21, iconKey: "stethoscope",
    totalEstimate: 2484951,
    name: { ru: "Кабинет нефролога",           kz: "Нефролог кабинеті",         en: "Nephrologist's Office"     },
    description: { ru: "Оснащение кабинета нефролога: ростомер/весы, ЭКГ, спирограф, суточный монитор АД.", kz: "Нефролог кабинетін жабдықтау: бойөлшер/таразы, ЭКГ, спирограф, тәуліктік АД монитор.", en: "Nephrologist's office: height-weight scale, ECG, spirograph, 24h blood pressure monitor." },
    items: [
      ...std("neph"),
      procT("neph"),
      kit("neph"),
      { id: "neph-scale",  name: { ru: "Ростомер / весы медицинские",   kz: "Бойөлшер / медициналық таразы",  en: "Height / Weight Scale"  }, model: "Р-03 + ВЭМ-150", category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(152300), MED_SOL(155000)] },
      { id: "neph-ecg",    name: { ru: "Электрокардиограф 12-канальный", kz: "12 арналы ЭКГ",                   en: "12-lead ECG"            }, model: "Поли-Спектр-8/Е",  category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spektr-8e", 450000), LAB_TECH(480000)] },
      { id: "neph-spiro",  name: { ru: "Спирограф компьютерный",         kz: "Компьютерлік спирограф",          en: "Computerised Spirograph"}, model: "Спиро-Спектр",      category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-spiro-spektr", 569273), LAB_TECH(590000)] },
      { id: "neph-abpm",   name: { ru: "Суточный монитор АД",            kz: "Тәуліктік АД монитор",           en: "24h Blood Pressure Monitor"}, model: "БиПиЛАБ",        category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-bplab", 1078178), MED_SOL(1100000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 13. ОНКОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "oncologist", sectionCategory: "ambulatory", order: 22, iconKey: "stethoscope",
    totalEstimate: 626500,
    name: { ru: "Кабинет онколога",            kz: "Онколог кабинеті",          en: "Oncologist's Office"       },
    description: { ru: "Стандартное оснащение консультативного кабинета онколога: мебель, компьютер, рециркулятор воздуха, кушетка.", kz: "Онколог кеңесу кабинетін стандартты жабдықтау.", en: "Standard oncologist's consultation office: furniture, computer, air recirculator." },
    items: [...std("onco"), kit("onco")],
  },

  // ═══════════════════════════════════════════
  // 14. ОТОРИНОЛАРИНГОЛОГ (ЛОР)
  // ═══════════════════════════════════════════
  {
    slug: "ent", sectionCategory: "ambulatory", order: 23, iconKey: "ear",
    totalEstimate: 7972208,
    name: { ru: "Кабинет оториноларинголога (ЛОР)", kz: "Оториноларинголог (ЛОР) кабинеті", en: "ENT Office" },
    description: { ru: "Оснащение ЛОР-кабинета: рабочая станция ЛОР-врача, аудиометрический комплекс, аппарат Тонзиллор, кресло Барани, инструментальный набор, УФ-камера.", kz: "ЛОР кабинетін жабдықтау: ЛОР дәрігерінің жұмыс станциясы, аудиометриялық кешен, Тонзиллор аппараты, Барани кресло.", en: "ENT office: ENT workstation, audiometry complex, Tonsillor device, Barany chair, instrument set, UV cabinet." },
    items: [
      ...std("ent"),
      procT("ent"),
      { id: "ent-workstation", name: { ru: "Рабочая станция ЛОР-врача",     kz: "ЛОР дәрігері жұмыс станциясы", en: "ENT Workstation"        }, model: "NET 600A (Mega Medical)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 3200000), MED_SOL(3300000)] },
      { id: "ent-audiom",      name: { ru: "Аудиометрический комплекс",      kz: "Аудиометриялық кешен",           en: "Audiometry Complex"      }, model: "Нейро-Аудио",            category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuro-audio", 4200708), LAB_TECH(4350000)] },
      { id: "ent-tonsillor",   name: { ru: "Аппарат Тонзиллор (тонзиллэктомия)", kz: "Тонзиллор аппараты",        en: "Tonsillor Device"        }, model: "Тонзиллор-ММ",           category: "equipment", quantity: 1, unit: "шт.", suppliers: [MED_SOL(2842600), LAB_TECH(2900000)] },
      { id: "ent-barany",      name: { ru: "Кресло вращательное (Барани)",   kz: "Айналмалы Барани кресло",        en: "Rotating Barany Chair"  }, model: "СК-01",                  category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(109900), MED_SOL(112000)] },
      { id: "ent-instrum",     name: { ru: "Набор инструментов ЛОР",         kz: "ЛОР инструменттер жинағы",       en: "ENT Instrument Set"     }, model: "НИП-«МТ»",               category: "consumable", quantity: 1, unit: "шт.", suppliers: [LAB_TECH(184800), MED_SOL(190000)] },
      { id: "ent-uv",          name: { ru: "Камера УФ-обеззараживания",      kz: "УК зарарсыздандыру камерасы",    en: "UV Sterilisation Cabinet" }, model: "УФК-1",                category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(156000), LAB_TECH(160000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 15. ОФТАЛЬМОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "ophthalmologist", sectionCategory: "ambulatory", order: 24, iconKey: "eye",
    totalEstimate: 23600000,
    name: { ru: "Кабинет офтальмолога",        kz: "Офтальмолог кабинеті",      en: "Ophthalmologist's Office"  },
    description: { ru: "Полное оснащение офтальмологического кабинета: щелевая лампа / рабочая станция, автокераторефрактометр, бесконтактный тонометр, проектор знаков, офтальмоскоп, периметр.", kz: "Офтальмологиялық кабинетті толық жабдықтау: саңылау шамы, авторефрактометр, бесконтактты тонометр, пеример.", en: "Full ophthalmology room: slit lamp workstation, autorefractometer, non-contact tonometer, chart projector, ophthalmoscope, perimeter." },
    items: [
      ...std("ophthal"),
      { id: "ophthal-workst",  name: { ru: "Рабочая станция офтальмолога (щелевая лампа)", kz: "Офтальмолог жұмыс станциясы", en: "Ophthalmologist Workstation (Slit Lamp)" }, model: "HRT-7000 (Huvitz)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 3976900), MED_SOL(4100000)] },
      { id: "ophthal-autoref",  name: { ru: "Авторефкератометр",             kz: "Авторефкератометр",    en: "Autorefractometer"           }, model: "HRK-7000A (Huvitz)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 3668100), MED_SOL(3750000)] },
      { id: "ophthal-tonometer",name: { ru: "Тонометр бесконтактный",        kz: "Бесконтактты тонометр", en: "Non-contact Tonometer"       }, model: "HNT-7000 (Huvitz)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 3261600), MED_SOL(3350000)] },
      { id: "ophthal-projector",name: { ru: "Проектор знаков",               kz: "Таңба проекторы",       en: "Chart Projector"             }, model: "HCP-7000 (Huvitz)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 1165900), MED_SOL(1200000)] },
      { id: "ophthal-scope",    name: { ru: "Офтальмоскоп прямой",           kz: "Тікелей офтальмоскоп", en: "Direct Ophthalmoscope"        }, model: "Eurolight E10 (KaWe)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 117600), LAB_TECH(120000)] },
      { id: "ophthal-helmet",   name: { ru: "Офтальмоскоп налобный",         kz: "Налобты офтальмоскоп", en: "Binocular Indirect Ophthalmoscope" }, model: "Heine Omega 500", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 2889600), MED_SOL(2950000)] },
      { id: "ophthal-perimeter",name: { ru: "Периметр автоматический",       kz: "Автоматты периметр",   en: "Automated Perimeter"          }, model: "AP-3000 (Tomey)",   category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 7938000), MED_SOL(8100000)] },
      { id: "ophthal-kit",      name: { ru: "Набор офтальмолога",            kz: "Офтальмолог жинағы",  en: "Ophthalmologist's Kit"         }, model: "НПОЛб-254 Orion M", category: "consumable", quantity: 1, unit: "шт.", suppliers: [LAB_TECH(929000), MED_SOL(950000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 16. ПЕДИАТР
  // ═══════════════════════════════════════════
  {
    slug: "pediatrician", sectionCategory: "ambulatory", order: 25, iconKey: "baby",
    totalEstimate: 1200000,
    name: { ru: "Кабинет педиатра",            kz: "Педиатр кабинеті",          en: "Pediatrician's Office"     },
    description: { ru: "Оснащение кабинета педиатра: ростомер, весы, пеленальный столик, пульсоксиметр, стандартная мебель, набор врача.", kz: "Педиатр кабинетін жабдықтау: бойөлшер, таразы, пеленальный үстел, пульсоксиметр.", en: "Pediatrician's office: height/weight scale, changing table, pulse oximeter, doctor's kit." },
    items: [
      ...std("ped"),
      procT("ped"),
      { id: "ped-scale",   name: { ru: "Ростомер / весы медицинские", kz: "Бойөлшер / медициналық таразы", en: "Height / Weight Scale"  }, model: "Р-03 + ВЭМ-150", category: "equipment",  quantity: 1, unit: "шт.", suppliers: [KAZMED(92000), MED_SOL(95000)] },
      { id: "ped-change",  name: { ru: "Столик пеленальный",           kz: "Пеленалық үстел",               en: "Changing Table"         }, model: null,              category: "furniture",  quantity: 1, unit: "шт.", suppliers: [ZETA(14000), MED_SOL(15000)] },
      { id: "ped-ox",      name: { ru: "Пульсоксиметр",                kz: "Пульсоксиметр",                 en: "Pulse Oximeter"         }, model: "IP-1010",         category: "equipment",  quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 294900), MED_SOL(300000)] },
      kit("ped"),
    ],
  },

  // ═══════════════════════════════════════════
  // 17. ПСИХОФИЗИОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "psychophysiologist", sectionCategory: "ambulatory", order: 26, iconKey: "brain",
    totalEstimate: 5500000,
    name: { ru: "Кабинет психофизиолога",      kz: "Психофизиолог кабинеті",    en: "Psychophysiologist's Office"},
    description: { ru: "Оснащение кабинета психофизиолога: комплекс НС-ПсихоТест для психофизиологического тестирования, кресло пациента, стандартная мебель.", kz: "Психофизиолог кабинетін жабдықтау: НС-ПсихоТест кешені, пациент кресло, стандартты жиһаз.", en: "Psychophysiologist's office: NS-PsychoTest complex for psychophysiological testing, patient chair, standard furniture." },
    items: [
      ...std("psycho"),
      { id: "psycho-pchair",  name: { ru: "Кресло пациента",               kz: "Пациент кресло",    en: "Patient Chair"             }, model: "Olsen Industria",   category: "furniture",  quantity: 1, unit: "шт.", suppliers: [MED_SOL(2355700), LAB_TECH(2400000)] },
      procT("psycho"),
      kit("psycho"),
      { id: "psycho-test",    name: { ru: "Комплекс психофизиологического тестирования НС-ПсихоТест", kz: "НС-ПсихоТест кешені", en: "Psychophysiological Testing Complex NS-PsychoTest" }, model: "НС-ПсихоТест (полная версия)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-psychotest", 3040900), LAB_TECH(3100000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 18. СОМНОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "somnologist", sectionCategory: "ambulatory", order: 27, iconKey: "brain",
    totalEstimate: 11000000,
    name: { ru: "Кабинет сомнолога",           kz: "Сомнолог кабинеті",         en: "Somnologist's Office"      },
    description: { ru: "Оснащение кабинета сомнолога: ЭЭГ-полиграф для исследования сна (полисомнография), программа сонографии, кресло пациента.", kz: "Сомнолог кабинетін жабдықтау: ұйқыны зерттеуге арналған ЭЭГ-полиграф (полисомнография), ұйқы бағдарламасы.", en: "Somnologist's office: EEG polysomnograph for sleep study, sleep software, patient chair." },
    items: [
      ...std("somno"),
      { id: "somno-pchair",  name: { ru: "Кресло пациента",               kz: "Пациент кресло",     en: "Patient Chair"           }, model: "Olsen Industria",   category: "furniture",  quantity: 1, unit: "шт.", suppliers: [MED_SOL(2355700), LAB_TECH(2400000)] },
      procT("somno"),
      kit("somno"),
      { id: "somno-eeg",     name: { ru: "ЭЭГ-полиграф (нейрон-спектр 5)", kz: "ЭЭГ-полиграф",      en: "EEG Polysomnograph"       }, model: "Нейрон-Спектр-5", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuron-spectrum-5", 4959942), LAB_TECH(5100000)] },
      { id: "somno-psg",     name: { ru: "Программа полисомнографии",      kz: "Полисомнография бағдарламасы", en: "Polysomnography Software" }, model: "Нейрон-Спектр-PSG", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuron-spectrum-psg", 2965622), MED_SOL(3050000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 19. СТОМАТОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "dentist", sectionCategory: "ambulatory", order: 28, iconKey: "stethoscope",
    totalEstimate: 876300,
    name: { ru: "Кабинет стоматолога",         kz: "Стоматолог кабинеті",       en: "Dental Office"             },
    description: { ru: "Оснащение стоматологического кабинета: стоматологическая установка, стерилизационный шкаф УФ, инструментальный стол, медицинская мебель.", kz: "Стоматологиялық кабинетті жабдықтау: стоматологиялық қондырғы, УК стерилизациялық шкаф, инструменттер үстелі.", en: "Dental office: dental unit, UV sterilisation cabinet, instrument table, medical furniture." },
    items: [
      { id: "dent-desk",     name: { ru: "Стол врачебный",       kz: "Дәрігерлік үстел",   en: "Doctor's Desk"         }, model: "СК 12",    category: "furniture",  quantity: 1, unit: "шт.",    suppliers: [ZETA(28500), LAB_TECH(30000)] },
      { id: "dent-chairs",   name: { ru: "Стулья",               kz: "Орындықтар",         en: "Chairs"                }, model: "СМ 7/1",   category: "furniture",  quantity: 2, unit: "шт.",    suppliers: [ZETA(8000),  LAB_TECH(7500)]  },
      { id: "dent-cabinet",  name: { ru: "Шкаф универсальный",   kz: "Әмбебап шкаф",       en: "Universal Cabinet"     }, model: "ШР 2",     category: "furniture",  quantity: 1, unit: "шт.",    suppliers: [ZETA(50200), MED_SOL(52000)]  },
      { id: "dent-recirc",   name: { ru: "Рециркулятор воздуха", kz: "Ауа рециркуляторы",  en: "Air Recirculator"      }, model: "Тион А100",category: "equipment",  quantity: 1, unit: "шт.",    suppliers: [SUNCAR(null, 197000), LAB_TECH(195000)] },
      procT("dent"),
      { id: "dent-uv",       name: { ru: "Камера УФ-обеззараживания",   kz: "УК зарарсыздандыру камерасы", en: "UV Sterilisation Cabinet" }, model: "УФК-1", category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(156000), LAB_TECH(160000)] },
      { id: "dent-unit",     name: { ru: "Стоматологическая установка", kz: "Стоматологиялық қондырғы",    en: "Dental Unit"              }, model: "Ultra Performance E (Ritter Concept)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [MED_SOL(1500000), LAB_TECH(1550000)] },
      { id: "dent-instrum",  name: { ru: "Инструменты стоматологические (набор)", kz: "Стоматологиялық инструменттер жинағы", en: "Dental Instrument Set" }, model: null, category: "consumable", quantity: 1, unit: "комплект", suppliers: [LAB_TECH(50000), MED_SOL(52000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 20. СУРДОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "surdologist", sectionCategory: "ambulatory", order: 29, iconKey: "ear",
    totalEstimate: 4878008,
    name: { ru: "Кабинет сурдолога",           kz: "Сурдолог кабинеті",         en: "Audiologist's (Surdology) Office" },
    description: { ru: "Оснащение кабинета сурдолога: аудиометрический комплекс Нейро-Аудио для исследования вызванных потенциалов и ОАЭ, стандартная медицинская мебель.", kz: "Сурдолог кабинетін жабдықтау: Нейро-Аудио аудиометриялық кешені.", en: "Audiologist's office: Neuro-Audio audiometry complex for evoked potentials and OAE, standard medical furniture." },
    items: [
      { id: "surd-desk",    name: { ru: "Стол врачебный",       kz: "Дәрігерлік үстел",   en: "Doctor's Desk"    }, model: "СК 12",    category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(28500), LAB_TECH(30000)] },
      { id: "surd-chairs",  name: { ru: "Стулья",               kz: "Орындықтар",         en: "Chairs"           }, model: "СМ 7/1",   category: "furniture", quantity: 2, unit: "шт.",     suppliers: [ZETA(8000),  LAB_TECH(7500)]  },
      { id: "surd-cabinet", name: { ru: "Шкаф универсальный",   kz: "Әмбебап шкаф",       en: "Universal Cabinet"}, model: "ШР 2",     category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(50200), MED_SOL(52000)]  },
      { id: "surd-bedside", name: { ru: "Тумбочка",             kz: "Тумбочка",           en: "Bedside Table"    }, model: "ТВ 3",     category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(27200)]                  },
      { id: "surd-couch",   name: { ru: "Кушетка медицинская",  kz: "Медициналық кушетка", en: "Medical Couch"   }, model: null,       category: "furniture", quantity: 1, unit: "шт.",     suppliers: [ZETA(30600), LAB_TECH(32000)] },
      { id: "surd-recirc",  name: { ru: "Рециркулятор воздуха", kz: "Ауа рециркуляторы",  en: "Air Recirculator" }, model: "Тион А100",category: "equipment", quantity: 1, unit: "шт.",     suppliers: [SUNCAR(null, 197000), LAB_TECH(195000)] },
      procT("surd"),
      { id: "surd-audiom",  name: { ru: "Аудиометрический комплекс Нейро-Аудио", kz: "Нейро-Аудио аудиометриялық кешені", en: "Neuro-Audio Audiometry Complex" }, model: "Нейро-Аудио (ВП и ОАЭ)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-neuro-audio", 4200708), LAB_TECH(4350000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 21. ТЕРАПЕВТ
  // ═══════════════════════════════════════════
  {
    slug: "therapist", sectionCategory: "ambulatory", order: 30, iconKey: "stethoscope",
    totalEstimate: 10000000,
    name: { ru: "Кабинет терапевта",           kz: "Терапевт кабинеті",         en: "General Practitioner's Office" },
    description: { ru: "Оснащение кабинета терапевта: ростомер, ЭКГ, суточные мониторы АД, холтер ЭКГ, глюкометр, спирограф, УЗИ-аппарат.", kz: "Терапевт кабинетін жабдықтау: бойөлшер, ЭКГ, тәуліктік АД мониторлары, Холтер ЭКГ, глюкометр, спирограф, УДЗ аппараты.", en: "GP office: height scale, ECG, ABPM monitors, Holter ECG, glucometer, spirograph, ultrasound." },
    items: [
      ...std("ther"),
      procT("ther"),
      kit("ther"),
      { id: "ther-scale",  name: { ru: "Ростомер / весы медицинские",   kz: "Бойөлшер / таразы",   en: "Height/Weight Scale"    }, model: "Р-03 + ВЭМ-150", category: "equipment", quantity: 1, unit: "шт.", suppliers: [KAZMED(92000), MED_SOL(95000)] },
      { id: "ther-ecg",    name: { ru: "Электрокардиограф 12-канальный", kz: "12 арналы ЭКГ",       en: "12-lead ECG"            }, model: "Поли-Спектр-8/Е",  category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spektr-8e", 450000), LAB_TECH(480000)] },
      { id: "ther-abpm",   name: { ru: "Суточный монитор АД (x2)",       kz: "Тәуліктік АД монитор (x2)", en: "24h ABPM (x2)"    }, model: "БиПиЛАБ",          category: "equipment", quantity: 2, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-bplab", 1078178), MED_SOL(1100000)] },
      { id: "ther-holter", name: { ru: "Холтер ЭКГ (x2)",               kz: "Холтер ЭКГ (x2)",     en: "Holter ECG (x2)"        }, model: "Поли-Спектр-СМ",   category: "equipment", quantity: 2, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-poly-spectrum-sm", 1173578), LAB_TECH(1200000)] },
      { id: "ther-gluco",  name: { ru: "Глюкометр",                      kz: "Глюкометр",           en: "Glucometer"             }, model: "iDiA (IME-DC)",    category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 7000), LAB_TECH(7500)] },
      { id: "ther-spiro",  name: { ru: "Спирограф компьютерный",         kz: "Компьютерлік спирограф", en: "Computerised Spirograph" }, model: "Спиро-Спектр",  category: "equipment", quantity: 1, unit: "шт.", suppliers: [NEIROSOFT("neirosoft-spiro-spektr", 569273), LAB_TECH(590000)] },
      { id: "ther-uzi",    name: { ru: "УЗИ-аппарат",                    kz: "УДЗ аппараты",        en: "Ultrasound Machine"     }, model: "Arrieta V60 (Hitachi)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR("hitachi-arietta-v60", 4409207), MED_SOL(4550000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 22. ТРАВМАТОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "traumatologist", sectionCategory: "ambulatory", order: 31, iconKey: "bone",
    totalEstimate: 1150000,
    name: { ru: "Кабинет травматолога",        kz: "Травматолог кабинеті",      en: "Traumatologist's Office"   },
    description: { ru: "Оснащение кабинета травматолога: гипсовый стол, каталка-носилки, негатоскоп, стандартная мебель.", kz: "Травматолог кабинетін жабдықтау: гипс үстелі, арба-носилка, негатоскоп, стандартты жиһаз.", en: "Traumatologist's office: plaster table, stretcher-trolley, negatoscope, standard furniture." },
    items: [
      ...std("trauma"),
      { id: "trauma-plaster",  name: { ru: "Стол гипсовальный",       kz: "Гипс үстелі",        en: "Plaster Table"       }, model: null,         category: "furniture",  quantity: 1, unit: "шт.", suppliers: [KAZMED(60000), MED_SOL(62000)] },
      { id: "trauma-stretcher",name: { ru: "Каталка-носилки",          kz: "Арба-носилка",       en: "Stretcher-Trolley"   }, model: "ТК-03",      category: "equipment",  quantity: 1, unit: "шт.", suppliers: [KAZMED(319900), MED_SOL(325000)] },
      { id: "trauma-negat",    name: { ru: "Негатоскоп",               kz: "Негатоскоп",         en: "Negatoscope"         }, model: "НМ-02",      category: "equipment",  quantity: 1, unit: "шт.", suppliers: [KAZMED(84500), LAB_TECH(88000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 23. УРОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "urologist", sectionCategory: "ambulatory", order: 32, iconKey: "stethoscope",
    totalEstimate: 105626500,
    name: { ru: "Кабинет уролога",             kz: "Уролог кабинеті",           en: "Urologist's Office"        },
    description: { ru: "Оснащение урологического кабинета: литотриптер экстракорпоральный ударно-волновой, стандартная мебель.", kz: "Урологиялық кабинетті жабдықтау: экстракорпоральды соққы-толқынды литотриптер, стандартты жиһаз.", en: "Urology office: extracorporeal shock wave lithotripter, standard furniture." },
    items: [
      ...std("urol"),
      { id: "urol-lithotr", name: { ru: "Литотриптер экстракорпоральный ударно-волновой", kz: "Экстракорпоральды соққы-толқынды литотриптер", en: "Extracorporeal Shock Wave Lithotripter" }, model: "Compact Sigma (Dornier)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 105000000), MED_SOL(107000000)] },
    ],
  },

  // ═══════════════════════════════════════════
  // 24. ХИРУРГ
  // ═══════════════════════════════════════════
  {
    slug: "surgeon", sectionCategory: "ambulatory", order: 33, iconKey: "scissors",
    totalEstimate: 2600000,
    name: { ru: "Кабинет хирурга",             kz: "Хирург кабинеті",           en: "Surgeon's Office"          },
    description: { ru: "Оснащение кабинета хирурга: набор инструментов поликлинический, светильники передвижные, рециркулятор воздуха.", kz: "Хирург кабинетін жабдықтау: поликлиникалық инструменттер жинағы, жылжымалы шамдар, ауа рециркуляторы.", en: "Surgeon's office: surgical instrument set (polyclinic), mobile surgical lights, air recirculator." },
    items: [
      { id: "surg-desk",    name: { ru: "Стол врачебный",        kz: "Дәрігерлік үстел",   en: "Doctor's Desk"         }, model: "СК 12",   category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(28500), LAB_TECH(30000)] },
      { id: "surg-chairs",  name: { ru: "Стулья",                kz: "Орындықтар",         en: "Chairs"                }, model: "СМ 7/1",  category: "furniture",  quantity: 2, unit: "шт.",     suppliers: [ZETA(8000),  LAB_TECH(7500)]  },
      { id: "surg-cabinet", name: { ru: "Шкаф универсальный",    kz: "Әмбебап шкаф",       en: "Universal Cabinet"     }, model: "ШР 2",    category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(50200), MED_SOL(52000)]  },
      { id: "surg-bedside", name: { ru: "Тумбочка",              kz: "Тумбочка",           en: "Bedside Table"         }, model: "ТВ 3",    category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(27200)]                  },
      { id: "surg-couch",   name: { ru: "Кушетка медицинская",   kz: "Медициналық кушетка", en: "Medical Couch"        }, model: null,      category: "furniture",  quantity: 1, unit: "шт.",     suppliers: [ZETA(30600), LAB_TECH(32000)] },
      { id: "surg-recirc",  name: { ru: "Рециркулятор воздуха",  kz: "Ауа рециркуляторы",  en: "Air Recirculator"      }, model: "Тион А100",category: "equipment", quantity: 1, unit: "шт.",     suppliers: [SUNCAR(null, 197000), LAB_TECH(195000)] },
      { id: "surg-light",   name: { ru: "Светильник передвижной (x2)", kz: "Жылжымалы шам (x2)", en: "Mobile Surgical Light (x2)" }, model: "ПР-6-12 ARLAN", category: "equipment", quantity: 2, unit: "шт.", suppliers: [KAZMED(784700), MED_SOL(800000)] },
      { id: "surg-instrum", name: { ru: "Набор инструментов поликлинический", kz: "Поликлиникалық инструменттер жинағы", en: "Polyclinic Instrument Set" }, model: "НИП-«МТ»", category: "consumable", quantity: 1, unit: "шт.", suppliers: [LAB_TECH(974400), MED_SOL(990000)] },
      kit("surg"),
    ],
  },

  // ═══════════════════════════════════════════
  // 25. ЭНДОКРИНОЛОГ
  // ═══════════════════════════════════════════
  {
    slug: "endocrinologist", sectionCategory: "ambulatory", order: 34, iconKey: "stethoscope",
    totalEstimate: 3853500,
    name: { ru: "Кабинет эндокринолога",       kz: "Эндокринолог кабинеті",     en: "Endocrinologist's Office"  },
    description: { ru: "Оснащение кабинета эндокринолога: инсулиновая помпа, капилляроскоп, биоимпедансометр, глюкометр, стандартная мебель.", kz: "Эндокринолог кабинетін жабдықтау: инсулиндік сорғы, капилляроскоп, биоимпедансометр, глюкометр.", en: "Endocrinologist's office: insulin pump, capillaroscope, bioimpedance analyser, glucometer, standard furniture." },
    items: [
      ...std("endo"),
      { id: "endo-pump",   name: { ru: "Инсулиновая помпа",            kz: "Инсулиндік сорғы",    en: "Insulin Pump"              }, model: "DANA Diabecare IIS (Sooil)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 680000), MED_SOL(695000)] },
      { id: "endo-capil",  name: { ru: "Капилляроскоп цифровой",       kz: "Цифрлық капилляроскоп", en: "Digital Capillaroscope"  }, model: "CapillaryScope 500 Pro",    category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 340000), MED_SOL(350000)] },
      { id: "endo-bioimp", name: { ru: "Биоимпедансометр (анализатор состава тела)", kz: "Биоимпедансометр", en: "Bioimpedance Analyser" }, model: "S10 (Biospace)", category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 2200000), MED_SOL(2250000)] },
      { id: "endo-gluco",  name: { ru: "Глюкометр",                    kz: "Глюкометр",           en: "Glucometer"                }, model: "iDiA (IME-DC)",             category: "equipment", quantity: 1, unit: "шт.", suppliers: [SUNCAR(null, 7000), LAB_TECH(7500)] },
    ],
  },

];

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const col = collection(db, "offices");

  for (const office of offices) {
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

  console.log("\n✅ Done seeding front offices.");
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
