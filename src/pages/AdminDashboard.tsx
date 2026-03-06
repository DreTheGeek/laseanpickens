import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  LayoutDashboard, Users, TrendingUp, BarChart3, Mail, Settings,
  LogOut, Sun, Moon, Bot, Cog, Headphones, Crown, DollarSign,
  UserPlus, AlertCircle, CheckCircle2, ShoppingCart,
  Video, VideoOff, Eye, MessageSquare, Send, ChevronDown, ChevronUp,
  FileText, Phone, Package, Search, Filter,
  Download, Upload, Edit3, Plus, Copy, ExternalLink,
  Activity, Zap, Globe, Shield,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

/* ================================================================
   TYPES
   ================================================================ */

type Page = "overview" | "clients" | "orders" | "pipeline" | "analytics" | "campaigns" | "golive" | "settings";

interface ClientOrder {
  id: string;
  itemName: string;
  itemPrice: string;
  date: string;
  status: "confirmed" | "processing" | "completed";
  termsAccepted: boolean;
  refundPolicyAccepted: boolean;
}

interface ClientDoc {
  name: string;
  type: string;
  date: string;
  size: string;
}

interface ClientComm {
  type: "email" | "call" | "note";
  subject: string;
  date: string;
  preview: string;
}

interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  tier: string;
  status: "active" | "trial" | "inactive" | "churned";
  mrr: number;
  joined: string;
  lastActive: string;
  orders: ClientOrder[];
  documents: ClientDoc[];
  communications: ClientComm[];
  notes: string;
  totalSpent: number;
}

/* ================================================================
   NAV
   ================================================================ */

const navItems: { id: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "clients", label: "Clients", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "pipeline", label: "Pipeline", icon: TrendingUp },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "campaigns", label: "Campaigns", icon: Mail },
  { id: "golive", label: "Go Live", icon: Video },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ================================================================
   DATA
   ================================================================ */

const projectionData = [
  { month: "Mar", actual: 0, projected: 0 },
  { month: "Apr", actual: 0, projected: 15000 },
  { month: "May", actual: 0, projected: 35000 },
  { month: "Jun", actual: 0, projected: 65000 },
  { month: "Jul", actual: 0, projected: 105000 },
  { month: "Aug", actual: 0, projected: 155000 },
  { month: "Sep", actual: 0, projected: 185000 },
  { month: "Oct", actual: 0, projected: 225000 },
  { month: "Nov", actual: 0, projected: 265000 },
  { month: "Dec", actual: 0, projected: 300000 },
];

const tierDistribution = [
  { name: "AI & Automation", value: 35, color: "#06b6d4" },
  { name: "Business Transform", value: 25, color: "#3b82f6" },
  { name: "Done-For-You", value: 30, color: "#a855f7" },
  { name: "Strategic Consulting", value: 10, color: "#f59e0b" },
];

const weeklyActivity = [
  { day: "Mon", orders: 3, signups: 5 },
  { day: "Tue", orders: 5, signups: 8 },
  { day: "Wed", orders: 2, signups: 4 },
  { day: "Thu", orders: 7, signups: 6 },
  { day: "Fri", orders: 4, signups: 9 },
  { day: "Sat", orders: 1, signups: 2 },
  { day: "Sun", orders: 0, signups: 1 },
];

interface Pillar {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  price: string;
  clients: number;
  clientLabel: string;
  mrr: number;
  pipeline: number;
  goal: string;
  goalTarget: number;
  accent: string;
}

const pillars: Pillar[] = [
  { name: "AI & Automation", icon: Bot, price: "$697-$4,997", clients: 0, clientLabel: "clients", mrr: 0, pipeline: 0, goal: "20 clients/mo", goalTarget: 20, accent: "cyan" },
  { name: "Business Transformation", icon: Cog, price: "$997-$9,997", clients: 0, clientLabel: "clients", mrr: 0, pipeline: 0, goal: "15 clients ($30K)", goalTarget: 15, accent: "blue" },
  { name: "Done-For-You Services", icon: Headphones, price: "$197-$2,997/mo", clients: 0, clientLabel: "clients", mrr: 0, pipeline: 0, goal: "30 clients ($15K)", goalTarget: 30, accent: "purple" },
  { name: "Strategic Consulting", icon: Crown, price: "$997-$25K+", clients: 0, clientLabel: "clients", mrr: 0, pipeline: 0, goal: "5 clients ($25K)", goalTarget: 5, accent: "amber" },
];

const accentMap: Record<string, { border: string; text: string; bar: string }> = {
  cyan: { border: "border-l-cyan-500", text: "text-cyan-400", bar: "bg-cyan-500" },
  blue: { border: "border-l-blue-500", text: "text-blue-400", bar: "bg-blue-500" },
  purple: { border: "border-l-purple-500", text: "text-purple-400", bar: "bg-purple-500" },
  amber: { border: "border-l-amber-500", text: "text-amber-400", bar: "bg-amber-500" },
};

