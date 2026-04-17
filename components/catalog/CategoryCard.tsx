import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/catalog/${category.slug}`}
      style={{
        display: "block",
        background: "white",
        border: "1px solid var(--border)",
        padding: "28px",
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.2s",
        position: "relative",
      }}
      className="category-card-hover"
    >
      {category.image_url ? (
        <div style={{ width: 48, height: 48, position: "relative", marginBottom: 16 }}>
          <Image src={category.image_url} alt={category.name ?? category.slug} fill style={{ objectFit: "contain" }} />
        </div>
      ) : (
        <div style={{ width: 48, height: 48, background: "var(--blue-lt)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--blue)">
            <path d="M7 18H5V6h2v12zm4-2H9V8h2v8zm4 4h-2V4h2v16zm4-6h-2v-4h2v4z" />
          </svg>
        </div>
      )}
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, marginBottom: 8 }}>
        {category.name ?? category.slug}
      </div>
      {category.description && (
        <div style={{ fontSize: 12, color: "var(--gray)", lineHeight: 1.6, marginBottom: 16 }}>
          {category.description}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Смотреть
        <ChevronRight size={14} />
      </div>
    </Link>
  );
}
