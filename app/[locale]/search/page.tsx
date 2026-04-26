import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import { searchProducts } from "@/lib/supabase/queries";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";
import { Search } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CATEGORY_SUGGESTIONS = [
  { slug: "kliniko-diagnosticheskaya", name: "Клинико-диагностическая лаборатория" },
  { slug: "mikroskopy", name: "Микроскопы" },
  { slug: "obshchelaboratornoe", name: "Общелабораторное оборудование" },
  { slug: "reagenty", name: "Реагенты и красители" },
  { slug: "veterinariya", name: "Ветеринария" },
  { slug: "chistye-pomeshcheniya", name: "Чистые помещения" },
  { slug: "laboratornaya-posuda", name: "Лабораторная посуда" },
  { slug: "nebulayizery", name: "Небулайзеры" },
];

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  let results: any[] = [];
  if (q?.trim()) {
    try {
      results = await searchProducts(q, locale);
    } catch {}
  }

  return (
    <>
      <Breadcrumb items={[{ label: t("search.title") }]} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "60px 56px" }} className="px-5 md:px-14">
        <h1 style={{ fontFamily: "var(--font-roboto), Roboto, sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
          {t("search.title")}
        </h1>

        {q && (
          <p style={{ fontSize: 15, color: "var(--gray)", marginBottom: 40 }}>
            {t("search.results_for")}: <strong style={{ color: "var(--ink)" }}>«{q}»</strong>
          </p>
        )}

        {!q ? (
          /* Empty state — show categories */
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "40px 0 32px" }}>
              <Search size={32} style={{ color: "var(--blue)", flexShrink: 0 }} />
              <p style={{ fontSize: 16, color: "var(--gray)" }}>{t("search.placeholder")}</p>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              {t("catalog.all_categories")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORY_SUGGESTIONS.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/catalog/${cat.slug}`}
                  style={{
                    padding: "10px 18px",
                    background: "var(--silver)",
                    color: "var(--ink)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    borderLeft: "2px solid var(--blue)",
                    transition: "background 0.15s",
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          /* No results — show categories as suggestions */
          <div>
            <div style={{ padding: "40px 0 32px" }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{t("search.no_results")}</p>
              <p style={{ fontSize: 14, color: "var(--gray)", marginBottom: 32 }}>
                {t("search.no_results_hint")}{" "}
                <Link href={`/${locale}/catalog`} style={{ color: "var(--blue)", textDecoration: "underline" }}>
                  {t("search.browse_catalog")}
                </Link>
              </p>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--gray)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              {t("catalog.all_categories")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORY_SUGGESTIONS.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/catalog/${cat.slug}`}
                  style={{
                    padding: "10px 18px",
                    background: "var(--silver)",
                    color: "var(--ink)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    borderLeft: "2px solid var(--blue)",
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 2 }}>
            {results.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
