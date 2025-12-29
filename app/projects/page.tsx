"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Layout } from "@/components/layout/Layout";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ArrowLeft, ExternalLink, Github, ChevronDown } from "lucide-react";
import Link from "next/link";

const FloatingDeckScene = dynamic(
  () =>
    import("@/components/three/FloatingDeckScene").then((mod) => ({
      default: mod.FloatingDeckScene,
    })),
  { ssr: false, loading: () => null }
);

export default function ProjectsPage() {
  const { data } = usePortfolioStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", setScrollValue);
    return () => unsubscribe();
  }, [scrollProgress]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Mobile detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div ref={containerRef} className="relative">
        {/* Hero Section with Floating Deck */}
        <section
          ref={heroRef}
          className="min-h-screen relative overflow-hidden"
        >
          {/* WebGL Canvas */}
          <div className="fixed inset-0 z-0">
            {!isMobile && (
              <Suspense fallback={null}>
                <FloatingDeckScene
                  projects={data.projects}
                  scrollProgress={scrollValue}
                  mousePosition={mousePosition}
                  onSelectProject={setSelectedIndex}
                  selectedIndex={selectedIndex}
                />
              </Suspense>
            )}

            {/* Mobile fallback gradient */}
            {isMobile && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
            )}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
            <motion.div
              className="text-center max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-xs font-medium text-accent uppercase tracking-[0.3em] mb-6 block">
                Featured Work
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                My <span className="gradient-text">Projects</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Each project represents a unique challenge solved with modern
                technologies and thoughtful design.
              </p>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-sm">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="relative z-20 bg-background py-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-medium text-accent uppercase tracking-[0.3em] mb-4 block">
                Portfolio
              </span>
              {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2> */}
              <p className="text-muted-foreground max-w-xl mx-auto">
                Real-world applications built with modern technologies and best
                practices
              </p>
            </motion.div>

            {/* Projects grid with flip cards */}
            <div className="grid gap-8 md:grid-cols-2">
              {data.projects.map((project, index) => {
                const isFlipped = selectedIndex === index;

                return (
                  <motion.div
                    key={project.id}
                    className="relative h-[480px] md:h-[380px] perspective-1000"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Card container with flip animation */}
                    <motion.div
                      className="w-full h-full relative cursor-pointer"
                      style={{ transformStyle: "preserve-3d" }}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setSelectedIndex(isFlipped ? null : index)}
                    >
                      {/* Front of card */}
                      <div
                        className="absolute inset-0 glass-card p-6 md:p-8 group"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {/* Card number */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium text-accent uppercase tracking-widest">
                            Project {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tech stack preview */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-accent/80 border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs px-2.5 py-1 text-muted-foreground">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Click hint */}
                        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                          Click to see details →
                        </div>
                      </div>

                      {/* Back of card */}
                      <div
                        className="absolute inset-0 glass-card p-6 md:p-8"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <div className="flex flex-col h-full">
                          {/* Header */}
                          <h3 className="text-xl font-bold mb-3">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {project.shortDescription}
                          </p>

                          {/* Tech stack */}
                          <div className="mb-6 flex-1">
                            <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Links */}
                          <div className="flex gap-3 pt-4 border-t border-border">
                            {project.liveUrl && project.liveUrl !== "#" && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary flex-1 text-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                <span>Live Demo</span>
                              </a>
                            )}
                            {project.githubUrl && project.githubUrl !== "#" && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary flex-1 text-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github className="w-4 h-4 mr-2" />
                                <span>GitHub</span>
                              </a>
                            )}
                          </div>

                          {/* Flip back hint */}
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

            {/* Back to home */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/"
                className="btn-secondary inline-flex items-center gap-2"
                data-magnetic
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
