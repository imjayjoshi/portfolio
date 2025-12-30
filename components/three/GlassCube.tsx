"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function GlassCube({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Custom glass material
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.6,
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth follow mouse for tilt effect
      const targetRotationY = (mousePosition.x - 0.5) * 0.5;
      const targetRotationX = (mousePosition.y - 0.5) * -0.3;

      groupRef.current.rotation.y +=
        (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (targetRotationX - groupRef.current.rotation.x) * 0.05;

      // Gentle floating animation
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glass cube */}
      <RoundedBox args={[2, 2, 2]} radius={0.15} smoothness={4}>
        <primitive object={glassMaterial} attach="material" />
      </RoundedBox>

      {/* JJ Text inside */}
      <Text
        position={[0, 0, 0.8]}
        fontSize={0.8}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Sora-Bold.woff"
        fontWeight={700}
      >
        JJ
      </Text>

      {/* Subtle inner glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        color="#3b82f6"
        distance={3}
      />
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 30;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.03}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

interface GlassCubeSceneProps {
  mousePosition: { x: number; y: number };
}

export function GlassCubeScene({ mousePosition }: GlassCubeSceneProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />

        <GlassCube mousePosition={mousePosition} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
