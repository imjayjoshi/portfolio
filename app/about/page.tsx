"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollBackground } from "@/components/transitions/ScrollBackground";
import { usePortfolioStore } from "@/store/portfolioStore";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { Code2, Lightbulb, Target, Rocket, LucideIcon } from "lucide-react";

// Icon mapping for dynamic highlights
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Lightbulb,
  Target,
  Rocket,
};

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
        <div className="relative min-h-screen">
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
                <section className="section-padding relative overflow-hidden">
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
                      <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter">
                        {data.aboutPage.headline}{" "}
                        <span className="gradient-text">
                          {data.aboutPage.headlineHighlight}
                        </span>
                      </h1>
                      <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
                        {data.aboutPage.subheadline}
                      </p>
                    </motion.div>

                    <div
                      ref={contentRef}
                      className="grid lg:grid-cols-3 gap-12"
                    >
                      {/* Main content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6"
                      >
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          {data.summary}
                        </p>
                        {data.aboutPage.paragraphs.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-muted-foreground leading-relaxed text-lg"
                          >
                            {paragraph}
                          </p>
                        ))}

                        {/* Highlight cards */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-6">
                          {highlights.map((item, index) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <motion.div
                                className="glass-card rounded-2xl p-6 flex items-start gap-4 h-full border border-white/5"
                                whileHover={{
                                  y: -5,
                                  borderColor: "rgba(var(--accent), 0.3)",
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
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
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Sidebar */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                      >
                        <Tilt3DCard intensity={6}>
                          <div className="glass-card rounded-3xl p-8 border border-white/5">
                            <h3 className="font-display font-bold text-xl mb-6">
                              Core Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {data.aboutPage.coreSkills.map((skill, index) => (
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
                              ))}
                            </div>
                          </div>
                        </Tilt3DCard>

                        <Tilt3DCard intensity={6}>
                          <div className="glass-card rounded-3xl p-8 border border-white/5">
                            <h3 className="font-display font-bold text-xl mb-6">
                              What Drives Me
                            </h3>
                            <ul className="space-y-4 text-muted-foreground">
                              {data.aboutPage.whatDrivesMe.map((item, i) => (
                                <motion.li
                                  key={i}
                                  className="flex items-center gap-4 text-sm sm:text-base"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.6 + i * 0.1 }}
                                >
                                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 shadow-[0_0_10px_rgba(var(--accent),0.5)]" />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </Tilt3DCard>
                      </motion.div>
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
