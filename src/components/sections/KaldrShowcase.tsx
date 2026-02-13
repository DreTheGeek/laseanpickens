import { motion } from "framer-motion";
import kaldrPhoto from "@/assets/kaldr-photo.png";

const verticals = [
  "AI Voice Automation",
  "SaaS Platforms",
  "Digital Media & Content",
  "Real Estate Holdings",
  "Financial Infrastructure",
];

const KaldrShowcase = () => (
  <section className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1 flex justify-center"
        >
          <img src={kaldrPhoto} alt="Kaldr Ecosystem" className="w-72 h-80 md:w-80 md:h-96 rounded-2xl object-cover border border-primary/20 glow-blue" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            The <span className="text-gradient-blue">Kaldr</span> Ecosystem
          </h2>
          <p className="text-xl text-foreground/80 italic">
            "I don't just teach systems. I build them."
          </p>
          <p className="text-foreground/70 text-lg">
            Kaldr is a portfolio of AI-powered businesses, each designed to generate leverage
            at scale. Every business vertical is a living case study of what's possible when
            you stop hustling and start engineering.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {verticals.map((v) => (
              <span
                key={v}
                className="px-4 py-2 text-sm rounded-full border border-primary/30 text-primary bg-primary/5"
              >
                {v}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default KaldrShowcase;
