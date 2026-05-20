"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare, X } from "lucide-react";
import LeadForm from "@/components/forms/LeadForm";

export default function FloatingContact() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Instagram floating button */}
      <a
        href="https://www.instagram.com/labtechnology/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        style={{
          position: "fixed",
          bottom: 96,
          right: 28,
          zIndex: 200,
          width: 44,
          height: 44,
          background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(188,24,136,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(188,24,136,0.55)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(188,24,136,0.4)";
        }}
      >
        {/* Instagram SVG icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
        </svg>
      </a>

      {/* Floating CTA button */}
      <button
        onClick={() => setOpen(true)}
        aria-label={t("contact_section.title")}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 200,
          background: "var(--blue)",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 22px",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "Roboto, sans-serif",
          letterSpacing: "0.03em",
          boxShadow: "0 4px 24px rgba(16,117,200,0.45)",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--blue-dk)";
          e.currentTarget.style.boxShadow = "0 6px 32px rgba(16,117,200,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--blue)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(16,117,200,0.45)";
        }}
      >
        <MessageSquare size={17} />
        {t("contact_section.title")}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 300,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Modal panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 88,
            right: 28,
            zIndex: 400,
            background: "white",
            width: 420,
            maxWidth: "calc(100vw - 32px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "20px 24px 16px",
              borderBottom: "1px solid var(--border)",
              background: "var(--blue)",
              color: "white",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.01em" }}>
                {t("lead_form.title")}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 3 }}>
                {t("lead_form.subtitle")}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("common.close")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.8)",
                padding: 4,
                marginTop: -2,
                flexShrink: 0,
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div style={{ padding: "24px" }}>
            <LeadForm onSuccess={() => setTimeout(() => setOpen(false), 2500)} />
          </div>
        </div>
      )}
    </>
  );
}
