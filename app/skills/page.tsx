"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { usePortfolioStore } from "@/store/portfolioStore";
import {
  LucideIcon,
  Code2,
  Server,
  Database,
  Wrench,
  Brain,
  Users,
} from "lucide-react";

const categoryIcons: Record<string, LucideIcon> = {
  "Programming Languages": Code2,
  "Libraries & Frameworks": Server,
  Databases: Database,
  "Tools & Platforms": Wrench,
  "AI & ML": Brain,
  "Soft Skills": Users,
};

export default function SkillsPage() {
  const { data } = usePortfolioStore();

  return (
    <Layout>
      <div className="relative min-h-screen">
        <div className="relative z-10 section-padding">
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-15 rounded-full"
            style={{
              background: "radial-gradient(circle, #7c3aed, transparent 70%)",
            }}
          />

          <div className="container-main px-4 sm:px-6 relative">
            <motion.div
              className="text-center mb-12 sm:mb-16 md:mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="inline-block text-xs font-semibold text-accent uppercase tracking-[0.3em] mb-4 sm:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Technical Expertise
              </motion.span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
                Skills & <span className="gradient-text">Technologies</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                A comprehensive overview of my technical skills, from
                programming languages to frameworks and tools.
              </p>
            </motion.div>

            <div className="gradient-line" aria-hidden="true" />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {data.skillCategories.map((category, categoryIndex) => {
                const IconComponent = categoryIcons[category.name] || Code2;

                return (
                  <motion.div
                    key={category.name}
                    className="gradient-border p-6 md:p-8 bg-[hsl(220_15%_8%/_0.85)]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.05,
                    }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#7c3aed15] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#a78bfa]" />
                      </div>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-[#7c3aed08] text-[#a78bfa] rounded-lg border border-[#7c3aed20] hover:border-[#7c3aed50] transition-colors cursor-default"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.05 + skillIndex * 0.01,
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

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold mb-6">Core Competencies</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {data.coreCompetencies.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + i * 0.1 }}
                    >
                      <div className="text-sm text-[#a78bfa] font-medium mb-1">
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
