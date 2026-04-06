"use client";

import Image from "next/image";
import { ExternalLink, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  affiliateLink: string;
  aspectRatio: string;
}

export function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative glass-card p-4 h-full flex flex-col justify-between cursor-pointer rounded-[2rem] overflow-hidden mb-6">
      {/* Category Badge */}
      <div className="absolute top-6 left-6 z-10 px-4 py-1.5 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary drop-shadow-[0_0_10px_rgba(230,0,35,0.4)]">
          {product.category}
        </span>
      </div>

      {/* Heart Button */}
      <button
        className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isLiked ? "bg-primary text-white" : "glass text-foreground/40 hover:text-white"
        }`}
        onClick={() => setIsLiked(!isLiked)}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      </button>

      {/* Image Section */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[4/5] bg-secondary/50 border border-white/5">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay CTA */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-5 h-5" />
          </a>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="pt-6 px-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold font-outfit text-white group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <span className="text-primary font-bold text-lg">{product.price}</span>
        </div>
        <p className="text-foreground/40 text-sm font-medium line-clamp-2 leading-relaxed mb-6 group-hover:text-foreground/70 transition-colors">
          {product.description}
        </p>
        
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full relative flex items-center justify-center gap-2 py-4 glass border-white/10 rounded-2xl text-sm font-bold tracking-tight uppercase group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-300 active:scale-95"
        >
          View on Amazon
          <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
        </a>
      </div>
    </div>
  );
}
