"use client";

import { useEffect, useState } from "react";
import { getState, hasSolvedToday, placeItem } from "@/lib/storage";
import { ShopItem } from "@/lib/shopItems";
import TrackerDropdown from "@/components/TrackerDropdown";
import SolveModal from "@/components/SolveModal";
import ShopModal from "@/components/ShopModal";
import FieldCat from "@/components/FieldCat";
import FieldFlowers from "@/components/FieldFlowers";

export default function Home() {
  const [state, setState] = useState<ReturnType<typeof getState> | null>(null);
  const [showSolve, setShowSolve] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [placingItem, setPlacingItem] = useState<ShopItem | null>(null);
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number } | null>(null);

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

  function handlePurchase(item: ShopItem) {
    setShowShop(false);
    setPlacingItem(item);
    refreshState();
  }

  function handleFieldMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!placingItem) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPreviewPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((rect.bottom - e.clientY) / rect.height) * 100,
    });
  }

  function handleFieldClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!placingItem) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((rect.bottom - e.clientY) / rect.height) * 100;
    placeItem(placingItem.id, x, y);
    setPlacingItem(null);
    setPreviewPos(null);
    refreshState();
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
            <img src="/sprites/coin.png" alt="coin" width={20} height={20} style={{ imageRendering: "pixelated" }} />
            <span className="font-medium">{state.currency}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5">
            <img src="/sprites/fire.png" alt="streak" width={20} height={20} style={{ imageRendering: "pixelated" }} />
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
      <div
        className="flex-1 relative"
        style={{ cursor: placingItem ? "crosshair" : undefined }}
        onMouseMove={handleFieldMouseMove}
        onClick={handleFieldClick}
      >
        <FieldFlowers placedItems={state.placedItems} />
        <FieldCat />

        {/* Placement preview */}
        {placingItem && previewPos && (
          <img
            src={placingItem.imageSrc}
            alt={placingItem.name}
            width={48}
            height={48}
            className="absolute pointer-events-none opacity-70"
            style={{
              left: `${previewPos.x}%`,
              bottom: `${previewPos.y}%`,
              transform: "translateX(-50%)",
              imageRendering: "pixelated",
            }}
          />
        )}

        {/* Hint banner */}
        {placingItem && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/70 text-white px-4 py-2 rounded-xl text-sm font-bold pointer-events-none">
            <img src={placingItem.imageSrc} alt="" width={24} height={24} style={{ imageRendering: "pixelated" }} />
            Click to place {placingItem.name}
          </div>
        )}
      </div>

      {/* Shop modal */}
      {showShop && (
        <ShopModal
          onClose={() => setShowShop(false)}
          onPurchase={handlePurchase}
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
