"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Instagram } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";

export const Footer = () => {
  const { data } = usePortfolioStore();

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: data.instagram, label: "Instagram" },
  ];

  return (
    <footer className="w-full py-8 border-t border-border/10 bg-black/20 backdrop-blur-md">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-6">
        {/* Left: Credits */}
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground font-medium">
          <span className="opacity-80">Created with</span>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              color: ["#94a3b8", "#ef4444", "#94a3b8"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart size={14} fill="currentColor" />
          </motion.div>
          <span className="opacity-80">by</span>
          <span className="text-foreground font-bold hover:text-blue-500 transition-colors cursor-default">
            {data.name}
          </span>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-500 transition-all duration-300"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon size={20} strokeWidth={1.5} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};
