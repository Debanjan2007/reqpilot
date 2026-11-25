import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/constants/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Local-first desktop API client`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "API client",
    "API testing",
    "REST client",
    "desktop app",
    "developer tools",
    "local-first",
    "HTTP client",
    "ReqPilot",
  ],
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — Local-first desktop API client`,
    description: SITE.description,
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Local-first desktop API client`,
    description: SITE.description,
  },
  icons: {
    icon: "/reqpilot.svg",
    shortcut: "/reqpilot.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[inter.variable, jetbrainsMono.variable].join(" ")}
    >
      <body className="bg-gradient-page min-h-svh antialiased">
        {children}
      </body>
    </html>
  );
}
