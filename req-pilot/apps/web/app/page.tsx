import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AppPreview } from "@/components/sections/AppPreview";
import { Features } from "@/components/sections/Features";
import { Download } from "@/components/sections/Download";

/**
 * Landing page — Server Component by default.
 * Client interactivity is handled inside each leaf component.
 */
export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AppPreview />
        <Features />
        <Download />
      </main>
      <Footer />
    </>
  );
}
