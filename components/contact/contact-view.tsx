"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { getAllPuppies } from "@/lib/puppies";
import { PupSvg } from "@/components/mascot/pup-svg";

const whatsappHref =
  "https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project.";

export function ContactView({ initialPuppySlug = "" }: { initialPuppySlug?: string }) {
  const puppies = getAllPuppies();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [puppyId, setPuppyId] = useState(initialPuppySlug);
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<"writing" | "posting" | "sent">("writing");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg("Please write your name on the letter before posting.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg("Please provide a phone or WhatsApp number so we can reply.");
      return;
    }
    setErrorMsg("");
    setPhase("posting");
    setTimeout(() => setPhase("sent"), 1100);
  };

  return (
    <div className="tp-page" data-page="contact">
      <section
        aria-labelledby="contact-title"
        className="tp-scene"
        data-pup-scene="true"
        data-tone="light"
        style={{
          ["--sky-top" as string]: "#fff9ee",
          ["--sky-bottom" as string]: "#f9dca4",
        }}
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1
              className="font-plush text-giant max-w-[12ch] lg:col-span-7"
              id="contact-title"
            >
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form,
              and our team will get back to you promptly. Whether ready to adopt or just
              seeking info, we&apos;d love to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Right column: Postal Stationery Letterform */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <div className="tp-post" data-phase={phase}>
                {phase === "sent" ? (
                  <div className="tp-letterform text-center py-12">
                    <div className="mx-auto w-24 h-24 rounded-full bg-honey/30 border-2 border-cocoa flex items-center justify-center mb-4">
                      <span className="text-4xl">💌</span>
                    </div>
                    <h2 className="font-plush text-3xl text-cocoa">
                      Letter posted, {name}!
                    </h2>
                    <p className="mt-3 text-cocoa-soft max-w-md mx-auto">
                      Thank you for writing to TeddyPups. For an instant reply on
                      availability and viewing slots, connect with us directly on
                      WhatsApp.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <a
                        className="btn btn-whatsapp"
                        href={whatsappHref}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Chat on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setPhase("writing");
                          setName("");
                          setPhone("");
                          setEmail("");
                          setArea("");
                          setMessage("");
                        }}
                        className="btn btn-ghost"
                      >
                        Write another letter
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="tp-letterform" noValidate onSubmit={handleSubmit}>
                    <span aria-hidden="true" className="tp-letter__stamp">
                      <svg aria-hidden="true" className="size-9" fill="currentColor" viewBox="0 0 64 64">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>

                    <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>

                    <p className="tp-letterform__line">
                      my name is{" "}
                      <span className="tp-blank" style={{ ["--size" as string]: "16ch" }}>
                        <input
                          aria-label="Your name (required)"
                          autoComplete="name"
                          maxLength={80}
                          minLength={2}
                          name="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </span>
                      , and you can reach me on{" "}
                      <span className="tp-blank" style={{ ["--size" as string]: "15ch" }}>
                        <input
                          aria-label="Phone or WhatsApp number with country code (required)"
                          autoComplete="tel"
                          inputMode="tel"
                          name="phone"
                          placeholder="+971 50 123 4567"
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </span>{" "}
                      or by email at{" "}
                      <span className="tp-blank" style={{ ["--size" as string]: "20ch" }}>
                        <input
                          aria-label="Email (optional)"
                          autoComplete="email"
                          name="email"
                          placeholder="optional"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </span>
                      .
                    </p>

                    <p className="tp-letterform__line">
                      I live in{" "}
                      <span className="tp-blank" style={{ ["--size" as string]: "13ch" }}>
                        <input
                          aria-label="Your area (optional)"
                          autoComplete="address-level2"
                          maxLength={80}
                          name="area"
                          placeholder="e.g. Dubai Marina"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </span>
                      , and I&apos;m curious about{" "}
                      <span className="tp-blank tp-blank--select">
                        <label className="sr-only" htmlFor="contact-puppy-select">
                          Puppy you&apos;re interested in (optional)
                        </label>
                        <select
                          id="contact-puppy-select"
                          name="puppyId"
                          value={puppyId}
                          onChange={(e) => setPuppyId(e.target.value)}
                        >
                          <option value="">any puppy (not sure yet)</option>
                          {puppies.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {p.name} ({p.breed}, {p.gender === "male" ? "boy" : "girl"})
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    <label className="sr-only" htmlFor="contact-message">
                      Your message (optional)
                    </label>
                    <textarea
                      id="contact-message"
                      className="tp-letterform__note"
                      name="message"
                      placeholder="Anything else you'd like to tell us..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    {errorMsg && (
                      <p className="mt-3 text-sm font-bold text-red-700">{errorMsg}</p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <span className="font-scrawl tp-letterform__sign">
                        with love, a future puppy parent
                      </span>
                      <button className="btn btn-primary" type="submit">
                        {phase === "posting" ? "Posting..." : "Post my letter"}
                      </button>
                    </div>
                  </form>
                )}

                {/* Teddy sitting below the letterform */}
                <div className="mt-4 flex justify-end pr-6">
                  <div className="w-28 h-24">
                    <PupSvg pose="sit" facing="right" />
                  </div>
                </div>
              </div>
            </div>

            {/* Left column: Direct contact + Downtown Dubai Showroom Card */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 space-y-8">
              <div className="space-y-5">
                <a
                  className="btn btn-whatsapp"
                  href={whatsappHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  WhatsApp +971 50 000 0000
                </a>

                <div>
                  <p className="font-scrawl text-sm text-cocoa-soft">call us</p>
                  <a
                    className="font-semibold text-toffee-ink underline underline-offset-4 hover:text-cocoa"
                    href="tel:+971500000000"
                  >
                    +971 50 000 0000
                  </a>
                </div>

                <div>
                  <p className="font-scrawl text-sm text-cocoa-soft">email</p>
                  <a
                    className="font-semibold text-toffee-ink underline underline-offset-4 hover:text-cocoa"
                    href="mailto:info@instabizweb.com"
                  >
                    info@instabizweb.com
                  </a>
                </div>
              </div>

              {/* Striped Awning Showroom Card */}
              <div className="tp-shopfront relative overflow-hidden rounded-3xl border-[3px] border-cocoa bg-milk shadow-lg">
                <div
                  aria-hidden="true"
                  className="h-4 w-full border-b-[3px] border-cocoa"
                  style={{
                    background:
                      "repeating-linear-gradient(90deg, #b8521e 0 14px, #fffdf8 14px 28px)",
                  }}
                />
                <div className="tp-visit relative p-7 pt-6">
                  <div>
                    <h2 className="font-plush text-[2rem] leading-tight" id="visit-title">
                      Visit us in Downtown Dubai
                    </h2>
                    <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                      Step into our Downtown Dubai showroom and experience the joy of
                      choosing your puppy face-to-face.
                    </p>
                    <p className="mt-4 flex items-center gap-2 font-semibold">
                      <svg
                        aria-hidden="true"
                        className="size-5 shrink-0 text-toffee-deep"
                        fill="currentColor"
                        viewBox="0 0 64 64"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                      Downtown Dubai, United Arab Emirates
                    </p>
                    <a
                      className="btn btn-ghost mt-6 !bg-milk"
                      href="https://www.instabizweb.com/"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <figure className="tp-visit__photo">
                    <Image
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      fill
                      sizes="(min-width: 640px) 11rem, 90vw"
                      src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                      style={{ objectFit: "cover", objectPosition: "45.3% 44.4%" }}
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
