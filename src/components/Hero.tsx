"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
    })
    .from(subHeadingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    }, "-=0.8")
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, "-=0.6")
    .to(".scroll-indicator", {
      y: 15,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={headingRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-outfit tracking-tighter leading-none text-gradient mb-8"
        >
          Discover <span className="text-primary italic">Trending</span> Products
        </h1>
        <p
          ref={subHeadingRef}
          className="text-lg md:text-2xl text-foreground/60 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A premium selection of hand-picked gadgets, tech, and lifestyle essentials. Curated for those who appreciate the extraordinary.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            ref={ctaRef}
            className="group relative bg-primary text-white font-bold py-5 px-10 rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(230,0,35,0.4)]"
          >
            Explore the Collection
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="text-foreground/70 hover:text-white font-semibold flex items-center gap-2 transition-colors">
            View Trending Picks
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 translate-x-[-50%] z-10 items-center flex flex-col gap-2 scroll-indicator">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40">Scroll</span>
        <ArrowDown className="text-foreground/30 w-5 h-5" />
      </div>
    </section>
  );
}
