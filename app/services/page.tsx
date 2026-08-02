"use client";

import { motion } from "framer-motion";
import { Layers, Sparkles, Rocket, Wrench, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ModernButton } from "@/components/ui/ModernButton";
import { usePortfolioStore } from "@/store/portfolioStore";

const iconMap = { Layers, Sparkles, Rocket, Wrench };

export default function ServicesPage() {
  const { data } = usePortfolioStore();

  return (
    <Layout>
      <PageTransition>
        <section className="pt-28 md:pt-36 pb-16 section-padding">
          <div className="container-main px-4 sm:px-6">
            <motion.div
              data-gsap-reveal
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-xs font-semibold text-[#a78bfa] uppercase tracking-[0.3em] mb-4 block">
                For clients
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Freelance <span className="gradient-text">services</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Production-ready web development for startups, agencies, and businesses.
                {data.availability}
              </p>
            </motion.div>

            <div data-gsap-stagger className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {data.freelanceServices.map((service) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap] || Layers;
                return (
                  <article
                    key={service.id}
                    data-gsap-stagger-item
                    className="glass-card gradient-border p-8 sm:p-10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#7c3aed15] flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#a78bfa]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-[#06b6d4] mt-0.5 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/hire"
                      className="inline-flex items-center gap-2 text-sm text-[#a78bfa] hover:underline"
                    >
                      See packages <ArrowRight className="w-4 h-4" />
                    </Link>
                  </article>
                );
              })}
            </div>

            <SectionDivider className="!pb-0" />

            <div data-gsap-reveal className="text-center mt-12">
              <ModernButton onClick={() => (window.location.href = "/contact")} showArrow>
                Start a project
              </ModernButton>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
