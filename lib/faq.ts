export interface FaqItem {
  question: string;
  answer: string;
}

export const faqList: FaqItem[] = [
  {
    question: "Are your puppies vaccinated and health-checked?",
    answer: "Yes, every puppy undergoes comprehensive veterinary examinations, is microchipped, dewormed, and receives age-appropriate core vaccinations with full documentation before joining your family."
  },
  {
    question: "Can I meet a puppy before I decide?",
    answer: "Absolutely. We welcome families to our boutique puppy lounge in Downtown Dubai by appointment, where you can spend quality time bonding with our puppies in a comfortable, hygienic setting."
  },
  {
    question: "Can I take my puppy home the same day?",
    answer: "For puppies currently residing at our Dubai lounge who have passed their final veterinary checks, same-day take-home is available once adoption paperwork and guidance are complete."
  },
  {
    question: "Do you import puppies from abroad?",
    answer: "Yes, we collaborate exclusively with certified, ethical, world-class breeders in South Korea and Europe specializing in tiny teacup and miniature breeds with exceptional pedigree lines."
  },
  {
    question: "How does an imported puppy travel to Dubai?",
    answer: "Our imported puppies travel in temperature-controlled, pressurized cabins accompanied by experienced flight nannies, adhering strictly to IATA live animal regulations and UAE MOCCAE import protocols."
  },
  {
    question: "Will I see photos and health details first?",
    answer: "Yes! We share high-definition 4K video clips, close-up photos, parent pedigrees, and complete veterinary health certificates before you commit to any puppy reservation."
  },
  {
    question: "Do you deliver?",
    answer: "Yes, we provide VIP door-to-door delivery across all seven Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ) in specialized climate-controlled vehicles."
  },
  {
    question: "Which breeds do you usually have?",
    answer: "We specialize in miniature and teacup breeds including Korean Teacup Maltipoos, Toy Poodles, Teacup Pomeranians, Cavapoos, Maltese, and Shih Tzus."
  }
];

export function getAllFaq(): FaqItem[] {
  return faqList;
}
