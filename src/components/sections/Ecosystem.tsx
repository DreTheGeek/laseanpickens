import { motion } from "framer-motion";
import { Factory, Home, Briefcase } from "lucide-react";

const platforms = [
  {
    icon: Factory,
    name: "Kaldr Tech",
    sub: "HVAC Automation Platform",
    href: "https://kaldrtech.com",
  },
  {
    icon: Home,
    name: "Kaldr Properties",
    sub: "Real Estate Automation",
    href: "#",
  },
  {
    icon: Briefcase,
    name: "Kaldr Consulting",
    sub: "Business Platform Suite",
    href: "#",
  },
];

const Ecosystem = () => (
  <section className="py-16 px-4 border-t border-border">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl font-heading font-bold mb-8"
      >
        Our AI <span className="text-gradient-blue">Platform Ecosystem</span>
      </motion.h3>

      <div className="grid sm:grid-cols-3 gap-4">
        {platforms.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="glass-dark rounded-xl p-6 flex flex-col items-center gap-2 hover:glow-blue hover:border-primary/30 transition-all duration-300"
          >
            <p.icon className="w-8 h-8 text-primary" />
            <p className="font-heading font-bold text-foreground">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.sub}</p>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Ecosystem;
