import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, TrendingUp, BarChart3, Mail, Settings,
  LogOut, Sun, Bot, Cog, Headphones, Crown, DollarSign,
  UserPlus, AlertCircle, CheckCircle2, Clock,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

/* ================================================================
   TYPES
   ================================================================ */

type Page = "overview" | "clients" | "pipeline" | "analytics" | "campaigns" | "settings";

/* ================================================================
   NAV
   ================================================================ */

const navItems: { id: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "clients", label: "Clients", icon: Users },
  { id: "pipeline", label: "Pipeline", icon: TrendingUp },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "campaigns", label: "Campaigns", icon: Mail },
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

const sampleClients = [
  { name: "Citywide HVAC", tier: "AI & Automation", status: "active", mrr: 2497, joined: "Mar 1" },
  { name: "Apex Plumbing", tier: "Done-For-You", status: "active", mrr: 497, joined: "Feb 28" },
  { name: "Metro Electric Co", tier: "Strategic Consulting", status: "trial", mrr: 0, joined: "Mar 4" },
  { name: "Summit Roofing", tier: "Business Transformation", status: "active", mrr: 997, joined: "Feb 15" },
  { name: "GreenScape Landscaping", tier: "Done-For-You", status: "active", mrr: 297, joined: "Jan 20" },
];

const samplePipeline = [
  { name: "BlueStar HVAC", stage: "Discovery", value: "$997/mo", probability: "60%", lastContact: "Mar 4" },
  { name: "Premier Electric", stage: "Proposal Sent", value: "$2,997/mo", probability: "40%", lastContact: "Mar 3" },
  { name: "Atlas Construction", stage: "Demo Scheduled", value: "$9,997/mo", probability: "25%", lastContact: "Mar 5" },
  { name: "Comfort Air Systems", stage: "Follow-up", value: "$197/mo", probability: "70%", lastContact: "Mar 2" },
  { name: "ProClean Services", stage: "Negotiation", value: "$997/mo", probability: "80%", lastContact: "Mar 5" },
];

const sampleCampaigns = [
  { name: "HVAC Spring Outreach", status: "active", sent: 200, opened: 68, replied: 12, date: "Mar 3" },
  { name: "Plumbing Cold Email v2", status: "active", sent: 150, opened: 45, replied: 8, date: "Mar 1" },
  { name: "Roofing Lead Gen", status: "draft", sent: 0, opened: 0, replied: 0, date: "Mar 5" },
  { name: "General Contractors", status: "paused", sent: 100, opened: 32, replied: 5, date: "Feb 25" },
];

/* ================================================================
   SHARED UI
   ================================================================ */

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#111827] border border-white/[0.06] rounded-xl ${className}`}>{children}</div>
);

/* ================================================================
   LAYOUT
   ================================================================ */

