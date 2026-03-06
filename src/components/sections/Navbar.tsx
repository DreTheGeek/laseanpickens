import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Shield } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Kaldr", href: "#kaldr" },
  { label: "Programs", href: "#programs" },
  { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        <a href="#" className="font-heading font-bold text-xl tracking-tight text-foreground">
          LASEAN <span className="text-primary">PICKENS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/portal"
            className="px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors inline-flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Client Login
          </a>
          <a
            href="/admin"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-blue hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4" /> Admin
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/portal"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3 rounded-lg border border-primary/30 text-primary text-sm font-semibold"
              >
                <LogIn className="w-4 h-4 inline mr-1.5" /> Client Login
              </a>
              <a
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-blue"
              >
                <Shield className="w-4 h-4 inline mr-1.5" /> Admin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
