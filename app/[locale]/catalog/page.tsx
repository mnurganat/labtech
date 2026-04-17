import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getCategories } from "@/lib/supabase/queries";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CategoryCard from "@/components/catalog/CategoryCard";
import CategoryTree from "@/components/catalog/CategoryTree";

const MOCK_CATEGORIES = [
  { id: "1", slug: "kliniko-diagnosticheskaya", name: "Клинико-диагностическая лаборатория", parent_id: null, image_url: null, sort_order: 1, is_active: true, created_at: "" },
  { id: "2", slug: "mikroskopy", name: "Микроскопы", parent_id: null, image_url: null, sort_order: 2, is_active: true, created_at: "" },
  { id: "3", slug: "obshchelaboratornoe", name: "Общелабораторное оборудование", parent_id: null, image_url: null, sort_order: 3, is_active: true, created_at: "" },
  { id: "4", slug: "reagenty", name: "Реагенты и красители", parent_id: null, image_url: null, sort_order: 4, is_active: true, created_at: "" },
  { id: "5", slug: "veterinariya", name: "Ветеринария", parent_id: null, image_url: null, sort_order: 5, is_active: true, created_at: "" },
  { id: "6", slug: "chistye-pomeshcheniya", name: "Чистые помещения", parent_id: null, image_url: null, sort_order: 6, is_active: true, created_at: "" },
  { id: "7", slug: "laboratornaya-posuda", name: "Лабораторная посуда", parent_id: null, image_url: null, sort_order: 7, is_active: true, created_at: "" },
  { id: "8", slug: "nebulayizery", name: "Небулайзеры", parent_id: null, image_url: null, sort_order: 8, is_active: true, created_at: "" },
  { id: "9", slug: "tonomety", name: "Тонометры", parent_id: null, image_url: null, sort_order: 9, is_active: true, created_at: "" },
  { id: "10", slug: "diagnostika-diabeta", name: "Диагностика диабета", parent_id: null, image_url: null, sort_order: 10, is_active: true, created_at: "" },
  { id: "11", slug: "biokhimicheskaya-laboratoriya", name: "Биохимическая лаборатория", parent_id: null, image_url: null, sort_order: 11, is_active: true, created_at: "" },
  { id: "12", slug: "sumki-kholodilniki", name: "Сумки-холодильники", parent_id: null, image_url: null, sort_order: 12, is_active: true, created_at: "" },
];

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
  const t = await getTranslations({ locale, namespace: "catalog" });
  return {
    title: t("title"),
    description: "Полный каталог лабораторного и медицинского оборудования — LabTech Казахстан",
    alternates: {
      canonical: `https://labtech.kz/${locale}/catalog`,
      languages: { ru: "/ru/catalog", kk: "/kz/catalog", en: "/en/catalog" },
    },
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  let categories: any[] = MOCK_CATEGORIES;
  try {
    const fetched = await getCategories(locale);
    if (fetched.length > 0) categories = fetched;
  } catch {}

  return (
    <>
      <Breadcrumb items={[{ label: t("breadcrumb.catalog") }]} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 56px" }} className="px-5 md:px-14">
        <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>
          {t("catalog.title")}
        </h1>
        <p style={{ fontSize: 15, color: "var(--gray)", marginBottom: 48 }}>
          {t("categories.subtitle")}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 40 }} className="catalog-layout">
          {/* Sidebar */}
          <aside>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("catalog.all_categories")}
            </div>
            <CategoryTree categories={categories} />
          </aside>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
            {categories.map((cat: any) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
