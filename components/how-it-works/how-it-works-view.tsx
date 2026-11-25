"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PupSvg } from "@/components/mascot/pup-svg";

const dubaiSteps = [
  {
    num: "Step 1",
    title: "Explore our puppies",
    text: "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.",
    tint: "#f2be6b33",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    num: "Step 2",
    title: "Choose your puppy",
    text: "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.",
    tint: "#f9cdbf55",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
      </svg>
    ),
  },
  {
    num: "Step 3",
    title: "Meet before you choose",
    text: "Spend time bonding before making your decision.",
    tint: "#bfddf555",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 64 64" fill="currentColor">
        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
      </svg>
    ),
  },
  {
    num: "Step 4",
    title: "Pick-up or delivery",
    text: "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.",
    tint: "#1f7a4d22",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
];

const importedSteps = [
  {
    num: "Step 1",
    title: "Choose your dream breed",
    text: "Explore our Korean teacup lineup or tell us your dream miniature breed on WhatsApp.",
    tint: "#f2be6b33",
    icon: dubaiSteps[0].icon,
  },
  {
    num: "Step 2",
    title: "Photos, videos & health file",
    text: "Receive unedited photos, live videos, and full vet certificates before reserving.",
    tint: "#f9cdbf55",
    icon: dubaiSteps[1].icon,
  },
  {
    num: "Step 3",
    title: "Customs & flight handling",
    text: "We manage export permits, vaccinations, microchipping, and flight nanny travel to Dubai.",
    tint: "#bfddf555",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16l20-8-8 14-3-6z" />
      </svg>
    ),
  },
  {
    num: "Step 4",
    title: "VIP airport welcome",
    text: "Meet your puppy at our Downtown Dubai lounge or enjoy white-glove doorstep delivery.",
    tint: "#1f7a4d22",
    icon: dubaiSteps[3].icon,
  },
];

