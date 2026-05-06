"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticLettersProps {
  text: string;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

function MagneticLetter({
  char,
  strength,
  radius,
}: {
  char: string;
  strength: number;
  radius: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (1 - dist / radius) * strength;
        x.set(dx * force);
        y.set(dy * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const onLeave = () => { x.set(0); y.set(0); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, strength, radius]);

  if (char === " ") return <span>&nbsp;</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
}

export function MagneticLetters({
  text,
  className = "",
  strength = 0.45,
  radius = 80,
  as: Tag = "span",
}: MagneticLettersProps) {
  const lines = text.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} className="block">
          {line.split("").map((char, charIndex) => (
            <MagneticLetter
              key={`${lineIndex}-${charIndex}`}
              char={char}
              strength={strength}
              radius={radius}
            />
          ))}
        </span>
      ))}
    </Tag>
  );
}

export function VariableFontScroll({
  text,
  className = "",
  minWeight = 100,
  maxWeight = 800,
}: {
  text: string;
  className?: string;
  minWeight?: number;
  maxWeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.abs(elCenter - center);
      const maxDist = window.innerHeight * 0.5;
      const proximity = Math.max(0, 1 - dist / maxDist);
      const weight = minWeight + (maxWeight - minWeight) * proximity;
      el.style.fontVariationSettings = `"wght" ${Math.round(weight)}`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [minWeight, maxWeight]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${minWeight}`,
        transition: "font-variation-settings 0.1s linear",
      }}
    >
      {text}
    </div>
  );
}