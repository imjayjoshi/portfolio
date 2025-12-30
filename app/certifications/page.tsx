"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ExternalLink,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollBackground } from "@/components/transitions/ScrollBackground";
import { Footer } from "@/components/layout/Footer";
import { usePortfolioStore } from "@/store/portfolioStore";

export default function CertificationsPage() {
  const { data, setBackgroundVariant } = usePortfolioStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setBackgroundVariant("minimal");
  }, [setBackgroundVariant]);

  if (!isMounted) return null;

  const nextCard = () => {
    setSelectedIndex((prev) => (prev + 1) % data.certifications.length);
  };

  const prevCard = () => {
    setSelectedIndex(
      (prev) =>
        (prev - 1 + data.certifications.length) % data.certifications.length
    );
  };

  return (
    <Layout showBackground={false}>
      <PageTransition>
        <div className="relative min-h-screen">
          <ScrollBackground />

          <section className="section-padding relative z-10">
            <div className="container-main w-full">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left side: Text content */}
                <motion.div
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xs font-medium text-accent uppercase tracking-[0.3em] mb-4 block">
                    Credentials
                  </span>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    My <span className="gradient-text">Certifications</span>
                  </h1>

                  <div className="space-y-4 mb-8 inline-flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                        <BadgeCheck className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-muted-foreground">
                        {data.certifications.length} Professional Certifications
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                        <span className="text-xs">🎓</span>
                      </div>
                      <span className="text-muted-foreground">
                        Industry Recognized Credentials
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                        <span className="text-xs">🌐</span>
                      </div>
                      <span className="text-muted-foreground">
                        Continuous Learning & Growth
                      </span>
                    </div>
                  </div>

                  {/* Current certificate info */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="glass-card rounded-3xl p-6 mb-6"
                    >
                      <h3 className="text-xl font-bold mb-2">
                        {data.certifications[selectedIndex]?.title}
                      </h3>
                      <p className="text-muted-foreground mb-1">
                        {data.certifications[selectedIndex]?.issuer}
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        {data.certifications[selectedIndex]?.date}
                      </p>

                      {data.certifications[selectedIndex]?.credentialUrl &&
                        data.certifications[selectedIndex]?.credentialUrl !==
                          "#" && (
                          <a
                            href={
                              data.certifications[selectedIndex].credentialUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent hover:underline mt-4"
                          >
                            <ExternalLink size={14} />
                            View Credential
                          </a>
                        )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <button
                      onClick={prevCard}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-2">
                      {data.certifications.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === selectedIndex
                              ? "bg-accent w-6"
                              : "bg-muted hover:bg-muted-foreground/50"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextCard}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>

                {/* Right side: Stacked glassmorphism cards */}
                <motion.div
                  className="relative h-[500px] perspective-[1000px]"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {data.certifications.map((cert, index) => {
                    const offset = index - selectedIndex;
                    const isSelected = index === selectedIndex;
                    const absOffset = Math.abs(offset);

                    return (
                      <motion.div
                        key={cert.id}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => setSelectedIndex(index)}
                        animate={{
                          x: offset * 40,
                          y: offset * 25,
                          rotateY: offset * -8,
                          rotateZ: offset * 3,
                          scale: 1 - absOffset * 0.08,
                          opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
                          zIndex: data.certifications.length - absOffset,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Glassmorphism card */}
                        <div
                          className={`w-full h-full rounded-[2rem] overflow-hidden ${
                            isSelected ? "shadow-2xl shadow-accent/20" : ""
                          }`}
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                          }}
                        >
                          {/* Certificate Image at the top */}
                          {cert.image && (
                            <div className="relative w-full h-48 bg-gradient-to-br from-white/5 to-transparent">
                              <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-contain p-6"
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          )}

                          {/* Card content */}
                          <div className="p-8 flex flex-col justify-between h-[calc(100%-12rem)]">
                            {/* Top section */}
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-xs text-white/50 uppercase tracking-wider">
                                  Certificate
                                </span>
                                <h4 className="text-lg font-semibold mt-1 line-clamp-2">
                                  {cert.title}
                                </h4>
                              </div>
                              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                <BadgeCheck className="w-6 h-6 text-accent" />
                              </div>
                            </div>

                            {/* Middle - issuer */}
                            <div className="mt-auto">
                              <p className="text-xl font-light tracking-wider text-white/70">
                                {cert.issuer}
                              </p>
                              <div className="flex justify-between items-end mt-4">
                                <div>
                                  <span className="text-xs text-white/40 uppercase">
                                    Issued
                                  </span>
                                  <p className="text-sm font-medium">
                                    {cert.date}
                                  </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </PageTransition>
    </Layout>
  );
}
