import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Sparkles, Star } from "lucide-react";
import { bundles, getServicesForBundle } from "@/data/services";
import { Badge } from "@/components/ui/badge";

const Bundles = () => (
  <section className="py-20 px-4 border-t border-border">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
          Save More with <span className="text-gradient-blue">Bundles</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Combine services for maximum impact and savings. Each bundle is designed for a specific stage of growth.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bundles.map((bundle, i) => {
          const services = getServicesForBundle(bundle);
          return (
            <motion.div
              key={bundle.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative glass-dark rounded-2xl p-6 flex flex-col transition-all duration-300 ${
                bundle.highlight
                  ? "border-primary/50 glow-blue-strong"
                  : "hover:glow-blue hover:border-primary/30"
              }`}
            >
              {bundle.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4">
                  <Star className="w-3 h-3 mr-1" /> Best Value
                </Badge>
              )}

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-3 w-fit">
                <Sparkles className="w-3 h-3" /> Save {bundle.savings}
              </div>

              <h3 className="text-lg font-heading font-bold text-foreground mb-1">{bundle.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{bundle.tagline}</p>

              <div className="space-y-2 flex-1 mb-4">
                {services.map((s) => (
                  <div key={s.slug} className="flex items-center gap-2 text-xs text-foreground/70">
                    <Package className="w-3 h-3 text-primary shrink-0" />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground line-through">{bundle.originalPrice}</p>
                <p className="text-2xl font-heading font-bold text-primary">{bundle.bundlePrice}</p>
                {bundle.recurring && (
                  <p className="text-[10px] text-muted-foreground">{bundle.recurring}</p>
                )}
              </div>

              <Link
                to={`/bundle/${bundle.slug}`}
                className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center flex items-center justify-center gap-2 ${
                  bundle.highlight
                    ? "bg-primary text-primary-foreground glow-blue"
                    : "border border-primary/30 text-primary hover:bg-primary/10"
                }`}
              >
                View Bundle <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Bundles;
