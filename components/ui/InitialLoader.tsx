"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitialLoaderProps {
  duration?: number;
}

export const InitialLoader = ({ duration = 1800 }: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      angle: number;
      speed: number;
      radius: number;
    }> = [];

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 80 + Math.random() * 60;
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 2,
        alpha: 0.4 + Math.random() * 0.4,
        angle,
        speed: 0.02 + Math.random() * 0.02,
        radius,
      });
    }

    let animationProgress = 0;
    let frame: number;

    const animate = () => {
      ctx.fillStyle = "#0b0d10";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationProgress += 0.015;
      setProgress(Math.min(animationProgress, 1));

      // Draw particles in circular orbit
      particles.forEach((p) => {
        // Orbit animation
        p.angle += p.speed * (1 - animationProgress * 0.5);
        const currentRadius = p.radius * (1 - animationProgress * 0.7);

        p.x = centerX + Math.cos(p.angle) * currentRadius;
        p.y = centerY + Math.sin(p.angle) * currentRadius;

        // Draw with glow
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 4
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${p.alpha})`);
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${p.alpha * 0.3})`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.fill();
      });

      // Center glow
      const glowSize = 60 + animationProgress * 40;
      const centerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        glowSize
      );
      centerGlow.addColorStop(
        0,
        `rgba(59, 130, 246, ${0.15 + animationProgress * 0.1})`
      );
      centerGlow.addColorStop(0.6, `rgba(30, 64, 175, 0.05)`);
      centerGlow.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.fill();

      if (animationProgress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    animate();

    // Hide loader after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#0b0d10] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Logo / Text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="text-4xl font-bold gradient-text mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              JJ
            </motion.div>

            {/* Progress bar */}
            <div className="w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;
