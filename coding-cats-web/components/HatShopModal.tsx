"use client";

import { useState } from "react";
import { HATS } from "@/lib/hats";
import { getState, purchaseItem, equipHat } from "@/lib/storage";

const HAT_EMOJIS: Record<string, string> = {
  "party-hat": "🎉",
  "witch-hat": "🧙",
  "crown": "👑",
  "bow": "🎀",
  "santa-hat": "🎅",
};

interface HatShopModalProps {
  onClose: () => void;
  onEquip: () => void;
  currency: number;
  equippedHat: string | null;
}

export default function HatShopModal({ onClose, onEquip, currency, equippedHat }: HatShopModalProps) {
  const [coins, setCoins] = useState(currency);
  const [equipped, setEquipped] = useState(equippedHat);
  const [owned, setOwned] = useState<Record<string, number>>(() => getState().purchasedItems);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  }

  function handleBuy(hatId: string, price: number) {
    const { success, state } = purchaseItem(hatId, price);
    if (success) {
      setCoins(state.currency);
      setOwned({ ...state.purchasedItems });
      showToast("Purchased!");
    } else {
      showToast("Not enough coins!");
    }
  }

  function handleEquip(hatId: string) {
    const newHat = equipped === hatId ? null : hatId;
    equipHat(newHat);
    setEquipped(newHat);
    onEquip();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-xl font-bold shadow-lg text-white bg-yellow-600">
          {toast}
        </div>
      )}
      <div className="relative bg-amber-50 border-4 border-yellow-700 rounded-2xl shadow-2xl w-[90vw] max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 bg-yellow-800 border-b-4 border-yellow-700">
          <h2 className="text-white text-xs">Cat Hats</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-200 text-xs">
              <img src="/sprites/coin.png" alt="coin" width={16} height={16} style={{ imageRendering: "pixelated" }} />
              {coins}
            </div>
            <button onClick={onClose} className="text-yellow-200 hover:text-white text-lg">x</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-3 gap-3">
          {HATS.map((hat) => {
            const isOwned = (owned[hat.id] || 0) > 0;
            const isEquipped = equipped === hat.id;
            const canAfford = coins >= hat.price;

            return (
              <div key={hat.id} className={`border-2 rounded-xl p-3 flex flex-col items-center gap-2 ${isEquipped ? "border-yellow-500 bg-yellow-100" : "border-yellow-200 bg-white"}`}>
                <span className="text-4xl">{HAT_EMOJIS[hat.id]}</span>
                <span className="text-xs text-yellow-900 font-bold text-center">{hat.name}</span>

                {!isOwned ? (
                  <button
                    onClick={() => handleBuy(hat.id, hat.price)}
                    disabled={!canAfford}
                    className={`w-full py-1 rounded text-xs font-bold transition-colors ${canAfford ? "bg-yellow-400 hover:bg-yellow-300 text-yellow-900" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    <img src="/sprites/coin.png" alt="" width={12} height={12} style={{ imageRendering: "pixelated", display: "inline", verticalAlign: "middle", marginRight: 2 }} />
                    {hat.price}
                  </button>
                ) : (
                  <button
                    onClick={() => handleEquip(hat.id)}
                    className={`w-full py-1 rounded text-xs font-bold transition-colors ${isEquipped ? "bg-green-500 text-white" : "bg-yellow-400 hover:bg-yellow-300 text-yellow-900"}`}
                  >
                    {isEquipped ? "Equipped!" : "Equip"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
