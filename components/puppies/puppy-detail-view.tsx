"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { getAllPuppies } from "@/lib/puppies";
import type { PuppyProfile } from "@/types/puppy";
import { PupSvg } from "@/components/mascot/pup-svg";

interface PuppyDetailViewProps {
  puppy: PuppyProfile;
  relatedPuppies?: PuppyProfile[];
}

export function PuppyDetailView({ puppy }: PuppyDetailViewProps) {
  const allPuppies = getAllPuppies();
  const currentIdx = allPuppies.findIndex((p) => p.slug === puppy.slug);
  const prevPup =
    allPuppies[(currentIdx - 1 + allPuppies.length) % allPuppies.length];
  const nextPup = allPuppies[(currentIdx + 1) % allPuppies.length];

  const images = puppy.media.filter((m) => m.kind === "image");
  const videos = puppy.media.filter((m) => m.kind === "video");
  const displayImages =
    images.length > 0
      ? images
      : [{ src: "/brand/logo.png", alt: puppy.name, kind: "image" as const }];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  // Enquiry form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState(
    `Hi! I'd love to know more about ${puppy.name}.`
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentImg = displayImages[activeIndex] || displayImages[0];
  const genderLabel = puppy.gender === "male" ? "Boy" : "Girl";
  const statusLabel =
    puppy.availability === "gone-home"
      ? "Gone home"
      : puppy.availability === "reserved"
      ? "Reserved"
      : "Available";

  const whatsappHref = `https://wa.me/971501234567?text=${encodeURIComponent(
    `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}, ${genderLabel}, ${puppy.age}).`
  )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg("Please enter a valid phone or WhatsApp number.");
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
  };

  return (
    <div className="tp-page" data-page="pup">
      <article
        className="tp-storybook"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, #e8d8c8 24%, var(--color-milk)) 0, var(--color-milk) 85%)",
        }}
      >
        <div aria-hidden="true" className="tp-ribbon">
          <div className="tp-ribbon__track">
            <span className="tp-ribbon__band" />
          </div>
        </div>

        <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-[0.95rem] font-semibold text-cocoa-soft"
          >
            <Link className="link-ink" href="/puppies">
              Available puppies
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{puppy.name}</span>
          </nav>

          {/* Chapter 1 */}
          <p className="tp-chapter">
            <span aria-hidden="true" className="tp-chapter__n font-plush">
              1
            </span>
            <span className="font-scrawl">hello, it&apos;s me</span>
          </p>

          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Storybook Gallery */}
            <div className="min-w-0 lg:col-span-7">
              <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
                <button
                  aria-label={`Open ${puppy.name}, photo ${activeIndex + 1} of ${displayImages.length} full screen`}
                  className="absolute inset-0 block size-full cursor-zoom-in"
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Image
                    alt={currentImg.alt || `${puppy.name}, ${puppy.breed}`}
                    src={currentImg.src}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 92vw"
                    className="object-cover"
                  />
                </button>

                {videos.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-cocoa bg-milk/95 px-3.5 py-1.5 text-xs font-bold text-cocoa shadow-sm hover:bg-honey"
                  >
                    <span>▶</span>
                    <span>Watch video</span>
                  </button>
                )}

                {displayImages.length > 1 && (
                  <div className="absolute inset-x-4 bottom-4 flex justify-between pointer-events-none">
                    <button
                      aria-label="Previous photo"
                      className="pointer-events-auto grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold shadow-sm hover:bg-honey"
                      type="button"
                      onClick={() =>
                        setActiveIndex(
                          (prev) =>
                            (prev - 1 + displayImages.length) %
                            displayImages.length
                        )
                      }
                    >
                      ‹
                    </button>
                    <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
                      {activeIndex + 1} / {displayImages.length}
                    </span>
                    <button
                      aria-label="Next photo"
                      className="pointer-events-auto grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold shadow-sm hover:bg-honey"
                      type="button"
                      onClick={() =>
                        setActiveIndex((prev) => (prev + 1) % displayImages.length)
                      }
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {displayImages.length > 1 && (
                <ul
                  aria-label={`All photos of ${puppy.name}`}
                  className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]"
                >
                  {displayImages.map((img, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <li key={`${img.src}-${idx}`} className="shrink-0">
                        <button
                          aria-current={isCurrent ? "true" : undefined}
                          aria-label={`${puppy.name}, photo ${idx + 1} of ${displayImages.length}`}
                          className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${
                            isCurrent
                              ? "-rotate-3 -translate-y-1 border-toffee-deep"
                              : "border-cocoa/35 hover:border-cocoa"
                          }`}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                        >
                          <Image
                            alt=""
                            src={img.src}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Right Column: Tag Card & Guarantees */}
            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              {/* Tag Card with Peeking Teddy */}
              <div className="tp-tag tp-board mt-12 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-16">
                <span aria-hidden="true" className="tp-tag__ring" />
                <div className="pup-buddy absolute -top-[4.8rem] right-6 w-[9.5rem] pointer-events-none">
                  <PupSvg pose="peek" facing="right" />
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-soft border border-cocoa/20 px-3 py-1 text-xs font-bold text-cocoa">
                  <span>🐾</span>
                  <span>{statusLabel}</span>
                </span>

                <h1 className="font-plush text-4xl md:text-5xl font-bold text-cocoa mt-4 leading-tight">
                  {puppy.name}
                </h1>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-cocoa/15 pt-5 text-sm">
                  <div>
                    <dt className="font-scrawl text-cocoa-soft">Breed</dt>
                    <dd className="font-semibold text-cocoa mt-0.5">{puppy.breed}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-cocoa-soft">Boy or girl</dt>
                    <dd className="font-semibold text-cocoa mt-0.5">{genderLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-cocoa-soft">Age</dt>
                    <dd className="font-semibold text-cocoa mt-0.5">{puppy.age}</dd>
                  </div>
                  <div>
                    <dt className="font-scrawl text-cocoa-soft">Where</dt>
                    <dd className="font-semibold text-cocoa mt-0.5">
                      {puppy.locationLabel}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 space-y-3">
                  <a
                    className="btn btn-whatsapp w-full"
                    href={whatsappHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Ask about this puppy on WhatsApp
                  </a>
                  <a
                    className="btn btn-ghost w-full"
                    href={`#enquire-${puppy.slug}`}
                  >
                    Send an enquiry
                  </a>
                </div>
              </div>

              {/* Chapter 2: Every Teddy Pup comes */}
              <div className="mt-6 rounded-[1.8rem] border-[3px] border-cocoa bg-[#fffaf0] p-6 md:p-7 shadow-[4px_6px_0_rgba(42,23,14,0.12)]">
                <p className="tp-chapter !mt-0">
                  <span aria-hidden="true" className="tp-chapter__n font-plush">
                    2
                  </span>
                  <span className="font-scrawl">
                    what comes with this {puppy.name}
                  </span>
                </p>
                <h2 className="font-plush text-2xl font-bold text-cocoa mt-2">
                  Every Teddy Pup comes
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-cocoa-soft">
                  <li className="flex items-start gap-2.5">
                    <span className="text-toffee-deep font-bold">✓</span>
                    <span>Vaccinated</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-toffee-deep font-bold">✓</span>
                    <span>Dewormed</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-toffee-deep font-bold">✓</span>
                    <span>Verified health certificate from licensed vets</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-toffee-deep font-bold">✓</span>
                    <span>Thoroughly checked before joining your family</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chapter 3: The way home */}
          <section
            aria-labelledby={`home-steps-${puppy.slug}`}
            className="mt-20"
          >
            <p className="tp-chapter">
              <span aria-hidden="true" className="tp-chapter__n font-plush">
                3
              </span>
              <span className="font-scrawl">the way home</span>
            </p>
            <h2
              className="font-plush text-big mt-3"
              id={`home-steps-${puppy.slug}`}
            >
              {puppy.origin === "dubai"
                ? "Coming home from our Dubai showroom"
                : "Coming home from abroad"}
            </h2>

            <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  1
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  Reserve your puppy
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  Tell us which puppy has captured your heart.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  2
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  Personalized consultation
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We finalize details with you and share updates on your puppy&apos;s
                  journey.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  3
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  {puppy.origin === "dubai"
                    ? "Showroom meet & handover"
                    : "Import and arrival"}
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We manage health checks, travel arrangements, and documentation.
                </p>
              </li>
              <li>
                <span aria-hidden="true" className="tp-trail__num font-plush">
                  4
                </span>
                <h3 className="font-plush-text text-xl font-bold leading-tight">
                  Welcome home
                </h3>
                <p className="mt-2 max-w-[38ch] text-cocoa-soft">
                  We help your new puppy settle in and ensure a smooth transition into
                  your home.
                </p>
              </li>
            </ol>
          </section>

          {/* Chapter 4: Ask about this puppy */}
          <section
            aria-labelledby={`enquire-title-${puppy.slug}`}
            className="tp-letter mt-20 grid gap-10 lg:grid-cols-12"
            id={`enquire-${puppy.slug}`}
          >
            <span aria-hidden="true" className="tp-letter__stamp">
              <svg
                aria-hidden="true"
                className="size-9"
                fill="currentColor"
                viewBox="0 0 64 64"
              >
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </span>

            <div className="lg:col-span-4">
              <p className="tp-chapter !mt-0">
                <span aria-hidden="true" className="tp-chapter__n font-plush">
                  4
                </span>
                <span className="font-scrawl">dear TeddyPups…</span>
              </p>
              <h2
                className="font-plush text-big mt-2"
                id={`enquire-title-${puppy.slug}`}
              >
                Ask about this puppy
              </h2>
              <p className="mt-4 text-cocoa-soft">
                Leave your details and our team will get back to you promptly — or
                message us on WhatsApp for the quickest reply.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              {submitted ? (
                <div className="rounded-2xl border-2 border-cocoa/20 bg-honey/20 p-6 text-center">
                  <p className="font-plush text-2xl text-cocoa">
                    Enquiry prepared for {puppy.name}!
                  </p>
                  <p className="mt-2 text-sm text-cocoa-soft">
                    For the fastest response, send your message directly on WhatsApp.
                  </p>
                  <a
                    className="btn btn-whatsapp mt-4"
                    href={whatsappHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Continue on WhatsApp
                  </a>
                </div>
              ) : (
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        className="block text-[0.95rem] font-semibold"
                        htmlFor="pup-enq-name"
                      >
                        Your name<span className="text-toffee-ink"> *</span>
                      </label>
                      <input
                        id="pup-enq-name"
                        autoComplete="name"
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none focus:border-cocoa"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[0.95rem] font-semibold"
                        htmlFor="pup-enq-phone"
                      >
                        Phone or WhatsApp<span className="text-toffee-ink"> *</span>
                      </label>
                      <input
                        id="pup-enq-phone"
                        autoComplete="tel"
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none focus:border-cocoa"
                        inputMode="tel"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <p className="mt-1 text-xs text-cocoa-soft">
                        With country code, e.g. +971 50 123 4567
                      </p>
                    </div>
                    <div>
                      <label
                        className="block text-[0.95rem] font-semibold"
                        htmlFor="pup-enq-email"
                      >
                        Email <span className="font-normal text-cocoa-soft">(optional)</span>
                      </label>
                      <input
                        id="pup-enq-email"
                        autoComplete="email"
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none focus:border-cocoa"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[0.95rem] font-semibold"
                        htmlFor="pup-enq-area"
                      >
                        Your area <span className="font-normal text-cocoa-soft">(optional)</span>
                      </label>
                      <input
                        id="pup-enq-area"
                        autoComplete="address-level2"
                        className="mt-1.5 h-12 w-full rounded-2xl border-2 border-cocoa/60 bg-milk px-4 text-base outline-none focus:border-cocoa"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                      <p className="mt-1 text-xs text-cocoa-soft">e.g. Dubai Marina</p>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[0.95rem] font-semibold"
                      htmlFor="pup-enq-msg"
                    >
                      Message <span className="font-normal text-cocoa-soft">(optional)</span>
                    </label>
                    <textarea
                      id="pup-enq-msg"
                      className="mt-1.5 w-full rounded-2xl border-2 border-cocoa/60 bg-milk p-4 text-base outline-none focus:border-cocoa"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-sm font-bold text-red-700">{errorMsg}</p>
                  )}

                  <button className="btn btn-primary" type="submit">
                    Send enquiry
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Previous / Next Puppy Navigation */}
          <nav
            aria-label="More puppies"
            className="mt-16 grid gap-6 sm:grid-cols-2"
          >
            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:rotate-1"
              href={`/puppies/${prevPup.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                <Image
                  alt={prevPup.name}
                  src={prevPup.media[0]?.src || "/brand/logo.png"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">
                  Previous pup
                </span>
                <span className="font-plush text-[1.6rem]">{prevPup.name}</span>
              </span>
            </Link>

            <Link
              className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:flex-row-reverse sm:text-right"
              href={`/puppies/${nextPup.slug}`}
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
                <Image
                  alt={nextPup.name}
                  src={nextPup.media[0]?.src || "/brand/logo.png"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="font-scrawl block text-sm text-cocoa-soft">
                  Next pup
                </span>
                <span className="font-plush text-[1.6rem]">{nextPup.name}</span>
              </span>
            </Link>
          </nav>
        </div>
      </article>

      {/* Fullscreen Photo Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-cocoa/95 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full aspect-[4/5] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              alt={currentImg.alt || puppy.name}
              src={currentImg.src}
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="btn btn-primary absolute top-4 right-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoOpen && videos.length > 0 && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-cocoa/95 p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl bg-cocoa p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              className="w-full rounded-xl max-h-[80vh]"
              controls
              playsInline
              src={videos[0].src}
            />
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="btn btn-primary mt-3 w-full"
            >
              Close video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
