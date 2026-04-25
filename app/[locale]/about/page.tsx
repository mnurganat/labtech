import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactSection from "@/components/sections/ContactSection";
import CertificateGallery from "@/components/sections/CertificateGallery";

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

const BASE = "https://www.labtech.kz";
const CLIENT_LOGOS = [
  `${BASE}/templates/yootheme/cache/36/10_5-c4a6dc8b-36b9d48b.jpeg`,
  `${BASE}/templates/yootheme/cache/da/logo020-da216b4d.jpeg`,
  `${BASE}/templates/yootheme/cache/93/logo022-9325c921.jpeg`,
  `${BASE}/templates/yootheme/cache/c0/logo023-c0a0a881.jpeg`,
  `${BASE}/templates/yootheme/cache/3f/logo024-3f2f1f03.jpeg`,
  `${BASE}/templates/yootheme/cache/1b/logo025-1bad4e35.jpeg`,
  `${BASE}/templates/yootheme/cache/76/logo026-762bbd6f.jpeg`,
  `${BASE}/templates/yootheme/cache/52/logo027-52a9ec59.jpeg`,
  `${BASE}/templates/yootheme/cache/bc/logo028-bc4bb506.jpeg`,
  `${BASE}/templates/yootheme/cache/98/logo029-98c9e430.jpeg`,
  `${BASE}/templates/yootheme/cache/8c/logo030-8cb62d3f.jpeg`,
  `${BASE}/templates/yootheme/cache/a8/logo031-a8347c09.jpeg`,
  `${BASE}/templates/yootheme/cache/55/logo032-550d92c2.jpeg`,
  `${BASE}/templates/yootheme/cache/71/logo033-718fc3f4.jpeg`,
  `${BASE}/templates/yootheme/cache/8e/logo034-8e007476.jpeg`,
  `${BASE}/templates/yootheme/cache/aa/logo035-aa822540.jpeg`,
  `${BASE}/templates/yootheme/cache/c7/logo036-c704d61a.jpeg`,
  `${BASE}/templates/yootheme/cache/94/logo037-9481b7ba.jpeg`,
  `${BASE}/templates/yootheme/cache/94/logo038-946d8fc9.jpeg`,
  `${BASE}/templates/yootheme/cache/b0/logo039-b0efdeff.jpeg`,
  `${BASE}/templates/yootheme/cache/68/logo040-68476d83.jpeg`,
  `${BASE}/templates/yootheme/cache/4c/logo041-4cc53cb5.jpeg`,
  `${BASE}/templates/yootheme/cache/8c/logo042-8c12da87.jpeg`,
  `${BASE}/templates/yootheme/cache/a8/logo043-a8908bb1.jpeg`,
  `${BASE}/templates/yootheme/cache/57/logo044-571f3c33.jpeg`,
  `${BASE}/templates/yootheme/cache/73/logo045-739d6d05.jpeg`,
  `${BASE}/templates/yootheme/cache/69/logo046-691caec9.jpeg`,
  `${BASE}/templates/yootheme/cache/4d/logo047-4d9effff.jpeg`,
  `${BASE}/templates/yootheme/cache/4d/logo048-4d72c78c.jpeg`,
  `${BASE}/templates/yootheme/cache/69/logo049-69f096ba.jpeg`,
  `${BASE}/templates/yootheme/cache/7d/logo050-7d8f5fb5.jpeg`,
  `${BASE}/templates/yootheme/cache/59/logo051-590d0e83.jpeg`,
  `${BASE}/templates/yootheme/cache/ad/logo052-ad82ac63.jpeg`,
  `${BASE}/templates/yootheme/cache/89/logo053-8900fd55.jpeg`,
  `${BASE}/templates/yootheme/cache/76/logo054-768f4ad7.jpeg`,
  `${BASE}/templates/yootheme/cache/52/logo055-520d1be1.jpeg`,
  `${BASE}/templates/yootheme/cache/3f/logo056-3f8be8bb.jpeg`,
  `${BASE}/templates/yootheme/cache/6c/logo057-6c0e891b.jpeg`,
  `${BASE}/templates/yootheme/cache/f9/WhatsApp%20Image%202024-07-16%20at%2016.44.24-f96176f0.jpeg`,
  `${BASE}/templates/yootheme/cache/74/WhatsApp%20Image%202024-07-16%20at%2016.44.25-74e98b12.jpeg`,
  `${BASE}/templates/yootheme/cache/78/WhatsApp%20Image%202024-07-16%20at%2016.44.251-789a8d10.jpeg`,
];

const PARTNER_NAMES = [
  "URIT Medical", "HUMAN Diagnostics", "DNA-Technology", "Biobase",
  "ELMI", "Biosan", "Fujirebio", "West Medica", "Immunotech", "SteriLance",
];


export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const partners = PARTNER_NAMES.map((name, i) => ({
    name,
    country: t(`about.p${i + 1}_country` as any),
    category: t(`about.p${i + 1}_cat` as any),
  }));

  const stats = [
    { value: t("about.stat1_value"), label: t("about.stat1_label") },
    { value: t("about.stat2_value"), label: t("about.stat2_label") },
    { value: t("about.stat3_value"), label: t("about.stat3_label") },
    { value: t("about.stat4_value"), label: t("about.stat4_label") },
    { value: t("about.stat5_value"), label: t("about.stat5_label") },
    { value: t("about.stat6_value"), label: t("about.stat6_label") },
  ];

  const values = [
    { title: t("about.value1_title"), text: t("about.value1_text") },
    { title: t("about.value2_title"), text: t("about.value2_text") },
    { title: t("about.value3_title"), text: t("about.value3_text") },
  ];

  return (
    <>
      <Breadcrumb items={[{ label: t("about.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--blue)", color: "white", padding: "80px 56px 64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("about.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {t("about.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 600 }}>
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Stats grid */}
      <section style={{ background: "var(--blue)", padding: "0 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
            {stats.map((s) => (
              <div key={s.value} style={{ padding: "32px 24px", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: 36, fontWeight: 700, color: "white", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 6, lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-2col">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("about.mission_tag")}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 20, lineHeight: 1.25 }}>
              {t("about.mission_title")}
            </h2>
            <p style={{ fontSize: 15, color: "var(--gray)", lineHeight: 1.85 }}>
              {t("about.mission_text")}
            </p>
          </div>
          <div style={{ background: "var(--silver)", padding: "40px 36px" }}>
            <div style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.8, marginBottom: 24 }}>
              {t("about.mission_intro")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                t("about.mission_client1"),
                t("about.mission_client2"),
                t("about.mission_client3"),
                t("about.mission_client4"),
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, background: "var(--blue)", borderRadius: "50%", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: "var(--ink)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)", marginBottom: 40 }}>
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

      {/* Partners */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("about.partners_tag")}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)" }}>
              {t("about.partners_title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {partners.map((p) => (
              <div key={p.name} style={{ background: "var(--silver)", padding: "24px 24px", borderLeft: "3px solid var(--blue)" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 600, marginBottom: 6 }}>{p.country}</div>
                <div style={{ fontSize: 12, color: "var(--gray)" }}>{p.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section style={{ padding: "80px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("about.clients_tag")}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)" }}>
              {t("about.clients_title")}
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 2 }}>
            {CLIENT_LOGOS.map((src, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 90,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Клиент ${i + 1}`}
                  style={{ maxWidth: "100%", maxHeight: 60, objectFit: "contain", filter: "grayscale(30%)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("about.certs_tag")}
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--ink)" }}>
              {t("about.certs_title")}
            </h2>
          </div>
          <CertificateGallery />
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
