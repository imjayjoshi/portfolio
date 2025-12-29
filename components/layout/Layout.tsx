"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { useLenis } from "@/hooks/useLenis";
import { MagneticCursor } from "@/components/ui/MagneticCursor";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useLenis();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MagneticCursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
