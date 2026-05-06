"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Instagram, X } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";

export const Footer = () => {
  const { data } = usePortfolioStore();

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: data.instagram, label: "Instagram" },
    { icon: X, href: data.x, label: "X" },
  ];

  return (
    <footer className="w-full pt-8 pb-8 border-t border-border/10 relative z-10 overflow-hidden">
      {/* Large Name Branding */}
      {/* <div className="w-full pb-8 select-none pointer-events-none px-0">
        <h2 className="text-[23vw] font-bold leading-none tracking-tighter text-outline text-center uppercase whitespace-nowrap opacity-50 transition-all duration-700 hover:opacity-100 cursor-default">
          {data.name}
        </h2>
      </div> */}

      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 px-6">
        {/* Left: Credits */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
          <span className="opacity-80">© {new Date().getFullYear()}</span>
          <span className="text-foreground font-bold hover:text-blue-500 transition-colors cursor-default">
            {data.name}.
          </span>
          <span className="opacity-80">All Rights Reserved.</span>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted-foreground hover:text-blue-500 font-medium transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.label}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};
