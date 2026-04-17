import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Truck, Wrench, GraduationCap, ShieldCheck, MessageCircle, Package } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `https://labtech.kz/${locale}/services` },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const services = [
    { icon: Truck, title: t("services.item1_title"), text: t("services.item1_text") },
    { icon: Wrench, title: t("services.item2_title"), text: t("services.item2_text") },
    { icon: GraduationCap, title: t("services.item3_title"), text: t("services.item3_text") },
    { icon: Package, title: t("services.item4_title"), text: t("services.item4_text") },
    { icon: MessageCircle, title: t("services.item5_title"), text: t("services.item5_text") },
    { icon: ShieldCheck, title: t("services.item6_title"), text: t("services.item6_text") },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: t("services.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--ink)", color: "white", padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("services.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 700, marginBottom: 20 }}>
            {t("services.title")}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 560 }}>
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 2 }}>
            {services.map(({ icon: Icon, title, text }, i) => (
              <div key={i} style={{ background: i % 2 === 0 ? "var(--silver)" : "white", padding: "40px 36px", borderTop: "3px solid var(--blue)" }}>
                <div style={{ width: 48, height: 48, background: "var(--blue-lt)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={24} style={{ color: "var(--blue)" }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>{title}</h2>
                <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
