import { useTranslations } from "next-intl";
import type { Spec } from "@/types";

interface SpecsTableProps {
  specs: Spec[];
}

export default function SpecsTable({ specs }: SpecsTableProps) {
  const t = useTranslations("product");

  if (!specs?.length) return null;

  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20, paddingBottom: 14, borderBottom: "2px solid var(--ink)" }}>
        {t("specs_title")}
      </div>
      {specs.map((spec, i) => (
        <div key={i} className="spec-row">
          <span className="spec-key">{spec.key}</span>
          <span className="spec-val">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
