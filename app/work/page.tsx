"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ModernButton } from "@/components/ui/ModernButton";
import { usePortfolioStore } from "@/store/portfolioStore";
import { ExternalLink, Github, Target, Lightbulb, TrendingUp } from "lucide-react";

export default function WorkPage() {
  const { data } = usePortfolioStore();

  const studies = data.caseStudies.map((cs) => {
    const project = data.projects.find((p) => p.id === cs.projectId);
    return { ...cs, project };
  });

  return (
    <Layout>
      <PageTransition>
        <section className="pt-28 md:pt-36 pb-20 section-padding">
          <div className="container-main px-4 sm:px-6 max-w-4xl mx-auto">
            <div data-gsap-reveal className="text-center mb-16">
              <span className="text-xs font-semibold text-[#a78bfa] uppercase tracking-[0.3em] mb-4 block">
                Portfolio depth
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Case <span className="gradient-text">studies</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                How I approach real problems — from challenge to measurable outcome.
              </p>
            </div>

            <div className="space-y-16">
              {studies.map((study, index) => (
                <article
                  key={study.id}
                  data-gsap-reveal
                  className="glass-card gradient-border p-6 sm:p-10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <span className="text-xs text-[#a78bfa] uppercase tracking-widest">
                        Case {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                        {study.project?.title ?? "Project"}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-2">
                        {study.role} · {study.timeline}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {study.project?.liveUrl && study.project.liveUrl !== "#" && (
                        <a
                          href={study.project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{
                            background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                          }}
                          aria-label="Live demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {study.project?.githubUrl && study.project.githubUrl !== "#" && (
                        <a
                          href={study.project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full glass-card flex items-center justify-center"
                          aria-label="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-[#a78bfa] mb-2">
                        <Target className="w-4 h-4" />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                          Challenge
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#a78bfa] mb-2">
                        <Lightbulb className="w-4 h-4" />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                          Solution
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[#a78bfa] mb-2">
                        <TrendingUp className="w-4 h-4" />
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                          Results
                        </h3>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {study.results.map((r) => (
                          <li key={r}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {study.project?.technologies && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      {study.project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-md bg-[#7c3aed08] border border-[#7c3aed20] text-[#a78bfa]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div data-gsap-reveal className="flex flex-wrap justify-center gap-4 mt-16">
              <ModernButton onClick={() => (window.location.href = "/projects")}>
                All projects
              </ModernButton>
              <ModernButton variant="outline" onClick={() => (window.location.href = "/hire")}>
                Work with me
              </ModernButton>
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
