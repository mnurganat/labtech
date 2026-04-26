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

const CDN = "https://juxtxmfgdpdoewbqrhlo.supabase.co/storage/v1/object/public/partners";

const PARTNERS = [
  { name: "URIT Medical",         country: "Китай",      category: "Гематология, биохимия",              url: "https://urit.com.ru/",                       logo: `${CDN}/urit.png` },
  { name: "HUMAN Diagnostics",    country: "Германия",   category: "Биохимические реагенты",             url: "https://www.human.de/",                      logo: "" },
  { name: "DNA-Technology",       country: "Россия",     category: "ПЦР-оборудование",                   url: "https://dna-technology.ru/",                 logo: `${CDN}/dna-technology.png` },
  { name: "Biobase",              country: "Китай",      category: "Боксы биологической безопасности",   url: "https://www.biobase.cc/",                    logo: `${CDN}/biobase.png` },
  { name: "ELMI",                 country: "Латвия",     category: "Центрифуги и термостаты",            url: "https://elmi-tech.com/ru/",                  logo: `${CDN}/elmi.png` },
  { name: "Biosan",               country: "Латвия",     category: "Лабораторное оборудование",          url: "https://biosan.lv/ru/",                      logo: `${CDN}/biosan.png` },
  { name: "Fujirebio",            country: "Швеция",     category: "ИФА-диагностика",                    url: "https://www.fujirebio.com/",                 logo: `${CDN}/fujirebio.png` },
  { name: "West Medica",          country: "Австрия",    category: "Микроскопы",                         url: "https://westmedica.ru/",                     logo: `${CDN}/west-medica.svg` },
  { name: "Immunotech",           country: "Россия",     category: "Иммунологические реагенты",          url: "https://msk097.wixsite.com/immunotex",       logo: `${CDN}/immunotech.png` },
  { name: "SteriLance",           country: "Китай",      category: "Ланцеты и расходники",               url: "",                                           logo: "" },
  { name: "Sinocare",             country: "Китай",      category: "Диагностика диабета",                url: "https://www.sinocare.com/ru/",               logo: `${CDN}/sinocare.png` },
  { name: "Osang Healthcare",     country: "Корея",      category: "Экспресс-тесты",                     url: "https://www.osanghc.com/",                   logo: `${CDN}/osang.svg` },
  { name: "Zonkia",               country: "Китай",      category: "Лабораторная посуда",                url: "http://zonkia-lab.com/",                     logo: `${CDN}/zonkia.png` },
  { name: "Biologix",             country: "Китай",      category: "Расходные материалы",                url: "https://ru.biologix-global.com/",            logo: `${CDN}/biologix.png` },
  { name: "Viola Медтехника",     country: "Украина",    category: "Медицинское оборудование",           url: "https://viola.net.ua",                       logo: `${CDN}/viola.png` },
  { name: "НПФ Арбис",            country: "Россия",     category: "Реагенты и красители",               url: "https://www.abrisplus.ru/",                  logo: `${CDN}/abrisplus.png` },
  { name: "МиниМед",              country: "Россия",     category: "Небулайзеры, тонометры",             url: "https://minimed.ru/",                        logo: `${CDN}/minimed.png` },
  { name: "Агродиагностика",      country: "Россия",     category: "Ветеринарная диагностика",           url: "https://agrodiagnostica.com/",               logo: `${CDN}/agrodiagnostika.png` },
  { name: "HealVet",              country: "Китай",      category: "Ветеринарные анализаторы",           url: "https://www.healfo.com/",                    logo: `${CDN}/healvet.png` },
  { name: "Seamaty",              country: "Китай",      category: "Биохимия, иммунология",              url: "https://seamaty-russia.com/",                logo: `${CDN}/seamaty.png` },
  { name: "Dlab",                 country: "Китай",      category: "Дозирующее оборудование",            url: "https://www.dlabsci.com/",                   logo: `${CDN}/dlab.svg` },
  { name: "Yuwell",               country: "Китай",      category: "Небулайзеры, тонометры",             url: "https://www.yuwell.com/",                    logo: `${CDN}/yuwell.png` },
  { name: "Альфалаб",             country: "Россия",     category: "Расходные материалы",                url: "https://www.alphalabs.ru/",                  logo: "" },
  { name: "Бирюза",               country: "Казахстан",  category: "Дезинфицирующие средства",           url: "https://biryuza-med.com/",                   logo: `${CDN}/biryuza.svg` },
  { name: "Полимерные изделия",   country: "Россия",     category: "Расходные материалы",                url: "https://www.polimizd.ru/",                   logo: `${CDN}/polimizd.png` },
  { name: "Сункар",               country: "Казахстан",  category: "Ветеринарные препараты",             url: "https://densaulyk.kz",                       logo: `${CDN}/sunkar_logo_color.svg` },
  { name: "Добровет",             country: "Казахстан",  category: "Ветеринарные препараты",             url: "https://dobrovet.kz",                        logo: `${CDN}/dobrovet.png` },
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
          <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 640, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {t("partners.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 560 }}>
            {t("partners.subtitle")}
          </p>

          <div style={{ display: "flex", gap: 48, marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.12)", flexWrap: "wrap" }}>
            {[
              { value: `${PARTNERS.length}+`, label: t("partners.stat1_label") },
              { value: "15+",                  label: t("partners.stat2_label") },
              { value: "8",                    label: t("partners.stat3_label") },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 36, fontWeight: 700, color: "white" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            {t("partners.tag")}
          </div>
          <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 48 }}>
            {t("partners.grid_title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {PARTNERS.map((p) => {
              const card = (
                <div style={{ background: "var(--silver)", padding: "24px", borderLeft: "3px solid var(--blue)", height: "100%", display: "flex", flexDirection: "column" }}>
                  {p.logo ? (
                    <div style={{ height: 52, marginBottom: 16, display: "flex", alignItems: "center", background: "white", padding: "6px 10px", maxWidth: 160 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.logo} alt={p.name} style={{ maxHeight: 40, maxWidth: 140, objectFit: "contain" }} className="partner-logo" />
                    </div>
                  ) : (
                    <div style={{ height: 52, marginBottom: 16, display: "flex", alignItems: "center" }}>
                      <div style={{ width: 40, height: 40, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>{p.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 600, marginBottom: 8 }}>{p.country}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)" }}>{p.category}</div>
                </div>
              );
              return p.url ? (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit", display: "block", transition: "opacity 0.2s" }}
                  className="partner-card-link">
                  {card}
                </a>
              ) : (
                <div key={p.name}>{card}</div>
              );
            })}
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
            <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
              {t("partners.cta_title")}
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray)", maxWidth: 480, lineHeight: 1.7 }}>
              {t("partners.cta_text")}
            </p>
          </div>
          <a href="mailto:info@labtech.kz" className="btn-primary" style={{ flexShrink: 0 }}>
            {t("partners.cta_btn")}
          </a>
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
