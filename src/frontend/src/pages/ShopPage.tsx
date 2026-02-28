import { motion } from "motion/react";
import { useState } from "react";
import { ProductCategory } from "../backend.d";
import { ProductCard } from "../components/ProductCard";
import { useAllProducts } from "../hooks/useQueries";

const CATEGORIES = [
  { label: "All", value: null },
  { label: "Dark", value: ProductCategory.Dark },
  { label: "Milk", value: ProductCategory.Milk },
  { label: "White", value: ProductCategory.White },
  { label: "Special", value: ProductCategory.Special },
];

export function ShopPage() {
  const { data: products, isLoading } = useAllProducts();
  const [active, setActive] = useState<ProductCategory | null>(null);

  const filtered = active
    ? (products ?? []).filter((p) => p.category === active)
    : (products ?? []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
            style={{ color: "oklch(0.76 0.14 75)" }}
          >
            — The Collection
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h1
              className="text-4xl sm:text-5xl font-bold"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.94 0.015 76)",
              }}
            >
              All Chocolates
            </h1>
            <p className="text-sm" style={{ color: "oklch(0.52 0.04 55)" }}>
              {filtered.length} {active ?? "artisan"} varieties
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(({ label, value }) => (
            <button
              type="button"
              key={label}
              onClick={() => setActive(value)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest border transition-all duration-300 rounded-sm ${
                active === value
                  ? ""
                  : "bg-transparent hover:border-foreground/40"
              }`}
              style={
                active === value
                  ? {
                      background: "oklch(0.76 0.14 75)",
                      color: "oklch(0.10 0.02 45)",
                      borderColor: "oklch(0.76 0.14 75)",
                    }
                  : {
                      color: "oklch(0.60 0.04 55)",
                      borderColor: "oklch(0.28 0.03 50)",
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }, (_, i) => `skel-${i}`).map((k) => (
              <div key={k} className="aspect-square shimmer rounded-sm" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.60 0.04 55)",
              }}
            >
              No chocolates found
            </p>
            <p className="text-sm" style={{ color: "oklch(0.45 0.03 52)" }}>
              The collection is being prepared...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.5) }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
