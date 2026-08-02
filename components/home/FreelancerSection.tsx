"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Layers, Sparkles, Rocket, Wrench, ArrowUpRight } from "lucide-react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ModernButton } from "@/components/ui/ModernButton";
import { gsap, registerGsapPlugins } from "@/lib/gsap";

const iconMap = {
  Layers,
  Sparkles,
  Rocket,
  Wrench,
};

export const FreelancerSection = () => {
  const { data } = usePortfolioStore();
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!statsRef.current || hasAnimated.current) return;
    registerGsapPlugins();

    const counters = statsRef.current.querySelectorAll("[data-count]");
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        counters.forEach((el) => {
          const target = Number((el as HTMLElement).dataset.count) || 0;
          const suffix = (el as HTMLElement).dataset.suffix || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              (el as HTMLElement).textContent = `${Math.round(obj.val)}${suffix}`;
            },
          });
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding-tight relative px-4 sm:px-6" id="freelance">
      <SectionDivider label="Freelance" />

      <div className="container-main relative mt-4 md:mt-8">
        <div data-gsap-reveal className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Available for{" "}
            <span className="gradient-text">clients & teams</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {data.availability}
          </p>
        </div>

        <div
          ref={statsRef}
          data-gsap-stagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16"
        >
          {data.freelanceStats.map((stat) => (
            <div
              key={stat.label}
              data-gsap-stagger-item
              className="glass-card gradient-border p-5 sm:p-6 text-center group hover:border-[#7c3aed40] transition-colors"
            >
              <p className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                <span data-count={stat.value} data-suffix={stat.suffix || ""}>
                  0{stat.suffix || ""}
                </span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div
          data-gsap-stagger
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10"
        >
          {data.freelanceServices.slice(0, 4).map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Layers;
            return (
              <Link
                key={service.id}
                href="/services"
                data-gsap-stagger-item
                className="glass-card gradient-border p-5 sm:p-6 group block hover:border-[#7c3aed50] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7c3aed15] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#a78bfa]" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-[#a78bfa] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[#a78bfa] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}
        </div>

        <div data-gsap-reveal className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <ModernButton onClick={() => (window.location.href = "/hire")} showArrow>
            View packages
          </ModernButton>
          <ModernButton variant="outline" onClick={() => (window.location.href = "/work")}>
            Case studies
          </ModernButton>
        </div>
      </div>
    </section>
  );
};
