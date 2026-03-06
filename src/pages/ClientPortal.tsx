import { useState } from "react";
import { motion } from "framer-motion";
import {
  User, LayoutDashboard, GraduationCap, Users, CalendarDays,
  FolderOpen, MessageSquare, Link2, LogOut, Sun, Send,
  Camera, Mail, Phone, MapPin, Lock, Play, Trophy,
  Star, MessageCircle, Award, FileText, CheckCircle2,
  ShieldCheck, KeyRound, Fingerprint, ArrowRight,
} from "lucide-react";

/* ================================================================
   TYPES
   ================================================================ */

type Page =
  | "profile"
  | "dashboard"
  | "academy"
  | "community"
  | "schedule"
  | "resources"
  | "communications"
  | "affiliate";

/* ================================================================
   SIDEBAR NAV ITEMS
   ================================================================ */

const navItems: { id: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "academy", label: "AI Academy", icon: GraduationCap },
  { id: "community", label: "Community", icon: Users },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "resources", label: "Resources", icon: FolderOpen },
  { id: "communications", label: "Communications", icon: MessageSquare },
  { id: "affiliate", label: "Affiliate Portal", icon: Link2 },
];

/* ================================================================
   SAMPLE DATA
   ================================================================ */

const samplePrograms = [
  { name: "AI Business Starter", since: "03/01/2026", active: true },
  { name: "Growth Accelerator", since: "02/15/2026", active: true },
  { name: "VIP Coaching", since: "01/20/2026", active: true },
  { name: "Empire Mastermind", since: "03/05/2026", active: false },
];

const sampleCourses = [
  { title: "AI Automation 101", desc: "Learn the fundamentals of business AI automation", locked: false, progress: 65 },
  { title: "Lead Generation Mastery", desc: "Master automated lead gen systems", locked: false, progress: 30 },
  { title: "Sales Pipeline Automation", desc: "Build end-to-end automated sales funnels", locked: true, points: 100 },
  { title: "Advanced AI Systems", desc: "Design custom AI workflows for your business", locked: true, points: 200 },
  { title: "Scaling with AI", desc: "Scale operations without scaling headcount", locked: true, points: 300 },
  { title: "Enterprise AI Strategy", desc: "AI strategy for multi-location businesses", locked: true, points: 500 },
];

const sampleMessages = [
  { type: "SMS", text: "Welcome to Kaldr Tech! Your AI systems are being configured...", date: "Mar 5" },
  { type: "Email", text: "Your Growth Accelerator onboarding session is scheduled for Thursday at 2 PM ET.", date: "Mar 3" },
  { type: "SMS", text: "Quick reminder: Weekly coaching call tomorrow at 11 AM ET. See you there!", date: "Feb 28" },
];

const sampleChat = [
  { user: "LaSean Pickens", avatar: "LP", msg: "Welcome everyone to the Winner Circle! Let's build something great.", time: "9:00 AM", date: "March 5, 2026", isHost: true },
  { user: "Maria Chen", avatar: "MC", msg: "Excited to be here! Just signed up for the Growth Accelerator.", time: "9:14 AM", date: "March 5, 2026" },
  { user: "James Wilson", avatar: "JW", msg: "The AI automation setup was incredible. Already seeing results in week one.", time: "9:22 AM", date: "March 5, 2026" },
  { user: "Sarah Mitchell", avatar: "SM", msg: "Can we get a session on Vapi integration? Would love to set that up for my team.", time: "10:05 AM", date: "March 5, 2026" },
  { user: "LaSean Pickens", avatar: "LP", msg: "Absolutely Sarah - I'll cover that in Thursday's coaching call.", time: "10:12 AM", date: "March 5, 2026", isHost: true },
];

const sampleSchedule = [
  { title: "Weekly Group Coaching Call", date: "Thu, Mar 6", time: "2:00 PM ET", type: "Zoom" },
  { title: "AI Academy Live Q&A", date: "Mon, Mar 10", time: "11:00 AM ET", type: "Zoom" },
  { title: "1-on-1 Strategy Session", date: "Wed, Mar 12", time: "3:00 PM ET", type: "Zoom" },
  { title: "Empire Mastermind Meetup", date: "Fri, Mar 21", time: "10:00 AM ET", type: "In-Person" },
];

