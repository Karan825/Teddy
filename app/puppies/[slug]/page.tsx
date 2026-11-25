import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPuppies, getPuppyBySlug, getRelatedPuppies } from "@/lib/puppies";
import { PuppyDetailView } from "@/components/puppies/puppy-detail-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const puppies = getAllPuppies();
  return puppies.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const puppy = getPuppyBySlug(slug);
  if (!puppy) return { title: "Puppy not found" };

  const photo = puppy.media[0]?.src || "/brand/logo.png";
  return {
    title: `${puppy.name} — ${puppy.breed}`,
    description: `Meet ${puppy.name}, a gorgeous ${puppy.breed} (${puppy.gender === "male" ? "boy" : "girl"}, ${puppy.age}) at TeddyPups U.A.E.`,
    openGraph: {
      title: `${puppy.name} — ${puppy.breed} | TeddyPups U.A.E.`,
      description: puppy.description,
      images: [photo],
    },
  };
}

export default async function PuppyDetailPage({ params }: Props) {
  const { slug } = await params;
  const puppy = getPuppyBySlug(slug);

  if (!puppy) {
    notFound();
  }

  const related = getRelatedPuppies(slug, 4);

  return (
    <main id="main-content" className="site-main" tabIndex={-1}>
      <PuppyDetailView puppy={puppy} relatedPuppies={related} />
    </main>
  );
}
