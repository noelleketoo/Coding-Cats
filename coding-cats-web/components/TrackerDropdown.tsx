"use client";

import { useState, useRef, useEffect } from "react";
import { Category } from "@/lib/problems";
import { BADGES } from "@/lib/badges";

interface TrackerDropdownProps {
  categoryProgress: Record<Category, number>;
  earnedBadges: number[];
  streakCount: number;
}

const CATEGORY_LABELS: Record<Category, string> = {
  arrays: "Arrays",
  strings: "Strings",
  math: "Math",
  hashmap: "HashMap",
  dp: "Dynamic Programming",
};

export default function TrackerDropdown({ categoryProgress, earnedBadges, streakCount }: TrackerDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors"
      >
        Tracker
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-purple-100 p-4 z-50">
          <h3 className="font-bold text-purple-800 mb-3">Cat Progress</h3>
          <p className="text-xs text-gray-500 mb-3">Solve 10 problems in a category to unlock that cat!</p>

          <div className="space-y-3">
            {(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([key, label]) => {
              const count = categoryProgress[key] || 0;
              const unlocked = count >= 10;

              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-xs text-purple-600 font-medium">
                      {count}/10 {unlocked ? " - Unlocked!" : ""}
                    </span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        unlocked ? "bg-green-500" : "bg-purple-500"
                      }`}
                      style={{ width: `${Math.min((count / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Streak badges section */}
          <div className="mt-5 pt-4 border-t border-purple-100">
            <h3 className="font-bold text-purple-800 mb-1">Streak Badges</h3>
            <p className="text-xs text-gray-500 mb-3">
              Current streak: {streakCount} {streakCount === 1 ? "day" : "days"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {BADGES.map((badge) => {
                const earned = earnedBadges.includes(badge.streak);
                return (
                  <div
                    key={badge.streak}
                    className="flex flex-col items-center gap-1"
                    title={badge.label}
                  >
                    <div className={`rounded-lg p-1 ${earned ? "bg-yellow-100 border-2 border-yellow-400" : "bg-gray-100 border-2 border-gray-200"}`}>
                      <img
                        src={badge.imageSrc}
                        alt={badge.label}
                        width={48}
                        height={48}
                        style={{
                          imageRendering: "pixelated",
                          filter: earned ? "none" : "grayscale(100%) opacity(40%)",
                        }}
                      />
                    </div>
                    <span className={`text-[9px] text-center leading-tight ${earned ? "text-yellow-700 font-bold" : "text-gray-400"}`}>
                      {badge.streak}d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
