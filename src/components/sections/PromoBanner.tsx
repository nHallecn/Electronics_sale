import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BadgePercent, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import featuredTvImg from "@/assets/images/kitpack.png";

gsap.registerPlugin(ScrollTrigger);

const perks = [
  {
    icon: Truck,
    title: "Free delivery",
    text: "On selected premium orders",
  },
  {
    icon: BadgePercent,
    title: "Bundle savings",
    text: "Save more when you upgrade together",
  },
  {
    icon: ShieldCheck,
    title: "Protected purchase",
    text: "Warranty support included",
  },
];

export function PromoBanner() {
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
        ".promo-copy > *",
        { y: 42, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      )
        .fromTo(
          ".promo-visual",
          { y: 70, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.55"
        )
        .fromTo(
          ".promo-perk",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=0.55"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050507] py-24 text-white md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.12),transparent_35%,rgba(236,72,153,0.08)_68%,transparent)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10">
        <div className="promo-copy max-w-2xl">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-blue-100">
            <Sparkles className="h-4 w-4 text-blue-300" />
            Limited-time upgrade event
          </div> */}

          <h2 className="mt-6 text-5xl font-bold leading-[0.98] tracking-normal md:text-7xl">
            Build your dream setup for less.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400 md:text-xl">
            Pair a flagship screen, phone, or smart appliance and unlock instant savings, delivery
            perks, and purchase protection in one checkout.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full px-5 py-2 text-sm">
              Shop the event
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/[0.04] px-5 py-2 text-sm text-white hover:bg-white/10"
            >
              View bundles
            </Button>
          </div>
        </div>

        <div className="promo-visual relative min-h-[500px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(14,165,233,0.16),transparent_38%,rgba(244,63,94,0.14))]" />

          <div className="relative flex h-[330px] items-center justify-center overflow-hidden rounded-[24px] bg-black/50">
            <img
              src={featuredTvImg}
              alt="Featured premium TV"
              className="h-full w-full object-cover opacity-80 transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
                Bundle offer
              </p>
              <p className="mt-1 text-4xl font-bold">
                Save up to <span className="text-blue-300">30%</span>
              </p>
            </div>
          </div>

          <div className="relative mt-5 grid gap-4 md:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="promo-perk rounded-[20px] border border-white/10 bg-black/35 p-5"
                >
                  <Icon className="h-6 w-6 text-blue-300" />
                  <h3 className="mt-4 text-lg font-bold">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{perk.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
