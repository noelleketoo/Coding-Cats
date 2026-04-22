"use client";

import { useEffect, useState } from "react";
import { getBadgeForStreak } from "@/lib/badges";

interface BadgeCelebrationModalProps {
  streak: number;
  onClose: () => void;
}

export default function BadgeCelebrationModal({ streak, onClose }: BadgeCelebrationModalProps) {
  const badge = getBadgeForStreak(streak);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setVisible(true), 50);
    // Auto-close after 3.5 seconds
    const closeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 3500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  if (!badge) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center transition-opacity duration-400 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className={`relative flex flex-col items-center gap-5 bg-gradient-to-b from-yellow-300 to-amber-400 border-4 border-yellow-500 rounded-3xl px-10 py-8 shadow-2xl text-center transition-transform duration-400 ${
          visible ? "scale-100" : "scale-75"
        }`}
        style={{ maxWidth: 380 }}
      >
        {/* Stars */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl select-none pointer-events-none">
          ✨ ✨ ✨
        </div>

        <p
          className="text-yellow-900 text-lg leading-tight"
          style={{ fontFamily: "var(--font-press-start)", fontSize: "0.85rem" }}
        >
          Congrats!
        </p>

        <img
          src={badge.imageSrc}
          alt={badge.label}
          width={120}
          height={120}
          style={{ imageRendering: "pixelated" }}
          className="drop-shadow-lg"
        />

        <div className="flex flex-col gap-1">
          <p
            className="text-yellow-900 font-bold"
            style={{ fontFamily: "var(--font-press-start)", fontSize: "0.7rem" }}
          >
            {badge.label}
          </p>
          <p className="text-yellow-800 text-xs mt-1">
            You earned a new badge! Keep it up!
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-1 px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-bold text-sm transition-colors"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
