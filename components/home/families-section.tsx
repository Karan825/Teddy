"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getAllFamilies } from "@/lib/families";

const tapeColors = ["#f6d79a", "#f9cdbf", "#cfe5f6", "#f6d79a", "#e9dcc4", "#f6d79a", "#f9cdbf", "#cfe5f6"];
const tapeClasses = [
  "tp-tape tp-tape--center",
  "tp-tape tp-tape--left",
  "tp-tape tp-tape--right",
  "tp-tape tp-tape--tl",
  "tp-tape tp-tape--center",
  "tp-tape tp-tape--right",
  "tp-tape tp-tape--left",
  "tp-tape tp-tape--center",
];
const tilts = ["-2.2deg", "1.6deg", "-0.9deg", "2.4deg", "-1.5deg", "0.8deg", "-2.6deg", "1.2deg"];

export function FamiliesSection() {
  const families = getAllFamilies().slice(0, 8);
  const [activePhoto, setActivePhoto] = useState<(typeof families)[0] | null>(null);

  return (
    <section
      aria-labelledby="dusk-title"
      className="tp-scene tp-dusk"
      data-here="false"
      data-pup-scene="true"
      data-tone="dark"
      data-visited="false"
      style={{
        ["--sky-top" as string]: "#a65a30",
        ["--sky-bottom" as string]: "#4d2b19",
      }}
    >
      <div className="tp-dusk__sky gutter">
        <div className="tp-dusk__head">
          <h2 className="font-plush text-huge" id="dusk-title">
            Happy families &amp; puppies
          </h2>
          <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
            We are truly honored to see our puppies become cherished members of loving
            families. These heartwarming moments have been shared by our valued clients
            who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>

        <figure className="tp-dusk__note">
          <blockquote className="font-plush-text">
            &ldquo;TeddyPups truly made our dream a reality. They supported us at every
            step of the import journey. Our Maltipoo arrived healthy, cheerful, and
            absolutely perfect. Having 24/7 support throughout the process gave us
            complete peace of mind.&rdquo;
          </blockquote>
          <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
        </figure>
      </div>

      <div className="tp-photowall">
        <div className="tp-photowall__wall">
          <ul aria-label="Photos from TeddyPups families" className="tp-photowall__prints">
            {families.map((fam, idx) => {
              const caption = fam.texts?.[0] || fam.alt || "Happy TeddyPups family";
              return (
              <li
                key={fam.image || idx}
                data-armed="true"
                data-pup-look={idx === 1 || idx === 4 ? "true" : undefined}
                data-reveal="true"
                data-revealed="true"
                style={{ ["--d" as string]: `${(idx * 110) % 800}ms` }}
              >
                <button
                  aria-label={fam.aria_label || `Open photo ${idx + 1} of 64: ${caption}`}
                  className="tp-photowall__print"
                  type="button"
                  onClick={() => setActivePhoto(fam)}
                >
                  <span
                    className="tp-polaroid"
                    style={{
                      ["--tilt" as string]: tilts[idx % tilts.length],
                      ["--tape" as string]: tapeColors[idx % tapeColors.length],
                      ["--i" as string]: idx,
                    }}
                  >
                    <span aria-hidden="true" className={tapeClasses[idx % tapeClasses.length]} />
                    <span className="tp-polaroid__photo">
                      <Image
                        alt={fam.alt || "A happy TeddyPups family with their new puppy"}
                        src={fam.image}
                        width={433}
                        height={433}
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 42vw"
                        style={{ width: "100%", height: "auto" }}
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

          <div className="tp-facade__ground">
            <span aria-hidden="true" className="tp-facade__door" />
            <span aria-hidden="true" className="tp-lamp">
              <span className="tp-lamp__light" />
            </span>
            <Link className="btn btn-primary tp-facade__cta" href="/happy-families">
              See every happy family
            </Link>

            {/* Mascot Stop 6 */}
            <div
              className="pup-stop tp-dusk__teddy"
              data-facing="right"
              data-pose="sit"
              data-pup-stop="true"
            />
          </div>
        </div>

        <div aria-hidden="true" className="tp-street__pavement" />
      </div>

      {/* Photo Lightbox */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/90 p-4 backdrop-blur-sm"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-2xl bg-milk p-4 text-cocoa shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                alt={activePhoto.alt || "Happy TeddyPups family"}
                src={activePhoto.image}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-scrawl mt-3 text-center text-lg">
              {activePhoto.texts?.[0] || activePhoto.alt}
            </p>
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="btn btn-ghost mt-3 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
