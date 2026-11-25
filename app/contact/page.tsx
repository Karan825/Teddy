import type { Metadata } from "next";
import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Visit & contact",
  description: "Schedule a showroom appointment in Downtown Dubai, speak with our puppy concierge team, or post an inquiry letter.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <ContactView />
    </main>
  );
}
