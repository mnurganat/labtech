import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FlaskConical, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer style={{ background: "var(--ink)", color: "white" }}>
      {/* Main footer */}
      <div style={{ padding: "60px 56px 40px", maxWidth: 1400, margin: "0 auto" }} className="px-5 md:px-14">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }} className="grid-footer">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlaskConical size={18} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", fontSize: 14, fontWeight: 700, color: "white" }}>
                  LabTech
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {t("footer.tagline")}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24, maxWidth: 260 }}>
              {t("footer.company")} — дистрибьютор лабораторного оборудования в Казахстане.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <MapPin size={14} style={{ color: "var(--blue)", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{t("footer.address")}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Phone size={14} style={{ color: "var(--blue)", flexShrink: 0 }} />
                <a href={`tel:${t("footer.phone").replace(/\s/g, "")}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  {t("footer.phone")}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mail size={14} style={{ color: "var(--blue)", flexShrink: 0 }} />
                <a href={`mailto:${t("footer.email")}`} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  {t("footer.email")}
                </a>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              {t("footer.catalog")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Клинико-диагностическая лаборатория",
                "Микроскопы",
                "Центрифуги",
                "Реагенты",
                "Ветеринария",
              ].map((cat) => (
                <Link key={cat} href={`/${locale}/catalog`} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}>
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              {t("footer.company")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: `/${locale}/about`, label: t("footer.about") },
                { href: `/${locale}/services`, label: t("footer.services") },
                { href: `/${locale}/news`, label: t("footer.news") },
                { href: `/${locale}/contacts`, label: t("footer.contacts") },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
              {t("contacts.hours_title")}
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <Clock size={14} style={{ color: "var(--blue)", flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{t("contacts.hours")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 56px" }} className="px-5 md:px-14">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{t("footer.copyright")}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>labtech.kz</span>
        </div>
      </div>
    </footer>
  );
}
