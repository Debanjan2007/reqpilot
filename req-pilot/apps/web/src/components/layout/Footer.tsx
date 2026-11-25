import Image from "next/image";
import Link from "next/link";
import { SITE, FOOTER_COLUMNS } from "@/constants/site";
import { FaGithub, FaWindows, FaLinux, FaApple } from "react-icons/fa6";

const PLATFORM_ICONS = [
  { label: "Windows", Icon: FaWindows },
  { label: "Linux", Icon: FaLinux },
  { label: "macOS", Icon: FaApple },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="about"
      role="contentinfo"
      className="border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              aria-label="ReqPilot home"
              className="flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <Image
                src="/reqpilot.svg"
                alt="ReqPilot logo"
                width={24}
                height={24}
              />
              <span className="text-sm font-semibold text-text-primary">
                {SITE.name}
              </span>
            </Link>
            <p className="max-w-[200px] text-xs leading-relaxed text-text-subtle">
              {SITE.description}
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs text-text-subtle">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-warning"
              />
              {SITE.version} · {SITE.status}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-subtle">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2" role="list">
                {col.links.map((link) => {
                  const isDisabled = link.href === null;
                  return (
                    <li key={link.label}>
                      {isDisabled ? (
                        <span className="flex items-center gap-1.5 text-xs text-text-subtle/50">
                          {link.label}
                          {link.comingSoon && (
                            <span className="rounded bg-surface-elevated px-1 py-0.5 text-[10px] font-medium text-text-subtle/60">
                              soon
                            </span>
                          )}
                        </span>
                      ) : (
                        <Link
                          href={link.href as string}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className="flex items-center gap-1.5 rounded text-xs text-text-muted transition-colors duration-150 hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        >
                          {link.external &&
                            (link.label === "GitHub" ||
                              link.label === "Report an issue") && (
                              <FaGithub
                                size={11}
                                aria-hidden={true}
                                className="opacity-70"
                              />
                            )}
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
        />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-subtle">
            © {year} {SITE.name} · {SITE.domain}
          </p>

          {/* Supported platforms */}
          <div
            className="flex items-center gap-3"
            aria-label="Supported platforms: Windows, Linux, macOS"
          >
            <span className="text-[11px] text-text-subtle/60">Runs on</span>
            {PLATFORM_ICONS.map(({ label, Icon }) => (
              <Icon
                key={label}
                size={13}
                aria-label={label}
                title={label}
                className="text-text-subtle opacity-50"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
