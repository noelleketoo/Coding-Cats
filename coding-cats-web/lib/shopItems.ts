export interface ShopItem {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  category: "flowers" | "plants" | "mushrooms" | "decor";
}

export const SHOP_ITEMS: ShopItem[] = [
  // ===== FLOWERS =====
  { id: "sunflower",       name: "Sunflower",      price: 10, imageSrc: "/sprites/shop/84C4D624-1CB8-4BCB-859C-62152258C89E.png", category: "flowers" },
  { id: "purple-flower",   name: "Purple Flower",  price: 12, imageSrc: "/sprites/shop/8B6B3044-CE47-4AB0-8802-BBE09FFB8D7A.png", category: "flowers" },
  { id: "yellow-flower",   name: "Yellow Flower",  price: 10, imageSrc: "/sprites/shop/EDF254B6-559C-4E18-9C01-5C96A2AB95EE.png", category: "flowers" },
  { id: "orange-flower",   name: "Orange Flower",  price: 20, imageSrc: "/sprites/shop/E25E5843-4911-46F5-A6B4-B247D5635074.png", category: "flowers" },
  { id: "crystal-flower",  name: "Crystal Flower", price: 30, imageSrc: "/sprites/shop/ABCE9CA3-AB15-4EE1-9CEB-296B1D81451B.png", category: "flowers" },

  // ===== PLANTS =====
  { id: "small-plant",     name: "Small Plant",    price: 5,  imageSrc: "/sprites/shop/E87FA706-181C-4722-87E3-613542367007.png", category: "plants" },
  { id: "potted-plant",    name: "Potted Plant",   price: 8,  imageSrc: "/sprites/shop/28074BFA-FDF7-44BF-A205-FC636413B902.png", category: "plants" },

  // ===== MUSHROOMS =====
  { id: "red-mushroom",    name: "Red Mushroom",   price: 15, imageSrc: "/sprites/shop/A37035D7-ADDF-4FD1-9B9E-CE1BEA136F4D.png", category: "mushrooms" },

  // ===== DECOR =====
  { id: "cloud",           name: "Cloud",          price: 15, imageSrc: "/sprites/shop/1F6F5179-766E-499E-B15A-4CC5A65D5CD8.png", category: "decor" },
  { id: "sun",             name: "Sun",            price: 20, imageSrc: "/sprites/shop/47A097F0-BFBB-4582-868B-E71A455DF2B3.png", category: "decor" },
  { id: "watermelon",      name: "Watermelon",     price: 12, imageSrc: "/sprites/shop/65044D0B-025E-466D-BBBD-1657CF58A338.png", category: "decor" },
  { id: "rainbow",         name: "Rainbow",        price: 25, imageSrc: "/sprites/shop/A60FC339-9480-45D8-8905-53267223B30C.png", category: "decor" },
];

export function getShopItem(id: string): ShopItem | undefined {
  return SHOP_ITEMS.find((item) => item.id === id);
}
