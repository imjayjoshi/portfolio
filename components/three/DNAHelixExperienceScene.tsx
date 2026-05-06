"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── DNA Helix Experience Timeline ───────────────────────────────────────────
// Timeline as a double-helix. Each job is a glowing rung.
// Scroll rotates the helix in 3D. Camera follows a spline path.

const DNA_VERTEX = `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;
  uniform float uActivation;
  uniform vec3  uColor;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DNA_FRAGMENT = `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;
  uniform float uActivation;
  uniform vec3  uColor;

  void main() {
    vec3 view = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - abs(dot(view, vNormal)), 2.0);
    float pulse = 0.7 + 0.3 * sin(uTime * 3.0 + uActivation * 6.28);
    vec3 col = uColor * (0.3 + fresnel * 0.9) * pulse;
    col += uColor * uActivation * fresnel * 1.5;
    float alpha = 0.5 + fresnel * 0.5 + uActivation * 0.4;
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

// A single helical strand
function HelixStrand({
  phase,
  color,
  scrollProgress,
}: {
  phase: number;
  color: string;
  scrollProgress: number;
}) {
  const tubeRef = useMemo(() => {
    const TURNS = 4;
    const HEIGHT = 8;
    const RADIUS = 0.7;
    const POINTS = 120;

    const pts = Array.from({ length: POINTS }, (_, i) => {
      const t = i / (POINTS - 1);
      const angle = t * Math.PI * 2 * TURNS + phase;
      return new THREE.Vector3(
        Math.cos(angle) * RADIUS,
        t * HEIGHT - HEIGHT / 2,
        Math.sin(angle) * RADIUS
      );
    });

    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 120, 0.03, 8, false);
  }, [phase]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI * 2;
    }
  });

  return <mesh ref={meshRef} geometry={tubeRef} material={material} />;
}

// A "rung" connecting the two strands — represents a job
function HelixRung({
  index,
  total,
  isActive,
  scrollProgress,
  color,
}: {
  index: number;
  total: number;
  isActive: boolean;
  scrollProgress: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActivation: { value: isActive ? 1 : 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color, isActive]
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: DNA_VERTEX,
        fragmentShader: DNA_FRAGMENT,
        uniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [uniforms]
  );

  // Position rung along helix
  const { position, rotation } = useMemo(() => {
    const t = index / (total - 1);
    const HEIGHT = 8;
    const TURNS = 4;
    const RADIUS = 0.7;
    const angle = t * Math.PI * 2 * TURNS;
    const y = t * HEIGHT - HEIGHT / 2;

    const fromA = new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS);
    const toB = new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS);
    const center = new THREE.Vector3().addVectors(fromA, toB).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(toB, fromA);
    const len = dir.length();

    return {
      position: center,
      rotation: new THREE.Euler(0, angle + Math.PI / 2, Math.PI / 2),
    };
  }, [index, total]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uActivation.value = THREE.MathUtils.lerp(
      uniforms.uActivation.value,
      isActive ? 1 : 0.1,
      0.05
    );
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scrollProgress * Math.PI * 2;
    }
  });

  // Node spheres at each end
  const t = index / (total - 1);
  const angle = t * Math.PI * 2 * 4;
  const HEIGHT = 8;
  const RADIUS = 0.7;
  const y = t * HEIGHT - HEIGHT / 2;

  return (
    <group>
      {/* Rung cylinder */}
      <mesh ref={meshRef} position={position} rotation={rotation} material={material}>
        <cylinderGeometry args={[0.025, 0.025, RADIUS * 2, 8]} />
      </mesh>
      {/* Strand A node */}
      <mesh
        position={[Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS]}
        material={new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0.8 + (isActive ? 0.2 : 0),
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })}
      >
        <sphereGeometry args={[isActive ? 0.1 : 0.06, 12, 12]} />
      </mesh>
      {/* Strand B node */}
      <mesh
        position={[Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS]}
        material={new THREE.MeshBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })}
      >
        <sphereGeometry args={[0.06, 12, 12]} />
      </mesh>
    </group>
  );
}

// Ambient particles around the helix
function HelixParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geo } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 2;
      const a = Math.random() * Math.PI * 2;
      const h = (Math.random() - 0.5) * 9;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = h;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geo: g };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollProgress * Math.PI;
    }
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color="#4f9eff"
        size={0.025}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface DNAHelixSceneProps {
  activeIndex?: number;
  totalExperiences?: number;
  scrollProgress?: number;
}

function DNAScene({ activeIndex = 0, totalExperiences = 5, scrollProgress = 0 }: DNAHelixSceneProps) {
  const { camera } = useThree();

  // Camera follows a spline along the helix on scroll
  const cameraPath = useMemo(() => {
    const pts = [
      new THREE.Vector3(3, -4.5, 3),
      new THREE.Vector3(3.5, -2, 3.5),
      new THREE.Vector3(-3, 0, 3),
      new THREE.Vector3(-3.5, 2, 3.5),
      new THREE.Vector3(3, 4, 3),
    ];
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame(() => {
    const t = Math.max(0, Math.min(1, scrollProgress));
    const pos = cameraPath.getPoint(t);
    camera.position.lerp(pos, 0.05);
    camera.lookAt(0, pos.y * 0.3, 0);
  });

  const rungColors = ["#4f9eff", "#a855f7", "#06b6d4", "#f59e0b", "#10b981"];

  return (
    <>
      <HelixStrand phase={0} color="#3b82f6" scrollProgress={scrollProgress} />
      <HelixStrand phase={Math.PI} color="#8b5cf6" scrollProgress={scrollProgress} />

      {Array.from({ length: totalExperiences }, (_, i) => (
        <HelixRung
          key={i}
          index={i}
          total={totalExperiences}
          isActive={i === activeIndex}
          scrollProgress={scrollProgress}
          color={rungColors[i % rungColors.length]}
        />
      ))}

      <HelixParticles scrollProgress={scrollProgress} />
    </>
  );
}

export function DNAHelixExperienceScene({
  activeIndex = 0,
  totalExperiences = 5,
  scrollProgress = 0,
}: DNAHelixSceneProps) {
  return (
    <Canvas
      camera={{ position: [3, -4, 3], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#4f9eff" />
      <DNAScene
        activeIndex={activeIndex}
        totalExperiences={totalExperiences}
        scrollProgress={scrollProgress}
      />
    </Canvas>
  );
}

export default DNAHelixExperienceScene;