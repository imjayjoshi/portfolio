"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Shader for gradient orb with morphing effect
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uMouse;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Subtle morph based on mouse and time
    float distortion = sin(position.x * 3.0 + uTime) * 0.05 +
                       sin(position.y * 2.0 + uTime * 0.8) * 0.05;
    
    vec3 pos = position + normal * distortion;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  void main() {
    // Create flowing gradient
    float noise = sin(vPosition.x * 2.0 + uTime * 0.5) * 
                  cos(vPosition.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
    
    vec3 color1 = uColor1;
    vec3 color2 = uColor2;
    vec3 color3 = uColor3;
    
    // Blend colors based on position and time
    vec3 color = mix(color1, color2, vUv.y + sin(uTime * 0.2) * 0.1);
    color = mix(color, color3, noise * 0.4);
    
    // Add subtle glow at edges
    float fresnel = pow(1.0 - dot(normalize(vPosition), vec3(0.0, 0.0, 1.0)), 2.0);
    color += fresnel * 0.15;
    
    gl_FragColor = vec4(color, 0.85);
  }
`;

function Orb({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      // Blue gradient colors
      uColor1: { value: new THREE.Color("#1e90ff") }, // Light blue
      uColor2: { value: new THREE.Color("#4169e1") }, // Royal blue
      uColor3: { value: new THREE.Color("#6366f1") }, // Indigo
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth follow mouse
      const targetX = (mousePosition.x - 0.5) * viewport.width * 0.3;
      const targetY = (mousePosition.y - 0.5) * -viewport.height * 0.3;

      meshRef.current.position.x +=
        (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y +=
        (targetY - meshRef.current.position.y) * 0.05;

      // Gentle rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#4169e1"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

interface GradientOrbProps {
  mousePosition: { x: number; y: number };
}

export function GradientOrb({ mousePosition }: GradientOrbProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Orb mousePosition={mousePosition} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
