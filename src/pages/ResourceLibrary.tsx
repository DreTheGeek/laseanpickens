import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileDown, Video, BookOpen, FileText, Calculator, Lock, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { submitChecklistSignup } from "@/lib/webhooks";

interface Resource {
  slug: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "guide" | "tool";
  gated: boolean;
  category: string;
  downloadUrl?: string;
}

const resources: Resource[] = [
  { slug: "ai-automation-checklist", title: "The 10-Point AI Automation Checklist", description: "Identify your biggest automation opportunities and start saving 15+ hours per week with this actionable framework.", type: "pdf", gated: true, category: "Automation", downloadUrl: "/resources/automation-checklist" },
  { slug: "ai-tools-guide", title: "2026 AI Tools Recommendation Guide", description: "Our curated list of the best AI tools for small-to-mid businesses, organized by use case with pricing comparisons.", type: "guide", gated: true, category: "Technology" },
  { slug: "roi-calculator", title: "AI ROI Calculator", description: "Calculate exactly how much time and money AI automation could save your business. Interactive tool on our homepage.", type: "tool", gated: false, category: "Automation", downloadUrl: "/#roi" },
  { slug: "case-study-hvac", title: "Case Study: How an HVAC Company 10x'd Reviews", description: "Learn how we helped a mid-sized HVAC company go from 3 reviews/month to 47 using automated review collection.", type: "pdf", gated: false, category: "Case Studies", downloadUrl: "/case-study/hvac-automation" },
  { slug: "business-plan-template", title: "AI-Ready Business Plan Template", description: "The same framework we use for our $997 Business Plan service. Includes financial projections and growth strategy sections.", type: "pdf", gated: true, category: "Strategy" },
  { slug: "email-marketing-playbook", title: "Email Marketing Playbook for Service Businesses", description: "Copy-paste email templates, sequence blueprints, and subject line formulas that drive opens and conversions.", type: "guide", gated: true, category: "Marketing" },
  { slug: "intro-to-ai-automation", title: "Introduction to AI for Business Owners", description: "A 20-minute video walkthrough explaining AI automation in plain English - no jargon, just practical applications.", type: "video", gated: false, category: "Education", downloadUrl: "/#quiz" },
  { slug: "cost-of-not-automating", title: "The Cost of Not Automating", description: "An eye-opening breakdown of what manual processes actually cost your business in time, money, and missed opportunities.", type: "pdf", gated: true, category: "Automation" },
];

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  guide: <BookOpen className="w-5 h-5" />,
  tool: <Calculator className="w-5 h-5" />,
};

const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

const ResourceLibrary = () => {
  const [filter, setFilter] = useState("All");
  const [unlockedEmails, setUnlockedEmails] = useState<Record<string, string>>({});
  const [unlockingSlug, setUnlockingSlug] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");

  const filtered = filter === "All" ? resources : resources.filter((r) => r.category === filter);

  const handleUnlock = (slug: string) => {
    if (emailInput) {
      setUnlockedEmails({ ...unlockedEmails, [slug]: emailInput });
      submitChecklistSignup(emailInput);
      setUnlockingSlug(null);
      setEmailInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="Resources" description="Free resources, guides, and tools for AI business automation." />
      <div className="max-w-5xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Resource <span className="text-gradient-blue">Library</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Free tools, guides, and templates to help you implement AI automation in your business.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={"px-4 py-2 rounded-lg text-sm font-medium transition-all " +
                (filter === cat ? "bg-primary text-primary-foreground" : "bg-background/50 border border-border text-muted-foreground hover:border-primary/50 hover:text-primary")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resource grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((resource, i) => (
            <motion.div
              key={resource.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-dark rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {typeIcons[resource.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">{resource.category}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">{resource.type}</span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>

                  <div className="mt-4">
                    {!resource.gated || unlockedEmails[resource.slug] ? (
                      resource.downloadUrl ? (
                        <a href={resource.downloadUrl} className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
                          {resource.type === "video" ? <Video className="w-4 h-4" /> : <FileDown className="w-4 h-4" />}
                          {resource.type === "video" ? "Watch Now" : resource.type === "tool" ? "Open Tool" : "Download"}
                          {unlockedEmails[resource.slug] && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Unlocked - available in your Client Portal
                        </span>
                      )
                    ) : unlockingSlug === resource.slug ? (
                      <form onSubmit={(e) => { e.preventDefault(); handleUnlock(resource.slug); }} className="flex gap-2">
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-3 py-2 rounded-lg bg-background/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                          autoFocus
                        />
                        <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                          Unlock
                        </button>
                      </form>
                    ) : (
                      <button onClick={() => setUnlockingSlug(resource.slug)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium transition-colors">
                        <Lock className="w-4 h-4" /> Enter email to unlock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
