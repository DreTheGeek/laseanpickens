import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, ArrowRight, ArrowLeft, BarChart3, Zap, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: { label: string; score: number }[];
}

const assessmentQuestions: AssessmentQuestion[] = [
  { id: "q1", category: "Automation Readiness", question: "How much of your daily work involves repetitive manual tasks?", options: [{ label: "Almost everything is manual", score: 1 }, { label: "About 50/50 manual and automated", score: 2 }, { label: "Mostly automated with some manual", score: 3 }, { label: "Nearly everything runs on autopilot", score: 4 }] },
  { id: "q2", category: "Automation Readiness", question: "Do you have automated email sequences for new leads?", options: [{ label: "No - we respond manually to every lead", score: 1 }, { label: "We have a basic auto-responder", score: 2 }, { label: "We have a multi-step nurture sequence", score: 3 }, { label: "AI-powered personalized sequences", score: 4 }] },
  { id: "q3", category: "Technology Stack", question: "How would you describe your current tech stack?", options: [{ label: "Spreadsheets and basic email", score: 1 }, { label: "A few tools but not connected", score: 2 }, { label: "Integrated tools with some automation", score: 3 }, { label: "Fully connected, data flows automatically", score: 4 }] },
  { id: "q4", category: "Technology Stack", question: "How do you currently handle customer support?", options: [{ label: "I answer everything personally", score: 1 }, { label: "A team member handles it, mostly manual", score: 2 }, { label: "Ticketing system with some templates", score: 3 }, { label: "AI chatbot + automated routing + SLAs", score: 4 }] },
  { id: "q5", category: "Revenue Operations", question: "Can you tell which marketing channel drives the most revenue?", options: [{ label: "No idea - I do not track this", score: 1 }, { label: "I have a rough idea", score: 2 }, { label: "Yes, I track it monthly", score: 3 }, { label: "Real-time attribution across all channels", score: 4 }] },
  { id: "q6", category: "Revenue Operations", question: "How do you follow up with leads who do not buy immediately?", options: [{ label: "We do not - they are gone", score: 1 }, { label: "Occasional manual follow-up", score: 2 }, { label: "Automated follow-up sequence", score: 3 }, { label: "AI-scored leads with personalized re-engagement", score: 4 }] },
  { id: "q7", category: "Growth Scalability", question: "If your lead volume doubled tomorrow, could you handle it?", options: [{ label: "No - we would drop the ball", score: 1 }, { label: "Barely - it would be chaotic", score: 2 }, { label: "Yes, with some strain", score: 3 }, { label: "Easily - our systems scale automatically", score: 4 }] },
  { id: "q8", category: "Growth Scalability", question: "How do you make strategic business decisions?", options: [{ label: "Gut feeling mostly", score: 1 }, { label: "Some data, some intuition", score: 2 }, { label: "Data-driven with regular reporting", score: 3 }, { label: "AI-powered insights and predictive analytics", score: 4 }] },
  { id: "q9", category: "Brand & Content", question: "How consistent is your content and social media presence?", options: [{ label: "I barely post anything", score: 1 }, { label: "Sporadic - when I remember", score: 2 }, { label: "Regular schedule, but I do it myself", score: 3 }, { label: "Consistent across platforms, managed by my team", score: 4 }] },
  { id: "q10", category: "Brand & Content", question: "Do you have a system for collecting reviews and testimonials?", options: [{ label: "No system - random reviews only", score: 1 }, { label: "I ask sometimes but not systematically", score: 2 }, { label: "Automated review requests after projects", score: 3 }, { label: "Multi-channel review collection with AI follow-ups", score: 4 }] },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Automation Readiness": <Zap className="w-4 h-4" />,
  "Technology Stack": <Brain className="w-4 h-4" />,
  "Revenue Operations": <TrendingUp className="w-4 h-4" />,
  "Growth Scalability": <BarChart3 className="w-4 h-4" />,
  "Brand & Content": <CheckCircle2 className="w-4 h-4" />,
};

const getGrade = (pct: number) => {
  if (pct >= 90) return { grade: "A+", color: "text-emerald-400", label: "AI-First Enterprise", desc: "You are running an advanced operation. Let us help you push even further with cutting-edge AI." };
  if (pct >= 75) return { grade: "A", color: "text-green-400", label: "Automation Pro", desc: "Strong foundation. A few strategic upgrades could unlock your next level of growth." };
  if (pct >= 60) return { grade: "B", color: "text-blue-400", label: "Growth Ready", desc: "Good progress, but significant automation opportunities remain untapped." };
  if (pct >= 45) return { grade: "C", color: "text-yellow-400", label: "Efficiency Gap", desc: "You are leaving money on the table. Automation could save you 15+ hours per week." };
  if (pct >= 30) return { grade: "D", color: "text-orange-400", label: "Manual Overload", desc: "Your business is running on manual labor. AI automation would transform your operations." };
  return { grade: "F", color: "text-red-400", label: "Critical Need", desc: "You need automation urgently. You are likely losing leads, revenue, and time every single day." };
};

