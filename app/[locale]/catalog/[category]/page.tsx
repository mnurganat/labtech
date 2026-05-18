import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getCategoryBySlug, getProducts, getProductsPage, searchProductsInCategory, getAllCategorySlugs, PAGE_SIZE } from "@/lib/supabase/queries";
import { SITE_URL } from "@/lib/siteUrl";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";
import CategoryCard from "@/components/catalog/CategoryCard";
import CategoryTree from "@/components/catalog/CategoryTree";
import PaginationBar from "@/components/catalog/PaginationBar";
import CategorySearch from "@/components/catalog/CategorySearch";
import CATEGORIES from "@/data/categoryTree";

// Re-fetch from Supabase on every request so product/category changes are instant
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const locales = routing.locales;
  // Always include hardcoded category slugs (both parents and subcategories)
  const hardcodedSlugs = CATEGORIES.map((c) => c.slug);
  try {
    const dbSlugs = await getAllCategorySlugs();
    const allSlugs = Array.from(new Set([...hardcodedSlugs, ...dbSlugs]));
    return locales.flatMap((locale) => allSlugs.map((category) => ({ locale, category })));
  } catch {
    return locales.flatMap((locale) => hardcodedSlugs.map((category) => ({ locale, category })));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  setRequestLocale(locale);
  try {
    const cat = await getCategoryBySlug(category, locale);
    const localCat = CATEGORIES.find((c) => c.slug === category);
    const name = cat?.name ?? localCat?.name ?? category;
    return {
      title: name,
      description: `Купить ${name} в Казахстане. LabTech — официальный дистрибьютор.`,
      alternates: { canonical: `${SITE_URL}/${locale}/catalog/${category}` },
    };
  } catch {
    return { title: `Каталог | LabTech` };
  }
}


export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { locale, category } = await params;
  const { page: pageParam, q: searchQuery } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const searchTerm = searchQuery?.trim() ?? "";
  // Parse page number (1-indexed in URL, 0-indexed internally)
  const currentPage = Math.max(0, parseInt(pageParam ?? "1", 10) - 1);

  // Find subcategories from local tree (fast, no DB call)
  const localCat = CATEGORIES.find((c) => c.slug === category);
  const localSubcats = localCat
    ? CATEGORIES.filter((c) => c.parent_id === localCat.id)
    : [];

  let categoryData: any = null;
  let products: any[] = [];
  let totalProducts = 0;

  try {
    categoryData = await getCategoryBySlug(category, locale);
    if (categoryData) {
      if (searchTerm) {
        // Search mode: filter by name within this category (no pagination)
        products = await searchProductsInCategory(categoryData.id, searchTerm, locale);
        totalProducts = products.length;
      } else if (localSubcats.length > 0) {
        // Parent categories with subcategories: no products, show tiles
        const fetched = await getProducts(categoryData.id, locale);
        products = fetched;
        totalProducts = fetched.length;
      } else {
        // Leaf category: use paginated query
        const result = await getProductsPage(categoryData.id, locale, currentPage);
        products = result.products;
        totalProducts = result.total;
      }
    }
  } catch {}

  const catName = categoryData?.name ?? localCat?.name ?? category;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  const basePath = `/${locale}/catalog/${category}`;

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("breadcrumb.catalog"), href: `/${locale}/catalog` },
          { label: catName },
        ]}
      />
      <div style={{ maxWidth: 1400, margin: "0 auto", paddingTop: "60px", paddingBottom: "60px" }} className="px-5 md:px-14">
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 40, alignItems: "start" }} className="catalog-layout">
          {/* Sidebar */}
          <aside>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
              {t("catalog.all_categories")}
            </div>
            <CategoryTree categories={CATEGORIES as any} activeSlug={category} />
          </aside>

          {/* Main */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h1 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: "var(--ink)" }}>
                {catName}
              </h1>
              {totalProducts > 0 && (
                <span style={{ fontSize: 13, color: "var(--gray)", whiteSpace: "nowrap" }}>
                  {totalProducts} {t("categories.products_count")}
                </span>
              )}
            </div>

            {/* Search — only on leaf categories with products */}
            {localSubcats.length === 0 && (
              <div style={{ marginBottom: 24 }}>
                <CategorySearch
                  placeholder={t("catalog.search_placeholder")}
                  defaultValue={searchTerm}
                />
              </div>
            )}

            {/* If parent category with subcategories and no direct products → show subcategory tiles */}
            {localSubcats.length > 0 && products.length === 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
                {localSubcats.map((sub) => (
                  <CategoryCard key={sub.id} category={sub as any} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 2 }}>
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} categorySlug={category} />
                  ))}
                </div>
                {/* Hide pagination during search */}
                {!searchTerm && (
                  <PaginationBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath={basePath}
                  />
                )}
              </>
            ) : (
              <div style={{ padding: "60px 0", textAlign: "center", color: "var(--gray)" }}>
                {searchTerm ? (
                  <>
                    <p style={{ fontSize: 16 }}>{t("catalog.no_results_query")} «{searchTerm}»</p>
                    <p style={{ fontSize: 13, color: "var(--gray)", marginTop: 8 }}>{t("catalog.no_products")}</p>
                  </>
                ) : (
                  <p style={{ fontSize: 16 }}>{t("catalog.no_products")}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
