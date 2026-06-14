import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Procedural Tooth Crown ────────────────────────────────────────────────────
function ToothCrown({ scrollProgress }) {
  const meshRef = useRef();

  const geom = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.85, 64, 64);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const len = Math.sqrt(x * x + y * y + z * z);
      const px = x / len, py = y / len, pz = z / len;
      const angle = Math.atan2(pz, px);
      let nx = x, ny = y, nz = z;
      if (py > -0.2) {
        const cf = Math.max(0, py + 0.2);
        const cusps = Math.cos(angle * 4) * 0.12 * cf;
        const boxy = Math.cos(angle * 4) * 0.04 * cf;
        nx += px * (cusps + boxy);
        ny += py * (cusps * 0.8);
        nz += pz * (cusps + boxy);
        if (py > 0.45) {
          const r = Math.sqrt(px * px + pz * pz);
          ny -= Math.max(0, 0.85 - r) * 0.18;
        }
      } else {
        const taper = (py + 0.2) * 0.15;
        nx += px * taper;
        nz += pz * taper;
      }
      if (py > -0.4 && py < 0.4) {
        const bulge = (0.4 - Math.abs(py)) * 0.08;
        nx += px * bulge;
        nz += pz * bulge;
      }
      pos.setXYZ(i, nx, ny, nz);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Animate position/rotation every frame using scroll progress
  useFrame(() => {
    if (!meshRef.current) return;
    const p = scrollProgress.current; // 0 → 1
    // Crown starts high (y=2.2), drops to seat (y=0.18)
    meshRef.current.position.y = THREE.MathUtils.lerp(2.2, 0.18, p);
    // Spins one full turn as it drops
    meshRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 2, p);
  });

  return (
    <mesh ref={meshRef} geometry={geom} castShadow>
      <meshPhysicalMaterial
        color="#fbfcfd"
        roughness={0.15}
        metalness={0.02}
        clearcoat={1.0}
        clearcoatRoughness={0.08}
        transmission={0.1}
        thickness={0.5}
        ior={1.6}
      />
    </mesh>
  );
}

// ─── Titanium Implant Base ─────────────────────────────────────────────────────
function ImplantBase({ scrollProgress }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollProgress.current;
    // Base starts mostly hidden (y=-2.2), rises to y=-1.1
    groupRef.current.position.y = THREE.MathUtils.lerp(-2.2, -1.1, p);
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.32, 1.8, 32]} />
        <meshStandardMaterial color="#a0aec0" metalness={0.95} roughness={0.1} />
      </mesh>
      {[-0.55, -0.8, -1.05, -1.3, -1.55].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[0.43, 0.07, 12, 32]} />
          <meshStandardMaterial color="#a0aec0" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
      <mesh position={[0, 0.58, 0]} castShadow>
        <cylinderGeometry args={[0.54, 0.54, 0.22, 32]} />
        <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.02} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.48, 0.5, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.08} />
      </mesh>
    </group>
  );
}

// ─── Assembly Group (gentle auto-rotate) ──────────────────────────────────────
function AssemblyGroup({ scrollProgress }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Gentle auto-rotation + mouse parallax
    targetRot.current.y += delta * 0.3; // slow continuous spin
    const p = scrollProgress.current;
    const mouseInfluence = THREE.MathUtils.lerp(0.3, 0.1, p);
    groupRef.current.rotation.y += (
      (targetRot.current.y + mouse.current.x * mouseInfluence) -
      groupRef.current.rotation.y
    ) * 0.04;
    groupRef.current.rotation.x +=
      (mouse.current.y * 0.08 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <ToothCrown scrollProgress={scrollProgress} />
      <ImplantBase scrollProgress={scrollProgress} />
    </group>
  );
}

// ─── Full Scene ────────────────────────────────────────────────────────────────
function Scene({ scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2} castShadow
        shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
      <directionalLight position={[-4, 4, -4]} intensity={0.6} />
      <pointLight position={[0, 5, 3]} intensity={1.2} color="#e0f2fe" />
      <Environment preset="city" />
      <AssemblyGroup scrollProgress={scrollProgress} />
    </>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ImplantViewer() {
  // Single shared progress ref — GSAP writes to it, useFrame reads from it
  const scrollProgress = useRef(0);

  useEffect(() => {
    const obj = { value: 0 };

    const trigger = gsap.to(obj, {
      value: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero-scroll-trigger',
        start: 'top top',
        end: '80% top',
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      },
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 5.5], fov: 42 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}          // limit pixel ratio → big performance gain
        frameloop="always"      // keep animating continuously
        gl={{ antialias: true, alpha: true }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
