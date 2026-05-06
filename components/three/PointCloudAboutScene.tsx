"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Point Cloud Morph — About Page ──────────────────────────────────────────
// 120k particles start as a galaxy spiral, then morph into an abstract
// human silhouette shape. Mouse proximity scatters nearby particles.

const PARTICLE_COUNT = 80000;

// GLSL: compute target position from morphTarget attribute
const pointVertex = `
  attribute vec3 aGalaxyPos;
  attribute vec3 aSilhouettePos;
  attribute float aRandom;
  attribute float aSize;
  attribute vec3 aColor;

  uniform float uMorph;     // 0=galaxy, 1=silhouette
  uniform float uTime;
  uniform vec2  uMouse;     // NDC -1 to 1
  uniform float uMouseRepel;

  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    // Interpolate between galaxy and silhouette
    vec3 pos = mix(aGalaxyPos, aSilhouettePos, uMorph);

    // Gentle float noise
    float noise = sin(uTime * 0.8 + aRandom * 6.28) * 0.015 * (1.0 - uMorph * 0.5);
    pos.x += noise;
    pos.y += cos(uTime * 0.6 + aRandom * 4.0) * 0.01;

    // Mouse repulsion
    vec4 mvPos4 = modelViewMatrix * vec4(pos, 1.0);
    vec3 projected = projectionMatrix[0][0] * mvPos4.xyz;
    vec2 screenPos = projected.xy / -mvPos4.z;
    float repelDist = length(screenPos - uMouse);
    float repelStr = smoothstep(0.25, 0.0, repelDist) * uMouseRepel;
    vec3 repelDir = normalize(pos - vec3(uMouse * 2.0, 0.0));
    pos += repelDir * repelStr * 0.4;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (280.0 / -mvPosition.z) * (0.6 + uMorph * 0.6);
    gl_Position = projectionMatrix * mvPosition;

    vAlpha = 0.5 + aRandom * 0.5;
  }
`;

const pointFragment = `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    // Soft circle particle
    vec2 uv = gl_PointCoord - 0.5;
    float r = dot(uv, uv);
    if (r > 0.25) discard;
    float alpha = (0.25 - r) * 4.0 * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// Generate galaxy spiral positions
function generateGalaxy(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const ARMS = 3;
  const SPREAD = 0.18;
  const RADIUS = 3.5;

  for (let i = 0; i < count; i++) {
    const arm = i % ARMS;
    const t = (i / count) * 1.0;
    const angle = t * Math.PI * 8 + (arm / ARMS) * Math.PI * 2;
    const r = Math.pow(t, 0.6) * RADIUS;
    const spread = (Math.random() - 0.5) * SPREAD * r;

    positions[i * 3] = Math.cos(angle) * r + spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = Math.sin(angle) * r + spread;
  }
  return positions;
}

// Generate abstract human silhouette positions (parametric body shape)
function generateSilhouette(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Sample different body regions
    const region = Math.random();
    let x = 0, y = 0, z = 0;

    if (region < 0.12) {
      // Head (sphere)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 0.35 + Math.random() * 0.05;
      x = Math.sin(phi) * Math.cos(theta) * r;
      y = Math.cos(phi) * r + 1.35;
      z = Math.sin(phi) * Math.sin(theta) * r * 0.5;
    } else if (region < 0.45) {
      // Torso
      x = (Math.random() - 0.5) * 0.7;
      y = 0.2 + Math.random() * 0.9;
      z = (Math.random() - 0.5) * 0.2;
    } else if (region < 0.65) {
      // Arms
      const side = Math.random() > 0.5 ? 1 : -1;
      const t2 = Math.random();
      x = side * (0.38 + t2 * 0.1);
      y = 1.0 - t2 * 0.9;
      z = (Math.random() - 0.5) * 0.1;
    } else {
      // Legs
      const side = Math.random() > 0.5 ? 1 : -1;
      const t2 = Math.random();
      x = side * (0.18 + Math.random() * 0.05);
      y = 0.2 - t2 * 1.1;
      z = (Math.random() - 0.5) * 0.15;
    }

    // Add subtle noise for organic feel
    x += (Math.random() - 0.5) * 0.04;
    y += (Math.random() - 0.5) * 0.04;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

function PointCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const morphProgress = useRef(0);
  const targetMorph = useRef(0);

  // Toggle morph on interval
  useEffect(() => {
    // Start morphing to silhouette after 2s
    const t1 = setTimeout(() => { targetMorph.current = 1; }, 2000);
    // Cycle back every 8s
    const interval = setInterval(() => {
      targetMorph.current = targetMorph.current === 1 ? 0 : 1;
    }, 8000);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { attributes, uniforms, geometry } = useMemo(() => {
    const galaxyPos = generateGalaxy(PARTICLE_COUNT);
    const silPos = generateSilhouette(PARTICLE_COUNT);
    const randoms = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      randoms[i] = Math.random();
      sizes[i] = 0.3 + Math.random() * 1.2;
      // Color: blues, cyans, purples
      const t = Math.random();
      if (t < 0.4) { colors[i*3]=0.2; colors[i*3+1]=0.55; colors[i*3+2]=1.0; }
      else if (t < 0.7) { colors[i*3]=0.6; colors[i*3+1]=0.3; colors[i*3+2]=1.0; }
      else { colors[i*3]=0.0; colors[i*3+1]=0.75; colors[i*3+2]=0.95; }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(galaxyPos, 3));
    geo.setAttribute("aGalaxyPos", new THREE.BufferAttribute(galaxyPos, 3));
    geo.setAttribute("aSilhouettePos", new THREE.BufferAttribute(silPos, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const unis = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseRepel: { value: 0 },
    };

    return { attributes: {}, uniforms: unis, geometry: geo };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: pointVertex,
        fragmentShader: pointFragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms]
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uMouse.value.lerp(mouse.current, 0.05);

    // Lerp morph
    morphProgress.current += (targetMorph.current - morphProgress.current) * 0.012;
    uniforms.uMorph.value = morphProgress.current;

    // Repel strength follows morph (strongest at silhouette)
    uniforms.uMouseRepel.value = THREE.MathUtils.lerp(0.3, 1.0, morphProgress.current);

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.04 * (1 - morphProgress.current);
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export function PointCloudAboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <PointCloud />
    </Canvas>
  );
}

export default PointCloudAboutScene;