"use client";

import { useEffect, useState } from "react";
import { getState, hasSolvedToday } from "@/lib/storage";
import TrackerDropdown from "@/components/TrackerDropdown";
import SolveModal from "@/components/SolveModal";

export default function Home() {
  const [state, setState] = useState<ReturnType<typeof getState> | null>(null);
  const [showSolve, setShowSolve] = useState(false);

  useEffect(() => {
    const s = getState();
    setState(s);

    // Auto-show solve popup every visit until they've submitted today
    if (!hasSolvedToday()) {
      setShowSolve(true);
    }
  }, []);

  function refreshState() {
    setState(getState());
  }

  if (!state) return null;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Pixel art background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/sprites/background.png)", imageRendering: "pixelated" }}
      />

      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-green-700/85 text-white">
        <h1 className="text-xl font-bold">Coding Cats</h1>

        <div className="flex items-center gap-4">
          {/* Currency */}
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-300">&#x1FA99;</span>
            <span className="font-medium">{state.currency}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5">
            <span className="text-orange-300">&#x1F525;</span>
            <span className="font-medium">{state.streak.count}</span>
          </div>

          {/* Shop button */}
          <button className="px-3 py-1.5 bg-green-500 hover:bg-green-400 rounded text-sm font-medium transition-colors">
            Shop
          </button>

          {/* Tracker dropdown */}
          <TrackerDropdown categoryProgress={state.categoryProgress} />
        </div>
      </div>

      {/* Main content — cat landscape */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div
          className="w-40 h-40 bg-white/50 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
        >
          <div
            className="w-8 h-8"
            style={{
              backgroundImage: "url(/sprites/cats.png)",
              backgroundPosition: "0 0",
              backgroundSize: "256px 320px",
              imageRendering: "pixelated",
              transform: "scale(4)",
            }}
          />
        </div>

        <p className="text-white text-lg font-medium drop-shadow-md">
          {state.solvedProblems.length === 0
            ? "Solve a problem to start collecting cats!"
            : `You've solved ${state.solvedProblems.length} problem${state.solvedProblems.length === 1 ? "" : "s"}!`}
        </p>

        <button
          onClick={() => setShowSolve(true)}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          Solve a Problem
        </button>
      </div>

      {/* Solve modal */}
      {showSolve && (
        <SolveModal
          onClose={() => setShowSolve(false)}
          onSolved={refreshState}
        />
      )}
    </div>
  );
}
