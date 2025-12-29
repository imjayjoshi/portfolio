import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("skills");

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
