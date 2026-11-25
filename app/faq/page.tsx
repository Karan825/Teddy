import type { Metadata } from "next";
import { FaqView } from "@/components/faq/faq-view";

export const metadata: Metadata = {
  title: "Questions & answers",
  description: "Find answers to frequently asked questions about adopting teacup and miniature puppies in Dubai, vaccinations, international transport, and visiting our showroom.",
};

export default function FaqPage() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <FaqView />
    </main>
  );
}
