import rawFamilies from "@/data/families.json";

export interface FamilyItem {
  image: string;
  alt: string;
  style?: string;
  aria_label?: string;
  texts?: string[];
}

export const families: FamilyItem[] = rawFamilies as FamilyItem[];

export function getAllFamilies(): FamilyItem[] {
  return families;
}
