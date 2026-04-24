import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const localeMap: Record<string, string> = { ru: "ru_KZ", kz: "kk_KZ", en: "en_KZ" };

  return {
    title: {
      default: "LabTech — лабораторное и медицинское оборудование в Казахстане",
      template: "%s | LabTech",
    },
    description: t("description"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://labtech.kz"),
    keywords: [
      "лабораторное оборудование Казахстан",
      "медицинское оборудование Алматы",
      "анализаторы гематологические",
      "реагенты для лаборатории",
      "ПЦР оборудование",
      "центрифуги лабораторные",
      "LabTech Казахстан",
      "labtech.kz",
    ],
    authors: [{ name: "ТОО «LabTech»", url: "https://labtech.kz" }],
    creator: "ТОО «LabTech»",
    publisher: "ТОО «LabTech»",
    category: "Laboratory Equipment",
    icons: { icon: "/favicon.ico" },
    openGraph: {
      type: "website",
      locale: localeMap[locale] ?? "ru_KZ",
      alternateLocale: ["ru_KZ", "kk_KZ", "en_KZ"].filter(
        (l) => l !== (localeMap[locale] ?? "ru_KZ")
      ),
      siteName: "LabTech",
      title: "LabTech — лабораторное и медицинское оборудование",
      description: t("description"),
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://labtech.kz"}/${locale}`,
    },
    alternates: {
      canonical: `https://labtech.kz/${locale}`,
      languages: {
        "ru-KZ": "https://labtech.kz/ru",
        "kk-KZ": "https://labtech.kz/kz",
        "en-KZ": "https://labtech.kz/en",
        "x-default": "https://labtech.kz/ru",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" style={{ fontFamily: "var(--font-manrope), sans-serif" }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContact />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
