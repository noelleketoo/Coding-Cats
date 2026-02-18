// Flower sprite sheet: 2800x752
// Grid: 16x16 sprites at positions x = 16 + 32*col, y = 16 + 32*row
// 1px yellow-green border around each sprite (not included in our coords)

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  spriteX: number;
  spriteY: number;
  category: "flowers" | "plants" | "mushrooms" | "decor";
}

export const SPRITE_SIZE = 16;
export const SHEET_W = 2800;
export const SHEET_H = 752;

function pos(col: number, row: number): { spriteX: number; spriteY: number } {
  return { spriteX: 16 + 32 * col, spriteY: 16 + 32 * row };
}

export const SHOP_ITEMS: ShopItem[] = [
  // ===== FLOWERS (potted) - 3-10 coins =====
  { id: "red-potted-flower", name: "Red Potted Flower", price: 3, ...pos(1, 0), category: "flowers" },
  { id: "orange-potted-flower", name: "Orange Potted Flower", price: 3, ...pos(1, 1), category: "flowers" },
  { id: "yellow-potted-flower", name: "Yellow Potted Flower", price: 3, ...pos(1, 2), category: "flowers" },
  { id: "pink-potted-flower", name: "Pink Potted Flower", price: 4, ...pos(1, 3), category: "flowers" },
  { id: "blue-potted-flower", name: "Blue Potted Flower", price: 4, ...pos(1, 5), category: "flowers" },
  { id: "purple-potted-flower", name: "Purple Potted Flower", price: 4, ...pos(1, 7), category: "flowers" },
  { id: "white-potted-flower", name: "White Potted Flower", price: 5, ...pos(1, 9), category: "flowers" },

  { id: "red-tulip", name: "Red Tulip", price: 5, ...pos(2, 0), category: "flowers" },
  { id: "orange-tulip", name: "Orange Tulip", price: 5, ...pos(2, 1), category: "flowers" },
  { id: "yellow-tulip", name: "Yellow Tulip", price: 5, ...pos(2, 2), category: "flowers" },
  { id: "pink-tulip", name: "Pink Tulip", price: 6, ...pos(2, 4), category: "flowers" },
  { id: "blue-tulip", name: "Blue Tulip", price: 6, ...pos(2, 6), category: "flowers" },
  { id: "purple-tulip", name: "Purple Tulip", price: 6, ...pos(2, 8), category: "flowers" },

  { id: "potted-daisy", name: "Potted Daisy", price: 7, ...pos(20, 0), category: "flowers" },
  { id: "orange-daisy", name: "Orange Daisy", price: 7, ...pos(20, 1), category: "flowers" },
  { id: "blue-daisy", name: "Blue Daisy", price: 7, ...pos(20, 4), category: "flowers" },
  { id: "purple-daisy", name: "Purple Daisy", price: 8, ...pos(20, 7), category: "flowers" },
  { id: "pink-daisy", name: "Pink Daisy", price: 8, ...pos(20, 10), category: "flowers" },

  { id: "red-rose-pot", name: "Red Rose Pot", price: 10, ...pos(32, 0), category: "flowers" },
  { id: "orange-rose-pot", name: "Orange Rose Pot", price: 10, ...pos(32, 1), category: "flowers" },
  { id: "blue-rose-pot", name: "Blue Rose Pot", price: 10, ...pos(32, 5), category: "flowers" },
  { id: "purple-rose-pot", name: "Purple Rose Pot", price: 10, ...pos(32, 8), category: "flowers" },

  // ===== PLANTS & CACTI =====
  { id: "small-sprout", name: "Small Sprout", price: 3, ...pos(0, 0), category: "plants" },
  { id: "green-bush", name: "Green Bush", price: 8, ...pos(5, 0), category: "plants" },
  { id: "tall-grass", name: "Tall Grass", price: 5, ...pos(4, 0), category: "plants" },
  { id: "wild-grass", name: "Wild Grass", price: 5, ...pos(7, 0), category: "plants" },
  { id: "cactus-small", name: "Small Cactus", price: 12, ...pos(18, 0), category: "plants" },
  { id: "cactus-round", name: "Round Cactus", price: 15, ...pos(19, 0), category: "plants" },
  { id: "cactus-tall", name: "Tall Cactus", price: 18, ...pos(17, 0), category: "plants" },
  { id: "potted-succulent", name: "Potted Succulent", price: 10, ...pos(3, 0), category: "plants" },
  { id: "leafy-plant", name: "Leafy Plant", price: 8, ...pos(6, 0), category: "plants" },
  { id: "fern", name: "Fern", price: 12, ...pos(22, 0), category: "plants" },

  // ===== MUSHROOMS =====
  { id: "brown-mushroom", name: "Brown Mushroom", price: 15, ...pos(35, 0), category: "mushrooms" },
  { id: "red-mushroom", name: "Red Mushroom", price: 18, ...pos(34, 0), category: "mushrooms" },
  { id: "pink-mushroom", name: "Pink Mushroom", price: 20, ...pos(36, 0), category: "mushrooms" },
  { id: "yellow-mushroom", name: "Yellow Mushroom", price: 22, ...pos(37, 3), category: "mushrooms" },
  { id: "blue-mushroom", name: "Blue Mushroom", price: 25, ...pos(37, 6), category: "mushrooms" },
  { id: "purple-mushroom", name: "Purple Mushroom", price: 30, ...pos(37, 9), category: "mushrooms" },
  { id: "green-mushroom", name: "Green Mushroom", price: 35, ...pos(37, 12), category: "mushrooms" },
  { id: "rainbow-mushroom", name: "Rainbow Mushroom", price: 40, ...pos(37, 15), category: "mushrooms" },

  // ===== DECOR =====
  { id: "wooden-planter", name: "Wooden Planter", price: 20, ...pos(12, 0), category: "decor" },
  { id: "flower-box", name: "Flower Box", price: 25, ...pos(13, 0), category: "decor" },
  { id: "pink-cluster", name: "Pink Flower Cluster", price: 30, ...pos(15, 0), category: "decor" },
  { id: "berry-bush", name: "Berry Bush", price: 35, ...pos(25, 0), category: "decor" },
  { id: "round-bush", name: "Round Bush", price: 25, ...pos(38, 0), category: "decor" },
  { id: "green-hedge", name: "Green Hedge", price: 30, ...pos(39, 0), category: "decor" },
  { id: "stone-flower", name: "Stone Flower", price: 50, ...pos(40, 0), category: "decor" },
  { id: "fancy-bouquet", name: "Fancy Bouquet", price: 60, ...pos(41, 0), category: "decor" },
  { id: "golden-flower", name: "Golden Flower", price: 75, ...pos(42, 0), category: "decor" },
  { id: "crystal-bloom", name: "Crystal Bloom", price: 100, ...pos(43, 0), category: "decor" },
];

export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((item) => item.id === id);
}
