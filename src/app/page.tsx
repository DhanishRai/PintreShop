import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <div id="featured" className="relative z-10 bg-background pt-20">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold font-outfit tracking-tighter text-white mb-4">
              Featured <span className="text-primary italic">Collections</span>
            </h2>
            <p className="text-lg text-foreground/40 font-medium">
              Explore our hand-picked selection of trending items from across the web. Premium quality, expertly curated.
            </p>
          </div>
          <div className="flex items-center gap-4 text-foreground/40 font-bold uppercase tracking-widest text-xs">
            <span>Scroll to explore</span>
            <div className="w-12 h-[1px] bg-foreground/20" />
          </div>
        </div>
        
        <ProductGrid />
      </div>

      {/* Parallax Showcase Section */}
      <section id="trending" className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden my-32">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1920&auto=format&fit=crop')] bg-fixed bg-cover bg-center grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-8xl font-bold font-outfit tracking-tighter text-white mb-8">
            The Future of <span className="text-primary">Tech</span>
          </h2>
          <p className="text-lg md:text-2xl text-foreground/60 font-medium max-w-2xl mx-auto mb-12">
            Stay ahead of the curve with our selection of future-proof gadgets and smart home essentials.
          </p>
          <button className="group relative glass py-5 px-12 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="flex items-center gap-2">
              View the Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
