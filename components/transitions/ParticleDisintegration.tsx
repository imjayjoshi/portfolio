"use client";

import { useEffect, useRef, useState } from "react";

// ─── ParticleDisintegration ───────────────────────────────────────────────────
// Captures the current page, samples pixels into particles, explodes them.
// FULLY browser-only. html2canvas is loaded lazily so it never touches the server.

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; g: number; b: number;
  life: number; decay: number; size: number;
}

interface Props {
  active: boolean;
  originX?: number; // 0–1 normalised
  originY?: number;
  onComplete?: () => void;
}

export function ParticleDisintegration({ active, originX = 0.5, originY = 0.5, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      cancelAnimationFrame(rafRef.current);
      return;
    }

    // Must be in browser
    if (typeof window === "undefined") return;

    setVisible(true);

    const runAnimation = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;

      const ox = originX * W;
      const oy = originY * H;

      // ── 1. Get pixel data ────────────────────────────────────────────────
      let pixels: Uint8ClampedArray | null = null;
      let pw = W, ph = H;

      try {
        // Dynamically import html2canvas — never bundled into server chunk
        const { default: h2c } = await import(
          /* webpackChunkName: "html2canvas" */ "html2canvas"
        );
        const scale = 0.35; // downsample for performance
        const shot = await h2c(document.body, {
          scale,
          width: W,
          height: H,
          backgroundColor: "#0b0d10",
          logging: false,
          useCORS: true,
          allowTaint: true,
        });
        pw = shot.width;
        ph = shot.height;
        // Draw to our canvas then read pixels
        ctx.drawImage(shot, 0, 0, W, H);
        pixels = ctx.getImageData(0, 0, W, H).data;
      } catch {
        // html2canvas not installed or failed — use a dark fill as fallback
        ctx.fillStyle = "#0b0d10";
        ctx.fillRect(0, 0, W, H);
        // Add some coloured noise so particles are visible
        for (let i = 0; i < 8000; i++) {
          const hue = Math.random() * 360;
          ctx.fillStyle = `hsl(${hue}, 70%, 55%)`;
          ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
        }
        pixels = ctx.getImageData(0, 0, W, H).data;
      }

      // ── 2. Sample pixels → particles ─────────────────────────────────────
      const particles: Particle[] = [];
      const STEP = 9; // 1 particle per STEP×STEP block

      for (let py = 0; py < H; py += STEP) {
        for (let px = 0; px < W; px += STEP) {
          const idx = (py * W + px) * 4;
          if (!pixels || idx + 3 >= pixels.length) continue;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          const a = pixels[idx + 3];
          if (a < 15) continue;

          const dx    = px - ox;
          const dy    = py - oy;
          const dist  = Math.sqrt(dx * dx + dy * dy) || 1;
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.4;
          const spd   = 2.5 + Math.random() * 4.5 + dist * 0.003;

          particles.push({
            x: px, y: py,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            r, g, b,
            size:  1.5 + Math.random() * 2.5,
            decay: 0.011 + Math.random() * 0.018,
            life:  1.0,
          });
        }
      }

      // ── 3. Animate ────────────────────────────────────────────────────────
      const GRAVITY = 0.07;
      let done = false;

      const tick = () => {
        // Semi-transparent clear — leaves trails
        ctx.fillStyle = "rgba(11,13,16,0.22)";
        ctx.fillRect(0, 0, W, H);

        let alive = 0;

        for (const p of particles) {
          if (p.life <= 0) continue;
          alive++;

          p.x  += p.vx;
          p.y  += p.vy;
          p.vy += GRAVITY;
          p.vx *= 0.993;
          p.vy *= 0.993;
          p.life -= p.decay;

          const alpha = Math.max(0, p.life);
          ctx.globalAlpha = alpha;
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;

        if (alive > 0) {
          rafRef.current = requestAnimationFrame(tick);
        } else if (!done) {
          done = true;
          ctx.clearRect(0, 0, W, H);
          setVisible(false);
          onComplete?.();
        }
      };

      // Tiny delay so the new page can start mounting underneath
      setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, 60);
    };

    runAnimation();

    return () => cancelAnimationFrame(rafRef.current);
  }, [active, originX, originY, onComplete]);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9999,
        pointerEvents: "none",
        width:         "100%",
        height:        "100%",
        display:       "block",
      }}
    />
  );
}

export default ParticleDisintegration;