import { motion } from "framer-motion";
import { Check, Star, Zap, Rocket, TrendingUp, Crown, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Service {
  name: string;
  price: string;
  note?: string;
}

interface Tier {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  services: Service[];
  popular?: boolean;
  accent: string;
}

const tiers: Tier[] = [
  {
    name: "Quick Wins",
    icon: Rocket,
    tagline: "One-time services to get you started fast",
    services: [
      { name: "AI Business Audit", price: "$497" },
      { name: "Brand Strategy Session", price: "$297" },
      { name: "Business Plan Creation", price: "$997" },
      { name: "AI Tool Setup", price: "$697" },
    ],
    accent: "from-orange-500 to-red-500",
  },
  {
    name: "Transformation Programs",
    icon: TrendingUp,
    tagline: "Ongoing programs to scale your business",
    services: [
      { name: "AI Business Accelerator", price: "$197/mo" },
      { name: "Revenue Optimization", price: "$497/mo" },
      { name: "Complete Business Rebrand", price: "$2,497", note: "one-time" },
      { name: "Custom AI System Build", price: "$4,997", note: "one-time" },
    ],
    popular: true,
    accent: "from-red-500 to-pink-500",
  },
  {
    name: "Executive Coaching",
    icon: Crown,
    tagline: "Direct access to LaSean for serious operators",
    services: [
      { name: "1-on-1 Coaching", price: "$997/mo", note: "30min weekly" },
      { name: "VIP Transformation", price: "$2,997/mo", note: "unlimited" },
      { name: "Done-For-You Systems", price: "$4,997/mo", note: "full service" },
    ],
    accent: "from-pink-500 to-purple-500",
  },
  {
    name: "Enterprise",
    icon: Building2,
    tagline: "Custom solutions for large organizations",
    services: [
      { name: "Corporate Training", price: "$10K+", note: "custom" },
      { name: "Enterprise Transformation", price: "$25K+", note: "6-month" },
      { name: "Speaking / Consulting", price: "$15K+", note: "per event" },
    ],
    accent: "from-purple-500 to-blue-500",
  },
];

const PricingTiers = () => (
  <section id="programs" className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Services & <span className="text-gradient-red">Pricing</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From $297 audits to $25K+ enterprise transformations - solutions for every stage of growth.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {tiers.map((tier, i) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative glass-dark rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                tier.popular
                  ? "border-primary/50 glow-red-strong"
                  : "hover:glow-red hover:border-primary/30"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  <Star className="w-3 h-3 mr-1" /> Most Popular
                </Badge>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.accent} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                </div>
              </div>

              <div className="space-y-2.5 flex-1">
                {tier.services.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between bg-background/40 rounded-lg px-4 py-3 border border-border/30"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/90">{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary">{s.price}</span>
                      {s.note && <span className="block text-[10px] text-muted-foreground">{s.note}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <motion.a
                href="#book"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block mt-5 ${
                  tier.popular
                    ? "bg-primary text-primary-foreground glow-red"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Get Started
              </motion.a>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default PricingTiers;
