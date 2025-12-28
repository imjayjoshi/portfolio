"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { Layout, Server, Database, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const skillGroups = [
  {
    name: "Frontend",
    icon: Layout,
    highlight: "React, Next.js, TypeScript",
  },
  {
    name: "Backend",
    icon: Server,
    highlight: "Node.js, Express, Python",
  },
  {
    name: "Database",
    icon: Database,
    highlight: "MongoDB, PostgreSQL, MySQL",
  },
  {
    name: "AI / Tools",
    icon: Sparkles,
    highlight: "OpenAI, Streamlit, Git",
  },
];

export const SkillsSection = () => {
  const { ref, isRevealed } = useReveal();

  return (
    <section ref={ref} className="section-padding relative" id="skills">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent pointer-events-none" />

      <div className="container-main relative">
        <div
          className={`text-center mb-16 reveal ${isRevealed ? "revealed" : ""}`}
        >
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            This is what I <span className="gradient-text">use</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.name}
              className={`glass-card p-5 md:p-6 reveal ${
                isRevealed ? "revealed" : ""
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-3 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg">{group.name}</h3>
              </div>

              <p className="text-sm text-muted-foreground text-center md:text-left">
                {group.highlight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View all skills link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-accent hover:underline underline-offset-4 transition-all group"
          >
            <span>View all skills</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
