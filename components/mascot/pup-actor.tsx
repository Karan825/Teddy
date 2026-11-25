"use client";

import { useState, useEffect, useCallback, forwardRef } from "react";
import { PupSvg } from "./pup-svg";

interface PupActorProps {
  pose?: "peek" | "walk" | "sit" | "bow" | "snug";
  act?: "peekaboo" | "treadmill" | "tilt" | "basket" | null;
  facing?: "right" | "left";
  walkPhase?: number;
  message?: string | null;
  bodyRef?: React.RefObject<HTMLDivElement | null>;
}

const cuteMessages = [
  "Woof! Ready to cuddle?",
  "Come visit us in Dubai!",
  "Teacup pups are waiting!",
  "I love tummy rubs!",
  "Every puppy is family!",
  "Have you seen the teacups?",
];

export const PupActor = forwardRef<HTMLDivElement, PupActorProps>(function PupActor(
  { pose = "sit", act, facing = "right", walkPhase = 0, message: initialMessage = null, bodyRef },
  ref
) {
  const [blinking, setBlinking] = useState(false);
  const [wagging, setWagging] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(initialMessage);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 180);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialMessage) {
      const showTimer = setTimeout(() => {
        setActiveMessage(initialMessage);
        setShowMessage(true);
      }, 0);
      const hideTimer = setTimeout(() => setShowMessage(false), 4000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [initialMessage]);

  const handlePupClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setWagging(true);
    setTimeout(() => setWagging(false), 2400);

    const randomMsg = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
    setActiveMessage(randomMsg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3500);

    const newId = Date.now();
    setHearts((prev) => [
      ...prev,
      { id: newId, x: Math.random() * 40 - 20, y: -20 },
      { id: newId + 1, x: Math.random() * 40 - 20, y: -35 },
    ]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newId && h.id !== newId + 1));
    }, 1200);
  }, []);

  return (
    <div
      ref={ref}
      className="pup-actor pointer-events-auto cursor-pointer select-none"
      onClick={handlePupClick}
      title="Click Teddy for cuddles!"
    >
      {/* Speech bubble */}
      <span className="pup-bubble-at" style={{ left: "50%", top: "-12px" }}>
        <span className="pup-bubble" data-show={showMessage ? "true" : "false"}>
          {activeMessage}
        </span>
      </span>

      {/* Heart explosions */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pup-heart animate-bounce"
          style={{
            left: `calc(50% + ${h.x}px)`,
            top: `${40 + h.y}px`,
          }}
        >
          ❤️
        </span>
      ))}

      {/* Puppet SVG Rig (transform-origin: 0 0 in original.css) */}
      <div ref={bodyRef} className="pup-actor__body">
        <PupSvg
          pose={pose}
          act={act}
          facing={facing}
          blinking={blinking}
          wagging={wagging}
          sleeping={false}
          walkPhase={walkPhase}
        />
      </div>
    </div>
  );
});
