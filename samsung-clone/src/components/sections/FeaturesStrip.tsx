import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Monitor, Battery } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Camera,
    title: "Next-Gen AI Camera",
    description: "Capture the unseen with our advanced computational photography."
  },
  {
    icon: Monitor,
    title: "120Hz ProDisplay",
    description: "Ultra-smooth scrolling and gaming with adaptive refresh rates."
  },
  {
    icon: Battery,
    title: "All-Day Battery",
    description: "Intelligent power management that learns your usage patterns."
  }
];

export function FeaturesStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".feature-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      items,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="feature-item flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-lg max-w-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
