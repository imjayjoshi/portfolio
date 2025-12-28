"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Springs for smooth following
  const springCursorX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springCursorY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const springDotX = useSpring(dotX, { damping: 40, stiffness: 400 });
  const springDotY = useSpring(dotY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      const isLink = target.closest("a");
      const isButton = target.closest("button");
      const isInput = target.closest("input, textarea");
      const isMagnetic = target.closest("[data-magnetic]");
      const cursorTextEl = target.closest("[data-cursor-text]");

      if (isLink || isButton || isInput || isMagnetic) {
        setIsPointer(true);

        // Magnetic effect - attract cursor to element center
        if (isMagnetic || isButton || isLink) {
          const el = (isMagnetic || isButton || isLink) as HTMLElement;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          // Slightly pull cursor toward center
          cursorX.set(centerX);
          cursorY.set(centerY);
        }
      } else {
        setIsPointer(false);
      }

      if (cursorTextEl) {
        setCursorText(cursorTextEl.getAttribute("data-cursor-text") || "");
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-text]")) {
        setCursorText("");
        setIsHovering(false);
      }
      if (target.closest("a, button, [data-magnetic]")) {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor - filled circle, no outline */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springCursorX,
          y: springCursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white/80"
          animate={{
            width: isPointer ? 35 : isHovering ? 50 : 20,
            height: isPointer ? 35 : isHovering ? 50 : 20,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cursorText && (
            <span className="text-xs font-medium text-black">{cursorText}</span>
          )}
        </motion.div>
      </motion.div>

      {/* Inner dot - only visible when not hovering */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: springDotX,
          y: springDotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-accent"
          animate={{
            width: isPointer ? 6 : 4,
            height: isPointer ? 6 : 4,
            opacity: isHovering ? 0 : isPointer ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};
