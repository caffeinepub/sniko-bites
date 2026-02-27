import { motion } from "motion/react";

const STATS = [
  {
    value: "120+",
    label: "Unique Models",
    desc: "Fresh silhouettes every season",
  },
  { value: "8", label: "Years Running", desc: "Street cred since 2018" },
  { value: "50+", label: "Countries", desc: "From NYC to Tokyo" },
  { value: "2M+", label: "Loyal Fans", desc: "The Sniko Bites community" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Large watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-heading font-black text-[20vw] uppercase tracking-tighter text-foreground/[0.02] leading-none">
          SNIKO
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Brand Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-display font-bold text-xs tracking-[0.3em] uppercase text-primary mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-primary" />
              Our Philosophy
            </p>
            <h2 className="font-heading font-black text-5xl md:text-6xl uppercase tracking-tight text-foreground leading-none mb-8">
              Born on the
              <br />
              <span className="text-primary">Streets.</span>
              <br />
              Built for
              <br />
              <span className="text-primary">Legends.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed max-w-md">
              <p>
                Sniko Bites didn't start in a boardroom. It started on cracked
                concrete, in the gutters where style meets grit. Every pair we
                craft carries the DNA of street culture — raw, honest, and built
                to last.
              </p>
              <p>
                We obsess over every stitch, every silhouette. The kind of
                craftsmanship that makes you feel the quality before you even
                lace them up. These aren't just sneakers — they're statements.
              </p>
              <p className="font-bold text-foreground">
                Step into something real. Step into Sniko Bites.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.querySelector("#all-kicks");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                Shop the Collection
              </button>
            </div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-background border border-border p-6 hover:border-primary transition-colors duration-300 group"
              >
                <div className="font-heading font-black text-4xl md:text-5xl text-primary group-hover:text-glow-orange transition-all duration-300 mb-1">
                  {stat.value}
                </div>
                <div className="font-display font-black text-sm uppercase tracking-widest text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-muted-foreground text-xs">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
