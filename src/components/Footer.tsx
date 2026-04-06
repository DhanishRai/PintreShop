"use client";

import Link from "next/link";
import { ShoppingBag, Instagram, Pin as Pinterest, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-black pt-32 pb-16 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center space-x-3 mb-8 group">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 duration-500 shadow-[0_0_15px_rgba(230,0,35,0.3)]">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <span className="text-3xl font-bold font-outfit tracking-tighter text-white">
              PintreShop
            </span>
          </Link>
          <p className="text-lg text-foreground/40 max-w-sm mb-10 leading-relaxed font-medium">
            The ultimate destination for premium product discovery. Curating the finest trends to elevate your lifestyle.
          </p>
          <div className="flex items-center space-x-6">
            {[Pinterest, Instagram, Twitter, Facebook].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-primary hover:scale-110 hover:border-primary/20 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold font-outfit text-xl mb-8 tracking-tight">Explore</h4>
          <ul className="space-y-4">
            {["Home", "Categories", "Trending", "About Us", "Contact"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-foreground/40 hover:text-white transition-colors duration-300 font-medium"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Info */}
        <div>
          <h4 className="text-white font-bold font-outfit text-xl mb-8 tracking-tight">Support</h4>
          <ul className="space-y-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Affiliate Disclosure"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-foreground/40 hover:text-white transition-colors duration-300 font-medium"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto mt-32 p-12 glass rounded-[3rem] border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-lg text-center lg:text-left">
            <h3 className="text-4xl md:text-5xl font-bold font-outfit tracking-tighter text-white mb-4">
              Get the Best <span className="text-primary italic">Deals</span> First
            </h3>
            <p className="text-foreground/40 text-lg font-medium">
              Join 10,000+ shoppers and never miss a trending product again.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-full py-5 px-8 focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-white transition-all"
            />
            <button className="w-full sm:w-auto bg-primary text-white font-bold py-5 px-12 rounded-full uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(230,0,35,0.3)]">
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-foreground/20 text-sm font-medium">
          &copy; {new Date().getFullYear()} PintreShop. All rights reserved.
        </p>
        <p className="text-foreground/20 text-xs font-medium max-w-sm text-center md:text-right uppercase tracking-widest leading-relaxed">
          Affiliate Disclosure: As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.
        </p>
      </div>
    </footer>
  );
}
