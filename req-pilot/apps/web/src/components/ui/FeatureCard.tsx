import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="glossy-card flex flex-col gap-4 rounded-xl p-6">
      {/* Icon container */}
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elevated text-primary">
        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
