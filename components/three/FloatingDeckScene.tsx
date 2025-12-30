"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function GlassCard({
  index,
  total,
  project,
  scrollProgress,
  mousePosition,
  onSelect,
  selectedIndex,
  isAnySelected,
}: {
  index: number;
  total: number;
  project: { id: string; title: string; description: string };
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  onSelect: (index: number) => void;
  selectedIndex: number | null;
  isAnySelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate card position in deck
  const basePosition = useMemo(() => {
    const spread = scrollProgress * 2;
    const angle = (index / total) * Math.PI * 0.5 - Math.PI * 0.25;
    const radius = 2.5 + spread;

    return {
      x: Math.sin(angle) * radius + (index - total / 2) * 0.3,
      y: (index - total / 2) * 0.15 + Math.sin(index * 0.5) * 0.1,
      z: -index * 0.4 - scrollProgress * 2,
      rotY: angle * 0.3,
      rotZ: (index - total / 2) * 0.02,
    };
  }, [index, total, scrollProgress]);

  // Glass material with refraction
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uSelected: { value: 0 },
        uColor: { value: new THREE.Color("#1e40af") },
        uOpacity: { value: 0.85 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uHover;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          
          vec3 pos = position;
          // Subtle breathing effect
          pos += normal * sin(uTime * 2.0 + position.y * 3.0) * 0.002 * (1.0 + uHover);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform float uHover;
        uniform float uSelected;
        
        void main() {
          // Fresnel effect for glass rim
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);
          
          // Glass gradient
          vec3 baseColor = mix(uColor * 0.3, uColor, fresnel * 0.5);
          
          // Add glow on hover
          vec3 glowColor = vec3(0.3, 0.5, 1.0);
          baseColor = mix(baseColor, glowColor, uHover * 0.3);
          
          // Edge highlight
          float edge = smoothstep(0.4, 0.5, abs(vUv.x - 0.5)) + smoothstep(0.45, 0.5, abs(vUv.y - 0.5));
          baseColor += vec3(0.1, 0.2, 0.4) * edge * (0.3 + uHover * 0.3);
          
          // Inner glow
          float innerGlow = 1.0 - length(vUv - 0.5) * 1.5;
          baseColor += glowColor * innerGlow * 0.1 * (1.0 + uHover);
          
          float alpha = uOpacity * (0.7 + fresnel * 0.3) * (1.0 - uSelected * 0.5);
          
          gl_FragColor = vec4(baseColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const isSelected = selectedIndex === index;

    // Update shader uniforms
    material.uniforms.uTime.value = time;
    material.uniforms.uHover.value = THREE.MathUtils.lerp(
      material.uniforms.uHover.value,
      isHovered ? 1 : 0,
      0.1
    );
    material.uniforms.uSelected.value = isAnySelected && !isSelected ? 1 : 0;

    // Target position
    let targetX = basePosition.x;
    let targetY = basePosition.y;
    let targetZ = basePosition.z;
    let targetRotY = basePosition.rotY;
    let targetRotZ = basePosition.rotZ;

    if (isSelected) {
      // Selected card comes forward
      targetX = 0;
      targetY = 0;
      targetZ = 2;
      targetRotY = 0;
      targetRotZ = 0;
    } else if (isAnySelected) {
      // Other cards fade back
      targetZ -= 3;
      targetX *= 1.5;
    }

    // Anti-gravity floating motion
    const floatY = Math.sin(time * 0.8 + index) * 0.05;
    const floatX = Math.cos(time * 0.6 + index * 0.5) * 0.02;

    // Magnetic cursor effect
    if (isHovered && !isAnySelected) {
      const pullX = (mousePosition.x - 0.5) * 0.3;
      const pullY = (mousePosition.y - 0.5) * 0.2;
      targetX += pullX;
      targetY -= pullY;
      targetRotY += pullX * 0.2;
      targetRotZ -= pullY * 0.1;
    }

    // Smooth interpolation
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX + floatX,
      0.08
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY + floatY,
      0.08
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      0.08
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotY,
      0.08
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotZ,
      0.08
    );

    // Scale on hover
    const targetScale =
      isHovered && !isAnySelected ? 1.08 : isSelected ? 1.3 : 1;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[1.2, 0.75, 0.02]}
      radius={0.03}
      smoothness={4}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => onSelect(selectedIndex === index ? -1 : index)}
    >
      <primitive object={material} attach="material" />
    </RoundedBox>
  );
}

// Ambient particles
function AmbientParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 800;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(time * 0.2 + i) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2] + scrollProgress * 0.01;

      // Wrap particles
      if (posArray[i3 + 2] > 5) posArray[i3 + 2] = -10;
      if (posArray[i3 + 2] < -15) posArray[i3 + 2] = 5;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#60a5fa"
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Camera controller
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Subtle camera movement based on scroll
    const targetZ = 5 - scrollProgress * 1.5;
    const targetY = scrollProgress * 0.3;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
  });

  return null;
}

interface FloatingDeckSceneProps {
  projects: Array<{ id: string; title: string; description: string }>;
  scrollProgress: number;
  mousePosition: { x: number; y: number };
  onSelectProject: (index: number) => void;
  selectedIndex: number | null;
}

export function FloatingDeckScene({
  projects,
  scrollProgress,
  mousePosition,
  onSelectProject,
  selectedIndex,
}: FloatingDeckSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <CameraController scrollProgress={scrollProgress} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#60a5fa" />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.2}
        color="#1e40af"
      />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#3b82f6" />

      {/* Cards */}
      {projects.map((project, index) => (
        <GlassCard
          key={project.id}
          index={index}
          total={projects.length}
          project={project}
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
          onSelect={onSelectProject}
          selectedIndex={selectedIndex}
          isAnySelected={selectedIndex !== null}
        />
      ))}

      {/* Particles */}
      <AmbientParticles scrollProgress={scrollProgress} />
    </Canvas>
  );
}

export default FloatingDeckScene;
