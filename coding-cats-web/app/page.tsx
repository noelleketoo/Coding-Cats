"use client";

import { useEffect, useState } from "react";
import { getState, hasSolvedToday, initState, placeItem } from "@/lib/storage";
import { Category } from "@/lib/problems";
import { ShopItem } from "@/lib/shopItems";
import TrackerDropdown from "@/components/TrackerDropdown";
import SolveModal from "@/components/SolveModal";
import ShopModal from "@/components/ShopModal";
import FieldCat from "@/components/FieldCat";
import FieldFlowers from "@/components/FieldFlowers";
import LofiPlayer from "@/components/LofiPlayer";
import CheatSheetModal from "@/components/CheatSheetModal";
import AboutModal from "@/components/AboutModal";
import HatShopModal from "@/components/HatShopModal";
import HistoryModal from "@/components/HistoryModal";

const CATEGORY_LABELS: Record<Category, string> = {
  arrays: "Arrays",
  strings: "Strings",
  math: "Math",
  hashmap: "HashMap",
  dp: "Dynamic Programming",
};

// Spread extra cats at fixed positions so they don't all stack
const CAT_POSITIONS: Record<Category, number> = {
  arrays: 20,
  strings: 35,
  math: 65,
  hashmap: 80,
  dp: 50,
};

export default function Home() {
  const [state, setState] = useState<ReturnType<typeof getState> | null>(null);
  const [showSolve, setShowSolve] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [placingItem, setPlacingItem] = useState<ShopItem | null>(null);
  const [previewPos, setPreviewPos] = useState<{ x: number; y: number } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [newCatUnlock, setNewCatUnlock] = useState<Category | null>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHatShop, setShowHatShop] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    initState().then((s) => {
      setState(s);
      if (!hasSolvedToday()) {
        setShowSolve(true);
      }
    });
  }, []);

  function refreshState(newCat: Category | null = null) {
    setState(getState());
    if (newCat) {
      setNewCatUnlock(newCat);
      setTimeout(() => setNewCatUnlock(null), 4000);
    }
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

  const unlockedCategories = (Object.keys(state.categoryProgress) as Category[]).filter(
    (cat) => (state.categoryProgress[cat] || 0) >= 10
  );

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Pixel art background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/sprites/background.png)", imageRendering: "pixelated" }}
      />

      {/* Top bar */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between px-4 py-0.5 bg-yellow-800 border-4 border-yellow-600 rounded-3xl">
        <span className="text-white text-2xl" style={{ fontFamily: "var(--font-press-start)" }}>Coding Cats</span>
        <div className="flex items-center gap-3 text-white relative">

          <LofiPlayer />

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
              <div className="absolute right-0 top-12 flex flex-col gap-2 bg-amber-900/90 border-2 border-amber-700 rounded-xl p-3 min-w-[160px] z-20 items-center">
                <button
                  onClick={() => { setShowShop(true); setShowSettings(false); }}
                  className="w-full px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors text-center"
                >
                  Shop
                </button>
                <button
                  onClick={() => { setShowSolve(true); setShowSettings(false); }}
                  className="w-full px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors text-center"
                >
                  + More Problems
                </button>
                <TrackerDropdown categoryProgress={state.categoryProgress} />
                <button
                  onClick={() => { setShowCheatSheet(true); setShowSettings(false); }}
                  className="w-full px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors text-center"
                >
                  Cheat Sheet
                </button>
<button
                  onClick={() => { setShowHistory(true); setShowSettings(false); }}
                  className="w-full px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors text-center"
                >
                  History
                </button>
                <button
                  onClick={() => { setShowAbout(true); setShowSettings(false); }}
                  className="w-full px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded text-sm font-medium transition-colors text-center"
                >
                  About
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cat unlock celebration banner */}
      {newCatUnlock && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-2xl font-bold shadow-2xl text-lg animate-bounce pointer-events-none">
          New cat unlocked: {CATEGORY_LABELS[newCatUnlock]}!
        </div>
      )}

      {/* Field with cats and flowers */}
      <div
        className="absolute inset-0"
        style={{ cursor: placingItem ? "crosshair" : undefined }}
        onMouseMove={handleFieldMouseMove}
        onClick={handleFieldClick}
      >
        <FieldFlowers placedItems={state.placedItems} />

        {/* Main cat */}
        <FieldCat hat={state.equippedHat} />

        {/* Extra cats for each unlocked category */}
        {unlockedCategories.map((cat) => (
          <FieldCat key={cat} initialX={CAT_POSITIONS[cat]} />
        ))}

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
          onClose={() => { setShowShop(false); refreshState(); }}
          onPurchase={handlePurchase}
          currency={state.currency}
          equippedHat={state.equippedHat}
        />
      )}

      {/* Cheat sheet modal */}
      {showCheatSheet && <CheatSheetModal onClose={() => setShowCheatSheet(false)} />}

      {/* About modal */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* Hat shop modal */}
      {showHatShop && state && (
        <HatShopModal
          onClose={() => setShowHatShop(false)}
          onEquip={refreshState}
          currency={state.currency}
          equippedHat={state.equippedHat}
        />
      )}

      {/* History modal */}
      {showHistory && state && (
        <HistoryModal
          history={state.solvedHistory ?? []}
          onClose={() => setShowHistory(false)}
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
