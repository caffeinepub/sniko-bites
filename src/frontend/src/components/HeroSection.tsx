import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector("#featured");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleShopNow = () => {
    const el = document.querySelector("#all-kicks");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleExplore = () => {
    const el = document.querySelector("#collections");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center"
    >
      {/* Background image with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&h=900&fit=crop&q=85"
          alt="Sniko Bites hero sneaker"
          className="w-full h-full object-cover object-center scale-110"
          loading="eager"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />

      {/* Diagonal accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-2xl">
          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-px bg-primary" />
            <span className="font-display text-xs font-bold tracking-[0.3em] uppercase text-primary">
              New Collection 2026
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
            className="font-heading font-black text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight uppercase mb-4"
          >
            <span className="block text-foreground">Step Into</span>
            <span className="block text-primary text-glow-orange">
              The Bite
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-md mb-10 leading-relaxed"
          >
            Premium sneakers that leave a mark. Engineered for the streets,
            designed for the relentless.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={handleShopNow}
              className="btn-primary group"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={handleExplore}
              className="btn-outline"
            >
              Explore Collections
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-8 mt-14"
          >
            {[
              { value: "120+", label: "Models" },
              { value: "50+", label: "Countries" },
              { value: "2M+", label: "Fans" },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary pl-4">
                <div className="font-display font-black text-2xl md:text-3xl text-foreground">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs uppercase tracking-widest font-bold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        aria-label="Scroll down"
      >
        <span className="text-xs font-display font-bold tracking-[0.25em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-muted-foreground to-transparent animate-scroll-bounce" />
        <ChevronDown className="w-4 h-4 text-primary animate-scroll-bounce" />
      </motion.button>

      {/* Corner decoration */}
      <div className="absolute top-24 right-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-24 h-24 border border-primary/20 rounded-none rotate-45"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-14 h-14 border border-primary/40 rounded-none rotate-45 absolute top-5 left-5"
        />
      </div>
    </section>
  );
}