const sampleResources = [
  { title: "AI Automation Playbook", type: "PDF", size: "2.4 MB" },
  { title: "Lead Gen Templates Pack", type: "ZIP", size: "8.1 MB" },
  { title: "Cold Email Swipe File", type: "PDF", size: "1.2 MB" },
  { title: "CRM Setup Guide", type: "PDF", size: "3.7 MB" },
  { title: "Vapi Voice AI Tutorial", type: "VIDEO", size: "45 min" },
  { title: "Scaling Checklist", type: "PDF", size: "890 KB" },
];

/* ================================================================
   LAYOUT SHELL
   ================================================================ */

const PortalShell = ({
  activePage,
  setPage,
  children,
}: {
  activePage: Page;
  setPage: (p: Page) => void;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen bg-[#0b1121] text-gray-100 flex">
    {/* Sidebar */}
    <aside className="w-[180px] shrink-0 bg-[#0b1121] border-r border-white/[0.06] flex flex-col fixed inset-y-0 left-0 z-40">
      {/* User info */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
          L
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">LaSean</p>
          <p className="text-[10px] text-gray-500 truncate">dre@kaldrbusiness.com</p>
        </div>
      </div>

      {/* Nav */}
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

      {/* Footer */}
      <div className="p-3 border-t border-white/[0.06]">
        <p className="text-[10px] text-gray-600 text-center">&copy; 2026 LaSean Pickens</p>
      </div>
    </aside>

    {/* Main area */}
    <div className="flex-1 ml-[180px]">
      {/* Top header */}
      <header className="h-12 border-b border-white/[0.06] flex items-center justify-end px-6 gap-4 bg-[#0b1121] sticky top-0 z-30">
        <span className="text-xs text-gray-500">dre@kaldrbusiness.com</span>
        <button className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/10 transition-colors">
          <Sun className="w-3.5 h-3.5 text-gray-400" />
        </button>
        <a
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/90 hover:bg-primary text-white text-xs font-medium transition-colors"
        >
          <LogOut className="w-3 h-3" /> Sign Out
        </a>
      </header>

      {/* Content */}
      <main className="p-6 max-w-[1100px]">
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

/* ================================================================
   SHARED UI
   ================================================================ */

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#111827] border border-white/[0.06] rounded-xl ${className}`}>{children}</div>
);

const SectionTitle = ({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) => (
  <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
    <Icon className="w-5 h-5 text-primary" />
    {children}
  </h2>
);

const InputField = ({
  label,
  icon: Icon,
  value,
  placeholder,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
    <div className="flex items-center gap-2 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5">
      <Icon className="w-4 h-4 text-gray-500 shrink-0" />
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="bg-transparent text-sm text-gray-200 w-full outline-none placeholder:text-gray-600"
      />
    </div>
  </div>
);

/* ================================================================
   PAGE: PROFILE
   ================================================================ */

const ProfilePage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white">
            L
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Camera className="w-3 h-3 text-white" />
          </button>
        </div>
        <div>
          <h2 className="text-lg font-bold">LaSean</h2>
          <p className="text-sm text-gray-500">Click the camera to upload a photo</p>
        </div>
      </div>
    </Card>

    <Card className="p-6">
      <h3 className="text-base font-bold mb-5">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Full Name" icon={User} value="LaSean" />
        <InputField label="Email Address" icon={Mail} value="dre@kaldrbusiness.com" />
        <InputField label="Phone Number" icon={Phone} value="" placeholder="Your phone number" />
        <InputField label="Address" icon={MapPin} value="" placeholder="Your address" />
      </div>
      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-400 mb-1.5">About You</label>
        <textarea
          rows={3}
          placeholder="Tell us a bit about yourself and your AI journey..."
          className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600 resize-none"
        />
      </div>
    </Card>

    <Card className="p-6">
      <h3 className="text-base font-bold mb-5">Social Media Profiles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Facebook" icon={Link2} value="" placeholder="https://facebook.com/yourprofile" />
        <InputField label="Instagram" icon={Link2} value="" placeholder="https://instagram.com/yourprofile" />
        <InputField label="TikTok" icon={Link2} value="" placeholder="https://tiktok.com/@yourprofile" />
        <InputField label="YouTube" icon={Link2} value="" placeholder="https://youtube.com/@yourhandle" />
      </div>
    </Card>

    <div className="flex justify-end">
      <button className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
        Save Changes
      </button>
    </div>
  </div>
);

/* ================================================================
   PAGE: DASHBOARD
   ================================================================ */

const DashboardPage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <SectionTitle icon={Award}>My Programs</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {samplePrograms.map((p) => (
          <div key={p.name} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <div>
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-gray-500">Since {p.since}</p>
            </div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              p.active ? "bg-primary/20 text-primary" : "bg-gray-700 text-gray-400"
            }`}>
              {p.active ? "Active" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </Card>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { label: "Courses Completed", value: "2 / 6" },
        { label: "Community Points", value: "45" },
        { label: "Sessions Attended", value: "8" },
        { label: "Referrals", value: "3" },
      ].map((s) => (
        <Card key={s.label} className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{s.value}</p>
          <p className="text-xs text-gray-500 mt-1">{s.label}</p>
        </Card>
      ))}
    </div>

    <Card className="p-6">
      <SectionTitle icon={CalendarDays}>Upcoming Sessions</SectionTitle>
      <div className="space-y-2">
        {sampleSchedule.slice(0, 3).map((s) => (
          <div key={s.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <div>
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="text-xs text-gray-500">{s.date} - {s.time}</p>
            </div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{s.type}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ================================================================
   PAGE: AI ACADEMY
   ================================================================ */

const AcademyPage = () => (
  <div className="space-y-6">
    <Card className="p-6 text-center">
      <h2 className="text-xl font-bold mb-1">AI Academy</h2>
      <p className="text-sm text-gray-500 mb-4">Training from LaSean Pickens - earn points to unlock premium courses!</p>
      <div className="flex items-center justify-center gap-2 text-sm">
        <Trophy className="w-4 h-4 text-primary" />
        <span className="text-primary font-semibold">45 / 100 Points</span>
        <div className="w-32 h-2 bg-gray-700 rounded-full ml-1">
          <div className="w-[45%] h-2 bg-primary rounded-full" />
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sampleCourses.map((c) => (
        <Card key={c.title} className="overflow-hidden">
          {/* Course header */}
          <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
            {c.locked && (
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-700 text-gray-300 uppercase">
                Locked
              </span>
            )}
            {c.locked ? (
              <Lock className="w-8 h-8 text-gray-500" />
            ) : (
              <Play className="w-8 h-8 text-primary" />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold mb-1">{c.title}</h3>
            <p className="text-xs text-gray-500 mb-3">{c.desc}</p>
            {c.locked ? (
              <button className="w-full py-2 rounded-lg bg-amber-600/20 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Unlock at {c.points} Points
              </button>
            ) : (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{c.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full">
                  <div className="h-1.5 bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

/* ================================================================
   PAGE: COMMUNITY
   ================================================================ */

const CommunityPage = () => {
  const [tab, setTab] = useState<"about" | "chat">("about");
  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/[0.06] pb-2">
        {(["about", "chat"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm font-medium pb-1 capitalize transition-colors ${
              tab === t ? "text-white border-b-2 border-primary" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t === "about" ? "About" : "Chat"}
          </button>
        ))}
      </div>

      {tab === "about" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">Winner Circle Community</h2>
              <p className="text-sm text-gray-400 mb-6">
                Welcome to the Winner Circle - an exclusive community for action-takers and achievers.
                Connect with like-minded entrepreneurs, share your wins, get feedback, and level up together.
              </p>
              <div className="h-48 bg-[#0b1121] rounded-lg flex items-center justify-center border border-white/[0.04]">
                <div className="text-center">
                  <Play className="w-10 h-10 text-primary mx-auto mb-2 opacity-60" />
                  <p className="text-sm text-gray-500">Watch the Introduction</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <SectionTitle icon={Star}>What You Get</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: MessageCircle, title: "Community Feed", desc: "Share wins, ask questions, and discuss topics" },
                  { icon: Users, title: "Member Directory", desc: "Connect and network with other members" },
                  { icon: Trophy, title: "Leaderboard & Points", desc: "Earn points for engagement and climb the ranks" },
                  { icon: FileText, title: "Work Submissions", desc: "Submit your projects and get feedback" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 bg-[#0b1121] rounded-lg p-3 border border-white/[0.04]">
                    <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <SectionTitle icon={CheckCircle2}>Who This Is For</SectionTitle>
              <div className="space-y-2">
                {[
                  "Entrepreneurs ready to take action",
                  "Business owners looking to grow with AI",
                  "People who want to be surrounded by winners",
                  "Anyone committed to leveling up their skills",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-sm text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar card */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-primary to-primary/70" />
              <div className="px-4 pb-4 -mt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary mx-auto flex items-center justify-center text-lg font-bold border-2 border-[#111827]">
                  LP
                </div>
                <p className="text-sm font-bold mt-2">Winner Circle</p>
                <p className="text-[10px] text-gray-500">Community for Everyone</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                  <div>
                    <p className="text-lg font-bold">12</p>
                    <p className="text-[10px] text-gray-500 uppercase">Members</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">45</p>
                    <p className="text-[10px] text-gray-500 uppercase">Your Pts</p>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors">
                  <Users className="w-3 h-3" /> Invite Members
                </button>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">Leaderboard</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-amber-400" />
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">LP</div>
                  <span className="text-xs">LaSean Pickens</span>
                </div>
                <span className="text-xs text-primary font-semibold">+45</span>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === "chat" && (
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold">Winner Circle Chat</p>
              <p className="text-xs text-gray-500">{sampleChat.length} messages</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mb-4">
            {/* Date separator */}
            <div className="text-center">
              <span className="text-[10px] bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full">March 5, 2026</span>
            </div>
            {sampleChat.map((m, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                  m.isHost ? "bg-primary text-white" : "bg-gray-700 text-gray-300"
                }`}>
                  {m.avatar}
                </div>
                <div>
                  <div className="bg-[#0b1121] rounded-lg px-3 py-2 border border-white/[0.04] max-w-md">
                    <p className={`text-xs font-bold mb-0.5 ${m.isHost ? "text-primary" : "text-blue-400"}`}>{m.user}</p>
                    <p className="text-sm text-gray-200">{m.msg}</p>
                  </div>
                  <p className="text-[10px] text-gray-600 mt-0.5 ml-1">{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600"
            />
            <button className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

/* ================================================================
   PAGE: SCHEDULE
   ================================================================ */

const SchedulePage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <SectionTitle icon={CalendarDays}>Upcoming Sessions</SectionTitle>
      <div className="space-y-2">
        {sampleSchedule.map((s) => (
          <div key={s.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3.5 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-gray-500">{s.date} - {s.time}</p>
              </div>
            </div>
            <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
              s.type === "Zoom" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-400"
            }`}>
              {s.type}
            </span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ================================================================
   PAGE: RESOURCES
   ================================================================ */

const ResourcesPage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <SectionTitle icon={FolderOpen}>Resources & Downloads</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sampleResources.map((r) => (
          <div key={r.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="text-xs text-gray-500">{r.type} - {r.size}</p>
              </div>
            </div>
            <button className="text-xs text-primary font-medium hover:underline">Download</button>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ================================================================
   PAGE: COMMUNICATIONS
   ================================================================ */

const CommunicationsPage = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
    <Card className="p-6">
      <SectionTitle icon={MessageSquare}>Past Communications</SectionTitle>
      <p className="text-sm text-gray-500 mb-4">Messages sent to you from our team.</p>
      <div className="space-y-2">
        {sampleMessages.map((m, i) => (
          <div key={i} className="bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04] flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{m.type} Message</p>
                <p className="text-xs text-gray-400 mt-0.5">{m.text}</p>
              </div>
            </div>
            <span className="text-[11px] text-gray-500 shrink-0 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> {m.date}
            </span>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-6">
      <SectionTitle icon={Send}>Send a Message</SectionTitle>
      <p className="text-sm text-gray-500 mb-4">Have a question? Send us a message and we'll get back to you.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
          <input
            type="text"
            placeholder="What do you need help with?"
            className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
          <textarea
            rows={5}
            placeholder="Describe your question or issue in detail..."
            className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600 resize-none"
          />
        </div>
        <button className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
          <Send className="w-4 h-4" /> Send Message
        </button>
      </div>
    </Card>
  </div>
);

/* ================================================================
   PAGE: AFFILIATE PORTAL
   ================================================================ */

const AffiliatePage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <SectionTitle icon={Award}>My Programs</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {samplePrograms.filter((p) => p.active).map((p) => (
          <div key={p.name} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <div>
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-gray-500">Since {p.since}</p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary">Active</span>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-6 text-center">
      <SectionTitle icon={Link2}>Your Affiliate Link</SectionTitle>
      <p className="text-sm text-gray-500 mb-4">Generate your unique affiliate link to start referring members.</p>
      <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">
        <Link2 className="w-4 h-4" /> Generate Affiliate Link
      </button>
    </Card>
  </div>
);

/* ================================================================
   VERIFICATION FLOW
   ================================================================ */

const VerificationFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const steps = [
    { icon: Mail, title: "Verify Email", desc: "We sent a 6-digit code to your email address" },
    { icon: Phone, title: "Verify Phone", desc: "Enter the code sent to your phone number" },
    { icon: ShieldCheck, title: "Identity Confirmed", desc: "Your account is verified and secure" },
  ];

  const handleCodeChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
  };

  return (
    <div className="min-h-screen bg-[#0b1121] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-xl font-bold mb-1">Account Verification</h1>
            <p className="text-sm text-gray-500">Complete verification to access your portal</p>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step ? "bg-green-500 text-white" :
                  i === step ? "bg-primary text-white" :
                  "bg-gray-700 text-gray-400"
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${i < step ? "bg-green-500" : "bg-gray-700"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Current step */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            {step < 2 ? (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {step === 0 ? <Mail className="w-5 h-5 text-primary" /> : <Phone className="w-5 h-5 text-primary" />}
                </div>
                <h2 className="text-base font-bold mb-1">{steps[step].title}</h2>
                <p className="text-xs text-gray-500 mb-6">{steps[step].desc}</p>

                {/* Code input */}
                <div className="flex justify-center gap-2 mb-6">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      className="w-10 h-12 bg-[#0b1121] border border-white/[0.1] rounded-lg text-center text-lg font-bold text-white outline-none focus:border-primary transition-colors"
                    />
                  ))}
                </div>

                <button
                  onClick={() => { setStep(step + 1); setCode(["", "", "", "", "", ""]); }}
                  className="w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  Verify <ArrowRight className="w-4 h-4" />
                </button>
                <button className="mt-3 text-xs text-primary hover:underline">Resend Code</button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Fingerprint className="w-8 h-8 text-green-400" />
                </div>
                <h2 className="text-base font-bold mb-1">Verification Complete</h2>
                <p className="text-xs text-gray-500 mb-6">Your identity has been confirmed. Welcome to your portal.</p>
                <button
                  onClick={onComplete}
                  className="w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  Enter Portal <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </motion.div>
        </Card>

        <p className="text-center text-[10px] text-gray-600 mt-4">
          Protected by Kaldr Tech Security
        </p>
      </motion.div>
    </div>
  );
};

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

const ClientPortal = () => {
  const [verified, setVerified] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  const pages: Record<Page, React.ReactNode> = {
    profile: <ProfilePage />,
    dashboard: <DashboardPage />,
    academy: <AcademyPage />,
    community: <CommunityPage />,
    schedule: <SchedulePage />,
    resources: <ResourcesPage />,
    communications: <CommunicationsPage />,
    affiliate: <AffiliatePage />,
  };

  if (!verified) {
    return <VerificationFlow onComplete={() => setVerified(true)} />;
  }

  return (
    <PortalShell activePage={page} setPage={setPage}>
      {pages[page]}
    </PortalShell>
  );
};

export default ClientPortal;
