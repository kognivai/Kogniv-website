import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

function WatchThisSpace() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "#0D0F1A", color: "#FFFFFF" }}
    >
      {/* Decorative circle — top left */}
      <div
        style={{
          position: "absolute",
          left: "-15vw",
          top: "-15vw",
          width: "70vw",
          height: "70vw",
          maxWidth: "672px",
          maxHeight: "672px",
          borderRadius: "50%",
          backgroundColor: "rgba(59,130,246,0.06)",
          border: "1px solid #3B82F6",
          pointerEvents: "none",
        }}
      />

      {/* Decorative circle — bottom right */}
      <div
        style={{
          position: "absolute",
          right: "-10vw",
          bottom: "-15vw",
          width: "60vw",
          height: "60vw",
          maxWidth: "576px",
          maxHeight: "576px",
          borderRadius: "50%",
          backgroundColor: "rgba(59,130,246,0.04)",
          border: "1px solid #3B82F6",
          pointerEvents: "none",
        }}
      />

      {/* Top header bar */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid #2D3350",
          padding: "0 4.2vw",
          height: "clamp(48px, 6.8vh, 72px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Kogniv wordmark */}
        <span
          style={{
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            fontSize: "clamp(16px, 1.8vw, 22px)",
            letterSpacing: "0.08em",
            color: "#FFFFFF",
          }}
        >
          KOGNIV
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 4.2vw",
        }}
      >
        {/* Badge */}
        <motion.div {...fade(0.1)} style={{ display: "flex", alignItems: "center", marginBottom: "clamp(24px, 4vh, 48px)" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#1E2235",
              border: "1px solid #2D3350",
              borderRadius: "999px",
              padding: "6px 16px 6px 12px",
            }}
          >
            <div
              style={{
                width: "9px",
                height: "9px",
                borderRadius: "50%",
                backgroundColor: "#3B82F6",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(11px, 1vw, 13px)",
                color: "#3B82F6",
                whiteSpace: "nowrap",
              }}
            >
              ServiceNow AI Transformation Intelligence
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.2)}
          style={{
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            fontSize: "clamp(52px, 9vw, 128px)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "clamp(4px, 1vh, 12px)",
            color: "#FFFFFF",
          }}
        >
          Watch this
        </motion.h1>

        <motion.h1
          {...fade(0.3)}
          style={{
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            fontSize: "clamp(56px, 9.5vw, 136px)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "clamp(32px, 5vh, 64px)",
            color: "#3B82F6",
          }}
        >
          Space.
        </motion.h1>

        {/* Body text */}
        <motion.div {...fade(0.45)}>
          <p
            style={{
              fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: "700",
              fontSize: "clamp(14px, 1.6vw, 22px)",
              lineHeight: 1.8,
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Something significant is on the horizon
          </p>
          <p
            style={{
              fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: "700",
              fontSize: "clamp(14px, 1.6vw, 22px)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            <span style={{ color: "#FFC000" }}>Stay Close </span>
            <span style={{ color: "#FFFFFF" }}>— You won't want to miss what's coming.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchThisSpace />
    </QueryClientProvider>
  );
}
