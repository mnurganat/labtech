"use client";
import { useState } from "react";

interface Props {
  name: string;
  url: string;
  domain: string;
}

export default function PartnerCard({ name, url, domain }: Props) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(/[\s-]/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "28px 20px",
        background: "white",
        border: "1px solid #eee",
        textDecoration: "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        cursor: "pointer",
        minHeight: 130,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--blue)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(0,82,204,0.10)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#eee";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
      }}
    >
      <div style={{ width: 80, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {imgError ? (
          <div
            style={{
              width: 48,
              height: 48,
              background: "var(--blue)",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            {initials}
          </div>
        ) : (
          <img
            src={`https://logo.clearbit.com/${domain}`}
            alt={name}
            onError={() => setImgError(true)}
            style={{ maxWidth: 80, maxHeight: 48, objectFit: "contain" }}
          />
        )}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--ink)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {name}
      </div>
    </a>
  );
}
