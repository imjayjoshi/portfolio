"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollBackground } from "@/components/transitions/ScrollBackground";
import { usePortfolioStore } from "@/store/portfolioStore";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Code2, Lightbulb, Target, Rocket, LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";


const iconMap: Record<string, LucideIcon> = {
  Code2,
  Lightbulb,
  Target,
  Rocket,
};

const PointCloudAboutScene = dynamic(
  () => import("@/components/three/PointCloudAboutScene").then(m => ({
    default: m.PointCloudAboutScene
  })),
  { ssr: false }
);

export default function AboutPage() {
  const { data, setBackgroundVariant } = usePortfolioStore();
  const contentRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setBackgroundVariant("minimal");
  }, [setBackgroundVariant]);

  return (
    <Layout showBackground={false}>
      <PageTransition>
        <div className="relative">
          <ScrollBackground />
          {!isMounted ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            (() => {
              const highlights = data.aboutPage.highlights.map((h) => ({
                icon: iconMap[h.icon] || Code2,
                title: h.title,
                desc: h.desc,
              }));

              return (
                <section className="pt-32 md:pt-40 pb-20 relative overflow-hidden">
                  {/* Background glow */}
                  <div
                    className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 60%)",
                    }}
                  />

                  <div className="container-main relative z-10 px-4 sm:px-6">
                    {/* Header */}
                    <motion.div
                      className="text-center md:text-left mb-12 sm:mb-16 md:mb-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-12 tracking-tighter">
                        {data.aboutPage.headline}{" "}
                        <span className="gradient-text block mt-2 md:mt-4">
                          {data.aboutPage.headlineHighlight}
                        </span>
                      </h1>
                    </motion.div>

                    <div className="space-y-24">
                      {/* Level 1: Intro + Core Skills */}
                      <div className="grid lg:grid-cols-3 gap-12 items-start">
                        <motion.div
                          className="lg:col-span-2 space-y-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          <p className="text-xl text-muted-foreground leading-relaxed">
                            {data.summary}
                          </p>
                          {data.aboutPage.paragraphs.map((paragraph, index) => (
                            <p
                              key={index}
                              className="text-muted-foreground leading-relaxed text-lg"
                            >
                              {paragraph.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                part.startsWith("**") && part.endsWith("**") ? (
                                  <strong
                                    key={i}
                                    className="text-foreground font-semibold"
                                  >
                                    {part.slice(2, -2)}
                                  </strong>
                                ) : (
                                  part
                                ),
                              )}
                            </p>
                          ))}
                        </motion.div>

                        <motion.div
                          className="lg:col-span-1"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <SpotlightCard className="rounded-3xl h-full">
                            <div className="p-8">
                              <h3 className="font-display font-bold text-xl mb-6">
                                Core Skills
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {data.aboutPage.coreSkills.map(
                                  (skill, index) => (
                                    <motion.span
                                      key={skill}
                                      className="px-4 py-2 text-sm bg-accent/5 text-accent rounded-full border border-accent/10 hover:bg-accent/10 transition-colors"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.5 + index * 0.05 }}
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      {skill}
                                    </motion.span>
                                  ),
                                )}
                              </div>
                            </div>
                          </SpotlightCard>
                        </motion.div>
                      </div>

                      {/* Level 2: Highlights Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {highlights.map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="h-full"
                          >
                            <SpotlightCard
                              className="rounded-2xl p-6 flex items-start gap-4 h-full"
                              borderGlowColor="hsl(var(--accent) / 0.5)"
                              intensity={350}
                            >
                              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                <item.icon className="w-6 h-6 text-accent" />
                              </div>
                              <div>
                                <h4 className="font-bold text-foreground text-lg mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </SpotlightCard>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })()
          )}
        </div>
      </PageTransition>
    </Layout>
  );
}
