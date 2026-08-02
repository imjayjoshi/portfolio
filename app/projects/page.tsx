"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { usePageTransition } from "@/components/transitions";
import { ModernButton } from "@/components/ui/ModernButton";

export default function ProjectsPage() {
  const { data } = usePortfolioStore();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { navigateWithTransition } = usePageTransition();

  return (
    <Layout>
      <div className="relative">
        <section
          className="min-h-[60vh] md:min-h-[80vh] relative flex flex-col items-center justify-center px-6 text-center"
          style={{ zIndex: 10 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl relative z-10"
          >
            <motion.span className="text-xs font-semibold text-accent uppercase tracking-[0.3em] mb-4 sm:mb-6 block">
              Featured Work
            </motion.span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 tracking-tight">
              My <span className="gradient-text">Projects</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12">
              Each project represents a unique challenge solved with modern
              technologies and thoughtful design.
            </p>

            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-accent" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section className="relative py-24 px-6" style={{ zIndex: 20 }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-medium text-accent uppercase tracking-[0.3em] mb-4 block">
                Portfolio
              </span>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Real-world applications built with modern technologies and best
                practices
              </p>
            </motion.div>

            <div className="gradient-line mb-16" aria-hidden="true" />

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((project, index) => {
                const isFlipped = selectedIndex === index;
                return (
                  <motion.div
                    key={project.id}
                    className="relative h-[420px] md:h-[400px] perspective-1000"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-full h-full relative cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setSelectedIndex(isFlipped ? null : index)}
                    >
                      <div
                        className="absolute inset-0 glass-card gradient-border p-6 md:p-8 group flex flex-col"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <div className="flex items-center justify-between mb-8">
                          <span className="text-xs font-medium text-accent uppercase tracking-widest">
                            Project {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-[#7c3aed15] flex items-center justify-center text-xs font-bold text-[#a78bfa]">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#a78bfa] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                            {project.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 5).map((tech: string) => (
                              <span
                                key={tech}
                                className="text-xs px-3 py-1 rounded-md bg-[#7c3aed08] text-[#a78bfa] border border-[#7c3aed20]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-8 text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                            <ArrowLeft className="w-2.5 h-2.5 rotate-180" />
                          </div>
                          Click to see full details
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 glass-card gradient-border p-6 md:p-8"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="flex flex-col h-full">
                          <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {project.shortDescription}
                          </p>
                          <div className="mb-6 flex-1">
                            <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.map((tech: string) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-0.5 rounded bg-[#7c3aed08] text-[#a78bfa]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-4 pt-4 border-t border-border">
                            {project.liveUrl && project.liveUrl !== "#" && (
                              <ModernButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.liveUrl, "_blank");
                                }}
                                className="flex-1 py-2.5 px-4"
                              >
                                Live Demo
                              </ModernButton>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" && (
                              <ModernButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(project.githubUrl, "_blank");
                                }}
                                className="flex-1 py-2.5 px-4"
                              >
                                GitHub
                              </ModernButton>
                            )}
                          </div>
                          <div className="text-center mt-3 text-xs text-muted-foreground">
                            ← Click to flip back
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-24 text-center pb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <ModernButton
                onClick={() => navigateWithTransition("/")}
                className="inline-flex items-center gap-2"
              >
                Back to Home
              </ModernButton>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
