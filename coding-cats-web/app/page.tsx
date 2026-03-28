"use client";

import { useEffect, useState } from "react";
import { getState, hasSolvedToday, initState, placeItem } from "@/lib/storage";
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
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    initState().then((s) => {
      setState(s);
      if (!hasSolvedToday()) {
        setShowSolve(true);
      }
    });
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
    <div className="relative h-screen overflow-hidden">
      {/* Pixel art background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/sprites/background.png)", imageRendering: "pixelated" }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4">
        <div style={{ width: "800px", height: "500px", overflow: "hidden", position: "relative" }}>
          <img
            src="/sprites/top-bar.png"
            alt=""
            style={{ width: "800px", height: "auto", imageRendering: "pixelated", position: "absolute", top: "-350px" }}
          />
        </div>
        <div className="flex items-center gap-3 text-white relative" style={{ alignSelf: "flex-start", marginTop: "-10px" }}>

          {/* Currency */}
          <div className="flex items-center gap-1.5">
            <img src="/sprites/coin.png" alt="coin" width={36} height={36} style={{ imageRendering: "pixelated" }} />
            <span className="font-medium">{state.currency}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5">
            <img src="/sprites/fire.png" alt="streak" width={36} height={36} style={{ imageRendering: "pixelated" }} />
            <span className="font-medium">{state.streak.count}</span>
          </div>

          {/* Settings button */}
          <div className="relative">
            <button onClick={() => setShowSettings(v => !v)}>
              <img src="/sprites/settings-button.png" alt="settings" width={80} height={80} style={{ imageRendering: "pixelated" }} />
            </button>
            {showSettings && (
              <div className="absolute right-0 top-12 flex flex-col gap-2 bg-amber-900/90 border-2 border-amber-700 rounded-xl p-3 min-w-[160px] z-20">
                <button
                  onClick={() => { setShowShop(true); setShowSettings(false); }}
                  className="px-3 py-1.5 bg-green-500 hover:bg-green-400 rounded text-sm font-medium transition-colors text-white"
                >
                  Shop
                </button>
                <button
                  onClick={() => { setShowSolve(true); setShowSettings(false); }}
                  className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors"
                >
                  + More Problems
                </button>
                <TrackerDropdown categoryProgress={state.categoryProgress} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Field with cat and flowers */}
      <div
        className="absolute inset-0"
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
            width={96}
            height={96}
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
