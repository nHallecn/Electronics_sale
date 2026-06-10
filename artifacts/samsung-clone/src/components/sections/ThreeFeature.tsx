import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function CSSFallbackScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes orbitSpin { from { transform: rotateX(60deg) rotateZ(0deg); } to { transform: rotateX(60deg) rotateZ(360deg); } }
        @keyframes orbitSpin2 { from { transform: rotateX(75deg) rotateZ(0deg); } to { transform: rotateX(75deg) rotateZ(-360deg); } }
        @keyframes orbitSpin3 { from { transform: rotateX(45deg) rotateZ(90deg); } to { transform: rotateX(45deg) rotateZ(450deg); } }
        @keyframes corePulse { 0%,100% { transform: scale(1); opacity:0.85; } 50% { transform: scale(1.12); opacity:1; } }
        @keyframes twinkle { 0%,100% { opacity: 0.15; transform: scale(0.8); } 50% { opacity: 0.9; transform: scale(1.2); } }
      `}</style>
      <div className="relative w-[420px] h-[420px]" style={{ perspective: "800px" }}>
        {/* Orbit rings */}
        {[
          { anim: "orbitSpin 10s linear infinite", color: "#3b82f6" },
          { anim: "orbitSpin2 14s linear infinite", color: "#6366f1" },
          { anim: "orbitSpin3 18s linear infinite", color: "#8b5cf6" },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px solid ${ring.color}55`,
              animation: ring.anim,
              boxShadow: `0 0 8px 1px ${ring.color}30`,
            }}
          />
        ))}
        {/* Core glow */}
        <div
          className="absolute inset-[30%] rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #60a5fa 0%, #4f46e5 45%, #1e1b4b 100%)",
            animation: "corePulse 4s ease-in-out infinite",
            boxShadow: "0 0 60px 20px rgba(99,102,241,0.4), 0 0 120px 40px rgba(59,130,246,0.2)",
          }}
        />
        {/* Floating particles */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 360;
          const r = 140 + (i % 3) * 30;
          const x = 210 + r * Math.cos((angle * Math.PI) / 180);
          const y = 210 + r * Math.sin((angle * Math.PI) / 180) * 0.4;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: i % 5 === 0 ? "3px" : "1.5px",
                height: i % 5 === 0 ? "3px" : "1.5px",
                left: `${x}px`,
                top: `${y}px`,
                animation: `twinkle ${2 + (i % 4) * 0.5}s ease-in-out infinite`,
                animationDelay: `${(i * 0.15) % 3}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function ThreeCanvas() {
  const [loaded, setLoaded] = useState(false);
  const [Comps, setComps] = useState<{
    Canvas: React.ComponentType<React.ComponentProps<import("@react-three/fiber").Canvas>>;
    OrbitControls: React.ComponentType<React.ComponentProps<import("@react-three/drei").OrbitControls>>;
    TorusKnot: React.ComponentType;
    FloatingParticles: React.ComponentType;
  } | null>(null);

  useEffect(() => {
    Promise.all([
      import("@react-three/fiber"),
      import("@react-three/drei"),
      import("../three/ThreeScene"),
    ])
      .then(([fiber, drei, scene]) => {
        setComps({
          Canvas: fiber.Canvas,
          OrbitControls: drei.OrbitControls,
          TorusKnot: scene.TorusKnot,
          FloatingParticles: scene.FloatingParticles,
        });
        setLoaded(true);
      })
      .catch(() => {});
  }, []);

  if (!loaded || !Comps) return null;

  const { Canvas, OrbitControls, TorusKnot, FloatingParticles } = Comps;

  return (
    <Canvas camera={{ position: [0, 0, 40], fov: 45 }}>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <Suspense fallback={null}>
        <TorusKnot />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
}

export function ThreeFeature() {
  const textRef = useRef<HTMLDivElement>(null);
  const [webgl] = useState<boolean>(() =>
    typeof window !== "undefined" ? isWebGLAvailable() : false
  );

  useEffect(() => {
    if (!textRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: textRef.current, start: "top 70%" },
    });
    tl.fromTo(
      textRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 opacity-70">
        {webgl ? <ThreeCanvas /> : <CSSFallbackScene />}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center pointer-events-none">
        <div
          ref={textRef}
          className="space-y-6 max-w-3xl mx-auto backdrop-blur-sm bg-black/20 p-12 rounded-3xl border border-white/10"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Technology{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              Reimagined
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Pushing the boundaries of what's physically possible. Our latest processor architecture
            delivers unprecedented power with microscopic precision.
          </p>
        </div>
      </div>
    </section>
  );
}
