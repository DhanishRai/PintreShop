"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductCard } from "./ProductCard";
import productsData from "@/data/products.json";

gsap.registerPlugin(ScrollTrigger);

export function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filteredProducts = activeCategory === "All" 
    ? productsData 
    : productsData.filter((p) => p.category === activeCategory);

  useGSAP(() => {
    // Initial entrance animation for the first load
    gsap.from(".product-card", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, [activeCategory]); // Re-run when category changes to animate new items

  return (
    <section 
      id="categories"
      ref={containerRef} 
      className="max-w-7xl mx-auto px-6 py-20 min-h-screen"
    >
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
              activeCategory === category
                ? "bg-primary text-white shadow-[0_0_20px_rgba(230,0,35,0.4)] scale-110"
                : "glass text-foreground/40 hover:text-white hover:scale-105"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card break-inside-avoid">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      
      {/* Load More Placeholder */}
      <div className="flex justify-center mt-32">
        <button className="group relative glass py-6 px-16 rounded-full font-bold uppercase tracking-[0.2em] text-sm overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
          <span className="relative z-10">Load More Trends</span>
          <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>
    </section>
  );
}
