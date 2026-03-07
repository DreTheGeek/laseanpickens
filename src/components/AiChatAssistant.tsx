import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { services, tiers, getServicesByTier } from "@/data/services";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  links?: { label: string; url: string }[];
}

// Knowledge base for quick responses
const knowledgeBase: Record<string, { answer: string; links?: { label: string; url: string }[] }> = {
  pricing: {
    answer: "Our services range from $197/month for Email Marketing up to $25K+ for Corporate Transformation. Most clients start with the AI Business Audit at $697 to understand where AI can make the biggest impact. Want me to help you find the right service for your budget?",
    links: [{ label: "View All Services", url: "/#programs" }],
  },
  automation: {
    answer: "We offer three levels of automation: AI Business Audit ($697) to identify opportunities, Complete Automation Setup ($2,497) to build your automation backbone, and Custom AI System Development ($4,997) for fully custom AI solutions. Which level sounds right for you?",
    links: [{ label: "AI Business Audit", url: "/service/ai-business-audit" }, { label: "Complete Automation Setup", url: "/service/complete-automation-setup" }],
  },
  branding: {
    answer: "Our Complete Business Rebrand is $2,997 and delivered in 48 hours. It includes logo design, brand guidelines, social media kit, and website mockups. It is our fastest turnaround service and one of our most popular.",
    links: [{ label: "View Rebrand Service", url: "/service/complete-business-rebrand" }],
  },
  social: {
    answer: "Our Social Media Management is $297/month and includes 20 posts per month, daily engagement, stories/reels, and monthly reporting. We handle everything so you can focus on your business.",
    links: [{ label: "Social Media Management", url: "/service/social-media-management" }],
  },
  consulting: {
    answer: "LaSean offers direct strategic consulting starting with 1-on-1 Strategy Sessions at $997 per session. For ongoing support, the Executive Advisory Retainer at $4,997/month gives you weekly calls and priority access.",
    links: [{ label: "Strategy Sessions", url: "/service/strategy-sessions" }, { label: "Executive Advisory", url: "/service/executive-advisory" }],
  },
  help: {
    answer: "I can help you with:\n- Finding the right service for your business\n- Understanding our pricing and packages\n- Learning about our process\n- Getting started with a specific service\n\nJust ask me anything! Or take our quick quiz to get personalized recommendations.",
    links: [{ label: "Take the Quiz", url: "/#quiz" }, { label: "View Services", url: "/#programs" }],
  },
  process: {
    answer: "Our process is simple: 1) You purchase a service or book a consultation. 2) Within 24-48 hours, we begin work. 3) You get access to your Client Portal to track progress. 4) We deliver results and provide ongoing support. Most services include post-delivery support.",
    links: [{ label: "See Our Process", url: "/#process" }],
  },
  results: {
    answer: "Our clients typically see: 15+ hours saved per week through automation, 300%+ increase in online reviews, 40% more leads from speed-to-lead systems, and significant revenue growth. Results vary by business, but we have helped 500+ businesses transform their operations.",
    links: [{ label: "View Case Studies", url: "/case-study/hvac-automation" }, { label: "Testimonials", url: "/#testimonials" }],
  },
  portal: {
    answer: "The Client Portal is where you track your project progress, communicate with our team, access resources, view documents, and manage your account. You get access as soon as you become a client.",
    links: [{ label: "Go to Portal", url: "/portal" }],
  },
  bundle: {
    answer: "We offer 5 bundles that save you money by combining services: Startup Launch ($1,497), Growth Accelerator ($6,997), Full Rebrand ($3,497), AI Empire ($8,997), and Executive All-In ($6,997/mo). Bundles save you $394-$1,888 vs buying individually.",
    links: [{ label: "View Bundles", url: "/#programs" }],
  },
};

function findBestMatch(input: string): { answer: string; links?: { label: string; url: string }[] } {
  const lower = input.toLowerCase();
  const keywords: Record<string, string[]> = {
    pricing: ["price", "pricing", "cost", "how much", "afford", "budget", "expensive", "cheap", "investment"],
    automation: ["automation", "automate", "ai system", "workflow", "bot", "chatbot", "custom ai"],
    branding: ["brand", "rebrand", "logo", "design", "identity", "visual"],
    social: ["social media", "instagram", "facebook", "tiktok", "linkedin", "posting", "content"],
    consulting: ["consult", "strategy", "advisor", "coaching", "mentor", "1-on-1", "mastermind", "lasean"],
    help: ["help", "what can you", "what do you", "options", "menu", "start"],
    process: ["process", "how does it work", "how long", "timeline", "delivery", "steps"],
    results: ["results", "roi", "return", "outcome", "success", "case study", "testimonial", "review"],
    portal: ["portal", "login", "account", "dashboard", "track"],
    bundle: ["bundle", "package", "deal", "combo", "save", "discount"],
  };

  for (const [key, words] of Object.entries(keywords)) {
    if (words.some((w) => lower.includes(w))) {
      return knowledgeBase[key];
    }
  }

  // Check if they mentioned a specific service
  for (const service of services) {
    if (lower.includes(service.name.toLowerCase()) || lower.includes(service.slug.replace(/-/g, " "))) {
      return {
        answer: service.name + " is " + service.price + " (" + service.type + "). " + service.description.split(".")[0] + ". Delivery: " + service.delivery + ".",
        links: [{ label: "View Details", url: "/service/" + service.slug }, { label: "Get Started", url: "/checkout/" + service.slug }],
      };
    }
  }

  // Default response
  return {
    answer: "Great question! I can help you find the perfect service for your business. Could you tell me more about:\n\n- What industry you are in?\n- What your biggest challenge is?\n- What your budget range is?\n\nOr you can take our quick Service Quiz for personalized recommendations!",
    links: [{ label: "Take the Quiz", url: "/#quiz" }, { label: "View All Services", url: "/#programs" }, { label: "Contact Us", url: "/#book" }],
  };
}

const AiChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I am LaSean's AI assistant. I can help you find the right service, answer questions about pricing, or point you to helpful resources. What can I help you with?",
      links: [{ label: "Find My Service", url: "/#quiz" }, { label: "View Pricing", url: "/#programs" }],
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: "u-" + Date.now(), role: "user", content: input.trim() };
    const match = findBestMatch(input.trim());
    const botMsg: Message = { id: "b-" + Date.now(), role: "assistant", content: match.answer, links: match.links };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg glow-blue flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-2rem)] flex flex-col glass-dark rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-heading font-bold text-foreground">AI Assistant</p>
                  <p className="text-[10px] text-emerald-400">Online</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={"flex gap-2 " + (msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={"max-w-[80%] " + (msg.role === "user" ? "order-first" : "")}>
                    <div className={"rounded-xl px-3.5 py-2.5 text-sm whitespace-pre-line " +
                      (msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-background/60 border border-border text-foreground rounded-bl-sm")}
                    >
                      {msg.content}
                    </div>
                    {msg.links && msg.links.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {msg.links.map((link) => (
                          <Link key={link.url} to={link.url} className="text-[11px] px-2.5 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-background/50">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-background/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
                <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatAssistant;
