import { PLATFORMS, type PlatformConfig } from "@/constants/site";
import { FaWindows, FaLinux, FaApple } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface PlatformCardProps {
  platform: PlatformConfig;
}

const ICONS: Record<string, IconType> = {
  windows: FaWindows,
  linux: FaLinux,
  macos: FaApple,
};

export function PlatformCard({ platform }: PlatformCardProps) {
  const Icon = ICONS[platform.id];

  return (
    <div className="glossy-card flex flex-col gap-4 rounded-xl p-6">
      {/* OS icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-muted">
        {Icon && <Icon size={20} aria-hidden={true} />}
      </div>

      {/* Labels */}
      <div className="flex-1">
        <p className="text-sm font-semibold text-text-primary">{platform.label}</p>
        <p className="mt-0.5 text-xs text-text-subtle">{platform.os}</p>
        <p className="mt-0.5 font-mono text-xs text-text-subtle">{platform.format}</p>
      </div>

      {/* Download button — always disabled */}
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label={`Download for ${platform.label} — coming soon`}
        className="mt-auto w-full rounded-lg border border-border bg-surface-elevated px-4 py-2 text-center text-xs font-medium text-text-subtle opacity-60"
      >
        Coming soon
      </button>
    </div>
  );
}

/** Convenience re-export */
export { PLATFORMS };
