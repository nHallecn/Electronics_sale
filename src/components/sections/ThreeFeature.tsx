import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CreditCard, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";

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
        <div
          className="absolute inset-[30%] rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #60a5fa 0%, #4f46e5 45%, #1e1b4b 100%)",
            animation: "corePulse 4s ease-in-out infinite",
            boxShadow: "0 0 60px 20px rgba(99,102,241,0.4), 0 0 120px 40px rgba(59,130,246,0.2)",
          }}
        />
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

interface ThreeComps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Canvas: ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  OrbitControls: ComponentType<any>;
  TorusKnot: ComponentType;
  FloatingParticles: ComponentType;
}

function ThreeCanvas() {
  const [loaded, setLoaded] = useState(false);
  const [Comps, setComps] = useState<ThreeComps | null>(null);

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

      <div className="relative z-10 container mx-auto px-6 pointer-events-none">
        <div
          ref={textRef}
          className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-white/10 bg-black/35 p-6 text-left shadow-2xl shadow-black/30 backdrop-blur-md md:grid-cols-[1.05fr_0.95fr] md:p-10 lg:p-12"
        >
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              Premium electronics, handled end to end
            </div>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-normal text-white md:text-6xl">
              Upgrade your setup without the second guessing.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
              Choose the right phone, TV, laptop, or appliance with clear warranties, fast delivery,
              flexible payments, and support after checkout.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row pointer-events-auto">
              <Button size="lg" className="rounded-full px-7 py-6 text-base">
                Shop best deals
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-7 py-6 text-base text-white hover:bg-white/10"
              >
                Compare products
              </Button>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.06] px-6 py-2 md:px-8">
            {[
              {
                icon: Truck,
                title: "Fast delivery and pickup",
                text: "Get eligible orders delivered quickly or collect in store when it suits you.",
              },
              {
                icon: ShieldCheck,
                title: "Warranty-backed devices",
                text: "Every featured product includes clear warranty coverage and verified support.",
              },
              {
                icon: CreditCard,
                title: "Flexible payment options",
                text: "Split larger upgrades into manageable payments without slowing checkout down.",
              },
              {
                icon: RefreshCcw,
                title: "Easy exchanges",
                text: "Changed your mind or picked the wrong spec? Swap eligible items with less friction.",
              },
            ].map((item, index, list) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex gap-5 py-6 ${index < list.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400 md:text-base">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
