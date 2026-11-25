"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PuppyProfile } from "@/types/puppy";
import { PuppyCard } from "./puppy-card";

interface PuppyDetailViewProps {
  puppy: PuppyProfile;
  relatedPuppies: PuppyProfile[];
}

export function PuppyDetailView({ puppy, relatedPuppies }: PuppyDetailViewProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    message: "",
  });

  const photos = puppy.media.length > 0 ? puppy.media : [{ src: "/brand/logo.png", alt: puppy.name, kind: "image" as const }];
  const activePhoto = photos[selectedPhotoIndex] || photos[0];

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="gutter max-w-[110rem] mx-auto mb-6 text-sm text-cocoa-soft font-medium">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-toffee">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/puppies" className="hover:text-toffee">Puppies</Link>
          </li>
          <li>/</li>
          <li className="text-cocoa font-bold" aria-current="page">
            {puppy.name}
          </li>
        </ol>
      </nav>

      <div className="gutter max-w-[110rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Media Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-cocoa bg-sand shadow-lg">
              <Image
                alt={activePhoto.alt}
                src={activePhoto.src}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 95vw"
                className="object-cover"
              />

              {/* Prev/Next chevrons */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-cocoa bg-milk/90 text-cocoa shadow-md hover:bg-milk text-2xl font-bold transition-transform hover:scale-110"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-cocoa bg-milk/90 text-cocoa shadow-md hover:bg-milk text-2xl font-bold transition-transform hover:scale-110"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Video play badge */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border-2 border-cocoa bg-milk/95 px-4 py-2 font-bold text-xs text-cocoa shadow-md hover:bg-honey transition-colors"
              >
                <span className="text-toffee font-mono text-sm">▶</span> Watch 4K Video
              </button>

              <span className="font-scrawl absolute top-4 right-4 rounded-full border border-cocoa bg-honey px-3 py-1 text-xs font-bold text-cocoa shadow-sm">
                {puppy.locationLabel}
              </span>
            </div>

            {/* Thumbnail selector */}
            {photos.length > 1 && (
              <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
                {photos.map((p, idx) => (
                  <button
                    key={p.src + idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoIndex === idx
                        ? "border-toffee scale-105 shadow-md ring-2 ring-toffee/30"
                        : "border-cocoa/30 hover:border-cocoa opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      alt=""
                      src={p.src}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Specs & Inquiry */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-cocoa bg-milk p-6 md:p-8 shadow-xl">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-toffee">
              {puppy.gender === "male" ? "Male Puppy" : "Female Puppy"} • {puppy.availability}
            </span>
            <h1 className="font-plush text-4xl md:text-5xl font-bold text-cocoa mt-2">
              {puppy.name}
            </h1>
            <p className="font-sans text-lg text-cocoa-soft font-semibold mt-1">
              {puppy.breed}
            </p>

            <p className="mt-4 text-cocoa-soft text-sm leading-relaxed border-t border-cocoa/15 pt-4">
              {puppy.description}
            </p>

            {/* Specs Definition List */}
            <dl className="grid grid-cols-2 gap-4 my-6 rounded-2xl border border-cocoa/20 bg-sand/30 p-4 text-xs">
              <div>
                <dt className="text-cocoa-soft font-medium">Age</dt>
                <dd className="font-bold text-cocoa text-sm mt-0.5">{puppy.age}</dd>
              </div>
              <div>
                <dt className="text-cocoa-soft font-medium">Expected Weight</dt>
                <dd className="font-bold text-cocoa text-sm mt-0.5">{puppy.weight || "1.8 - 2.5 kg"}</dd>
              </div>
              <div>
                <dt className="text-cocoa-soft font-medium">Microchip</dt>
                <dd className="font-bold text-cocoa text-sm mt-0.5">{puppy.microchip || "ISO standard"}</dd>
              </div>
              <div>
                <dt className="text-cocoa-soft font-medium">Location</dt>
                <dd className="font-bold text-cocoa text-sm mt-0.5">{puppy.locationLabel}</dd>
              </div>
            </dl>

            {/* WhatsApp Quick Link */}
            <div className="space-y-3">
              <a
                className="w-full btn btn-whatsapp flex items-center justify-center gap-2 text-base font-bold"
                href={`https://wa.me/919898124987?text=${encodeURIComponent(
                  `Hi TeddyPups! I'm interested in ${puppy.name} (${puppy.breed}). Could you share more details?`
                )}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>💬</span> Quick WhatsApp Inquiry
              </a>
            </div>

            {/* Direct Inquiry Form */}
            <div className="mt-8 border-t border-cocoa/15 pt-6">
              <h2 className="font-plush text-xl font-bold text-cocoa mb-3">
                Ask about {puppy.name}
              </h2>

              {formSubmitted ? (
                <div className="p-4 rounded-xl border-2 border-green-700 bg-green-50 text-green-900 text-sm">
                  <p className="font-bold">Thank you, {formData.name}!</p>
                  <p className="mt-1">
                    Your inquiry about {puppy.name} has been received. Our concierge team will reach out to you on {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-cocoa font-bold mb-1" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Layla Al-Mansoor"
                      className="w-full rounded-xl border border-cocoa/40 px-3 py-2 text-sm focus:border-toffee focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-cocoa font-bold mb-1" htmlFor="phone">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full rounded-xl border border-cocoa/40 px-3 py-2 text-sm focus:border-toffee focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-cocoa font-bold mb-1" htmlFor="email">
                      Email Address (optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full rounded-xl border border-cocoa/40 px-3 py-2 text-sm focus:border-toffee focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-cocoa font-bold mb-1" htmlFor="message">
                      Any questions or special requests?
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Tell us when you'd like to meet ${puppy.name}...`}
                      className="w-full rounded-xl border border-cocoa/40 px-3 py-2 text-sm focus:border-toffee focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary font-bold py-2.5 mt-2"
                  >
                    Send enquiry for {puppy.name}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Every Teddy Pup Comes With Guarantees */}
        <section className="mt-20 rounded-3xl border-2 border-cocoa bg-sand/30 p-8 md:p-12">
          <h2 className="font-plush text-3xl font-bold text-cocoa text-center mb-8">
            Every Teddy Pup comes with
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 rounded-2xl border border-cocoa/20 bg-milk flex flex-col items-center">
              <span className="text-3xl mb-2">📋</span>
              <span className="font-plush font-bold text-cocoa text-sm">Vaccination Record</span>
              <span className="text-[11px] text-cocoa-soft mt-1">Core vaccines & deworming</span>
            </div>
            <div className="p-4 rounded-2xl border border-cocoa/20 bg-milk flex flex-col items-center">
              <span className="text-3xl mb-2">🔖</span>
              <span className="font-plush font-bold text-cocoa text-sm">ISO Microchip</span>
              <span className="text-[11px] text-cocoa-soft mt-1">International standard</span>
            </div>
            <div className="p-4 rounded-2xl border border-cocoa/20 bg-milk flex flex-col items-center">
              <span className="text-3xl mb-2">🩺</span>
              <span className="font-plush font-bold text-cocoa text-sm">Vet Health File</span>
              <span className="text-[11px] text-cocoa-soft mt-1">Full clinical checkup</span>
            </div>
            <div className="p-4 rounded-2xl border border-cocoa/20 bg-milk flex flex-col items-center">
              <span className="text-3xl mb-2">🛡️</span>
              <span className="font-plush font-bold text-cocoa text-sm">1-Year Warranty</span>
              <span className="text-[11px] text-cocoa-soft mt-1">Genetic health guarantee</span>
            </div>
            <div className="p-4 rounded-2xl border border-cocoa/20 bg-milk flex flex-col items-center">
              <span className="text-3xl mb-2">📞</span>
              <span className="font-plush font-bold text-cocoa text-sm">24/7 Aftercare</span>
              <span className="text-[11px] text-cocoa-soft mt-1">Lifetime support</span>
            </div>
          </div>
        </section>

        {/* Coming Home Roadmap */}
        <section className="mt-16">
          <h2 className="font-plush text-3xl font-bold text-cocoa text-center mb-10">
            {puppy.origin === "imported" ? "Coming home from abroad" : "Meeting your puppy in Dubai"}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border-2 border-cocoa bg-milk relative">
              <span className="font-plush text-3xl font-bold text-toffee">01</span>
              <h3 className="font-plush font-bold text-cocoa text-lg mt-2">Reserve {puppy.name}</h3>
              <p className="text-cocoa-soft text-xs mt-2 leading-relaxed">
                Confirm your reservation with a secure deposit to lock in your preferred puppy.
              </p>
            </div>
            <div className="p-6 rounded-2xl border-2 border-cocoa bg-milk relative">
              <span className="font-plush text-3xl font-bold text-toffee">02</span>
              <h3 className="font-plush font-bold text-cocoa text-lg mt-2">Concierge Updates</h3>
              <p className="text-cocoa-soft text-xs mt-2 leading-relaxed">
                Receive weekly HD videos, weigh-in details, and vet inspection reports.
              </p>
            </div>
            <div className="p-6 rounded-2xl border-2 border-cocoa bg-milk relative">
              <span className="font-plush text-3xl font-bold text-toffee">03</span>
              <h3 className="font-plush font-bold text-cocoa text-lg mt-2">Safe Arrival</h3>
              <p className="text-cocoa-soft text-xs mt-2 leading-relaxed">
                Travel in cabin with flight nannies following full UAE MOCCAE clearance.
              </p>
            </div>
            <div className="p-6 rounded-2xl border-2 border-cocoa bg-milk relative">
              <span className="font-plush text-3xl font-bold text-toffee">04</span>
              <h3 className="font-plush font-bold text-cocoa text-lg mt-2">Welcome Home</h3>
              <p className="text-cocoa-soft text-xs mt-2 leading-relaxed">
                Doorstep VIP handover across the UAE or celebration at our Downtown lounge.
              </p>
            </div>
          </div>
        </section>

        {/* Related Puppies Carousel */}
        {relatedPuppies.length > 0 && (
          <section className="mt-24 border-t-2 border-cocoa/15 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-plush text-3xl font-bold text-cocoa">
                Other puppies you might love
              </h2>
              <Link href="/puppies" className="text-sm font-bold text-toffee hover:underline">
                View all puppies →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPuppies.map((p, idx) => (
                <PuppyCard key={p.slug} puppy={p} index={idx} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Video Lightbox Modal */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa/80 backdrop-blur-sm p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl border-4 border-cocoa bg-milk p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-cocoa/15">
              <h3 className="font-plush text-xl font-bold text-cocoa">
                {puppy.name} in action 🧸
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full border border-cocoa flex items-center justify-center font-bold text-sm hover:bg-cocoa hover:text-milk"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-cocoa mt-4">
              <Image
                alt={puppy.name}
                src={activePhoto.src}
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-milk bg-cocoa/40 p-6 text-center">
                <span className="text-5xl mb-3">🎬</span>
                <p className="font-plush text-lg font-bold">4K Video Stream Ready</p>
                <p className="text-xs text-milk/80 max-w-sm mt-1">
                  Connect on WhatsApp to receive high-definition, live video recordings of {puppy.name} playing, eating, and walking!
                </p>
                <a
                  className="mt-4 btn btn-primary"
                  href={`https://wa.me/919898124987?text=${encodeURIComponent(
                    `Hi! Please send me the live video clips of ${puppy.name}!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Request Video on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
