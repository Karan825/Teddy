export type PuppyGender = "male" | "female";
export type PuppyAvailability = "available" | "reserved" | "gone-home";
export type PuppyOrigin = "dubai" | "imported";

export interface PuppyMedia { src: string; alt: string; kind: "image" | "video"; poster?: string; }
export interface PuppyProfile { id: string; slug: string; name: string; breed: string; gender: PuppyGender; age: string; availability: PuppyAvailability; origin: PuppyOrigin; locationLabel: string; color?: string; weight?: string; microchip?: string; description?: string; media: readonly PuppyMedia[]; }
export interface PuppyFilter { id: string; label: string; breed?: string; origin?: PuppyOrigin; }
