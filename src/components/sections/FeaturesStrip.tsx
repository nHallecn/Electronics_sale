import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Battery, Camera, Monitor } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Camera,
    title: "Next-Gen AI Camera",
    description: "Capture crisp detail in difficult light with smarter scene processing.",
    stat: "200MP",
    label: "Adaptive capture",
    accent: "from-sky-400 to-blue-600",
  },
  {
    icon: Monitor,
    title: "120Hz ProDisplay",
    description: "Enjoy fluid gaming, clean scrolling, and rich color across every frame.",
    stat: "120Hz",
    label: "Ultra smooth",
    accent: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: Battery,
    title: "All-Day Battery",
    description: "Go longer between charges with performance that adapts to your routine.",
    stat: "24h",
    label: "Smart endurance",
    accent: "from-emerald-400 to-lime-500",
  },
];

export function FeaturesStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".feature-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".feature-heading > *",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
      ).fromTo(
        items,
        { opacity: 0, y: 48, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, stagger: 0.14, ease: "power3.out" },
        "-=0.25"
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#050507] py-24 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute left-[12%] top-[-20%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[-22%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="feature-heading mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
            Flagship essentials
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-normal md:text-6xl">
            Built to feel fast, clear, and reliable.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            The details customers notice every day, refined for smoother use across work,
            entertainment, and everything between.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <article
                key={idx}
                className="feature-item group relative min-h-[330px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.055] p-7 shadow-2xl shadow-black/25 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.075]"
              >
                <div
                  className={`absolute inset-x-10 top-8 h-32 rounded-full bg-linear-to-r ${feature.accent} opacity-15 blur-3xl transition duration-500 group-hover:opacity-30`}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className={`rounded-2xl bg-linear-to-r ${feature.accent} p-[1px]`}>
                    <div className="rounded-2xl bg-black/75 p-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`bg-linear-to-r ${feature.accent} bg-clip-text text-4xl font-bold text-transparent`}>
                      {feature.stat}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-500">
                      {feature.label}
                    </p>
                  </div>
                </div>

                <div className="relative mt-16">
                  <h3 className="text-3xl font-bold leading-tight">{feature.title}</h3>
                  <p className="mt-4 text-base leading-7 text-zinc-400">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-7 right-7 h-px bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
