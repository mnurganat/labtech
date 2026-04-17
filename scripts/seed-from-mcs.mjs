/**
 * Seed script: real data from mcs.kz
 * - Updates existing products with real image URLs
 * - Adds new products from mcs.kz catalog
 * - Updates brands collection with real logo URLs
 *
 * Run: node scripts/seed-from-mcs.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, getDocs, query, where, limit,
  doc, updateDoc, setDoc, writeBatch,
} from "firebase/firestore";

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

// ────────────────────────────────────────────────────────────────────────────
// 1. UPDATE EXISTING PRODUCTS — add real imageUrl from mcs.kz
// ────────────────────────────────────────────────────────────────────────────
const imageUpdates = {
  "neirosoft-poly-spectrum-sm":  "https://mcs.kz/wp-content/uploads/2021/04/full_218_250.png",
  "neirosoft-neuron-spectrum-5": "https://mcs.kz/wp-content/uploads/2021/04/11124_648199_12.jpg",
  "neirosoft-neuro-mvp-8":       "https://mcs.kz/wp-content/uploads/2021/04/full___________________6.png",
};

// ────────────────────────────────────────────────────────────────────────────
// 2. NEW PRODUCTS from mcs.kz
// ────────────────────────────────────────────────────────────────────────────
const newProducts = [
  // ── Cardiology: Poly-Spektr-8/E ──────────────────────────────────────────
  {
    slug: "neirosoft-poly-spektr-8e",
    category: "cardiology",
    brand: "Нейрософт",
    isBestseller: false,
    imageUrl: "https://mcs.kz/wp-content/uploads/2021/04/97861_392617_15.png",
    name: {
      ru: "Электрокардиограф «Поли-Спектр-8/Е»",
      kz: "Электрокардиограф «Поли-Спектр-8/Е»",
      en: "Electrocardiograph «Poly-Spektr-8/E»",
    },
    description: {
      ru: "Компьютерный 12-канальный электрокардиограф. Подключается к компьютеру через USB-порт и обеспечивает одновременную запись стандартных отведений ЭКГ. В состав базового программного обеспечения входят программы «Поли-Спектр-Экспресс» и «Поли-Спектр-Анализ» — для автоматического контурного анализа с синдромальными заключениями. Дополнительные модули: вариабельность сердечного ритма, дисперсия Q-T, поздние потенциалы желудочков, проба с нагрузкой.",
      kz: "Компьютерлік 12 арналы электрокардиограф. USB арқылы компьютерге қосылып, стандартты ЭКГ тіркеуін бір мезгілде жүзеге асырады. Базалық бағдарламалық жасақтамада «Поли-Спектр-Экспресс» және «Поли-Спектр-Анализ» бар — синдромалдық қорытынды беретін автоматты талдау.",
      en: "12-channel computer ECG. Connects via USB, records all standard leads simultaneously. Base software: Poly-Spektr-Express and Poly-Spektr-Analysis for automatic contour analysis with syndromal conclusions. Optional modules: HRV, QT dispersion, late ventricular potentials, stress testing.",
    },
    specs: {
      ru: ["12 высококачественных стандартных отведений ЭКГ", "USB-подключение к компьютеру", "Автоматический контурный анализ ЭКГ с синдромальными заключениями", "Модуль вариабельности сердечного ритма (опция)", "Модуль Q-T дисперсии (опция)", "Обнаружение поздних потенциалов желудочков (опция)", "Проба с нагрузкой (опция)", "Пьезоэлектрический датчик пульса"],
      en: ["12 standard ECG leads", "USB connection", "Automatic ECG analysis with syndromal conclusions", "HRV module (optional)", "QT dispersion module (optional)", "Late ventricular potential detection (optional)", "Stress testing (optional)", "Piezoelectric pulse sensor"],
      kz: ["12 стандартты ЭКГ отводы", "USB қосылымы", "Синдромалдық қорытынды беретін автоматты ЭКГ талдауы", "Жүрек ырғағы өзгермелілігі модулі (опция)", "Q-T дисперсиясы модулі (опция)"],
    },
    bundle: {
      ru: ["Блок ЭКГ (USB)", "Кабель отведений 1.3 м", "4 электрода для конечностей (многоразовые, взрослые)", "6 грудных электродов", "Контактная жидкость для электродов (200 г)", "ПО «Поли-Спектр.NET» с модулем анализа", "Сумка для переноски", "Руководство пользователя"],
      en: ["ECG block (USB)", "1.3m lead cable", "4 reusable limb electrodes (adult)", "6 chest electrodes", "Electrode contact fluid (200g)", "Poly-Spektr.NET software with analysis module", "Carry case", "User manual"],
      kz: ["ЭКГ блогы (USB)", "1.3 м кабель", "4 қайта пайдаланылатын электрод", "6 кеуде электроды", "Электрод контактты сұйықтығы 200г", "Поли-Спектр.NET бағдарламасы", "Тасымалдау сөмкесі", "Нұсқаулық"],
    },
    faq: [
      {
        q: { ru: "Подходит ли прибор для скрининга в поликлинике?", en: "Is the device suitable for clinic screening?", kz: "Аппарат поликлиникадағы скринингке жарамды ма?" },
        a: { ru: "Да, Поли-Спектр-8/Е разработан именно для высокого потока пациентов — быстрое подключение, автоматическое заключение и возможность хранения архива исследований.", en: "Yes, Poly-Spektr-8/E is designed for high patient throughput — fast connection, automatic conclusion, and study archive storage.", kz: "Иә, Поли-Спектр-8/Е жоғары пациент ағымы үшін жасалған — жылдам қосу, автоматты қорытынды, архив сақтау." },
      },
      {
        q: { ru: "Можно ли использовать без принтера?", en: "Can it be used without a printer?", kz: "Принтерсіз пайдалануға болады ма?" },
        a: { ru: "Да, результаты сохраняются в цифровом виде и могут быть переданы по сети или экспортированы в PDF без необходимости немедленной печати.", en: "Yes, results are saved digitally and can be shared over the network or exported to PDF without immediate printing.", kz: "Иә, нәтижелер цифрлы сақталады және желі арқылы жіберілуі немесе PDF-қа экспортталуы мүмкін." },
      },
    ],
  },

  // ── Cardiology: BPLab СМАД ──────────────────────────────────────────────
  {
    slug: "neirosoft-bplab-smad",
    category: "cardiology",
    brand: "Нейрософт",
    isBestseller: false,
    imageUrl: "https://mcs.kz/wp-content/uploads/2021/04/full_BPLab.jpg",
    name: {
      ru: "Суточный монитор АД «BPLab»",
      kz: "«BPLab» тәуліктік АҚ мониторы",
      en: "24-Hour Blood Pressure Monitor «BPLab»",
    },
    description: {
      ru: "Первый отечественный суточный монитор артериального давления, валидированный по протоколу ESH-2001. Аппарат отличается высокой помехозащищённостью и достаточным комфортом при ношении, обеспечивает точность измерений, ранее доступную только аускультативным методам. Признан организацией Dabl Educational Trust как прибор для правильного обучения измерению АД. Поддерживается более 10 отечественных холтеровских систем для одновременного мониторирования ЭКГ+АД.",
      kz: "ESH-2001 хаттамасы бойынша тексерілген алғашқы отандық тәуліктік артериялық қысым мониторы. Жоғары кедергіге төзімділігімен және ыңғайлылығымен ерекшеленеді. 10-нан астам отандық холтерлік жүйемен бір мезгілде ЭКГ+АҚ мониторлауы мүмкін.",
      en: "Russia's first ambulatory blood pressure monitor validated by ESH-2001 protocol. High noise immunity and comfort during use, delivering accuracy previously achievable only with auscultatory methods. Recognized by Dabl Educational Trust. Compatible with 10+ Holter systems for simultaneous ECG+BP monitoring.",
    },
    specs: {
      ru: ["Метод измерения: осциллометрический (плечевое пережатие)", "Хранение записей пульсовых волн для контроля результатов", "Педиатрический режим", "Модуль активности и положения тела", "Совместимость с 10+ холтеровскими системами", "ПО для Windows и Linux", "Соответствие IEC 60601-2-30:1999"],
      en: ["Method: oscillometric (brachial occlusion)", "Pulse wave recording storage", "Paediatric mode", "Activity and position module", "Compatible with 10+ Holter systems", "Windows and Linux software", "IEC 60601-2-30:1999 compliant"],
      kz: ["Өлшеу әдісі: осциллометрлік", "Пульстік толқын жазбасы", "Педиатриялық режим", "Белсенділік және дене қалпы модулі", "10+ холтерлік жүйемен үйлесімді"],
    },
    bundle: {
      ru: ["Блок монитора BPLab", "Сумка с плечевым и поясным ремнями", "Манжеты 24–32 см и 32–42 см", "Кабель для подключения к компьютеру", "Аккумулятор и зарядное устройство", "Пакет программного обеспечения", "Удлинительный шланг"],
      en: ["BPLab monitor unit", "Carrying bag with shoulder/waist straps", "Cuffs 24–32 cm and 32–42 cm", "Computer connection cable", "Battery and charger", "Software package", "Extension hose"],
      kz: ["BPLab монитор блогы", "Иық/бел ремешогы бар сөмке", "24–32 см және 32–42 см манжеттер", "Компьютерге қосылу кабелі", "Аккумулятор мен зарядтағыш", "Бағдарламалық жасақтама", "Ұзартқыш шланг"],
    },
    faq: [
      {
        q: { ru: "Можно ли проводить мониторинг у детей?", en: "Can monitoring be performed in children?", kz: "Балаларда мониторинг жүргізуге болады ма?" },
        a: { ru: "Да, в комплект входят манжеты разных размеров, а в ПО есть педиатрические нормативы для корректной интерпретации у детей.", en: "Yes, the kit includes different cuff sizes and the software has paediatric reference values for correct interpretation.", kz: "Иә, жиынтықта әртүрлі өлшемдегі манжеттер бар, ал бағдарламада педиатриялық нормативтер бар." },
      },
      {
        q: { ru: "Как долго работает аккумулятор при стандартном режиме?", en: "How long does the battery last in standard mode?", kz: "Стандартты режимде аккумулятор қанша уақыт жұмыс істейді?" },
        a: { ru: "При стандартном режиме (каждые 30 минут) аккумулятора хватает на 36–48 часов, что позволяет провести двусуточный мониторинг без замены.", en: "In standard mode (every 30 minutes), the battery lasts 36–48 hours, enabling two-day monitoring without replacement.", kz: "Стандартты режимде (30 минут сайын) аккумулятор 36–48 сағат жұмыс істейді — екі тәуліктік мониторлауға жеткілікті." },
      },
    ],
  },

  // ── Neurology: Нейрон-Спектр-ДВП ────────────────────────────────────────
  {
    slug: "neirosoft-neuron-spektr-dvp",
    category: "neurology",
    brand: "Нейрософт",
    isBestseller: false,
    imageUrl: "https://mcs.kz/wp-content/uploads/2021/04/full___________________2.png",
    name: {
      ru: "Нейрон-Спектр-ДВП",
      kz: "Нейрон-Спектр-ДВП",
      en: "Neuron-Spektr-DVP",
    },
    description: {
      ru: "Программа и оборудование для исследования длиннолатентных вызванных потенциалов мозга по многоканальной схеме с топографическим картированием. Система регистрирует длинно- и среднелатентные слуховые, зрительные, соматосенсорные и когнитивные вызванные потенциалы мозга по каналам ЭЭГ с топографическим картированием. Реализованы парадигмы P300, MMN, CNV, GONOGO, TOVA, VCPT.",
      kz: "Топографиялық картографиялаумен көп арналы схема бойынша ұзын латентті вызванных потенциалдарды зерттеуге арналған бағдарлама мен жабдық. P300, MMN, CNV, GONOGO, TOVA, VCPT парадигмалары іске асырылған.",
      en: "Software and equipment for multi-channel long-latency brain evoked potential studies with topographic mapping. Records long- and medium-latency auditory, visual, somatosensory and cognitive evoked potentials via EEG channels. Implements P300, MMN, CNV, GONOGO, TOVA and VCPT paradigms.",
    },
    specs: {
      ru: ["Длинно- и среднелатентные вызванные потенциалы всех модальностей", "Когнитивные парадигмы: P300, MMN, CNV, GONOGO, TOVA, VCPT", "Топографическое картирование", "Поддержка встроенного и внешнего стимулятора", "Интеграция с линейкой Нейрон-Спектр"],
      en: ["Long- and medium-latency evoked potentials all modalities", "Cognitive paradigms: P300, MMN, CNV, GONOGO, TOVA, VCPT", "Topographic mapping", "Built-in and external stimulator support", "Integration with Neuron-Spektr series"],
      kz: ["Барлық модальды ұзын/орта латентті ВП", "P300, MMN, CNV, GONOGO, TOVA, VCPT парадигмалары", "Топографиялық картографиялау", "Нейрон-Спектр желісімен интеграция"],
    },
    bundle: {
      ru: ["Адаптер для подключения стандартного паттерн-стимулятора", "Аудиометрические наушники ТА-01", "ПО «Нейрон-Спектр.NET» с модулем ДВП"],
      en: ["Pattern-stimulator adapter", "TA-01 audiometric headphones", "Neuron-Spektr.NET software with DVP module"],
      kz: ["Паттерн-стимулятор адаптері", "ТА-01 аудиометриялық құлаққаптар", "Нейрон-Спектр.NET ДВП модулімен"],
    },
    faq: [
      {
        q: { ru: "В каких клинических случаях используется P300?", en: "In which clinical cases is P300 used?", kz: "P300 қандай клиникалық жағдайларда қолданылады?" },
        a: { ru: "P300 применяется при оценке когнитивных нарушений (деменция, СДВГ, шизофрения), а также для мониторинга эффективности нейрореабилитации и медикаментозной терапии.", en: "P300 is used for assessing cognitive impairment (dementia, ADHD, schizophrenia) and monitoring neurorehabilitation and pharmacotherapy effectiveness.", kz: "P300 когнитивті бұзылыстарды (деменция, СДВГ, шизофрения) бағалауда және нейрореабилитация тиімділігін бақылауда қолданылады." },
      },
    ],
  },

  // ── Neurology: Нейрон-Спектр-ПСГ ────────────────────────────────────────
  {
    slug: "neirosoft-neuron-spektr-psg",
    category: "neurology",
    brand: "Нейрософт",
    isBestseller: false,
    imageUrl: "https://mcs.kz/wp-content/uploads/2021/04/full___________________3.png",
    name: {
      ru: "Нейрон-Спектр-ПСГ",
      kz: "Нейрон-Спектр-ПСГ",
      en: "Neuron-Spektr-PSG",
    },
    description: {
      ru: "Программа и оборудование для проведения полисомнографических исследований. Многочасовая синхронная регистрация ЭЭГ, полиграфических каналов, видео и аудио. Анализ структуры сна и выявление кардиореспираторных нарушений во сне. Автоматические алгоритмы выявления эпизодов апноэ, храпа, десатурации и движений конечностей. Применяется в сомнологии, кардиологии, неврологии и эпилептологии.",
      kz: "Полисомнографиялық зерттеулер жүргізуге арналған бағдарлама мен жабдық. Ұзақ сағаттық синхронды ЭЭГ, полиграфиялық, видео және аудио тіркеу. Апноэ, қорылдау, десатурация және аяқ-қол қозғалысы эпизодтарын анықтаудың автоматты алгоритмдері.",
      en: "Software and equipment for polysomnographic studies. Multi-hour synchronized EEG, polygraph channels, video and audio recording. Sleep structure analysis and cardiorespiratory disorder detection. Automatic algorithms for apnoea, snoring, desaturation, and limb movement detection. Used in somnology, cardiology, neurology, and epileptology.",
    },
    specs: {
      ru: ["Полисомнография с автоматическим стадированием сна", "Синхронная запись ЭЭГ + ЭОГ + ЭМГ + ЭКГ + видео + аудио", "SpO₂ модуль и датчики дыхания", "Детектирование апноэ, храпа, движений конечностей", "Дистанционный ИК-монитор пациента", "Экспорт в EDF/EDF+"],
      en: ["Polysomnography with automatic sleep staging", "Synchronized EEG + EOG + EMG + ECG + video + audio", "SpO₂ module and respiratory sensors", "Apnoea, snoring, limb movement detection", "Remote IR patient monitor", "EDF/EDF+ export"],
      kz: ["Автоматты ұйқы стадиялаумен ПСГ", "Синхронды ЭЭГ + ЭОГ + ЭМГ + ЭКГ + видео + аудио", "SpO₂ модулі және тыныс датчиктері", "Апноэ, қорылдау, аяқ-қол қозғалысы детекторы"],
    },
    bundle: {
      ru: ["Чашечные электроды с проводами (ЭЭГ 9 шт, ЭОГ 2 шт, ЭМГ 2 шт, ЭКГ 2 шт)", "Датчики дыхания (грудной и брюшной)", "Датчик храпа", "Датчик положения тела", "SpO₂ модуль", "ИК-камера с микрофоном", "Плата видеозахвата", "Звуковой стимулятор", "ПО «Нейрон-Спектр.NET» с модулями ПСГ и видеомониторинга"],
      en: ["Cup electrodes (EEG×9, EOG×2, EMG×2, ECG×2)", "Respiratory sensors (chest and abdominal)", "Snore detector", "Body position sensor", "SpO₂ module", "IR camera with microphone", "Video capture board", "Sound stimulator", "Neuron-Spektr.NET PSG + video monitoring software"],
      kz: ["Шынашақ электродтар (ЭЭГ 9, ЭОГ 2, ЭМГ 2, ЭКГ 2)", "Тыныс датчиктері", "Қорылдау датчигі", "Дене қалпы датчигі", "SpO₂ модулі", "ИК-камера мен микрофон", "Нейрон-Спектр.NET ПСГ + бейне бақылау"],
    },
    faq: [
      {
        q: { ru: "Нужна ли специальная палата для ПСГ?", en: "Is a special room required for PSG?", kz: "ПСГ үшін арнайы палата қажет пе?" },
        a: { ru: "Для стандартной ПСГ рекомендуется затемнённое тихое помещение с кроватью. Опционально возможна амбулаторная ПСГ с портативным блоком.", en: "Standard PSG requires a darkened quiet room with a bed. Ambulatory PSG with portable block is optionally available.", kz: "Стандартты ПСГ үшін қараңғы тыныш бөлме мен кереует керек. Портативті блокпен амбулаториялық ПСГ мүмкін." },
      },
    ],
  },

  // ── Neurology: Нейро МВП-4 ────────────────────────────────────────────
  {
    slug: "neirosoft-neuro-mvp-4",
    category: "neurology",
    brand: "Нейрософт",
    isBestseller: false,
    imageUrl: "https://mcs.kz/wp-content/uploads/2021/04/full___________________5.png",
    name: {
      ru: "Нейро МВП-4",
      kz: "Нейро МВП-4",
      en: "Neuro MVP-4",
    },
    description: {
      ru: "4-канальный электронейромиограф с функциями исследования вызванных потенциалов мозга и беспроводной клавиатурой. Применяет передовые технологии усиления и стимуляции. Малошумящие усилители с быстрым подавлением артефактов. Стимулятор тока с несколькими формами сигнала (прямоугольник, меандр, трапеция, синус). Библиотека тестов — 37+ методик, включая скорость моторной проводимости и F-волны. Все модальности ВП входят в базовую конфигурацию.",
      kz: "Ми вызванных потенциалдарын зерттеу функциялары мен сымсыз пернетақтасы бар 4 арналы электронейромиограф. Аз шулы күшейткіштер, артефакт жылдам басу, 37+ зерттеу әдістемесі.",
      en: "4-channel electromyograph with evoked potential research capabilities and wireless keyboard. Low-noise amplifiers with rapid artifact suppression. Current stimulator with multiple waveforms. 37+ test procedures including motor conduction velocity and F-waves. All evoked potential modalities included in base configuration.",
    },
    specs: {
      ru: ["4 высококлассных канала", "37+ методик ЭМГ и ВП в базе", "Все модальности ВП (ССВП, ЗВСП, СВСП, ДВП)", "Стимулятор тока: прямоугольный, трапеция, синус, меандр", "Беспроводная клавиатура КФ-01", "Ножной педаль-блок", "Модульная USB-архитектура"],
      en: ["4 high-class channels", "37+ EMG and EP procedures", "All EP modalities (SSEP, VEP, BAEP, LLAEP)", "Current stimulator: rectangle, trapezoid, sine, meander", "Wireless KF-01 keyboard", "Foot pedal control block", "Modular USB architecture"],
      kz: ["4 жоғары класты арна", "37+ ЭМГ және ВП әдістемесі", "Барлық ВП модальдықтары", "Ток стимуляторы", "Сымсыз КФ-01 пернетақтасы", "Аяқ педалі блогы"],
    },
    bundle: {
      ru: ["4-канальный усилитель", "Аудиовизуальный стимулятор", "Блок управления стимулятором тока", "Беспроводная клавиатура КФ-01", "Блок ножного педаль-управления", "Набор поверхностных и игольчатых электродов", "Аудиометрические наушники TDH-39", "Монитор 18.5\"", "ПО «Нейрон-Спектр.NET»", "Кейс для переноски"],
      en: ["4-channel amplifier", "Audiovisual stimulator", "Current stimulator control block", "Wireless KF-01 keyboard", "Foot pedal control block", "Surface and needle electrode set", "TDH-39 audiometric headphones", "18.5\" monitor", "Neuron-Spektr.NET software", "Carry case"],
      kz: ["4 арналы күшейткіш", "Дыбыс-жарық стимуляторы", "Ток стимуляторы басқару блогы", "Сымсыз КФ-01 пернетақтасы", "Аяқ педалі блогы", "Электродтар жинағы", "TDH-39 наушниктер", "18.5\" монитор", "Нейрон-Спектр.NET", "Тасымалдау кейсі"],
    },
    faq: [
      {
        q: { ru: "В чём отличие МВП-4 от МВП-8?", en: "What is the difference between MVP-4 and MVP-8?", kz: "МВП-4 пен МВП-8 айырмашылығы неде?" },
        a: { ru: "МВП-4 — 4-канальная версия, подходит для большинства ЭМГ- и ВП-исследований. МВП-8 — 8 каналов с расширенной конфигурацией: двойные разъёмы (touch-proof + DIN), поддержка до 10 USB-блоков, оптимален для сложных интраоперационных мониторингов.", en: "MVP-4 is a 4-channel version for most EMG and EP studies. MVP-8 has 8 channels with dual connectors (touch-proof + DIN), supports up to 10 USB blocks, ideal for complex intraoperative monitoring.", kz: "МВП-4 — 4 арналы, МВП-8 — 8 арналы, қос разъём, 10 USB блокқа дейін, интраоперациялық мониторинг үшін оңтайлы." },
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// 3. BRAND LOGOS UPDATE
// ────────────────────────────────────────────────────────────────────────────
const brandLogoUpdates = [
  { name: "Нейрософт",  logoUrl: "https://mcs.kz/wp-content/uploads/2021/04/1331532550_neyrosoft.jpg",  website: "https://neurosoft.ru" },
  { name: "Esaote",     logoUrl: "https://mcs.kz/wp-content/uploads/2021/04/1331532730_esaote.jpg",     website: "https://esaote.com" },
  { name: "Biohit",     logoUrl: "https://mcs.kz/wp-content/uploads/2021/04/1331534261_biohit.jpg",     website: "https://biohit.com" },
  { name: "Biosan",     logoUrl: "https://mcs.kz/wp-content/uploads/2021/04/1331034451_biosan.jpg",     website: "https://biosan.lv" },
  { name: "Aemed",      logoUrl: "https://mcs.kz/wp-content/uploads/2021/04/1331534080_aemed.jpg",      website: "https://aemed.kz" },
  { name: "Toshiba",    logoUrl: "https://mcs.kz/wp-content/uploads/2021/04/1331531844_toshiba.jpg",    website: "https://global.medical.canon" },
];

// ────────────────────────────────────────────────────────────────────────────
async function main() {
  const productsCol = collection(db, "products");
  const brandsCol = collection(db, "brands");

  // ── 1. Update imageUrls on existing products ────────────────────────────
  console.log("=== Updating image URLs ===");
  for (const [slug, imageUrl] of Object.entries(imageUpdates)) {
    const q = query(productsCol, where("slug", "==", slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      await updateDoc(doc(db, "products", snap.docs[0].id), { imageUrl });
      console.log(`✅ imageUrl updated: ${slug}`);
    } else {
      console.log(`⚠️  Not found: ${slug}`);
    }
  }

  // ── 2. Insert new products ────────────────────────────────────────────────
  console.log("\n=== Adding new products ===");
  for (const product of newProducts) {
    // Check if already exists
    const q = query(productsCol, where("slug", "==", product.slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      // Update instead
      await updateDoc(doc(db, "products", snap.docs[0].id), product);
      console.log(`🔄 Updated existing: ${product.slug}`);
    } else {
      const newDoc = doc(productsCol);
      await setDoc(newDoc, { id: newDoc.id, ...product });
      console.log(`✅ Added new: ${product.slug}`);
    }
  }

  // ── 3. Update brand logos ─────────────────────────────────────────────────
  console.log("\n=== Updating brand logos ===");
  const brandsSnap = await getDocs(brandsCol);
  const existingBrands = brandsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  for (const brandData of brandLogoUpdates) {
    const existing = existingBrands.find(b =>
      b.name?.toLowerCase() === brandData.name.toLowerCase()
    );
    if (existing) {
      await updateDoc(doc(db, "brands", existing.id), {
        logoUrl: brandData.logoUrl,
        website: brandData.website,
      });
      console.log(`✅ Logo updated: ${brandData.name}`);
    } else {
      // Add new brand
      const newBrandDoc = doc(brandsCol);
      await setDoc(newBrandDoc, {
        id: newBrandDoc.id,
        name: brandData.name,
        logoUrl: brandData.logoUrl,
        website: brandData.website,
        order: 99,
      });
      console.log(`✅ Brand added: ${brandData.name}`);
    }
  }

  console.log("\n✅ All done.");
  process.exit(0);
}

main().catch((err) => { console.error(err); process.exit(1); });
