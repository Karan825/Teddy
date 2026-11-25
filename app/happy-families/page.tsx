import type { Metadata } from "next";
import { getAllFamilies } from "@/lib/families";
import { FamiliesView } from "@/components/families/families-view";

export const metadata: Metadata = {
  title: "Happy families",
  description: "Browse 60+ real photos and testimonials of families across Dubai and the UAE who welcomed a Teddy puppy into their homes.",
};

export default function HappyFamiliesPage() {
  const families = getAllFamilies();

  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <FamiliesView families={families} />
    </main>
  );
}
