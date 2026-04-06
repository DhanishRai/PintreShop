import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "PintreShop | Discover Trending Products",
  description: "Your destination for high-end, trending products with direct Amazon affiliate links. Clean, minimal, and premium product discovery.",
  keywords: ["affiliate marketing", "amazon find", "trending products", "pinterest shop", "premium gadgets"],
  openGraph: {
    title: "PintreShop | Trending Products",
    description: "Discover the best products curated for you.",
    images: ["/og-image.png"],
  },
  other: {
    "p:domain_verify": "YOUR_PINTEREST_CODE_HERE", // Replace with your actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
