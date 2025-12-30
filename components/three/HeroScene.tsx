"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Floating Orb with glass-like material
function FloatingOrb({
  scrollProgress,
  mousePosition,
}: {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Shader for organic gradient orb
  const orbMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#1e40af") },
        uColor2: { value: new THREE.Color("#3b82f6") },
        uColor3: { value: new THREE.Color("#60a5fa") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          vNormal = normal;
          vPosition = position;
          
          // Subtle organic deformation
          float displacement = sin(position.x * 2.0 + uTime * 0.5) * 
                               cos(position.y * 2.0 + uTime * 0.3) * 0.02;
          vec3 newPosition = position + normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;
        
        void main() {
          // Fresnel effect for glass-like rim
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.5);
          
          // Gradient based on position
          float gradient = (vPosition.y + 1.0) * 0.5;
          vec3 color = mix(uColor1, uColor2, gradient);
          color = mix(color, uColor3, fresnel * 0.5);
          
          // Add subtle glow at edges
          color += fresnel * uColor3 * 0.3;
          
          gl_FragColor = vec4(color, 0.85 - fresnel * 0.2);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const time = state.clock.elapsedTime;

      // Update shader time
      orbMaterial.uniforms.uTime.value = time;

      // Anti-gravity floating motion
      meshRef.current.position.y = Math.sin(time * 0.4) * 0.15;
      meshRef.current.position.x = Math.sin(time * 0.3) * 0.05;

      // Scroll-based rotation
      meshRef.current.rotation.y = scrollProgress * Math.PI * 2;
      meshRef.current.rotation.x = scrollProgress * 0.5;

      // Mouse parallax tilt
      const targetRotationX = (mousePosition.y - 0.5) * 0.2;
      const targetRotationY = (mousePosition.x - 0.5) * 0.2;
      meshRef.current.rotation.x +=
        (targetRotationX - meshRef.current.rotation.x) * 0.02;
      meshRef.current.rotation.z +=
        (targetRotationY - meshRef.current.rotation.z) * 0.02;

      // Sync glow
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <group>
      {/* Main orb */}
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 6]} />
        <primitive object={orbMaterial} attach="material" />
      </mesh>

      {/* Ambient glow */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Scroll-reactive particle field
function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;
  const prevScrollRef = useRef(0);
  const velocityRef = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread particles in a wide field behind the orb
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 2) * 15 - 3; // Behind camera

      // Random velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = pointsRef.current.geometry;
      const positionArray = geometry.attributes.position.array as Float32Array;

      // Calculate scroll velocity
      const scrollDelta = scrollProgress - prevScrollRef.current;
      velocityRef.current = velocityRef.current * 0.95 + scrollDelta * 10; // Smooth velocity
      prevScrollRef.current = scrollProgress;

      // Update particles
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Base drift motion
        positionArray[i3] += velocities[i3] + Math.sin(time * 0.2 + i) * 0.001;
        positionArray[i3 + 1] += velocities[i3 + 1] + velocityRef.current * 0.5;
        positionArray[i3 + 2] +=
          velocities[i3 + 2] + Math.sin(time * 0.1 + i) * 0.002;

        // Wrap particles when they go too far
        if (positionArray[i3 + 1] > 15) positionArray[i3 + 1] = -15;
        if (positionArray[i3 + 1] < -15) positionArray[i3 + 1] = 15;
        if (positionArray[i3 + 2] > 2) positionArray[i3 + 2] = -20;
        if (positionArray[i3 + 2] < -20) positionArray[i3 + 2] = 2;
      }

      geometry.attributes.position.needsUpdate = true;

      // Slow rotation of entire field
      pointsRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#60a5fa"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Camera with initial zoom effect
function CameraController() {
  const { camera } = useThree();
  const initialZ = useRef(6);

  useEffect(() => {
    camera.position.z = 8;
  }, [camera]);

  useFrame(() => {
    // Subtle zoom in on load
    if (camera.position.z > initialZ.current) {
      camera.position.z -= (camera.position.z - initialZ.current) * 0.02;
    }
  });

  return null;
}

interface HeroSceneProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

export function HeroScene({ scrollProgress, mousePosition }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <CameraController />

        {/* Subtle ambient lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.3}
          color="#60a5fa"
        />
        <directionalLight
          position={[-5, -5, -5]}
          intensity={0.2}
          color="#1e40af"
        />

        <FloatingOrb
          scrollProgress={scrollProgress}
          mousePosition={mousePosition}
        />
        <ParticleField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
