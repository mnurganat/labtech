import { PARTNERS } from "@/data/partners";

export default function PartnerGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 2 }}>
      {PARTNERS.map((p) => {
        const card = (
          <div
            style={{
              background: "var(--silver)",
              padding: "16px 18px",
              borderLeft: "3px solid var(--blue)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {p.logo ? (
              <div style={{ height: 36, marginBottom: 8, display: "flex", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{
                    maxHeight: 32,
                    maxWidth: 120,
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            ) : (
              <div style={{ height: 36, marginBottom: 8, display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: "var(--blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {p.name.charAt(0)}
                </div>
              </div>
            )}
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--ink)", lineHeight: 1.3 }}>{p.name}</div>
            <div style={{ fontSize: 10, color: "var(--blue)", fontWeight: 600 }}>{p.country}</div>
            <div style={{ fontSize: 11, color: "var(--gray)" }}>{p.category}</div>
          </div>
        );

        return p.url ? (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
            className="partner-card-link"
          >
            {card}
          </a>
        ) : (
          <div key={p.name}>{card}</div>
        );
      })}
    </div>
  );
}
