"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layout, Server, Database, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ModernButton } from "@/components/ui/ModernButton";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { usePageTransition } from "@/components/transitions";
// import { ScrollVelocityWrapper } from "@/hooks/useScrollVelocitySkew";

const skillGroups = [
  {
    name: "Frontend",
    icon: Layout,
    highlight: "React, Next.js, TypeScript",
    color: "from-[#7c3aed] to-[#06b6d4]",
  },
  {
    name: "Backend",
    icon: Server,
    highlight: "Node.js, Express, Python",
    color: "from-[#7c3aed] to-[#06b6d4]",
  },
  {
    name: "Database",
    icon: Database,
    highlight: "MongoDB, PostgreSQL, MySQL",
    color: "from-[#06b6d4] to-[#7c3aed]",
  },
  {
    name: "AI / Tools",
    icon: Sparkles,
    highlight: "OpenAI, Streamlit, Git",
    color: "from-[#7c3aed]/80 to-[#06b6d4]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const SkillsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { navigateWithTransition } = usePageTransition();

  return (
    // <ScrollVelocityWrapper intensity={0.3} maxSkew={5}>
    <section
      ref={ref}
      className="section-padding relative px-4 sm:px-6"
      id="skills"
    >
      <SectionDivider label="Skills" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7c3aed]/5 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />

      <div className="container-main relative -mt-2 md:-mt-4">
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          data-gsap-reveal
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            This is what I{" "}
            <motion.span
              className="gradient-text inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              use
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Skill cards with stagger */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.name}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="glass-card gradient-border p-5 sm:p-6 md:p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon with floating animation */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-left relative z-10">
                <motion.div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${group.color} bg-opacity-20 flex items-center justify-center flex-shrink-0`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <group.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <h3 className="font-semibold text-base sm:text-lg group-hover:text-accent transition-colors">
                  {group.name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground text-left relative z-10">
                {group.highlight}
              </p>

              {/* Bottom border animation */}
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${group.color}`}
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View all skills link */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <ModernButton
            onClick={() => navigateWithTransition("/skills")}
            showArrow
          >
            View all skills
          </ModernButton>
        </motion.div>
      </div>
    </section>
    // </ScrollVelocityWrapper>
  );
};
