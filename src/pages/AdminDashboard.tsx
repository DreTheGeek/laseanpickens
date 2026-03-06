import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket, BarChart3, Bot, Building2, Code2, Settings,
  Mail, Smartphone, Phone, TrendingUp, ArrowLeft,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

/* ---------- data ---------- */

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
  priceLabel: string;
  active: number;
  activeLabel: string;
  mrr: number;
  pipeline: number;
  pipelineLabel: string;
  goal: string;
  goalTarget: number;
  accent: string;
}

const pillars: Pillar[] = [
  {
    name: "Startup Automation",
    icon: Rocket,
    price: "$197/mo",
    priceLabel: "Price",
    active: 0,
    activeLabel: "clients",
    mrr: 0,
    pipeline: 0,
    pipelineLabel: "prospects",
    goal: "500 clients ($98K MRR)",
    goalTarget: 500,
    accent: "purple",
  },
  {
    name: "Business Intelligence",
    icon: BarChart3,
    price: "$997/mo",
    priceLabel: "Price",
    active: 0,
    activeLabel: "clients",
    mrr: 0,
    pipeline: 0,
    pipelineLabel: "prospects",
    goal: "50 clients ($50K MRR)",
    goalTarget: 50,
    accent: "blue",
  },
  {
    name: "AI Business Systems",
    icon: Bot,
    price: "$2,997/mo",
    priceLabel: "Price",
    active: 0,
    activeLabel: "clients",
    mrr: 0,
    pipeline: 0,
    pipelineLabel: "prospects",
    goal: "20 clients ($60K MRR)",
    goalTarget: 20,
    accent: "green",
  },
  {
    name: "Enterprise Solutions",
    icon: Building2,
    price: "$9,997/mo",
    priceLabel: "Price",
    active: 0,
    activeLabel: "clients",
    mrr: 0,
    pipeline: 0,
    pipelineLabel: "prospects",
    goal: "5 clients ($50K MRR)",
    goalTarget: 5,
    accent: "yellow",
  },
  {
    name: "Custom Development",
    icon: Code2,
    price: "$75K+",
    priceLabel: "Avg Project",
    active: 0,
    activeLabel: "projects",
    mrr: 0,
    pipeline: 0,
    pipelineLabel: "prospects",
    goal: "12 projects/year ($900K)",
    goalTarget: 12,
    accent: "red",
  },
  {
    name: "Managed AI Services",
    icon: Settings,
    price: "$5K+/mo",
    priceLabel: "Avg Price",
    active: 0,
    activeLabel: "clients",
    mrr: 0,
    pipeline: 0,
    pipelineLabel: "prospects",
    goal: "8 clients ($40K MRR)",
    goalTarget: 8,
    accent: "pink",
  },
];

const accentColors: Record<string, { border: string; text: string; bg: string }> = {
  purple: { border: "border-purple-500", text: "text-purple-400", bg: "bg-purple-500" },
  blue: { border: "border-blue-500", text: "text-blue-400", bg: "bg-blue-500" },
  green: { border: "border-green-500", text: "text-green-400", bg: "bg-green-500" },
  yellow: { border: "border-yellow-500", text: "text-yellow-400", bg: "bg-yellow-500" },
  red: { border: "border-red-500", text: "text-red-400", bg: "bg-red-500" },
  pink: { border: "border-pink-500", text: "text-pink-400", bg: "bg-pink-500" },
};

const quickActions = [
  { icon: Mail, label: "Send Campaign", sub: "Email sequences" },
  { icon: Smartphone, label: "Social Posts", sub: "Automated posting" },
  { icon: Phone, label: "Lead Follow-up", sub: "AI automation" },
  { icon: TrendingUp, label: "Analytics", sub: "Deep insights" },
];

/* ---------- helpers ---------- */

const fmt = (n: number) => "$" + n.toLocaleString();

/* ---------- component ---------- */

const AdminDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => setLastUpdated(new Date().toLocaleTimeString()), 30000);
    return () => clearInterval(id);
  }, []);

  const totalMRR = pillars.reduce((s, p) => s + p.mrr, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-blue-950 to-indigo-950 text-white">
      {/* Header */}
      <header className="glass-dark p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ava's Command Center
            </h1>
          </div>
          <div className="text-sm text-gray-300 text-right">
            <div>Last Updated: {lastUpdated}</div>
            <div>Revenue Goal: $200K-$300K/mo</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Revenue Overview - 6 cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total MRR", value: fmt(totalMRR), sub: "+0% from last month", color: "text-purple-400" },
            { label: "ARR", value: fmt(totalMRR * 12), sub: "Annualized", color: "text-blue-400" },
            { label: "Active Clients", value: String(pillars.reduce((s, p) => s + p.active, 0)), sub: "Across all tiers", color: "text-green-400" },
            { label: "Pipeline Value", value: "$0", sub: "Weighted forecast", color: "text-yellow-400" },
            { label: "Churn Rate", value: "0%", sub: "Monthly average", color: "text-red-400" },
            { label: "Goal Progress", value: totalMRR > 0 ? Math.round((totalMRR / 200000) * 100) + "%" : "0%", sub: "To $200K MRR", color: "text-pink-400" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <h3 className={`text-sm font-semibold ${card.color}`}>{card.label}</h3>
              <div className="text-2xl font-bold mt-1">{card.value}</div>
              <div className="text-xs text-gray-400 mt-1">{card.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* 6 Revenue Pillars */}
        <div className="glass-dark rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            6 Revenue Pillars Performance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, i) => {
              const colors = accentColors[p.accent];
              const Icon = p.icon;
              const progress = p.goalTarget > 0 ? Math.min((p.active / p.goalTarget) * 100, 100) : 0;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`glass rounded-xl p-5 border-l-4 ${colors.border}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-base font-semibold ${colors.text}`}>{p.name}</h3>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{p.priceLabel}:</span>
                      <span className="font-semibold">{p.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Active:</span>
                      <span className="font-semibold">{p.active} {p.activeLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">MRR:</span>
                      <span className="font-semibold text-green-400">{fmt(p.mrr)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pipeline:</span>
                      <span className="font-semibold text-yellow-400">{p.pipeline} {p.pipelineLabel}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                      <div className={`${colors.bg} h-2 rounded-full transition-all`} style={{ width: `${progress}%` }} />
                    </div>
                    <div className="text-xs text-gray-500 text-center">Goal: {p.goal}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="glass-dark rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Revenue Projection</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => "$" + (v / 1000) + "K"}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                  formatter={(value: number) => ["$" + value.toLocaleString()]}
                />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#a855f7" strokeWidth={2} name="Actual Revenue" dot={false} />
                <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Projected Revenue" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.04 }}
              className="glass rounded-xl p-6 text-center hover:bg-white/5 transition-all group"
            >
              <action.icon className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-sm">{action.label}</div>
              <div className="text-xs text-gray-400">{action.sub}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
