import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do you deliver so fast?",
    a: "My team of specialists works around the clock. We've built proprietary systems that allow us to execute at speeds most agencies can't match. What takes others weeks, we deliver in days.",
  },
  {
    q: "What makes your methods different?",
    a: "Proprietary systems developed over 10+ years and tested across 500+ businesses. Our frameworks combine advanced technology with proven business strategies that consistently deliver measurable ROI.",
  },
  {
    q: "Can you handle my industry?",
    a: "Our frameworks work across every business type. We've successfully transformed businesses in home services, SaaS, e-commerce, professional services, healthcare, real estate, and more. The principles of business growth are universal.",
  },
  {
    q: "What if I need changes?",
    a: "Our 24/7 support team handles all modifications. You'll have direct access to your dedicated specialist who can make adjustments in real-time. We're committed to getting it right.",
  },
  {
    q: "What kind of ROI can I expect?",
    a: "Results vary by business and tier, but our clients typically see 3-10x return on their investment. Many Quick Wins clients see ROI within the first week, while Transformation clients report sustained 20-40% revenue growth.",
  },
  {
    q: "How do I get started?",
    a: "Apply for a consultation using the form below. We'll conduct a free strategic assessment of your business, identify the biggest opportunities, and recommend the right service tier for your goals.",
  },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border-b border-border/50"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors pr-4">
          {q}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-muted-foreground leading-relaxed pb-5 pr-8">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => (
  <section className="py-20 md:py-32 px-4 border-t border-border">
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Frequently Asked <span className="text-gradient-blue">Questions</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to know before getting started.
        </p>
      </motion.div>

      <div>
        {faqs.map((faq, i) => (
          <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
