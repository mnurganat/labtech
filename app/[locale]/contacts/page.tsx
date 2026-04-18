import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import LeadForm from "@/components/forms/LeadForm";

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

const DEPARTMENTS = [
  { label: "Отдел продаж", phones: ["+7 701 879 69 02", "+7 701 879 69 03"], note: "Алматы и регионы" },
  { label: "Сервисный отдел", phones: ["+7 701 084 07 12", "+7 701 879 69 06"], note: "Ремонт и обслуживание" },
  { label: "Ветеринарное направление", phones: ["+7 701 309 24 27"], note: "Ветеринарное оборудование" },
  { label: "Поддержка клиентов", phones: ["+7 701 053 33 09"], note: "Вопросы и обратная связь" },
];

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalOrganization"],
    name: "ТОО «LabTech»",
    url: "https://labtech.kz",
    telephone: "+77273277477",
    email: "info@labtech.kz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "мкр. Алатау, ул. Момышұлы, 18",
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
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 12, letterSpacing: "-0.01em" }}>
            {t("contacts.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 500 }}>{t("contacts.subtitle")}</p>
        </div>
      </section>

      {/* Main info cards */}
      <section style={{ padding: "60px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2, marginBottom: 2 }}>
            {[
              {
                icon: MapPin,
                label: t("contacts.address_title"),
                content: (
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.5 }}>
                    г. Алматы,<br />мкр. Алатау, ул. Момышұлы, 18
                  </p>
                ),
              },
              {
                icon: Phone,
                label: t("contacts.phone_title"),
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <a href="tel:+77273277477" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>+7 (727) 327-74-77</a>
                    <a href="tel:+77272208142" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>+7 (727) 220-81-42</a>
                  </div>
                ),
              },
              {
                icon: Mail,
                label: t("contacts.email_title"),
                content: (
                  <a href="mailto:info@labtech.kz" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>info@labtech.kz</a>
                ),
              },
              {
                icon: Clock,
                label: t("contacts.hours_title"),
                content: (
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.6 }}>
                    Пн–Пт: 9:00–18:00<br />
                    <span style={{ fontSize: 12, fontWeight: 400, color: "var(--gray)" }}>Сб–Вс: выходной</span>
                  </p>
                ),
              },
            ].map(({ icon: Icon, label, content }, i) => (
              <div key={i} style={{ background: "white", padding: "32px 28px", borderTop: "3px solid var(--blue)" }}>
                <Icon size={24} style={{ color: "var(--blue)", marginBottom: 16 }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                  {label}
                </div>
                {content}
              </div>
            ))}
          </div>

          {/* WhatsApp banner */}
          <div style={{ background: "#25D366", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <MessageCircle size={24} color="white" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Напишите нам в WhatsApp</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>Быстрый ответ в рабочее время · +7 701 879 69 04</div>
            </div>
            <a
              href="https://wa.me/77018796904"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "white", color: "#25D366", fontWeight: 700, fontSize: 13, padding: "10px 20px", textDecoration: "none", flexShrink: 0 }}
            >
              Написать
            </a>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section style={{ padding: "64px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
            Отделы
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 40 }}>
            Связаться с нужным отделом
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
            {DEPARTMENTS.map((dep) => (
              <div key={dep.label} style={{ background: "var(--silver)", padding: "28px 24px", borderLeft: "3px solid var(--blue)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{dep.label}</div>
                <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 600, marginBottom: 12 }}>{dep.note}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {dep.phones.map((ph) => (
                    <a key={ph} href={`tel:${ph.replace(/\s/g, "")}`} style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600, textDecoration: "none" }}>
                      {ph}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ padding: "64px 56px", background: "var(--silver)" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
            {t("lead_form.title")}
          </h2>
          <p style={{ fontSize: 14, color: "var(--gray)", marginBottom: 32 }}>{t("lead_form.subtitle")}</p>
          <div style={{ background: "white", padding: "40px" }}>
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
