"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";

export function useGsapScroll() {
  const pathname = usePathname();

  useEffect(() => {
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-stagger]").forEach((parent) => {
        const children = parent.querySelectorAll("[data-gsap-stagger-item]");
        if (!children.length) return;
        gsap.from(children, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-line]").forEach((line) => {
        gsap.from(line, {
          scaleX: 0,
          duration: 1.2,
          ease: "power2.inOut",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: line,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);
}
