"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useReveal } from "@/hooks/useReveal";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { Code2, Lightbulb, Target, Rocket, LucideIcon } from "lucide-react";

// Icon mapping for dynamic highlights
const iconMap: Record<string, LucideIcon> = {
  Code2,
  Lightbulb,
  Target,
  Rocket,
};

export default function AboutPage() {
  const { data } = usePortfolioStore();
  const { ref: headerRef, isRevealed: headerRevealed } = useReveal();
  const { ref: contentRef, isRevealed: contentRevealed } = useReveal({
    threshold: 0.1,
  });

  // Get highlights from store with icon mapping
  const highlights = data.aboutPage.highlights.map((h) => ({
    icon: iconMap[h.icon] || Code2,
    title: h.title,
    desc: h.desc,
  }));

  return (
    <Layout>
      <PageTransition>
        <section className="section-padding min-h-screen relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, hsl(195 100% 50% / 0.15) 0%, transparent 60%)",
            }}
          />

          <div className="container-main relative z-10">
            {/* Header */}
            <div
              ref={headerRef}
              className={`text-center md:text-left reveal ${
                headerRevealed ? "revealed" : ""
              }`}
            >
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                {data.aboutPage.headline}{" "}
                <span className="gradient-text">
                  {data.aboutPage.headlineHighlight}
                </span>
              </h1>
              <p className="text-muted-foreground mb-16 max-w-2xl mx-auto md:mx-0 text-lg">
                {data.aboutPage.subheadline}
              </p>
            </div>

            <div ref={contentRef} className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div
                className={`lg:col-span-2 space-y-6 reveal ${
                  contentRevealed ? "revealed" : ""
                }`}
              >
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {data.summary}
                </p>
                {data.aboutPage.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                {/* Highlight cards */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={`reveal ${contentRevealed ? "revealed" : ""}`}
                      style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                    >
                      <motion.div
                        className="glass-card rounded-xl p-5 flex items-start gap-4"
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Tilt3DCard intensity={6}>
                  <div
                    className={`glass-card rounded-2xl p-6 reveal ${
                      contentRevealed ? "revealed" : ""
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    <h3 className="font-display font-semibold text-lg mb-4">
                      Core Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.aboutPage.coreSkills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-accent/10 text-accent rounded-lg border border-accent/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            contentRevealed ? { opacity: 1, scale: 1 } : {}
                          }
                          transition={{ delay: 0.3 + index * 0.05 }}
                          whileHover={{ scale: 1.08 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Tilt3DCard>

                <Tilt3DCard intensity={6}>
                  <div
                    className={`glass-card rounded-2xl p-6 reveal ${
                      contentRevealed ? "revealed" : ""
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <h3 className="font-display font-semibold text-lg mb-4">
                      What Drives Me
                    </h3>
                    <ul className="space-y-3 text-muted-foreground text-sm">
                      {data.aboutPage.whatDrivesMe.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={contentRevealed ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </Tilt3DCard>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
