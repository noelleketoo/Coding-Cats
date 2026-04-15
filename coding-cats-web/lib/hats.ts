export interface Hat {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
}

export const HATS: Hat[] = [
  { id: "witch-hat",     name: "Witch Hat",     price: 15, imageSrc: "/sprites/hats/3177254B-BF85-4424-81A6-F47DA06A9071.png" },
  { id: "cowboy-hat",    name: "Cowboy Hat",    price: 20, imageSrc: "/sprites/hats/9437E3FA-7319-4AFC-9D4B-AF3E3A27FE20.png" },
  { id: "beanie",        name: "Beanie",        price: 10, imageSrc: "/sprites/hats/948602AE-787A-403C-9961-5FEFD6B3E280.png" },
  { id: "safari-hat",    name: "Safari Hat",    price: 20, imageSrc: "/sprites/hats/A597B369-766F-4858-AB17-8C20D74CCA52.png" },
  { id: "knit-cap",      name: "Knit Cap",      price: 10, imageSrc: "/sprites/hats/CB11EF9B-C0F0-408F-9DC7-F3FCAE1C5F5C.png" },
  { id: "top-hat-green", name: "Lucky Hat",     price: 25, imageSrc: "/sprites/hats/CE2141AB-29FE-41AA-8278-E3102919C830.png" },
  { id: "magician-hat",  name: "Magician Hat",  price: 30, imageSrc: "/sprites/hats/FFABCE19-D58C-442C-8A1F-46210A238ABF.png" },
];

export function getHat(id: string): Hat | undefined {
  return HATS.find((h) => h.id === id);
}
