import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, PresentationControls, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import { Model as PhoneModel } from "@/components/models/Scene.jsx";

gsap.registerPlugin(ScrollTrigger);

function PhonePreview() {
  return (
    <group rotation={[0.08, -0.4, 0.02]} scale={0.72} position={[0, -2, 0]}>
      <PhoneModel />
    </group>
  );
}

function TvPreview() {
  return (
    <group rotation={[0.08, -0.35, 0]} position={[0, -1, 0]}>
      <RoundedBox args={[35, 20, 1.6]} radius={0.7} smoothness={8}>
        <meshStandardMaterial color="#111827" roughness={0.22} metalness={0.7} />
      </RoundedBox>
      <RoundedBox args={[32.4, 17.4, 0.35]} radius={0.35} smoothness={8} position={[0, 0.4, 1]}>
        <meshStandardMaterial color="#020617" roughness={0.12} metalness={0.25} />
      </RoundedBox>
      <mesh position={[-2, 0.8, 1.22]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#2563eb"
          emissiveIntensity={0.35}
          transparent
          opacity={0.45}
        />
      </mesh>
      <mesh position={[5, -1.2, 1.24]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#e11d48"
          emissiveIntensity={0.26}
          transparent
          opacity={0.28}
        />
      </mesh>
      <RoundedBox args={[3.2, 5.5, 1]} radius={0.25} smoothness={6} position={[0, -12.6, -0.1]}>
        <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.75} />
      </RoundedBox>
      <RoundedBox args={[14, 1.4, 5.5]} radius={0.45} smoothness={8} position={[0, -16, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.24} metalness={0.8} />
      </RoundedBox>
    </group>
  );
}

function LaptopPreview() {
  const keys = Array.from({ length: 28 }, (_, i) => {
    const row = Math.floor(i / 7);
    const col = i % 7;
    return { x: -10.2 + col * 3.4, z: -1.8 + row * 2.2 };
  });

  return (
    <group rotation={[0.25, -0.45, 0]} position={[0, -5, 0]}>
      <RoundedBox args={[31, 20, 1.15]} radius={1.2} smoothness={10} position={[0, -5, 2]}>
        <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.82} />
      </RoundedBox>
      <RoundedBox args={[11, 5.5, 0.16]} radius={0.35} smoothness={6} position={[0, -5.2, 2.7]}>
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.35} />
      </RoundedBox>
      {keys.map((key) => (
        <RoundedBox
          key={`${key.x}-${key.z}`}
          args={[2.35, 0.22, 1.25]}
          radius={0.18}
          smoothness={4}
          position={[key.x, -5.2, key.z + 2.7]}
        >
          <meshStandardMaterial color="#111827" roughness={0.35} />
        </RoundedBox>
      ))}
      <group position={[0, 5, -7.3]} rotation={[-0.52, 0, 0]}>
        <RoundedBox args={[30, 19, 1.15]} radius={1.4} smoothness={10}>
          <meshStandardMaterial color="#94a3b8" roughness={0.18} metalness={0.8} />
        </RoundedBox>
        <RoundedBox args={[27, 15.8, 0.2]} radius={0.8} smoothness={8} position={[0, 0, 0.74]}>
          <meshStandardMaterial color="#020617" roughness={0.12} metalness={0.2} />
        </RoundedBox>
        <mesh position={[1.5, 0, 0.86]} rotation={[0, 0, -0.18]}>
          <planeGeometry args={[18, 11]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#6d28d9"
            emissiveIntensity={0.34}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}

function TabletPreview() {
  return (
    <group rotation={[0.12, -0.5, 0.04]} position={[0, -1, 0]}>
      <RoundedBox args={[25, 34, 2]} radius={2.2} smoothness={12}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.18} metalness={0.82} />
      </RoundedBox>
      <RoundedBox args={[22.5, 31, 0.28]} radius={1.55} smoothness={12} position={[0, 0, 1.16]}>
        <meshStandardMaterial
          color="#020617"
          emissive="#0f766e"
          emissiveIntensity={0.18}
          roughness={0.08}
        />
      </RoundedBox>
      <mesh position={[-2.6, 1.6, 1.34]} rotation={[0, 0, -0.28]}>
        <planeGeometry args={[12, 24]} />
        <meshStandardMaterial
          color="#14b8a6"
          emissive="#0d9488"
          emissiveIntensity={0.34}
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh position={[6.5, -3, 2.1]} rotation={[0, 0, -0.45]}>
        <cylinderGeometry args={[0.45, 0.45, 31, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.16} metalness={0.35} />
      </mesh>
      <mesh position={[0, 15.6, 1.45]}>
        <circleGeometry args={[0.55, 36]} />
        <meshStandardMaterial color="#020617" roughness={0.16} metalness={0.8} />
      </mesh>
    </group>
  );
}

function ProductCanvas({ children }: { children: ReactNode }) {
  return (
    <Canvas camera={{ position: [0, 0, 70], fov: 36 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.9} />
      <spotLight position={[12, 18, 24]} angle={0.35} penumbra={1} intensity={1.4} />
      <directionalLight position={[-10, 8, 10]} intensity={0.9} color="#93c5fd" />
      <Suspense fallback={null}>
        <PresentationControls
          cursor
          global={false}
          snap
          speed={1.15}
          rotation={[0, -0.2, 0]}
          polar={[-0.35, 0.35]}
          azimuth={[-0.75, 0.75]}
        >
          <Float speed={2.2} rotationIntensity={0.12} floatIntensity={1.05}>
            {children}
          </Float>
        </PresentationControls>
        <ContactShadows position={[0, -23, 0]} opacity={0.38} blur={2.5} scale={62} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

const latestProducts = [
  {
    title: "NexGen Phone X",
    category: "Smartphone",
    description: "A brighter mobile flagship with an AI-ready camera system.",
    price: "From $699",
    accent: "from-sky-400 to-blue-600",
    model: <PhonePreview />,
  },
  {
    title: "NeoVision OLED",
    category: "Smart TV",
    description: "Cinematic color, deep contrast, and a razor-thin display profile.",
    price: "From $899",
    accent: "from-violet-400 to-fuchsia-500",
    model: <TvPreview />,
  },
  {
    title: "NexBook Pro",
    category: "Laptop",
    description: "A powerful everyday workstation with a vivid portable display.",
    price: "From $1,299",
    accent: "from-orange-400 to-rose-500",
    model: <LaptopPreview />,
  },
  {
    title: "Tab Ultra",
    category: "Tablet",
    description: "Large-screen creativity, note-taking, and streaming in one slim slab.",
    price: "From $549",
    accent: "from-emerald-400 to-teal-500",
    model: <TabletPreview />,
  },
];

export function LatestProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".latest-heading > *",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: "power3.out" }
      )
        .fromTo(
          ".latest-card",
          { y: 70, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=0.25"
        )
        .fromTo(
          ".latest-canvas",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power3.out" },
          "-=0.75"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute left-[10%] top-[8%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[8%] bottom-[6%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="latest-heading mx-auto mb-14 max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
            Latest products
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-normal md:text-6xl">
            Explore the new lineup in 3D.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Drag each product to inspect the shape, then release to let it settle back into place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latestProducts.map((product) => (
            <article
              key={product.title}
              className="latest-card group relative min-h-[560px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/25 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.075]"
            >
              <div
                className={`absolute inset-x-10 top-8 h-40 rounded-full bg-linear-to-r ${product.accent} opacity-20 blur-3xl transition duration-500 group-hover:opacity-35`}
              />

              <div className="latest-canvas relative h-[330px] rounded-[24px] bg-black/35">
                <ProductCanvas>{product.model}</ProductCanvas>
              </div>

              <div className="relative mt-7">
                <p className={`bg-linear-to-r ${product.accent} bg-clip-text text-sm font-bold uppercase tracking-wide text-transparent`}>
                  {product.category}
                </p>
                <h3 className="mt-2 text-3xl font-bold">{product.title}</h3>
                <p className="mt-4 min-h-[78px] text-base leading-7 text-zinc-400">
                  {product.description}
                </p>
                <div className="mt-7 flex items-center justify-between gap-4">
                  <p className="text-lg font-bold text-white">{product.price}</p>
                  <button className="inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:text-blue-300">
                    View
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
