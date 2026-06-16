import { Suspense, useEffect, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, PresentationControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LaptopPreview } from "@/components/models/LaptopPreview";
import { PhonePreview } from "@/components/models/PhonePreview";
import { TabletPreview } from "@/components/models/TabletPreview";
import { TvPreview } from "@/components/models/TvPreview";

gsap.registerPlugin(ScrollTrigger);

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
    accent: "from-sky-400 to-blue-600",
    model: <PhonePreview />,
  },
  {
    title: "NeoVision OLED",
    category: "Smart TV",
    description: "Cinematic color, deep contrast, and a razor-thin display profile.",
    accent: "from-violet-400 to-fuchsia-500",
    model: <TvPreview />,
  },
  {
    title: "NexBook Pro",
    category: "Laptop",
    description: "A powerful everyday workstation with a vivid portable display.",
    accent: "from-orange-400 to-rose-500",
    model: <LaptopPreview />,
  },
  {
    title: "Tab Ultra",
    category: "Tablet",
    description: "Large-screen creativity, note-taking, and streaming in one slim slab.",
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
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-normal md:text-6xl">
            Explore the new lineup in 3D.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-400">
            Drag each product to inspect the shape, then release to let it settle back into place.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {latestProducts.map((product) => (
            <article
              key={product.title}
              className="latest-card group relative min-h-[455px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/25 transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.075]"
            >
              <div
                className={`absolute inset-x-10 top-8 h-40 rounded-full bg-linear-to-r ${product.accent} opacity-20 blur-3xl transition duration-500 group-hover:opacity-35`}
              />

              <div className="latest-canvas relative h-[270px] overflow-hidden rounded-[24px] bg-black/35">
                <ProductCanvas>{product.model}</ProductCanvas>
                <div className="absolute inset-x-0 bottom-6 z-10 flex translate-y-4 justify-center opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <button className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black shadow-lg shadow-black/30 transition hover:bg-blue-100">
                    View
                  </button>
                </div>
              </div>

              <div className="relative mt-6">
                <p className={`bg-linear-to-r ${product.accent} bg-clip-text text-sm font-bold uppercase tracking-wide text-transparent`}>
                  {product.category}
                </p>
                <h3 className="mt-2 text-3xl font-bold">{product.title}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
