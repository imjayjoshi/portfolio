"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { useLenis } from "@/hooks/useLenis";
import { PageBackground } from "@/components/ui/PageBackground";
import { PageLoader } from "@/components/ui/PageLoader";
import { useGsapScroll } from "@/hooks/useGsapScroll";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useLenis();
  useGsapScroll();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <PageLoader />
      <PageBackground />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
