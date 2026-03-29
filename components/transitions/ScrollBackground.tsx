"use client";

import { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/store/portfolioStore";

export function ScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [mounted, setMounted] = useState(false);
  const variant = usePortfolioStore((state) => state.backgroundVariant);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    let cleanup: (() => void) | null = null;

    const initScene = async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 50;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // Optimization: turned off antialias for speed
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped pixel ratio for performance

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Consistent particle count across variants for seamless switching
      const particlesCount = 120;
      const positions = new Float32Array(particlesCount * 3);
      const colors = new Float32Array(particlesCount * 3);

      const colorOptions = [
        { r: 0.23, g: 0.51, b: 0.96 }, // Blue
        { r: 0.55, g: 0.36, b: 0.96 }, // Purple
        { r: 0.02, g: 0.71, b: 0.83 }, // Cyan
      ];

      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

        const color =
          colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Reusable texture
      const canvas = document.createElement("canvas");
      canvas.width = 16; // Smaller texture for speed
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let animationFrameId: number;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Variant logic inside animation for smoothness
        const opacityTarget =
          variant === "minimal" ? 0.3 : variant === "enhanced" ? 0.6 : 0.4;
        material.opacity += (opacityTarget - material.opacity) * 0.1;

        const progress = scrollProgress.current;
        points.rotation.y += (progress * 2 - points.rotation.y) * 0.05;
        points.rotation.x +=
          (Math.sin(progress * 3) * 0.2 - points.rotation.x) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.current = docHeight > 0 ? scrollTop / docHeight : 0;
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize);

      cleanup = () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();
      };
    };

    initScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [mounted, variant]); // Also responds to variant changes

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none" // Moved to z-[-1]
      style={{
        background: "#0a0b0f",
      }}
    />
  );
}
