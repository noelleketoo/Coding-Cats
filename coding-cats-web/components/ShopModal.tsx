"use client";

import { useState } from "react";
import { SHOP_ITEMS, ShopItem } from "@/lib/shopItems";
import { purchaseItem, placeItem, getState } from "@/lib/storage";

interface ShopModalProps {
  onClose: () => void;
  onPurchase: () => void;
  currency: number;
}

type ShopCategory = "all" | "flowers" | "plants" | "mushrooms" | "decor";

const CATEGORY_LABELS: Record<ShopCategory, string> = {
  all: "All",
  flowers: "Flowers",
  plants: "Plants",
  mushrooms: "Mushrooms",
  decor: "Decor",
};

function spritePath(item: ShopItem): string {
  const col = (item.spriteX - 16) / 32;
  const row = (item.spriteY - 16) / 32;
  return `/sprites/shop/${col}_${row}.png`;
}

export default function ShopModal({ onClose, onPurchase, currency }: ShopModalProps) {
  const [coins, setCoins] = useState(currency);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [ownedCounts, setOwnedCounts] = useState<Record<string, number>>(() => {
    return getState().purchasedItems;
  });
  const [category, setCategory] = useState<ShopCategory>("all");

  const filteredItems = category === "all"
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter((item) => item.category === category);

  function handleBuy(item: ShopItem) {
    if (coins < item.price) {
      setToast({ msg: "Not enough coins!", type: "error" });
      setTimeout(() => setToast(null), 1500);
      return;
    }

    const { success, state } = purchaseItem(item.id, item.price);
    if (success) {
      const randomX = 10 + Math.random() * 80;
      const randomY = 10 + Math.random() * 30;
      placeItem(item.id, randomX, randomY);

      setCoins(state.currency);
      setOwnedCounts({ ...getState().purchasedItems });
      setToast({ msg: `Bought ${item.name}!`, type: "success" });
      onPurchase();
      setTimeout(() => setToast(null), 1500);
    }
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-200">
          <h2 className="text-2xl font-bold text-green-800">Flower Shop</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-lg">
              <span className="text-yellow-500">&#x1FA99;</span>
              <span className="font-bold text-green-700">{coins}</span>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex gap-1 px-6 pt-3 pb-2">
          {(Object.keys(CATEGORY_LABELS) as ShopCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
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
                <div
                  key={item.id}
                  className="border-2 border-green-200 rounded-xl p-3 flex flex-col items-center gap-1.5 bg-green-50/50 hover:border-green-400 transition-colors"
                >
                  <img
                    src={spritePath(item)}
                    alt={item.name}
                    width={48}
                    height={48}
                    style={{ imageRendering: "pixelated" }}
                    draggable={false}
                  />

                  <span className="font-bold text-green-800 text-xs text-center leading-tight">
                    {item.name}
                  </span>

                  {owned > 0 && (
                    <span className="text-[10px] text-green-600">
                      Owned: {owned}
                    </span>
                  )}

                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                    className={`w-full py-1.5 rounded-lg font-bold text-xs transition-colors ${
                      canAfford
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    &#x1FA99; {item.price}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
