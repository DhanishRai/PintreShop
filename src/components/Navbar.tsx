"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ShoppingBag } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
         "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12",
         isScrolled ? "glass py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
            <ShoppingBag className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-outfit tracking-tight text-white group-hover:text-primary transition-colors">
            PintreShop
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Categories", "Trending", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-foreground/70 hover:text-white transition-colors font-medium text-sm tracking-wide uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-card border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-48 focus:w-64"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-foreground/40 group-focus-within:text-primary" />
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 glass border-t border-white/10 transition-all duration-500 overflow-hidden md:hidden",
          isMobileMenuOpen ? "max-h-64 py-6" : "max-h-0"
        )}
      >
        <div className="flex flex-col items-center space-y-4 px-6">
          {["Home", "Categories", "Trending", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-foreground/70 hover:text-white transition-colors font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="relative w-full sm:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-card border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-foreground/40" />
          </div>
        </div>
      </div>
    </nav>
  );
}
