import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jay Joshi | Full Stack Developer",
  description:
    "Jay Joshi - Full Stack Developer, AI Integrator, and Creative Frontend Developer. Building digital experiences with modern technologies.",
  keywords:
    "Full Stack Developer, AI Integrator, Frontend Developer, React, TypeScript, Node.js, Portfolio",
  authors: [{ name: "Jay Joshi" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Jay Joshi | Full Stack Developer",
    description:
      "Full Stack Developer, AI Integrator, and Creative Frontend Developer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jayjoshi",
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
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
