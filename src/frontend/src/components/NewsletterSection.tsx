import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    toast.success("You're on the list! First drop alerts incoming.");
    setEmail("");
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative shapes */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 border-2 border-primary-foreground/10 rounded-none rotate-12 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 border-2 border-primary-foreground/10 rounded-none -rotate-12 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display font-bold text-xs tracking-[0.3em] uppercase text-primary-foreground/70 mb-3">
            Stay in the Loop
          </p>
          <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tight text-primary-foreground leading-none mb-4">
            First Access.
            <br />
            Every Drop.
          </h2>
          <p className="text-primary-foreground/70 text-base mb-8 max-w-md mx-auto">
            Join 2 million sneakerheads who get exclusive drops, collaborations,
            and insider news before anyone else.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-primary-foreground font-display font-bold text-sm uppercase tracking-widest"
            >
              <Check className="w-5 h-5" />
              You're in! Check your inbox.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoComplete="email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 px-4 py-4 text-sm font-sans focus:outline-none focus:border-primary-foreground rounded-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-display font-black text-sm uppercase tracking-widest px-6 py-4 rounded-none hover:bg-primary-foreground/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-foreground group"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
