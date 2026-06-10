import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-[#0f172a] to-black">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Introducing</span>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Galaxy AI is here.
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl">
            Welcome to the era of mobile AI. Empower your creativity, productivity, and possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8 w-full sm:w-auto">
            <Button size="lg" className="px-10 py-7 rounded-full text-lg w-full sm:w-auto">
              Pre-order Now
            </Button>
            <Button size="lg" variant="outline" className="px-10 py-7 rounded-full text-lg bg-transparent border-white/20 hover:bg-white/10 w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
