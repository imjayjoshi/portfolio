"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useRef, memo } from "react";

export const HeroGrid = memo(function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition(containerRef);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        // background: "#000000",
      }}
    >
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(
              800px circle at ${x}px ${y}px,
              rgba(var(--accent-rgb, 59, 130, 246), 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1.5px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.5) 100%)",
        }}
      />
    </div>
  );
});
