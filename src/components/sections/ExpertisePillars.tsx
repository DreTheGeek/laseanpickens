import { motion } from "framer-motion";
import { Bot, Rocket, ArrowRight } from "lucide-react";

const pillars = [
  { 
    icon: Bot, 
    title: "AI Workforce Automation", 
    desc: "Automated systems, voice agents, and AI employees that handle sales, support, and operations 24/7.",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: Rocket, 
    title: "Scalable SaaS Marketplaces", 
    desc: "Recurring-revenue platforms built to grow on autopilot with embedded AI.",
    color: "from-cyan-500 to-teal-500"
  },
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
          What I <span className="text-gradient-blue">Specialize In</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          I build complete business systems using AI. Not theory. Not templates. Real, working systems that run 24/7 and generate revenue on autopilot.
        </p>
      </motion.div>

      {/* Main 2 Pillars */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group glass-dark rounded-2xl p-8 hover:glow-blue hover:border-primary/30 transition-all duration-300 cursor-default relative overflow-hidden"
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <p.icon className="w-14 h-14 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">{p.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kaldr Tech CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="inline-block glass-dark rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all">
          <p className="text-lg text-foreground/90 mb-4">
            <span className="font-semibold text-primary">Want these systems built for your business?</span>
            <br />
            <span className="text-muted-foreground">My team at Kaldr Tech handles implementation from start to finish.</span>
          </p>
          <a 
            href="https://kaldrtech.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Explore Kaldr Tech
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ExpertisePillars;
