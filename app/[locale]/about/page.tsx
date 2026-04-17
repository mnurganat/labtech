import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `https://labtech.kz/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const values = [
    { title: t("about.value1_title"), text: t("about.value1_text") },
    { title: t("about.value2_title"), text: t("about.value2_text") },
    { title: t("about.value3_title"), text: t("about.value3_text") },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: t("about.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--ink)", color: "white", padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("about.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 700, marginBottom: 20 }}>
            {t("about.title")}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 620 }}>
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="grid-2col">
          <div>
            <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: 32, fontWeight: 700, color: "var(--ink)", marginBottom: 20 }}>
              {t("about.mission_title")}
            </h2>
            <p style={{ fontSize: 16, color: "var(--gray)", lineHeight: 1.8 }}>
              {t("about.mission_text")}
            </p>
          </div>
          <div style={{ background: "var(--blue-lt)", borderLeft: "4px solid var(--blue)", padding: "40px" }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: "var(--blue)", lineHeight: 1, marginBottom: 8 }}>15+</div>
            <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>лет на рынке Казахстана</div>
            <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />
            <div style={{ fontSize: 48, fontWeight: 800, color: "var(--blue)", lineHeight: 1, marginBottom: 8 }}>300+</div>
            <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>клиентов по всему Казахстану</div>
            <div style={{ height: 1, background: "var(--border)", margin: "24px 0" }} />
            <div style={{ fontSize: 48, fontWeight: 800, color: "var(--blue)", lineHeight: 1, marginBottom: 8 }}>500+</div>
            <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>позиций в каталоге</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 48 }}>
            {t("about.values_title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }} className="grid-3col">
            {values.map((v, i) => (
              <div key={i} style={{ background: "white", padding: "40px 32px", borderTop: "3px solid var(--blue)" }}>
                <div style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: 48, fontWeight: 700, color: "var(--blue)", lineHeight: 1, marginBottom: 16, opacity: 0.2 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
