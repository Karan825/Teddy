import type { Metadata } from "next";
import { HowItWorksView } from "@/components/how-it-works/how-it-works-view";

export const metadata: Metadata = {
  title: "How it works",
  description: "Learn how adoption works at TeddyPups U.A.E. — from meeting puppies in person in Downtown Dubai to ordering bespoke imports from ethical breeders abroad.",
};

export default function HowItWorksPage() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <HowItWorksView />
    </main>
  );
}
