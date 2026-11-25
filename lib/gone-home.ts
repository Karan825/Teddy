import rawGoneHome from "@/data/gone_home.json";

export interface GoneHomeTicket {
  href: string;
  image: string;
  alt: string;
  style: string;
  texts: string[];
}

export const goneHomeList: GoneHomeTicket[] = rawGoneHome as GoneHomeTicket[];

export function getAllGoneHome(): GoneHomeTicket[] {
  return goneHomeList;
}
