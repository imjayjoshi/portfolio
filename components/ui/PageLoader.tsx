"use client";

import { useEffect, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePortfolioStore } from "@/store/portfolioStore";

const LOADER_KEY = "portfolio-loader-seen";

export function PageLoader() {
  const { data } = usePortfolioStore();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem(LOADER_KEY);
    if (seen) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !mounted) return;

    registerGsapPlugins();
    const overlay = document.getElementById("page-loader");
    const bar = document.getElementById("page-loader-bar");
    const text = document.getElementById("page-loader-text");
    if (!overlay || !bar || !text) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(LOADER_KEY, "1");
        setVisible(false);
      },
    });

    tl.fromTo(
      text,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
        "-=0.2",
      )
      .to(text, { opacity: 0, y: -12, duration: 0.35, ease: "power2.in" }, "+=0.15")
      .to(overlay, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, [visible, mounted]);

  if (!mounted || !visible) return null;

  const initials = data.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: "#0d1117" }}
      aria-hidden={!visible}
    >
      <p
        id="page-loader-text"
        className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-8"
      >
        {initials}
      </p>
      <div className="w-48 sm:w-64 h-[2px] rounded-full overflow-hidden bg-white/5">
        <div
          id="page-loader-bar"
          className="h-full w-full origin-left rounded-full"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            transform: "scaleX(0)",
          }}
        />
      </div>
    </div>
  );
}
