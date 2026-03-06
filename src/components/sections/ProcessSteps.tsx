import { motion } from "framer-motion";
import { ClipboardCheck, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Strategic Assessment",
    desc: "Our proprietary evaluation framework analyzes every aspect of your business to identify the highest-impact opportunities.",
    detail: "Proprietary evaluation framework",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Custom Solution Design",
    desc: "My specialist team creates a tailored implementation plan using proven methodologies refined across 500+ businesses.",
    detail: "Specialist team creates your plan",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Rapid Implementation",
    desc: "Our 24/7 delivery team executes with precision. Most clients see initial results within 48-72 hours of kickoff.",
    detail: "24/7 delivery team executes",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Optimization & Scale",
    desc: "Continuous improvement systems ensure your business keeps growing. We monitor, optimize, and scale automatically.",
    detail: "Continuous improvement systems",
  },
];

const ProcessSteps = () => (
  <section id="process" className="py-20 md:py-32 px-4 border-t border-border relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Process</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          How We <span className="text-gradient-blue">Transform Your Business</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A proven four-step methodology that delivers results every time.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative glass-dark rounded-2xl p-6 group hover:glow-blue hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-heading font-bold text-primary/30 group-hover:text-primary/60 transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.desc}</p>
              <span className="text-xs text-primary font-medium">{step.detail}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProcessSteps;
