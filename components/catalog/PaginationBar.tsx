import Link from "next/link";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. "/ru/catalog/reagenty"
}

export default function PaginationBar({ currentPage, totalPages, basePath }: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const makeHref = (page: number) =>
    page === 0 ? basePath : `${basePath}?page=${page + 1}`;

  // Show up to 7 page buttons with ellipsis
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) pages.push(i);
  } else {
    pages.push(0);
    if (currentPage > 2) pages.push("…");
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 3) pages.push("…");
    pages.push(totalPages - 1);
  }

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.15s",
    border: "1.5px solid var(--border)",
    color: "var(--ink)",
    background: "white",
  };

  const btnActive: React.CSSProperties = {
    ...btnBase,
    background: "var(--blue)",
    color: "white",
    borderColor: "var(--blue)",
  };

  const btnDisabled: React.CSSProperties = {
    ...btnBase,
    opacity: 0.35,
    pointerEvents: "none",
  };

  return (
    <nav
      aria-label="Pagination"
      style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center", paddingTop: 48, paddingBottom: 16 }}
    >
      {/* Prev */}
      {currentPage > 0 ? (
        <Link href={makeHref(currentPage - 1)} style={btnBase} aria-label="Previous page">
          ←
        </Link>
      ) : (
        <span style={btnDisabled} aria-disabled>←</span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} style={{ ...btnBase, border: "none", color: "var(--gray)", cursor: "default" }}>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={makeHref(p as number)}
            style={p === currentPage ? btnActive : btnBase}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {(p as number) + 1}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages - 1 ? (
        <Link href={makeHref(currentPage + 1)} style={btnBase} aria-label="Next page">
          →
        </Link>
      ) : (
        <span style={btnDisabled} aria-disabled>→</span>
      )}
    </nav>
  );
}
