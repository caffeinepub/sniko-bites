import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { identity, login, loginStatus, isInitializing } =
    useInternetIdentity();
  const navigate = useNavigate();

  // Redirect to profile once logged in
  useEffect(() => {
    if (identity) {
      navigate({ to: "/profile" });
    }
  }, [identity, navigate]);

  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-8"
          style={{
            background:
              "radial-gradient(circle, oklch(0.76 0.14 75 / 0.06), transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-6"
          style={{
            background:
              "radial-gradient(circle, oklch(0.76 0.14 75 / 0.04), transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-sm p-8 sm:p-10 border"
          style={{
            background: "oklch(0.14 0.02 44)",
            borderColor: "oklch(0.76 0.14 75 / 0.15)",
          }}
        >
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{
                background: "oklch(0.76 0.14 75 / 0.12)",
                border: "1px solid oklch(0.76 0.14 75 / 0.3)",
              }}
            >
              <span
                className="text-2xl font-bold"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: "oklch(0.76 0.14 75)",
                }}
              >
                H
              </span>
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "oklch(0.94 0.015 76)",
              }}
            >
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: "oklch(0.52 0.04 55)" }}>
              Sign in to access your Harshellow account
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(0.76 0.14 75 / 0.15)" }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.45 0.03 52)" }}
            >
              Secure Login
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "oklch(0.76 0.14 75 / 0.15)" }}
            />
          </div>

          {/* Internet Identity Login */}
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            className="w-full btn-gold gap-3 py-4 justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoggingIn || isInitializing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {isInitializing ? "Initializing..." : "Signing in..."}
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In with Internet Identity
              </>
            )}
          </button>

          {/* Trust badges */}
          <div
            className="mt-8 pt-6 border-t space-y-3"
            style={{ borderColor: "oklch(0.22 0.025 48)" }}
          >
            <div
              className="flex items-center gap-3 text-sm"
              style={{ color: "oklch(0.52 0.04 55)" }}
            >
              <Shield
                size={16}
                style={{ color: "oklch(0.76 0.14 75 / 0.7)" }}
                className="flex-shrink-0"
              />
              <span>
                Secured by Internet Identity — decentralized, password-free
                authentication
              </span>
            </div>
          </div>

          {/* Features after login */}
          <div
            className="mt-6 p-4 rounded-sm"
            style={{
              background: "oklch(0.76 0.14 75 / 0.06)",
              border: "1px solid oklch(0.76 0.14 75 / 0.1)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.76 0.14 75 / 0.7)" }}
            >
              After signing in, you can:
            </p>
            <ul className="space-y-1.5">
              {[
                "Complete your delivery profile",
                "Add chocolates to your cart",
                "Track your orders",
                "Save your favourite varieties",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "oklch(0.56 0.04 56)" }}
                >
                  <div
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "oklch(0.76 0.14 75)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
