import { motion } from "framer-motion";

const badges = [
  { value: "$50M+", label: "Revenue Generated" },
  { value: "500+", label: "Businesses Transformed" },
  { value: "97%", label: "Client Success Rate" },
  { value: "100+", label: "AI Systems Built" },
];

const AuthorityBadges = () => (
  <section className="py-12 border-t border-border">
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
              {b.value}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              {b.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AuthorityBadges;
