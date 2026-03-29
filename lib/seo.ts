import type { Metadata } from "next";

const defaultSeo = {
  name: "Jay Joshi",
  title: "Full Stack Developer | Portfolio",
  siteUrl: "https://jay-joshi.vercel.app",
  twitterHandle: "@jayjoshi278",
  defaultOgImage: "/og-image.png",
  keywords: [
    "Jay Joshi",
    "Jay Joshi Portfolio",
    "Full Stack Developer India",
    "Jay Joshi Vercel Portfolio",
    "React Developer",
    "Next.js Developer",
    "TypeScript expert",
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
