import { motion } from "framer-motion";
import { Check, Star, Zap, Rocket, BarChart3, Bot, Building2, Code2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tier {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: string;
  period: string;
  target: string;
  desc: string;
  features: string[];
  popular?: boolean;
  accent: string;
}

const tiers: Tier[] = [
  {
    name: "Startup Automation",
    icon: Rocket,
    price: "$197",
    period: "/month",
    target: "Small businesses & startups",
    desc: "Essential AI automation to capture every lead and streamline your operations.",
    features: [
      "Basic lead response automation",
      "Appointment booking system",
      "Email automation sequences",
      "Simple CRM integration",
      "Monthly performance report",
    ],
    accent: "purple",
  },
  {
    name: "Business Intelligence",
    icon: BarChart3,
    price: "$997",
    period: "/month",
    target: "Growing businesses needing insights",
    desc: "Advanced analytics and predictive tools to outpace your competition.",
    features: [
      "Advanced analytics dashboard",
      "Predictive lead scoring",
      "Performance optimization",
      "Competitor monitoring",
      "Weekly strategy insights",
      "Custom reporting",
    ],
    popular: true,
    accent: "blue",
  },
  {
    name: "AI Business Systems",
    icon: Bot,
    price: "$2,997",
    period: "/month",
    target: "Established businesses ready for full automation",
    desc: "Complete AI-powered business automation with custom workflows.",
    features: [
      "Complete business automation",
      "Custom AI workflows",
      "Advanced integrations",
      "Dedicated account manager",
      "24/7 priority support",
      "Quarterly strategy sessions",
    ],
    accent: "green",
  },
  {
    name: "Enterprise Solutions",
    icon: Building2,
    price: "$9,997",
    period: "/month",
    target: "Large enterprises & franchises",
    desc: "Multi-location management with enterprise-grade AI infrastructure.",
    features: [
      "Multi-location management",
      "Advanced API integrations",
      "Dedicated support team",
      "Custom AI model training",
      "White-label options",
      "SLA guarantees",
    ],
    accent: "yellow",
  },
  {
    name: "Custom Development",
    icon: Code2,
    price: "$75K+",
    period: " per project",
    target: "Businesses needing bespoke solutions",
    desc: "Fully custom AI systems built from the ground up for your needs.",
    features: [
      "Bespoke AI system design",
      "Full stack development",
      "Ongoing maintenance",
      "Source code ownership",
      "12-month support included",
      "Performance guarantees",
    ],
    accent: "red",
  },
  {
    name: "Managed AI Services",
    icon: Settings,
    price: "$5K+",
    period: "/month",
    target: "Businesses wanting hands-off automation",
    desc: "We run your entire AI operation so you can focus on growth.",
    features: [
      "Fully managed AI operations",
      "Continuous optimization",
      "White-glove onboarding",
      "Dedicated engineering team",
      "Real-time monitoring",
      "Monthly ROI reporting",
    ],
    accent: "pink",
  },
];

const accentMap: Record<string, { border: string; bg: string; text: string }> = {
  purple: { border: "border-purple-500/50", bg: "bg-purple-500/10", text: "text-purple-400" },
  blue: { border: "border-primary/50", bg: "bg-primary/10", text: "text-primary" },
  green: { border: "border-green-500/50", bg: "bg-green-500/10", text: "text-green-400" },
  yellow: { border: "border-yellow-500/50", bg: "bg-yellow-500/10", text: "text-yellow-400" },
  red: { border: "border-red-500/50", bg: "bg-red-500/10", text: "text-red-400" },
  pink: { border: "border-pink-500/50", bg: "bg-pink-500/10", text: "text-pink-400" },
};

const PricingTiers = () => (
  <section id="programs" className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Scale Your Business with <span className="text-gradient-blue">AI Automation</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
          From $197/month for startups to $75K+ custom solutions - we scale with your business.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiers.map((tier, i) => {
          const colors = accentMap[tier.accent];
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
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

              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground">{tier.target}</p>
                </div>
              </div>

              <div className="mt-2 mb-4">
                <span className="text-3xl font-heading font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>

              <p className="text-muted-foreground text-sm mb-5">{tier.desc}</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className={`w-4 h-4 ${colors.text} mt-0.5 shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href="#book"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block ${
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
