"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePortfolioStore } from "@/store/portfolioStore";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export const ContactSection = () => {
  const { ref, isRevealed } = useReveal();
  const { data } = usePortfolioStore();

  return (
    <section ref={ref} className="section-padding" id="contact">
      <div className="container-main">
        <div
          className={`text-center mb-16 reveal ${isRevealed ? "revealed" : ""}`}
        >
          <span className="inline-block text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Interested in working together? Let's discuss your project.
          </p>
        </div>

        <motion.div
          className="max-w-2xl mx-auto glass-card p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="space-y-6">
            <a
              href={`mailto:${data.email}`}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors text-center md:text-left"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
            </a>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-lg text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{data.location}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-border text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-4">Find me on</p>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Link href="/contact" className="btn-primary">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
