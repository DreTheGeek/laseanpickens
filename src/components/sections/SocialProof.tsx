import { motion } from "framer-motion";

const testimonials = [
  { name: "Marcus T.", title: "Agency Owner", quote: "LaSean helped me automate 80% of my client onboarding. My team went from overwhelmed to optimized in 3 weeks." },
  { name: "Jennifer K.", title: "SaaS Founder", quote: "The AI systems LaSean built for us cut our customer acquisition cost in half. He doesn't just consult — he delivers." },
  { name: "Derrick W.", title: "Real Estate Investor", quote: "His capital leverage strategies helped me fund my first 5 deals without touching my own savings. Game changer." },
];

const SocialProof = () => (
  <section className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-heading font-bold text-center mb-16"
      >
        What People <span className="text-gradient-blue">Say</span>
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark rounded-xl p-6 hover:glow-blue transition-all duration-300"
          >
            <p className="text-foreground/80 text-sm italic leading-relaxed mb-6">"{t.quote}"</p>
            <div>
              <p className="font-heading font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
