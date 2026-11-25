import Image from "next/image";
import Link from "next/link";

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="tp-scene tp-home"
      data-here="false"
      data-pup-scene="true"
      data-tone="dark"
      data-visited="false"
      style={{
        ["--sky-top" as string]: "#2f1a10",
        ["--sky-bottom" as string]: "#24130b",
      }}
    >
      <div className="tp-home__copy gutter">
        <h2 className="font-plush text-huge" id="cta-title">
          Ready to meet your new best friend?
        </h2>
        <p className="tp-home__lede">
          Bring home a healthy, happy teacup or designer puppy with expert guidance
          every step of the way. We help you find the right match and ensure a smooth,
          safe delivery across the UAE.
        </p>
      </div>

      {/* Cozy House with open door */}
      <div className="tp-house">
        <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
        <span aria-hidden="true" className="tp-house__lamp" />
        <div className="tp-house__doorway">
          <span className="tp-house__inside">
            <Image
              alt="Max, waiting inside"
              src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
              fill
              sizes="16rem"
              style={{ objectFit: "cover", objectPosition: "53.8% 44.3%" }}
            />
          </span>
          <span aria-hidden="true" className="tp-house__door">
            <span className="tp-house__peep" />
            <span className="tp-house__knob" />
          </span>
        </div>
        <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />
        <span aria-hidden="true" className="tp-house__mat font-scrawl">
          welcome home
        </span>

        {/* Mascot Stop 8 (Bow) */}
        <div
          className="pup-stop tp-house__teddy"
          data-facing="right"
          data-pose="bow"
          data-pup-stop="true"
        />
      </div>

      <div className="tp-home__actions gutter">
        <a
          className="btn btn-whatsapp"
          href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
          rel="noopener noreferrer"
          target="_blank"
        >
          Enquire on WhatsApp
        </a>
        <Link className="btn btn-ghost tp-home__ghost" href="/contact">
          Visit &amp; contact
        </Link>
      </div>
    </section>
  );
}
