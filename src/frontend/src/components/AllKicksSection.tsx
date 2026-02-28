import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { SneakerCard } from "./SneakerCard";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Sneaker = any;

interface AllKicksSectionProps {
  sneakers: Sneaker[];
  isLoading: boolean;
  activeFilter: string | null;
  onQuickView: (sneaker: Sneaker, index: number) => void;
}

const CATEGORIES = [
  "All",
  "Running",
  "Basketball",
  "Lifestyle",
  "Limited Edition",
  "High Top",
  "Outdoor",
];

export function AllKicksSection({
  sneakers,
  isLoading,
  activeFilter,
  onQuickView,
}: AllKicksSectionProps) {
  const [filter, setFilter] = useState<string>(activeFilter ?? "All");

  // Sync external filter changes
  useEffect(() => {
    if (activeFilter) setFilter(activeFilter);
  }, [activeFilter]);

  const filtered = useMemo(() => {
    if (filter === "All") return sneakers;
    return sneakers.filter((s) => s.category === filter);
  }, [sneakers, filter]);

  return (
    <section id="all-kicks" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display font-bold text-xs tracking-[0.3em] uppercase text-primary mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              The Full Catalog
            </p>
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight text-foreground">
              All <span className="text-primary">Kicks</span>
            </h2>
          </motion.div>

          {/* Filter count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-muted-foreground text-sm"
          >
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter sneakers by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
              className={`filter-tab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                filter === cat ? "active" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground text-sm font-display font-bold uppercase tracking-widest">
                Loading...
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <div className="text-6xl font-heading font-black text-border">
              ∅
            </div>
            <p className="text-muted-foreground font-display font-bold text-sm uppercase tracking-widest">
              No sneakers in this category
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="btn-outline text-xs py-2 px-4"
            >
              View All
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filtered.map((sneaker, i) => (
                <SneakerCard
                  key={sneaker.id.toString()}
                  sneaker={sneaker}
                  index={i}
                  onQuickView={(s) => onQuickView(s, i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
