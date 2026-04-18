"use client";

import { useState, useMemo } from "react";
import { CITIES, STATS, type CityDelivery } from "@/data/deliveries";
import kazakhstanGeo from "@/data/kazakhstan.json";

const W = 1000;
const H = 545;
const LNG_MIN = 46.5;
const LNG_MAX = 87.3;
const LAT_MIN = 40.6;
const LAT_MAX = 55.5;

function project(lng: number, lat: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return [x, y];
}

function ringToPath(ring: number[][]): string {
  return ring
    .map(([lng, lat], i) => {
      const [x, y] = project(lng, lat);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ") + " Z";
}

export default function KazakhstanMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const countryPath = useMemo(() => {
    const feature = (kazakhstanGeo as any).features[0];
    const geom = feature.geometry;
    if (geom.type === "Polygon") {
      return geom.coordinates.map(ringToPath).join(" ");
    }
    return geom.coordinates
      .flat()
      .map(ringToPath)
      .join(" ");
  }, []);

  const selectedCity = selectedId ? CITIES.find((c) => c.id === selectedId) : null;
  const hoveredCity = hoveredId ? CITIES.find((c) => c.id === hoveredId) : null;

  return (
    <section
      style={{
        background: "var(--ink)",
        color: "white",
        padding: "100px 56px",
        position: "relative",
        overflow: "hidden",
      }}
      className="px-5 md:px-14"
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48, maxWidth: 700 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--blue)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            География поставок
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            Работаем по всему Казахстану
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
            }}
          >
            За 15 лет мы поставили оборудование в сотни лабораторий, клиник и университетов по всей стране. Нажмите на город чтобы увидеть детали.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginBottom: 48,
            paddingBottom: 32,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
          }}
        >
          {[
            { v: `${STATS.totalDeliveries}+`, l: "поставок оборудования" },
            { v: STATS.cities, l: "городов Казахстана" },
            { v: STATS.years, l: "лет на рынке" },
          ].map((s) => (
            <div key={s.l}>
              <div
                style={{
                  fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                  fontSize: 40,
                  fontWeight: 700,
                  color: "var(--blue)",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 500,
                  marginTop: 4,
                  letterSpacing: "0.02em",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* Map + Panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selectedCity ? "1fr 340px" : "1fr",
            gap: 32,
            alignItems: "start",
            transition: "grid-template-columns 0.3s",
          }}
        >
          {/* Map */}
          <div style={{ position: "relative" }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <defs>
                <radialGradient id="pulseGrad">
                  <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Country shape */}
              <path
                d={countryPath}
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
                strokeLinejoin="round"
              />

              {/* Cities */}
              {CITIES.map((city) => {
                const [x, y] = project(city.lng, city.lat);
                const isHovered = hoveredId === city.id;
                const isSelected = selectedId === city.id;
                const active = isHovered || isSelected;
                const radius = Math.max(4, Math.min(10, 3 + city.deliveries / 6));

                return (
                  <g
                    key={city.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredId(city.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId(city.id === selectedId ? null : city.id)}
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius * 3}
                      fill="url(#pulseGrad)"
                      style={{
                        transformOrigin: `${x}px ${y}px`,
                        animation: `labtechPulse 2.5s ease-in-out infinite`,
                        animationDelay: `${CITIES.indexOf(city) * 0.15}s`,
                      }}
                    />
                    {/* Outer glow (on hover) */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius + 4}
                      fill="var(--blue)"
                      opacity={active ? 0.3 : 0}
                      style={{ transition: "opacity 0.2s" }}
                    />
                    {/* Dot */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill="var(--blue)"
                      stroke="white"
                      strokeWidth={active ? 2 : 1}
                      style={{ transition: "stroke-width 0.2s" }}
                    />
                    {/* Label (show for active or large cities) */}
                    {(active || city.deliveries >= 20) && (
                      <text
                        x={x + radius + 6}
                        y={y + 4}
                        fontSize={11}
                        fontWeight={600}
                        fill="white"
                        style={{ pointerEvents: "none" }}
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hoveredCity && !selectedCity && (
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "rgba(0,0,0,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "16px 20px",
                  color: "white",
                  pointerEvents: "none",
                  maxWidth: 320,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {hoveredCity.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--blue)", fontWeight: 600 }}>
                  {hoveredCity.deliveries} поставок · {hoveredCity.clients.length} клиентов
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
                  Нажмите чтобы увидеть детали
                </div>
              </div>
            )}
          </div>

          {/* Details Panel */}
          {selectedCity && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "28px 28px 32px",
                position: "sticky",
                top: 90,
              }}
            >
              <button
                onClick={() => setSelectedId(null)}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  fontSize: 20,
                  lineHeight: 1,
                  padding: 4,
                }}
                aria-label="Закрыть"
              >
                ×
              </button>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--blue)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Город
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: 20,
                  lineHeight: 1.15,
                }}
              >
                {selectedCity.name}
              </h3>

              <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "var(--blue)", fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                    {selectedCity.deliveries}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                    поставок
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "var(--blue)", fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}>
                    {selectedCity.clients.length}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                    клиентов
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  Клиенты
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {selectedCity.clients.map((c) => (
                    <li
                      key={c}
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                        padding: "8px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  Популярное оборудование
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {selectedCity.topEquipment.map((e) => (
                    <li
                      key={e}
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                        padding: "6px 0",
                      }}
                    >
                      · {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes labtechPulse {
          0%, 100% { transform: scale(0.6); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
