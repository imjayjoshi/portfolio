"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Floating briefcase-like cubes representing work experiences
function FloatingCube({
  position,
  size,
  speed,
  rotationSpeed,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = initialY + Math.sin(time * speed) * 0.3;
    meshRef.current.rotation.x += rotationSpeed * 0.01;
    meshRef.current.rotation.y += rotationSpeed * 0.015;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size * 0.7, size * 0.3]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} wireframe />
    </mesh>
  );
}

// Connecting lines between work nodes
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: number[] = [];
    const nodePositions = [
      [-2, 2, -1],
      [2, 1, -2],
      [-1, -1, -1],
      [3, -2, -3],
      [-3, 0, -2],
    ];

    for (let i = 0; i < nodePositions.length - 1; i++) {
      points.push(...nodePositions[i], ...nodePositions[i + 1]);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
    </lineSegments>
  );
}

// Floating particles
function WorkParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#60a5fa"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export function ExperienceScene() {
  const cubes = useMemo(
    () => [
      {
        position: [-3, 2, -2] as [number, number, number],
        size: 0.8,
        speed: 0.5,
        rotationSpeed: 0.3,
      },
      {
        position: [3, 1, -3] as [number, number, number],
        size: 0.6,
        speed: 0.7,
        rotationSpeed: 0.4,
      },
      {
        position: [-2, -1, -1.5] as [number, number, number],
        size: 0.5,
        speed: 0.6,
        rotationSpeed: 0.5,
      },
      {
        position: [2, -2, -2.5] as [number, number, number],
        size: 0.7,
        speed: 0.4,
        rotationSpeed: 0.2,
      },
      {
        position: [0, 0, -4] as [number, number, number],
        size: 1,
        speed: 0.3,
        rotationSpeed: 0.1,
      },
    ],
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />

      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} />
      ))}

      <ConnectionLines />
      <WorkParticles />
    </Canvas>
  );
}

export default ExperienceScene;
