import type { Metadata } from "next";
import { GoneHomeView } from "@/components/gone-home/gone-home-view";

export const metadata: Metadata = {
  title: "Gone home",
  description: "Celebration of all the precious puppies who found their forever families across Dubai and the UAE with TeddyPups.",
};

export default function GoneHomePage() {
  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <GoneHomeView />
    </main>
  );
}
