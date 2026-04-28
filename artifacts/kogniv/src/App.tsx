import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

const TARGET = new Date("2026-05-01T00:00:00");

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: "700",
          fontSize: "clamp(28px, 4vw, 60px)",
          lineHeight: 1,
          color: "#FFFFFF",
          backgroundColor: "#1E2235",
          border: "1px solid #2D3350",
          borderRadius: "12px",
          padding: "clamp(10px, 1.5vh, 18px) clamp(14px, 2vw, 28px)",
          minWidth: "clamp(64px, 8vw, 110px)",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {display}
      </div>
      <span
        style={{
          fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
          fontSize: "clamp(9px, 0.9vw, 12px)",
          fontWeight: "600",
          color: "#6B7280",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      {...fade(0.38)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "clamp(10px, 2vw, 24px)",
        marginBottom: "clamp(28px, 4.5vh, 56px)",
      }}
    >
      <CountdownUnit value={time.days} label="Days" />
      <Separator />
      <CountdownUnit value={time.hours} label="Hours" />
      <Separator />
      <CountdownUnit value={time.minutes} label="Minutes" />
      <Separator />
      <CountdownUnit value={time.seconds} label="Seconds" />
    </motion.div>
  );
}

function Separator() {
  return (
    <span
      style={{
        fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: "700",
        fontSize: "clamp(24px, 3.5vw, 52px)",
        color: "#3B82F6",
        lineHeight: 1,
        alignSelf: "center",
        marginBottom: "clamp(18px, 2.5vh, 28px)",
        userSelect: "none",
      }}
    >
      :
    </span>
  );
}

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
        <motion.div {...fade(0.1)} style={{ display: "flex", alignItems: "center", marginBottom: "clamp(20px, 3.5vh, 40px)" }}>
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
            fontSize: "clamp(40px, 7.5vw, 110px)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "clamp(2px, 0.5vh, 8px)",
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
            fontSize: "clamp(44px, 8vw, 118px)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "clamp(24px, 4vh, 48px)",
            color: "#3B82F6",
          }}
        >
          Space.
        </motion.h1>

        {/* Countdown */}
        <Countdown />

        {/* Body text */}
        <motion.div {...fade(0.55)}>
          <p
            style={{
              fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: "700",
              fontSize: "clamp(13px, 1.4vw, 20px)",
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
              fontSize: "clamp(13px, 1.4vw, 20px)",
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
