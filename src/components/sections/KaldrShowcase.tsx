import { motion } from "framer-motion";
import kaldrPhoto from "@/assets/kaldr-photo.png";
import { Check } from "lucide-react";

const services = [
  "Complete HVAC dispatch systems with AI voice answering",
  "Custom SaaS platforms with embedded automation",
  "AI voice agents that book appointments and handle support",
  "Full business automation (invoicing, scheduling, payments)",
  "White-label solutions for agencies and consultants",
];

const KaldrShowcase = () => (
  <section id="kaldr" className="py-20 md:py-32 px-4 border-t border-border bg-gradient-to-b from-background to-background/50">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1 flex justify-center"
        >
          <img 
            src={kaldrPhoto} 
            alt="Kaldr Tech - AI Business Systems" 
            className="w-72 h-80 md:w-80 md:h-96 rounded-2xl object-cover border border-primary/20 glow-blue" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            <span className="text-gradient-blue">Kaldr Tech</span>
            <br />
            <span className="text-2xl md:text-3xl text-foreground/80">Where Strategy Meets Execution</span>
          </h2>
          
          <p className="text-xl text-foreground/90 italic font-medium">
            "I don't just teach systems. I build them."
          </p>
          
          <p className="text-foreground/70 text-lg leading-relaxed">
            Kaldr Tech is my implementation arm. While I provide strategy and coaching, 
            my team builds the actual systems — AI voice agents, automated workflows, 
            complete business platforms that run 24/7.
          </p>

          <div className="space-y-3 pt-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">What We Build:</p>
            {services.map((service) => (
              <div 
                key={service}
                className="flex items-start gap-3 text-foreground/80"
              >
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{service}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a 
              href="https://kaldrtech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity glow-blue text-lg"
            >
              Visit Kaldr Tech →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Results showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 grid md:grid-cols-3 gap-6"
      >
        <div className="glass-dark rounded-xl p-6 text-center border border-primary/10">
          <div className="text-4xl font-bold text-primary mb-2">100%</div>
          <div className="text-sm text-muted-foreground">Custom-Built Systems</div>
        </div>
        <div className="glass-dark rounded-xl p-6 text-center border border-primary/10">
          <div className="text-4xl font-bold text-primary mb-2">24/7</div>
          <div className="text-sm text-muted-foreground">Automated Operations</div>
        </div>
        <div className="glass-dark rounded-xl p-6 text-center border border-primary/10">
          <div className="text-4xl font-bold text-primary mb-2">$0</div>
          <div className="text-sm text-muted-foreground">Ongoing Human Labor</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default KaldrShowcase;
