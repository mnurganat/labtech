import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactSection from "@/components/sections/ContactSection";
import { Truck, Wrench, GraduationCap, ShieldCheck, MessageCircle, Package, Clock, MapPin } from "lucide-react";

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

const SERVICE_DETAILS = [
  {
    icon: Truck,
    key: "item1",
    steps: ["Подбор оборудования под задачи клиента", "Оформление коммерческого предложения", "Таможенное оформление и сертификация", "Доставка со склада в Алматы"],
  },
  {
    icon: Wrench,
    key: "item2",
    steps: ["Выезд инженера на объект", "Монтаж и сборка оборудования", "Подключение к сети и коммуникациям", "Пусконаладочные работы и тестирование"],
  },
  {
    icon: GraduationCap,
    key: "item3",
    steps: ["Инструктаж по эксплуатации", "Практическое обучение на оборудовании", "Аттестация персонала", "Предоставление методических материалов"],
  },
  {
    icon: Package,
    key: "item4",
    steps: ["Плановое техническое обслуживание", "Диагностика и ремонт", "Поставка расходных материалов", "Калибровка и верификация"],
  },
  {
    icon: MessageCircle,
    key: "item5",
    steps: ["Бесплатная консультация по подбору", "Помощь с тендерной документацией", "Составление технических заданий", "Онлайн и выездные консультации"],
  },
  {
    icon: ShieldCheck,
    key: "item6",
    steps: ["Официальная гарантия производителя", "Замена неисправного оборудования", "Гарантийный ремонт бесплатно", "Техподдержка в период гарантии"],
  },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Breadcrumb items={[{ label: t("services.title") }]} />

      {/* Hero */}
      <section style={{ background: "var(--ink)", color: "white", padding: "80px 56px 64px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("services.tag")}
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1, maxWidth: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            {t("services.title")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 580 }}>
            {t("services.subtitle")}
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
            <Link href={`/${locale}/contacts`} className="btn-primary">
              Получить консультацию
            </Link>
            <Link href={`/${locale}/osnashchenie-kdl`} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
              Оснащение лаборатории
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: "80px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 2 }}>
            {SERVICE_DETAILS.map(({ icon: Icon, key, steps }, i) => (
              <div key={key} style={{ background: i % 2 === 0 ? "var(--silver)" : "white", padding: "40px 36px", borderTop: "3px solid var(--blue)" }}>
                <div style={{ width: 48, height: 48, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={22} color="white" />
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>
                  {t(`services.${key}_title` as any)}
                </h2>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.7, marginBottom: 20 }}>
                  {t(`services.${key}_text` as any)}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {steps.map((step) => (
                    <li key={step} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <div style={{ width: 4, height: 4, background: "var(--blue)", borderRadius: "50%", flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: 12, color: "var(--gray)" }}>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us strip */}
      <section style={{ background: "var(--blue)", padding: "60px 56px" }} className="px-5 md:px-14">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { icon: Clock, label: "Реакция за 2 часа", sub: "Ответ на заявку в течение 2 рабочих часов" },
              { icon: MapPin, label: "По всему Казахстану", sub: "Выездные специалисты в 16 городах" },
              { icon: ShieldCheck, label: "Гарантия на всё", sub: "Официальная гарантия производителя" },
              { icon: GraduationCap, label: "Сертифицированные инженеры", sub: "Прошедшие обучение у производителей" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Icon size={28} color="rgba(255,255,255,0.8)" />
                <div style={{ fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection locale={locale} />
    </>
  );
}
