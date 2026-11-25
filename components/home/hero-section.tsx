import Image from "next/image";
import Link from "next/link";

const lineupPuppies = [
  {
    name: "Maltipoo",
    slug: "maltipoo-female",
    image: "/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg",
    alt: "Female Maltipoo puppy",
    x: "9%",
    w: "8.6rem",
    tilt: "-5deg",
    peek: "0.62",
    i: 0,
    objPos: "56.9% 49.2%",
  },
  {
    name: "Shih Tzu",
    slug: "shitzu-female",
    image: "/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg",
    alt: "Female Shih Tzu puppy",
    x: "22.5%",
    w: "10.4rem",
    tilt: "3deg",
    peek: "0.8",
    i: 1,
    objPos: "50% 45%",
  },
  {
    name: "Pomeranian",
    slug: "pomeranian-female",
    image: "/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg",
    alt: "Female Pomeranian puppy",
    x: "35%",
    w: "9.2rem",
    tilt: "-2deg",
    peek: "0.7",
    i: 2,
    objPos: "50% 45%",
  },
  {
    name: "Maltipoo & Cavapoo",
    slug: "maltipoo-cavapoo-male",
    image: "/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg",
    alt: "Male Maltipoo & Cavapoo puppy",
    x: "65%",
    w: "9.4rem",
    tilt: "3deg",
    peek: "0.74",
    i: 3,
    objPos: "50% 45%",
  },
  {
    name: "Toy Poodle",
    slug: "toy-poodle-male-female",
    image: "/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg",
    alt: "Toy Poodle puppy",
    x: "77.5%",
    w: "10.6rem",
    tilt: "-3deg",
    peek: "0.82",
    i: 4,
    objPos: "50% 45%",
  },
  {
    name: "Maltipoo",
    slug: "maltipoo-female-2",
    image: "/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg",
    alt: "Female Maltipoo puppy",
    x: "91%",
    w: "8.4rem",
    tilt: "4deg",
    peek: "0.6",
    i: 5,
    objPos: "50% 45%",
  },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="tp-scene tp-hero"
      data-here="true"
      data-pup-scene="true"
      data-tone="light"
      style={{
        ["--sky-top" as string]: "#fffdf8",
        ["--sky-bottom" as string]: "#fff1d8",
        ["--quilt" as string]: "#fff1d8",
      }}
    >
      <span aria-hidden="true" className="tp-hero__sun" />
      <div className="tp-hero__copy gutter">
        <p className="tp-hero__note font-scrawl">
          every puppy is family
          <svg
            aria-hidden="true"
            className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
            preserveAspectRatio="none"
            viewBox="0 0 220 24"
          >
            <path
              d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        </p>
        <h1 className="tp-hero__title font-plush" id="hero-title">
          <span className="tp-hero__line">Premium teacup</span>
          <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
        </h1>
        <p className="tp-hero__lede">
          Meet your new best friend in our Dubai showroom, or order a rare miniature
          breed from trusted breeders worldwide.
        </p>
        <div className="tp-hero__actions">
          <Link className="btn btn-primary" href="/puppies">
            View available puppies
          </Link>
          <a
            className="btn btn-ghost"
            href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
            rel="noopener noreferrer"
            target="_blank"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      <div className="tp-hero__stage">
        <ul aria-label="Some of the puppies in our showroom" className="tp-lineup">
          {lineupPuppies.map((p) => (
            <li
              key={p.slug}
              className="tp-lineup__seat"
              style={{
                ["--x" as string]: p.x,
                ["--w" as string]: p.w,
                ["--peek" as string]: p.peek,
                ["--tilt" as string]: p.tilt,
                ["--i" as string]: p.i,
              }}
            >
              <Link
                aria-label={`Meet ${p.name}`}
                className="tp-lineup__pup"
                data-pup-friend="true"
                href={`/puppies/${p.slug}`}
              >
                <span className="tp-lineup__photo">
                  <Image
                    alt={p.alt}
                    src={p.image}
                    fill
                    sizes="11rem"
                    style={{ objectFit: "cover", objectPosition: p.objPos }}
                    priority={p.i < 2}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
          {lineupPuppies.map((p) => (
            <li
              key={`${p.slug}-tag`}
              className="tp-lineup__seat"
              style={{
                ["--x" as string]: p.x,
                ["--w" as string]: p.w,
                ["--peek" as string]: p.peek,
                ["--tilt" as string]: p.tilt,
                ["--i" as string]: p.i,
              }}
            >
              <span className="tp-lineup__ghost">
                <span className="tp-lineup__name font-scrawl">{p.name}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Mascot Stop 1 (Peekaboo behind quilt) */}
        <div
          className="pup-stop tp-hero__teddy"
          data-act="peekaboo"
          data-behind="true"
          data-facing="right"
          data-lane="true"
          data-pose="peek"
          data-pup-stop="true"
        />

        {/* Quilted stitched scalloped edge */}
        <div aria-hidden="true" className="tp-quilt">
          <svg
            className="tp-quilt__edge"
            width="100%"
            height="40"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="tp-scallop"
                width="76"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
                <path
                  d="M0 27A38 25 0 0 1 76 27"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="3"
                />
                <path
                  d="M11 33A27 19 0 0 1 65 33"
                  fill="none"
                  stroke="#2a170e"
                  strokeWidth="1.6"
                  strokeDasharray="3.5 5.5"
                  strokeLinecap="round"
                  opacity=".42"
                />
              </pattern>
            </defs>
            <rect width="100%" height="40" fill="url(#tp-scallop)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
