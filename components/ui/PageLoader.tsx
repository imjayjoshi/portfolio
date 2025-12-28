"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface PageLoaderProps {
  onComplete: () => void;
}

export const PageLoader = ({ onComplete }: PageLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      targetX: number;
      targetY: number;
    }> = [];

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particleCount = 150;

    // Initialize particles at random positions
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 200 + Math.random() * 300;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.5,
        targetX: centerX + (Math.random() - 0.5) * 100,
        targetY: centerY + (Math.random() - 0.5) * 100,
      });
    }

    let progress = 0;
    let frame: number;

    const animate = () => {
      ctx.fillStyle = "#0b0d10";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      progress += 0.012;

      // Draw particles
      particles.forEach((p, i) => {
        // Move toward center with swirl
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Swirl effect
        const angle = Math.atan2(dy, dx) + (1 - progress) * 0.1;
        const pull = Math.min(progress * 0.15, 0.1);

        p.vx += Math.cos(angle) * pull;
        p.vy += Math.sin(angle) * pull;
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${p.alpha * progress})`);
        gradient.addColorStop(
          0.5,
          `rgba(59, 130, 246, ${p.alpha * 0.5 * progress})`
        );
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.fill();
      });

      // Draw center glow
      const centerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        150 * progress
      );
      centerGlow.addColorStop(0, `rgba(59, 130, 246, ${0.3 * progress})`);
      centerGlow.addColorStop(0.5, `rgba(30, 64, 175, ${0.15 * progress})`);
      centerGlow.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 * progress, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // Fade out
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setIsComplete(true);
            onComplete();
          },
        });
      }
    };

    // Start animation after a brief delay
    const startTimer = setTimeout(() => {
      animate();
    }, 100);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      clearTimeout(startTimer);
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#0b0d10]"
      initial={{ opacity: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Loading text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="text-sm font-medium text-muted-foreground tracking-[0.3em] uppercase"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Loading Experience
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PageLoader;
