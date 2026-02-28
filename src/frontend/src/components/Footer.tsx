import { Link } from "@tanstack/react-router";
import { SiInstagram, SiX } from "react-icons/si";

const FOOTER_LINKS = {
  Collections: [
    "Dark Chocolate",
    "Milk Chocolate",
    "White Chocolate",
    "Signature Specials",
  ],
  "About Us": ["Our Story", "The Studio", "Sustainability", "Press"],
  Support: ["FAQ", "Shipping Info", "Returns", "Contact Us"],
};

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  const goldColor = "oklch(0.76 0.14 75)";

  return (
    <footer
      className="border-t"
      style={{
        background: "oklch(0.09 0.018 44)",
        borderColor: "oklch(0.76 0.14 75 / 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex flex-col leading-none mb-5">
              <span
                className="text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: goldColor,
                }}
              >
                Harshellow
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase mt-1"
                style={{ color: "oklch(0.50 0.04 55)" }}
              >
                www.harshellow-chocolates.com
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "oklch(0.55 0.04 55)" }}
            >
              Crafted with rare cacao from origin estates, Harshellow brings
              uncompromising luxury to every bar. Handmade with love, packaged
              with intention.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiX, label: "Twitter / X" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 border flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: "oklch(0.28 0.03 50)",
                    color: "oklch(0.55 0.04 55)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      goldColor;
                    (e.currentTarget as HTMLButtonElement).style.color =
                      goldColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "oklch(0.28 0.03 50)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(0.55 0.04 55)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
                style={{
                  color: goldColor,
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <span
                      className="text-sm cursor-pointer transition-colors duration-200 block"
                      style={{ color: "oklch(0.52 0.04 55)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "oklch(0.85 0.015 75)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "oklch(0.52 0.04 55)";
                      }}
                    >
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "oklch(0.76 0.14 75 / 0.1)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.03 52)" }}>
            © {year} Harshellow Chocolates. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "oklch(0.45 0.03 52)" }}>
            Built with <span style={{ color: goldColor }}>♥</span> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:underline"
              style={{ color: goldColor }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
