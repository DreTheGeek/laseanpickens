import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, FileDown, Sparkles } from "lucide-react";
import { submitExitIntentSignup } from "@/lib/webhooks";

const ExitIntentPopup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 768) return;

    // Only show once per session
    if (sessionStorage.getItem("exit_popup_shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor moves above the viewport (toward browser chrome / tab bar)
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "1");
        document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // Wait 5 seconds before arming (avoid false triggers on page load)
    const timer = setTimeout(() => {
      document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      submitExitIntentSignup(email);
      setSubmitted(true);
      setTimeout(() => {
        navigate("/resources/automation-checklist");
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass-dark rounded-2xl p-8 max-w-md w-full border border-primary/30 shadow-2xl"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Wait - Don't Leave Empty-Handed</h3>
                <p className="text-muted-foreground mb-6">
                  Grab our free <strong className="text-foreground">AI Automation Checklist</strong> - the same 10-point framework our clients use to save 15+ hours per week.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                    autoFocus
                  />
                  <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2">
                    <FileDown className="w-4 h-4" /> Get Free Checklist
                  </motion.button>
                </form>
                <button onClick={handleClose} className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  No thanks, I do not want to save time
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <FileDown className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">You are In!</h3>
                <p className="text-muted-foreground">Redirecting you to the full checklist now...</p>
                <a href="/resources/automation-checklist" className="mt-4 text-sm text-primary hover:underline inline-block">Go to Checklist Now</a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
