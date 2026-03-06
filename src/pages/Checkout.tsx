import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Shield, Lock, Clock, Check, CreditCard } from "lucide-react";
import { getServiceBySlug, getBundleBySlug, getServicesForBundle, typeLabels } from "@/data/services";

const Checkout = () => {
  const { slug } = useParams<{ slug: string }>();
  const [submitted, setSubmitted] = useState(false);

  // Check if it's a bundle or service
  const service = getServiceBySlug(slug || "");
  const bundle = getBundleBySlug(slug || "");
  const isBundle = !!bundle;

  const itemName = isBundle ? bundle.name : service?.name;
  const itemPrice = isBundle ? bundle.bundlePrice : service?.price;
  const itemType = isBundle ? (bundle.recurring ? "Bundle + recurring" : "Bundle") : service ? typeLabels[service.type] : "";

  if (!service && !bundle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Not Found</h1>
          <p className="text-muted-foreground mb-4">This service or bundle doesn't exist.</p>
          <Link to="/#programs" className="text-primary hover:underline">View all services</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <div className="border-b border-border bg-background/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-lg text-foreground">
            LASEAN <span className="text-primary">PICKENS</span>
          </Link>
          <Link
            to={isBundle ? `/bundle/${slug}` : `/service/${slug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-dark rounded-2xl p-12 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Order Confirmed</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase! Our team will reach out within 24 hours to begin onboarding.
            </p>
            <div className="glass-dark rounded-lg p-4 mb-6 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Service:</span>
                <span className="text-sm font-semibold text-foreground">{itemName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="text-sm font-bold text-primary">{itemPrice}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              A confirmation email has been sent. Check your inbox for next steps.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Return to homepage
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-2xl font-heading font-bold mb-6">Complete Your Order</h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-dark rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-heading font-semibold">Your Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Company Name</label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-dark rounded-xl p-6 space-y-4">
                  <h2 className="text-base font-heading font-semibold">Additional Notes</h2>
                  <textarea
                    rows={3}
                    placeholder="Anything specific you'd like us to know before we get started..."
                    className="w-full bg-background/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-blue hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Proceed to Payment - {itemPrice}
                </motion.button>

                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-primary" /> SSL Secured</span>
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-primary" /> PCI Compliant</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3 text-primary" /> Satisfaction Guarantee</span>
                </div>
              </form>
            </motion.div>

            {/* Right: Order summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-20 h-fit"
            >
              <div className="glass-dark rounded-2xl p-6 space-y-4">
                <h2 className="text-base font-heading font-semibold">Order Summary</h2>

                <div className="border-b border-border/50 pb-4">
                  <p className="font-semibold text-foreground">{itemName}</p>
                  <p className="text-xs text-muted-foreground">{itemType}</p>
                </div>

                {isBundle && bundle && (
                  <div className="space-y-2 border-b border-border/50 pb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Includes:</p>
                    {getServicesForBundle(bundle).map((s) => (
                      <div key={s.slug} className="flex items-center justify-between text-xs">
                        <span className="text-foreground/80">{s.name}</span>
                        <span className="text-muted-foreground">{s.price}</span>
                      </div>
                    ))}
                    {bundle.recurring && (
                      <p className="text-[10px] text-muted-foreground mt-1">{bundle.recurring}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  {isBundle && bundle && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Original price:</span>
                      <span className="text-muted-foreground line-through">{bundle.originalPrice}</span>
                    </div>
                  )}
                  {isBundle && bundle && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-400 font-semibold">You save:</span>
                      <span className="text-green-400 font-semibold">{bundle.savings}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-sm font-semibold text-foreground">Total:</span>
                    <span className="text-xl font-heading font-bold text-primary">{itemPrice}</span>
                  </div>
                </div>

                {!isBundle && service && (
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>Delivery: {service.delivery}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
