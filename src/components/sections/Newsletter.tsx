import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Check } from "lucide-react";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
            <Mail className="w-4 h-4" /> Weekly Insights
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            Get LaSean's <span className="text-gradient-blue">Strategy of the Week</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            AI automation tactics, business leverage strategies, and systems thinking — delivered to your inbox every week.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl glass-dark text-foreground"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium">You're in! Check your inbox.</span>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-card border-border h-12 text-base"
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-blue inline-flex items-center justify-center gap-2"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
