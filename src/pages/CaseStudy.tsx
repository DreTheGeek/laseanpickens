import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, Clock, Star, CheckCircle, Quote } from "lucide-react";

interface CaseStudyData {
  slug: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { metric: string; before: string; after: string; improvement: string }[];
  timeline: string;
  servicesUsed: string[];
  testimonial: { quote: string; author: string; role: string };
  story: string[];
}

const caseStudies: Record<string, CaseStudyData> = {
  "hvac-automation": {
    slug: "hvac-automation",
    title: "How an HVAC Company 10x'd Their Google Reviews in 30 Days",
    company: "Metro Climate Systems",
    industry: "HVAC / Home Services",
    challenge: "Metro Climate was getting 3-4 Google reviews per month despite completing 200+ service calls. Their manual follow-up process meant most customers were never asked for feedback. They were also losing leads due to slow response times and inconsistent follow-up.",
    solution: "We deployed a complete automation stack: automated review requests sent 2 hours post-service, a missed call text-back system, lead capture pipeline with instant response, and an AI chatbot for 24/7 customer support. All systems connected to their CRM for zero manual work.",
    results: [
      { metric: "Google Reviews/Month", before: "3-4", after: "47", improvement: "+1,075%" },
      { metric: "Lead Response Time", before: "4-6 hours", after: "Under 2 minutes", improvement: "-98%" },
      { metric: "Missed Call Recovery", before: "0%", after: "73%", improvement: "+73%" },
      { metric: "Booking Rate", before: "22%", after: "41%", improvement: "+86%" },
      { metric: "Admin Hours/Week", before: "25 hours", after: "4 hours", improvement: "-84%" },
    ],
    timeline: "3 weeks from kickoff to fully operational",
    servicesUsed: ["Complete Automation Setup", "Custom AI System Development", "Customer Service Setup"],
    testimonial: {
      quote: "LaSean and his team transformed our entire operation. We went from chasing leads and begging for reviews to having everything happen automatically. Our booking rate almost doubled and I got my weekends back.",
      author: "Mike Thompson",
      role: "Owner, Metro Climate Systems",
    },
    story: [
      "Metro Climate Systems had been in business for 12 years with a solid reputation, but their growth had plateaued. Despite doing great work, they were invisible online - only 47 total Google reviews compared to competitors with 200+.",
      "The real problem was not their service quality - it was their follow-up. Every review request required someone to manually send an email or text. With 200+ service calls per month, the office staff simply could not keep up.",
      "We started with a complete audit of their operations, identifying 15 manual processes that could be automated. Within the first week, we deployed the automated review request system - a text message sent 2 hours after job completion with a direct link to their Google review page.",
      "The results were immediate. In the first month, they collected 47 new reviews - more than the previous 12 months combined. But reviews were just the beginning.",
      "We also deployed a missed call text-back system that automatically texts any caller who does not get answered within 3 rings. This alone recovered 73% of previously lost calls. Combined with an AI chatbot handling after-hours inquiries, Metro Climate became a 24/7 operation without adding a single employee.",
      "The lead capture pipeline was the final piece. Every new inquiry - whether from their website, Google, or phone - now gets an instant automated response, is scored by priority, and routes to the right dispatcher. Response time dropped from hours to under 2 minutes.",
    ],
  },
  "consulting-firm-growth": {
    slug: "consulting-firm-growth",
    title: "From $15K to $87K Monthly Revenue in 90 Days",
    company: "Apex Advisory Group",
    industry: "Business Consulting",
    challenge: "Apex Advisory was a 2-person consulting firm doing $15K/month with inconsistent client acquisition. They had no email marketing, no content strategy, and were relying entirely on referrals and cold outreach.",
    solution: "We built a complete growth engine: strategic business plan with market positioning, email marketing system with automated nurture sequences, social media management for thought leadership, and a revenue optimization system to increase deal sizes and close rates.",
    results: [
      { metric: "Monthly Revenue", before: "$15,000", after: "$87,000", improvement: "+480%" },
      { metric: "Email List Size", before: "0", after: "2,400", improvement: "From scratch" },
      { metric: "Average Deal Size", before: "$3,500", after: "$8,200", improvement: "+134%" },
      { metric: "Inbound Leads/Month", before: "2-3", after: "18-22", improvement: "+633%" },
      { metric: "Content Pieces/Month", before: "0", after: "24", improvement: "New channel" },
    ],
    timeline: "90-day transformation engagement",
    servicesUsed: ["Strategic Business Plan Creation", "Email Marketing Systems", "Social Media Management", "Revenue Optimization System"],
    testimonial: {
      quote: "We went from struggling to find clients to having a waitlist. The email sequences alone brought in $40K in the first 60 days. LaSean did not just give us a plan - he built the entire machine.",
      author: "Rachel Kim",
      role: "Co-Founder, Apex Advisory Group",
    },
    story: [
      "Rachel and her partner David started Apex Advisory with deep expertise in operations consulting but zero marketing infrastructure. They were doing good work for the clients they had, but growth was entirely word-of-mouth.",
      "When they came to us, they had no email list, no social media presence, and no content strategy. Their website was a basic template with no conversion optimization. They were essentially invisible online.",
      "We started with a Strategic Business Plan to reposition them from a generic consulting firm to a specialized operations efficiency practice for mid-market companies. This positioning change alone increased their perceived value significantly.",
      "Next, we deployed Email Marketing Systems with a 12-part welcome sequence, weekly value newsletter, and automated follow-up for prospects who attended their webinars. The email list grew from zero to 2,400 subscribers in 90 days.",
      "Social Media Management put Rachel and David in front of their ideal clients daily. We created thought leadership content, engagement posts, and case study snippets that positioned them as the go-to experts in their niche.",
      "The Revenue Optimization System was the multiplier. We restructured their pricing from hourly to value-based packages, created upsell paths, and implemented a sales process that doubled their average deal size from $3,500 to $8,200.",
    ],
  },
  "ecommerce-transformation": {
    slug: "ecommerce-transformation",
    title: "How a D2C Brand Cut Support Costs 60% with AI",
    company: "Elevate Wellness Co",
    industry: "E-Commerce / Health & Wellness",
    challenge: "Elevate Wellness was spending $8,000/month on customer support staff to handle repetitive questions about shipping, returns, and product information. Response times averaged 6 hours and customer satisfaction was declining.",
    solution: "We built a custom AI customer service system with an intelligent chatbot trained on their product catalog, automated ticket routing, knowledge base, and escalation workflows. The AI handles 80% of inquiries autonomously.",
    results: [
      { metric: "Support Costs/Month", before: "$8,000", after: "$3,200", improvement: "-60%" },
      { metric: "Avg Response Time", before: "6 hours", after: "Under 30 seconds", improvement: "-99.8%" },
      { metric: "Customer Satisfaction", before: "3.2/5", after: "4.7/5", improvement: "+47%" },
      { metric: "Tickets Resolved by AI", before: "0%", after: "80%", improvement: "+80%" },
      { metric: "Support Team Size", before: "4 agents", after: "1 agent + AI", improvement: "-75%" },
    ],
    timeline: "2 weeks to full deployment",
    servicesUsed: ["Custom AI System Development", "Customer Service Setup"],
    testimonial: {
      quote: "Our customers actually prefer talking to the AI now because they get instant answers. We cut our support costs by more than half and our satisfaction scores are the highest they have ever been.",
      author: "Jessica Martinez",
      role: "CEO, Elevate Wellness Co",
    },
    story: [
      "Elevate Wellness was growing fast, but their customer support costs were growing even faster. With 4 full-time support agents handling 500+ tickets per week, most of which were repetitive questions about shipping status, return policies, and product ingredients.",
      "The agents were burned out, response times were slipping, and customer satisfaction was at an all-time low of 3.2 out of 5. Something had to change, but hiring more agents would only increase costs.",
      "We deployed a custom AI chatbot trained specifically on Elevate Wellness's product catalog, policies, and FAQs. The bot was integrated into their website, email, and social media channels for omni-channel support.",
      "Within the first week, the AI was handling 65% of all inquiries without any human involvement. By week two, that number climbed to 80%. The remaining 20% of complex issues are seamlessly escalated to the one remaining human agent with full context.",
      "The knowledge base we built contains 200+ articles that the AI references for accurate answers. It can check order status, process returns, recommend products based on customer needs, and even detect frustrated customers and escalate proactively.",
      "The result: support costs dropped from $8,000 to $3,200 per month, response times went from 6 hours to under 30 seconds, and customer satisfaction jumped to 4.7 out of 5. Three of the four support agents were redeployed to sales and marketing roles.",
    ],
  },
};

