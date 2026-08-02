import { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "about",
    "services",
    "hire",
    "work",
    "projects",
    "skills",
    "experience",
    "certifications",
    "contact",
  ].map((route) => ({
    url: `${siteMetadata.siteUrl}${route ? `/${route}` : "/"}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
