"use client";

import { PlacedItem } from "@/lib/storage";
import { getShopItem } from "@/lib/shopItems";

interface FieldFlowersProps {
  placedItems: PlacedItem[];
}

function spritePath(spriteX: number, spriteY: number): string {
  const col = (spriteX - 16) / 32;
  const row = (spriteY - 16) / 32;
  return `/sprites/shop/${col}_${row}.png`;
}

export default function FieldFlowers({ placedItems }: FieldFlowersProps) {
  return (
    <>
      {placedItems.map((placed, i) => {
        const item = getShopItem(placed.itemId);
        if (!item) return null;

        return (
          <img
            key={i}
            src={spritePath(item.spriteX, item.spriteY)}
            alt={item.name}
            width={40}
            height={40}
            draggable={false}
            className="absolute"
            style={{
              left: `${placed.x}%`,
              bottom: `${placed.y}%`,
              transform: "translateX(-50%)",
              imageRendering: "pixelated",
            }}
          />
        );
      })}
    </>
  );
}
