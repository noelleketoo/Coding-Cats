export interface Badge {
  streak: number;
  label: string;
  imageSrc: string;
}

export const BADGES: Badge[] = [
  { streak: 5,   label: "5 Day Streak",   imageSrc: "/sprites/badges/399ACD78-6739-4E9A-8818-17FE4A6BA0DC.png" },
  { streak: 10,  label: "10 Day Streak",  imageSrc: "/sprites/badges/3E838103-E95E-4FBC-9299-8B7A8A4C859B.png" },
  { streak: 20,  label: "20 Day Streak",  imageSrc: "/sprites/badges/C200FF01-859C-41BE-A674-CF1EDC54B392.png" },
  { streak: 30,  label: "30 Day Streak",  imageSrc: "/sprites/badges/CD3E5A30-274F-4D49-AE64-85A860340DBB.png" },
  { streak: 50,  label: "50 Day Streak",  imageSrc: "/sprites/badges/E42B4E68-5EB6-40C2-9FF8-AECFE7768E02.png" },
  { streak: 100, label: "100 Day Streak", imageSrc: "/sprites/badges/F7076761-5F0A-458F-BB85-590CB6D22B4F.png" },
];

export const BADGE_MILESTONES: number[] = BADGES.map((b) => b.streak);

export function getBadgeForStreak(streak: number): Badge | null {
  return BADGES.find((b) => b.streak === streak) ?? null;
}
