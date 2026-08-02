"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { SectionDivider } from "@/components/ui/SectionDivider";

export const ProcessSection = () => {
  const { data } = usePortfolioStore();

  return (
    <section className="section-padding relative px-4 sm:px-6" id="process">
      <SectionDivider label="How I work" />

      <div className="container-main mt-4 md:mt-8">
        <div data-gsap-reveal className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            A clear path from <span className="gradient-text">idea to launch</span>
          </h2>
          <p className="text-muted-foreground">
            Whether you&apos;re hiring for a role or commissioning a project, this is how we
            collaborate.
          </p>
        </div>

        <div data-gsap-stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.processSteps.map((step) => (
            <div
              key={step.step}
              data-gsap-stagger-item
              className="relative glass-card gradient-border p-6 sm:p-8"
            >
              <span
                className="text-5xl font-bold opacity-20 absolute top-4 right-4 gradient-text"
                aria-hidden
              >
                {String(step.step).padStart(2, "0")}
              </span>
              <span className="inline-flex w-8 h-8 rounded-full items-center justify-center text-sm font-bold text-white mb-4"
                style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
              >
                {step.step}
              </span>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
