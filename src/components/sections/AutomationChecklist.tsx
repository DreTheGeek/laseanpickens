import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileDown, CheckSquare, Mail, ArrowRight } from "lucide-react";
import { submitChecklistSignup } from "@/lib/webhooks";

const checklistItems = [
  "Map every manual task your team does daily",
  "Identify your top 5 time-consuming repetitive processes",
  "Audit your current tech stack for integration gaps",
  "Calculate hours lost per week on admin tasks",
  "Set up automated email responses for new leads",
  "Implement a CRM with pipeline automation",
  "Create automated follow-up sequences for lost leads",
  "Deploy an AI chatbot for 24/7 customer support",
  "Set up automated reporting dashboards",
  "Build automated review collection after every project",
];

const AutomationChecklist = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      submitChecklistSignup(email);
      setSubmitted(true);
      setTimeout(() => navigate("/resources/automation-checklist"), 2000);
    }
  };

  return (
    <section className="py-20 md:py-32 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - preview */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <FileDown className="w-3 h-3" /> Free Download
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              The 10-Point AI <span className="text-gradient-blue">Automation Checklist</span>
            </h2>
            <p className="text-muted-foreground mb-6">Is your business ready for AI? Use this checklist to identify your biggest automation opportunities and start saving 15+ hours per week.</p>

            <div className="glass-dark rounded-xl p-6 space-y-3">
              {checklistItems.slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckSquare className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground italic">+ 5 more actionable items inside...</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {!submitted ? (
              <div className="glass-dark rounded-xl p-8 border border-primary/20">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">Get Your Free Checklist</h3>
                <p className="text-sm text-muted-foreground mb-6">Enter your email and we will send you the full 10-point checklist plus a bonus AI tool recommendation guide.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2">
                    <FileDown className="w-4 h-4" /> Download Free Checklist
                  </motion.button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">No spam. Unsubscribe anytime.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-dark rounded-xl p-8 text-center border border-emerald-500/20">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckSquare className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">You are In!</h3>
                <p className="text-muted-foreground mb-4">Redirecting you to the full checklist now...</p>
                <p className="text-sm text-muted-foreground mb-6">We also sent a copy to <strong className="text-foreground">{email}</strong></p>
                <a href="/resources/automation-checklist" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                  <ArrowRight className="w-4 h-4" /> Go to Checklist Now
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationChecklist;