const CaseStudy = () => {
  const { slug } = useParams();
  const study = caseStudies[slug || ""];

  if (!study) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Case Study Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const otherStudies = Object.values(caseStudies).filter((s) => s.slug !== slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-primary/10 text-primary">{study.industry}</span>
            <span className="text-xs text-muted-foreground">Case Study</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{study.title}</h1>
          <p className="text-muted-foreground text-lg">{study.company} - {study.timeline}</p>
        </motion.div>

        {/* Results grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
          {study.results.map((r, i) => (
            <div key={i} className="glass-dark rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground mb-1">{r.metric}</p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-sm text-muted-foreground line-through">{r.before}</span>
                <ArrowRight className="w-3 h-3 text-primary" />
                <span className="text-lg font-heading font-bold text-foreground">{r.after}</span>
              </div>
              <p className="text-sm font-bold text-primary">{r.improvement}</p>
            </div>
          ))}
        </motion.div>

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-dark rounded-xl p-6">
            <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" /> The Challenge
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
          </div>
          <div className="glass-dark rounded-xl p-6 border border-primary/20">
            <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" /> The Solution
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
          </div>
        </div>

        {/* Full story */}
        <div className="mb-12">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-6">The Full Story</h3>
          <div className="space-y-4">
            {study.story.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="glass-dark rounded-xl p-8 border border-primary/20 mb-12">
          <Quote className="w-8 h-8 text-primary/30 mb-4" />
          <p className="text-lg text-foreground italic leading-relaxed mb-4">"{study.testimonial.quote}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground text-sm">{study.testimonial.author}</p>
              <p className="text-xs text-muted-foreground">{study.testimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Services used */}
        <div className="glass-dark rounded-xl p-6 mb-12">
          <h4 className="font-heading font-bold text-foreground mb-3">Services Used</h4>
          <div className="flex flex-wrap gap-2">
            {study.servicesUsed.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg border border-border text-sm text-foreground">{s}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-dark rounded-xl p-8 text-center border border-primary/20">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Want Results Like These?</h3>
          <p className="text-muted-foreground mb-6">Take our free assessment to see where AI can transform your business.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/#assessment" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm glow-blue inline-flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" /> Take Free Assessment
            </Link>
            <Link to="/#programs" className="px-6 py-3 rounded-lg border border-border text-muted-foreground font-medium text-sm hover:border-primary/50 hover:text-primary transition-colors inline-flex items-center justify-center">
              View Services
            </Link>
          </div>
        </div>

        {/* Other case studies */}
        {otherStudies.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">More Case Studies</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {otherStudies.map((s) => (
                <Link key={s.slug} to={"/case-study/" + s.slug} className="glass-dark rounded-xl p-6 border border-border hover:border-primary/30 transition-all group">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">{s.industry}</span>
                  <h4 className="font-heading font-bold text-foreground mt-2 group-hover:text-primary transition-colors">{s.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{s.company}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudy;