export function HowItWorksView() {
  const [mode, setMode] = useState<"local" | "imported">("local");
  const activeSteps = mode === "local" ? dubaiSteps : importedSteps;

  const deliveryRef = useRef<HTMLElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePlane = () => {
      if (!deliveryRef.current || !flightPathRef.current || !planeRef.current) return;
      const rect = deliveryRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.15;
      const raw = (start - rect.top) / (start - end + rect.height * 0.35);
      const t = Math.max(0.08, Math.min(0.92, raw));

      const path = flightPathRef.current;
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
    <div className="tp-page" data-page="how">
      <section
        aria-labelledby="how-title"
        className="tp-scene"
        data-pup-scene="true"
        data-tone="light"
        style={{
          ["--sky-top" as string]: "#fffbf3",
          ["--sky-bottom" as string]: "#f6cc85",
        }}
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-8 md:grid-cols-12 md:items-end">
            <h1 className="font-plush text-giant md:col-span-7" id="how-title">
              How it works
            </h1>
            <p className="text-lede text-[var(--ink-soft)] md:col-span-5 md:pb-4">
              Whether you choose to visit us locally or order a premium breed from
              overseas, TeddyPups is here to make the experience unforgettable.
            </p>
          </header>

          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#two-ways">
              <span className="font-plush text-toffee">1</span> Two ways home
            </a>
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#promise">
              <span className="font-plush text-toffee">2</span> Our premium puppy promise
            </a>
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#delivery">
              <span className="font-plush text-toffee">3</span> Delivery &amp; collection
            </a>
            <a className="chip h-11 border-2 border-cocoa !bg-milk px-4 hover:!bg-honey-soft" href="#why">
              <span className="font-plush text-toffee">4</span> Why choose us
            </a>
          </nav>

          {/* 1. Two ways home */}
          <div id="two-ways">
            <section
              aria-labelledby="two-ways-title"
              className="tp-journeys"
              data-ready="true"
            >
              <div className="tp-journeys__top">
                <div>
                  <p className="font-scrawl tp-journeys__kicker">choose your way</p>
                  <h2 className="font-plush text-big" id="two-ways-title">
                    Two ways home
                  </h2>
                </div>

                <div className="tp-journeys__pick">
                  <div
                    aria-label="Ways to bring your puppy home"
                    className="tp-switch"
                    role="tablist"
                    style={{
                      ["--at" as string]: mode === "local" ? 0 : 1,
                      ["--n" as string]: 2,
                    }}
                  >
                    <span aria-hidden="true" className="tp-switch__thumb" />
                    <button
                      aria-selected={mode === "local"}
                      className="tp-switch__tab"
                      id="tab-local"
                      role="tab"
                      type="button"
                      onClick={() => setMode("local")}
                    >
                      <span className="font-plush tp-switch__label">In Dubai</span>
                      <span className="tp-switch__hint">meet in person</span>
                    </button>
                    <button
                      aria-selected={mode === "imported"}
                      className="tp-switch__tab"
                      id="tab-imported"
                      role="tab"
                      type="button"
                      onClick={() => setMode("imported")}
                    >
                      <span className="font-plush tp-switch__label">Imported</span>
                      <span className="tp-switch__hint">order upon request</span>
                    </button>
                  </div>

                  <div className="pup-buddy tp-journeys__teddy" data-facing="right">
                    <PupSvg pose="sit" facing="right" />
                  </div>
                </div>
              </div>

              <div className="tp-journey">
                <div className="tp-journey__head">
                  <div>
                    <h3 className="font-plush tp-journey__title">
                      {mode === "local"
                        ? "Meet your puppy in person"
                        : "Imported especially for you"}
                    </h3>
                    <p className="mt-4 text-cocoa-soft leading-relaxed">
                      {mode === "local"
                        ? "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks."
                        : "Through our Order Upon Request service we source rare Korean teacup and miniature breeds from certified ethical breeders and handle every flight, customs, and veterinary detail."}
                    </p>
                  </div>

                  {/* Postcard matching original .tp-postcard__sun + .tp-postcard__city + .tp-postcard__to--left */}
                  <div aria-hidden="true" className="tp-postcard">
                    <span className="tp-postcard__sun" />
                    <svg
                      aria-hidden="true"
                      className="tp-postcard__city"
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
                    <span className="font-scrawl tp-postcard__to tp-postcard__to--left">
                      {mode === "local" ? "Downtown Dubai" : "Seoul → Dubai"}
                    </span>
                  </div>
                </div>

                {/* 4 Steps Grid */}
                <ol className="tp-steps mt-12">
                  {activeSteps.map((step, i) => (
                    <li
                      key={step.title}
                      className="tp-step"
                      style={{
                        ["--i" as string]: i,
                        ["--tint" as string]: step.tint,
                      }}
                    >
                      <span className="tp-step__icon">{step.icon}</span>
                      <span className="font-scrawl tp-step__num">{step.num}</span>
                      <h4 className="font-plush tp-step__title">{step.title}</h4>
                      <p className="tp-step__text text-sm leading-relaxed">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>

          {/* 2. Our premium puppy promise */}
          <section className="mt-24" id="promise">
            <div className="tp-paper rounded-3xl border-[3px] border-cocoa bg-milk p-8 md:p-14 shadow-lg">
              <p className="font-scrawl text-lg text-toffee-ink">puppy passport</p>
              <h2 className="font-plush text-big mt-1">Our premium puppy promise</h2>

              <div className="mt-10 grid gap-8 md:grid-cols-3 text-center">
                <div className="flex flex-col items-center">
                  <span
                    className="tp-stamp tp-stamp--round"
                    style={{ ["--ink-stamp" as string]: "#a24a1a" }}
                  >
                    <span className="tp-stamp__title font-plush">Hand-selected breeders</span>
                  </span>
                  <p className="mt-4 text-sm text-cocoa-soft max-w-[28ch]">
                    We work only with breeders who uphold the highest ethical and health standards.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <span
                    className="tp-stamp tp-stamp--ticket"
                    style={{ ["--ink-stamp" as string]: "#1f6b45" }}
                  >
                    <span className="tp-stamp__title font-plush">Full transparency</span>
                  </span>
                  <p className="mt-4 text-sm text-cocoa-soft max-w-[28ch]">
                    Photos, videos, and health certificates are shared before your puppy travels.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <span
                    className="tp-stamp tp-stamp--oval"
                    style={{ ["--ink-stamp" as string]: "#5a3a28" }}
                  >
                    <span className="tp-stamp__title font-plush">Safe, stress-free delivery</span>
                  </span>
                  <p className="mt-4 text-sm text-cocoa-soft max-w-[28ch]">
                    We handle every detail of the import process so your puppy arrives happy and healthy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Delivery & collection */}
          <section ref={deliveryRef} className="mt-24 grid gap-12 lg:grid-cols-12 lg:items-center" id="delivery">
            <div className="lg:col-span-6">
              <h2 className="font-plush text-big">Delivery &amp; collection</h2>
              <p className="mt-3 text-cocoa-soft">
                From a same-day visit in Downtown Dubai to a flight from Korea, every puppy
                travels comfortably and arrives safely.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-plush text-lg font-bold">Take your puppy home the same day</h3>
                  <p className="mt-1 text-sm text-cocoa-soft">
                    Local puppies are available immediately — visit, fall in love, and go home together.
                  </p>
                </div>
                <div>
                  <h3 className="font-plush text-lg font-bold">Delivery within Dubai</h3>
                  <p className="mt-1 text-sm text-cocoa-soft">
                    Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.
                  </p>
                </div>
                <div>
                  <h3 className="font-plush text-lg font-bold">Safe international cargo</h3>
                  <p className="mt-1 text-sm text-cocoa-soft">
                    We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.
                  </p>
                </div>
                <div>
                  <h3 className="font-plush text-lg font-bold">Worldwide delivery</h3>
                  <p className="mt-1 text-sm text-cocoa-soft">
                    We safely deliver puppies to loving homes all around the world with trusted partners.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full max-w-xl mx-auto">
                <svg
                  aria-label="Flight route from Korea to Dubai"
                  className="w-full h-auto overflow-visible"
                  viewBox="0 0 660 280"
                >
                  <path
                    ref={flightPathRef}
                    className="tp-flight__route"
                    d="M40 230 C 170 40, 470 20, 620 155"
                  />
                  <circle className="tp-flight__dot" cx="40" cy="230" r="7" />
                  <circle className="tp-flight__dot" cx="620" cy="155" r="7" />
                  <text className="tp-flight__label" textAnchor="middle" x="40" y="264">
                    Korea
                  </text>
                  <text className="tp-flight__label" textAnchor="middle" x="620" y="190">
                    Dubai
                  </text>
                  <g ref={planeRef} transform="translate(260 112) rotate(-14)">
                    <g transform="translate(-63 -39) scale(0.5)">
                      <path className="tp-flight__wing" d="M28 60 L8 26 L34 26 L60 54 Z" />
                      <path
                        className="tp-flight__wing tp-flight__wing--far"
                        d="M108 112 L142 156 L172 156 L158 112 Z"
                      />
                      <path
                        className="tp-flight__body"
                        d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                      />
                      <path className="tp-flight__wing" d="M104 44 L138 2 L168 2 L154 44 Z" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </section>

          {/* 4. Why choose us */}
          <section className="mt-24 grid gap-10 lg:grid-cols-12" id="why">
            <div className="lg:col-span-5">
              <h2 className="font-plush text-big">Why choose us</h2>
              <p className="mt-4 text-cocoa-soft leading-relaxed">
                We&apos;re here to help you find a new family member. From the moment you
                visit our site to the joyful day your puppy arrives at your door, we&apos;re
                with you every step of the way.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/puppies">
                  Browse available puppies
                </Link>
                <Link className="btn btn-ghost" href="/contact">
                  Visit &amp; contact
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-cocoa/15 bg-milk/80 p-6">
                <h3 className="font-plush text-lg font-bold">International cargo</h3>
                <p className="mt-2 text-sm text-cocoa-soft">
                  We safely deliver puppies to loving homes all around the world. Our trusted
                  international cargo partners ensure your new furry friend travels comfortably.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-cocoa/15 bg-milk/80 p-6">
                <h3 className="font-plush text-lg font-bold">Support 24/7</h3>
                <p className="mt-2 text-sm text-cocoa-soft">
                  Our team is available 24/7 to answer your questions and assist you through
                  every step of the adoption process and beyond.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
