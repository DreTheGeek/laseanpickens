import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Bot, BarChart3, Users, MessageSquare, Star, Zap, Shield, FileSearch } from "lucide-react";
import SEO from "@/components/SEO";

const checklistSections = [
  {
    title: "Discovery & Assessment",
    icon: FileSearch,
    color: "text-blue-400",
    items: [
      {
        task: "Map every manual task your team does daily",
        why: "You can not automate what you have not identified. Spend one week logging every repetitive action - email responses, data entry, scheduling, follow-ups, reporting.",
        tool: "Use a spreadsheet or Notion to track task name, frequency, time spent, and who does it.",
        impact: "Most businesses discover 20-30 hours/week of automatable tasks.",
      },
      {
        task: "Identify your top 5 time-consuming repetitive processes",
        why: "Not everything needs automation. Focus on the 5 processes that eat the most time and have the clearest input-output pattern.",
        tool: "Rank your mapped tasks by hours/week. The top 5 are your quick wins.",
        impact: "Automating just your top 5 typically saves 10-15 hours/week.",
      },
      {
        task: "Audit your current tech stack for integration gaps",
        why: "Disconnected tools create manual work. If your CRM does not talk to your email tool, someone is copy-pasting data.",
        tool: "List every tool you use and draw lines between the ones that share data. Missing lines = automation opportunities.",
        impact: "Eliminating manual data transfer between tools saves 3-5 hours/week on average.",
      },
    ],
  },
  {
    title: "Quick Wins (Week 1-2)",
    icon: Zap,
    color: "text-emerald-400",
    items: [
      {
        task: "Calculate hours lost per week on admin tasks",
        why: "Hard numbers build the business case. When you know admin costs you $2,000/week in lost productivity, the investment in automation becomes obvious.",
        tool: "Multiply admin hours by your hourly rate. This is your automation budget ceiling.",
        impact: "Average business owner spends 16 hours/week on admin that could be automated.",
      },
      {
        task: "Set up automated email responses for new leads",
        why: "Speed to lead is everything. Businesses that respond within 5 minutes are 100x more likely to connect with leads vs 30 minutes.",
        tool: "Use your CRM or email tool to create instant auto-replies with next steps, calendar links, or qualifying questions.",
        impact: "Increases lead conversion by 30-50% from faster response alone.",
      },
      {
        task: "Implement a CRM with pipeline automation",
        why: "A CRM without automation is just a fancy spreadsheet. Pipeline automation moves deals forward without manual intervention.",
        tool: "Set up automatic stage progression, task creation on deal movement, and alerts when deals stall.",
        impact: "Automated pipelines increase close rates by 20-30%.",
      },
    ],
  },
  {
    title: "Growth Automation (Week 3-4)",
    icon: BarChart3,
    color: "text-purple-400",
    items: [
      {
        task: "Create automated follow-up sequences for lost leads",
        why: "80% of sales require 5+ follow-ups, but most businesses stop after 1-2. Automation ensures no lead falls through the cracks.",
        tool: "Build a 6-8 email sequence that re-engages leads over 30-60 days. Include value content, not just sales pitches.",
        impact: "Recovers 15-25% of previously lost leads.",
      },
      {
        task: "Deploy an AI chatbot for 24/7 customer support",
        why: "67% of customers prefer self-service. An AI chatbot handles common questions instantly, freeing your team for complex issues.",
        tool: "Train the bot on your FAQ, product info, and common objections. Set up human handoff for edge cases.",
        impact: "Reduces support ticket volume by 40-60%.",
      },
    ],
  },
  {
    title: "Scale & Optimize (Month 2+)",
    icon: Star,
    color: "text-amber-400",
    items: [
      {
        task: "Set up automated reporting dashboards",
        why: "Manual reporting is a time thief. Automated dashboards give you real-time insights without someone spending hours in spreadsheets.",
        tool: "Connect your data sources to a dashboard tool. Set up weekly email summaries of key metrics.",
        impact: "Saves 5-8 hours/week on reporting and gives faster decision-making.",
      },
      {
        task: "Build automated review collection after every project",
        why: "Reviews are the new word-of-mouth. Businesses that ask automatically get 10x more reviews than those that rely on manual requests.",
        tool: "Trigger a review request 2 hours after project completion via SMS and email. Include a direct link to your Google review page.",
        impact: "Increases review volume by 300-1,000% within the first month.",
      },
    ],
  },
];

const AutomationChecklistPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="AI Automation Checklist" description="The 10-point AI automation checklist - identify your biggest automation opportunities and save 15+ hours per week." />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
            <CheckCircle className="w-3 h-3" /> Free Resource
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            The 10-Point AI <span className="text-gradient-blue">Automation Checklist</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            The same framework our clients use to identify, prioritize, and implement AI automation - saving 15+ hours per week and recovering thousands in lost revenue.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-16">
          <div className="glass-dark rounded-xl p-5 text-center">
            <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-black text-foreground">15+ hrs</p>
            <p className="text-xs text-muted-foreground">Saved per week</p>
          </div>
          <div className="glass-dark rounded-xl p-5 text-center">
            <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-heading font-black text-foreground">$3,000+</p>
            <p className="text-xs text-muted-foreground">Monthly savings</p>
          </div>
          <div className="glass-dark rounded-xl p-5 text-center">
            <Bot className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-heading font-black text-foreground">10x</p>
            <p className="text-xs text-muted-foreground">More reviews</p>
          </div>
        </motion.div>

        {/* Checklist sections */}
        {checklistSections.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + sIdx * 0.05 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <section.icon className={"w-5 h-5 " + section.color} />
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="glass-dark rounded-xl p-6 border border-border hover:border-primary/20 transition-colors">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-lg">{item.task}</h3>
                  </div>

                  <div className="ml-10 space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Why This Matters</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{item.why}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">How To Do It</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{item.tool}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Shield className="w-3 h-3 text-emerald-400" />
                      <p className="text-xs font-medium text-emerald-400">{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-dark rounded-2xl p-8 md:p-12 text-center border border-primary/20 mt-16"
        >
          <Users className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
            Need Help Implementing This?
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Our team has helped 500+ businesses automate their operations. Take the free assessment to see exactly where AI can transform your business, or jump straight to our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#assessment"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" /> Take Free Assessment
            </Link>
            <Link
              to="/#quiz"
              className="px-6 py-3 rounded-lg border border-primary/30 text-primary font-medium text-sm inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Find My Service
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AutomationChecklistPage;
