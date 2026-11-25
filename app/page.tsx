import { HeroSection } from "@/components/home/hero-section";
import { MeetSection } from "@/components/home/meet-section";
import { PathsSection } from "@/components/home/paths-section";
import { ChatSection } from "@/components/home/chat-section";
import { TrustSection } from "@/components/home/trust-section";
import { FamiliesSection } from "@/components/home/families-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <HeroSection />
      <MeetSection />
      <PathsSection />
      <ChatSection />
      <TrustSection />
      <FamiliesSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
