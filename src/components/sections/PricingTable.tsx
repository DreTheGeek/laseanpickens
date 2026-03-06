import { motion } from "framer-motion";

const rows = [
  {
    service: "AI Business Starter",
    sub: "One-time setup",
    regular: "$1,497",
    launch: "$697",
    launchSub: null,
    save: "$800",
    roi: "$24,000/year",
  },
  {
    service: "Growth Accelerator",
    sub: "Monthly membership",
    regular: "$297/mo",
    launch: "$147/mo",
    launchSub: "$118/mo annual",
    save: "$1,800/year",
    roi: "$50,000+/year",
  },
  {
    service: "Business Transformation",
    sub: "90-day intensive",
    regular: "$4,997",
    launch: "$2,997",
    launchSub: null,
    save: "$2,000",
    roi: "$30,000+ increase",
  },
  {
    service: "VIP Coaching",
    sub: "Monthly program",
    regular: "$1,497/mo",
    launch: "$997/mo",
    launchSub: "$798/mo annual",
    save: "$6,000/year",
    roi: "$100,000+/year",
  },
  {
    service: "Empire Mastermind",
    sub: "Annual program",
    regular: "$25,000/yr",
    launch: "$15,000/yr",
    launchSub: "$1,497/mo option",
    save: "$10,000",
    roi: "$500K+ scale",
  },
  {
    service: "Enterprise Transform",
    sub: "6-month overhaul",
    regular: "$100,000",
    launch: "$75,000",
    launchSub: null,
    save: "$25,000",
    roi: "$1M+ guaranteed",
    highlight: true,
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
          From startup to empire - transparent pricing with launch discounts.
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
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Regular Price</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">Launch Price</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">You Save</th>
                <th className="text-center px-5 py-4 font-heading font-semibold text-foreground">ROI Potential</th>
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
                  <td className="px-5 py-4 text-center text-muted-foreground line-through">{r.regular}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="text-green-400 font-bold">{r.launch}</span>
                    {r.launchSub && (
                      <span className="block text-xs text-primary mt-0.5">{r.launchSub}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                      {r.save}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-foreground/80">{r.roi}</td>
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
                  <p className="text-xs text-muted-foreground">Regular</p>
                  <p className="line-through text-muted-foreground">{r.regular}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Launch</p>
                  <p className="text-green-400 font-bold">{r.launch}</p>
                  {r.launchSub && <p className="text-xs text-primary">{r.launchSub}</p>}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">You Save</p>
                  <span className="inline-block bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {r.save}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ROI Potential</p>
                  <p className="text-foreground/80">{r.roi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default PricingTable;
