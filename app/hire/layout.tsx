import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("hire");

export default function HireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
