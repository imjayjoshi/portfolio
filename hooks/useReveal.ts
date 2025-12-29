"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useReveal = <T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isRevealed };
};

// Hook to animate multiple elements with stagger effect
export const useRevealGroup = (
  count: number,
  options: UseRevealOptions = {}
) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll("[data-reveal-item]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(
            (entry.target as HTMLElement).dataset.revealIndex
          );
          if (entry.isIntersecting) {
            setRevealedIndices((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold, rootMargin }
    );

    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [count, threshold, rootMargin]);

  return { containerRef, revealedIndices };
};
