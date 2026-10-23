"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/** Normalised pointer (-1..1) shared by all scene parts, tracked on window
 *  so it keeps working while HTML sits on top of the canvas. */
function usePointerRef() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

/* ---------- Neural sphere: fibonacci-sphere nodes + proximity edges ---------- */
function NeuralSphere({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const root = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Group>(null!);
  const edgeMat = useRef<THREE.LineBasicMaterial>(null!);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null!);
  const { viewport } = useThree();

  const { nodes, edges, colors } = useMemo(() => {
    const N = 170;
    const R = 2;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push(new THREE.Vector3(Math.cos(t) * r * R, y * R, Math.sin(t) * r * R));
    }

    const nodeArr = new Float32Array(N * 3);
    const colArr = new Float32Array(N * 3);
    const cA = new THREE.Color("#22d3ee");
    const cB = new THREE.Color("#8b5cf6");
    const cC = new THREE.Color("#d946ef");
    const tmp = new THREE.Color();
    pts.forEach((p, i) => {
      nodeArr.set([p.x, p.y, p.z], i * 3);
      const k = (p.y / R + 1) / 2; // 0 bottom -> 1 top
      if (k < 0.5) tmp.copy(cA).lerp(cB, k * 2);
      else tmp.copy(cB).lerp(cC, (k - 0.5) * 2);
      colArr.set([tmp.r, tmp.g, tmp.b], i * 3);
    });

    const seg: number[] = [];
    const maxD = 0.78;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (pts[i].distanceTo(pts[j]) < maxD) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }
    return { nodes: nodeArr, edges: new Float32Array(seg), colors: colArr };
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const wide = viewport.width > 7;
    const targetX = (wide ? viewport.width * 0.2 : 0) + pointer.current.x * 0.5;
    const targetY = pointer.current.y * 0.35;
    const scale = Math.min(1, viewport.width / 5.2);

    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, targetX, 3, dt);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, targetY, 3, dt);
    root.current.scale.setScalar(THREE.MathUtils.damp(root.current.scale.x, scale, 4, dt));

    spin.current.rotation.y += dt * 0.18;
    spin.current.rotation.x = THREE.MathUtils.damp(
      spin.current.rotation.x,
      -pointer.current.y * 0.55,
      3,
      dt,
    );
    spin.current.rotation.z = THREE.MathUtils.damp(
      spin.current.rotation.z,
      pointer.current.x * 0.25,
      3,
      dt,
    );

    if (edgeMat.current) edgeMat.current.opacity = 0.28 + Math.sin(t * 1.4) * 0.08;
    if (coreMat.current) coreMat.current.opacity = 0.16 + Math.sin(t * 2) * 0.05;
  });

  return (
    <group ref={root}>
      <group ref={spin}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.075}
            vertexColors
            sizeAttenuation
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edges, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            ref={edgeMat}
            color="#4f8cff"
            transparent
            opacity={0.3}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        <mesh>
          <icosahedronGeometry args={[1.35, 2]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.18} />
        </mesh>

        {/* glowing core */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshBasicMaterial
            ref={coreMat}
            color="#6d5dfc"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Ambient particle field with cursor parallax ---------- */
function ParticleField({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const COUNT = 1600;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const palette = ["#22d3ee", "#2f7bff", "#8b5cf6", "#d946ef"].map((c) => new THREE.Color(c));
    for (let i = 0; i < COUNT; i++) {
      // random point in a spherical shell, pushed away from the centre
      const r = 4 + Math.pow(Math.random(), 0.7) * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi) - 3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col.set([c.r, c.g, c.b], i * 3);
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, dt) => {
    const p = ref.current;
    p.rotation.y += dt * 0.025;
    p.rotation.x = THREE.MathUtils.damp(p.rotation.x, -pointer.current.y * 0.12, 2, dt);
    p.position.x = THREE.MathUtils.damp(p.position.x, pointer.current.x * 0.6, 2, dt);
    p.position.y = THREE.MathUtils.damp(p.position.y, pointer.current.y * 0.4, 2, dt);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- A few drifting wireframe solids ---------- */
type FloaterProps = {
  geometry: "octa" | "torus" | "ico";
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
};

function Floater({ geometry, position, color, size = 0.5, speed = 1, pointer }: FloaterProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  const { viewport } = useThree();

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime * speed;
    const m = ref.current;
    m.rotation.x += dt * 0.35 * speed;
    m.rotation.y += dt * 0.5 * speed;
    const spread = Math.min(1, viewport.width / 9);
    m.position.x = base.x * spread + pointer.current.x * 0.35 * size;
    m.position.y = base.y + Math.sin(t) * 0.25 + pointer.current.y * 0.25 * size;
    m.position.z = base.z;
  });

  return (
    <mesh ref={ref} position={position} scale={size}>
      {geometry === "octa" && <octahedronGeometry args={[1, 0]} />}
      {geometry === "torus" && <torusGeometry args={[1, 0.32, 12, 40]} />}
      {geometry === "ico" && <icosahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const pointer = usePointerRef();

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ParticleField pointer={pointer} />
      <NeuralSphere pointer={pointer} />
      <Floater geometry="octa" position={[-4.2, 1.6, -1]} color="#22d3ee" size={0.45} speed={0.9} pointer={pointer} />
      <Floater geometry="torus" position={[-3.2, -1.9, 0.5]} color="#d946ef" size={0.38} speed={1.2} pointer={pointer} />
      <Floater geometry="ico" position={[4.8, 2.3, -2]} color="#8b5cf6" size={0.5} speed={0.7} pointer={pointer} />
      <Floater geometry="octa" position={[4.3, -2.2, -1]} color="#2f7bff" size={0.32} speed={1.1} pointer={pointer} />
    </Canvas>
  );
}
