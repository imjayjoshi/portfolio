"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePortfolioStore } from "@/store/portfolioStore";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { ModernButton } from "@/components/ui/ModernButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data } = usePortfolioStore();

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: data.instagram, label: "Instagram" },
  ];

  return (
    <section ref={ref} className="pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 lg:pb-20 px-6 relative" id="contact">
      {/* Background glow */}
      <motion.div
        className=""
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
      />

      <div className="container-main relative">
        {/* Header */}
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
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-[0.3em]">
              Contact
            </span>
            <motion.span
              className="h-[1px] bg-gradient-to-l from-transparent to-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's{" "}
            <span className="gradient-text inline-flex overflow-hidden">
              {"connect".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Interested in working together? Let's discuss your project.
          </motion.p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="max-w-xl mx-auto glass-card p-5 sm:p-6 md:p-8 relative overflow-hidden rounded-2xl sm:rounded-3xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Decorative corner */}
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-accent/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          />

          <div className="space-y-4 sm:space-y-6 relative z-10">
            {/* Email */}
            <motion.a
              variants={itemVariants}
              href={`mailto:${data.email}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-accent/5 transition-all group"
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 5 }}
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1 uppercase tracking-wider">
                  Email
                </p>
                <p className="font-semibold text-base sm:text-lg group-hover:text-accent transition-colors truncate">
                  {data.email}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </motion.a>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
            >
              <motion.div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1 uppercase tracking-wider">
                  Location
                </p>
                <p className="font-semibold text-base sm:text-lg truncate">
                  {data.location}
                </p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="pt-5 sm:pt-6 border-t border-border/50"
            >
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4 uppercase tracking-wider text-center">
                Find me on
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted/30 border border-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    // whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50 flex justify-center"
            variants={itemVariants}
          >
            <ModernButton
              onClick={() => (window.location.href = `mailto:${data.email}`)}
              showArrow
              className="w-full sm:w-auto min-w-[200px]"
            >
              Send Message
            </ModernButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
