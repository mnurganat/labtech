import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactSection from "@/components/sections/ContactSection";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contacts" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: `https://labtech.kz/${locale}/contacts` },
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalOrganization"],
    name: "ТОО «LabTech»",
    url: "https://labtech.kz",
    telephone: "+77270000000",
    email: "info@labtech.kz",
    address: {
      "@type": "PostalAddress",
      streetAddress: t("contacts.address"),
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    }],
    areaServed: { "@type": "Country", name: "Kazakhstan" },
  };

  const contactItems = [
    { icon: MapPin, label: t("contacts.address_title"), value: t("contacts.address"), href: null },
    { icon: Phone, label: t("contacts.phone_title"), value: t("footer.phone"), href: `tel:${t("footer.phone").replace(/\s/g, "")}` },
    { icon: Mail, label: t("contacts.email_title"), value: t("footer.email"), href: `mailto:${t("footer.email")}` },
    { icon: Clock, label: t("contacts.hours_title"), value: t("contacts.hours"), href: null },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Breadcrumb items={[{ label: t("contacts.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--ink)", color: "white", padding: "64px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("contacts.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 12 }}>
            {t("contacts.title")}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{t("contacts.subtitle")}</p>
        </div>
      </section>

      {/* Info cards */}
      <section style={{ padding: "60px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <div key={i} style={{ background: "white", padding: "32px 28px", borderTop: "3px solid var(--blue)" }}>
                <Icon size={24} style={{ color: "var(--blue)", marginBottom: 16 }} />
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                  {label}
                </div>
                {href ? (
                  <a href={href} style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>{value}</a>
                ) : (
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form section */}
      <ContactSection locale={locale} />
    </>
  );
}
