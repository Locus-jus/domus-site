"use client";

import { useEffect, useRef } from "react";

export default function PhysicsCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;
    if (!cursor || !inner) return;

    let targetX = -100;
    let targetY = -100;
    let x = targetX;
    let y = targetY;
    let previousX = targetX;
    let previousY = targetY;
    let innerX = 0;
    let innerY = 0;
    let innerVelocityX = 0;
    let innerVelocityY = 0;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      innerVelocityX += (event.clientX - previousX) * 0.12;
      innerVelocityY += (event.clientY - previousY) * 0.12;
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      innerVelocityX *= 0.86;
      innerVelocityY *= 0.86;
      innerX += innerVelocityX - innerX * 0.16;
      innerY += innerVelocityY - innerY * 0.16;
      cursor.style.transform = `translate3d(${x - 22}px, ${y - 22}px, 0)`;
      inner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="physics-cursor fixed left-0 top-0 z-[100] h-11 w-11 rounded-full border border-domus-primary/60 bg-domus-primary/10 pointer-events-none">
      <div ref={innerRef} className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-domus-accent shadow-[0_0_14px_rgba(201,168,76,0.65)]" />
    </div>
  );
}
