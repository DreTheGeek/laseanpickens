import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services, typeLabels } from "@/data/services";

const tierShortNames: Record<string, string> = {
  "ai-automation": "AI & Automation",
  "transformation": "Transformation",
  "done-for-you": "Done-For-You",
  "consulting": "Consulting",
};

const PricingTable = () => (
  <section className="py-20 px-4 border-t border-border">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
          Complete <span className="text-gradient-blue">Service Menu</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          From $197/mo managed services to $25K+ corporate transformations.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-dark rounded-2xl overflow-hidden"
      >
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-primary/10">
                <th className="text-left px-5 py-4 font-heading font-semibold text-foreground">Service</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Tier</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Price</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => {
                const isTransformation = s.tierSlug === "transformation";
                return (
                  <tr
                    key={s.slug}
                    className={`border-b border-border/50 transition-colors hover:bg-primary/5 cursor-pointer ${
                      isTransformation ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <Link to={`/service/${s.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-center text-muted-foreground">{tierShortNames[s.tierSlug]}</td>
                    <td className="px-5 py-3.5 text-center">
                      <Link to={`/service/${s.slug}`} className="text-primary font-bold hover:underline">{s.price}</Link>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        {typeLabels[s.type]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/50">
          {services.map((s) => {
            const isTransformation = s.tierSlug === "transformation";
            return (
              <Link
                key={s.slug}
                to={`/service/${s.slug}`}
                className={`block p-4 hover:bg-primary/5 transition-colors ${isTransformation ? "bg-primary/5" : ""}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-heading font-bold text-foreground text-sm">{s.name}</p>
                  <span className="text-primary font-bold text-sm">{s.price}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{tierShortNames[s.tierSlug]}</span>
                  <span>-</span>
                  <span>{typeLabels[s.type]}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <Link
          to="/#programs"
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold glow-blue hover:bg-primary/90 transition-colors"
        >
          View All Services
        </Link>
      </motion.div>
    </div>
  </section>
);

export default PricingTable;
