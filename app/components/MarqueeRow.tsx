"use client";

import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface Item {
  icon: string;
  text: string;
}

export default function MarqueeRow({
  items,
  reverse = false,
  speed = 0.4,
}: {
  items: Item[];
  reverse?: boolean;
  speed?: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const scrollWidth = row.scrollWidth;

    // ⭐ Start position (SimpleClaw logic)
    let position = reverse ? -scrollWidth / 2 : 0;

    // Set initial transform
    row.style.transform = `translateX(${position}px)`;

    function animate() {
      position += reverse ? speed : -speed;

      // ⭐ Reset when half scrolled (SimpleClaw logic)
      if (!reverse && position <= -scrollWidth / 2) {
        position = 0;
      }

      if (reverse && position >= 0) {
        position = -scrollWidth / 2;
      }
      
if (!row) return;
      row.style.transform = `translateX(${position}px)`;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [reverse, speed]);

  return (
    <div className="overflow-hidden py-3">
      <div
        ref={rowRef}
        className="flex gap-4 whitespace-nowrap px-4"
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
          >
            <Icon icon={item.icon} width={18} />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}