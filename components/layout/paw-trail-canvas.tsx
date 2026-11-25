"use client";

import { useEffect, useRef } from "react";

interface PawPrint {
  x: number;
  y: number;
  angle: number;
  isLeft: boolean;
  opacity: number;
  birth: number;
}

export function PawTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on fine-pointer devices with motion preference
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const paws: PawPrint[] = [];
    let lastX = 0;
    let lastY = 0;
    let isLeftPaw = true;
    let lastSpawnTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Spawn every 45px of cursor movement, throttled
      if (dist > 45 && now - lastSpawnTime > 75) {
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        // Offset alternating left/right paw perpendicular to trajectory
        const perpX = Math.cos(angle - Math.PI / 2) * (isLeftPaw ? -9 : 9);
        const perpY = Math.sin(angle - Math.PI / 2) * (isLeftPaw ? -9 : 9);

        paws.push({
          x: e.clientX + perpX,
          y: e.clientY + perpY,
          angle,
          isLeft: isLeftPaw,
          opacity: 0.22,
          birth: now,
        });

        isLeftPaw = !isLeftPaw;
        lastX = e.clientX;
        lastY = e.clientY;
        lastSpawnTime = now;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Draw single paw
    const drawPaw = (p: PawPrint, currentAlpha: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = `rgba(42, 23, 14, ${currentAlpha})`;

      // Main palm pad
      ctx.beginPath();
      ctx.ellipse(0, 3, 5, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4 toe pads
      const toes = [
        { x: -5, y: -4, r: 1.6 },
        { x: -2, y: -7, r: 1.8 },
        { x: 2, y: -7, r: 1.8 },
        { x: 5, y: -4, r: 1.6 },
      ];

      for (const toe of toes) {
        ctx.beginPath();
        ctx.arc(toe.x, toe.y, toe.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let animId: number;
    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      for (let i = paws.length - 1; i >= 0; i--) {
        const p = paws[i];
        const age = now - p.birth;
        const life = 1400; // 1.4 seconds fade
        if (age >= life) {
          paws.splice(i, 1);
        } else {
          const alpha = p.opacity * (1 - age / life);
          drawPaw(p, alpha);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] size-full"
    />
  );
}
