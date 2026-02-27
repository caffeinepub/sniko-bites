import { motion } from "motion/react";
import { CATEGORY_CONFIG, getSneakerImage } from "../utils/sneakerImages";

const CATEGORIES = [
  "Running",
  "Basketball",
  "Lifestyle",
  "Limited Edition",
  "High Top",
  "Outdoor",
];

interface CollectionsSectionProps {
  onCategoryFilter: (category: string) => void;
}

export function CollectionsSection({
  onCategoryFilter,
}: CollectionsSectionProps) {
  const handleCategoryClick = (category: string) => {
    onCategoryFilter(category);
    const el = document.querySelector("#all-kicks");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="collections" className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-display font-bold text-xs tracking-[0.3em] uppercase text-primary mb-3 flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-primary" />
            Browse By Style
            <span className="w-6 h-px bg-primary" />
          </p>
          <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight text-foreground">
            Shop by <span className="text-primary">Vibe</span>
          </h2>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((category, i) => {
            const config = CATEGORY_CONFIG[category] ?? {
              gradient: "from-gray-600/80 to-gray-900/90",
              icon: "◆",
              accent: "#888",
            };
            const image = getSneakerImage(category, 0);

            return (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(category)}
                className="category-card relative group overflow-hidden aspect-[4/3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
                aria-label={`Browse ${category} sneakers`}
              >
                {/* Background image */}
                <img
                  src={image}
                  alt={category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {config.icon}
                  </div>
                  <h3 className="font-heading font-black text-lg md:text-xl uppercase tracking-tight text-white leading-none">
                    {category}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white/80 text-xs font-display font-bold uppercase tracking-widest">
                      Shop Now
                    </span>
                    <span className="text-white/80 text-xs">→</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
