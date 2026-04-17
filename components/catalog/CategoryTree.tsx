"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryTreeProps {
  categories: Category[];
  activeSlug?: string;
}

function buildTree(cats: Category[]): Category[] {
  const map: Record<string, Category> = {};
  const roots: Category[] = [];
  cats.forEach((c) => { map[c.id] = { ...c, children: [] }; });
  cats.forEach((c) => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children!.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

function TreeNode({ node, activeSlug, depth = 0 }: { node: Category; activeSlug?: string; depth?: number }) {
  const locale = useLocale();
  const hasChildren = node.children && node.children.length > 0;
  const isActive = node.slug === activeSlug;
  const [open, setOpen] = useState(isActive || node.children?.some((c) => c.slug === activeSlug) || false);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: depth * 12 }}>
        <Link
          href={`/${locale}/catalog/${node.slug}`}
          style={{
            flex: 1,
            display: "block",
            padding: "8px 0",
            fontSize: 13,
            fontWeight: isActive ? 700 : 500,
            color: isActive ? "var(--blue)" : "var(--ink)",
            textDecoration: "none",
            borderLeft: isActive ? "2px solid var(--blue)" : "2px solid transparent",
            paddingLeft: 12,
            transition: "color 0.15s",
          }}
        >
          {node.name ?? node.slug}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gray)", padding: 4 }}
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
      </div>
      {hasChildren && open && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} activeSlug={activeSlug} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTree({ categories, activeSlug }: CategoryTreeProps) {
  const tree = buildTree(categories);

  return (
    <div style={{ border: "1px solid var(--border)", padding: "4px 0" }}>
      {tree.map((node) => (
        <TreeNode key={node.id} node={node} activeSlug={activeSlug} />
      ))}
    </div>
  );
}
