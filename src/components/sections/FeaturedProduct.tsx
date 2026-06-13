import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

import featuredTvImg from "@/assets/images/featured-tv.png";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProduct() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imgRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.fromTo(
      imgRef.current,
      { scale: 1.1, y: 50 },
      { scale: 1, y: 0, ease: "power2.out" }
    );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl2.fromTo(
      textRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );

    return () => {
      tl.kill();
      tl2.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="group relative min-h-[90vh] bg-[#0a0a0f] flex items-center overflow-hidden py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <img 
          ref={imgRef}
          src={featuredTvImg} 
          alt="Featured OLED TV" 
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1920x1080/0a0a0f/ffffff?text=Premium+OLED+TV";
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div ref={textRef} className="max-w-2xl space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide uppercase">
            New Arrival
          </div>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Infinite Contrast.<br />Absolute Beauty.
          </h2>
          <p className="text-sm leading-6 text-gray-400">
            The NexGen Neo-OLED 8K Series. Self-lit pixels create perfect black and infinite contrast, bringing out the darkest details in the brightest scenes.
          </p>
          <div className="pt-4 opacity-0 translate-y-4 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <Button size="lg" className="rounded-full bg-white px-5 py-2 text-sm text-black hover:bg-white/90">
              View
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
