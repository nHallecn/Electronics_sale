import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import tvImg from "@/assets/images/grid-tv.png";
import fridgeImg from "@/assets/images/grid-fridge.png";

const products = [
  {
    id: "mobile",
    title: "Mobile",
    description: "The next generation of Galaxy.",
    image: "https://placehold.co/600x600/1a1a2e/ffffff?text=Mobile",
  },
  {
    id: "tv",
    title: "TV & AV",
    description: "Cinematic immersion at home.",
    image: tvImg,
  },
  {
    id: "appliances",
    title: "Home Appliances",
    description: "Smart living, simplified.",
    image: fridgeImg,
  },
  {
    id: "monitors",
    title: "Monitors",
    description: "Ultra-wide gaming excellence.",
    image: "https://placehold.co/600x600/1a1a2e/ffffff?text=Monitor",
  },
];

export function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".product-card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      cards,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Spotlight</h2>
          <p className="text-muted-foreground text-lg">Explore our flagship categories</p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card group relative overflow-hidden rounded-2xl bg-card border border-border flex flex-col items-center p-8 hover-elevate transition-all duration-300"
            >
              <div className="relative w-full aspect-square mb-8 transition-transform duration-500 group-hover:scale-105">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x600/1a1a2e/ffffff?text=${product.title}`;
                  }}
                />
              </div>
              <div className="text-center w-full z-10">
                <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <button className="flex items-center justify-center space-x-2 text-primary hover:text-white transition-colors w-full group/btn">
                  <span className="font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
