"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/constants/site";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
}

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Download", href: "#download" },
  { label: "GitHub", href: SITE.github, external: true, icon: FaGithub },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header
      role="banner"
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-panel border-b border-border/60 py-3 shadow-sm"
          : "border-b border-transparent py-4",
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="ReqPilot — back to home"
          className="flex items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src="/reqpilot.svg"
            alt="ReqPilot logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-sm font-semibold tracking-tight text-text-primary">
            {SITE.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_LINKS.map(({ label, href, external, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-1.5 rounded text-sm text-text-muted transition-colors duration-150 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                {Icon && (
                  <Icon size={14} aria-hidden={true} className="shrink-0 opacity-80" />
                )}
                {label}
                {external && (
                  <ExternalLink size={11} aria-hidden={true} className="opacity-40" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-border-highlight hover:text-text-primary md:hidden"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="glass-panel overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3" role="list">
              {NAV_LINKS.map(({ label, href, external, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-hover hover:text-text-primary"
                  >
                    {Icon && <Icon size={14} aria-hidden={true} />}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
