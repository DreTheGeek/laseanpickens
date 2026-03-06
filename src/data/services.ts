import { Bot, Cog, Headphones, Crown } from "lucide-react";

/* ================================================================
   TYPES
   ================================================================ */

export interface Service {
  slug: string;
  name: string;
  tierSlug: string;
  price: string;
  priceValue: number;
  type: "one-time" | "monthly" | "per-session" | "per-event" | "custom";
  delivery: string;
  description: string;
  features: string[];
  includes: string[];
  idealFor: string;
  note?: string;
}

export interface Tier {
  slug: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  tagline: string;
  delivery: string;
  accent: string;
  popular?: boolean;
}

export interface Bundle {
  slug: string;
  name: string;
  tagline: string;
  serviceSlugs: string[];
  originalPrice: string;
  bundlePrice: string;
  savings: string;
  recurring?: string;
  highlight?: boolean;
}

/* ================================================================
   TIERS
   ================================================================ */

export const tiers: Tier[] = [
  {
    slug: "ai-automation",
    name: "AI & Automation Mastery",
    icon: Bot,
    badge: "Technical Expertise",
    tagline: "Your authority in AI and automation",
    delivery: "2-4 weeks",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    slug: "transformation",
    name: "Business Transformation",
    icon: Cog,
    badge: "Proprietary Systems",
    tagline: "Proprietary methods that deliver fast",
    delivery: "24-72 hours",
    accent: "from-blue-500 to-purple-500",
    popular: true,
  },
  {
    slug: "done-for-you",
    name: "Done-For-You Services",
    icon: Headphones,
    badge: "Full-Service Delivery",
    tagline: "My team handles everything 24/7",
    delivery: "Ongoing 24/7",
    accent: "from-purple-500 to-pink-500",
  },
  {
    slug: "consulting",
    name: "Strategic Consulting",
    icon: Crown,
    badge: "Executive Access",
    tagline: "Direct access for serious operators",
    delivery: "White-glove service",
    accent: "from-pink-500 to-amber-500",
  },
];

/* ================================================================
   SERVICES (18 total)
   ================================================================ */

