import { ButtonLink } from "@/components/ui/button";

const whatsappHref = "https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project.";

export function MobileBottomBar() {
  return <aside className="tp-mobile-bar" aria-label="Quick contact actions"><ButtonLink href={whatsappHref} variant="primary" external>WhatsApp us</ButtonLink><ButtonLink href="tel:+971500000000" variant="secondary">Call</ButtonLink></aside>;
}
