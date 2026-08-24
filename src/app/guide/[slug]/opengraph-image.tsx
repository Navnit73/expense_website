import { ImageResponse } from "next/og";
import { getGuideBySlug, getAllGuides } from "@/lib/guide";

export const alt = "Expenseliy Financial Guide";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  const title = guide?.title || "Financial Guide & Best Practices";
  const category = guide?.category || "Financial Guide";
  const readingTime = guide?.readingTime || "5 min read";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#111c18",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Top Bar / Logo & Category Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                backgroundColor: "#00874C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: 800,
                marginRight: "12px",
              }}
            >
              ↗
            </div>
            <div style={{ display: "flex", fontSize: "26px", fontWeight: 800 }}>
              <span>Expense</span>
              <span style={{ color: "#00D27B" }}>liy</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(0, 210, 123, 0.15)",
              border: "1px solid #00874C",
              padding: "6px 14px",
              borderRadius: "6px",
              color: "#00D27B",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {category} • {readingTime}
          </div>
        </div>

        {/* Article Title */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "950px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "44px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #223730",
            paddingTop: "24px",
            width: "100%",
            fontSize: "16px",
            color: "#8daaa0",
          }}
        >
          <div style={{ display: "flex" }}>Expenseliy Knowledge Hub — expenseliy.com/guide</div>
          <div style={{ display: "flex", color: "#00D27B", fontWeight: 600 }}>Read full guide →</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
