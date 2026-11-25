import type { Metadata } from "next";
import { getAllPuppies } from "@/lib/puppies";
import { PuppiesView } from "@/components/puppies/puppies-view";

export const metadata: Metadata = {
  title: "Available puppies",
  description: "Browse available teacup and miniature puppies in Dubai and available on request from trusted international breeders.",
};

export default function PuppiesPage() {
  const puppies = getAllPuppies();
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <PuppiesView initialPuppies={puppies} />
    </main>
  );
}
