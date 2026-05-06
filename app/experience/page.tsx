"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { usePortfolioStore } from "@/store/portfolioStore";
import { Briefcase, MapPin, Calendar } from "lucide-react";


/*
const ExperienceScene = dynamic(
  () =>
    import("@/components/three/ExperienceScene").then((mod) => ({
      default: mod.ExperienceScene,
    })),
  { ssr: false, loading: () => null }
);
*/

const DNAHelixExperienceScene = dynamic(
  () =>
    import("@/components/three/DNAHelixExperienceScene").then((m) => ({
      default: m.DNAHelixExperienceScene,
    })),
  { ssr: false }
);
export default function ExperiencePage() {
  const { data, setBackgroundVariant } = usePortfolioStore();
  const headerRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
    setBackgroundVariant("default");
  }, [setBackgroundVariant]);

  // Scroll progress for the timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate which experience is active based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!experienceRefs.current.length) return;

      const windowCenter = window.innerHeight / 2;
      let newActiveIndex = 0;

      experienceRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;

          if (elementCenter < windowCenter + 100) {
            newActiveIndex = index;
          }
        }
      });

      setActiveIndex(newActiveIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data.experiences.length]);

  if (!isMounted) return null;

  return (
    <Layout showBackground={false}>
      <PageTransition>
        <div className="relative min-h-screen">
          {/* Background Scene */}
          <div className="fixed inset-0 z-0">
            {/**
             * Previous background scene kept for reference:
             * <ExperienceScene />
             */}
            <Suspense fallback={null}>
              <DNAHelixExperienceScene
                activeIndex={activeIndex}
                totalExperiences={data.experiences.length}
                scrollProgress={scrollYProgress.get()}
              />
            </Suspense>
          </div>

          <section className="section-padding relative z-10">
            <div className="container-main px-4 sm:px-6">
              {/* Header */}
              <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 md:mb-16"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Briefcase size={24} className="text-accent sm:w-7 sm:h-7" />
                  <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                    Work <span className="gradient-text">Experience</span>
                  </h1>
                </div>
                <p className="text-muted-foreground mb-8 md:mb-16 max-w-2xl mx-auto text-base sm:text-lg px-4">
                  My professional journey and the impact I've made along the
                  way.
                </p>
              </motion.div>

              {/* Timeline */}
              <div ref={containerRef} className="relative">
                {/* Timeline line - left on mobile, center on desktop */}
                <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/30 md:-translate-x-1/2" />

                {/* Animated progress line */}
                <motion.div
                  className="absolute left-4 sm:left-6 md:left-1/2 top-0 w-0.5 bg-accent md:-translate-x-1/2 origin-top"
                  style={{
                    scaleY: smoothProgress,
                    height: "100%",
                  }}
                />

                {/* Experience entries */}
                {data.experiences.map((exp, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <div key={exp.id} className="relative mb-8 sm:mb-12">
                      {/* Timeline dot */}
                      <div
                        className="absolute left-4 sm:left-6 md:left-1/2 top-6 -translate-x-1/2 z-30"
                        ref={(el) => {
                          experienceRefs.current[index] =
                            el?.parentElement as HTMLDivElement;
                        }}
                      >
                        <div
                          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-background shadow-md ${
                            activeIndex >= index ? "bg-accent" : "bg-muted"
                          }`}
                        />
                      </div>

                      {/* Card container */}
                      <motion.div
                        className={`w-[calc(100%-2.5rem)] sm:w-[calc(100%-3.5rem)] md:w-[calc(50%-2rem)] ml-8 sm:ml-12 ${
                          isLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
                        }`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
                          {/* Period badge */}
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <Calendar
                              size={12}
                              className="text-accent sm:w-3.5 sm:h-3.5"
                            />
                            <span className="text-xs sm:text-sm text-accent font-medium">
                              {exp.period}
                            </span>
                          </div>

                          <h3 className="font-display text-lg sm:text-xl font-semibold mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-foreground/80 text-xs sm:text-sm font-medium mb-1">
                            {exp.company}
                          </p>

                          {exp.location && (
                            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3 sm:mb-4">
                              <MapPin size={10} className="sm:w-3 sm:h-3" />
                              {exp.location}
                            </div>
                          )}

                          <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          {exp.highlights && exp.highlights.length > 0 && (
                            <ul className="text-muted-foreground text-xs sm:text-sm mb-4 sm:mb-5 space-y-1.5 sm:space-y-2">
                              {exp.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent mt-1.5 sm:mt-2 flex-shrink-0" />
                                  <span className="leading-relaxed">{h}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-border/50">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs bg-accent/10 text-accent rounded-md sm:rounded-lg border border-accent/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Education Section */}
              <div className="mt-16 sm:mt-20 md:mt-24">
                <motion.h2
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 md:mb-12 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="gradient-text">Education</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-xs sm:text-sm text-accent font-medium">
                        {edu.period}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-semibold mt-2 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                        {edu.institution}
                      </p>
                      <div className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-accent/10 text-accent text-xs sm:text-sm">
                        {edu.grade}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageTransition>
    </Layout>
  );
}
