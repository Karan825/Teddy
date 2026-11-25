import type { PuppyProfile } from "@/types/puppy";
import rawPuppies from "@/data/puppies.json";

export const puppies: PuppyProfile[] = rawPuppies as unknown as PuppyProfile[];

export function getAllPuppies(): PuppyProfile[] {
  return puppies;
}

export function getPuppyBySlug(slug: string): PuppyProfile | undefined {
  return puppies.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedPuppies(currentSlug: string, limit = 4): PuppyProfile[] {
  const current = getPuppyBySlug(currentSlug);
  const others = puppies.filter((p) => p.slug !== currentSlug && p.id !== currentSlug);
  if (!current) return others.slice(0, limit);
  // Match breed first if possible
  const sameBreed = others.filter((p) => p.breed === current.breed);
  const diffBreed = others.filter((p) => p.breed !== current.breed);
  return [...sameBreed, ...diffBreed].slice(0, limit);
}
