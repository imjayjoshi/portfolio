"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(
  containerRef?: React.RefObject<HTMLElement | null>,
) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const rafId = useRef<number>(0);
  const latestEvent = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const update = useCallback(() => {
    const { x, y } = latestEvent.current;
    const container = containerRef?.current;

    if (container) {
      const rect = container.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;
      setPosition({
        x: relX,
        y: relY,
        normalizedX: (relX / rect.width) * 2 - 1,
        normalizedY: (relY / rect.height) * 2 - 1,
      });
    } else {
      setPosition({
        x,
        y,
        normalizedX: (x / window.innerWidth) * 2 - 1,
        normalizedY: (y / window.innerHeight) * 2 - 1,
      });
    }
  }, [containerRef]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      latestEvent.current = { x: e.clientX, y: e.clientY };
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [update]);

  return position;
}
