import type { MetadataRoute } from "next";
import { getAllCategorySlugs, getAllProductSlugs } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://labtech.kz";
const LOCALES = ["ru", "kz", "en"] as const;

function urls(
  path: string,
  priority: number,
  changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"]
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let categorySlugs: string[] = [];
  let productSlugs: string[] = [];

  try {
    [categorySlugs, productSlugs] = await Promise.all([
      getAllCategorySlugs(),
      getAllProductSlugs(),
    ]);
  } catch {}

  return [
    ...urls("", 1.0, "weekly"),
    ...urls("/catalog", 0.9, "weekly"),
    ...urls("/about", 0.7, "monthly"),
    ...urls("/services", 0.7, "monthly"),
    ...urls("/news", 0.8, "weekly"),
    ...urls("/contacts", 0.6, "monthly"),
    ...urls("/osnashchenie-kdl", 0.8, "monthly"),
    ...categorySlugs.flatMap((slug) => urls(`/catalog/${slug}`, 0.8, "weekly")),
    ...productSlugs.flatMap((slug) => urls(`/catalog/all/${slug}`, 0.75, "monthly")),
  ];
}
