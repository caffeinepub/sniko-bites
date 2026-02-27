// High-quality sneaker images from Unsplash (free to use)
const SNEAKER_IMAGES: Record<string, string[]> = {
  Running: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop&q=80",
  ],
  Basketball: [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551107696-a4b537da5038?w=800&h=800&fit=crop&q=80",
  ],
  Lifestyle: [
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800&h=800&fit=crop&q=80",
  ],
  "Limited Edition": [
    "https://images.unsplash.com/photo-1584735175315-9d5df23be620?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520316587275-5e4f06f355e3?w=800&h=800&fit=crop&q=80",
  ],
  "High Top": [
    "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&h=800&fit=crop&q=80",
  ],
  Outdoor: [
    "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1619812096095-7af6bdb8b764?w=800&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&q=80",
  ],
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop&q=80",
];

export function getSneakerImage(category: string, index: number): string {
  const images = SNEAKER_IMAGES[category] ?? FALLBACK_IMAGES;
  return images[index % images.length];
}

export const CATEGORY_CONFIG: Record<
  string,
  { gradient: string; icon: string; accent: string }
> = {
  Running: {
    gradient: "from-orange-600/80 to-red-900/90",
    icon: "⚡",
    accent: "#f97316",
  },
  Basketball: {
    gradient: "from-amber-600/80 to-orange-900/90",
    icon: "🏀",
    accent: "#d97706",
  },
  Lifestyle: {
    gradient: "from-purple-600/80 to-indigo-900/90",
    icon: "✦",
    accent: "#9333ea",
  },
  "Limited Edition": {
    gradient: "from-yellow-500/80 to-amber-900/90",
    icon: "◆",
    accent: "#eab308",
  },
  "High Top": {
    gradient: "from-slate-500/80 to-slate-900/90",
    icon: "▲",
    accent: "#94a3b8",
  },
  Outdoor: {
    gradient: "from-green-600/80 to-emerald-900/90",
    icon: "◉",
    accent: "#16a34a",
  },
};
