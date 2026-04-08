export interface Hat {
  id: string;
  name: string;
  price: number;
  // Offset on the cat sprite (at 2.5x scale, cat is 80px wide)
  // These are CSS values applied to the hat image overlay
  offsetX: string; // left offset relative to cat div
  offsetY: string; // bottom offset relative to cat div
  width: number;   // display width in px
}

export const HATS: Hat[] = [
  { id: "party-hat",    name: "Party Hat",    price: 15, offsetX: "8px",  offsetY: "62px", width: 28 },
  { id: "witch-hat",    name: "Witch Hat",    price: 20, offsetX: "6px",  offsetY: "64px", width: 32 },
  { id: "crown",        name: "Crown",        price: 30, offsetX: "10px", offsetY: "62px", width: 24 },
  { id: "bow",          name: "Bow",          price: 10, offsetX: "14px", offsetY: "60px", width: 20 },
  { id: "santa-hat",    name: "Santa Hat",    price: 25, offsetX: "4px",  offsetY: "64px", width: 36 },
];

export function getHat(id: string): Hat | undefined {
  return HATS.find((h) => h.id === id);
}
