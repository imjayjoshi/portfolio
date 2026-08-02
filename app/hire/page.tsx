"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ModernButton } from "@/components/ui/ModernButton";
import { usePortfolioStore } from "@/store/portfolioStore";
import { Briefcase, Building2, Check } from "lucide-react";

type Audience = "clients" | "recruiters";

export default function HirePage() {
  const { data } = usePortfolioStore();
  const [audience, setAudience] = useState<Audience>("clients");

  return (
    <Layout>
      <PageTransition>
        <section className="pt-28 md:pt-36 pb-20 section-padding">
          <div className="container-main px-4 sm:px-6 max-w-5xl mx-auto">
            <div data-gsap-reveal className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Hire</span> Jay Joshi
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {data.availability}
              </p>
            </div>

            <div
              data-gsap-reveal
              className="flex justify-center gap-2 p-1 rounded-full glass-card w-fit mx-auto mb-14"
            >
              <button
                type="button"
                onClick={() => setAudience("clients")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  audience === "clients"
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  audience === "clients"
                    ? { background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }
                    : undefined
                }
              >
                <Building2 className="w-4 h-4" /> For clients
              </button>
              <button
                type="button"
                onClick={() => setAudience("recruiters")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  audience === "recruiters"
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  audience === "recruiters"
                    ? { background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }
                    : undefined
                }
              >
                <Briefcase className="w-4 h-4" /> For recruiters
              </button>
            </div>

            {audience === "clients" ? (
              <div data-gsap-stagger className="grid md:grid-cols-3 gap-6">
                {data.workPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    data-gsap-stagger-item
                    className={`glass-card gradient-border p-6 sm:p-8 flex flex-col ${
                      pkg.highlighted ? "ring-1 ring-[#7c3aed50]" : ""
                    }`}
                    style={
                      pkg.highlighted
                        ? { boxShadow: "0 0 40px #7c3aed20" }
                        : undefined
                    }
                  >
                    {pkg.highlighted && (
                      <span className="text-[10px] uppercase tracking-widest text-[#a78bfa] mb-2">
                        Most popular
                      </span>
                    )}
                    <h2 className="text-xl font-bold mb-1">{pkg.name}</h2>
                    <p className="text-2xl font-bold gradient-text mb-1">{pkg.price}</p>
                    <p className="text-xs text-muted-foreground mb-4">{pkg.timeline}</p>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm">
                          <Check className="w-4 h-4 text-[#06b6d4] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#a78bfa] mb-4">Ideal for: {pkg.idealFor}</p>
                    <ModernButton
                      className="w-full"
                      onClick={() => (window.location.href = "/contact")}
                    >
                      Get quote
                    </ModernButton>
                  </div>
                ))}
              </div>
            ) : (
              <div data-gsap-reveal className="glass-card gradient-border p-8 sm:p-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Open to full-time & contract roles</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I&apos;m a MERN-focused full stack developer with internship experience at
                  Budventure Technologies and hands-on AI project work. I bring clean code,
                  clear communication, and ownership from feature to deployment.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "React, Next.js, TypeScript, Node.js",
                    "MongoDB, PostgreSQL, REST & real-time APIs",
                    "AI integrations (Streamlit, NLP, OpenAI APIs)",
                    "Based in Ahmedabad — open to remote & hybrid",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#7c3aed] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <ModernButton
                    onClick={() =>
                      window.open(
                        "https://drive.google.com/file/d/1fxboKbaALo1_2bfdnPnY1_y4vZ8rv1xK/view?usp=sharing",
                        "_blank",
                      )
                    }
                  >
                    Download resume
                  </ModernButton>
                  <ModernButton
                    variant="outline"
                    onClick={() => (window.location.href = "/experience")}
                  >
                    View experience
                  </ModernButton>
                </div>
              </div>
            )}

            <SectionDivider label="Process" className="mt-16" />

            <div data-gsap-stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
              {data.processSteps.map((step) => (
                <div key={step.step} data-gsap-stagger-item className="glass-card p-5">
                  <span className="text-sm font-bold text-[#a78bfa]">Step {step.step}</span>
                  <h3 className="font-semibold mt-2 mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
}
