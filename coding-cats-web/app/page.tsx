"use client";

import { useEffect, useState } from "react";
import { getState, hasSolvedToday } from "@/lib/storage";
import TrackerDropdown from "@/components/TrackerDropdown";
import SolveModal from "@/components/SolveModal";
import ShopModal from "@/components/ShopModal";
import FieldCat from "@/components/FieldCat";
import FieldFlowers from "@/components/FieldFlowers";

export default function Home() {
  const [state, setState] = useState<ReturnType<typeof getState> | null>(null);
  const [showSolve, setShowSolve] = useState(false);
  const [showShop, setShowShop] = useState(false);

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
          <button
            onClick={() => setShowShop(true)}
            className="px-3 py-1.5 bg-green-500 hover:bg-green-400 rounded text-sm font-medium transition-colors"
          >
            Shop
          </button>

          {/* Tracker dropdown */}
          <TrackerDropdown categoryProgress={state.categoryProgress} />
        </div>
      </div>

      {/* Field with cat and flowers */}
      <div className="flex-1 relative">
        <FieldFlowers placedItems={state.placedItems} />
        <FieldCat />
      </div>

      {/* Shop modal */}
      {showShop && (
        <ShopModal
          onClose={() => setShowShop(false)}
          onPurchase={refreshState}
          currency={state.currency}
        />
      )}

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
