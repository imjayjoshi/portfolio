"use client";

import { usePortfolioStore } from "@/store/portfolioStore";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const { data } = usePortfolioStore();

  if (!data.testimonials.length) return null;

  return (
    <section className="section-padding-tight relative px-4 sm:px-6">
      <SectionDivider label="Client feedback" />

      <div className="container-main mt-4 md:mt-8">
        <div data-gsap-stagger className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {data.testimonials.map((t) => (
            <blockquote
              key={t.id}
              data-gsap-stagger-item
              className="glass-card gradient-border p-6 sm:p-8 relative"
            >
              <Quote className="w-8 h-8 text-[#7c3aed40] mb-4" />
              <p className="text-muted-foreground leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <cite className="not-italic font-semibold text-foreground">{t.author}</cite>
                <p className="text-sm text-[#a78bfa]">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
