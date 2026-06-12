import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LatestProducts } from "@/components/sections/LatestProducts";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ThreeFeature } from "@/components/sections/ThreeFeature";
import { FeaturedProduct } from "@/components/sections/FeaturedProduct";
import { FeaturesStrip } from "@/components/sections/FeaturesStrip";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Footer } from "@/components/sections/Footer";

const queryClient = new QueryClient();

function Home() {
  return (
    <main className="w-full bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <LatestProducts />
      <ProductGrid />
      <ThreeFeature />
      <FeaturedProduct />
      <FeaturesStrip />
      <PromoBanner />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
