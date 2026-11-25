"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { FamilyItem } from "@/lib/families";

interface FamiliesViewProps {
  families: FamilyItem[];
}

const tapeColors = ["#f6d79a", "#f9cdbf", "#cfe5f6", "#e9dcc4"];
const tapeClasses = [
  "tp-tape tp-tape--center",
  "tp-tape tp-tape--left",
  "tp-tape tp-tape--right",
  "tp-tape tp-tape--tl",
];
const tilts = ["-2.2deg", "1.6deg", "-0.9deg", "2.1deg", "-1.5deg", "1.1deg"];

export function FamiliesView({ families: items }: FamiliesViewProps) {
  const [selected, setSelected] = useState<FamilyItem | null>(null);

  return (
    <div className="tp-page" data-page="families">
      <section aria-labelledby="families-title" className="tp-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <div className="tp-memories__head">
            <div>
              <p className="font-scrawl text-lg text-toffee-ink">
                our wall of happy endings
              </p>
              <h1 className="font-plush text-giant tp-memories__title" id="families-title">
                Happy families
                <svg
                  aria-hidden="true"
                  className="tp-memories__heart"
                  viewBox="0 0 48 44"
                >
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>
              </h1>
              <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft">
                Nothing makes us happier than seeing our puppies in loving homes! Here
                are some beautiful moments shared by our amazing clients after welcoming
                their furry friends.
              </p>
              <p className="font-scrawl mt-5 text-lg text-toffee-ink">
                {items.length} moments and counting
              </p>
            </div>

            {/* Taped lined-paper testimonial note */}
            <figure className="tp-memories__note">
              <span
                aria-hidden="true"
                className="tp-tape tp-tape--center"
                style={{ ["--tape" as string]: "#cfe5f6" }}
              />
              <blockquote className="font-plush-text">
                &ldquo;TeddyPups truly made our dream a reality. They supported us at
                every step of the import journey. Our Maltipoo arrived healthy,
                cheerful, and absolutely perfect. Having 24/7 support throughout the
                process gave us complete peace of mind.&rdquo;
              </blockquote>
              <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
            </figure>
          </div>

          {/* 64 Taped Polaroids Wall */}
          <div className="mt-16 md:mt-20">
            <ul aria-label="Photos from TeddyPups families" className="tp-wall">
              {items.map((item, idx) => {
                const caption = item.texts?.[0] || "";
                return (
                  <li
                    key={item.image || idx}
                    className="tp-wall__item"
                    data-armed="true"
                    data-reveal="true"
                    data-revealed="true"
                    style={{ ["--d" as string]: `${(idx % 6) * 60}ms` }}
                  >
                    <button
                      aria-label={item.aria_label || `Open photo ${idx + 1} of ${items.length}`}
                      className="tp-wall__print"
                      type="button"
                      onClick={() => setSelected(item)}
                    >
                      <span
                        className="tp-polaroid"
                        style={{
                          ["--tilt" as string]: tilts[idx % tilts.length],
                          ["--tape" as string]: tapeColors[idx % tapeColors.length],
                          ["--i" as string]: idx,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className={tapeClasses[idx % tapeClasses.length]}
                        />
                        <span className="tp-polaroid__photo">
                          <Image
                            alt={item.alt || "A happy TeddyPups family with their new puppy"}
                            height={433}
                            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                            src={item.image}
                            style={{ width: "100%", height: "auto" }}
                            width={433}
                            priority={idx < 4}
                          />
                        </span>
                        <span className="tp-polaroid__caption font-scrawl">
                          {caption}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="tp-memories__foot">
              <Link className="btn btn-primary" href="/puppies">
                Meet available puppies
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                Visit &amp; contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/90 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-2xl bg-milk p-4 text-cocoa shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                alt={selected.alt || "Happy family photo"}
                src={selected.image}
                fill
                className="object-cover"
              />
            </div>
            {selected.texts?.[0] && (
              <p className="font-scrawl mt-3 text-center text-lg">{selected.texts[0]}</p>
            )}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="btn btn-ghost mt-3 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
