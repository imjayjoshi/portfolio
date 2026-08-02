import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("work");

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
