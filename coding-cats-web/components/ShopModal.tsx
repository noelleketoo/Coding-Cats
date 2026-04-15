"use client";

import { useState } from "react";
import { SHOP_ITEMS, ShopItem } from "@/lib/shopItems";
import { HATS } from "@/lib/hats";
import { purchaseItem, getState, equipHat } from "@/lib/storage";

interface ShopModalProps {
  onClose: () => void;
  onPurchase: (item: ShopItem) => void;
  currency: number;
  equippedHat: string | null;
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

const HAT_EMOJIS: Record<string, string> = {
  "party-hat": "🎉",
  "witch-hat": "🧙",
  "crown": "👑",
  "bow": "🎀",
  "santa-hat": "🎅",
};

export default function ShopModal({ onClose, onPurchase, currency, equippedHat }: ShopModalProps) {
  const [tab, setTab] = useState<ShopTab>("decor");
  const [coins, setCoins] = useState(currency);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [ownedCounts, setOwnedCounts] = useState<Record<string, number>>(() => getState().purchasedItems);
  const [category, setCategory] = useState<ShopCategory>("all");
  const [equipped, setEquipped] = useState(equippedHat);

  const filteredItems = category === "all"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => item.category === category);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 1500);
  }

  function handleBuy(item: ShopItem) {
    if (coins < item.price) {
      showToast("Not enough coins!", "error");
      return;
    }
    const { success, state } = purchaseItem(item.id, item.price);
    if (success) {
      setCoins(state.currency);
      setOwnedCounts({ ...getState().purchasedItems });
      onPurchase(item);
    }
  }

  function handleBuyHat(hatId: string, price: number) {
    if (coins < price) { showToast("Not enough coins!", "error"); return; }
    const { success, state } = purchaseItem(hatId, price);
    if (success) {
      setCoins(state.currency);
      setOwnedCounts({ ...state.purchasedItems });
      showToast("Hat purchased!");
    }
  }

  function handleEquipHat(hatId: string) {
    const next = equipped === hatId ? null : hatId;
    equipHat(next);
    setEquipped(next);
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
            {/* Category filter */}
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
                        onClick={() => handleBuy(item)}
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
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {HATS.map((hat) => {
                const isOwned = (ownedCounts[hat.id] || 0) > 0;
                const isEquipped = equipped === hat.id;
                const canAfford = coins >= hat.price;
                return (
                  <div key={hat.id} className={`border-2 rounded-xl p-3 flex flex-col items-center gap-2 transition-colors ${isEquipped ? "border-yellow-500 bg-yellow-50" : "border-yellow-200 bg-white hover:border-yellow-400"}`}>
                    <span className="text-4xl">{HAT_EMOJIS[hat.id]}</span>
                    <span className="text-xs text-yellow-900 font-bold text-center">{hat.name}</span>
                    {!isOwned ? (
                      <button
                        onClick={() => handleBuyHat(hat.id, hat.price)}
                        disabled={!canAfford}
                        className={`w-full py-1.5 rounded-lg font-bold text-xs transition-colors ${canAfford ? "bg-yellow-400 hover:bg-yellow-300 text-yellow-900" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                      >
                        <img src="/sprites/coin.png" alt="coin" width={14} height={14} style={{ imageRendering: "pixelated", display: "inline", verticalAlign: "middle", marginRight: 2 }} />{hat.price}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEquipHat(hat.id)}
                        className={`w-full py-1.5 rounded-lg font-bold text-xs transition-colors ${isEquipped ? "bg-green-500 text-white" : "bg-yellow-400 hover:bg-yellow-300 text-yellow-900"}`}
                      >
                        {isEquipped ? "Equipped!" : "Equip"}
                      </button>
                    )}
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
