"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePortfolioStore } from "@/store/portfolioStore";
import {
  ExternalLink,
  Github,
  Rocket,
  Globe,
  Code,
} from "lucide-react";
import { usePageTransition } from "@/components/transitions";
import { ModernButton } from "@/components/ui/ModernButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const projectVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const ProjectsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = usePortfolioStore();
  const [isMounted, setIsMounted] = useState(false);
  const { navigateWithTransition } = usePageTransition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show only first 3 projects on homepage
  const featuredProjects = isMounted ? data.projects.slice(0, 3) : [];

  return (
    <section ref={ref} className="section-padding px-4 sm:px-6" id="projects">
      <div className="container-main">
        {/* Section header with animations */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Label with lines */}
          <motion.div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <motion.span
              className="h-[1px] bg-gradient-to-r from-transparent to-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-sm font-medium text-accent uppercase tracking-[0.3em]">
              Projects
            </span>
            <motion.span
              className="h-[1px] bg-gradient-to-l from-transparent to-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight py-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            This{" "}
            <motion.span
              className="gradient-text inline-block py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              proves
            </motion.span>{" "}
            everything
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real projects that showcase my skills in action
          </motion.p>
        </motion.div>

        {/* Projects grid with stagger */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: "1000px" }}
        >
          {!isMounted ? (
            <div className="h-[400px] flex items-center justify-center md:col-span-2 lg:col-span-3">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            featuredProjects.map((project: any, index: number) => (
              <motion.article
                key={project.id}
                variants={projectVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="project-card p-6 sm:p-8 group relative overflow-hidden rounded-2xl flex flex-col h-full"
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--accent) / 0.1) 0%, transparent 50%, hsl(var(--accent) / 0.05) 100%)",
                  }}
                />

                {/* Number indicator */}
                <motion.span className="absolute -bottom-4 -right-2 text-7xl md:text-8xl font-bold text-accent/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors">
                  0{index + 1}
                </motion.span>

                {/* Content Header */}
                <div className="relative z-10 flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {index === 0 ? (
                        <Rocket className="w-6 h-6 text-accent" />
                      ) : index === 1 ? (
                        <Globe className="w-6 h-6 text-accent" />
                      ) : (
                        <Code className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/20"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <motion.h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-accent transition-colors leading-tight">
                    {project.title}
                  </motion.h3>

                  <motion.p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 line-clamp-4">
                    {project.description}
                  </motion.p>
                </div>

                {/* Footer Tech stack */}
                <div className="relative z-10 pt-6 border-t border-border/10">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/5 text-muted-foreground border border-white/5 hover:border-accent/30 hover:text-accent transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] sm:text-xs px-2 py-1 text-muted-foreground/50">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>

        {/* View all projects */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <ModernButton
            onClick={() => navigateWithTransition("/projects", "glass")}
            showArrow
          >
            View All Projects
          </ModernButton>
        </motion.div>
      </div>
    </section>
  );
};
