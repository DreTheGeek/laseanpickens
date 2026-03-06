import { motion } from "framer-motion";

const rows = [
  {
    service: "Startup Automation",
    sub: "Monthly subscription",
    price: "$197/mo",
    target: "Small businesses",
    features: "Lead response, booking, email automation",
    revenueGoal: "500 clients - $98K MRR",
  },
  {
    service: "Business Intelligence",
    sub: "Monthly subscription",
    price: "$997/mo",
    target: "Growing businesses",
    features: "Analytics, predictive scoring, optimization",
    revenueGoal: "50 clients - $50K MRR",
  },
  {
    service: "AI Business Systems",
    sub: "Monthly subscription",
    price: "$2,997/mo",
    target: "Established businesses",
    features: "Full automation, custom workflows, advanced AI",
    revenueGoal: "20 clients - $60K MRR",
  },
  {
    service: "Enterprise Solutions",
    sub: "Monthly subscription",
    price: "$9,997/mo",
    target: "Large enterprises",
    features: "Multi-location, integrations, dedicated support",
    revenueGoal: "5 clients - $50K MRR",
  },
  {
    service: "Custom Development",
    sub: "Per project",
    price: "$75K+",
    target: "Bespoke needs",
    features: "Custom AI systems, full stack, maintenance",
    revenueGoal: "12 projects/year - $900K",
    highlight: true,
  },
  {
    service: "Managed AI Services",
    sub: "Monthly retainer",
    price: "$5K+/mo",
    target: "Hands-off automation",
    features: "Fully managed ops, continuous optimization",
    revenueGoal: "8 clients - $40K MRR",
  },
];

const PricingTable = () => (
  <section className="py-20 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
          Complete <span className="text-gradient-blue">Pricing</span> Overview
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Six service tiers designed to meet every business at their stage of growth.
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
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Price</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Target</th>
                <th className="text-left px-5 py-4 font-heading font-semibold text-foreground">Key Features</th>
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
                  <td className="px-5 py-4">
                    <p className="font-semibold text-foreground">{r.service}</p>
                    <p className="text-xs text-muted-foreground">{r.sub}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="text-primary font-bold text-base">{r.price}</span>
                  </td>
                  <td className="px-5 py-4 text-center text-muted-foreground">{r.target}</td>
                  <td className="px-5 py-4 text-foreground/80">{r.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border/50">
          {rows.map((r) => (
            <div key={r.service} className={`p-5 ${r.highlight ? "bg-primary/5" : ""}`}>
              <p className="font-heading font-bold text-foreground">{r.service}</p>
              <p className="text-xs text-muted-foreground mb-3">{r.sub}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-primary font-bold">{r.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="text-foreground/80">{r.target}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Features</p>
                  <p className="text-foreground/80">{r.features}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <p className="text-muted-foreground mb-4">
          Target: $298K MRR - $3.576M annually across all tiers
        </p>
        <a
          href="#book"
          className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold glow-blue hover:bg-primary/90 transition-colors"
        >
          Start Your AI Journey for $197/month
        </a>
      </motion.div>
    </div>
  </section>
);

export default PricingTable;
