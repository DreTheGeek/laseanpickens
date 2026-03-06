import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tier {
  name: string;
  regularMonthly: string;
  regularAnnual?: string;
  launchMonthly: string;
  launchAnnual?: string;
  effectiveRate?: string;
  savings: string;
  period: string;
  desc: string;
  features: string[];
  popular?: boolean;
  hasToggle: boolean;
}

const tiers: Tier[] = [
  {
    name: "AI Business Starter",
    regularMonthly: "$1,497",
    launchMonthly: "$697",
    savings: "53% OFF",
    period: "one-time",
    desc: "Full AI business setup - automation stack, systems, and launch strategy.",
    features: [
      "Complete AI automation audit",
      "Custom system architecture plan",
      "Tool stack setup & configuration",
      "Launch playbook & SOPs",
      "30-day email support",
    ],
    hasToggle: false,
  },
  {
    name: "Growth Accelerator",
    regularMonthly: "$297/mo",
    regularAnnual: "$3,564/yr",
    launchMonthly: "$147/mo",
    launchAnnual: "$1,411/yr",
    effectiveRate: "$118/month",
    savings: "50% OFF",
    period: "membership",
    desc: "Ongoing coaching, community, and implementation support.",
    features: [
      "Weekly group coaching calls",
      "Private community access",
      "AI system templates & SOPs",
      "Implementation support",
      "Monthly strategy reviews",
      "Lifetime community access",
    ],
    popular: true,
    hasToggle: true,
  },
  {
    name: "VIP Coaching",
    regularMonthly: "$1,497/mo",
    regularAnnual: "$17,964/yr",
    launchMonthly: "$997/mo",
    launchAnnual: "$9,571/yr",
    effectiveRate: "$798/month",
    savings: "33% OFF",
    period: "program",
    desc: "Direct access to LaSean for operators building at scale.",
    features: [
      "Unlimited 1-on-1 access",
      "Custom AI system builds",
      "Deal flow & partnerships",
      "Revenue share opportunities",
      "Priority support",
      "Quarterly strategy retreats",
    ],
    hasToggle: true,
  },
  {
    name: "Empire Builder Mastermind",
    regularMonthly: "$25,000/yr",
    launchMonthly: "$15,000/yr",
    savings: "40% OFF",
    period: "annual",
    desc: "Elite mastermind for 7-figure operators scaling with AI.",
    features: [
      "Intimate mastermind group (12 max)",
      "Monthly in-person meetups",
      "Custom AI infrastructure builds",
      "Joint venture opportunities",
      "Direct phone/text access to LaSean",
      "Annual luxury retreat included",
    ],
    hasToggle: false,
  },
];

const PricingTiers = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="programs" className="py-20 md:py-32 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Choose Your <span className="text-gradient-blue">Growth Path</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From startup to empire - the perfect solution for your business stage.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium transition-colors ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              isAnnual ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                isAnnual ? "translate-x-7" : ""
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual{" "}
            <span className="text-xs text-green-500 font-normal">(Save 20%)</span>
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
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

              <h3 className="text-lg font-heading font-bold text-foreground">{tier.name}</h3>

              {/* Price display */}
              <div className="mt-4 mb-1">
                <span className="text-muted-foreground line-through text-sm mr-2">
                  {isAnnual && tier.regularAnnual ? tier.regularAnnual : tier.regularMonthly}
                </span>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                  {tier.savings}
                </Badge>
              </div>
              <div className="mb-1">
                <span className="text-3xl font-heading font-bold text-foreground">
                  {isAnnual && tier.launchAnnual ? tier.launchAnnual : tier.launchMonthly}
                </span>
              </div>
              {isAnnual && tier.effectiveRate && (
                <p className="text-xs text-green-400 mb-2">
                  Effective rate: {tier.effectiveRate}
                </p>
              )}
              {!isAnnual && tier.effectiveRate && (
                <p className="text-xs text-muted-foreground mb-2">{tier.period}</p>
              )}
              {!tier.hasToggle && (
                <p className="text-xs text-muted-foreground mb-2">{tier.period}</p>
              )}

              <p className="text-muted-foreground text-sm mb-5">{tier.desc}</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${
                  tier.popular
                    ? "bg-primary text-primary-foreground glow-blue"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
