import { motion } from "framer-motion";

const rows = [
  { service: "AI Business Audit", tier: "Quick Wins", price: "$497", type: "One-time" },
  { service: "Brand Strategy Session", tier: "Quick Wins", price: "$297", type: "One-time" },
  { service: "Business Plan Creation", tier: "Quick Wins", price: "$997", type: "One-time" },
  { service: "AI Tool Setup", tier: "Quick Wins", price: "$697", type: "One-time" },
  { service: "AI Business Accelerator", tier: "Transformation", price: "$197/mo", type: "Monthly" },
  { service: "Revenue Optimization", tier: "Transformation", price: "$497/mo", type: "Monthly" },
  { service: "Complete Business Rebrand", tier: "Transformation", price: "$2,497", type: "One-time" },
  { service: "Custom AI System Build", tier: "Transformation", price: "$4,997", type: "One-time" },
  { service: "1-on-1 Coaching", tier: "Executive", price: "$997/mo", type: "Monthly", highlight: true },
  { service: "VIP Transformation", tier: "Executive", price: "$2,997/mo", type: "Monthly", highlight: true },
  { service: "Done-For-You Systems", tier: "Executive", price: "$4,997/mo", type: "Monthly", highlight: true },
  { service: "Corporate Training", tier: "Enterprise", price: "$10K+", type: "Custom" },
  { service: "Enterprise Transformation", tier: "Enterprise", price: "$25K+", type: "6-month" },
  { service: "Speaking / Consulting", tier: "Enterprise", price: "$15K+", type: "Per event" },
];

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
          Complete <span className="text-gradient-red">Service Menu</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          From $297 one-time audits to $25K+ enterprise transformations.
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
              {rows.map((r) => (
                <tr
                  key={r.service}
                  className={`border-b border-border/50 transition-colors hover:bg-primary/5 ${
                    r.highlight ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="px-5 py-3.5 font-semibold text-foreground">{r.service}</td>
                  <td className="px-5 py-3.5 text-center text-muted-foreground">{r.tier}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="text-primary font-bold">{r.price}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                      {r.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/50">
          {rows.map((r) => (
            <div key={r.service} className={`p-4 ${r.highlight ? "bg-primary/5" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="font-heading font-bold text-foreground text-sm">{r.service}</p>
                <span className="text-primary font-bold text-sm">{r.price}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{r.tier}</span>
                <span>-</span>
                <span>{r.type}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <a
          href="#book"
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold glow-red hover:bg-primary/90 transition-colors"
        >
          Book Free Strategy Call
        </a>
      </motion.div>
    </div>
  </section>
);

export default PricingTable;
