import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import type { Sneaker } from "../hooks/useQueries";
import { getSneakerImage } from "../utils/sneakerImages";

interface SneakerCardProps {
  sneaker: Sneaker;
  index: number;
  onQuickView: (sneaker: Sneaker) => void;
}

export function SneakerCard({ sneaker, index, onQuickView }: SneakerCardProps) {
  const image = getSneakerImage(sneaker.category, index);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="sneaker-card w-full text-left"
      onClick={() => onQuickView(sneaker)}
      aria-label={`View details for ${sneaker.name}`}
    >
      {/* Image */}
      <div className="card-image-wrapper bg-secondary">
        <img
          src={image}
          alt={sneaker.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {sneaker.isFeatured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="font-display font-black text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-2 py-1">
              Featured
            </span>
          </div>
        )}
        <div className="quick-view font-display">Quick View</div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-black text-sm uppercase tracking-wide text-foreground line-clamp-1 flex-1">
            {sneaker.name}
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] font-bold uppercase tracking-widest border-border text-muted-foreground shrink-0 rounded-none px-2"
          >
            {sneaker.category}
          </Badge>
        </div>
        <div className="font-heading font-black text-xl text-primary mt-2">
          ${sneaker.price.toFixed(0)}
        </div>
      </div>
    </motion.button>
  );
}
