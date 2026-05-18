"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useRef, useCallback } from "react";

interface CategorySearchProps {
  placeholder: string;
  defaultValue?: string;
}

export default function CategorySearch({ placeholder, defaultValue = "" }: CategorySearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("q", value.trim());
          params.delete("page"); // reset pagination when searching
        } else {
          params.delete("q");
        }
        startTransition(() => {
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
      }, 300);
    },
    [pathname, router, searchParams]
  );

  return (
    <div style={{ position: "relative", maxWidth: 360 }}>
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 16px 10px 40px",
          border: "1.5px solid var(--border)",
          background: "white",
          fontSize: 13,
          color: "var(--ink)",
          outline: "none",
          fontFamily: "var(--font-roboto), Roboto, sans-serif",
          transition: "border-color 0.2s",
          opacity: isPending ? 0.6 : 1,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--blue)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
      {/* Search icon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          left: 13,
          top: "50%",
          transform: "translateY(-50%)",
          color: isPending ? "var(--blue)" : "var(--gray)",
          pointerEvents: "none",
          transition: "color 0.2s",
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}
