import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCart } from "../hooks/useQueries";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: cart } = useCart();
  const isLoggedIn = !!identity;
  const cartCount =
    cart?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const goldColor = "oklch(0.76 0.14 75)";
  const deepColor = "oklch(0.10 0.02 45)";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl border-b"
          : "py-5 bg-transparent border-transparent"
      }`}
      style={
        scrolled
          ? {
              background: "oklch(0.10 0.02 45 / 0.96)",
              borderColor: "oklch(0.76 0.14 75 / 0.15)",
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex flex-col leading-none group">
          <span
            className="text-[1.6rem] font-bold tracking-tight transition-colors duration-300 group-hover:opacity-90"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: goldColor,
            }}
          >
            Harshellow
          </span>
          <span
            className="text-[9px] tracking-[0.2em] uppercase mt-0.5"
            style={{
              color: "oklch(0.58 0.04 55)",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            www.harshellow-chocolates.com
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", to: "/" as const },
            { label: "Shop", to: "/shop" as const },
          ].map(({ label, to }) => (
            <Link key={to} to={to} className="nav-link">
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="nav-link"
            onClick={() => {
              document
                .getElementById("studio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Studio
          </button>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 transition-colors duration-200"
            style={{ color: "oklch(0.75 0.04 60)" }}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: goldColor, color: deepColor }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2 text-sm font-medium"
                  style={{ color: goldColor }}
                >
                  <User size={15} />
                  My Account
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={clear}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Sign out"
              >
                <LogOut size={15} />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              className="btn-gold text-xs px-6 py-2.5"
            >
              {loginStatus === "logging-in" ? "Signing in…" : "Sign In"}
            </button>
          )}
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative p-2" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: goldColor, color: deepColor }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border overflow-hidden"
            style={{
              background: "oklch(0.10 0.02 45 / 0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex flex-col px-6 py-6 gap-2">
              {[
                { label: "Home", to: "/" as const },
                { label: "Shop", to: "/shop" as const },
              ].map(({ label, to }, i) => (
                <motion.div
                  key={to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={to}
                    className="nav-link block py-3 text-base border-b border-border"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                type="button"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.14 }}
                className="nav-link block py-3 text-base border-b border-border w-full text-left"
                onClick={() => {
                  setMobileOpen(false);
                  document
                    .getElementById("studio")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Studio
              </motion.button>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.21 }}
                className="pt-4"
              >
                {isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/profile" onClick={() => setMobileOpen(false)}>
                      <button
                        type="button"
                        className="btn-outline-gold w-full text-sm py-3"
                      >
                        My Account
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                      className="text-muted-foreground text-sm py-2 flex items-center justify-center gap-2"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    className="btn-gold w-full text-sm py-3"
                  >
                    Sign In
                  </button>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
