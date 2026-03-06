import { motion } from "framer-motion";
import { Check, Star, Zap, Bot, Cog, Headphones, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Service {
  name: string;
  price: string;
  note?: string;
}

interface Tier {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  tagline: string;
  delivery: string;
  services: Service[];
  popular?: boolean;
  accent: string;
}

const tiers: Tier[] = [
  {
    name: "AI & Automation Mastery",
    icon: Bot,
    badge: "Technical Expertise",
    tagline: "Your authority in AI and automation",
    delivery: "2-4 weeks",
    services: [
      { name: "AI Business Audit & Strategy", price: "$697" },
      { name: "AI Integration & Training", price: "$1,497" },
      { name: "Complete Automation Setup", price: "$2,497" },
      { name: "Custom AI System Development", price: "$4,997" },
    ],
    accent: "from-cyan-400 to-blue-500",
  },
  {
    name: "Business Transformation",
    icon: Cog,
    badge: "Proprietary Systems",
    tagline: "Proprietary methods that deliver fast",
    delivery: "24-72 hours",
    services: [
      { name: "Strategic Business Plan Creation", price: "$997" },
      { name: "Complete Business Rebrand", price: "$2,997", note: "48hr delivery" },
      { name: "Revenue Optimization System", price: "$4,997" },
      { name: "Market Expansion Strategy", price: "$9,997" },
    ],
    popular: true,
    accent: "from-blue-500 to-purple-500",
  },
  {
    name: "Done-For-You Services",
    icon: Headphones,
    badge: "Full-Service Delivery",
    tagline: "My team handles everything 24/7",
    delivery: "Ongoing 24/7",
    services: [
      { name: "Email Marketing Systems", price: "$197/mo" },
      { name: "Social Media Management", price: "$297/mo" },
      { name: "Content Creation & Management", price: "$497/mo" },
      { name: "Analytics & Reporting", price: "$697/mo" },
      { name: "Customer Service Setup", price: "$2,997", note: "one-time" },
    ],
    accent: "from-purple-500 to-pink-500",
  },
  {
    name: "Strategic Consulting",
    icon: Crown,
    badge: "Executive Access",
    tagline: "Direct access for serious operators",
    delivery: "White-glove service",
    services: [
      { name: "1-on-1 Strategy Sessions", price: "$997", note: "per session" },
      { name: "Group Mastermind Access", price: "$2,997/mo" },
      { name: "Executive Advisory Retainer", price: "$4,997/mo" },
      { name: "Speaking & Workshops", price: "$15K+", note: "per event" },
      { name: "Corporate Transformation", price: "$25K+", note: "custom" },
    ],
    accent: "from-pink-500 to-amber-500",
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
          Services & <span className="text-gradient-blue">Pricing</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From $697 technical builds to $25K+ corporate transformations - solutions for every stage of growth.
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
                  ? "border-primary/50 glow-blue-strong"
                  : "hover:glow-blue hover:border-primary/30"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  <Star className="w-3 h-3 mr-1" /> Most Popular
                </Badge>
              )}

              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.accent} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground">{tier.tagline}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 mt-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {tier.badge}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Delivery: {tier.delivery}
                </span>
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
                    ? "bg-primary text-primary-foreground glow-blue"
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
