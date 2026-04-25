"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const CERTS = [
  "https://www.labtech.kz/images/sertifikaty/F2v.jpg",
  "https://www.labtech.kz/images/sertifikaty/gis.jpg",
  "https://www.labtech.kz/images/sertifikaty/S1.jpg",
  "https://www.labtech.kz/images/sertifikaty/S2.jpg",
  "https://www.labtech.kz/images/sertifikaty/S3.jpg",
  "https://www.labtech.kz/images/sertifikaty/S4.jpg",
  "https://www.labtech.kz/images/sertifikaty/S5.jpg",
  "https://www.labtech.kz/images/sertifikaty/S6.jpg",
  "https://www.labtech.kz/images/sertifikaty/S7.jpg",
  "https://www.labtech.kz/images/sertifikaty/S8.jpg",
  "https://www.labtech.kz/images/sertifikaty/S9.jpg",
  "https://www.labtech.kz/images/sertifikaty/S10.jpg",
  "https://www.labtech.kz/images/sertifikaty/S11.jpg",
  "https://www.labtech.kz/images/0new/sert.jpg",
];

export default function CertificateGallery() {
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive((i) => (i! > 0 ? i! - 1 : CERTS.length - 1));
  const next = () => setActive((i) => (i! < CERTS.length - 1 ? i! + 1 : 0));

  return (
    <>
      {/* Thumbnails grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
        {CERTS.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: "white",
              border: "1px solid #e8e8e8",
              padding: 8,
              cursor: "pointer",
              aspectRatio: "3/4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--blue)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,82,204,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Сертификат ${i + 1}`}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setActive(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setActive(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: 10,
                display: "flex",
                borderRadius: 4,
              }}
            >
              <X size={22} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute",
                left: 16,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "12px 10px",
                display: "flex",
                borderRadius: 4,
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "85vw", maxHeight: "88vh" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CERTS[active]}
                alt={`Сертификат ${active + 1}`}
                style={{ maxWidth: "100%", maxHeight: "88vh", objectFit: "contain", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
              />
            </div>

            {/* Counter */}
            <div style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              fontWeight: 500,
            }}>
              {active + 1} / {CERTS.length}
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute",
                right: 16,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "12px 10px",
                display: "flex",
                borderRadius: 4,
              }}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
