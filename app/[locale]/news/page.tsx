import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Calendar } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title"), alternates: { canonical: `https://labtech.kz/${locale}/news` } };
}

const MOCK_NEWS = [
  {
    id: 1,
    date: "15 апреля 2026",
    title: "LabTech на выставке KazMedExpo 2026",
    summary: "Компания LabTech приняла участие в крупнейшей медицинской выставке Казахстана. На стенде были представлены новые модели гематологических анализаторов и ПЦР-оборудования.",
  },
  {
    id: 2,
    date: "3 апреля 2026",
    title: "Новые реагенты для ПЦР-диагностики",
    summary: "В каталог LabTech добавлена новая линейка реагентов для ПЦР-диагностики. Расширенный ассортимент охватывает все этапы молекулярно-генетического анализа.",
  },
  {
    id: 3,
    date: "20 марта 2026",
    title: "Сертификация по ISO 9001:2015",
    summary: "ТОО «LabTech» успешно прошло ресертификацию по стандарту ISO 9001:2015. Сертификат подтверждает высокое качество системы менеджмента компании.",
  },
];

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Breadcrumb items={[{ label: t("news.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--ink)", color: "white", padding: "64px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("news.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1 }}>
            {t("news.title")}
          </h1>
        </div>
      </section>

      {/* News list */}
      <section style={{ padding: "60px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {MOCK_NEWS.map((item, i) => (
            <article
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 40,
                padding: "40px 0",
                borderBottom: "1px solid var(--border)",
                alignItems: "start",
              }}
              className="news-article"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gray)", fontSize: 13, fontWeight: 500 }}>
                <Calendar size={14} style={{ color: "var(--blue)" }} />
                {item.date}
              </div>
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 12, lineHeight: 1.3 }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7, marginBottom: 16 }}>{item.summary}</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {t("news.read_more")} →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
