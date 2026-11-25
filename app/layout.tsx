import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBottomBar } from "@/components/layout/mobile-bottom-bar";
import { RouteCurtain } from "@/components/layout/route-curtain";
import { PawTrailCanvas } from "@/components/layout/paw-trail-canvas";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PupLayer } from "@/components/mascot/pup-layer";
import "./globals.css";

const fraunces = localFont({ src: "./fonts/fraunces.woff2", variable: "--font-display", weight: "100 900", display: "swap" });
const figtree = localFont({ src: "./fonts/figtree.woff2", variable: "--font-sans", weight: "300 900", display: "swap" });
const shantellSans = localFont({ src: "./fonts/shantell-sans.woff2", variable: "--font-hand", weight: "300 800", display: "swap" });

export const metadata: Metadata = {
  title: { default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai", template: "%s | TeddyPups U.A.E." },
  description: "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  applicationName: "TeddyPups U.A.E.",
  metadataBase: new URL("https://puppy.instabizweb.com"),
  icons: {
    icon: "/brand/logo.png",
    shortcut: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: { title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai", description: "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.", images: ["/brand/logo.png"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${shantellSans.variable}`}>
      <body>
        <SmoothScroll />
        <RouteCurtain />
        <PawTrailCanvas />
        <PupLayer />
        <SiteHeader />
        {children}
        <MobileBottomBar />
        <SiteFooter />
      </body>
    </html>
  );
}
