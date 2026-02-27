export function getSneakerImage(category: string, index: number): string {
  const idx = index % 2;
  switch (category) {
    case "Running":
      return idx === 0
        ? "/assets/generated/sneaker-runner-1.dim_800x800.jpg"
        : "/assets/generated/sneaker-runner-2.dim_800x800.jpg";
    case "Basketball":
      return "/assets/generated/sneaker-basketball-1.dim_800x800.jpg";
    case "Lifestyle":
      return idx === 0
        ? "/assets/generated/sneaker-lifestyle-1.dim_800x800.jpg"
        : "/assets/generated/sneaker-lifestyle-2.dim_800x800.jpg";
    case "Limited Edition":
      return "/assets/generated/sneaker-limited-1.dim_800x800.jpg";
    case "High Top":
      return "/assets/generated/sneaker-hightop-1.dim_800x800.jpg";
    case "Outdoor":
      return "/assets/generated/sneaker-outdoor-1.dim_800x800.jpg";
    default:
      return "/assets/generated/sneaker-runner-1.dim_800x800.jpg";
  }
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
