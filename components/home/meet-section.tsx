"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getAllPuppies } from "@/lib/puppies";

const doorColors = ["#a24a1a", "#5a3a28", "#d4893f", "#8e3f15", "#3d5a80", "#c2622b"];

export function MeetSection() {
  const allPuppies = getAllPuppies();
  const puppies = allPuppies.slice(0, 8);

  const sectionRef = useRef<HTMLElement>(null);
  const hallRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  const [sectionHeight, setSectionHeight] = useState<string>("280vh");
  const [isDesktopPinned, setIsDesktopPinned] = useState<boolean>(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pinned = vw >= 640;
      setIsDesktopPinned(pinned);

      if (!pinned || !trackRef.current) {
        setSectionHeight("auto");
        if (trackRef.current) trackRef.current.style.transform = "none";
        return;
      }

      const trackWidth = trackRef.current.scrollWidth;
      const maxScroll = Math.max(400, trackWidth - vw + vw * 0.08);
      setSectionHeight(`${vh + maxScroll}px`);
    };

    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current || !hallRef.current) return;
      const vw = window.innerWidth;
      if (vw < 640) return;

      const vh = window.innerHeight;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = Math.max(1, rect.height - vh);
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      const trackWidth = trackRef.current.scrollWidth;
      const maxScroll = Math.max(0, trackWidth - vw + vw * 0.08);
      const currentX = progress * maxScroll;

      trackRef.current.style.transform = `translate3d(${-currentX.toFixed(2)}px, 0px, 0px)`;
      hallRef.current.style.setProperty("--floor-x", `${-currentX.toFixed(2)}px`);

      // Open a door only when Teddy walks in front of it (~24vw) or has passed it; keep closed before reaching Teddy
      const doorEls = trackRef.current.querySelectorAll<HTMLElement>(".tp-door");
      const teddyCenter = vw * 0.24;
      doorEls.forEach((doorEl) => {
        const dRect = doorEl.getBoundingClientRect();
        const isOpen = dRect.left <= teddyCenter + dRect.width * 0.35;
        doorEl.dataset.open = isOpen ? "true" : "false";
        const way = doorEl.querySelector<HTMLElement>(".tp-door__way");
        if (way) {
          way.style.transform = isOpen ? "rotateY(-72deg)" : "";
        }
      });
    };

    const onScrollRaf = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    const initTimeout = setTimeout(() => {
      updateMetrics();
      handleScroll();
    }, 80);

    window.addEventListener("resize", updateMetrics, { passive: true });
    window.addEventListener("scroll", onScrollRaf, { passive: true });

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("scroll", onScrollRaf);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="meet-title"
      className="tp-scene tp-meet"
      data-here="false"
      data-pinned={isDesktopPinned ? "true" : undefined}
      data-pup-scene="true"
      data-tone="light"
      style={{
        height: sectionHeight,
        ["--sky-top" as string]: "#fff1d8",
        ["--sky-bottom" as string]: "#fbe3b4",
      }}
    >
      <div className="tp-meet__stage">
        <header className="tp-meet__head gutter">
          <div>
            <h2 className="font-plush text-huge" id="meet-title">
              Meet the pups
            </h2>
            <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>
          <Link className="btn btn-primary shrink-0" href="/puppies">
            See all available puppies
          </Link>
        </header>

        <div ref={hallRef} className="tp-meet__hall">
          <ol
            ref={trackRef}
            aria-label="Puppies looking for a family"
            className="tp-meet__track"
            data-treadmill="true"
          >
            {puppies.map((pup, idx) => {
              const mainImg = pup.media[0]?.src || "/brand/logo.png";
              const doorColor = doorColors[idx % doorColors.length];

              return (
                <li
                  key={pup.slug}
                  className="tp-door group"
                  data-open="false"
                >
                  <Link
                    className="tp-door__link"
                    href={`/puppies/${pup.slug}`}
                    style={{ ["--door" as string]: doorColor }}
                  >
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">{pup.name}</span>
                      <span className="tp-door__meta">
                        {pup.breed}, {pup.gender === "male" ? "boy" : "girl"}, {pup.age}
                      </span>
                    </span>

                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <Image
                          alt={pup.name}
                          src={mainImg}
                          fill
                          sizes="(min-width: 1024px) 15rem, 44vw"
                          className="object-cover"
                        />
                      </span>

                      {/* 3D door leaf */}
                      <span
                        aria-hidden="true"
                        className="tp-door__way"
                        style={{
                          transformOrigin: "left center",
                          transition: "transform 550ms cubic-bezier(.22, 1, .36, 1)",
                        }}
                      >
                        <span className="tp-door__leaf">
                          <svg
                            aria-hidden="true"
                            className="tp-door__peephole"
                            fill="currentColor"
                            viewBox="0 0 64 64"
                          >
                            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                          </svg>
                          <span className="tp-door__knob" />
                        </span>
                      </span>

                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* Final Door: See All Puppies */}
            <li className="tp-door tp-door--all">
              <Link className="tp-door__link" href="/puppies">
                <span className="tp-door__plate">
                  <span className="font-plush tp-door__name">All {allPuppies.length} pups</span>
                  <span className="tp-door__meta">Open the full showroom</span>
                </span>
                <span className="tp-door__frame tp-door__frame--all">
                  <span className="tp-door__all font-plush flex flex-col items-center justify-center h-full p-6 text-center text-cocoa">
                    <span className="text-3xl mb-2">🐾</span>
                    <span>See all puppies →</span>
                  </span>
                </span>
              </Link>
            </li>
          </ol>

          <div aria-hidden="true" className="tp-meet__floor" />

          {/* Mascot Stop 2 (Walking along the floor) */}
          <div
            className="pup-stop tp-meet__teddy"
            data-act="treadmill"
            data-facing="right"
            data-pose="walk"
            data-pup-stop="true"
          />
        </div>
      </div>
    </section>
  );
}
