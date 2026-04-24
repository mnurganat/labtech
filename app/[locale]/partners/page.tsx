import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactSection from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `https://labtech.kz/${locale}/partners` },
  };
}

const PARTNERS = [
  {
    name: "URIT Medical",
    country: "Китай 🇨🇳",
    category: "Гематология · Биохимия · Мочевые анализаторы",
    description: "Один из ведущих мировых производителей гематологических анализаторов. Линейка URIT-3000+ работает в сотнях казахстанских клиник.",
    since: "2010",
    products: ["Гематологические анализаторы", "Биохимические анализаторы", "Анализаторы мочи"],
  },
  {
    name: "HUMAN Diagnostics",
    country: "Германия 🇩🇪",
    category: "Биохимические реагенты · Контроль качества",
    description: "Немецкий производитель реагентов для биохимического анализа с 50-летней историей. Соответствие европейским стандартам IVD.",
    since: "2012",
    products: ["Реагенты для биохимии", "Контрольные материалы", "Калибраторы"],
  },
  {
    name: "DNA-Technology",
    country: "Россия 🇷🇺",
    category: "ПЦР-оборудование · Молекулярная диагностика",
    description: "Российский разработчик и производитель ПЦР-систем реального времени и диагностических наборов. Широкое применение в инфекционной диагностике.",
    since: "2011",
    products: ["Термоциклеры Real-Time PCR", "ПЦР диагностические наборы", "Реагенты для молекулярной биологии"],
  },
  {
    name: "Biobase",
    country: "Китай 🇨🇳",
    category: "Боксы биологической безопасности · Чистые помещения",
    description: "Специализация — ламинарные боксы, боксы биологической безопасности II класса, инкубаторы. Лидер среди китайских производителей лабораторного оборудования безопасности.",
    since: "2014",
    products: ["Ламинарные боксы", "Боксы биологической безопасности II класса", "CO2-инкубаторы"],
  },
  {
    name: "ELMI",
    country: "Латвия 🇱🇻",
    category: "Центрифуги · Термостаты · Встряхиватели",
    description: "Европейский производитель прецизионного лабораторного оборудования с 30-летним опытом. Центрифуги ELMI — эталон надёжности в лабораторной практике.",
    since: "2013",
    products: ["Лабораторные центрифуги", "Суховоздушные термостаты", "Встряхиватели и ротаторы"],
  },
  {
    name: "Biosan",
    country: "Латвия 🇱🇻",
    category: "Смесители · Дозаторы · Общелабораторное",
    description: "Латвийский производитель широкого спектра лабораторного оборудования: вортексы, магнитные мешалки, водяные бани. Известны высоким качеством при доступной цене.",
    since: "2013",
    products: ["Вортексы и смесители", "Магнитные мешалки", "Водяные бани"],
  },
  {
    name: "Fujirebio",
    country: "Швеция 🇸🇪",
    category: "ИФА-диагностика · Онкомаркеры · Иммунология",
    description: "Мировой лидер в иммунологической диагностике. Тест-системы Fujirebio применяются для определения онкомаркеров и диагностики инфекций методом ИФА.",
    since: "2015",
    products: ["ИФА-наборы для онкомаркеров", "Диагностика гепатитов и ВИЧ", "Тест-системы для щитовидной железы"],
  },
  {
    name: "West Medica",
    country: "Австрия 🇦🇹",
    category: "Микроскопы · Оптика",
    description: "Австрийский производитель профессиональных микроскопов для клинической и исследовательской работы. Оптика высокого разрешения, соответствие требованиям медицинской лаборатории.",
    since: "2016",
    products: ["Бинокулярные микроскопы", "Тринокулярные микроскопы", "Аксессуары для микроскопии"],
  },
  {
    name: "Immunotech",
    country: "Россия 🇷🇺",
    category: "Иммунологические реагенты · Гистология",
    description: "Производитель диагностических реагентов для иммунологических исследований, окрашивания препаратов и гистохимии.",
    since: "2014",
    products: ["Диагностические реагенты", "Красители для гематологии", "Среды для фиксации"],
  },
  {
    name: "SteriLance",
    country: "Китай 🇨🇳",
    category: "Ланцеты · Расходные материалы · Контроль диабета",
    description: "Специализированный производитель ланцетов, тест-полосок и расходных материалов для экспресс-диагностики. Широко используются в диагностике диабета.",
    since: "2015",
    products: ["Ланцеты для прокола пальца", "Тест-полоски для глюкометров", "Расходники для экспресс-тестов"],
  },
];

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Breadcrumb items={[{ label: t("partners.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--blue)", color: "white", padding: "80px 56px 64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("partners.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 640, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {t("partners.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 560 }}>
            {t("partners.subtitle")}
          </p>

          <div style={{ display: "flex", gap: 48, marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.12)", flexWrap: "wrap" }}>
            {[
              { value: `${PARTNERS.length}+`, label: t("partners.stat1_label") },
              { value: "15+", label: t("partners.stat2_label") },
              { value: "8", label: t("partners.stat3_label") },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: 36, fontWeight: 700, color: "white" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 2 }}>
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                style={{
                  background: i % 3 === 0 ? "var(--silver)" : i % 3 === 1 ? "white" : "var(--silver)",
                  padding: "36px 32px",
                  borderTop: "3px solid var(--blue)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 4 }}>{p.country}</div>
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--blue)", background: "var(--blue-lt)", padding: "4px 10px", whiteSpace: "nowrap" }}>
                    {t("partners.since")} {p.since}
                  </div>
                </div>

                {/* Category */}
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                  {p.category}
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                  {p.description}
                </p>

                {/* Products */}
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    {t("partners.products_label")}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    {p.products.map((prod) => (
                      <li key={prod} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, background: "var(--blue)", borderRadius: "50%", flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 12, color: "var(--ink)" }}>{prod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner CTA */}
      <section style={{ background: "var(--silver)", padding: "64px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("partners.cta_tag")}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
              {t("partners.cta_title")}
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray)", maxWidth: 480, lineHeight: 1.7 }}>
              {t("partners.cta_text")}
            </p>
          </div>
          <a href={`mailto:info@labtech.kz`} className="btn-primary" style={{ flexShrink: 0 }}>
            {t("partners.cta_btn")}
          </a>
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
