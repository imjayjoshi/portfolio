import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata("certifications");

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
