"use client";

import { motion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FaWindows, FaLinux, FaApple } from "react-icons/fa6";
import { SITE } from "@/constants/site";

/** Motion Variants — ease must use named easing strings or EasingFunction, not number[] */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const SUPPORTED_PLATFORMS = [
  { label: "Windows", Icon: FaWindows },
  { label: "Linux", Icon: FaLinux },
  { label: "macOS", Icon: FaApple },
] as const;

export function Hero() {
  const handleCTAClick = () => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 text-center sm:px-6"
    >
      {/* ── Ambient background spotlight ── */}
      <AmbientLight />

      {/* ── Subtle grid overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-background opacity-[0.4]"
      />

      {/* ── Hero content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Status badge */}
        <motion.div variants={item}>
          <StatusBadge />
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          variants={item}
          className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="text-gradient">Your APIs.</span>
          <br />
          <span className="text-text-primary">Your control.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          className="max-w-md text-sm leading-relaxed text-text-muted sm:text-base"
        >
          {SITE.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-4"
        >
          <button
            type="button"
            onClick={handleCTAClick}
            aria-label="Scroll to downloads section"
            className="glossy-button inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium"
          >
            Explore downloads
            <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          </button>

          {/* Platform row */}
          <div
            className="flex items-center gap-4 text-text-subtle"
            aria-label="Supported platforms"
          >
            <span className="text-xs text-text-subtle/60">Available for</span>
            {SUPPORTED_PLATFORMS.map(({ label, Icon }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs text-text-subtle/70"
              >
                <Icon size={13} aria-label={label} title={label} />
                <span className="hidden sm:inline">{label}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Slowly drifting ambient spotlight — CSS-animated for GPU compositing performance */
function AmbientLight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Primary spotlight */}
      <div
        className="absolute left-1/2 top-0 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(70, 130, 160, 0.5) 0%, rgba(35, 65, 90, 0.16) 50%, transparent 72%)",
          animation: "ambientDrift 14s ease-in-out infinite alternate",
        }}
      />
      {/* Secondary mint orb */}
      <div
        className="absolute left-1/3 top-1/3 h-[280px] w-[280px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at center, #86efac 0%, transparent 70%)",
          animation: "ambientDrift 14s ease-in-out infinite alternate-reverse",
        }}
      />
    </div>
  );
}

/** Animated development status indicator */
function StatusBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-text-muted"
      aria-label={`${SITE.version} — ${SITE.status}`}
    >
      {/* Ping dot */}
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warning" />
      </span>
      <span className="font-mono text-[11px] text-text-subtle">
        {SITE.version}
      </span>
      <span aria-hidden="true" className="text-border-highlight">/</span>
      <span>{SITE.status}</span>
    </div>
  );
}
