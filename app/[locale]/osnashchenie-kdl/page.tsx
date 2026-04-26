import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ContactSection from "@/components/sections/ContactSection";
import LabSetupsSection from "@/components/sections/LabSetupsSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LabSetupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const steps = [
    { n: t("lab_setups.step1_n"), title: t("lab_setups.step1_title"), text: t("lab_setups.step1_text") },
    { n: t("lab_setups.step2_n"), title: t("lab_setups.step2_title"), text: t("lab_setups.step2_text") },
    { n: t("lab_setups.step3_n"), title: t("lab_setups.step3_title"), text: t("lab_setups.step3_text") },
    { n: t("lab_setups.step4_n"), title: t("lab_setups.step4_title"), text: t("lab_setups.step4_text") },
  ];

  const stats = [
    { value: t("lab_setups.stat1_value"), label: t("lab_setups.stat1_label") },
    { value: t("lab_setups.stat2_value"), label: t("lab_setups.stat2_label") },
    { value: t("lab_setups.stat3_value"), label: t("lab_setups.stat3_label") },
  ];

  return (
    <>
      {/* Hero */}
      <section
        style={{ background: "var(--blue)", color: "white", padding: "80px 56px 64px" }}
        className="px-5 md:px-14"
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {t("lab_setups.tag")}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-roboto), Roboto, sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 640,
              marginBottom: 20,
              letterSpacing: "-0.01em",
            }}
          >
            {t("lab_setups.title")}
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            {t("lab_setups.subtitle")}
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 48,
              paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              flexWrap: "wrap",
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-roboto), Roboto, sans-serif",
                    fontSize: 36,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    fontWeight: 500,
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "64px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--blue)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            {t("lab_setups.how_title")}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
            {steps.map((step) => (
              <div key={step.n} style={{ background: "white", padding: "28px 24px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-roboto), Roboto, sans-serif",
                    fontSize: 40,
                    fontWeight: 700,
                    color: "var(--blue)",
                    opacity: 0.2,
                    lineHeight: 1,
                    marginBottom: 12,
                  }}
                >
                  {step.n}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab setups tabs */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <LabSetupsSection locale={locale} />
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
