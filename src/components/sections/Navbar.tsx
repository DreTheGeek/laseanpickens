import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";

const hashLinks = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#programs" },
  { label: "Quiz", hash: "#quiz" },
];

const routeLinks = [
  { label: "Case Studies", to: "/case-study/hvac-automation" },
  { label: "Resources", to: "/resources" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashClick = (hash: string) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
        <Link to="/" className="font-heading font-bold text-xl tracking-tight text-foreground">
          LASEAN <span className="text-primary">PICKENS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {hashLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => handleHashClick(l.hash)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
          {routeLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/portal"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-blue hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5"
          >
            <LogIn className="w-4 h-4" /> Client Portal
          </Link>
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
              {hashLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleHashClick(l.hash)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2 w-full text-left"
                >
                  {l.label}
                </button>
              ))}
              {routeLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/portal"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-blue"
              >
                <LogIn className="w-4 h-4 inline mr-1.5" /> Client Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
