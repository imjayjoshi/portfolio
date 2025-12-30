"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Orbiting particle ring
function OrbitRing({
  radius,
  particleCount,
  speed,
  color,
  size,
}: {
  radius: number;
  particleCount: number;
  speed: number;
  color: string;
  size: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, [particleCount, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * speed;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Central glowing orb
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#3b82f6") },
        uColor2: { value: new THREE.Color("#1e40af") },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          vec3 pos = position;
          pos += normal * sin(uTime * 2.0 + position.y * 5.0) * 0.02;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 color = mix(uColor2, uColor1, fresnel);
          
          float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
          
          gl_FragColor = vec4(color * pulse, 0.3 + fresnel * 0.4);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

// Floating skill icons (abstract shapes)
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 3 + Math.random() * 1.5;
      arr.push({
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        size: 0.1 + Math.random() * 0.15,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} index={i} />
      ))}
    </group>
  );
}

function FloatingShape({
  position,
  size,
  speed,
  offset,
  index,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  offset: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y =
      position[1] + Math.sin(time * speed + offset) * 0.3;
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.z = time * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {index % 3 === 0 ? (
        <octahedronGeometry args={[size]} />
      ) : index % 3 === 1 ? (
        <tetrahedronGeometry args={[size]} />
      ) : (
        <icosahedronGeometry args={[size]} />
      )}
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} wireframe />
    </mesh>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.1) * 0.5;
    camera.position.y = Math.cos(time * 0.15) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function SkillsOrbitScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <CameraController />

      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#3b82f6" />

      {/* Central orb */}
      <CentralOrb />

      {/* Orbiting rings */}
      <OrbitRing
        radius={2}
        particleCount={80}
        speed={0.15}
        color="#60a5fa"
        size={0.03}
      />
      <OrbitRing
        radius={3}
        particleCount={120}
        speed={-0.1}
        color="#3b82f6"
        size={0.025}
      />
      <OrbitRing
        radius={4}
        particleCount={150}
        speed={0.08}
        color="#1e40af"
        size={0.02}
      />
      <OrbitRing
        radius={5.5}
        particleCount={200}
        speed={-0.05}
        color="#60a5fa"
        size={0.015}
      />

      {/* Floating shapes */}
      <FloatingShapes />
    </Canvas>
  );
}

export default SkillsOrbitScene;
