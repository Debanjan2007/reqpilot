"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Direction of the entrance slide.
   * "up" (default) = fade + slide up, "none" = fade only.
   */
  direction?: "up" | "none";
}

/**
 * Scroll-triggered reveal wrapper using Motion.
 * Respects prefers-reduced-motion via the `animate` prop being overridden.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 24 }
      : { opacity: 0 };

  const animate = isInView
    ? { opacity: 1, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
