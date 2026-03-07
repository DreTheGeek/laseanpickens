import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, TrendingUp, Users, X } from "lucide-react";

// --- Floating "Just Purchased" notification toast ---
const recentPurchases = [
  { name: "Marcus T.", location: "Atlanta, GA", service: "AI Business Audit", time: "2 hours ago" },
  { name: "Jennifer K.", location: "Houston, TX", service: "Complete Automation Setup", time: "4 hours ago" },
  { name: "David R.", location: "Miami, FL", service: "Business Plan Creation", time: "6 hours ago" },
  { name: "Sarah M.", location: "Chicago, IL", service: "Email Marketing Systems", time: "8 hours ago" },
  { name: "James L.", location: "Phoenix, AZ", service: "Complete Business Rebrand", time: "12 hours ago" },
  { name: "Amanda P.", location: "Dallas, TX", service: "Revenue Optimization", time: "1 day ago" },
  { name: "Robert C.", location: "Denver, CO", service: "1-on-1 Strategy Session", time: "1 day ago" },
  { name: "Michelle W.", location: "Seattle, WA", service: "Social Media Management", time: "2 days ago" },
];

export const PurchaseToast = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const initial = setTimeout(() => {
      setVisible(true);
      setCurrent(Math.floor(Math.random() * recentPurchases.length));
    }, 15000);
    return () => clearTimeout(initial);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;
    const hide = setTimeout(() => setVisible(false), 6000);
    const next = setTimeout(() => {
      setCurrent((c) => (c + 1) % recentPurchases.length);
      setVisible(true);
    }, 45000);
    return () => { clearTimeout(hide); clearTimeout(next); };
  }, [visible, current, dismissed]);

  if (dismissed) return null;
  const p = recentPurchases[current];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 z-50 max-w-xs hidden md:block"
        >
          <div className="glass-dark rounded-xl p-4 border border-border shadow-lg flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium">{p.name} from {p.location}</p>
              <p className="text-xs text-muted-foreground">purchased <span className="text-primary">{p.service}</span></p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">{p.time}</p>
            </div>
            <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Stats counter bar (for use between sections) ---
const stats = [
  { icon: Users, value: "500+", label: "Businesses Transformed" },
  { icon: TrendingUp, value: "$50M+", label: "Revenue Generated for Clients" },
  { icon: Star, value: "4.9/5", label: "Client Satisfaction" },
  { icon: ShieldCheck, value: "98%", label: "Project Completion Rate" },
];

export const StatsBar = () => (
  <section className="py-12 px-4 border-y border-border bg-background/50">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-2xl md:text-3xl font-heading font-black text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// --- Client logo bar ---
const clients = [
  "Kaldr Tech", "Kaldr Properties", "Kaldr Consulting",
  "HVAC Pro Solutions", "Metro Climate Systems", "NextGen Comfort",
];

export const ClientLogos = () => (
  <section className="py-8 px-4 border-b border-border/50 overflow-hidden">
    <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">Trusted by industry leaders</p>
    <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
      {clients.map((name) => (
        <span key={name} className="text-sm md:text-base font-heading font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors whitespace-nowrap">{name}</span>
      ))}
    </div>
  </section>
);

// --- Trust badges strip (for checkout/pricing areas) ---
const trustItems = [
  { icon: ShieldCheck, text: "256-bit SSL Encrypted" },
  { icon: Star, text: "4.9/5 Rating" },
  { icon: Users, text: "500+ Clients Served" },
];

export const TrustBadges = () => (
  <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-4">
    {trustItems.map((item) => (
      <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
        <item.icon className="w-4 h-4 text-primary" />
        <span>{item.text}</span>
      </div>
    ))}
  </div>
);
