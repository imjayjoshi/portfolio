import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...generatePageMetadata("home"),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jay Joshi",
              url: "https://jay-joshi.vercel.app",
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/imjayjoshi", // Assuming this from the context
                "https://linkedin.com/in/jay-joshi2708", // Assuming this pattern
                "https://twitter.com/jayjoshi278",
              ],
              description:
                "Full Stack Developer specializing in MERN stack and AI technologies.",
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
