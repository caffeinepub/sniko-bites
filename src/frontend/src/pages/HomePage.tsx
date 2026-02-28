import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Leaf, Star } from "lucide-react";
import { motion } from "motion/react";
import { ProductCategory } from "../backend.d";
import { ProductCard } from "../components/ProductCard";
import { useAllProducts } from "../hooks/useQueries";

export function HomePage() {
  const { data: products, isLoading } = useAllProducts();

  // Featured: first 4 products
  const featured = products?.slice(0, 4) ?? [];

  // Studio steps
  const studioSteps = [
    {
      step: "01",
      title: "Sourcing & Melting",
      desc: "We source rare single-origin cacao from farms in Ecuador, Ghana, and Vietnam. Each bean is hand-selected for flavor complexity before being gently stone-ground.",
      image: "/assets/generated/studio-pouring.dim_1200x700.jpg",
    },
    {
      step: "02",
      title: "Tempering Perfection",
      desc: "Our master chocolatiers work through a precise three-stage tempering process on hand-cooled marble slabs. The result: that unmistakable snap and luminous sheen.",
      image: "/assets/generated/studio-tempering.dim_800x600.jpg",
    },
    {
      step: "03",
      title: "Handcrafted Packaging",
      desc: "Every Harshellow piece is hand-wrapped in our signature gold-embossed foil and slipped into kraft-linen sleeves. A gift worthy of the chocolate inside.",
      image: "/assets/generated/studio-packaging.dim_800x600.jpg",
    },
  ];

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: `
            linear-gradient(to bottom, oklch(0.05 0.015 42 / 0.7) 0%, oklch(0.10 0.02 44 / 0.9) 100%),
            url('/assets/generated/hero-chocolate.dim_1600x800.jpg') center/cover no-repeat
          `,
        }}
        aria-label="Hero section"
      >
        {/* Decorative grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Gold geometric accent */}
        <div
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.76 0.14 75), transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 relative z-10">
          <div className="max-w-3xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div
                className="h-px w-12"
                style={{ background: "oklch(0.76 0.14 75)" }}
              />
              <span
                className="text-xs tracking-[0.3em] uppercase font-semibold"
                style={{
                  color: "oklch(0.76 0.14 75)",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                Artisan Chocolatier
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.96 0.015 78)",
              }}
            >
              The Art of{" "}
              <span className="italic" style={{ color: "oklch(0.76 0.14 75)" }}>
                Pure
              </span>
              <br />
              Chocolate
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "oklch(0.68 0.04 58)" }}
            >
              Harshellow is born from a single obsession — to create the most
              extraordinary chocolate experience possible, using only nature's
              finest ingredients, crafted entirely by hand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop">
                <button type="button" className="btn-gold gap-2">
                  Explore Collection <ArrowRight size={16} />
                </button>
              </Link>
              <button
                type="button"
                className="btn-outline-gold"
                onClick={() =>
                  document
                    .getElementById("studio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Our Studio
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mt-16 pt-8 border-t"
              style={{ borderColor: "oklch(0.76 0.14 75 / 0.15)" }}
            >
              {[
                { value: "21+", label: "Varieties" },
                { value: "100%", label: "Handcrafted" },
                { value: "5★", label: "Rated" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: "oklch(0.76 0.14 75)",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs tracking-widest uppercase mt-0.5"
                    style={{ color: "oklch(0.50 0.04 55)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        >
          <div
            className="w-5 h-8 border rounded-full flex justify-center pt-1.5"
            style={{ borderColor: "oklch(0.76 0.14 75 / 0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: "oklch(0.76 0.14 75)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Marquee Bar ──────────────────────────────── */}
      <div
        className="py-4 overflow-hidden"
        style={{
          background: "oklch(0.76 0.14 75)",
          color: "oklch(0.10 0.02 45)",
        }}
      >
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => `mq-${i}`).map((k) => (
            <span
              key={k}
              className="flex items-center gap-8 text-xs font-bold tracking-[0.25em] uppercase"
            >
              <span>Harshellow Chocolates</span>
              <span>✦</span>
              <span>Handcrafted in Small Batches</span>
              <span>✦</span>
              <span>Single Origin Cacao</span>
              <span>✦</span>
              <span>21 Exquisite Varieties</span>
              <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── Value Props ──────────────────────────────── */}
      <section
        className="py-16 px-6"
        style={{ background: "oklch(0.13 0.02 46)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award size={28} />,
              title: "Award-Winning Craft",
              desc: "Recognized by the International Chocolate Awards for excellence in flavor and artistry.",
            },
            {
              icon: <Leaf size={28} />,
              title: "Origin Sourced",
              desc: "Every cacao bean is ethically sourced directly from smallholder farms we know by name.",
            },
            {
              icon: <Star size={28} />,
              title: "Made to Order",
              desc: "Chocolates are crafted fresh in small batches to ensure peak quality in every piece.",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 p-6 rounded border"
              style={{
                borderColor: "oklch(0.76 0.14 75 / 0.12)",
                background: "oklch(0.15 0.022 46)",
              }}
            >
              <div
                className="flex-shrink-0 mt-1"
                style={{ color: "oklch(0.76 0.14 75)" }}
              >
                {icon}
              </div>
              <div>
                <h3
                  className="font-semibold mb-1 text-base"
                  style={{
                    color: "oklch(0.92 0.015 76)",
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Featured Products ────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-14"
          >
            <div>
              <p
                className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
                style={{ color: "oklch(0.76 0.14 75)" }}
              >
                — Bestsellers
              </p>
              <h2
                className="text-4xl sm:text-5xl font-bold"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: "oklch(0.94 0.015 76)",
                }}
              >
                Featured Selection
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: "oklch(0.76 0.14 75)" }}
            >
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((k) => (
                <div key={k} className="aspect-square shimmer rounded" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((product, i) => (
                <motion.div
                  key={product.id.toString()}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/shop">
              <button type="button" className="btn-outline-gold">
                Explore All 21 Varieties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Chocolate Studio ─────────────────────────── */}
      <section
        id="studio"
        className="py-24 px-6"
        style={{ background: "oklch(0.10 0.018 44)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
              style={{ color: "oklch(0.76 0.14 75)" }}
            >
              — The Studio
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.94 0.015 76)",
              }}
            >
              The Making of Harshellow
            </h2>
            <p
              className="text-base max-w-xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.55 0.04 55)" }}
            >
              Every Harshellow chocolate begins as a promise — and every step of
              its creation is a devotion to that promise.
            </p>
          </motion.div>

          <div className="space-y-24">
            {studioSteps.map(({ step, title, desc, image }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
              >
                {/* Image */}
                <div
                  className="flex-1 relative overflow-hidden rounded-sm"
                  style={{ maxHeight: "420px" }}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={{ minHeight: "320px" }}
                  />
                  {/* Step number overlay */}
                  <div
                    className="absolute top-4 left-4 text-6xl font-bold opacity-20 pointer-events-none"
                    style={{
                      fontFamily: '"Fraunces", serif',
                      color: "oklch(0.76 0.14 75)",
                    }}
                  >
                    {step}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 max-w-md">
                  <div
                    className="text-xs tracking-[0.3em] uppercase font-semibold mb-4"
                    style={{ color: "oklch(0.76 0.14 75)" }}
                  >
                    Step {step}
                  </div>
                  <h3
                    className="text-3xl sm:text-4xl font-bold mb-5"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: "oklch(0.94 0.015 76)",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-8"
                    style={{ color: "oklch(0.56 0.04 56)" }}
                  >
                    {desc}
                  </p>
                  {/* Decorative rule */}
                  <div className="flex items-center gap-4">
                    <div
                      className="h-px flex-1 max-w-[80px]"
                      style={{ background: "oklch(0.76 0.14 75 / 0.4)" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: "oklch(0.76 0.14 75)" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Category Preview ─────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
              style={{ color: "oklch(0.76 0.14 75)" }}
            >
              — Categories
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.94 0.015 76)",
              }}
            >
              Shop by Variety
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                cat: ProductCategory.Dark,
                label: "Dark",
                desc: "Intense & Bold",
                color: "oklch(0.25 0.025 40)",
              },
              {
                cat: ProductCategory.Milk,
                label: "Milk",
                desc: "Smooth & Creamy",
                color: "oklch(0.32 0.035 55)",
              },
              {
                cat: ProductCategory.White,
                label: "White",
                desc: "Delicate & Pure",
                color: "oklch(0.38 0.03 65)",
              },
              {
                cat: ProductCategory.Special,
                label: "Special",
                desc: "Limited & Rare",
                color: "oklch(0.28 0.028 42)",
              },
            ].map(({ cat, label, desc, color }, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to="/shop"
                  search={{ category: cat } as Record<string, string>}
                >
                  <div
                    className="relative group overflow-hidden rounded-sm cursor-pointer flex flex-col items-center justify-center py-12 px-4 text-center transition-all duration-500 border"
                    style={{
                      background: color,
                      borderColor: "oklch(0.76 0.14 75 / 0.0)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "oklch(0.76 0.14 75 / 0.4)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "oklch(0.76 0.14 75 / 0.0)";
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "translateY(0)";
                    }}
                  >
                    <div
                      className="text-xs tracking-[0.25em] uppercase font-semibold mb-1"
                      style={{ color: "oklch(0.76 0.14 75)" }}
                    >
                      {desc}
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        color: "oklch(0.94 0.015 76)",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-xs mt-3 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "oklch(0.76 0.14 75)" }}
                    >
                      Shop <ArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────── */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{ background: "oklch(0.76 0.14 75)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="max-w-2xl mx-auto relative z-10">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: "oklch(0.10 0.02 45)",
            }}
          >
            Begin Your Journey
          </h2>
          <p
            className="text-base mb-8 leading-relaxed"
            style={{ color: "oklch(0.25 0.025 45)" }}
          >
            From 100g discovery bars at $5 to the full 500g indulgence at $150 —
            every Harshellow is a first-class experience.
          </p>
          <Link to="/shop">
            <button
              type="button"
              className="inline-flex items-center gap-2 font-semibold uppercase tracking-widest text-sm px-10 py-4 transition-all duration-300"
              style={{
                background: "oklch(0.10 0.02 45)",
                color: "oklch(0.76 0.14 75)",
                borderRadius: "2px",
              }}
            >
              Shop Now <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
