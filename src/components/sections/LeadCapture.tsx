import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Calendar } from "lucide-react";

const LeadCapture = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="book" className="py-20 md:py-32 px-4 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            Ready to <span className="text-gradient-blue">Build</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Drop your info and let's talk about scaling your business with AI systems.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-dark rounded-xl p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">Message Received</h3>
            <p className="text-muted-foreground">LaSean's team will be in touch within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-dark rounded-xl p-8 space-y-4 text-left"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Your name" className="bg-background/50 border-border" required />
              <Input type="email" placeholder="Email address" className="bg-background/50 border-border" required />
            </div>
            <Textarea placeholder="Tell me about your business and goals..." rows={4} className="bg-background/50 border-border" />
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </motion.button>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-3 rounded-lg border border-primary/30 text-primary font-medium text-sm text-center inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Directly
              </motion.a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default LeadCapture;
