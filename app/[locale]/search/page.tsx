import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import { searchProducts } from "@/lib/supabase/queries";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductCard from "@/components/catalog/ProductCard";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
        <h1 style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
          {t("search.title")}
        </h1>
        {q && (
          <p style={{ fontSize: 15, color: "var(--gray)", marginBottom: 40 }}>
            {t("search.results_for")}: <strong style={{ color: "var(--ink)" }}>«{q}»</strong>
          </p>
        )}

        {!q ? (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <p style={{ fontSize: 16, color: "var(--gray)" }}>{t("search.placeholder")}</p>
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>{t("search.no_results")}</p>
            <p style={{ fontSize: 14, color: "var(--gray)" }}>
              {t("search.no_results_hint")}{" "}
              <Link href={`/${locale}/catalog`} style={{ color: "var(--blue)", textDecoration: "underline" }}>
                {t("search.browse_catalog")}
              </Link>
            </p>
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
