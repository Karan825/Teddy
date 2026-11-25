"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { PupActor } from "./pup-actor";

type Pose = "peek" | "walk" | "sit" | "bow" | "snug";
type Act = "peekaboo" | "treadmill" | "tilt" | "basket" | null;
type Facing = "right" | "left";

interface DiscretePupState {
  pose: Pose;
  act: Act;
  facing: Facing;
  behind: boolean;
  visible: boolean;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function PupLayer() {
  const pathname = usePathname();
  const [pup, setPup] = useState<DiscretePupState>({
    pose: "peek",
    act: "peekaboo",
    facing: "right",
    behind: true,
    visible: false,
  });

  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const prevScrollYRef = useRef<number>(0);
  const lastDiscreteRef = useRef<DiscretePupState>(pup);

  useEffect(() => {
    const isHome = pathname === "/";
    prevScrollYRef.current = window.scrollY;

    const commitDiscrete = (next: DiscretePupState) => {
      const prev = lastDiscreteRef.current;
      if (
        prev.pose !== next.pose ||
        prev.act !== next.act ||
        prev.facing !== next.facing ||
        prev.behind !== next.behind ||
        prev.visible !== next.visible
      ) {
        lastDiscreteRef.current = next;
        setPup(next);
      }
    };

    const applyTransform = (x: number, y: number, scale: number, walkPhase: number, isWalkingNow: boolean) => {
      if (actorRef.current) {
        actorRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`;
      }
      if (bodyRef.current) {
        const bob = isWalkingNow ? Math.abs(Math.sin(walkPhase)) * -4 : 0;
        bodyRef.current.style.transform = `translate3d(0px, ${bob.toFixed(2)}px, 0px) scale(${scale.toFixed(4)})`;

        // Directly pivot all 4 legs around their hip joints at 60fps
        const swingA = isWalkingNow ? (Math.sin(walkPhase) * 20).toFixed(1) : "0";
        const swingB = isWalkingNow ? (-Math.sin(walkPhase) * 20).toFixed(1) : "0";
        const bf = bodyRef.current.querySelector('[data-p="bf"]');
        const ff = bodyRef.current.querySelector('[data-p="ff"]');
        const bn = bodyRef.current.querySelector('[data-p="bn"]');
        const fn = bodyRef.current.querySelector('[data-p="fn"]');
        if (bf) bf.setAttribute("transform", `translate(94 192) rotate(${swingA})`);
        if (ff) ff.setAttribute("transform", `translate(168 192) rotate(${swingB})`);
        if (bn) bn.setAttribute("transform", `translate(110 194) rotate(${swingB})`);
        if (fn) fn.setAttribute("transform", `translate(186 194) rotate(${swingA})`);
      }
    };

    const computeState = () => {
      const stopElements = Array.from(
        document.querySelectorAll<HTMLElement>('[data-pup-stop="true"]')
      );

      if (stopElements.length === 0) {
        commitDiscrete({ ...lastDiscreteRef.current, visible: false });
        return;
      }

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - prevScrollYRef.current;
      prevScrollYRef.current = scrollY;
      const maxScrollY = Math.max(0, document.documentElement.scrollHeight - vh);

      const stops = stopElements.map((el, index) => {
        const rect = el.getBoundingClientRect();
        const pose = ((el.getAttribute("data-pose") as Pose) || "sit") as Pose;
        const act = ((el.getAttribute("data-act") as Act) || null) as Act;
        const facing = ((el.getAttribute("data-facing") as Facing) || "right") as Facing;
        const behind = el.getAttribute("data-behind") === "true";
        const scale = rect.width > 10 ? rect.width / 300 : vw < 768 ? 0.7 : 1.0;

        const pinnedSection = el.closest<HTMLElement>('[data-pinned="true"]');
        let anchorStart = 0;
        let anchorEnd = 0;

        if (index === 0 && el.classList.contains("tp-hero__teddy")) {
          anchorStart = 0;
          anchorEnd = 40;
        } else if (pinnedSection) {
          const secRect = pinnedSection.getBoundingClientRect();
          const secDocTop = secRect.top + scrollY;
          const pinSpan = Math.max(0, secRect.height - vh);
          anchorStart = secDocTop;
          anchorEnd = secDocTop + pinSpan;
        } else if (index === stopElements.length - 1) {
          const docCenterY = rect.top + scrollY + rect.height / 2;
          const anchor = Math.min(maxScrollY - 12, Math.max(0, docCenterY - vh * 0.56));
          anchorStart = anchor;
          anchorEnd = anchor;
        } else {
          const docCenterY = rect.top + scrollY + rect.height / 2;
          const anchor = Math.max(0, docCenterY - vh * 0.56);
          anchorStart = anchor;
          anchorEnd = anchor;
        }

        return { rect, pose, act, facing, behind, scale, anchorStart, anchorEnd };
      });

      if (!isHome || stops.length === 1) {
        const s = stops[stops.length - 1];
        commitDiscrete({
          pose: s.pose,
          act: s.act,
          facing: s.facing,
          behind: s.behind,
          visible: true,
        });
        applyTransform(s.rect.left, s.rect.top, s.scale, 0, false);
        return;
      }

      if (scrollY <= stops[0].anchorEnd) {
        const s = stops[0];
        commitDiscrete({
          pose: s.pose,
          act: s.act,
          facing: s.facing,
          behind: s.behind,
          visible: true,
        });
        applyTransform(s.rect.left, s.rect.top, s.scale, 0, false);
        return;
      }

      const last = stops[stops.length - 1];
      if (scrollY >= last.anchorStart) {
        commitDiscrete({
          pose: last.pose,
          act: last.act,
          facing: last.facing,
          behind: last.behind,
          visible: true,
        });
        applyTransform(last.rect.left, last.rect.top, last.scale, 0, false);
        return;
      }

      let segIdx = 0;
      for (let i = 0; i < stops.length; i++) {
        if (scrollY >= stops[i].anchorStart && scrollY <= stops[i].anchorEnd) {
          const s = stops[i];
          commitDiscrete({
            pose: s.pose,
            act: s.act,
            facing: s.facing,
            behind: s.behind,
            visible: true,
          });
          const isTreadmill = s.act === "treadmill" || s.pose === "walk";
          const phase = isTreadmill ? scrollY * 0.045 : 0;
          applyTransform(s.rect.left, s.rect.top, s.scale, phase, isTreadmill);
          return;
        }
        if (i < stops.length - 1 && scrollY > stops[i].anchorEnd && scrollY < stops[i + 1].anchorStart) {
          segIdx = i;
          break;
        }
      }

      const from = stops[segIdx];
      const to = stops[segIdx + 1];
      const span = Math.max(1, to.anchorStart - from.anchorEnd);
      const rawT = clamp((scrollY - from.anchorEnd) / span, 0, 1);
      const t = smoothstep(rawT);

      const x = lerp(from.rect.left, to.rect.left, t);
      const y = lerp(from.rect.top, to.rect.top, t);
      const scale = lerp(from.scale, to.scale, t);
      const isWalking = rawT > 0.04 && rawT < 0.96;

      let pose: Pose;
      let act: Act;
      let facing: Facing;
      let behind: boolean;

      if (isWalking) {
        pose = "walk";
        act = null;
        const dx = scrollDelta < 0 ? from.rect.left - to.rect.left : to.rect.left - from.rect.left;
        if (Math.abs(dx) > 6) {
          facing = dx > 0 ? "right" : "left";
        } else {
          facing = lastDiscreteRef.current.facing;
        }
        behind = false;
      } else {
        const settled = rawT <= 0.04 ? from : to;
        pose = settled.pose;
        act = settled.act;
        facing = settled.facing;
        behind = settled.behind;
      }

      commitDiscrete({ pose, act, facing, behind, visible: true });
      applyTransform(x, y, scale, isWalking ? scrollY * 0.045 : 0, isWalking);
    };

    const onScrollOrResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeState);
    };

    const t0 = setTimeout(computeState, 60);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      clearTimeout(t0);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pup-layer"
      data-front={pup.behind ? "false" : "true"}
      style={{ opacity: pup.visible ? 1 : 0 }}
    >
      <PupActor
        ref={actorRef}
        bodyRef={bodyRef}
        pose={pup.pose}
        act={pup.act}
        facing={pup.facing}
      />
    </div>
  );
}
