import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Search, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background border-b border-border shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors">
          NEXGEN
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/deals" className="hover:text-primary transition-colors">Deals</Link>
          <Link href="/mobile" className="hover:text-primary transition-colors">Mobile</Link>
          <Link href="/tv" className="hover:text-primary transition-colors">TV & AV</Link>
          <Link href="/appliances" className="hover:text-primary transition-colors">Home Appliances</Link>
          <Link href="/monitors" className="hover:text-primary transition-colors">Monitors</Link>
          <Link href="/smart-things" className="hover:text-primary transition-colors">Smart Things</Link>
        </div>
        <div className="flex items-center space-x-6">
          <button className="hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
