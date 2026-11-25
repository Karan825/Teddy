"use client";

import { useState, useMemo } from "react";
import { getAllFaq, type FaqItem } from "@/lib/faq";
import { PupSvg } from "@/components/mascot/pup-svg";

interface FaqViewProps {
  items?: FaqItem[];
}

const pinColors = ["var(--color-toffee)", "var(--color-sky-deep)", "#d9a13c", "var(--color-toffee-deep)"];
const noteTilts = ["-1.6deg", "1.2deg", "-0.8deg", "1.4deg", "-1.1deg", "0.9deg"];

export function FaqView({ items: providedItems }: FaqViewProps) {
  const items = useMemo(() => providedItems ?? getAllFaq(), [providedItems]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div className="tp-page" data-page="faq">
      <section
        aria-labelledby="faq-title"
        className="tp-scene tp-faqroom overflow-hidden"
        data-pup-scene="true"
        data-tone="dark"
        style={{
          ["--sky-top" as string]: "#a95e32",
          ["--sky-bottom" as string]: "#331c11",
        }}
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="max-w-4xl">
            <h1 className="font-plush text-giant" id="faq-title">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
              Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our
              team is available 24/7.
            </p>
          </header>

          <div className="mt-12 md:mt-16">
            <div className="tp-notes">
              {/* Left Sidebar: Sniff out a question + Teddy */}
              <aside aria-label="Find a question" className="tp-notes__side">
                <label className="font-scrawl tp-notes__label" htmlFor="faq-search">
                  sniff out a question
                </label>
                <div className="tp-notes__search">
                  <svg aria-hidden="true" className="tp-notes__lens" viewBox="0 0 24 24">
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="m15.5 15.5 5 5" />
                  </svg>
                  <input
                    id="faq-search"
                    type="search"
                    placeholder="delivery, Korea, vaccinated…"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <p aria-live="polite" className="tp-notes__count">
                  {filteredItems.length} {filteredItems.length === 1 ? "note" : "notes"} on the board
                </p>

                <div className="tp-notes__teddy">
                  <span aria-hidden="true" className="tp-notes__bubble font-plush">
                    <span className="tp-notes__q">?</span>
                    <span className="tp-notes__a">!</span>
                  </span>
                  <div className="pup-buddy" data-facing="right">
                    <PupSvg pose="sit" act="tilt" facing="right" />
                  </div>
                </div>
              </aside>

              {/* Right Board: Pinned Note Cards */}
              <div className="tp-notes__board">
                <ul className="tp-notes__list">
                  {filteredItems.map((item, idx) => {
                    const isOpen = openIndex === idx;
                    const qId = `q-faq-${idx}`;
                    const aId = `a-faq-${idx}`;

                    return (
                      <li
                        key={item.question}
                        className="tp-note"
                        data-armed="true"
                        data-reveal="true"
                        data-revealed="true"
                        data-unfolded={isOpen ? "true" : undefined}
                        style={{
                          ["--tilt" as string]: noteTilts[idx % noteTilts.length],
                          ["--pin" as string]: pinColors[idx % pinColors.length],
                          ["--i" as string]: idx,
                        }}
                      >
                        <span aria-hidden="true" className="tp-note__pin" />
                        <h2 className="tp-note__q">
                          <button
                            aria-controls={aId}
                            aria-expanded={isOpen}
                            id={qId}
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                          >
                            <span className="font-plush-text">{item.question}</span>
                            <span aria-hidden="true" className="tp-note__chevron" />
                          </button>
                        </h2>
                        <div
                          aria-labelledby={qId}
                          className="tp-note__answer"
                          id={aId}
                          inert={!isOpen}
                          role="region"
                        >
                          <div className="tp-note__flap">
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
