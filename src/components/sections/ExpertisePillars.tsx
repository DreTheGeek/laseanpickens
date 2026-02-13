import { motion } from "framer-motion";
import { Bot, Globe, Video, Home, Landmark } from "lucide-react";

const pillars = [
  { icon: Bot, title: "AI Workforce Automation", desc: "Voice agents, chatbots, and AI employees that handle sales, support, and operations 24/7." },
  { icon: Globe, title: "Scalable SaaS Marketplaces", desc: "Recurring-revenue platforms built to grow on autopilot with embedded AI." },
  { icon: Video, title: "Content Monetization", desc: "Digital media engines that turn content into cash flow through strategic distribution." },
  { icon: Home, title: "Real Estate Acquisition", desc: "BRRRR strategy, tax deeds, and creative financing to build a real estate portfolio." },
  { icon: Landmark, title: "Capital Leverage", desc: "Business funding, credit stacking, and financial infrastructure for rapid scaling." },
];

const ExpertisePillars = () => (
  <section id="expertise" className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          What I <span className="text-gradient-blue">Build & Teach</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Five pillars of leverage that create freedom, wealth, and compounding returns.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group glass-dark rounded-xl p-6 hover:glow-blue hover:border-primary/30 transition-all duration-300 cursor-default"
          >
            <p.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExpertisePillars;