const sampleClients: ClientProfile[] = [
  {
    id: "C001", name: "Citywide HVAC", email: "mike@citywidehvac.com", phone: "(555) 123-4567",
    company: "Citywide HVAC LLC", tier: "AI & Automation", status: "active", mrr: 2497, joined: "Mar 1, 2026", lastActive: "Mar 6, 2026",
    totalSpent: 7491,
    orders: [
      { id: "ORD-A1B2C3", itemName: "AI Business Audit & Strategy", itemPrice: "$697", date: "Mar 1, 2026", status: "completed", termsAccepted: true, refundPolicyAccepted: true },
      { id: "ORD-D4E5F6", itemName: "Custom AI Agent Development", itemPrice: "$4,997", date: "Mar 3, 2026", status: "processing", termsAccepted: true, refundPolicyAccepted: true },
    ],
    documents: [
      { name: "AI_Audit_Report.pdf", type: "Report", date: "Mar 5, 2026", size: "2.4 MB" },
      { name: "Strategy_Roadmap.pdf", type: "Deliverable", date: "Mar 5, 2026", size: "1.8 MB" },
    ],
    communications: [
      { type: "email", subject: "Welcome to Kaldr Tech", date: "Mar 1, 2026", preview: "Welcome aboard! We're excited to start your AI transformation..." },
      { type: "call", subject: "Discovery Call - 45 min", date: "Mar 2, 2026", preview: "Discussed current pain points, automation opportunities..." },
      { type: "note", subject: "Internal Note", date: "Mar 4, 2026", preview: "Client is very responsive. Upsell opportunity for full automation suite." },
    ],
    notes: "High-value client. Very responsive. Looking at full automation suite for Q2.",
  },
  {
    id: "C002", name: "Apex Plumbing", email: "sarah@apexplumbing.com", phone: "(555) 234-5678",
    company: "Apex Plumbing Inc", tier: "Done-For-You", status: "active", mrr: 497, joined: "Feb 28, 2026", lastActive: "Mar 5, 2026",
    totalSpent: 1491,
    orders: [
      { id: "ORD-G7H8I9", itemName: "Social Media Management", itemPrice: "$497/mo", date: "Feb 28, 2026", status: "confirmed", termsAccepted: true, refundPolicyAccepted: true },
    ],
    documents: [
      { name: "Content_Calendar_March.pdf", type: "Deliverable", date: "Mar 1, 2026", size: "890 KB" },
    ],
    communications: [
      { type: "email", subject: "Monthly Report - February", date: "Mar 1, 2026", preview: "Here's your social media performance for February..." },
    ],
    notes: "Steady client. Consider upselling email marketing package.",
  },
  {
    id: "C003", name: "Metro Electric Co", email: "james@metroelectric.com", phone: "(555) 345-6789",
    company: "Metro Electric Co", tier: "Strategic Consulting", status: "trial", mrr: 0, joined: "Mar 4, 2026", lastActive: "Mar 6, 2026",
    totalSpent: 0,
    orders: [],
    documents: [],
    communications: [
      { type: "call", subject: "Intro Call - 30 min", date: "Mar 4, 2026", preview: "Exploring advisory retainer. Company does $2M/yr revenue." },
    ],
    notes: "Potential high-ticket client. Schedule follow-up demo for AI capabilities.",
  },
  {
    id: "C004", name: "Summit Roofing", email: "tom@summitroofing.com", phone: "(555) 456-7890",
    company: "Summit Roofing Group", tier: "Business Transformation", status: "active", mrr: 997, joined: "Feb 15, 2026", lastActive: "Mar 3, 2026",
    totalSpent: 3988,
    orders: [
      { id: "ORD-J1K2L3", itemName: "Business Plan Development", itemPrice: "$997", date: "Feb 15, 2026", status: "completed", termsAccepted: true, refundPolicyAccepted: true },
      { id: "ORD-M4N5O6", itemName: "Complete Business Rebrand", itemPrice: "$2,997", date: "Feb 20, 2026", status: "processing", termsAccepted: true, refundPolicyAccepted: true },
    ],
    documents: [
      { name: "Business_Plan_v2.pdf", type: "Report", date: "Feb 25, 2026", size: "3.1 MB" },
      { name: "Brand_Guidelines.pdf", type: "Deliverable", date: "Mar 1, 2026", size: "5.4 MB" },
      { name: "Logo_Assets.zip", type: "Asset", date: "Mar 2, 2026", size: "12.7 MB" },
    ],
    communications: [
      { type: "email", subject: "Brand Review - Round 2", date: "Mar 1, 2026", preview: "Attached are the revised logo concepts based on your feedback..." },
      { type: "call", subject: "Brand Strategy Session", date: "Feb 22, 2026", preview: "Covered target market positioning, color psychology, brand voice..." },
    ],
    notes: "Rebrand in progress. Client wants bold, modern look. Very particular about colors.",
  },
  {
    id: "C005", name: "GreenScape Landscaping", email: "linda@greenscape.com", phone: "(555) 567-8901",
    company: "GreenScape Landscaping", tier: "Done-For-You", status: "active", mrr: 297, joined: "Jan 20, 2026", lastActive: "Mar 4, 2026",
    totalSpent: 891,
    orders: [
      { id: "ORD-P7Q8R9", itemName: "Email Marketing Campaigns", itemPrice: "$297/mo", date: "Jan 20, 2026", status: "confirmed", termsAccepted: true, refundPolicyAccepted: true },
    ],
    documents: [
      { name: "Email_Templates.zip", type: "Asset", date: "Jan 25, 2026", size: "1.2 MB" },
    ],
    communications: [
      { type: "email", subject: "March Campaign Preview", date: "Mar 3, 2026", preview: "Here are the email campaigns scheduled for March..." },
    ],
    notes: "Long-term client. Great retention. Could benefit from social media add-on.",
  },
];

const allOrders = sampleClients.flatMap((c) =>
  c.orders.map((o) => ({ ...o, clientName: c.name, clientEmail: c.email }))
);

const samplePipeline = [
  { name: "BlueStar HVAC", stage: "Discovery", value: "$997/mo", probability: "60%", lastContact: "Mar 4", tier: "AI & Automation" },
  { name: "Premier Electric", stage: "Proposal Sent", value: "$2,997/mo", probability: "40%", lastContact: "Mar 3", tier: "Done-For-You" },
  { name: "Atlas Construction", stage: "Demo Scheduled", value: "$9,997/mo", probability: "25%", lastContact: "Mar 5", tier: "Strategic Consulting" },
  { name: "Comfort Air Systems", stage: "Follow-up", value: "$197/mo", probability: "70%", lastContact: "Mar 2", tier: "Done-For-You" },
  { name: "ProClean Services", stage: "Negotiation", value: "$997/mo", probability: "80%", lastContact: "Mar 5", tier: "Business Transformation" },
];

const sampleCampaigns = [
  { name: "HVAC Spring Outreach", status: "active", sent: 200, opened: 68, replied: 12, date: "Mar 3" },
  { name: "Plumbing Cold Email v2", status: "active", sent: 150, opened: 45, replied: 8, date: "Mar 1" },
  { name: "Roofing Lead Gen", status: "draft", sent: 0, opened: 0, replied: 0, date: "Mar 5" },
  { name: "General Contractors", status: "paused", sent: 100, opened: 32, replied: 5, date: "Feb 25" },
];