export const services: Service[] = [
  // TIER 1: AI & Automation Mastery
  {
    slug: "ai-business-audit",
    name: "AI Business Audit & Strategy",
    tierSlug: "ai-automation",
    price: "$697",
    priceValue: 697,
    type: "one-time",
    delivery: "1-2 weeks",
    description: "A comprehensive audit of your entire business operations to identify where AI and automation can create the biggest impact. We analyze your workflows, tech stack, customer journey, and revenue streams to build a custom AI implementation roadmap.",
    features: [
      "Full business operations analysis",
      "AI opportunity identification across all departments",
      "Custom implementation roadmap with priorities",
      "ROI projections for each recommendation",
      "Technology stack evaluation and recommendations",
      "30-minute strategy review call with LaSean",
    ],
    includes: [
      "Detailed written audit report (20+ pages)",
      "Priority-ranked AI implementation roadmap",
      "Technology recommendation guide",
      "ROI projection spreadsheet",
      "Recording of strategy review call",
    ],
    idealFor: "Business owners who want to understand exactly where AI can save time, cut costs, and increase revenue before making any investment.",
  },
  {
    slug: "ai-integration-training",
    name: "AI Integration & Training",
    tierSlug: "ai-automation",
    price: "$1,497",
    priceValue: 1497,
    type: "one-time",
    delivery: "2-3 weeks",
    description: "Hands-on integration of AI tools into your existing workflows, plus comprehensive training for your team. We don't just set it up and leave - we make sure your team knows exactly how to use every system we deploy.",
    features: [
      "AI tool selection and configuration",
      "Integration with your existing software stack",
      "Custom workflow automation setup",
      "Team training sessions (recorded)",
      "30-day post-integration support",
      "Standard operating procedures documentation",
    ],
    includes: [
      "Up to 5 AI tool integrations",
      "Custom workflow documentation",
      "2 team training sessions (1 hour each)",
      "SOP manual for all new systems",
      "30-day email support after delivery",
    ],
    idealFor: "Teams that have identified their AI needs but need expert help with implementation and getting everyone up to speed.",
  },
  {
    slug: "complete-automation-setup",
    name: "Complete Automation Setup",
    tierSlug: "ai-automation",
    price: "$2,497",
    priceValue: 2497,
    type: "one-time",
    delivery: "2-4 weeks",
    description: "End-to-end automation of your core business processes. From lead capture to customer onboarding, follow-ups to reporting - we build the entire automation backbone of your business so it runs 24/7 without manual intervention.",
    features: [
      "Complete workflow mapping and optimization",
      "CRM automation and pipeline setup",
      "Email sequence automation",
      "Lead capture and nurturing funnels",
      "Internal notification and alert systems",
      "Reporting dashboard configuration",
      "60-day post-setup support",
    ],
    includes: [
      "Full CRM setup and configuration",
      "Up to 10 automated workflows",
      "Email template library (20+ templates)",
      "Lead scoring and routing system",
      "Custom reporting dashboard",
      "60-day support with priority response",
    ],
    idealFor: "Businesses ready to eliminate manual busywork and run their operations on autopilot with intelligent automation.",
  },
  {
    slug: "custom-ai-development",
    name: "Custom AI System Development",
    tierSlug: "ai-automation",
    price: "$4,997",
    priceValue: 4997,
    type: "one-time",
    delivery: "3-4 weeks",
    description: "Fully custom AI systems built specifically for your business. This includes AI voice agents, intelligent chatbots, predictive analytics tools, and custom AI workflows that give you capabilities your competitors don't have.",
    features: [
      "Custom AI system architecture and design",
      "AI voice agent development (Vapi)",
      "Intelligent chatbot deployment",
      "Custom API integrations",
      "Machine learning model configuration",
      "Predictive analytics dashboard",
      "90-day maintenance and optimization",
    ],
    includes: [
      "Custom-built AI system (fully owned by you)",
      "AI voice agent handling calls 24/7",
      "Intelligent chatbot for your website",
      "Full API documentation",
      "Training on system management",
      "90-day maintenance and support included",
    ],
    idealFor: "Businesses that want a competitive advantage through custom AI technology that is built specifically for their industry and operations.",
  },

  // TIER 2: Business Transformation
  {
    slug: "business-plan-creation",
    name: "Strategic Business Plan Creation",
    tierSlug: "transformation",
    price: "$997",
    priceValue: 997,
    type: "one-time",
    delivery: "48-72 hours",
    description: "A professionally crafted business plan built using our proprietary frameworks and research team. We analyze your market, competition, and opportunities to create a comprehensive plan that serves as your growth blueprint.",
    features: [
      "Market research and competitive analysis",
      "Financial projections (3-year)",
      "Growth strategy and milestones",
      "Target audience deep-dive",
      "Revenue model optimization",
      "Executive summary for investors/partners",
    ],
    includes: [
      "Complete business plan document (30+ pages)",
      "Financial projection models",
      "Competitive landscape analysis",
      "Go-to-market strategy",
      "1 revision round included",
    ],
    idealFor: "Entrepreneurs launching new ventures or existing business owners who need a professional strategic plan for growth, funding, or partnerships.",
  },
  {
    slug: "complete-business-rebrand",
    name: "Complete Business Rebrand",
    tierSlug: "transformation",
    price: "$2,997",
    priceValue: 2997,
    type: "one-time",
    delivery: "48 hours",
    note: "48hr delivery",
    description: "A full brand transformation delivered in 48 hours. Our design team creates a complete brand identity including logo, color scheme, typography, brand guidelines, and all digital assets. Fast, premium, and professionally executed.",
    features: [
      "Brand strategy and positioning",
      "Logo design (3 concepts, unlimited revisions on selected)",
      "Complete color palette and typography system",
      "Brand guidelines document",
      "Social media profile graphics",
      "Business card and letterhead design",
      "Website design mockups",
    ],
    includes: [
      "All logo files (vector, PNG, all variations)",
      "Brand guidelines PDF",
      "Social media kit (all platforms)",
      "Print-ready business card files",
      "Letterhead and email signature templates",
      "Website design mockups (3 pages)",
    ],
    idealFor: "Businesses that need a professional brand identity fast - whether launching a new company or repositioning an existing one.",
  },
  {
    slug: "revenue-optimization",
    name: "Revenue Optimization System",
    tierSlug: "transformation",
    price: "$4,997",
    priceValue: 4997,
    type: "one-time",
    delivery: "1-2 weeks",
    description: "Our profit engineering methodology applied to your business. We analyze every revenue stream, identify leaks, optimize pricing, improve conversion rates, and implement systems that systematically increase your bottom line.",
    features: [
      "Revenue stream analysis and optimization",
      "Pricing strategy overhaul",
      "Sales funnel conversion optimization",
      "Customer lifetime value maximization",
      "Upsell and cross-sell system design",
      "Churn reduction strategies",
      "Monthly revenue tracking dashboard",
    ],
    includes: [
      "Complete revenue analysis report",
      "Optimized pricing framework",
      "Sales funnel redesign and implementation",
      "Upsell/cross-sell automation setup",
      "Revenue tracking dashboard",
      "60-day follow-up optimization session",
    ],
    idealFor: "Businesses doing $10K+/month that want to maximize revenue from their existing customer base and operations without increasing ad spend.",
  },
  {
    slug: "market-expansion",
    name: "Market Expansion Strategy",
    tierSlug: "transformation",
    price: "$9,997",
    priceValue: 9997,
    type: "one-time",
    delivery: "2-3 weeks",
    description: "A comprehensive growth blueprint for entering new markets, launching new service lines, or scaling geographically. Our research team conducts deep competitive analysis and builds a complete expansion strategy with implementation plan.",
    features: [
      "New market opportunity analysis",
      "Competitive intelligence deep-dive",
      "Customer acquisition strategy for new markets",
      "Pricing strategy for market entry",
      "Channel partnership identification",
      "12-month expansion roadmap",
      "Risk assessment and mitigation plan",
    ],
    includes: [
      "Market research report (50+ pages)",
      "Competitive analysis database",
      "Market entry strategy document",
      "12-month implementation roadmap",
      "Partnership prospect list (50+ contacts)",
      "Quarterly check-in calls (4 sessions)",
    ],
    idealFor: "Established businesses ready to scale into new markets, territories, or service lines with a data-driven approach.",
  },

  // TIER 3: Done-For-You Services
  {
    slug: "email-marketing",
    name: "Email Marketing Systems",
    tierSlug: "done-for-you",
    price: "$197/mo",
    priceValue: 197,
    type: "monthly",
    delivery: "Ongoing",
    description: "Our marketing team builds, manages, and continuously optimizes your email marketing. From welcome sequences to promotional campaigns, we handle the strategy, copywriting, design, and analytics so you never touch an email tool again.",
    features: [
      "Email strategy and calendar planning",
      "Copywriting for all campaigns",
      "Email template design and A/B testing",
      "List segmentation and management",
      "Automated drip sequences",
      "Monthly performance reporting",
    ],
    includes: [
      "Up to 8 email campaigns per month",
      "Welcome sequence setup and optimization",
      "List segmentation and cleanup",
      "Monthly analytics report",
      "Quarterly strategy review call",
    ],
    idealFor: "Businesses that know email marketing works but don't have the time or expertise to do it consistently and effectively.",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    tierSlug: "done-for-you",
    price: "$297/mo",
    priceValue: 297,
    type: "monthly",
    delivery: "Ongoing 24/7",
    description: "Our social media specialists manage your presence across all platforms 24/7. Content creation, posting, community management, and engagement - all handled so your brand stays active and growing without your involvement.",
    features: [
      "Content creation and scheduling",
      "Community management and engagement",
      "Hashtag research and optimization",
      "Story and reel creation",
      "Comment and DM management",
      "Monthly growth reporting",
    ],
    includes: [
      "Up to 20 posts per month across platforms",
      "4 stories/reels per week",
      "Daily community engagement (comments, DMs)",
      "Monthly content calendar",
      "Monthly analytics and growth report",
    ],
    idealFor: "Business owners who want a consistent, professional social media presence without spending hours creating content and managing accounts.",
  },
  {
    slug: "content-creation",
    name: "Content Creation & Management",
    tierSlug: "done-for-you",
    price: "$497/mo",
    priceValue: 497,
    type: "monthly",
    delivery: "Ongoing",
    description: "Our creative team handles all your content needs - blog posts, video scripts, lead magnets, case studies, and more. Consistent, high-quality content that positions you as an authority and drives organic traffic.",
    features: [
      "Blog post writing and publishing",
      "Video script development",
      "Lead magnet creation",
      "Case study writing",
      "SEO optimization for all content",
      "Content distribution strategy",
    ],
    includes: [
      "4 blog posts per month (1,500+ words each)",
      "2 video scripts per month",
      "1 lead magnet per quarter",
      "SEO optimization for all content",
      "Content performance reporting",
    ],
    idealFor: "Businesses that want to build authority and organic traffic through consistent content but don't have an in-house content team.",
  },
  {
    slug: "analytics-reporting",
    name: "Analytics & Reporting",
    tierSlug: "done-for-you",
    price: "$697/mo",
    priceValue: 697,
    type: "monthly",
    delivery: "Weekly reports",
    description: "Our analytics team tracks every metric that matters, builds custom dashboards, and delivers weekly insights so you always know exactly how your business is performing and where to focus next.",
    features: [
      "Custom dashboard setup and maintenance",
      "Weekly performance reports",
      "Conversion tracking and optimization",
      "Revenue attribution analysis",
      "Competitive benchmarking",
      "Actionable insight recommendations",
    ],
    includes: [
      "Custom analytics dashboard",
      "Weekly email report with key metrics",
      "Monthly deep-dive analysis call",
      "Conversion tracking setup",
      "Quarterly competitive benchmark report",
    ],
    idealFor: "Data-driven business owners who want professional analytics without hiring a full-time analyst.",
  },
  {
    slug: "customer-service-setup",
    name: "Customer Service Setup",
    tierSlug: "done-for-you",
    price: "$2,997",
    priceValue: 2997,
    type: "one-time",
    delivery: "1-2 weeks",
    description: "Our support specialists build a complete customer service system for your business. AI chatbots, ticketing systems, knowledge bases, phone handling, and escalation workflows - everything your customers need for a premium experience.",
    features: [
      "AI chatbot deployment for 24/7 support",
      "Ticketing system setup and workflows",
      "Knowledge base creation",
      "Phone system integration",
      "Escalation workflow design",
      "Customer satisfaction tracking",
    ],
    includes: [
      "AI chatbot configured for your business",
      "Complete ticketing system with SLAs",
      "Knowledge base with 20+ articles",
      "Phone system setup with routing",
      "Customer satisfaction survey system",
      "30-day post-launch support",
    ],
    idealFor: "Growing businesses that need professional customer support systems to scale without proportionally increasing support headcount.",
  },

  // TIER 4: Strategic Consulting
  {
    slug: "strategy-sessions",
    name: "1-on-1 Strategy Sessions",
    tierSlug: "consulting",
    price: "$997",
    priceValue: 997,
    type: "per-session",
    delivery: "Scheduled within 48 hours",
    description: "A dedicated 90-minute strategy session directly with LaSean. Bring your biggest challenge, opportunity, or decision - and walk away with a clear action plan. No fluff, no theory, just actionable strategy from someone who's done it.",
    features: [
      "90-minute private session with LaSean",
      "Pre-session questionnaire and preparation",
      "Custom strategy recommendations",
      "Action plan with specific next steps",
      "Session recording for reference",
      "7-day follow-up email support",
    ],
    includes: [
      "90-minute 1-on-1 video session",
      "Pre-session business review",
      "Written action plan delivered within 24 hours",
      "Session recording",
      "7 days of email follow-up support",
    ],
    idealFor: "Business owners facing a specific challenge or decision who want direct access to LaSean's expertise for immediate, actionable guidance.",
  },
  {
    slug: "group-mastermind",
    name: "Group Mastermind Access",
    tierSlug: "consulting",
    price: "$2,997/mo",
    priceValue: 2997,
    type: "monthly",
    delivery: "Weekly sessions",
    description: "Join an exclusive group of high-performing business owners in LaSean's mastermind. Weekly group sessions, private community access, and peer accountability that pushes you to the next level.",
    features: [
      "Weekly group mastermind calls",
      "Private community access",
      "Hot seat coaching opportunities",
      "Peer networking and partnerships",
      "Guest expert sessions",
      "Resource library access",
    ],
    includes: [
      "4 weekly group mastermind calls per month",
      "Private Slack/community access",
      "Monthly hot seat coaching session",
      "Guest expert sessions",
      "Full resource and template library",
    ],
    idealFor: "Ambitious business owners who thrive in group environments and want the accountability, networking, and collective wisdom of high performers.",
  },
  {
    slug: "executive-advisory",
    name: "Executive Advisory Retainer",
    tierSlug: "consulting",
    price: "$4,997/mo",
    priceValue: 4997,
    type: "monthly",
    delivery: "On-demand access",
    description: "LaSean as your personal strategic advisor on retainer. Priority access, weekly check-ins, and unlimited strategic guidance for your most important business decisions. The closest thing to having LaSean on your executive team.",
    features: [
      "Weekly 1-on-1 check-in calls",
      "Priority Slack/phone access to LaSean",
      "Strategic review of all major decisions",
      "Board meeting preparation and support",
      "Introductions to LaSean's network",
      "Priority access to all new tools and frameworks",
    ],
    includes: [
      "4 weekly 1-on-1 calls per month",
      "Unlimited Slack messaging (24hr response)",
      "Priority scheduling for ad-hoc calls",
      "Access to LaSean's professional network",
      "All new frameworks and tools first",
    ],
    idealFor: "CEOs and founders who want ongoing strategic guidance from someone who has the experience and network to accelerate their growth trajectory.",
  },
  {
    slug: "speaking-workshops",
    name: "Speaking & Workshops",
    tierSlug: "consulting",
    price: "$15K+",
    priceValue: 15000,
    type: "per-event",
    delivery: "Custom scheduling",
    description: "Bring LaSean to your event, conference, or corporate retreat. Keynote speeches, half-day workshops, and full-day training sessions on AI, automation, business systems, and scaling with technology.",
    features: [
      "Customized keynote or workshop content",
      "Pre-event consultation and planning",
      "Interactive workshop materials",
      "Q&A session with attendees",
      "Post-event resource package for attendees",
      "Recording rights (negotiable)",
    ],
    includes: [
      "Custom presentation tailored to your audience",
      "Pre-event planning call",
      "Workshop materials and handouts",
      "Post-event attendee resource kit",
      "Travel and accommodation (separate)",
    ],
    idealFor: "Event organizers, corporate leaders, and conference planners who want a high-impact speaker on AI, automation, and business systems.",
  },
  {
    slug: "corporate-transformation",
    name: "Corporate Transformation",
    tierSlug: "consulting",
    price: "$25K+",
    priceValue: 25000,
    type: "custom",
    delivery: "6-month engagement",
    description: "A comprehensive 6-month engagement to transform your organization's operations with AI and automation. LaSean and his team embed within your organization to implement systems, train teams, and deliver measurable business transformation.",
    features: [
      "Complete organizational AI assessment",
      "Custom AI implementation across departments",
      "Executive team coaching and training",
      "Change management support",
      "Weekly progress reviews with leadership",
      "Quarterly board-level reporting",
    ],
    includes: [
      "6-month dedicated engagement",
      "Full organizational AI assessment",
      "Custom AI systems for 3+ departments",
      "Executive coaching sessions",
      "Team training programs",
      "Quarterly board presentations",
      "Post-engagement transition plan",
    ],
    idealFor: "Mid-to-large companies serious about AI transformation across the entire organization with measurable outcomes and executive-level support.",
  },
];

