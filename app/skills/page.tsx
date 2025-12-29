"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Layout } from "@/components/layout/Layout";
import { usePortfolioStore } from "@/store/portfolioStore";
import { Code2, Server, Database, Wrench, Brain, Users } from "lucide-react";

// Lazy load WebGL scene
const SkillsOrbitScene = dynamic(
  () =>
    import("@/components/three/SkillsOrbitScene").then((mod) => ({
      default: mod.SkillsOrbitScene,
    })),
  { ssr: false, loading: () => null }
);

// Skill category icons
const categoryIcons: Record<string, React.ElementType> = {
  "Programming Languages": Code2,
  "Libraries & Frameworks": Server,
  Databases: Database,
  "Tools & Platforms": Wrench,
  "AI & ML": Brain,
  "Soft Skills": Users,
};

export default function SkillsPage() {
  const { data } = usePortfolioStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* WebGL Background */}
        <div className="fixed inset-0 z-0">
          {!isMobile && (
            <Suspense fallback={null}>
              <SkillsOrbitScene />
            </Suspense>
          )}
          {/* Fallback gradient for mobile */}
          {isMobile && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-indigo-900/10" />
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 section-padding">
          <div className="container-main">
            {/* Hero */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className="inline-block text-xs font-medium text-accent uppercase tracking-[0.3em] mb-6"
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                Technical Expertise
              </motion.span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Skills & <span className="gradient-text">Technologies</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive overview of my technical skills, from
                programming languages to frameworks and tools.
              </p>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.skillCategories.map((category, categoryIndex) => {
                const IconComponent = categoryIcons[category.name] || Code2;

                return (
                  <motion.div
                    key={category.name}
                    className="glass-card p-6 md:p-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + categoryIndex * 0.1,
                    }}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                    </div>

                    {/* Skills list */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-accent/10 text-accent rounded-lg border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay:
                              0.5 + categoryIndex * 0.1 + skillIndex * 0.03,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Skills Summary */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-6">Core Competencies</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {data.coreCompetencies.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <div className="text-sm text-accent font-medium mb-1">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
