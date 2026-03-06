import { motion } from "framer-motion";

const rows = [
  { service: "AI Business Audit & Strategy", tier: "AI & Automation", price: "$697", type: "One-time" },
  { service: "AI Integration & Training", tier: "AI & Automation", price: "$1,497", type: "One-time" },
  { service: "Complete Automation Setup", tier: "AI & Automation", price: "$2,497", type: "One-time" },
  { service: "Custom AI System Development", tier: "AI & Automation", price: "$4,997", type: "One-time" },
  { service: "Strategic Business Plan Creation", tier: "Transformation", price: "$997", type: "One-time", highlight: true },
  { service: "Complete Business Rebrand", tier: "Transformation", price: "$2,997", type: "48hr delivery", highlight: true },
  { service: "Revenue Optimization System", tier: "Transformation", price: "$4,997", type: "One-time", highlight: true },
  { service: "Market Expansion Strategy", tier: "Transformation", price: "$9,997", type: "One-time", highlight: true },
  { service: "Email Marketing Systems", tier: "Done-For-You", price: "$197/mo", type: "Monthly" },
  { service: "Social Media Management", tier: "Done-For-You", price: "$297/mo", type: "Monthly" },
  { service: "Content Creation & Management", tier: "Done-For-You", price: "$497/mo", type: "Monthly" },
  { service: "Analytics & Reporting", tier: "Done-For-You", price: "$697/mo", type: "Monthly" },
  { service: "Customer Service Setup", tier: "Done-For-You", price: "$2,997", type: "One-time" },
  { service: "1-on-1 Strategy Sessions", tier: "Consulting", price: "$997", type: "Per session" },
  { service: "Group Mastermind Access", tier: "Consulting", price: "$2,997/mo", type: "Monthly" },
  { service: "Executive Advisory Retainer", tier: "Consulting", price: "$4,997/mo", type: "Monthly" },
  { service: "Speaking & Workshops", tier: "Consulting", price: "$15K+", type: "Per event" },
  { service: "Corporate Transformation", tier: "Consulting", price: "$25K+", type: "Custom" },
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
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold glow-blue hover:bg-primary/90 transition-colors"
        >
          Apply for Consultation
        </a>
      </motion.div>
    </div>
  </section>
);

export default PricingTable;
