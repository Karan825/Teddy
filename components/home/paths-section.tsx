"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function PathsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePlane = () => {
      if (!sectionRef.current || !pathRef.current || !planeRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.15;
      const raw = (start - rect.top) / (start - end + rect.height * 0.35);
      const t = Math.max(0.05, Math.min(0.95, raw));

      const path = pathRef.current;
      const total = path.getTotalLength();
      const len = t * total;
      const pt = path.getPointAtLength(len);
      const ptNext = path.getPointAtLength(Math.min(total, len + 4));
      const ptPrev = path.getPointAtLength(Math.max(0, len - 4));
      const angle = (Math.atan2(ptNext.y - ptPrev.y, ptNext.x - ptPrev.x) * 180) / Math.PI;

      planeRef.current.setAttribute(
        "transform",
        `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
      );
    };

    const onScrollRaf = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePlane);
    };

    const init = setTimeout(updatePlane, 60);
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onScrollRaf, { passive: true });
    return () => {
      clearTimeout(init);
      window.removeEventListener("scroll", onScrollRaf);
      window.removeEventListener("resize", onScrollRaf);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="paths-title"
      className="tp-scene tp-paths"
      data-here="false"
      data-pup-scene="true"
      data-tone="light"
      data-visited="false"
      style={{
        ["--sky-top" as string]: "#fbe3b4",
        ["--sky-bottom" as string]: "#f7d18d",
      }}
    >
      <div className="gutter mx-auto max-w-[110rem]">
        <h2 className="tp-paths__title font-plush text-huge" id="paths-title">
          Two ways to meet your puppy
        </h2>

        <div className="tp-fork">
          <div aria-hidden="true" className="tp-fork__post" />

          {/* Left Way: Local Dubai Showroom */}
          <article aria-labelledby="way-local" className="tp-way tp-way--left">
            <h3 className="tp-sign tp-sign--left font-plush" id="way-local">
              Puppies in Dubai
            </h3>
            <div className="tp-way__scene" data-pup-look="true">
              <svg
                aria-hidden="true"
                className="tp-way__skyline"
                viewBox="0 0 300 120"
              >
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.6"
                />
              </svg>

              <figure className="tp-window">
                <span className="tp-window__glass">
                  <Image
                    alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                    src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                    fill
                    sizes="(min-width: 1024px) 16rem, 60vw"
                    style={{ objectFit: "cover", objectPosition: "54.3% 48.3%" }}
                  />
                </span>
                <figcaption className="font-scrawl">In our showroom</figcaption>
              </figure>
            </div>

            <p className="tp-way__text">
              See them, love them, take them home. Come meet our locally available
              puppies before you decide.
            </p>
            <Link className="btn btn-primary" href="/puppies?origin=local">
              Meet local puppies
            </Link>
          </article>

          {/* Right Way: Imported Korea to Dubai Flight */}
          <article aria-labelledby="way-imported" className="tp-way tp-way--right">
            <h3 className="tp-sign tp-sign--right font-plush" id="way-imported">
              Imported for you
            </h3>
            <div className="tp-way__scene" data-pup-look="true">
              <div className="tp-flight">
                <svg
                  aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai"
                  role="img"
                  viewBox="0 0 660 300"
                >
                  <defs>
                    <clipPath id="tp-flight-porthole-clip">
                      <circle r="25" />
                    </clipPath>
                  </defs>
                  <path
                    ref={pathRef}
                    className="tp-flight__route"
                    d="M40 250 C 170 40, 470 20, 620 168"
                  />
                  <circle className="tp-flight__dot" cx="40" cy="250" r="7" />
                  <circle className="tp-flight__dot" cx="620" cy="168" r="7" />
                  <text className="tp-flight__label" textAnchor="middle" x="40" y="284">
                    Korea
                  </text>
                  <text className="tp-flight__label" textAnchor="middle" x="620" y="202">
                    Dubai
                  </text>

                  <g
                    ref={planeRef}
                    style={{ opacity: 1 }}
                    transform="translate(40.0 250.0) rotate(-58.1)"
                  >
                    <g transform="translate(-126 -78)">
                      <path className="tp-flight__wing" d="M28 60 L8 26 L34 26 L60 54 Z" />
                      <path
                        className="tp-flight__wing tp-flight__wing--far"
                        d="M108 112 L142 156 L172 156 L158 112 Z"
                      />
                      <path
                        className="tp-flight__body"
                        d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                      />
                      <path
                        className="tp-flight__wing"
                        d="M104 44 L138 2 L168 2 L154 44 Z"
                      />
                      <path
                        className="tp-flight__line"
                        d="M206 64 C215 67 221 73 224 80"
                      />
                    </g>
                    <g transform="translate(10 2)">
                      <image
                        clipPath="url(#tp-flight-porthole-clip)"
                        height="50"
                        href="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                        preserveAspectRatio="xMidYMid slice"
                        width="50"
                        x="-25"
                        y="-25"
                      />
                      <circle className="tp-flight__porthole" r="25" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <p className="tp-way__text">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s
              most reputable breeders and let us handle the import.
            </p>
            <Link className="btn btn-primary" href="/puppies?origin=imported">
              See imported puppies
            </Link>
          </article>

          {/* Mascot Stop 3 (Sitting at base of wooden signpost) */}
          <div
            className="pup-stop tp-fork__teddy"
            data-facing="right"
            data-pose="sit"
            data-pup-stop="true"
          />
        </div>
      </div>
    </section>
  );
}
