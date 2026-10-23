import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScalePulse AI Systems | Engineering Intelligence. Scaling Realities.",
  description:
    "ScalePulse AI Systems architects high-converting digital experiences and autonomous AI systems that eliminate operational overhead and accelerate growth.",
  metadataBase: new URL("https://scalepulse.ai"),
  openGraph: {
    title: "ScalePulse AI Systems",
    description: "Engineering Intelligence. Scaling Realities.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="page-grid" aria-hidden />
        {children}
      </body>
    </html>
  );
}
