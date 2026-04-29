import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedLogo } from "@/components/animated-logo";

const queryClient = new QueryClient();

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

const TARGET = new Date("2026-05-02T00:00:00");

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
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: "700",
          fontSize: "clamp(24px, 3.2vw, 52px)",
          lineHeight: 1,
          color: "#FFFFFF",
          backgroundColor: "#1E2235",
          border: "1px solid #2D3350",
          borderRadius: "12px",
          padding: "clamp(8px, 1.2vh, 16px) clamp(12px, 1.6vw, 24px)",
          minWidth: "clamp(56px, 6.5vw, 96px)",
          textAlign: "center",
          letterSpacing: "0.04em",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        style={{
          fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
          fontSize: "clamp(9px, 0.75vw, 11px)",
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

function Separator() {
  return (
    <span
      style={{
        fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
        fontWeight: "700",
        fontSize: "clamp(20px, 2.8vw, 44px)",
        color: "#3B82F6",
        lineHeight: 1,
        alignSelf: "center",
        marginBottom: "clamp(16px, 2vh, 24px)",
        userSelect: "none",
      }}
    >
      :
    </span>
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
        gap: "clamp(8px, 1.4vw, 20px)",
        marginBottom: "clamp(24px, 4vh, 48px)",
      }}
    >
      <CountdownUnit value={time.days}    label="Days"    />
      <Separator />
      <CountdownUnit value={time.hours}   label="Hours"   />
      <Separator />
      <CountdownUnit value={time.minutes} label="Minutes" />
      <Separator />
      <CountdownUnit value={time.seconds} label="Seconds" />
    </motion.div>
  );
}

function WatchThisSpace() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0D0F1A",
        color: "#FFFFFF",
      }}
    >
      {/* Decorative circle — top left */}
      <div style={{
        position: "absolute", left: "-15vw", top: "-15vw",
        width: "70vw", height: "70vw", maxWidth: "672px", maxHeight: "672px",
        borderRadius: "50%", backgroundColor: "rgba(59,130,246,0.06)",
        border: "1px solid #3B82F6", pointerEvents: "none",
      }} />

      {/* Decorative circle — bottom right */}
      <div style={{
        position: "absolute", right: "-10vw", bottom: "-15vw",
        width: "60vw", height: "60vw", maxWidth: "576px", maxHeight: "576px",
        borderRadius: "50%", backgroundColor: "rgba(59,130,246,0.04)",
        border: "1px solid #3B82F6", pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{
        position: "relative", zIndex: 10,
        borderBottom: "1px solid #2D3350",
        padding: "0 4.2vw",
        height: "clamp(48px, 6.8vh, 72px)",
        display: "flex", alignItems: "center",
        gap: "12px",
      }}>
        {/* K tile */}
        <div style={{
          width: "clamp(32px, 2.8vw, 40px)",
          height: "clamp(32px, 2.8vw, 40px)",
          backgroundColor: "#3B82F6",
          borderRadius: "clamp(5px, 0.5vw, 7px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700",
            fontSize: "clamp(14px, 1.3vw, 18px)",
            color: "#FFFFFF",
            lineHeight: 1,
          }}>K</span>
        </div>
        {/* Wordmark */}
        <span style={{
          fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: "700",
          fontSize: "clamp(15px, 1.4vw, 20px)",
          color: "#FFFFFF",
          letterSpacing: "0.02em",
        }}>
          Kogniv
        </span>
      </div>

      {/* Body: two columns on desktop */}
      <div style={{
        position: "relative", zIndex: 10,
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "clamp(24px, 4vh, 48px) 4.2vw",
        gap: "clamp(24px, 4vw, 64px)",
      }}>

        {/* Left column — text + countdown */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Badge */}
          <motion.div {...fade(0.1)} style={{ marginBottom: "clamp(20px, 3vh, 36px)" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              backgroundColor: "#1E2235", border: "1px solid #2D3350",
              borderRadius: "999px", padding: "6px 16px 6px 12px",
            }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#3B82F6", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(10px, 0.85vw, 13px)", color: "#3B82F6", whiteSpace: "nowrap",
              }}>
                ServiceNow AI Transformation Intelligence
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 {...fade(0.2)} style={{
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700", fontSize: "clamp(40px, 6.5vw, 100px)",
            lineHeight: 1.05, margin: 0, marginBottom: "clamp(2px, 0.4vh, 8px)", color: "#FFFFFF",
          }}>
            Watch this
          </motion.h1>

          <motion.h1 {...fade(0.3)} style={{
            fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: "700", fontSize: "clamp(44px, 7vw, 108px)",
            lineHeight: 1.05, margin: 0, marginBottom: "clamp(20px, 3.5vh, 44px)", color: "#3B82F6",
          }}>
            Space.
          </motion.h1>

          {/* Countdown */}
          <Countdown />

          {/* Body text */}
          <motion.div {...fade(0.55)}>
            <p style={{
              fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: "700", fontSize: "clamp(13px, 1.2vw, 18px)",
              lineHeight: 1.8, margin: 0, color: "#FFFFFF",
            }}>
              Something significant is on the horizon
            </p>
            <p style={{
              fontFamily: "'Calibri', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: "700", fontSize: "clamp(13px, 1.2vw, 18px)",
              lineHeight: 1.8, margin: 0,
            }}>
              <span style={{ color: "#FFC000" }}>Stay Close </span>
              <span style={{ color: "#FFFFFF" }}>— You won't want to miss what's coming.</span>
            </p>
          </motion.div>
        </div>

        {/* Right column — animated logo (hidden on small screens) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          className="logo-col"
        >
          <AnimatedLogo />
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
