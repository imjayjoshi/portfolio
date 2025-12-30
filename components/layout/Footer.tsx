"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";

export const Footer = () => {
  const { data } = usePortfolioStore();

  return (
    <footer className="w-full py-6 border-t border-border/20 bg-background/50 backdrop-blur-sm">
      <div className="container-main flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm text-muted-foreground font-medium">
        <div className="flex items-center gap-2">
          <span>Created with</span>
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
          <span>by</span>
          <span className="text-foreground font-bold hover:text-accent transition-colors">
            {data.name}
          </span>
        </div>

        <span className="hidden md:inline text-border/40">|</span>

        <div className="flex gap-4">
          {[
            { label: "Github", href: data.github },
            { label: "LinkedIn", href: data.linkedin },
            { label: "Instagram", href: data.instagram },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors relative group"
            >
              {link.label}
              <motion.span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
