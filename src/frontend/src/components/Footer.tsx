import { Footprints } from "lucide-react";
import { SiInstagram, SiTiktok, SiX } from "react-icons/si";

const FOOTER_LINKS = {
  Shop: ["Running", "Basketball", "Lifestyle", "Limited Edition", "High Top"],
  Company: ["About Us", "Careers", "Press", "Sustainability"],
  Support: ["FAQ", "Shipping & Returns", "Size Guide", "Contact Us"],
};

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary flex items-center justify-center">
                <Footprints className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-black text-xl tracking-[0.15em] uppercase text-foreground">
                Sniko <span className="text-primary">Bites</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Premium sneakers for those who move fast and look good doing it.
              Born on the streets. Built for legends.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: SiInstagram, label: "Instagram" },
                { Icon: SiX, label: "Twitter / X" },
                { Icon: SiTiktok, label: "TikTok" },
              ].map(({ Icon, label }) => (
                <button
                  type="button"
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-display font-black text-xs uppercase tracking-[0.2em] text-foreground mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {year} Sniko Bites. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with ♥ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
