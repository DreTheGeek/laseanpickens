import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Package, Sparkles } from "lucide-react";
import { getBundleBySlug, getServicesForBundle, typeLabels } from "@/data/services";

const BundlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const bundle = getBundleBySlug(slug || "");

  if (!bundle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Bundle Not Found</h1>
          <p className="text-muted-foreground mb-4">This bundle doesn't exist.</p>
          <Link to="/#programs" className="text-primary hover:underline">View all services</Link>
        </div>
      </div>
    );
  }

  const bundleServices = getServicesForBundle(bundle);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <div className="border-b border-border bg-background/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-lg text-foreground">
            LASEAN <span className="text-primary">PICKENS</span>
          </Link>
          <Link to="/#programs" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> All Services
          </Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/#programs" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{bundle.name}</span>
        </div>
      </div>

      <section className="px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-4">
                  <Sparkles className="w-3 h-3" /> Save {bundle.savings}
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{bundle.name}</h1>
                <p className="text-lg text-muted-foreground">{bundle.tagline}</p>
              </div>

              {/* Services included */}
              <div>
                <h2 className="text-xl font-heading font-bold mb-4">What's Included</h2>
                <div className="space-y-4">
                  {bundleServices.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/service/${s.slug}`}
                      className="block glass-dark rounded-xl p-5 hover:glow-blue hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary shrink-0" />
                          <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">{s.name}</h3>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="text-sm font-bold text-primary">{s.price}</span>
                          <span className="block text-[10px] text-muted-foreground">{typeLabels[s.type]}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed ml-6">{s.description}</p>
                      <div className="mt-3 ml-6 flex flex-wrap gap-2">
                        {s.features.slice(0, 3).map((f) => (
                          <span key={f} className="inline-flex items-center gap-1 text-[10px] text-foreground/60 bg-muted/50 px-2 py-0.5 rounded">
                            <Check className="w-2.5 h-2.5 text-primary" /> {f}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Pricing card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-20 h-fit"
            >
              <div className="glass-dark rounded-2xl p-6 space-y-5">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground line-through">{bundle.originalPrice}</p>
                  <p className="text-3xl font-heading font-bold text-primary">{bundle.bundlePrice}</p>
                  {bundle.recurring && (
                    <p className="text-xs text-muted-foreground mt-1">{bundle.recurring}</p>
                  )}
                </div>

                <div className="bg-green-500/10 rounded-lg px-4 py-2.5 text-center">
                  <p className="text-sm font-semibold text-green-400">You save {bundle.savings}</p>
                </div>

                <Link
                  to={`/checkout/${bundle.slug}`}
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-blue hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Get This Bundle <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-2 pt-2 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Includes:</p>
                  {bundleServices.map((s) => (
                    <div key={s.slug} className="flex items-center gap-2 text-xs text-foreground/70">
                      <Check className="w-3 h-3 text-primary shrink-0" />
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BundlePage;
