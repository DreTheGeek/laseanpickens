import { motion } from "framer-motion";

const beliefs = [
  "Leverage beats labor.",
  "Infrastructure beats hustle.",
  "Ownership beats income.",
  "Systems beat schedules.",
  "Automation beats delegation.",
];

const Manifesto = () => (
  <section className="py-20 md:py-32 px-4 border-t border-border relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
    <div className="max-w-4xl mx-auto relative z-10 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-heading font-bold mb-12"
      >
        The <span className="text-gradient-blue">Philosophy</span>
      </motion.h2>
      <div className="space-y-4 md:space-y-6">
        {beliefs.map((b, i) => (
          <motion.p
            key={b}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-2xl md:text-4xl font-heading font-bold text-foreground/90"
          >
            {b.split(" ").map((word, wi) =>
              wi === 0 ? (
                <span key={wi} className="text-gradient-blue">{word} </span>
              ) : (
                <span key={wi}>{word} </span>
              )
            )}
          </motion.p>
        ))}
      </div>
    </div>
  </section>
);

export default Manifesto;
