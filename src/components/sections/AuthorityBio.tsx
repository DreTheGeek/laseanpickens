import { motion } from "framer-motion";
import { Bot, Building2, TrendingUp, Zap } from "lucide-react";
import bioPhoto from "@/assets/bio-photo.png";

const stats = [
  { icon: Bot, label: "AI Systems Built", value: "50+" },
  { icon: Building2, label: "Businesses Powered", value: "200+" },
  { icon: TrendingUp, label: "Revenue Generated", value: "$10M+" },
  { icon: Zap, label: "Automations Deployed", value: "1,000+" },
];

const AuthorityBio = () => (
  <section id="about" className="py-20 md:py-32 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            Meet <span className="text-gradient-blue">LaSean Pickens</span>
          </h2>
          <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
            <p>
              Founder and CEO of Kaldr, a portfolio of AI-powered businesses spanning voice automation,
              SaaS marketplaces, digital media, real estate, and financial infrastructure.
            </p>
            <p>
              LaSean doesn't just talk about systems. He builds them. From deploying AI voice agents
              that replace entire call centers to architecting SaaS platforms that generate recurring
              revenue on autopilot, his work is the proof.
            </p>
            <p>
              His mission is simple: teach ambitious founders and operators how to build leverage
              through AI, automation, and strategic infrastructure, so they can stop trading time
              for money and start building wealth that compounds.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img src={bioPhoto} alt="LaSean Pickens" className="w-72 h-80 md:w-80 md:h-96 rounded-2xl object-cover border border-border glow-blue" />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark rounded-xl p-6 text-center group hover:glow-blue transition-all duration-300"
          >
            <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AuthorityBio;
