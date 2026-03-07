import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle, Target } from "lucide-react";
import { services, tiers, getServicesByTier } from "@/data/services";
import { submitQuizResults } from "@/lib/webhooks";

interface Answer {
  label: string;
  value: string;
  points: Record<string, number>;
}

interface Question {
  id: string;
  question: string;
  subtitle: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    id: "stage",
    question: "Where is your business right now?",
    subtitle: "This helps us match you with the right level of service.",
    answers: [
      { label: "Just starting out - pre-revenue or early stage", value: "startup", points: { "ai-automation": 2, transformation: 3, "done-for-you": 0, consulting: 0 } },
      { label: "Growing - making $5K-$25K/month", value: "growing", points: { "ai-automation": 3, transformation: 2, "done-for-you": 2, consulting: 1 } },
      { label: "Scaling - making $25K-$100K/month", value: "scaling", points: { "ai-automation": 2, transformation: 2, "done-for-you": 3, consulting: 2 } },
      { label: "Established - $100K+/month", value: "established", points: { "ai-automation": 1, transformation: 1, "done-for-you": 2, consulting: 3 } },
    ],
  },
  {
    id: "challenge",
    question: "What is your biggest challenge right now?",
    subtitle: "Pick the one that resonates most.",
    answers: [
      { label: "Too much manual work - I need automation", value: "manual", points: { "ai-automation": 3, transformation: 1, "done-for-you": 1, consulting: 0 } },
      { label: "No clear strategy or plan for growth", value: "strategy", points: { "ai-automation": 0, transformation: 3, "done-for-you": 0, consulting: 2 } },
      { label: "I can not do everything myself anymore", value: "capacity", points: { "ai-automation": 1, transformation: 0, "done-for-you": 3, consulting: 1 } },
      { label: "I need expert guidance for big decisions", value: "guidance", points: { "ai-automation": 0, transformation: 1, "done-for-you": 0, consulting: 3 } },
    ],
  },
  {
    id: "budget",
    question: "What is your investment range?",
    subtitle: "Every budget has a path to transformation.",
    answers: [
      { label: "Under $1,000 - I want to start lean", value: "low", points: { "ai-automation": 2, transformation: 2, "done-for-you": 1, consulting: 1 } },
      { label: "$1,000 - $5,000 - Ready to invest in growth", value: "mid", points: { "ai-automation": 3, transformation: 3, "done-for-you": 2, consulting: 1 } },
      { label: "$5,000 - $15,000 - I want serious results", value: "high", points: { "ai-automation": 2, transformation: 2, "done-for-you": 3, consulting: 2 } },
      { label: "$15,000+ - Ready for enterprise transformation", value: "enterprise", points: { "ai-automation": 1, transformation: 1, "done-for-you": 2, consulting: 3 } },
    ],
  },
  {
    id: "timeline",
    question: "How soon do you need results?",
    subtitle: "We can move as fast as you need.",
    answers: [
      { label: "Yesterday - I need this done ASAP", value: "urgent", points: { "ai-automation": 1, transformation: 3, "done-for-you": 2, consulting: 1 } },
      { label: "Within 2-4 weeks", value: "soon", points: { "ai-automation": 3, transformation: 2, "done-for-you": 2, consulting: 1 } },
      { label: "1-3 months - building for the long term", value: "medium", points: { "ai-automation": 2, transformation: 1, "done-for-you": 3, consulting: 2 } },
      { label: "I want ongoing, continuous improvement", value: "ongoing", points: { "ai-automation": 1, transformation: 0, "done-for-you": 3, consulting: 3 } },
    ],
  },
  {
    id: "involvement",
    question: "How involved do you want to be?",
    subtitle: "Some people want hands-on, others want hands-off.",
    answers: [
      { label: "Teach me - I want to learn and do it myself", value: "diy", points: { "ai-automation": 3, transformation: 2, "done-for-you": 0, consulting: 1 } },
      { label: "Guide me - I will execute with your direction", value: "guided", points: { "ai-automation": 2, transformation: 3, "done-for-you": 1, consulting: 2 } },
      { label: "Just do it for me - I want to focus on my business", value: "done", points: { "ai-automation": 1, transformation: 1, "done-for-you": 3, consulting: 0 } },
      { label: "Partner with me - I want strategic collaboration", value: "partner", points: { "ai-automation": 0, transformation: 1, "done-for-you": 1, consulting: 3 } },
    ],
  },
];

const ServiceQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({ "ai-automation": 0, transformation: 0, "done-for-you": 0, consulting: 0 });
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (question: Question, answer: Answer) => {
    const newAnswers = { ...answers, [question.id]: answer.value };
    const newScores = { ...scores };
    // Subtract old answer's points if re-answering
    const prevValue = answers[question.id];
    if (prevValue) {
      const prevAnswer = question.answers.find((a) => a.value === prevValue);
      if (prevAnswer) {
        Object.entries(prevAnswer.points).forEach(([tier, pts]) => {
          newScores[tier] = (newScores[tier] || 0) - pts;
        });
      }
    }
    Object.entries(answer.points).forEach(([tier, pts]) => {
      newScores[tier] = (newScores[tier] || 0) + pts;
    });
    setAnswers(newAnswers);
    setScores(newScores);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
        // Save quiz results to Supabase
        const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
        const topTierSlug = sorted[0]?.[0] || "";
        const topServices = getServicesByTier(topTierSlug);
        submitQuizResults(null, newAnswers, topTierSlug, topServices.slice(0, 3).map((s) => s.slug));
      }, 300);
    }
  };

  const getRecommendations = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTierSlug = sorted[0][0];
    const secondTierSlug = sorted[1][0];

    const topTier = tiers.find((t) => t.slug === topTierSlug);
    const topServices = getServicesByTier(topTierSlug);
    const secondServices = getServicesByTier(secondTierSlug);

    // Pick best services based on budget answer
    const budget = answers.budget;
    let primaryServices = topServices;
    if (budget === "low") primaryServices = topServices.filter((s) => s.priceValue <= 1000);
    else if (budget === "mid") primaryServices = topServices.filter((s) => s.priceValue <= 5000);
    else if (budget === "high") primaryServices = topServices.filter((s) => s.priceValue <= 15000);

    if (!primaryServices.length) primaryServices = topServices.slice(0, 2);

    const recommended = primaryServices.slice(0, 2);
    const alsoConsider = secondServices.slice(0, 1);

    return { topTier, recommended, alsoConsider, topTierSlug };
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setScores({ "ai-automation": 0, transformation: 0, "done-for-you": 0, consulting: 0 });
    setShowResults(false);
  };

  return (
    <section id="quiz" className="py-20 md:py-32 px-4 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <Target className="w-3 h-3" /> Find Your Perfect Service
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold">
            Not Sure Where to <span className="text-gradient-blue">Start?</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4">Answer 5 quick questions and we will recommend the exact services that fit your business.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div key={"q-" + step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="glass-dark rounded-xl p-8">
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {questions.map((_, i) => (
                  <div key={i} className={"h-1.5 flex-1 rounded-full transition-colors duration-300 " + (i <= step ? "bg-primary" : "bg-border")} />
                ))}
              </div>

              <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">Question {step + 1} of {questions.length}</p>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">{questions[step].question}</h3>
              <p className="text-sm text-muted-foreground mb-6">{questions[step].subtitle}</p>

              <div className="space-y-3">
                {questions[step].answers.map((answer) => (
                  <motion.button
                    key={answer.value}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(questions[step], answer)}
                    className={"w-full text-left p-4 rounded-lg border transition-all duration-200 " +
                      (answers[questions[step].id] === answer.value
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background/30 text-muted-foreground hover:border-primary/50 hover:text-foreground")}
                  >
                    {answer.label}
                  </motion.button>
                ))}
              </div>

              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-6 text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors">
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {(() => {
                const { topTier, recommended, alsoConsider } = getRecommendations();
                return (
                  <>
                    <div className="glass-dark rounded-xl p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Your Recommended Path</h3>
                      <p className="text-muted-foreground">
                        Based on your answers, <span className="text-primary font-semibold">{topTier?.name}</span> is your best starting point.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-primary font-medium uppercase tracking-wider">Recommended for you</p>
                      {recommended.map((service) => (
                        <Link key={service.slug} to={"/service/" + service.slug} className="block">
                          <motion.div whileHover={{ scale: 1.02, y: -2 }} className="glass-dark rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-heading font-bold text-foreground">{service.name}</h4>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                                <div className="flex items-center gap-3 mt-3">
                                  <span className="text-primary font-bold">{service.price}</span>
                                  <span className="text-xs text-muted-foreground">{service.delivery}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-primary text-sm shrink-0">
                                <CheckCircle className="w-4 h-4" /> Best Match
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    {alsoConsider.length > 0 && (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Also consider</p>
                        {alsoConsider.map((service) => (
                          <Link key={service.slug} to={"/service/" + service.slug} className="block">
                            <motion.div whileHover={{ scale: 1.02, y: -2 }} className="glass-dark rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
                              <h4 className="font-heading font-bold text-foreground">{service.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                              <div className="flex items-center gap-3 mt-3">
                                <span className="text-primary font-bold">{service.price}</span>
                                <span className="text-xs text-muted-foreground">{service.delivery}</span>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="#programs" className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2">
                        <ArrowRight className="w-4 h-4" /> View All Services
                      </a>
                      <button onClick={reset} className="flex-1 py-3 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-primary/50 hover:text-primary transition-colors">
                        Retake Quiz
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServiceQuiz;