/* ================================================================
   LAYOUT
   ================================================================ */

const AdminShell = ({
  activePage,
  setPage,
  darkMode,
  toggleDarkMode,
  isLive,
  children,
}: {
  activePage: Page;
  setPage: (p: Page) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isLive: boolean;
  children: React.ReactNode;
}) => {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const id = setInterval(() => setLastUpdated(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(id);
  }, []);

  const bg = darkMode ? "bg-gray-50 text-gray-900" : "bg-[#0b1121] text-gray-100";
  const sidebarBg = darkMode ? "bg-white border-gray-200" : "bg-[#0b1121] border-white/[0.06]";
  const headerBg = darkMode ? "bg-white border-gray-200" : "bg-[#0b1121] border-white/[0.06]";

  return (
    <div className={`min-h-screen ${bg} flex`}>
      {/* Sidebar */}
      <aside className={`w-[200px] shrink-0 ${sidebarBg} border-r flex flex-col fixed inset-y-0 left-0 z-40`}>
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
            K
          </div>
          <div className="min-w-0">
            <p className={`text-sm font-semibold truncate ${darkMode ? "text-gray-900" : ""}`}>Kaldr Tech</p>
            <p className={`text-[10px] truncate ${darkMode ? "text-gray-500" : "text-gray-500"}`}>Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = activePage === item.id;
            const isGoLive = item.id === "golive";
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors relative ${
                  active
                    ? "bg-primary text-white"
                    : darkMode
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
                {isGoLive && isLive && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        <div className={`p-3 border-t ${darkMode ? "border-gray-200" : "border-white/[0.06]"}`}>
          <p className={`text-[10px] text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>&copy; 2026 Kaldr Tech</p>
        </div>
      </aside>

      <div className="flex-1 ml-[200px]">
        <header className={`h-12 border-b ${headerBg} flex items-center justify-end px-6 gap-4 sticky top-0 z-30`}>
          {isLive && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[11px] font-semibold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
            </span>
          )}
          <span className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>Updated: {lastUpdated}</span>
          <span className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>Goal: $200K-$300K/mo</span>
          <button
            onClick={toggleDarkMode}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
              darkMode ? "bg-gray-100 hover:bg-gray-200" : "bg-white/[0.06] hover:bg-white/10"
            }`}
          >
            {darkMode ? <Moon className="w-3.5 h-3.5 text-gray-600" /> : <Sun className="w-3.5 h-3.5 text-gray-400" />}
          </button>
          <a
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/90 hover:bg-primary text-white text-xs font-medium transition-colors"
          >
            <LogOut className="w-3 h-3" /> Exit
          </a>
        </header>

        <main className="p-6">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: OVERVIEW
   ================================================================ */

const fmt = (n: number) => "$" + n.toLocaleString();

const OverviewPage = ({ darkMode }: { darkMode: boolean }) => {
  const totalMRR = pillars.reduce((s, p) => s + p.mrr, 0);
  const totalClients = pillars.reduce((s, p) => s + p.clients, 0);
  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";
  const innerBg = darkMode ? "bg-gray-50 border-gray-100" : "bg-[#0b1121] border-white/[0.04]";

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total MRR", value: fmt(totalMRR), icon: DollarSign, color: "text-purple-400" },
          { label: "ARR", value: fmt(totalMRR * 12), icon: TrendingUp, color: "text-blue-400" },
          { label: "Active Clients", value: String(totalClients), icon: Users, color: "text-green-400" },
          { label: "Pipeline", value: "$0", icon: UserPlus, color: "text-yellow-400" },
          { label: "Churn Rate", value: "0%", icon: AlertCircle, color: "text-red-400" },
          { label: "Goal Progress", value: "0%", icon: CheckCircle2, color: "text-pink-400" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className={`${cardBg} border rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <span className={`text-[11px] font-medium ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{kpi.label}</span>
              </div>
              <p className="text-xl font-bold">{kpi.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Pillars */}
      <div className={`${cardBg} border rounded-xl p-6`}>
        <h2 className="text-base font-bold mb-5">4 Revenue Tiers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {pillars.map((p, i) => {
            const c = accentMap[p.accent];
            const Icon = p.icon;
            const pct = p.goalTarget > 0 ? Math.min((p.clients / p.goalTarget) * 100, 100) : 0;
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className={`${innerBg} border border-l-4 ${c.border} rounded-lg p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${c.text}`}>{p.name}</h3>
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className={darkMode ? "text-gray-500" : "text-gray-500"}>Price:</span><span className="font-medium">{p.price}</span></div>
                  <div className="flex justify-between"><span className={darkMode ? "text-gray-500" : "text-gray-500"}>Active:</span><span className="font-medium">{p.clients} {p.clientLabel}</span></div>
                  <div className="flex justify-between"><span className={darkMode ? "text-gray-500" : "text-gray-500"}>MRR:</span><span className="font-medium text-green-400">{fmt(p.mrr)}</span></div>
                  <div className="flex justify-between"><span className={darkMode ? "text-gray-500" : "text-gray-500"}>Pipeline:</span><span className="font-medium text-yellow-400">{p.pipeline} prospects</span></div>
                </div>
                <div className={`w-full rounded-full h-1.5 mt-3 ${darkMode ? "bg-gray-200" : "bg-gray-700/50"}`}>
                  <div className={`${c.bar} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <p className={`text-[10px] text-center mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Goal: {p.goal}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className={`${cardBg} border rounded-xl p-6`}>
          <h2 className="text-base font-bold mb-4">Revenue Projection</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.05)"} />
                <XAxis dataKey="month" stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} />
                <YAxis stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} tickFormatter={(v) => "$" + (v / 1000) + "K"} />
                <Tooltip
                  contentStyle={{ backgroundColor: darkMode ? "#fff" : "#111827", border: `1px solid ${darkMode ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, fontSize: 12, color: darkMode ? "#111" : "#fff" }}
                  formatter={(value: number) => ["$" + value.toLocaleString()]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="actual" stroke="#a855f7" strokeWidth={2} name="Actual" dot={false} />
                <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Projected" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly activity */}
        <div className={`${cardBg} border rounded-xl p-6`}>
          <h2 className="text-base font-bold mb-4">Weekly Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.05)"} />
                <XAxis dataKey="day" stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} />
                <YAxis stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#fff" : "#111827", border: `1px solid ${darkMode ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, fontSize: 12, color: darkMode ? "#111" : "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="orders" fill="#06b6d4" name="Orders" radius={[4, 4, 0, 0]} />
                <Bar dataKey="signups" fill="#a855f7" name="Sign-ups" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`${cardBg} border rounded-xl p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold">Recent Orders</h3>
          </div>
          <div className="space-y-2">
            {allOrders.slice(0, 3).map((o) => (
              <div key={o.id} className={`text-xs p-2 rounded-lg ${darkMode ? "bg-gray-50" : "bg-[#0b1121]"}`}>
                <div className="flex justify-between"><span className="font-medium">{o.clientName}</span><span className="text-green-400">{o.itemPrice}</span></div>
                <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} mt-0.5`}>{o.itemName}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBg} border rounded-xl p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold">Pipeline Hot Leads</h3>
          </div>
          <div className="space-y-2">
            {samplePipeline.filter((p) => parseInt(p.probability) >= 60).map((p) => (
              <div key={p.name} className={`text-xs p-2 rounded-lg ${darkMode ? "bg-gray-50" : "bg-[#0b1121]"}`}>
                <div className="flex justify-between"><span className="font-medium">{p.name}</span><span className="text-primary">{p.value}</span></div>
                <p className={`${darkMode ? "text-gray-500" : "text-gray-500"} mt-0.5`}>{p.stage} - {p.probability} likely</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBg} border rounded-xl p-5`}>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold">Tier Distribution</h3>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tierDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={55} dataKey="value" paddingAngle={2}>
                  {tierDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#fff" : "#111827", border: `1px solid ${darkMode ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, fontSize: 11, color: darkMode ? "#111" : "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: CLIENTS (with expandable profiles)
   ================================================================ */

const ClientsPage = ({ darkMode }: { darkMode: boolean }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";
  const innerBg = darkMode ? "bg-gray-50 border-gray-100" : "bg-[#0b1121] border-white/[0.04]";
  const inputBg = darkMode ? "bg-gray-100 border-gray-200 text-gray-900" : "bg-white/[0.04] border-white/[0.06] text-white";

  const filtered = sampleClients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTier = filterTier === "all" || c.tier === filterTier;
    return matchSearch && matchTier;
  });

  const tiers = [...new Set(sampleClients.map((c) => c.tier))];

  const statusColor = (s: string) => {
    if (s === "active") return "bg-green-500/10 text-green-400";
    if (s === "trial") return "bg-yellow-500/10 text-yellow-400";
    if (s === "inactive") return "bg-gray-500/10 text-gray-400";
    return "bg-red-500/10 text-red-400";
  };

  return (
    <div className="space-y-4">
      {/* Search & filter bar */}
      <div className={`${cardBg} border rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between`}>
        <div className="flex items-center gap-3 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm ${inputBg} border outline-none focus:ring-1 focus:ring-primary`}
            />
          </div>
          <div className="relative">
            <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className={`pl-8 pr-6 py-2 rounded-lg text-sm ${inputBg} border outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer`}
            >
              <option value="all">All Tiers</option>
              {tiers.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{filtered.length} clients</span>
          <button onClick={() => toast.info("Add Client form coming soon", { description: "Clients are auto-created when they register through the portal." })} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <UserPlus className="w-3 h-3" /> Add Client
          </button>
        </div>
      </div>

      {/* Client list */}
      <div className="space-y-2">
        {filtered.map((client) => {
          const expanded = expandedId === client.id;
          return (
            <div key={client.id} className={`${cardBg} border rounded-xl overflow-hidden transition-all`}>
              {/* Client row */}
              <button
                onClick={() => setExpandedId(expanded ? null : client.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${
                  darkMode ? "hover:bg-gray-50" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {client.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{client.name}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusColor(client.status)}`}>{client.status}</span>
                  </div>
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{client.email} - {client.tier}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-green-400">{client.mrr > 0 ? fmt(client.mrr) + "/mo" : "-"}</p>
                  <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>Total: {fmt(client.totalSpent)}</p>
                </div>
                <div className="hidden lg:block text-right">
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>Joined {client.joined}</p>
                  <p className={`text-[11px] ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Last active {client.lastActive}</p>
                </div>
                {expanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
              </button>

              {/* Expanded profile */}
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`border-t ${darkMode ? "border-gray-200" : "border-white/[0.06]"}`}
                >
                  <div className="p-5 space-y-5">
                    {/* Contact info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Email", value: client.email, icon: Mail },
                        { label: "Phone", value: client.phone, icon: Phone },
                        { label: "Company", value: client.company, icon: Globe },
                        { label: "Tier", value: client.tier, icon: Shield },
                      ].map((info) => (
                        <div key={info.label} className={`${innerBg} border rounded-lg p-3`}>
                          <div className="flex items-center gap-1.5 mb-1">
                            <info.icon className={`w-3 h-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                            <span className={`text-[10px] font-medium ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{info.label}</span>
                          </div>
                          <p className="text-sm font-medium truncate">{info.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Orders */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-primary" /> Orders ({client.orders.length})
                      </h4>
                      {client.orders.length > 0 ? (
                        <div className="space-y-1.5">
                          {client.orders.map((o) => (
                            <div key={o.id} className={`${innerBg} border rounded-lg px-4 py-3 flex items-center justify-between`}>
                              <div>
                                <p className="text-sm font-medium">{o.itemName}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{o.id}</span>
                                  <span className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{o.date}</span>
                                  {o.termsAccepted && <span className="text-[10px] text-green-400 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Terms</span>}
                                  {o.refundPolicyAccepted && <span className="text-[10px] text-green-400 flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Refund Policy</span>}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-green-400">{o.itemPrice}</p>
                                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                                  o.status === "completed" ? "bg-green-500/10 text-green-400" :
                                  o.status === "processing" ? "bg-blue-500/10 text-blue-400" :
                                  "bg-yellow-500/10 text-yellow-400"
                                }`}>{o.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>No orders yet</p>
                      )}
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-400" /> Documents ({client.documents.length})
                      </h4>
                      {client.documents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {client.documents.map((d, i) => (
                            <div key={i} className={`${innerBg} border rounded-lg px-4 py-3 flex items-center justify-between`}>
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-primary shrink-0" />
                                <div>
                                  <p className="text-sm font-medium">{d.name}</p>
                                  <p className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{d.type} - {d.size} - {d.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button onClick={() => toast.success(`Downloading ${d.name}`)} className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-200" : "hover:bg-white/[0.06]"}`}>
                                  <Download className="w-3.5 h-3.5 text-primary" />
                                </button>
                                <button onClick={() => toast.info(`Opening ${d.name}`)} className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-gray-200" : "hover:bg-white/[0.06]"}`}>
                                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"}`}>No documents uploaded</p>
                      )}
                      <button onClick={() => toast.info(`Upload document for ${client.name}`, { description: "File upload integration ready for Supabase Storage." })} className="mt-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors flex items-center gap-1.5">
                        <Upload className="w-3 h-3" /> Upload Document
                      </button>
                    </div>

                    {/* Communications */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-cyan-400" /> Communications ({client.communications.length})
                      </h4>
                      <div className="space-y-1.5">
                        {client.communications.map((comm, i) => (
                          <div key={i} className={`${innerBg} border rounded-lg px-4 py-3`}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                {comm.type === "email" && <Mail className="w-3.5 h-3.5 text-blue-400" />}
                                {comm.type === "call" && <Phone className="w-3.5 h-3.5 text-green-400" />}
                                {comm.type === "note" && <Edit3 className="w-3.5 h-3.5 text-yellow-400" />}
                                <span className="text-sm font-medium">{comm.subject}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  comm.type === "email" ? "bg-blue-500/10 text-blue-400" :
                                  comm.type === "call" ? "bg-green-500/10 text-green-400" :
                                  "bg-yellow-500/10 text-yellow-400"
                                }`}>{comm.type}</span>
                              </div>
                              <span className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{comm.date}</span>
                            </div>
                            <p className={`text-xs ${darkMode ? "text-gray-600" : "text-gray-400"} line-clamp-2`}>{comm.preview}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => { window.open(`mailto:${client.email}?subject=Follow up from Kaldr Tech`, "_blank"); toast.success(`Opening email to ${client.email}`); }} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors flex items-center gap-1.5">
                          <Mail className="w-3 h-3" /> Send Email
                        </button>
                        <button onClick={() => { setEditingNotes(client.id); toast.info("Edit the notes below"); }} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-colors flex items-center gap-1.5">
                          <Edit3 className="w-3 h-3" /> Add Note
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-yellow-400" /> Internal Notes
                      </h4>
                      <div className={`${innerBg} border rounded-lg p-4`}>
                        {editingNotes === client.id ? (
                          <div className="space-y-2">
                            <textarea
                              defaultValue={client.notes}
                              rows={3}
                              className={`w-full p-2 rounded-lg text-sm ${inputBg} border outline-none focus:ring-1 focus:ring-primary resize-none`}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setEditingNotes(null); toast.success("Notes saved"); }}
                                className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingNotes(null)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${darkMode ? "bg-gray-100 text-gray-600" : "bg-white/[0.06] text-gray-400"}`}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <p className={`text-sm ${darkMode ? "text-gray-700" : "text-gray-300"}`}>{client.notes || "No notes yet"}</p>
                            <button
                              onClick={() => setEditingNotes(client.id)}
                              className={`p-1.5 rounded-lg transition-colors shrink-0 ${darkMode ? "hover:bg-gray-200" : "hover:bg-white/[0.06]"}`}
                            >
                              <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className={`flex flex-wrap gap-2 pt-3 border-t ${darkMode ? "border-gray-200" : "border-white/[0.06]"}`}>
                      <button onClick={() => { window.open(`mailto:${client.email}?subject=Follow up from Kaldr Tech`, "_blank"); toast.success(`Opening email to ${client.name}`); }} className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email Client
                      </button>
                      <button onClick={() => { window.open(`tel:${client.phone}`); toast.success(`Calling ${client.name} at ${client.phone}`); }} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Call
                      </button>
                      <button onClick={() => toast.info(`Add service for ${client.name}`, { description: "Send them a checkout link for any service." })} className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors flex items-center gap-1.5">
                        <Package className="w-3 h-3" /> Add Service
                      </button>
                      <button onClick={() => toast.info(`Upload file for ${client.name}`, { description: "File upload integration ready for Supabase Storage." })} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5">
                        <Upload className="w-3 h-3" /> Upload File
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: ORDERS
   ================================================================ */

const OrdersPage = ({ darkMode }: { darkMode: boolean }) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";
  const inputBg = darkMode ? "bg-gray-100 border-gray-200 text-gray-900" : "bg-white/[0.04] border-white/[0.06] text-white";

  const filteredOrders = statusFilter === "all" ? allOrders : allOrders.filter((o) => o.status === statusFilter);

  const totalRevenue = allOrders.reduce((sum, o) => {
    const num = parseFloat(o.itemPrice.replace(/[$,/mo]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Orders", value: String(allOrders.length), color: "text-primary" },
          { label: "Revenue", value: fmt(totalRevenue), color: "text-green-400" },
          { label: "Completed", value: String(allOrders.filter((o) => o.status === "completed").length), color: "text-green-400" },
          { label: "Processing", value: String(allOrders.filter((o) => o.status === "processing").length), color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className={`${cardBg} border rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className={`text-xs font-medium mt-1 ${darkMode ? "text-gray-600" : ""}`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className={`${cardBg} border rounded-xl overflow-hidden`}>
        <div className={`p-5 border-b ${darkMode ? "border-gray-200" : "border-white/[0.06]"} flex items-center justify-between`}>
          <h2 className="text-base font-bold">All Orders</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-1.5 rounded-lg text-sm ${inputBg} border outline-none`}
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-xs ${darkMode ? "border-gray-200 text-gray-500" : "border-white/[0.04] text-gray-500"}`}>
                <th className="text-left px-5 py-3 font-medium">Order ID</th>
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium">Service</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
                <th className="text-center px-5 py-3 font-medium">Status</th>
                <th className="text-center px-5 py-3 font-medium">Protections</th>
                <th className="text-right px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} className={`border-b transition-colors ${darkMode ? "border-gray-100 hover:bg-gray-50" : "border-white/[0.03] hover:bg-white/[0.02]"}`}>
                  <td className="px-5 py-3 font-mono text-xs text-primary">{o.id}</td>
                  <td className="px-5 py-3 font-medium">{o.clientName}</td>
                  <td className="px-5 py-3">{o.itemName}</td>
                  <td className="px-5 py-3 text-right font-semibold text-green-400">{o.itemPrice}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      o.status === "completed" ? "bg-green-500/10 text-green-400" :
                      o.status === "processing" ? "bg-blue-500/10 text-blue-400" :
                      "bg-yellow-500/10 text-yellow-400"
                    }`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {o.termsAccepted && <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">TOS</span>}
                      {o.refundPolicyAccepted && <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">Refund</span>}
                    </div>
                  </td>
                  <td className={`px-5 py-3 text-right ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: PIPELINE
   ================================================================ */

const PipelinePage = ({ darkMode }: { darkMode: boolean }) => {
  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";

  const stages = ["Discovery", "Demo Scheduled", "Proposal Sent", "Negotiation", "Follow-up"];
  const stageCounts = stages.map((s) => ({ stage: s, count: samplePipeline.filter((p) => p.stage === s).length }));

  return (
    <div className="space-y-4">
      {/* Stage summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stageCounts.map((s) => (
          <div key={s.stage} className={`${cardBg} border rounded-xl p-3 text-center`}>
            <p className="text-lg font-bold text-primary">{s.count}</p>
            <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{s.stage}</p>
          </div>
        ))}
      </div>

      <div className={`${cardBg} border rounded-xl overflow-hidden`}>
        <div className={`p-5 border-b ${darkMode ? "border-gray-200" : "border-white/[0.06]"} flex items-center justify-between`}>
          <h2 className="text-base font-bold">Sales Pipeline</h2>
          <button onClick={() => toast.info("Add prospect to pipeline", { description: "CRM integration will sync with Supabase." })} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <Plus className="w-3 h-3" /> Add Prospect
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b text-xs ${darkMode ? "border-gray-200 text-gray-500" : "border-white/[0.04] text-gray-500"}`}>
                <th className="text-left px-5 py-3 font-medium">Prospect</th>
                <th className="text-left px-5 py-3 font-medium">Tier</th>
                <th className="text-left px-5 py-3 font-medium">Stage</th>
                <th className="text-right px-5 py-3 font-medium">Value</th>
                <th className="text-center px-5 py-3 font-medium">Probability</th>
                <th className="text-right px-5 py-3 font-medium">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {samplePipeline.map((p) => (
                <tr key={p.name} className={`border-b transition-colors ${darkMode ? "border-gray-100 hover:bg-gray-50" : "border-white/[0.03] hover:bg-white/[0.02]"}`}>
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className={`px-5 py-3 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>{p.tier}</td>
                  <td className="px-5 py-3">
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{p.stage}</span>
                  </td>
                  <td className="px-5 py-3 text-right font-medium">{p.value}</td>
                  <td className={`px-5 py-3 text-center ${darkMode ? "text-gray-600" : "text-gray-400"}`}>{p.probability}</td>
                  <td className={`px-5 py-3 text-right ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{p.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: ANALYTICS
   ================================================================ */

const AnalyticsPage = ({ darkMode }: { darkMode: boolean }) => {
  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Emails Sent", value: "450", sub: "This month" },
          { label: "Open Rate", value: "34%", sub: "Avg across campaigns" },
          { label: "Reply Rate", value: "5.6%", sub: "Avg across campaigns" },
          { label: "Meetings Booked", value: "8", sub: "From outreach" },
        ].map((s) => (
          <div key={s.label} className={`${cardBg} border rounded-xl p-4`}>
            <p className="text-2xl font-bold text-primary">{s.value}</p>
            <p className="text-xs font-medium mt-1">{s.label}</p>
            <p className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className={`${cardBg} border rounded-xl p-6`}>
          <h2 className="text-base font-bold mb-4">Revenue Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.05)"} />
                <XAxis dataKey="month" stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} />
                <YAxis stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} tickFormatter={(v) => "$" + (v / 1000) + "K"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#fff" : "#111827", border: `1px solid ${darkMode ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, fontSize: 12, color: darkMode ? "#111" : "#fff" }} formatter={(value: number) => ["$" + value.toLocaleString()]} />
                <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} name="Revenue" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${cardBg} border rounded-xl p-6`}>
          <h2 className="text-base font-bold mb-4">Client Acquisition</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.05)"} />
                <XAxis dataKey="day" stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} />
                <YAxis stroke={darkMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.3)"} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#fff" : "#111827", border: `1px solid ${darkMode ? "#e5e7eb" : "rgba(255,255,255,0.06)"}`, borderRadius: 8, fontSize: 12, color: darkMode ? "#111" : "#fff" }} />
                <Bar dataKey="signups" fill="#a855f7" name="New Clients" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Conversion funnel */}
      <div className={`${cardBg} border rounded-xl p-6`}>
        <h2 className="text-base font-bold mb-4">Conversion Funnel</h2>
        <div className="space-y-3 max-w-xl">
          {[
            { label: "Website Visitors", value: 2400, pct: 100 },
            { label: "Service Page Views", value: 840, pct: 35 },
            { label: "Checkout Started", value: 120, pct: 5 },
            { label: "Account Created", value: 95, pct: 4 },
            { label: "Order Completed", value: 22, pct: 0.9 },
          ].map((step) => (
            <div key={step.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className={darkMode ? "text-gray-700" : "text-gray-300"}>{step.label}</span>
                <span className="font-medium">{step.value.toLocaleString()} ({step.pct}%)</span>
              </div>
              <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-200" : "bg-gray-700/50"}`}>
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${step.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: CAMPAIGNS
   ================================================================ */

const CampaignsPage = ({ darkMode }: { darkMode: boolean }) => {
  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";

  return (
    <div className={`${cardBg} border rounded-xl overflow-hidden`}>
      <div className={`p-5 border-b ${darkMode ? "border-gray-200" : "border-white/[0.06]"} flex items-center justify-between`}>
        <h2 className="text-base font-bold">Email Campaigns</h2>
        <button onClick={() => toast.info("Create new email campaign", { description: "Campaign builder will connect to Resend API." })} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
          <Mail className="w-3 h-3" /> New Campaign
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b text-xs ${darkMode ? "border-gray-200 text-gray-500" : "border-white/[0.04] text-gray-500"}`}>
              <th className="text-left px-5 py-3 font-medium">Campaign</th>
              <th className="text-center px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Sent</th>
              <th className="text-right px-5 py-3 font-medium">Opened</th>
              <th className="text-right px-5 py-3 font-medium">Replied</th>
              <th className="text-right px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {sampleCampaigns.map((c) => (
              <tr key={c.name} className={`border-b transition-colors ${darkMode ? "border-gray-100 hover:bg-gray-50" : "border-white/[0.03] hover:bg-white/[0.02]"}`}>
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3 text-center">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    c.status === "active" ? "bg-green-500/10 text-green-400" :
                    c.status === "draft" ? "bg-gray-500/10 text-gray-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>{c.status}</span>
                </td>
                <td className={`px-5 py-3 text-right ${darkMode ? "text-gray-700" : "text-gray-300"}`}>{c.sent}</td>
                <td className={`px-5 py-3 text-right ${darkMode ? "text-gray-700" : "text-gray-300"}`}>{c.opened}</td>
                <td className="px-5 py-3 text-right text-primary font-medium">{c.replied}</td>
                <td className={`px-5 py-3 text-right ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: GO LIVE (Cloudflare Stream)
   ================================================================ */

const GoLivePage = ({ darkMode, isLive, setIsLive }: { darkMode: boolean; isLive: boolean; setIsLive: (v: boolean) => void }) => {
  const [streamKey, setStreamKey] = useState("");
  const [streamTitle, setStreamTitle] = useState("");
  const [chatMessages, setChatMessages] = useState<{ user: string; text: string; time: string }[]>([
    { user: "System", text: "Stream chat is ready.", time: new Date().toLocaleTimeString() },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [viewerCount, setViewerCount] = useState(0);

  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";
  const innerBg = darkMode ? "bg-gray-50 border-gray-100" : "bg-[#0b1121] border-white/[0.04]";
  const inputBg = darkMode ? "bg-gray-100 border-gray-200 text-gray-900" : "bg-white/[0.04] border-white/[0.06] text-white";

  useEffect(() => {
    if (isLive) {
      const id = setInterval(() => setViewerCount((v) => v + Math.floor(Math.random() * 3)), 5000);
      return () => clearInterval(id);
    } else {
      setViewerCount(0);
    }
  }, [isLive]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { user: "LaSean (Host)", text: chatInput, time: new Date().toLocaleTimeString() }]);
    setChatInput("");
  };

  const pastStreams = [
    { title: "AI for Small Business - Workshop", date: "Feb 28, 2026", viewers: 142, duration: "1h 23m" },
    { title: "Building Automations Live", date: "Feb 21, 2026", viewers: 98, duration: "52m" },
    { title: "Q&A - Getting Started with AI", date: "Feb 14, 2026", viewers: 215, duration: "1h 45m" },
  ];

  return (
    <div className="space-y-6">
      {/* Stream controls */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Preview / Stream area */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`${cardBg} border rounded-xl overflow-hidden`}>
            {/* Stream preview */}
            <div className={`aspect-video ${innerBg} border-b ${darkMode ? "border-gray-200" : "border-white/[0.06]"} flex items-center justify-center relative`}>
              {isLive ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 text-primary mx-auto mb-3 animate-pulse" />
                      <p className="text-lg font-bold">LIVE</p>
                      <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{streamTitle || "Untitled Stream"}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs">
                      <Eye className="w-3 h-3" /> {viewerCount}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <VideoOff className={`w-16 h-16 mx-auto mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                  <p className={`text-lg font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Not Streaming</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Configure your stream below and go live</p>
                </div>
              )}
            </div>

            {/* Stream config */}
            <div className="p-5 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-medium mb-1.5 block ${darkMode ? "text-gray-600" : "text-gray-400"}`}>Stream Title</label>
                  <input
                    type="text"
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                    placeholder="e.g. AI Workshop - Live Session"
                    className={`w-full px-3 py-2 rounded-lg text-sm ${inputBg} border outline-none focus:ring-1 focus:ring-primary`}
                    disabled={isLive}
                  />
                </div>
                <div>
                  <label className={`text-xs font-medium mb-1.5 block ${darkMode ? "text-gray-600" : "text-gray-400"}`}>Cloudflare Stream Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={streamKey}
                      onChange={(e) => setStreamKey(e.target.value)}
                      placeholder="Enter your stream key"
                      className={`w-full px-3 py-2 pr-8 rounded-lg text-sm ${inputBg} border outline-none focus:ring-1 focus:ring-primary`}
                      disabled={isLive}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Copy className={`w-3.5 h-3.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                    isLive
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {isLive ? <><VideoOff className="w-4 h-4" /> End Stream</> : <><Video className="w-4 h-4" /> Go Live</>}
                </button>
                {isLive && (
                  <span className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    <Eye className="w-4 h-4 inline mr-1" /> {viewerCount} viewers watching
                  </span>
                )}
              </div>

              <div className={`text-[11px] p-3 rounded-lg ${darkMode ? "bg-blue-50 text-blue-700" : "bg-blue-500/10 text-blue-300"}`}>
                <p className="font-semibold mb-1">Cloudflare Stream Setup</p>
                <p>1. Get your stream key from your Cloudflare Stream dashboard</p>
                <p>2. Configure your streaming software (OBS, Streamlabs) with the RTMPS URL from Cloudflare</p>
                <p>3. Paste your stream key above and click "Go Live" when your encoder is streaming</p>
                <p>4. Clients logged into their portal will see your stream automatically</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        <div className={`${cardBg} border rounded-xl flex flex-col h-[600px]`}>
          <div className={`p-4 border-b ${darkMode ? "border-gray-200" : "border-white/[0.06]"} flex items-center justify-between`}>
            <h3 className="text-sm font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Live Chat
            </h3>
            {isLive && <span className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{viewerCount} online</span>}
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`text-xs ${msg.user === "System" ? (darkMode ? "text-gray-400" : "text-gray-500") + " italic" : ""}`}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`font-semibold ${msg.user === "LaSean (Host)" ? "text-primary" : ""}`}>{msg.user}</span>
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>{msg.time}</span>
                </div>
                <p className={darkMode ? "text-gray-700" : "text-gray-300"}>{msg.text}</p>
              </div>
            ))}
          </div>
          <div className={`p-3 border-t ${darkMode ? "border-gray-200" : "border-white/[0.06]"}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder={isLive ? "Type a message..." : "Chat available when live"}
                disabled={!isLive}
                className={`flex-1 px-3 py-2 rounded-lg text-sm ${inputBg} border outline-none focus:ring-1 focus:ring-primary`}
              />
              <button
                onClick={sendChat}
                disabled={!isLive}
                className="px-3 py-2 rounded-lg bg-primary text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Past streams */}
      <div className={`${cardBg} border rounded-xl overflow-hidden`}>
        <div className={`p-5 border-b ${darkMode ? "border-gray-200" : "border-white/[0.06]"}`}>
          <h2 className="text-base font-bold">Past Streams</h2>
        </div>
        <div className="divide-y ${darkMode ? 'divide-gray-200' : 'divide-white/[0.04]'}">
          {pastStreams.map((s, i) => (
            <div key={i} className={`px-5 py-4 flex items-center justify-between ${darkMode ? "hover:bg-gray-50" : "hover:bg-white/[0.02]"} transition-colors`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-gray-100" : "bg-white/[0.04]"}`}>
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{s.title}</p>
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{s.date} - {s.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}><Eye className="w-3 h-3 inline mr-1" />{s.viewers}</span>
                <button onClick={() => toast.info(`Loading replay: ${s.title}`)} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  Replay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: SETTINGS
   ================================================================ */

const SettingsPage = ({ darkMode }: { darkMode: boolean }) => {
  const cardBg = darkMode ? "bg-white border-gray-200" : "bg-[#111827] border-white/[0.06]";
  const innerBg = darkMode ? "bg-gray-50 border-gray-100" : "bg-[#0b1121] border-white/[0.04]";

  return (
    <div className="space-y-6">
      <div className={`${cardBg} border rounded-xl p-6`}>
        <h2 className="text-base font-bold mb-5">Platform Settings</h2>
        <div className="space-y-4 max-w-lg">
          {[
            { label: "Company Name", value: "Kaldr Tech" },
            { label: "Admin Email", value: "dre@kaldrbusiness.com" },
            { label: "Stripe Status", value: "Connected" },
            { label: "Resend API", value: "Connected" },
            { label: "Cloudflare Stream", value: "Ready" },
            { label: "Supabase CRM", value: "Connected" },
          ].map((s) => (
            <div key={s.label} className={`flex items-center justify-between py-2 border-b ${darkMode ? "border-gray-100" : "border-white/[0.04]"}`}>
              <span className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{s.label}</span>
              <span className="text-sm font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${cardBg} border rounded-xl p-6`}>
        <h2 className="text-base font-bold mb-5">Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "Stripe Payments", status: true },
            { name: "Resend Email", status: true },
            { name: "Vapi Voice AI", status: true },
            { name: "Supabase CRM", status: true },
            { name: "Brave Search", status: true },
            { name: "Telegram Bot (Ava)", status: true },
            { name: "Cloudflare Stream", status: true },
            { name: "Serper API", status: true },
          ].map((int) => (
            <div key={int.name} className={`flex items-center justify-between ${innerBg} border rounded-lg px-4 py-3`}>
              <span className="text-sm">{int.name}</span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-green-400">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${cardBg} border rounded-xl p-6`}>
        <h2 className="text-base font-bold mb-5">Chargeback Protection</h2>
        <div className="space-y-3 max-w-lg">
          {[
            { label: "Terms of Service", status: "Active", desc: "Required at checkout" },
            { label: "Refund Policy", status: "Active", desc: "24hr cancellation window" },
            { label: "Digital Service Acknowledgment", status: "Active", desc: "Required before purchase" },
            { label: "Explicit Charge Authorization", status: "Active", desc: "Required at checkout" },
          ].map((p) => (
            <div key={p.label} className={`flex items-center justify-between py-2 border-b ${darkMode ? "border-gray-100" : "border-white/[0.04]"}`}>
              <div>
                <span className="text-sm">{p.label}</span>
                <p className={`text-[11px] ${darkMode ? "text-gray-500" : "text-gray-500"}`}>{p.desc}</p>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-green-400">
                <CheckCircle2 className="w-3 h-3" /> {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   MAIN
   ================================================================ */

const AdminDashboard = () => {
  const [page, setPage] = useState<Page>("overview");
  const [darkMode, setDarkMode] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const toggleDarkMode = () => setDarkMode((p) => !p);

  const pages: Record<Page, React.ReactNode> = {
    overview: <OverviewPage darkMode={darkMode} />,
    clients: <ClientsPage darkMode={darkMode} />,
    orders: <OrdersPage darkMode={darkMode} />,
    pipeline: <PipelinePage darkMode={darkMode} />,
    analytics: <AnalyticsPage darkMode={darkMode} />,
    campaigns: <CampaignsPage darkMode={darkMode} />,
    golive: <GoLivePage darkMode={darkMode} isLive={isLive} setIsLive={setIsLive} />,
    settings: <SettingsPage darkMode={darkMode} />,
  };

  return (
    <AdminShell activePage={page} setPage={setPage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} isLive={isLive}>
      {pages[page]}
    </AdminShell>
  );
};

export default AdminDashboard;
