"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { useLenis } from "@/hooks/useLenis";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { ScrollBackground } from "@/components/transitions/ScrollBackground";

interface LayoutProps {
  children: ReactNode;
  variant?: "minimal" | "default" | "enhanced";
  showBackground?: boolean;
}

export const Layout = ({ children, showBackground = true }: LayoutProps) => {
  useLenis();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      {showBackground && <ScrollBackground />}
      <MagneticCursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
