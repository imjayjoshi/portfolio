import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { generatePageMetadata } from "@/lib/seo";
import Script from "next/script";

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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="t7a9nz8cjv69smxulqb1oph4y9tr7i" />
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
                "https://github.com/imjayjoshi",
                "https://linkedin.com/in/jay-joshi2708",
                "https://twitter.com/fixwithjay",
              ],
              description:
                "Full Stack Developer specializing in MERN stack and AI technologies.",
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        {gaId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
