const MARQUEE_ITEMS = [
  { text: "New Drop: Velocity X", id: "drop-1" },
  { text: "★", id: "star-1" },
  { text: "Free Shipping Over $150", id: "shipping-1" },
  { text: "★", id: "star-2" },
  { text: "Limited: Court Dominator", id: "limited-1" },
  { text: "★", id: "star-3" },
  { text: "Premium Collab Now Live", id: "collab-1" },
  { text: "★", id: "star-4" },
  { text: "Step Into The Bite", id: "slogan-1" },
  { text: "★", id: "star-5" },
  { text: "New Drop: Velocity X", id: "drop-2" },
  { text: "★", id: "star-6" },
  { text: "Free Shipping Over $150", id: "shipping-2" },
  { text: "★", id: "star-7" },
  { text: "Limited: Court Dominator", id: "limited-2" },
  { text: "★", id: "star-8" },
  { text: "Premium Collab Now Live", id: "collab-2" },
  { text: "★", id: "star-9" },
  { text: "Step Into The Bite", id: "slogan-2" },
  { text: "★", id: "star-10" },
];

export function MarqueeBar() {
  return (
    <div className="relative overflow-hidden bg-primary h-10 flex items-center">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {MARQUEE_ITEMS.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center font-display font-bold text-xs tracking-[0.2em] uppercase text-primary-foreground px-4"
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
