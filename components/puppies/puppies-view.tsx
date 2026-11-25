"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { PuppyProfile } from "@/types/puppy";
import { PuppyCard } from "./puppy-card";
import { PupSvg } from "@/components/mascot/pup-svg";

interface PuppiesViewProps {
  initialPuppies: PuppyProfile[];
  initialFilter?: string;
}

export function PuppiesView({ initialPuppies, initialFilter = "all" }: PuppiesViewProps) {
  const [whereFilter, setWhereFilter] = useState<string>(
    initialFilter === "local" || initialFilter === "dubai"
      ? "dubai"
      : initialFilter === "imported"
      ? "imported"
      : "all"
  );
  const [breedFilter, setBreedFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  const filteredPuppies = useMemo(() => {
    return initialPuppies.filter((p) => {
      if (whereFilter === "dubai" && p.origin !== "dubai") return false;
      if (whereFilter === "imported" && p.origin !== "imported") return false;
      if (whereFilter === "teacup" && !p.breed.toLowerCase().includes("teacup") && !p.breed.toLowerCase().includes("korean")) return false;

      if (breedFilter !== "all" && !p.breed.toLowerCase().includes(breedFilter)) return false;

      if (genderFilter === "male" && p.gender !== "male") return false;
      if (genderFilter === "female" && p.gender !== "female") return false;

      return true;
    });
  }, [initialPuppies, whereFilter, breedFilter, genderFilter]);

  const goneHomeSample = initialPuppies.slice(-4);

  return (
    <div className="tp-page" data-page="pups">
      <section aria-labelledby="pups-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header with Teddy's sketchbook & circular self-portrait */}
          <div className="tp-sketchbook__head">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee-ink">
                from Teddy&apos;s sketchbook
              </p>
              <h1 className="font-plush text-giant tp-sketchbook__title" id="pups-title">
                Available puppies
                <svg
                  aria-hidden="true"
                  className="tp-sketchbook__underline"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 24"
                >
                  <path
                    d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1"
                    pathLength={1}
                  />
                </svg>
              </h1>
              <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft">
                Every listing shows real photos of the actual puppy. Open a profile to
                see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            <div className="tp-sketchbook__self">
              <div className="pup-buddy" data-facing="left">
                <PupSvg pose="sit" facing="left" />
              </div>
              <span className="font-scrawl text-sm text-cocoa-soft mt-2 block text-center">
                self-portrait
              </span>
            </div>
          </div>

          {/* Taped Filter Sketchpad */}
          <div
            aria-label="Filter puppies"
            className="tp-sketchpad flex flex-col gap-4 mt-10"
            role="region"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                where
              </span>
              {[
                { id: "all", label: "Everywhere" },
                { id: "dubai", label: "In Dubai" },
                { id: "imported", label: "Imported" },
                { id: "teacup", label: "Korean Teacup" },
              ].map((item) => (
                <button
                  key={item.id}
                  aria-pressed={whereFilter === item.id}
                  className="tp-sticker-chip"
                  type="button"
                  onClick={() => setWhereFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                breed
              </span>
              {[
                { id: "maltipoo", label: "Maltipoo" },
                { id: "pomeranian", label: "Pomeranian" },
                { id: "poodle", label: "Poodle" },
                { id: "cavapoo", label: "Cavapoo" },
                { id: "shih tzu", label: "Shih Tzu" },
              ].map((item) => (
                <button
                  key={item.id}
                  aria-pressed={breedFilter === item.id}
                  className="tp-sticker-chip"
                  type="button"
                  onClick={() => setBreedFilter(breedFilter === item.id ? "all" : item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">
                boy or girl
              </span>
              {[
                { id: "male", label: "Boys" },
                { id: "female", label: "Girls" },
              ].map((item) => (
                <button
                  key={item.id}
                  aria-pressed={genderFilter === item.id}
                  className="tp-sticker-chip"
                  type="button"
                  onClick={() => setGenderFilter(genderFilter === item.id ? "all" : item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <p aria-live="polite" className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]">
            {filteredPuppies.length} {filteredPuppies.length === 1 ? "puppy" : "puppies"} looking for a home
          </p>

          {/* Circular Sketchbook Puppies Grid */}
          {filteredPuppies.length === 0 ? (
            <div className="mt-10 rounded-3xl border-2 border-cocoa/20 bg-milk/80 p-12 text-center">
              <p className="font-plush text-2xl text-cocoa">No puppies match those filters</p>
              <button
                type="button"
                onClick={() => {
                  setWhereFilter("all");
                  setBreedFilter("all");
                  setGenderFilter("all");
                }}
                className="btn btn-primary mt-5"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <ul className="tp-sketches mt-8">
              {filteredPuppies.map((pup, idx) => (
                <li key={pup.slug}>
                  <PuppyCard index={idx} puppy={pup} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Already gone home strip */}
      <section aria-labelledby="gone-title" className="tp-gone-strip">
        <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center">
          <div className="md:w-1/3">
            <h2 className="font-plush text-big" id="gone-title">
              Already gone home
            </h2>
            <p className="mt-3 text-cocoa-soft">
              These puppies have found their families.
            </p>
            <Link className="btn btn-primary mt-6" href="/gone-home">
              See the puppies who&apos;ve gone home
            </Link>
          </div>

          <ul aria-label="Some puppies who have gone home" className="tp-gone-strip__row">
            {goneHomeSample.map((p, idx) => (
              <li key={p.slug}>
                <PuppyCard index={idx} puppy={p} small />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
