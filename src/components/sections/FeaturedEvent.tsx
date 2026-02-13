import { motion } from "framer-motion";
import { Calendar, ArrowRight, Zap, Users, Clock } from "lucide-react";

const FeaturedEvent = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/30">
            🔥 Limited Spots
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
              The AI Leverage
              <br />
              <span className="text-gradient-blue">Summit 2025</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
              A 3-day immersive experience where I break down the exact AI systems, automations,
              and frameworks I use to build businesses that scale without burning out.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: "March 21–23", sub: "2025" },
                { icon: Users, label: "50 Seats", sub: "Only" },
                { icon: Clock, label: "3 Days", sub: "Intensive" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 glass-dark rounded-xl p-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.a
                href="#book"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm glow-blue inline-flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" /> Reserve My Spot
              </motion.a>
              <motion.a
                href="#programs"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-lg border border-border text-foreground font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Highlight card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-dark rounded-2xl p-8 md:p-10 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                  What You'll Walk Away With
                </h3>
                <ul className="space-y-4">
                  {[
                    "Your own AI-powered lead gen system, built live",
                    "A custom automation stack tailored to your business",
                    "Direct 1-on-1 time with LaSean & the Kaldr team",
                    "A 90-day scaling roadmap you can execute immediately",
                    "Access to a private alumni network of operators",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Investment starts at</p>
                  <p className="text-3xl font-heading font-bold text-gradient-blue">$4,997</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
