import { motion } from "framer-motion";
import { Shield, Users, Zap, Clock, Bot } from "lucide-react";
import bioPhoto from "@/assets/bio-photo.png";

const reasons = [
  { icon: Shield, text: "Proprietary business growth methodologies developed over 10+ years" },
  { icon: Users, text: "Team of specialists working around the clock" },
  { icon: Bot, text: "Advanced technology stack unavailable to others" },
  { icon: Zap, text: "Proven frameworks tested across 500+ businesses" },
  { icon: Clock, text: "Exclusive access to cutting-edge tools and systems" },
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
            Why My Systems <span className="text-gradient-blue">Work When Others Fail</span>
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed">
            I've built proprietary systems that generate millions in revenue for businesses across every industry.
            From startups to Fortune 500 companies, my methods deliver measurable ROI that speaks for itself.
          </p>
          <div className="space-y-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-card/50 rounded-lg px-4 py-3 border border-border/50"
              >
                <r.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground/80">{r.text}</span>
              </motion.div>
            ))}
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
        {[
          { icon: Bot, label: "AI Systems Built", value: "100+" },
          { icon: Users, label: "Businesses Transformed", value: "500+" },
          { icon: Zap, label: "Revenue Generated", value: "$50M+" },
          { icon: Clock, label: "Delivery Capability", value: "24/7" },
        ].map((stat, i) => (
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
