import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Shield, Zap, ChevronRight, Users } from "lucide-react";
import { getServiceBySlug, getServicesByTier, getTierBySlug, typeLabels } from "@/data/services";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Service Not Found</h1>
          <p className="text-muted-foreground mb-4">The service you're looking for doesn't exist.</p>
          <Link to="/#programs" className="text-primary hover:underline">View all services</Link>
        </div>
      </div>
    );
  }

  const tier = getTierBySlug(service.tierSlug);
  const related = getServicesByTier(service.tierSlug).filter((s) => s.slug !== service.slug);
  const TierIcon = tier?.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav bar */}
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
          <span className="text-foreground">{service.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 pt-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Tier + delivery badges */}
              <div className="flex flex-wrap items-center gap-3">
                {tier && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {TierIcon && <TierIcon className="w-3 h-3" />} {tier.badge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted">
                  <Clock className="w-3 h-3" /> {service.delivery}
                </span>
                <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-muted">
                  {typeLabels[service.type]}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-heading font-bold">{service.name}</h1>
              <p className="text-lg text-foreground/80 leading-relaxed">{service.description}</p>

              {/* Features */}
              <div>
                <h2 className="text-xl font-heading font-bold mb-4">Key Features</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5 bg-card/50 rounded-lg px-4 py-3 border border-border/50">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h2 className="text-xl font-heading font-bold mb-4">What's Included</h2>
                <div className="glass-dark rounded-xl p-6 space-y-3">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div>
                <h2 className="text-xl font-heading font-bold mb-4">Ideal For</h2>
                <div className="flex items-start gap-3 bg-primary/5 rounded-xl px-5 py-4 border border-primary/20">
                  <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">{service.idealFor}</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Sticky pricing card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-20 h-fit"
            >
              <div className="glass-dark rounded-2xl p-6 space-y-5">
                <div>
                  <p className="text-3xl font-heading font-bold text-primary">{service.price}</p>
                  <p className="text-sm text-muted-foreground">{typeLabels[service.type]}{service.note ? ` - ${service.note}` : ""}</p>
                </div>

                <Link
                  to={`/checkout/${service.slug}`}
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-blue hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-2 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3 text-primary" />
                    <span>Satisfaction guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 text-primary" />
                    <span>Delivery: {service.delivery}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-primary" />
                    <span>Secure checkout</span>
                  </div>
                </div>

                {tier && (
                  <div className="pt-2 border-t border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground">Part of</p>
                    <p className="text-sm font-semibold text-foreground">{tier.name}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="px-4 py-16 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-heading font-bold mb-6">Related Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.slice(0, 3).map((s) => (
                <Link
                  key={s.slug}
                  to={`/service/${s.slug}`}
                  className="glass-dark rounded-xl p-5 hover:glow-blue hover:border-primary/30 transition-all duration-300 group"
                >
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">{s.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{s.price}</span>
                    <span className="text-xs text-muted-foreground">{typeLabels[s.type]}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServicePage;
