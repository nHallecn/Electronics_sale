import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";


export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (textRef.current && imgRef.current) {
      tl.fromTo(
        textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      ).fromTo(
        imgRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
        "-=0.8"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black pt-20"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <div ref={textRef} className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Designed to <span className="text-primary">Amaze.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            Experience the future in the palm of your hand. The all-new NexGen flagship redefines what's possible with a seamless design and uncompromised performance.
          </p>
          <div className="pt-4">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full">
              Explore Now
            </Button>
          </div>
        </div>
        <div className="relative">
          {/* We will handle missing image gracefully in case it hasn't finished generating */}
          <div className="relative z-10 flex justify-center">
            <img 
              ref={imgRef}
              src="/hero-phone.png"
              alt="NexGen Flagship Smartphone" 
              className="max-w-full h-auto object-contain max-h-[70vh] drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/800x1200/1a1a2e/ffffff?text=Hero+Phone";
              }}
            />
          </div>
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
