import type { Metadata } from "next";

const defaultSeo = {
  name: "Jay Joshi",
  title: "Jay Joshi | Full Stack Web Developer (MERN & AI)",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://jay-joshi.vercel.app",
  twitterHandle: "@jayjoshi278",
  defaultOgImage: "/og-image.png",
  keywords: [
    "Jay Joshi",
    "Jay Joshi Full Stack Developer",
    "Jay Joshi MERN Developer Portfolio",
    "Full Stack Developer India",
    "MERN Stack Developer India",
    "React Node.js Projects Portfolio",
    "Hire Full Stack Developer India",
    "Jay Joshi Vercel Portfolio",
    "React Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "AI Engineer",
    "Software Portfolio",
    "Jay Joshi GitHub",
  ].join(", "),
};

type PageKey =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "certifications"
  | "contact";

interface PageSeo {
  title: string;
  description: string;
}

const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    title: `Full Stack Developer Portfolio | ${defaultSeo.name}`,
    description: `Jay Joshi - Full Stack Developer specializing in MERN stack and AI solutions. Explore my projects and expertise in building scalable web applications.`,
  },
  about: {
    title: `MERN Stack Developer India | ${defaultSeo.name}`,
    description: `Learn about Jay Joshi, a MERN Stack Developer based in India. Expertise in React, Node.js, and building high-performance digital products.`,
  },
  projects: {
    title: `React Node.js Projects Portfolio | ${defaultSeo.name}`,
    description: `Explore Jay Joshi's portfolio of MERN stack projects, including AI-powered applications, social platforms, and management systems.`,
  },
  skills: {
    title: `Technical Skills | ${defaultSeo.name}`,
    description: `Expertise in React, Node.js, MongoDB, TypeScript, and AI technologies. Detailed breakdown of Jay Joshi's technical stack.`,
  },
  experience: {
    title: `Professional Experience | ${defaultSeo.name}`,
    description: `Jay Joshi's journey as a MERN Stack Developer, including internships at Budventure Technologies and AICTE.`,
  },
  certifications: {
    title: `Professional Certifications | ${defaultSeo.name}`,
    description: `Certifications in Generative AI, Software Engineering, and AWS Fundamentals earned by Jay Joshi.`,
  },
  contact: {
    title: `Hire Full Stack Developer India | ${defaultSeo.name}`,
    description: `Get in touch with Jay Joshi for full-stack web development opportunities, collaborations, or project inquiries.`,
  },
};

export function generatePageMetadata(page: PageKey): Metadata {
  const seo = pageSeo[page];

  return {
    metadataBase: new URL(defaultSeo.siteUrl),
    applicationName: "Jay Joshi Portfolio",
    title: seo.title,
    description: seo.description,
    keywords: defaultSeo.keywords,
    authors: [{ name: defaultSeo.name }],
    creator: defaultSeo.name,
    publisher: defaultSeo.name,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `${defaultSeo.siteUrl}${page === "home" ? "" : `/${page}`}`,
      siteName: "Jay Joshi Portfolio",
      images: [
        {
          url: defaultSeo.defaultOgImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: defaultSeo.twitterHandle,
      title: seo.title,
      description: seo.description,
      images: [defaultSeo.defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${defaultSeo.siteUrl}${page === "home" ? "" : `/${page}`}`,
    },
  };
}

export const siteMetadata = {
  ...defaultSeo,
  pageSeo,
};
