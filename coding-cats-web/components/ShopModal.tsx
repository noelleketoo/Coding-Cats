"use client";

import { useState } from "react";
import { SHOP_ITEMS, ShopItem } from "@/lib/shopItems";
import { HATS, getHat } from "@/lib/hats";
import { purchaseItem, getState, setCatHat } from "@/lib/storage";
import { Category } from "@/lib/problems";

interface ShopModalProps {
  onClose: () => void;
  onPurchase: (item: ShopItem) => void;
  currency: number;
  equippedHats: Record<string, string>;
  unlockedCategories: Category[];
}

type ShopCategory = "all" | "flowers" | "plants" | "mushrooms" | "decor";
type ShopTab = "decor" | "hats";

const CATEGORY_LABELS: Record<ShopCategory, string> = {
  all: "All",
  flowers: "Flowers",
  plants: "Plants",
  mushrooms: "Mushrooms",
  decor: "Decor",
};

const CAT_LABELS: Record<string, string> = {
  main: "Main Cat",
  arrays: "Arrays Cat",
  strings: "Strings Cat",
  math: "Math Cat",
  hashmap: "HashMap Cat",
  dp: "DP Cat",
};

export default function ShopModal({ onClose, onPurchase, currency, equippedHats, unlockedCategories }: ShopModalProps) {
  const [tab, setTab] = useState<ShopTab>("decor");
  const [coins, setCoins] = useState(currency);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [ownedCounts, setOwnedCounts] = useState<Record<string, number>>(() => getState().purchasedItems);
  const [category, setCategory] = useState<ShopCategory>("all");
  const [catHats, setCatHatsLocal] = useState(equippedHats);
  // After buying a hat, show cat picker
  const [pickingHat, setPickingHat] = useState<string | null>(null);

  const filteredItems = category === "all"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => item.category === category);

  const availableCats = ["main", ...unlockedCategories];

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 1800);
  }

  function handleBuyDecor(item: ShopItem) {
    if (coins < item.price) { showToast("Not enough coins!", "error"); return; }
    const { success, state } = purchaseItem(item.id, item.price);
    if (success) {
      setCoins(state.currency);
      setOwnedCounts({ ...state.purchasedItems });
      onPurchase(item);
    }
  }

  function handleBuyHat(hatId: string, price: number) {
    const alreadyOwned = (ownedCounts[hatId] || 0) > 0;
    if (!alreadyOwned) {
      if (coins < price) { showToast("Not enough coins!", "error"); return; }
      const { success, state } = purchaseItem(hatId, price);
      if (!success) { showToast("Not enough coins!", "error"); return; }
      setCoins(state.currency);
      setOwnedCounts({ ...state.purchasedItems });
    }
    // Open cat picker
    setPickingHat(hatId);
  }

  function handleAssignHat(catId: string) {
    if (!pickingHat) return;
    // If this cat already has this hat, unequip it
    const current = catHats[catId];
    const newHat = current === pickingHat ? null : pickingHat;
    setCatHat(catId, newHat);
    setCatHatsLocal(prev => {
      const next = { ...prev };
      if (newHat === null) delete next[catId];
      else next[catId] = newHat;
      return next;
    });
    setPickingHat(null);
    showToast(newHat ? "Hat equipped!" : "Hat removed!");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-xl font-bold shadow-lg text-white text-lg ${
          toast.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Cat picker overlay */}
      {pickingHat && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setPickingHat(null)} />
          <div className="relative bg-amber-50 border-4 border-yellow-700 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-yellow-900 text-xs font-bold mb-1 text-center">Which cat gets the hat?</h3>
            <div className="flex justify-center mb-4">
              <img src={getHat(pickingHat)?.imageSrc} alt="hat" width={48} height={48} style={{ imageRendering: "pixelated" }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableCats.map((catId) => {
                const hasThisHat = catHats[catId] === pickingHat;
                return (
                  <button
                    key={catId}
                    onClick={() => handleAssignHat(catId)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-colors ${
                      hasThisHat
                        ? "border-green-500 bg-green-100 text-green-800"
                        : "border-yellow-300 bg-white text-yellow-900 hover:bg-yellow-50"
                    }`}
                  >
                    {CAT_LABELS[catId] ?? catId}
                    {hasThisHat && " ✓"}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setPickingHat(null)} className="mt-3 w-full py-1.5 bg-gray-200 hover:bg-gray-300 rounded-xl text-xs font-bold">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-200">
          <h2 className="text-2xl font-bold text-green-800">Shop</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-lg">
              <img src="/sprites/coin.png" alt="coin" width={20} height={20} style={{ imageRendering: "pixelated" }} />
              <span className="font-bold text-green-700">{coins}</span>
            </div>
            <button onClick={onClose} className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors">
              Close
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-3 pb-1 border-b border-gray-100">
          <button
            onClick={() => setTab("decor")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === "decor" ? "bg-green-500 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
          >
            Decorations
          </button>
          <button
            onClick={() => setTab("hats")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === "hats" ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"}`}
          >
            Cat Hats
          </button>
        </div>

        {tab === "decor" && (
          <>
            <div className="flex gap-1 px-6 pt-3 pb-2">
              {(Object.keys(CATEGORY_LABELS) as ShopCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    category === cat ? "bg-green-500 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {filteredItems.map((item) => {
                  const owned = ownedCounts[item.id] || 0;
                  const canAfford = coins >= item.price;
                  return (
                    <div key={item.id} className="border-2 border-green-200 rounded-xl p-3 flex flex-col items-center gap-1.5 bg-green-50/50 hover:border-green-400 transition-colors">
                      <img src={item.imageSrc} alt={item.name} width={48} height={48} style={{ imageRendering: "pixelated" }} draggable={false} />
                      <span className="font-bold text-green-800 text-xs text-center leading-tight">{item.name}</span>
                      {owned > 0 && <span className="text-[10px] text-green-600">Owned: {owned}</span>}
                      <button
                        onClick={() => handleBuyDecor(item)}
                        disabled={!canAfford}
                        className={`w-full py-1.5 rounded-lg font-bold text-xs transition-colors ${canAfford ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                      >
                        <img src="/sprites/coin.png" alt="coin" width={14} height={14} style={{ imageRendering: "pixelated", display: "inline", verticalAlign: "middle", marginRight: 2 }} />{item.price}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {tab === "hats" && (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <p className="text-xs text-gray-400 mb-3">Buy a hat, then pick which cat wears it.</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {HATS.map((hat) => {
                const isOwned = (ownedCounts[hat.id] || 0) > 0;
                const canAfford = coins >= hat.price;
                const equippedOn = Object.entries(catHats).filter(([, h]) => h === hat.id).map(([c]) => CAT_LABELS[c] ?? c);
                return (
                  <div key={hat.id} className={`border-2 rounded-xl p-3 flex flex-col items-center gap-2 transition-colors ${equippedOn.length > 0 ? "border-yellow-500 bg-yellow-50" : "border-yellow-200 bg-white hover:border-yellow-400"}`}>
                    <img src={hat.imageSrc} alt={hat.name} width={48} height={48} style={{ imageRendering: "pixelated" }} />
                    <span className="text-xs text-yellow-900 font-bold text-center">{hat.name}</span>
                    {equippedOn.length > 0 && (
                      <span className="text-[10px] text-yellow-600 text-center">{equippedOn.join(", ")}</span>
                    )}
                    <button
                      onClick={() => handleBuyHat(hat.id, hat.price)}
                      disabled={!isOwned && !canAfford}
                      className={`w-full py-1.5 rounded-lg font-bold text-xs transition-colors ${
                        !isOwned && !canAfford
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-yellow-400 hover:bg-yellow-300 text-yellow-900"
                      }`}
                    >
                      {isOwned ? "Equip" : (
                        <>
                          <img src="/sprites/coin.png" alt="coin" width={12} height={12} style={{ imageRendering: "pixelated", display: "inline", verticalAlign: "middle", marginRight: 2 }} />
                          {hat.price}
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
