import { motion } from "framer-motion";
import { Quote, TrendingUp } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    title: "Agency Owner",
    quote: "LaSean's systems automated 80% of our client onboarding. My team went from overwhelmed to optimized in 3 weeks. Revenue up 45%.",
    result: "+45% Revenue",
  },
  {
    name: "Jennifer K.",
    title: "SaaS Founder",
    quote: "The proprietary methods cut our customer acquisition cost in half. He doesn't just consult - his team delivers actual working systems.",
    result: "50% Lower CAC",
  },
  {
    name: "Derrick W.",
    title: "Home Services CEO",
    quote: "The AI system answers every call, books appointments 24/7, and never misses a lead. We added $180K in revenue in 90 days.",
    result: "+$180K in 90 days",
  },
  {
    name: "Aisha M.",
    title: "E-Commerce CEO",
    quote: "LaSean's frameworks changed how I run my entire business. Revenue up 3x, team size stayed the same. His delivery speed is unreal.",
    result: "3x Revenue",
  },
];

const SocialProof = () => (
  <section id="testimonials" className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-4"
      >
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Client Transformations</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Real <span className="text-gradient-blue">Results</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark rounded-2xl p-8 hover:glow-blue transition-all duration-300 relative group"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6 group-hover:text-primary/40 transition-colors" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <TrendingUp className="w-3 h-3" /> {t.result}
            </div>
            <p className="text-foreground/90 text-lg leading-relaxed mb-6 italic">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
