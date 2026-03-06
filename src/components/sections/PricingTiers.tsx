import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { tiers, getServicesByTier, typeLabels } from "@/data/services";

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
          const tierServices = getServicesByTier(tier.slug);
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
                {tierServices.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/service/${s.slug}`}
                    className="flex items-center justify-between bg-background/40 rounded-lg px-4 py-3 border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/90 group-hover:text-primary transition-colors">{s.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-primary">{s.price}</span>
                      {s.note && <span className="block text-[10px] text-muted-foreground">{s.note}</span>}
                      {!s.note && s.type !== "one-time" && (
                        <span className="block text-[10px] text-muted-foreground">{typeLabels[s.type]}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to={`/service/${tierServices[0]?.slug}`}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block mt-5 flex items-center justify-center gap-1 ${
                  tier.popular
                    ? "bg-primary text-primary-foreground glow-blue"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default PricingTiers;
