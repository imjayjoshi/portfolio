"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

// ─── Neural Network Skills Scene ─────────────────────────────────────────────
// Skills rendered as a live force-directed neural graph.
// Nodes pulse with electricity. Edges animate with dash offset.
// Mouse hover "activates" a neuron, spreading glow to neighbours.

const SKILL_CLUSTERS = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#4f9eff",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Three.js"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#a855f7",
    skills: ["Node.js", "Express", "Python", "REST", "GraphQL"],
  },
  {
    id: "database",
    label: "Database",
    color: "#06b6d4",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#f59e0b",
    skills: ["OpenAI", "LangChain", "Streamlit", "TensorFlow"],
  },
  {
    id: "devops",
    label: "DevOps",
    color: "#10b981",
    skills: ["Docker", "Vercel", "Git", "CI/CD"],
  },
];

// Node vertex shader — pulsing energy sphere
const nodeVertex = `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;
  uniform float uActivation; // 0-1

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;

    float pulse = 1.0 + sin(uTime * 3.0) * 0.04 * uActivation;
    vec3 pos = position * pulse;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const nodeFragment = `
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform float uTime;
  uniform float uActivation;
  uniform vec3 uColor;

  void main() {
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.0);

    // Energy core
    float core = 1.0 - length(vNormal.xy) * 1.2;
    core = max(0.0, core);

    vec3 col = uColor * (0.4 + fresnel * 0.8 + core * 0.6);
    col += uColor * uActivation * (fresnel * 1.5 + sin(uTime * 8.0) * 0.2);

    float alpha = 0.6 + fresnel * 0.4 + uActivation * 0.3;
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

function NeuralNode({
  position,
  color,
  label,
  size = 0.12,
  isActive,
  activationLevel,
  onActivate,
}: {
  position: THREE.Vector3;
  color: string;
  label: string;
  size?: number;
  isActive: boolean;
  activationLevel: number;
  onActivate: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActivation: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: nodeVertex,
        fragmentShader: nodeFragment,
        uniforms,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [uniforms]
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uActivation.value = THREE.MathUtils.lerp(
      uniforms.uActivation.value,
      activationLevel,
      0.06
    );
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x += 0.004;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      material={material}
      onPointerEnter={onActivate}
    >
      <icosahedronGeometry args={[size, 2]} />
    </mesh>
  );
}

// Animated electric edge between two nodes
function ElectricEdge({
  from,
  to,
  color,
  animOffset,
  activation,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  animOffset: number;
  activation: number;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const { points, geometry } = useMemo(() => {
    // Create slightly curved path with midpoint jitter
    const mid = new THREE.Vector3()
      .addVectors(from, to)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, 0.1));

    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const pts = curve.getPoints(30);
    const positions = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { points: pts, geometry: geo };
  }, [from, to]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.2 + activation * 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [color, activation]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lineRef.current) {
      // Animate dash by rebuilding positions with electric jitter
      const posAttr = lineRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const pts = points;
      pts.forEach((p, i) => {
        const jitter = activation > 0.5 ? (Math.random() - 0.5) * 0.008 : 0;
        posAttr.setXYZ(i, p.x + jitter, p.y + jitter, p.z);
      });
      posAttr.needsUpdate = true;
      (lineRef.current.material as THREE.LineBasicMaterial).opacity =
        0.15 + Math.sin(t * 3 + animOffset) * 0.1 + activation * 0.5;
    }
  });

  const lineObject = useMemo(() => {
    return new THREE.Line(geometry, material);
  }, [geometry, material]);

  return <primitive ref={lineRef} object={lineObject} />;
}

