import { ImageResponse } from "next/og";

export const alt = "Expenseliy — Simple Expense Tracking & Financial Management";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
        {/* Top Bar / Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "#00874C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
              marginRight: "16px",
            }}
          >
            ↗
          </div>
          <div style={{ display: "flex", fontSize: "32px", fontWeight: 800 }}>
            <span>Expense</span>
            <span style={{ color: "#00D27B" }}>liy</span>
          </div>
        </div>

        {/* Main Headline & Value Prop */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
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
              marginBottom: "16px",
              alignSelf: "flex-start",
            }}
          >
            Financial Management & Expense Tracking
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "50px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Simple expense tracking for better financial decisions.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#8daaa0",
              lineHeight: 1.4,
            }}
          >
            Track expenses, income, investments & cash flow with instant algorithmic insights.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #223730",
            paddingTop: "24px",
            width: "100%",
            fontSize: "16px",
            color: "#d1e4dc",
          }}
        >
          <div style={{ display: "flex", marginRight: "32px" }}>
            <span style={{ color: "#00D27B", marginRight: "8px" }}>✓</span> 40 Free Lifetime Transactions
          </div>
          <div style={{ display: "flex", marginRight: "32px" }}>
            <span style={{ color: "#00D27B", marginRight: "8px" }}>✓</span> Multi-Asset (Income & Investments)
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#00D27B", marginRight: "8px" }}>✓</span> Isolated User Data & Zero Selling
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
