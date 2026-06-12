import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import featuredTvImg from "@/assets/images/featured-tv.png";

const metrics = [
  { value: "30%", label: "bundle savings" },
  { value: "24h", label: "delivery options" },
  { value: "4K+", label: "premium picks" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-bg",
        { scale: 1.08, opacity: 0.55 },
        { scale: 1, opacity: 0.82, duration: 1.6, ease: "power3.out" }
      )
        .fromTo(
          ".hero-copy > *",
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          "-=1.1"
        )
        .fromTo(
          ".hero-product",
          { y: 80, opacity: 0, scale: 0.92, rotate: -5 },
          { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: "power3.out" },
          "-=0.75"
        )
        .fromTo(
          ".hero-metric",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=0.55"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-black px-6 pb-12 pt-32 text-white md:pb-16"
    >
      <div className="absolute inset-0">
        <img
          src={featuredTvImg}
          alt="Premium electronics display"
          className="hero-bg h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/25" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="hero-copy max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-blue-300" />
            New season deals are live
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-normal md:text-7xl lg:text-8xl">
            Upgrade every screen in your life.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
            Discover flagship phones, cinematic TVs, smarter appliances, and display gear selected
            for sharper work, richer entertainment, and easier everyday living.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full px-8 py-6 text-base">
              Shop latest products
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/[0.05] px-8 py-6 text-base text-white backdrop-blur hover:bg-white/10"
            >
              View today&apos;s deals
            </Button>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="hero-metric rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur"
              >
                <p className="text-2xl font-bold md:text-3xl">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-product pointer-events-none relative hidden min-h-[540px] w-[430px] shrink-0 lg:block">
          <div className="absolute bottom-8 right-10 h-[500px] w-[240px] rounded-[44px] border border-white/20 bg-black/45 shadow-2xl shadow-blue-500/20 backdrop-blur" />
          <img
            src="/hero-phone.png"
            alt="Flagship smartphone"
            className="absolute bottom-0 right-0 h-[560px] max-w-none object-contain drop-shadow-2xl"
          />
          <div className="absolute bottom-16 left-0 rounded-3xl border border-white/10 bg-white/[0.08] px-6 py-5 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-wide text-blue-200">Featured</p>
            <p className="mt-1 text-2xl font-bold">NexGen Phone X</p>
          </div>
        </div>
      </div>
    </section>
  );
}
