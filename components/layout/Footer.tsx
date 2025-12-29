"use client";

import { Github, Linkedin, Instagram } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";

export const Footer = () => {
  const { data } = usePortfolioStore();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: data.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: data.github, icon: Github, label: "GitHub" },
    { href: data.instagram, icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} {data.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
