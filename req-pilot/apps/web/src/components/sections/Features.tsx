import { Target, HardDrive, Search } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  {
    icon: Target,
    title: "Test with precision",
    description:
      "Compose and inspect HTTP requests with full control over request parameters, headers and bodies.",
  },
  {
    icon: HardDrive,
    title: "Keep it on-device",
    description:
      "A local-first workspace designed to keep request data on your machine — no cloud, no account required.",
  },
  {
    icon: Search,
    title: "Inspect every detail",
    description:
      "Inspect response status codes, headers, response bodies and timing information at a glance.",
  },
] as const;

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading block */}
        <Reveal className="mb-12 max-w-sm">
          <h2
            id="features-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Less noise.{" "}
            <span className="text-gradient">More control.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Everything you need to test HTTP APIs. Nothing you don&apos;t.
          </p>
        </Reveal>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map(({ icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <FeatureCard icon={icon} title={title} description={description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