const BusinessAssessment = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score };
    setAnswers(newAnswers);
    if (step < assessmentQuestions.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      setTimeout(() => setShowResults(true), 250);
    }
  };

  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const maxScore = assessmentQuestions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const result = getGrade(percentage);

  const categoryScores = assessmentQuestions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = { total: 0, max: 0, count: 0 };
    acc[q.category].total += answers[q.id] || 0;
    acc[q.category].max += 4;
    acc[q.category].count++;
    return acc;
  }, {} as Record<string, { total: number; max: number; count: number }>);

  const weakestCategory = Object.entries(categoryScores)
    .filter(([, v]) => v.total > 0)
    .sort((a, b) => a[1].total / a[1].max - b[1].total / b[1].max)[0];

  const reset = () => { setStep(0); setAnswers({}); setShowResults(false); setEmailCaptured(false); setEmail(""); };

  return (
    <section id="assessment" className="py-20 md:py-32 px-4 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Brain className="w-3 h-3" /> Free AI Assessment
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            How AI-Ready Is Your <span className="text-gradient-blue">Business?</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4">Take this 2-minute assessment and get your AI Readiness Score with personalized recommendations.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div key={"aq-" + step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }} className="glass-dark rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                {assessmentQuestions.map((_, i) => (
                  <div key={i} className={"h-1 flex-1 rounded-full transition-colors duration-300 " + (i <= step ? "bg-primary" : "bg-border")} />
                ))}
              </div>

              <div className="flex items-center gap-2 mb-1">
                {categoryIcons[assessmentQuestions[step].category]}
                <span className="text-xs text-primary font-medium uppercase tracking-wider">{assessmentQuestions[step].category}</span>
              </div>
              <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mb-6">{assessmentQuestions[step].question}</h3>

              <div className="space-y-3">
                {assessmentQuestions[step].options.map((opt) => (
                  <motion.button
                    key={opt.label}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(assessmentQuestions[step].id, opt.score)}
                    className={"w-full text-left p-4 rounded-lg border transition-all duration-200 " +
                      (answers[assessmentQuestions[step].id] === opt.score
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background/30 text-muted-foreground hover:border-primary/50 hover:text-foreground")}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>

              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors">
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
              )}
            </motion.div>
          ) : !emailCaptured ? (
            <motion.div key="email-gate" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Your Results Are Ready!</h3>
              <p className="text-muted-foreground mb-6">Enter your email to unlock your full AI Readiness Report with personalized recommendations.</p>
              <form onSubmit={(e) => { e.preventDefault(); if (email) setEmailCaptured(true); }} className="max-w-sm mx-auto space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4" /> See My Results
                </motion.button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">We will also send you a detailed PDF report with action items.</p>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Score card */}
              <div className="glass-dark rounded-xl p-8 text-center">
                <p className="text-sm text-muted-foreground mb-2">Your AI Readiness Score</p>
                <div className={"text-7xl font-heading font-black " + result.color}>{result.grade}</div>
                <p className={"text-lg font-heading font-bold mt-2 " + result.color}>{result.label}</p>
                <p className="text-muted-foreground mt-2">{result.desc}</p>
                <div className="mt-6 w-full bg-border rounded-full h-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: percentage + "%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{percentage}% - You scored {totalScore} out of {maxScore} points</p>
              </div>

              {/* Category breakdown */}
              <div className="glass-dark rounded-xl p-8">
                <h4 className="font-heading font-bold text-foreground mb-4">Category Breakdown</h4>
                <div className="space-y-4">
                  {Object.entries(categoryScores).map(([cat, data]) => {
                    const pct = Math.round((data.total / data.max) * 100);
                    const isWeakest = weakestCategory && weakestCategory[0] === cat;
                    return (
                      <div key={cat}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 text-sm">
                            {categoryIcons[cat]}
                            <span className="text-foreground">{cat}</span>
                            {isWeakest && <span className="text-xs text-orange-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Biggest opportunity</span>}
                          </div>
                          <span className="text-sm text-muted-foreground">{pct}%</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2">
                          <motion.div initial={{ width: 0 }} animate={{ width: pct + "%" }} transition={{ duration: 0.8, delay: 0.2 }} className={"h-2 rounded-full " + (pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-blue-500" : pct >= 25 ? "bg-yellow-500" : "bg-red-500")} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="glass-dark rounded-xl p-8 text-center border border-primary/20">
                <h4 className="font-heading font-bold text-foreground text-lg mb-2">Ready to Improve Your Score?</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  {weakestCategory ? "Your biggest opportunity is in " + weakestCategory[0] + ". " : ""}
                  Let us show you exactly how AI can transform your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#quiz" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" /> Get Service Recommendations
                  </a>
                  <button onClick={reset} className="px-6 py-3 rounded-lg border border-border text-muted-foreground text-sm hover:border-primary/50 hover:text-primary transition-colors">
                    Retake Assessment
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BusinessAssessment;