const AdminShell = ({
  activePage,
  setPage,
  children,
}: {
  activePage: Page;
  setPage: (p: Page) => void;
  children: React.ReactNode;
}) => {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const id = setInterval(() => setLastUpdated(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1121] text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-[180px] shrink-0 bg-[#0b1121] border-r border-white/[0.06] flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
            K
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Kaldr Tech</p>
            <p className="text-[10px] text-gray-500 truncate">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-0.5">
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/[0.06]">
          <p className="text-[10px] text-gray-600 text-center">&copy; 2026 Kaldr Tech</p>
        </div>
      </aside>

      <div className="flex-1 ml-[180px]">
        <header className="h-12 border-b border-white/[0.06] flex items-center justify-end px-6 gap-4 bg-[#0b1121] sticky top-0 z-30">
          <span className="text-[11px] text-gray-500">Updated: {lastUpdated}</span>
          <span className="text-[11px] text-gray-500">Goal: $200K-$300K/mo</span>
          <button className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors">
            <Sun className="w-3.5 h-3.5 text-gray-400" />
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

const OverviewPage = () => {
  const totalMRR = pillars.reduce((s, p) => s + p.mrr, 0);
  const totalClients = pillars.reduce((s, p) => s + p.clients, 0);

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
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <span className="text-[11px] text-gray-500 font-medium">{kpi.label}</span>
              </div>
              <p className="text-xl font-bold">{kpi.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Revenue Pillars */}
      <Card className="p-6">
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
                className={`bg-[#0b1121] border border-white/[0.04] border-l-4 ${c.border} rounded-lg p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${c.text}`}>{p.name}</h3>
                  <Icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Price:</span><span className="font-medium">{p.price}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Active:</span><span className="font-medium">{p.clients} {p.clientLabel}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">MRR:</span><span className="font-medium text-green-400">{fmt(p.mrr)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Pipeline:</span><span className="font-medium text-yellow-400">{p.pipeline} prospects</span></div>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-3">
                  <div className={`${c.bar} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[10px] text-gray-600 text-center mt-1">Goal: {p.goal}</p>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Revenue chart */}
      <Card className="p-6">
        <h2 className="text-base font-bold mb-4">Revenue Projection</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} tickFormatter={(v) => "$" + (v / 1000) + "K"} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, fontSize: 12 }}
                formatter={(value: number) => ["$" + value.toLocaleString()]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="actual" stroke="#a855f7" strokeWidth={2} name="Actual" dot={false} />
              <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Projected" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

/* ================================================================
   PAGE: CLIENTS
   ================================================================ */

const ClientsPage = () => (
  <Card className="overflow-hidden">
    <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
      <h2 className="text-base font-bold">All Clients</h2>
      <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
        <UserPlus className="w-3 h-3" /> Add Client
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.04] text-xs text-gray-500">
            <th className="text-left px-5 py-3 font-medium">Company</th>
            <th className="text-left px-5 py-3 font-medium">Tier</th>
            <th className="text-center px-5 py-3 font-medium">Status</th>
            <th className="text-right px-5 py-3 font-medium">MRR</th>
            <th className="text-right px-5 py-3 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          {sampleClients.map((c) => (
            <tr key={c.name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <td className="px-5 py-3 font-medium">{c.name}</td>
              <td className="px-5 py-3 text-gray-400">{c.tier}</td>
              <td className="px-5 py-3 text-center">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                  c.status === "active" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="px-5 py-3 text-right font-medium text-green-400">{c.mrr > 0 ? fmt(c.mrr) : "-"}</td>
              <td className="px-5 py-3 text-right text-gray-500">{c.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

/* ================================================================
   PAGE: PIPELINE
   ================================================================ */

const PipelinePage = () => (
  <Card className="overflow-hidden">
    <div className="p-5 border-b border-white/[0.06]">
      <h2 className="text-base font-bold">Sales Pipeline</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.04] text-xs text-gray-500">
            <th className="text-left px-5 py-3 font-medium">Prospect</th>
            <th className="text-left px-5 py-3 font-medium">Stage</th>
            <th className="text-right px-5 py-3 font-medium">Value</th>
            <th className="text-center px-5 py-3 font-medium">Probability</th>
            <th className="text-right px-5 py-3 font-medium">Last Contact</th>
          </tr>
        </thead>
        <tbody>
          {samplePipeline.map((p) => (
            <tr key={p.name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <td className="px-5 py-3 font-medium">{p.name}</td>
              <td className="px-5 py-3">
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{p.stage}</span>
              </td>
              <td className="px-5 py-3 text-right font-medium">{p.value}</td>
              <td className="px-5 py-3 text-center text-gray-400">{p.probability}</td>
              <td className="px-5 py-3 text-right text-gray-500">{p.lastContact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

/* ================================================================
   PAGE: ANALYTICS
   ================================================================ */

const AnalyticsPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: "Emails Sent", value: "450", sub: "This month" },
        { label: "Open Rate", value: "34%", sub: "Avg across campaigns" },
        { label: "Reply Rate", value: "5.6%", sub: "Avg across campaigns" },
        { label: "Meetings Booked", value: "8", sub: "From outreach" },
      ].map((s) => (
        <Card key={s.label} className="p-4">
          <p className="text-2xl font-bold text-primary">{s.value}</p>
          <p className="text-xs font-medium mt-1">{s.label}</p>
          <p className="text-[10px] text-gray-500">{s.sub}</p>
        </Card>
      ))}
    </div>
    <Card className="p-6">
      <h2 className="text-base font-bold mb-4">Revenue Trend</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} tickFormatter={(v) => "$" + (v / 1000) + "K"} />
            <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, fontSize: 12 }} formatter={(value: number) => ["$" + value.toLocaleString()]} />
            <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} name="Revenue" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

/* ================================================================
   PAGE: CAMPAIGNS
   ================================================================ */

const CampaignsPage = () => (
  <Card className="overflow-hidden">
    <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
      <h2 className="text-base font-bold">Email Campaigns</h2>
      <button className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
        <Mail className="w-3 h-3" /> New Campaign
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.04] text-xs text-gray-500">
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
            <tr key={c.name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
              <td className="px-5 py-3 font-medium">{c.name}</td>
              <td className="px-5 py-3 text-center">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                  c.status === "active" ? "bg-green-500/10 text-green-400" :
                  c.status === "draft" ? "bg-gray-500/10 text-gray-400" :
                  "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="px-5 py-3 text-right text-gray-300">{c.sent}</td>
              <td className="px-5 py-3 text-right text-gray-300">{c.opened}</td>
              <td className="px-5 py-3 text-right text-primary font-medium">{c.replied}</td>
              <td className="px-5 py-3 text-right text-gray-500">{c.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

/* ================================================================
   PAGE: SETTINGS
   ================================================================ */

const SettingsPage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <h2 className="text-base font-bold mb-5">Platform Settings</h2>
      <div className="space-y-4 max-w-lg">
        {[
          { label: "Company Name", value: "Kaldr Tech" },
          { label: "Admin Email", value: "dre@kaldrbusiness.com" },
          { label: "Stripe Status", value: "Connected" },
          { label: "Resend API", value: "Connected" },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
            <span className="text-sm text-gray-400">{s.label}</span>
            <span className="text-sm font-medium">{s.value}</span>
          </div>
        ))}
      </div>
    </Card>
    <Card className="p-6">
      <h2 className="text-base font-bold mb-5">Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { name: "Stripe Payments", status: true },
          { name: "Resend Email", status: true },
          { name: "Vapi Voice AI", status: true },
          { name: "Supabase CRM", status: true },
          { name: "Brave Search", status: true },
          { name: "Telegram Bot", status: true },
        ].map((int) => (
          <div key={int.name} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <span className="text-sm">{int.name}</span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-green-400">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ================================================================
   MAIN
   ================================================================ */

const AdminDashboard = () => {
  const [page, setPage] = useState<Page>("overview");

  const pages: Record<Page, React.ReactNode> = {
    overview: <OverviewPage />,
    clients: <ClientsPage />,
    pipeline: <PipelinePage />,
    analytics: <AnalyticsPage />,
    campaigns: <CampaignsPage />,
    settings: <SettingsPage />,
  };

  return (
    <AdminShell activePage={page} setPage={setPage}>
      {pages[page]}
    </AdminShell>
  );
};

export default AdminDashboard;
