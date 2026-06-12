import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Monitor, Refrigerator, Smartphone, Tv } from "lucide-react";

import featuredTvImg from "@/assets/images/featured-tv.png";
import fridgeImg from "@/assets/images/grid-fridge.png";
import tvImg from "@/assets/images/grid-tv.png";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "Smartphones",
    eyebrow: "New arrivals",
    description: "Flagship speed, bright displays, and pro-grade cameras for everyday work and play.",
    image: "/hero-phone.png",
    icon: Smartphone,
    price: "From $699",
    accent: "from-sky-400 to-blue-600",
  },
  {
    title: "TV & Home Cinema",
    eyebrow: "Best sellers",
    description: "Immersive screens with punchy color, deep contrast, and room-filling entertainment.",
    image: tvImg,
    icon: Tv,
    price: "From $899",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    title: "Smart Appliances",
    eyebrow: "For home",
    description: "Connected cooling and cleaning essentials designed to make busy days feel lighter.",
    image: fridgeImg,
    icon: Refrigerator,
    price: "From $1,099",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    title: "Displays",
    eyebrow: "Work & gaming",
    description: "Crisp detail, smooth motion, and cinematic scale for desks, studios, and setups.",
    image: featuredTvImg,
    icon: Monitor,
    price: "From $349",
    accent: "from-orange-400 to-rose-500",
  },
];

export function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".product-card");
      const visuals = gsap.utils.toArray<HTMLElement>(".product-visual");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".product-heading > *",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      )
        .fromTo(
          cards,
          { y: 80, opacity: 0, rotateX: 8, transformOrigin: "50% 100%" },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=0.25"
        )
        .fromTo(
          visuals,
          { y: 28, scale: 0.94, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=0.75"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="product-heading mx-auto mb-12 flex max-w-4xl flex-col items-center gap-5 text-center md:mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold leading-tight tracking-normal md:text-6xl">
              Find the tech that fits your world.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-7 text-zinc-400">
            Browse the essentials across mobile, entertainment, home appliances, and displays.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article
                key={product.title}
                className="product-card group relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#171719] p-5 shadow-2xl shadow-black/25 transition duration-500 hover:-translate-y-2 hover:border-white/20"
              >
                <div
                  className={`pointer-events-none absolute inset-x-8 top-8 h-40 rounded-full bg-linear-to-r ${product.accent} opacity-20 blur-3xl transition duration-500 group-hover:opacity-35`}
                />

                <div className="relative flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-300">
                    {product.eyebrow}
                  </span>
                  <div className={`rounded-full bg-linear-to-r ${product.accent} p-2 text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="product-visual relative mt-8 flex h-64 items-center justify-center rounded-[22px] bg-black/45 p-5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="relative mt-auto pt-8">
                  <p className={`mb-3 bg-linear-to-r ${product.accent} bg-clip-text text-sm font-bold text-transparent`}>
                    {product.price}
                  </p>
                  <h3 className="text-3xl font-bold leading-tight">{product.title}</h3>
                  <p className="mt-4 min-h-[84px] text-base leading-7 text-zinc-400">
                    {product.description}
                  </p>
                  <button className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:text-blue-300">
                    Shop category
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
