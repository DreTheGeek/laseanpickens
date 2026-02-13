import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    title: "Agency Owner",
    quote: "LaSean helped me automate 80% of my client onboarding. My team went from overwhelmed to optimized in 3 weeks.",
  },
  {
    name: "Jennifer K.",
    title: "SaaS Founder",
    quote: "The AI systems LaSean built for us cut our customer acquisition cost in half. He doesn't just consult — he delivers.",
  },
  {
    name: "Derrick W.",
    title: "Real Estate Investor",
    quote: "His capital leverage strategies helped me fund my first 5 deals without touching my own savings. Game changer.",
  },
  {
    name: "Aisha M.",
    title: "E-Commerce CEO",
    quote: "LaSean's systems thinking changed how I run my entire business. Revenue up 3x, team size stayed the same.",
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
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">What Industry Leaders Have to Say</p>
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
