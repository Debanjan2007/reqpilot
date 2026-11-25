/**
 * Site-wide constants — single source of truth.
 * Swap out placeholder values when real URLs become available.
 */

export const SITE = {
  name: "ReqPilot",
  domain: "req-pilot.xyz",
  url: "https://req-pilot.xyz",
  description:
    "A local-first desktop API client. Built for developers who want simplicity without sacrificing control.",
  version: "v1.0.0",
  status: "In Development",
  github: "https://github.com/Debanjan2007/reqpilot",
} as const;

export type PlatformId = "windows" | "linux" | "macos";

export interface PlatformConfig {
  id: PlatformId;
  label: string;
  os: string;
  format: string;
  /** Set to a real GitHub Releases URL when the build is ready. */
  downloadUrl: string | null;
}

export const PLATFORMS: PlatformConfig[] = [
  {
    id: "windows",
    label: "Windows",
    os: "Windows 10 / 11",
    format: ".exe installer",
    downloadUrl: null,
  },
  {
    id: "linux",
    label: "Linux",
    os: "Ubuntu 22.04+ · Fedora 38+",
    format: ".AppImage / .deb",
    downloadUrl: null,
  },
  {
    id: "macos",
    label: "macOS",
    os: "macOS 13 Ventura+",
    format: ".dmg installer",
    downloadUrl: null,
  },
];

export interface FooterLink {
  label: string;
  href: string | null;
  external?: boolean;
  comingSoon?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Download", href: "#download" },
      { label: "Release notes", href: null, comingSoon: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/Debanjan2007/reqpilot", external: true },
      { label: "Documentation", href: null, comingSoon: true },
      { label: "Report an issue", href: "https://github.com/Debanjan2007/reqpilot/issues", external: true },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About ReqPilot", href: "#about" },
      { label: "Roadmap", href: null, comingSoon: true },
      { label: SITE.domain, href: `https://${SITE.domain}`, external: true },
    ],
  },
];
