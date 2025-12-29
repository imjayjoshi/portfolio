"use client";

import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function HomePage() {
  const { setBackgroundVariant } = usePortfolioStore();

  useEffect(() => {
    setBackgroundVariant("minimal");
  }, [setBackgroundVariant]);

  return (
    <Layout showBackground={false}>
      <PageTransition>
        {/* Storytelling Scroll Flow */}
        <HeroSection /> {/* "This is who I am" */}
        <AboutSection /> {/* "This is how I think" */}
        <SkillsSection /> {/* "This is what I use" */}
        <ProjectsSection /> {/* "This proves everything" */}
        <ContactSection /> {/* "Let's work together" */}
      </PageTransition>
    </Layout>
  );
}
