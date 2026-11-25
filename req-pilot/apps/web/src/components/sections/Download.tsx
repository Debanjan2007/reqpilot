import { PLATFORMS, PlatformCard } from "@/components/ui/PlatformCard";
import { Reveal } from "@/components/ui/Reveal";

export function Download() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <Reveal className="mb-12 max-w-sm">
          <h2
            id="download-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            Made for{" "}
            <span className="text-gradient">your desktop.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Native binaries for Windows, Linux and macOS — coming soon.
          </p>
        </Reveal>

        {/* Platform cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {PLATFORMS.map((platform, i) => (
            <Reveal key={platform.id} delay={i * 0.08}>
              <PlatformCard platform={platform} />
            </Reveal>
          ))}
        </div>

        {/* Disclaimer note */}
        <Reveal delay={0.3}>
          <p className="mt-8 text-xs text-text-subtle/60">
            All download options are unavailable while the application is under
            development. Release builds will be distributed via GitHub Releases.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
