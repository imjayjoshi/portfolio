"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface FluidMembraneTransitionProps {
  active: boolean;
  onComplete?: () => void;
  originX?: number; // click origin 0-1
  originY?: number;
  color?: string;
}

export const FluidMembraneTransition = ({
  active,
  onComplete,
  originX = 0.5,
  originY = 0.5,
  color = "#0b0d10",
}: FluidMembraneTransitionProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const filterRef = useRef<SVGFETurbulenceElement>(null);
  const [visible, setVisible] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    setVisible(true);

    if (!pathRef.current || !filterRef.current || !svgRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = originX * vw;
    const cy = originY * vh;

    // Build morphing blob points around click origin
    const buildPath = (progress: number, turbulence: number, cx: number, cy: number) => {
      const numPoints = 12;
      const angleStep = (Math.PI * 2) / numPoints;
      // Max radius: diagonal of viewport so blob always covers screen
      const maxR = Math.sqrt(vw * vw + vh * vh);
      const r = progress * maxR;
      const points: [number, number][] = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep;
        const noise = 1 + Math.sin(i * 2.7 + turbulence * 8) * 0.18 * (1 - progress * 0.5);
        const pr = r * noise;
        points.push([cx + Math.cos(angle) * pr, cy + Math.sin(angle) * pr]);
      }

      // Catmull-Rom to smooth bezier
      let d = `M ${points[0][0]} ${points[0][1]}`;
      for (let i = 0; i < numPoints; i++) {
        const p0 = points[(i - 1 + numPoints) % numPoints];
        const p1 = points[i];
        const p2 = points[(i + 1) % numPoints];
        const p3 = points[(i + 2) % numPoints];
        const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
        const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
        const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
        const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`;
      }
      d += " Z";
      return d;
    };

    // Kill previous
    tlRef.current?.kill();

    const state = { progress: 0, turbulence: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          onComplete?.();
        }, 80);
      },
    });

    tlRef.current = tl;

    // Expand blob (organic, with turbulence)
    tl.to(state, {
      progress: 1.15,
      turbulence: 1,
      duration: 0.72,
      ease: "power3.inOut",
      onUpdate: () => {
        if (pathRef.current) {
          pathRef.current.setAttribute(
            "d",
            buildPath(Math.min(state.progress, 1.1), state.turbulence, cx, cy)
          );
        }
        // Animate SVG feTurbulence for organic edge
        if (filterRef.current) {
          filterRef.current.setAttribute(
            "baseFrequency",
            `${0.015 * state.turbulence} ${0.012 * state.turbulence}`
          );
        }
      },
    });

    // Hold, then retract turbulence (smooth edge on full cover)
    tl.to(
      state,
      {
        turbulence: 0,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          if (filterRef.current) {
            filterRef.current.setAttribute(
              "baseFrequency",
              `${0.015 * state.turbulence} ${0.012 * state.turbulence}`
            );
          }
        },
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [active]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: active ? "all" : "none",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="fluid-blob-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={filterRef}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves="4"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M 0 0"
          fill={color}
          filter="url(#fluid-blob-filter)"
        />
      </svg>
    </div>
  );
};