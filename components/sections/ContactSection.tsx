"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Modal from "@/components/ui/Modal";
import LeadForm from "@/components/forms/LeadForm";

export default function ContactSection({ locale }: { locale: string }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  return (
    <section style={{ padding: "80px 56px", background: "var(--ink)", color: "white" }} className="px-5 md:px-14">
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-contact">
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            {t("contact_section.title")}
          </div>
          <h2 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 700, color: "white", marginBottom: 16, lineHeight: 1.2 }}>
            {t("contact_section.subtitle")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 32 }}>
            {[
              { icon: MapPin, text: t("contact_section.address"), href: "https://go.2gis.com/Dfwoj" },
              { icon: Phone, text: t("contact_section.phone"), href: `tel:${t("contact_section.phone").replace(/\s/g,"")}` },
              { icon: Mail, text: t("contact_section.email"), href: `mailto:${t("contact_section.email")}` },
              { icon: Clock, text: t("contact_section.hours"), href: null },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Icon size={16} style={{ color: "var(--blue)", flexShrink: 0, marginTop: 2 }} />
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{text}</a>
                ) : (
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{text}</span>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setOpen(true)} className="btn-primary" style={{ marginTop: 32 }}>
            {t("lead_form.submit")}
          </button>
        </div>

        {/* Inline form */}
        <div style={{ background: "white", padding: "40px" }}>
          <h3 style={{ fontFamily: "var(--font-cactus), 'Cactus Classical Serif', serif", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
            {t("lead_form.title")}
          </h3>
          <LeadForm />
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={t("lead_form.title")}>
        <LeadForm onSuccess={() => setOpen(false)} />
      </Modal>
    </section>
  );
}
