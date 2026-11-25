"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { PupSvg } from "@/components/mascot/pup-svg";

const pawPositions = [
  { left: "14%", top: "45%", rot: 12, delay: "0.08s" },
  { left: "26%", top: "20%", rot: -8, delay: "0.22s" },
  { left: "38%", top: "48%", rot: 10, delay: "0.36s" },
  { left: "50%", top: "22%", rot: -6, delay: "0.50s" },
  { left: "62%", top: "46%", rot: 11, delay: "0.64s" },
  { left: "74%", top: "24%", rot: -9, delay: "0.78s" },
];

function PawPrint({ left, top, rot, delay }: { left: string; top: string; rot: number; delay: string }) {
  return (
    <svg
      aria-hidden="true"
      className="tp-curtain__print"
      style={{ left, top, rotate: `${rot}deg`, animationDelay: delay }}
      viewBox="0 0 64 64"
    >
      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
    </svg>
  );
}

export function RouteCurtain() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "intro" | "covering" | "covered" | "lifting">("idle");
  const isFirstMount = useRef(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const t0 = setTimeout(() => setState("covering"), 0);
    const t1 = setTimeout(() => setState("covered"), 280);
    const t2 = setTimeout(() => setState("lifting"), 1220);
    const t3 = setTimeout(() => setState("idle"), 1720);

    let rafId = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const phase = elapsed * 0.018;

      if (runnerRef.current && stageRef.current) {
        const stageW = stageRef.current.clientWidth || 600;
        const runnerW = runnerRef.current.clientWidth || 120;
        const startX = -runnerW * 0.25;
        const endX = stageW - runnerW * 0.75;
        const curX = startX + (endX - startX) * progress;
        const bob = Math.abs(Math.sin(phase)) * -4;

        runnerRef.current.style.transform = `translate3d(${curX.toFixed(1)}px, ${bob.toFixed(1)}px, 0px)`;

        // Pivot legs strictly around their SVG hip coordinates
        const swingA = (Math.sin(phase) * 20).toFixed(1);
        const swingB = (-Math.sin(phase) * 20).toFixed(1);
        const bf = runnerRef.current.querySelector('[data-p="bf"]');
        const ff = runnerRef.current.querySelector('[data-p="ff"]');
        const bn = runnerRef.current.querySelector('[data-p="bn"]');
        const fn = runnerRef.current.querySelector('[data-p="fn"]');
        if (bf) bf.setAttribute("transform", `translate(94 192) rotate(${swingA})`);
        if (ff) ff.setAttribute("transform", `translate(168 192) rotate(${swingB})`);
        if (bn) bn.setAttribute("transform", `translate(110 194) rotate(${swingB})`);
        if (fn) fn.setAttribute("transform", `translate(186 194) rotate(${swingA})`);
      }

      if (elapsed < 1650) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return (
    <div aria-hidden="true" className="tp-curtain" data-state={state}>
      <div className="tp-curtain__blanket">
        <svg className="tp-curtain__edge tp-curtain__edge--top" height="40" preserveAspectRatio="none" width="100%">
          <defs>
            <pattern id="tp-curtain-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fbe3b4" />
              <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
        </svg>

        <div ref={stageRef} className="tp-curtain__stage">
          <div className="tp-curtain__prints">
            {pawPositions.map((p, i) => (
              <PawPrint key={i} {...p} />
            ))}
          </div>

          <div ref={runnerRef} className="tp-curtain__runner">
            <PupSvg pose="walk" />
          </div>

          <p className="tp-curtain__note font-scrawl">every puppy is family</p>
        </div>

        <svg className="tp-curtain__edge tp-curtain__edge--bottom" height="40" preserveAspectRatio="none" width="100%">
          <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
        </svg>
      </div>
    </div>
  );
}
