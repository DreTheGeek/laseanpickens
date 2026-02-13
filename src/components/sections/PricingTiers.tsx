import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Strategy Call",
    price: "$297",
    period: "one-time",
    desc: "60-minute deep dive into your business with actionable next steps.",
    features: [
      "1-on-1 video call with LaSean",
      "Business audit & opportunity map",
      "AI automation recommendations",
      "Recorded session + notes",
    ],
    popular: false,
  },
  {
    name: "Growth Program",
    price: "$2,497",
    period: "/month",
    desc: "8-week intensive to build your AI-powered business system.",
    features: [
      "Weekly group coaching calls",
      "Private Slack access",
      "AI system templates & SOPs",
      "Implementation support",
      "Lifetime community access",
    ],
    popular: true,
  },
  {
    name: "Elite Partnership",
    price: "$10,000",
    period: "/month",
    desc: "Ongoing advisory for operators building at scale.",
    features: [
      "Unlimited 1-on-1 access",
      "Custom AI system builds",
      "Deal flow & partnerships",
      "Revenue share opportunities",
      "Priority support",
      "Quarterly strategy retreats",
    ],
    popular: false,
  },
];

const PricingTiers = () => (
  <section id="programs" className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Work With <span className="text-gradient-blue">LaSean</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Choose the level of access that matches your ambition.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative glass-dark rounded-2xl p-8 flex flex-col transition-all duration-300 ${
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
            <h3 className="text-xl font-heading font-bold text-foreground">{tier.name}</h3>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-heading font-bold text-foreground">{tier.price}</span>
              <span className="text-muted-foreground text-sm ml-1">{tier.period}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">{tier.desc}</p>
            <ul className="space-y-3 mb-8 flex-1">
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
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingTiers;
