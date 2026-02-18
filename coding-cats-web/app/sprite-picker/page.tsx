"use client";

import { useState } from "react";
import { SHOP_ITEMS, SHEET_W, SHEET_H, SPRITE_SIZE } from "@/lib/shopItems";

const COLS = Math.floor(SHEET_W / 32);
const ROWS = Math.floor(SHEET_H / 32);

export default function SpritePicker() {
  const [hovered, setHovered] = useState<{ col: number; row: number } | null>(null);
  const [selected, setSelected] = useState<{ col: number; row: number } | null>(null);
  const [scale, setScale] = useState(0.5);

  function handleClick(col: number, row: number) {
    setSelected({ col, row });
    const x = 16 + 32 * col;
    const y = 16 + 32 * row;
    // Copy the pos() call to clipboard
    navigator.clipboard.writeText(`...pos(${col}, ${row})`).catch(() => {});
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-2">Sprite Picker</h1>
      <p className="text-gray-400 mb-1">
        Click a sprite to get its <code className="bg-gray-700 px-1 rounded">pos(col, row)</code> value (copied to clipboard).
      </p>
      <p className="text-gray-400 mb-4">
        Then paste it into <code className="bg-gray-700 px-1 rounded">shopItems.ts</code> to replace the wrong coordinates.
      </p>

      {/* Zoom controls */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-400">Zoom:</span>
        {[0.5, 0.75, 1, 1.5, 2, 3].map((z) => (
          <button
            key={z}
            onClick={() => setScale(z)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              scale === z ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {z}x
          </button>
        ))}
      </div>

      {/* Info bar */}
      <div className="flex gap-6 mb-4 text-sm">
        {hovered && (
          <span className="text-yellow-300">
            Hovering: col={hovered.col}, row={hovered.row} (x={16 + 32 * hovered.col}, y={16 + 32 * hovered.row})
          </span>
        )}
        {selected && (
          <span className="text-green-400">
            Selected: pos({selected.col}, {selected.row}) — copied!
          </span>
        )}
      </div>

      {/* Current shop items reference */}
      <details className="mb-6">
        <summary className="cursor-pointer text-blue-400 hover:text-blue-300 font-medium">
          Current shop items (click to expand)
        </summary>
        <div className="mt-2 grid grid-cols-5 gap-2 max-h-60 overflow-y-auto bg-gray-800 p-3 rounded-lg">
          {SHOP_ITEMS.map((item) => {
            const col = (item.spriteX - 16) / 32;
            const row = (item.spriteY - 16) / 32;
            return (
              <div key={item.id} className="flex items-center gap-2 text-xs bg-gray-700 rounded p-2">
                <div
                  style={{
                    width: SPRITE_SIZE,
                    height: SPRITE_SIZE,
                    backgroundImage: "url(/sprites/flowers.png)",
                    backgroundPosition: `-${item.spriteX}px -${item.spriteY}px`,
                    backgroundSize: `${SHEET_W}px ${SHEET_H}px`,
                    backgroundRepeat: "no-repeat",
                    imageRendering: "pixelated",
                    transform: "scale(2)",
                    transformOrigin: "left center",
                    flexShrink: 0,
                  }}
                />
                <span className="ml-3 truncate">{item.name} ({col},{row})</span>
              </div>
            );
          })}
        </div>
      </details>

      {/* Sprite sheet with clickable grid */}
      <div className="overflow-auto max-w-full max-h-[70vh] border-2 border-gray-600 rounded-lg">
      <div
        className="relative inline-block"
        style={{ width: SHEET_W * scale, height: SHEET_H * scale }}
      >
        {/* The sprite sheet image */}
        <img
          src="/sprites/flowers.png"
          alt="Flower sprites"
          style={{
            width: SHEET_W * scale,
            height: SHEET_H * scale,
            imageRendering: "pixelated",
          }}
          draggable={false}
        />

        {/* Clickable grid overlay */}
        {Array.from({ length: COLS }).map((_, col) =>
          Array.from({ length: ROWS }).map((_, row) => {
            const isSelected = selected?.col === col && selected?.row === row;
            const isHovered = hovered?.col === col && hovered?.row === row;
            // Check if any shop item uses this position
            const usedBy = SHOP_ITEMS.find(
              (item) => item.spriteX === 16 + 32 * col && item.spriteY === 16 + 32 * row
            );

            return (
              <div
                key={`${col}-${row}`}
                className="absolute cursor-pointer"
                style={{
                  left: (16 + 32 * col) * scale,
                  top: (16 + 32 * row) * scale,
                  width: SPRITE_SIZE * scale,
                  height: SPRITE_SIZE * scale,
                  border: isSelected
                    ? "2px solid #22c55e"
                    : isHovered
                    ? "2px solid #facc15"
                    : usedBy
                    ? "2px solid #3b82f6"
                    : "1px solid transparent",
                  backgroundColor: isSelected
                    ? "rgba(34,197,94,0.2)"
                    : isHovered
                    ? "rgba(250,204,21,0.15)"
                    : usedBy
                    ? "rgba(59,130,246,0.1)"
                    : "transparent",
                }}
                onMouseEnter={() => setHovered({ col, row })}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(col, row)}
                title={usedBy ? `Used by: ${usedBy.name}` : `pos(${col}, ${row})`}
              />
            );
          })
        )}
      </div>
      </div>
    </div>
  );
}
