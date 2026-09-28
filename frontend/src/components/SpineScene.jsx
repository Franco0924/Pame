import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 820px)").matches;
const N = isMobile ? 12 : 16;
const SPAN = isMobile ? 4.6 : 6.1;

const rnd = (i, s) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function Segment({ i, material }) {
  const ref = useRef();
  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    // Progreso global de formación: la espina se completa al bajar ~3 pantallas
    const p = Math.min(
      Math.max(window.scrollY / (window.innerHeight * 3.1), 0),
      1
    );
    const tt = i / (N - 1);
    // Cada vértebra se une en secuencia (de abajo hacia arriba)
    const lp = Math.min(Math.max(p * 1.35 - (1 - tt) * 0.35, 0), 1);
    const e = lp * lp * (3 - 2 * lp);
    const misX = (rnd(i, 1) - 0.5) * (isMobile ? 1.1 : 2.6);
    const misY = (rnd(i, 2) - 0.5) * 1.3;
    const misZ = (rnd(i, 5) - 0.5) * 1.2;
    const misR = (rnd(i, 3) - 0.5) * 1.1;
    const misR2 = (rnd(i, 4) - 0.5) * 0.8;
    const baseY = (tt - 0.5) * SPAN;
    const breathe = Math.sin(t * 0.7 + i * 0.9) * (1 - e) * 0.22;
    // Curva espinal en S suave + ondulación viva al quedar alineada
    const curveX = Math.sin(tt * Math.PI * 1.35 - 0.35) * 0.5;
    const curveR = -Math.cos(tt * Math.PI * 1.35 - 0.35) * 0.2;
    const waveX = Math.sin(t * 1.1 + tt * 4.2) * 0.07;

    m.position.x = THREE.MathUtils.lerp(misX, curveX + waveX, e);
    m.position.y =
      baseY + THREE.MathUtils.lerp(misY + breathe, 0, e) +
      Math.sin(t * 0.9 + tt * 3.1) * 0.035 * e;
    m.position.z = THREE.MathUtils.lerp(misZ, 0, e);
    m.rotation.z = THREE.MathUtils.lerp(
      misR,
      curveR + Math.sin(t * 0.8 + tt * 3.6) * 0.05,
      e
    );
    m.rotation.y = THREE.MathUtils.lerp(misR2, 0, e);
    const k = 1 + Math.sin(t * 1.3 + i) * 0.02;
    m.scale.set(1.22 * k, 0.66 * k, k);
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} material={material}>
      <capsuleGeometry args={[0.3, 0.34, 8, 28]} />
    </mesh>
  );
}

function Spine() {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const material = useMemo(
    () =>
      isMobile
        ? new THREE.MeshStandardMaterial({
            color: "#a9c2b1",
            roughness: 0.38,
            metalness: 0.08,
            envMapIntensity: 1.1,
          })
        : new THREE.MeshPhysicalMaterial({
            color: "#a8c3b0",
            roughness: 0.26,
            metalness: 0.06,
            transparent: true,
            opacity: 0.62,
            clearcoat: 1,
            clearcoatRoughness: 0.16,
            envMapIntensity: 1.5,
          }),
    []
  );

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      mouse.current.x * 0.18,
      2.5,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      mouse.current.y * 0.1,
      2.5,
      delta
    );
    // Al formarse, se reduce y se desplaza hacia el borde como elemento ambiental
    const pg = Math.min(
      Math.max(window.scrollY / (window.innerHeight * 3.1), 0),
      1
    );
    const eg = pg * pg * (3 - 2 * pg);
    const gx = isMobile ? 0 : 2.35 + eg * 0.95;
    const gs = 1 - eg * 0.28;
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      gx,
      3,
      delta
    );
    const cs = THREE.MathUtils.damp(group.current.scale.x, gs, 3, delta);
    group.current.scale.setScalar(cs);
  });

  return (
    <group ref={group} position={[isMobile ? 0 : 2.35, 0, 0]}>
      {Array.from({ length: N }, (_, i) => (
        <Segment key={i} i={i} material={material} />
      ))}
    </group>
  );
}

export default function SpineScene() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(root.current, {
        opacity: 0,
        x: 140,
        ease: "none",
        scrollTrigger: {
          trigger: "#formacion",
          start: "top 95%",
          end: "top 25%",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      data-testid="spine-canvas"
      className="pointer-events-none fixed inset-0 z-0 opacity-40 md:opacity-100"
    >
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 8.6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 6, 4]} intensity={1.1} color="#efe9df" />
          <pointLight position={[-4, -2, 3]} intensity={15} color="#c9936b" />
          <Spine />
          <Sparkles
            count={isMobile ? 60 : 130}
            scale={isMobile ? [5, 8, 3] : [9, 11, 4]}
            size={1.6}
            speed={0.22}
            opacity={0.22}
            color="#8faf9a"
          />
          <Environment resolution={256}>
            <Lightformer intensity={2.2} color="#c9936b" position={[-4, 2, 4]} scale={2.4} />
            <Lightformer intensity={1.6} color="#efe9df" position={[4, -1, 3]} scale={3.2} />
            <Lightformer intensity={1.1} color="#8faf9a" position={[0, 5, -3]} scale={4} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
