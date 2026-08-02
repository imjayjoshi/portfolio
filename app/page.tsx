"use client";

import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { FreelancerSection } from "@/components/home/FreelancerSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <Layout>
      <PageTransition>
        <HeroSection />
        <FreelancerSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </PageTransition>
    </Layout>
  );
}
