import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import featuredTvImg from "@/assets/images/featured-tv.png";

const heroVideo =
  "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".hero-media",
          { scale: 1.08, opacity: 0.65 },
          { scale: 1, opacity: 1, duration: 1.7, ease: "power3.out" }
        )
        .fromTo(
          ".hero-copy > *",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out" },
          "-=1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-end justify-center overflow-hidden bg-black px-6 pb-16 pt-28 text-white md:items-center md:pb-0"
    >
      <div className="absolute inset-0">
        <img
          src={featuredTvImg}
          alt="Premium electronics campaign"
          className="hero-media absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="hero-media absolute inset-0 h-full w-full scale-105 object-cover opacity-70 mix-blend-screen"
          autoPlay
          muted
          loop
          playsInline
          poster={featuredTvImg}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/10 to-black/65" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />
      </div>

      <div className="hero-copy relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-5xl font-bold leading-[0.95] tracking-normal text-white md:text-7xl lg:text-8xl">
          Meet your next upgrade.
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/85 md:text-xl">
          Premium phones, TVs, laptops, and smart home tech selected for everyday brilliance.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="rounded-full bg-white px-8 py-6 text-base text-black hover:bg-white/90">
            Learn more
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white bg-transparent px-8 py-6 text-base text-white hover:bg-white/10"
          >
            Shop now
          </Button>
        </div>
      </div>
    </section>
  );
}
