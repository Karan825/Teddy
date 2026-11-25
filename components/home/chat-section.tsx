"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const snaps = [
  {
    src: "/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
    alt: "A tiny apricot teddy bear puppy held up in the TeddyPups showroom",
    pos: "54.3% 48.3%",
  },
  {
    src: "/media/Vi-kzyvemRl4/e740ed8a24/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
    alt: "The apricot teddy bear puppy from our showroom, close up",
    pos: "46% 44.4%",
  },
  {
    src: "/media/g_e4ebbc7fyG/8276289ae7/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
    alt: "The apricot teddy bear puppy from our showroom, looking up",
    pos: "43.7% 40.2%",
  },
  {
    src: "/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg",
    alt: "The apricot teddy bear puppy from our showroom, held up to say hello",
    pos: "45.3% 44.4%",
  },
];

const breedChips = [
  { label: "Maltipoo", href: "/puppies?breed=maltipoo" },
  { label: "Pomeranian", href: "/puppies?breed=pomeranian" },
  { label: "Poodle", href: "/puppies?breed=poodle" },
  { label: "Cavapoo", href: "/puppies?breed=cavapoo" },
  { label: "Shih Tzu", href: "/puppies?breed=shih-tzu" },
];

export function ChatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (vh * 0.55 - rect.top) / Math.max(1, rect.height - vh * 0.4))
      );

      const nextStep = progress < 0.33 ? 0 : progress < 0.68 ? 1 : 2;
      setActiveStep(nextStep);
    };

    const init = setTimeout(onScroll, 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(init);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!screenRef.current) return;
    const screen = screenRef.current;
    screen.scrollTo({
      top: activeStep === 0 ? 0 : activeStep === 1 ? 180 : screen.scrollHeight,
      behavior: "smooth",
    });
  }, [activeStep]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="journey-title"
      className="tp-scene tp-chat"
      data-here="false"
      data-pup-scene="true"
      data-tone="light"
      data-visited="false"
      style={{
        ["--sky-top" as string]: "#f7d18d",
        ["--sky-bottom" as string]: "#f0b866",
      }}
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        {/* Left column: Story & Steps */}
        <div className="tp-chat__story">
          <h2 className="font-plush text-huge" id="journey-title">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple,
            secure, and purely joyful.
          </p>

          <ol className="tp-chat__steps">
            <li
              className="tp-chat__step"
              data-active={activeStep === 0 ? "true" : undefined}
              onClick={() => setActiveStep(0)}
            >
              <span aria-hidden="true" className="tp-chat__num font-plush">
                1
              </span>
              <h3 className="font-plush tp-chat__title">Choose your breed</h3>
              <p className="tp-chat__text">
                Select your preferred breed or tell us what you&apos;re looking for.
                We&apos;ll guide you based on availability and your lifestyle.
              </p>
            </li>

            <li
              className="tp-chat__step"
              data-active={activeStep === 1 ? "true" : undefined}
              onClick={() => setActiveStep(1)}
            >
              <span aria-hidden="true" className="tp-chat__num font-plush">
                2
              </span>
              <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
              <p className="tp-chat__text">
                Our team will share real photos, health details, and all necessary
                information directly on WhatsApp.
              </p>
            </li>

            <li
              className="tp-chat__step"
              data-active={activeStep === 2 ? "true" : undefined}
              onClick={() => setActiveStep(2)}
            >
              <span aria-hidden="true" className="tp-chat__num font-plush">
                3
              </span>
              <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
              <p className="tp-chat__text">
                Once confirmed, we handle everything professionally and ensure your
                puppy reaches you safely and stress-free.
              </p>
            </li>
          </ol>

          <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
            How it works
          </Link>
        </div>

        {/* Right column: Sticky WhatsApp Phone + Mascot */}
        <div className="tp-chat__side">
          <div
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            className="tp-phone"
            role="group"
          >
            <div className="tp-phone__bar">
              <Image
                alt=""
                width={40}
                height={40}
                className="tp-phone__avatar"
                src="/brand/logo.png"
              />
              <span>
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">online</span>
              </span>
            </div>

            <div ref={screenRef} className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I&apos;d love to know more about your puppies.
              </p>

              <div className="tp-msg-group" data-show="true" data-step="0">
                <div className="tp-msg tp-msg--them">
                  <p>
                    Select your preferred breed or tell us what you&apos;re looking
                    for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                  <ul aria-label="Breeds we have now" className="tp-chips">
                    {breedChips.map((chip) => (
                      <li key={chip.href}>
                        <Link href={chip.href}>{chip.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="tp-msg-group"
                data-show={activeStep >= 1 ? "true" : "false"}
                data-step="1"
              >
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    {snaps.map((snap, i) => (
                      <span key={i} className="tp-snaps__one">
                        <Image
                          alt={snap.alt}
                          src={snap.src}
                          fill
                          sizes="9rem"
                          style={{ objectFit: "cover", objectPosition: snap.pos }}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-clip">
                    <video
                      ref={videoRef}
                      aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
                      loop
                      muted
                      playsInline
                      poster="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      preload="none"
                      src="/media/dSAUmXs8Qai9/ef39cbea20/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                    />
                    <button
                      aria-label={playing ? "Pause video" : "Play video"}
                      aria-pressed={playing}
                      className="tp-clip__play"
                      type="button"
                      onClick={toggleVideo}
                    >
                      <svg aria-hidden="true" viewBox="0 0 24 24">
                        {playing ? (
                          <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="tp-msg tp-msg--them">
                  Our team will share real photos, health details, and all necessary
                  information directly on WhatsApp.
                </p>
              </div>

              <div
                className="tp-msg-group"
                data-show={activeStep >= 2 ? "true" : "false"}
                data-step="2"
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Once confirmed, we handle everything professionally and ensure your
                    puppy reaches you safely and stress-free.
                  </p>
                  <svg
                    aria-hidden="true"
                    className="tp-route"
                    viewBox="0 0 220 70"
                  >
                    <path
                      className="tp-route__line"
                      d="M14 52 C 60 6, 120 70, 170 28"
                    />
                    <circle className="tp-route__dot" cx="14" cy="52" r="5" />
                    <path
                      className="tp-route__home"
                      d="M164 32 l12 -12 l12 12 v14 h-24 z"
                    />
                    <path
                      className="tp-route__heart"
                      d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                    />
                  </svg>
                </div>
              </div>

              <p
                aria-hidden="true"
                className="tp-typing"
                data-show={activeStep < 2 ? "true" : "false"}
              >
                <span />
                <span />
                <span />
              </p>
            </div>

            <a
              className="tp-phone__compose"
              href="https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project."
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Say hello on WhatsApp</span>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>

          {/* Mascot Stop 4 */}
          <div
            className="pup-stop tp-chat__teddy"
            data-facing="right"
            data-pose="sit"
            data-pup-stop="true"
          />
        </div>
      </div>
    </section>
  );
}
