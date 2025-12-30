"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Stacked certificate cards
function CertificateCard({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = (index - total / 2) * 0.15;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle floating
    meshRef.current.position.y =
      offset + Math.sin(time * 0.5 + index * 0.5) * 0.05;
    meshRef.current.position.z = -index * 0.3 - 2;

    // Slight rotation
    meshRef.current.rotation.x = -0.1 + Math.sin(time * 0.3 + index) * 0.02;
    meshRef.current.rotation.y = Math.sin(time * 0.2 + index * 0.3) * 0.05;
  });

  const opacity = 0.2 - index * 0.03;

  return (
    <mesh ref={meshRef} position={[0, offset, -index * 0.3 - 2]}>
      <planeGeometry args={[2.5, 1.8]} />
      <meshBasicMaterial
        color="#3b82f6"
        transparent
        opacity={Math.max(opacity, 0.05)}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Certificate frame wireframe
function CertificateFrame({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = (index - total / 2) * 0.15;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    meshRef.current.position.y =
      offset + Math.sin(time * 0.5 + index * 0.5) * 0.05;
    meshRef.current.position.z = -index * 0.3 - 2;
    meshRef.current.rotation.x = -0.1 + Math.sin(time * 0.3 + index) * 0.02;
    meshRef.current.rotation.y = Math.sin(time * 0.2 + index * 0.3) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, offset, -index * 0.3 - 2]}>
      <planeGeometry args={[2.6, 1.9]} />
      <meshBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.3 - index * 0.05}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating badge/seal
function CertificateSeal() {
  const sealRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sealRef.current) return;
    const time = state.clock.elapsedTime;
    sealRef.current.rotation.z = time * 0.5;
    sealRef.current.position.y = Math.sin(time * 0.8) * 0.1;
  });

  return (
    <mesh ref={sealRef} position={[1.8, -0.5, -1]}>
      <circleGeometry args={[0.3, 6]} />
      <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} wireframe />
    </mesh>
  );
}

// Ambient particles
function CertParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#fbbf24"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function CertificatesScene() {
  const cardCount = 5;

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />

      {/* Stacked certificate cards */}
      {Array.from({ length: cardCount }).map((_, i) => (
        <CertificateCard key={`card-${i}`} index={i} total={cardCount} />
      ))}

      {/* Wireframe frames */}
      {Array.from({ length: cardCount }).map((_, i) => (
        <CertificateFrame key={`frame-${i}`} index={i} total={cardCount} />
      ))}

      {/* Gold seal */}
      <CertificateSeal />

      {/* Ambient particles */}
      <CertParticles />
    </Canvas>
  );
}

export default CertificatesScene;