/* ================================================================
   BUNDLES
   ================================================================ */

export const bundles: Bundle[] = [
  {
    slug: "startup-launch",
    name: "Startup Launch Bundle",
    tagline: "Everything you need to launch with AI from day one",
    serviceSlugs: ["ai-business-audit", "business-plan-creation", "email-marketing"],
    originalPrice: "$1,891",
    bundlePrice: "$1,497",
    savings: "$394",
    recurring: "+ $197/mo after setup",
  },
  {
    slug: "growth-accelerator",
    name: "Growth Accelerator Bundle",
    tagline: "Scale your operations with automation and done-for-you services",
    serviceSlugs: ["complete-automation-setup", "revenue-optimization", "social-media-management"],
    originalPrice: "$7,791",
    bundlePrice: "$6,997",
    savings: "$794",
    recurring: "+ $297/mo after setup",
    highlight: true,
  },
  {
    slug: "full-rebrand",
    name: "Full Rebrand Bundle",
    tagline: "New brand identity with ongoing content to match",
    serviceSlugs: ["complete-business-rebrand", "content-creation", "analytics-reporting"],
    originalPrice: "$4,191",
    bundlePrice: "$3,497",
    savings: "$694",
    recurring: "+ $1,194/mo after setup",
  },
  {
    slug: "ai-empire",
    name: "AI Empire Bundle",
    tagline: "Full custom AI systems with automation and support infrastructure",
    serviceSlugs: ["custom-ai-development", "complete-automation-setup", "customer-service-setup"],
    originalPrice: "$10,491",
    bundlePrice: "$8,997",
    savings: "$1,494",
  },
  {
    slug: "executive-all-in",
    name: "Executive All-In Bundle",
    tagline: "White-glove advisory with complete done-for-you services",
    serviceSlugs: ["executive-advisory", "group-mastermind", "email-marketing", "social-media-management", "content-creation"],
    originalPrice: "$8,885/mo",
    bundlePrice: "$6,997/mo",
    savings: "$1,888/mo",
    highlight: true,
  },
];

/* ================================================================
   HELPERS
   ================================================================ */

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getServicesByTier = (tierSlug: string): Service[] =>
  services.filter((s) => s.tierSlug === tierSlug);

export const getTierBySlug = (slug: string): Tier | undefined =>
  tiers.find((t) => t.slug === slug);

export const getBundleBySlug = (slug: string): Bundle | undefined =>
  bundles.find((b) => b.slug === slug);

export const getServicesForBundle = (bundle: Bundle): Service[] =>
  bundle.serviceSlugs.map((slug) => getServiceBySlug(slug)!).filter(Boolean);

export const typeLabels: Record<string, string> = {
  "one-time": "One-time",
  "monthly": "Monthly",
  "per-session": "Per session",
  "per-event": "Per event",
  "custom": "Custom",
};