function ElectricitySpark({
  from,
  to,
  color,
  speed,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());

  const curve = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(from, to)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.2, 0.1));
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * speed) % 1;
    const pos = curve.getPoint(progress.current);
    if (meshRef.current) {
      meshRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Build node positions with cluster layout
function buildGraph() {
  const nodes: {
    id: string;
    label: string;
    color: string;
    position: THREE.Vector3;
    clusterId: string;
    isClusterHead: boolean;
  }[] = [];

  const clusterCenters = [
    new THREE.Vector3(-2.8, 0.8, 0),
    new THREE.Vector3(0, 1.5, 0),
    new THREE.Vector3(2.8, 0.5, 0),
    new THREE.Vector3(1.8, -1.4, 0),
    new THREE.Vector3(-2.0, -1.4, 0),
  ];

  SKILL_CLUSTERS.forEach((cluster, ci) => {
    const center = clusterCenters[ci];

    // Cluster head node
    nodes.push({
      id: `${cluster.id}-head`,
      label: cluster.label,
      color: cluster.color,
      position: center.clone(),
      clusterId: cluster.id,
      isClusterHead: true,
    });

    // Skill leaf nodes
    cluster.skills.forEach((skill, si) => {
      const angle = (si / cluster.skills.length) * Math.PI * 2;
      const r = 0.65 + Math.random() * 0.15;
      nodes.push({
        id: `${cluster.id}-${si}`,
        label: skill,
        color: cluster.color,
        position: new THREE.Vector3(
          center.x + Math.cos(angle) * r,
          center.y + Math.sin(angle) * r,
          (Math.random() - 0.5) * 0.3
        ),
        clusterId: cluster.id,
        isClusterHead: false,
      });
    });
  });

  // Edges: within cluster + cross-cluster between heads
  const edges: { from: string; to: string; color: string }[] = [];
  SKILL_CLUSTERS.forEach((cluster) => {
    const head = `${cluster.id}-head`;
    cluster.skills.forEach((_, si) => {
      edges.push({ from: head, to: `${cluster.id}-${si}`, color: cluster.color });
    });
  });

  // Cross cluster edges between heads
  const heads = SKILL_CLUSTERS.map((c) => `${c.id}-head`);
  for (let i = 0; i < heads.length; i++) {
    for (let j = i + 1; j < heads.length; j++) {
      if (Math.random() > 0.3) {
        edges.push({ from: heads[i], to: heads[j], color: "#334155" });
      }
    }
  }

  return { nodes, edges };
}

function NeuralScene() {
  const [activatedCluster, setActivatedCluster] = useState<string | null>(null);
  const { nodes, edges } = useMemo(() => buildGraph(), []);

  const getActivation = useCallback(
    (nodeId: string) => {
      if (!activatedCluster) return 0;
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return 0;
      if (node.clusterId === activatedCluster) return 1;
      // Partial glow for connected clusters via edges
      const connected = edges.some(
        (e) =>
          (e.from === nodeId || e.to === nodeId) &&
          nodes.find((n) => n.id === (e.from === nodeId ? e.to : e.from))
            ?.clusterId === activatedCluster
      );
      return connected ? 0.4 : 0;
    },
    [activatedCluster, nodes, edges]
  );

  const nodeMap = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes]
  );

  // Sparks on activated edges
  const activatedEdges = useMemo(
    () =>
      activatedCluster
        ? edges.filter((e) => {
            const fn = nodeMap.get(e.from);
            const tn = nodeMap.get(e.to);
            return fn?.clusterId === activatedCluster || tn?.clusterId === activatedCluster;
          })
        : [],
    [activatedCluster, edges, nodeMap]
  );

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#4f9eff" />

      {/* Edges */}
      {edges.map((edge, i) => {
        const fn = nodeMap.get(edge.from);
        const tn = nodeMap.get(edge.to);
        if (!fn || !tn) return null;
        const activation =
          (getActivation(edge.from) + getActivation(edge.to)) / 2;
        return (
          <ElectricEdge
            key={`edge-${i}`}
            from={fn.position}
            to={tn.position}
            color={edge.color}
            animOffset={i * 0.5}
            activation={activation}
          />
        );
      })}

      {/* Sparks on activated edges */}
      {activatedEdges.map((edge, i) => {
        const fn = nodeMap.get(edge.from)!;
        const tn = nodeMap.get(edge.to)!;
        return (
          <ElectricitySpark
            key={`spark-${i}`}
            from={fn.position}
            to={tn.position}
            color={fn.color}
            speed={0.4 + Math.random() * 0.4}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <NeuralNode
          key={node.id}
          position={node.position}
          color={node.color}
          label={node.label}
          size={node.isClusterHead ? 0.2 : 0.1}
          isActive={activatedCluster === node.clusterId}
          activationLevel={getActivation(node.id)}
          onActivate={() => setActivatedCluster(node.clusterId)}
        />
      ))}
    </>
  );
}

export function NeuralNetworkSkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerLeave={() => {}}
    >
      <NeuralScene />
    </Canvas>
  );
}

export default NeuralNetworkSkillsScene;