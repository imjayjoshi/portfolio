import type { Metadata } from "next";

// Default SEO configuration (used at build time)
const defaultSeo = {
  name: "Jay Joshi",
  title: "Full Stack Developer Portfolio",
  siteUrl: "https://jay-joshi.vercel.app",
  twitterHandle: "@jayjoshi278",
  defaultOgImage: "/og-image.png",
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
    title: `${defaultSeo.name} | ${defaultSeo.title}`,
    description: `Full Stack Developer specializing in MERN stack and AI technologies. Building scalable, high-performance web applications.`,
  },
  about: {
    title: `About | ${defaultSeo.name}`,
    description: `Learn about ${defaultSeo.name} - a passionate Full Stack Developer with expertise in React, Node.js, and modern web technologies.`,
  },
  projects: {
    title: `Projects | ${defaultSeo.name}`,
    description: `Explore my portfolio of web applications built with React, Node.js, TypeScript, and AI technologies.`,
  },
  skills: {
    title: `Skills | ${defaultSeo.name}`,
    description: `Technical skills and expertise in JavaScript, TypeScript, React, Node.js, MongoDB, and more.`,
  },
  experience: {
    title: `Experience | ${defaultSeo.name}`,
    description: `Professional experience and educational background in software development and AI.`,
  },
  certifications: {
    title: `Certifications | ${defaultSeo.name}`,
    description: `Professional certifications in AI, cloud computing, and software engineering.`,
  },
  contact: {
    title: `Contact | ${defaultSeo.name}`,
    description: `Get in touch for collaboration, job opportunities, or project inquiries.`,
  },
};

export function generatePageMetadata(page: PageKey): Metadata {
  const seo = pageSeo[page];

  return {
    metadataBase: new URL(defaultSeo.siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: `${defaultSeo.name}, Full Stack Developer, React, TypeScript, Node.js, Portfolio`,
    authors: [{ name: defaultSeo.name }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `${defaultSeo.siteUrl}${page === "home" ? "" : `/${page}`}`,
      siteName: `${defaultSeo.name} Portfolio`,
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
