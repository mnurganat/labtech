import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const t = useTranslations("breadcrumb");
  const locale = useLocale();

  const allItems: BreadcrumbItem[] = [
    { label: t("home"), href: `/${locale}` },
    ...items,
  ];

  return (
    <div
      style={{
        paddingTop: "16px", paddingBottom: "16px",
        fontSize: 12,
        color: "var(--gray)",
        display: "flex",
        gap: 8,
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
        background: "var(--silver)",
        flexWrap: "wrap",
      }}
      className="px-5 md:px-14"
    >
      {allItems.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <span style={{ color: "var(--border)" }}>›</span>}
          {item.href && i < allItems.length - 1 ? (
            <Link
              href={item.href}
              style={{ color: "var(--gray)", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
