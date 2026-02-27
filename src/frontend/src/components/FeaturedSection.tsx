import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import type { Sneaker } from "../hooks/useQueries";
import { SneakerCard } from "./SneakerCard";

interface FeaturedSectionProps {
  sneakers: Sneaker[];
  isLoading: boolean;
  onQuickView: (sneaker: Sneaker, index: number) => void;
}

export function FeaturedSection({
  sneakers,
  isLoading,
  onQuickView,
}: FeaturedSectionProps) {
  return (
    <section id="featured" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display font-bold text-xs tracking-[0.3em] uppercase text-primary mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Hot Right Now
            </p>
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight text-foreground">
              Featured
              <br />
              <span className="text-primary">Drops</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground text-sm max-w-xs leading-relaxed md:text-right"
          >
            The most coveted silhouettes, curated for those who move fast and
            look good doing it.
          </motion.p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground text-sm font-display font-bold uppercase tracking-widest">
                Loading Drops...
              </p>
            </div>
          </div>
        ) : sneakers.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-muted-foreground">
              No featured sneakers available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sneakers.slice(0, 8).map((sneaker, i) => (
              <SneakerCard
                key={sneaker.id.toString()}
                sneaker={sneaker}
                index={i}
                onQuickView={(s) => onQuickView(s, i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
