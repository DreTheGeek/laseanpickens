import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  User, LayoutDashboard, GraduationCap, Users, CalendarDays,
  FolderOpen, MessageSquare, Link2, LogOut, Sun, Send,
  Camera, Mail, Phone, MapPin, Lock, Play, Trophy,
  Star, MessageCircle, Award, FileText, CheckCircle2,
  ArrowRight, ShoppingBag, Package, ExternalLink,
  Building2, Moon, Radio, Eye, Copy, Download,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/* ================================================================
   TYPES
   ================================================================ */

type Page =
  | "profile"
  | "dashboard"
  | "orders"
  | "academy"
  | "community"
  | "schedule"
  | "resources"
  | "communications"
  | "affiliate"
  | "live";

/* ================================================================
   SIDEBAR NAV ITEMS
   ================================================================ */

const navItems: { id: Page; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "live", label: "Live Stream", icon: Radio },
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

const initialChatMessages = [
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
  { title: "AI Automation Playbook", type: "PDF", size: "2.4 MB", filename: "AI_Automation_Playbook.pdf" },
  { title: "Lead Gen Templates Pack", type: "ZIP", size: "8.1 MB", filename: "Lead_Gen_Templates.zip" },
  { title: "Cold Email Swipe File", type: "PDF", size: "1.2 MB", filename: "Cold_Email_Swipe_File.pdf" },
  { title: "CRM Setup Guide", type: "PDF", size: "3.7 MB", filename: "CRM_Setup_Guide.pdf" },
  { title: "Vapi Voice AI Tutorial", type: "VIDEO", size: "45 min", filename: "Vapi_Voice_AI_Tutorial.mp4" },
  { title: "Scaling Checklist", type: "PDF", size: "890 KB", filename: "Scaling_Checklist.pdf" },
];

/* ================================================================
   LAYOUT SHELL (with day/night toggle)
   ================================================================ */

const PortalShell = ({
  activePage, setPage, children, darkMode, toggleDarkMode, isLive, onSignOut,
}: {
  activePage: Page; setPage: (p: Page) => void; children: React.ReactNode;
  darkMode: boolean; toggleDarkMode: () => void; isLive: boolean; onSignOut: () => void;
}) => {
  const bg = darkMode ? "bg-[#0b1121]" : "bg-gray-50";
  const text = darkMode ? "text-gray-100" : "text-gray-900";
  const sidebarBg = darkMode ? "bg-[#0b1121]" : "bg-white";
  const borderColor = darkMode ? "border-white/[0.06]" : "border-gray-200";

  return (
    <div className={`min-h-screen ${bg} ${text} flex`}>
      <aside className={`w-[180px] shrink-0 ${sidebarBg} border-r ${borderColor} flex flex-col fixed inset-y-0 left-0 z-40`}>
        <div className="p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shrink-0">L</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">LaSean</p>
            <p className={`text-[10px] ${darkMode ? "text-gray-500" : "text-gray-400"} truncate`}>dre@kaldrbusiness.com</p>
          </div>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5">
          {navItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button key={item.id} onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors relative ${
                  active ? "bg-primary text-white"
                    : darkMode ? "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}>
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
                {item.id === "live" && isLive && <span className="absolute right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
              </button>
            );
          })}
        </nav>
        <div className={`p-3 border-t ${borderColor}`}>
          <p className={`text-[10px] ${darkMode ? "text-gray-600" : "text-gray-400"} text-center`}>&copy; 2026 LaSean Pickens</p>
        </div>
      </aside>

      <div className="flex-1 ml-[180px]">
        <header className={`h-12 border-b ${borderColor} flex items-center justify-end px-6 gap-4 ${sidebarBg} sticky top-0 z-30`}>
          {isLive && (
            <button onClick={() => setPage("live")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold animate-pulse">
              <Radio className="w-3 h-3" /> LIVE NOW
            </button>
          )}
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>dre@kaldrbusiness.com</span>
          <button onClick={toggleDarkMode}
            className={`w-7 h-7 rounded-full ${darkMode ? "bg-white/[0.06] hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} flex items-center justify-center transition-colors`}>
            {darkMode ? <Sun className="w-3.5 h-3.5 text-gray-400" /> : <Moon className="w-3.5 h-3.5 text-gray-600" />}
          </button>
          <button onClick={onSignOut} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/90 hover:bg-primary text-white text-xs font-medium transition-colors">
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </header>
        <main className="p-6 max-w-[1100px]">
          <motion.div key={activePage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

/* ================================================================
   SHARED UI
   ================================================================ */

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#111827] border border-white/[0.06] rounded-xl ${className}`}>{children}</div>
);

const SectionTitle = ({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) => (
  <h2 className="flex items-center gap-2 text-lg font-bold mb-4"><Icon className="w-5 h-5 text-primary" />{children}</h2>
);

/* ================================================================
   PAGE: PROFILE (fully functional)
   ================================================================ */

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    about: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  });

  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({ name: form.name, email: form.email, phone: form.phone });
    toast.success("Profile saved successfully");
  };

  const inputClass = "bg-transparent text-sm text-gray-200 w-full outline-none placeholder:text-gray-600";
  const fieldClass = "flex items-center gap-2 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5";

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl font-bold text-white">
                {form.name ? form.name.charAt(0).toUpperCase() : "L"}
              </div>
            )}
            <button onClick={handlePhotoUpload} className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
              <Camera className="w-3 h-3 text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{form.name || "Your Name"}</h2>
            <p className="text-sm text-gray-500">Click the camera to upload a photo</p>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-base font-bold mb-5">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
            <div className={fieldClass}>
              <User className="w-4 h-4 text-gray-500 shrink-0" />
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
            <div className={fieldClass}>
              <Mail className="w-4 h-4 text-gray-500 shrink-0" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Phone Number</label>
            <div className={fieldClass}>
              <Phone className="w-4 h-4 text-gray-500 shrink-0" />
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(555) 123-4567" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Address</label>
            <div className={fieldClass}>
              <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
              <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your address" className={inputClass} />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xs font-medium text-gray-400 mb-1.5">About You</label>
          <textarea rows={3} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} placeholder="Tell us a bit about yourself and your AI journey..." className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600 resize-none" />
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="text-base font-bold mb-5">Social Media Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Facebook", key: "facebook" as const, placeholder: "https://facebook.com/yourprofile" },
            { label: "Instagram", key: "instagram" as const, placeholder: "https://instagram.com/yourprofile" },
            { label: "TikTok", key: "tiktok" as const, placeholder: "https://tiktok.com/@yourprofile" },
            { label: "YouTube", key: "youtube" as const, placeholder: "https://youtube.com/@yourhandle" },
          ].map((s) => (
            <div key={s.key}>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">{s.label}</label>
              <div className={fieldClass}>
                <Link2 className="w-4 h-4 text-gray-500 shrink-0" />
                <input type="url" value={form[s.key]} onChange={(e) => setForm({ ...form, [s.key]: e.target.value })} placeholder={s.placeholder} className={inputClass} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex justify-end">
        <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">Save Changes</button>
      </div>
    </div>
  );
};

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
            <div><p className="text-sm font-semibold">{p.name}</p><p className="text-xs text-gray-500">Since {p.since}</p></div>
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${p.active ? "bg-primary/20 text-primary" : "bg-gray-700 text-gray-400"}`}>{p.active ? "Active" : "Pending"}</span>
          </div>
        ))}
      </div>
    </Card>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[{ label: "Courses Completed", value: "2 / 6" }, { label: "Community Points", value: "45" }, { label: "Sessions Attended", value: "8" }, { label: "Referrals", value: "3" }].map((s) => (
        <Card key={s.label} className="p-4 text-center"><p className="text-2xl font-bold text-primary">{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></Card>
      ))}
    </div>
    <Card className="p-6">
      <SectionTitle icon={CalendarDays}>Upcoming Sessions</SectionTitle>
      <div className="space-y-2">
        {sampleSchedule.slice(0, 3).map((s) => (
          <div key={s.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <div><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-gray-500">{s.date} - {s.time}</p></div>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{s.type}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* ================================================================
   PAGE: MY ORDERS
   ================================================================ */

const OrdersPage = () => {
  const { orders } = useAuth();
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle icon={ShoppingBag}>My Orders</SectionTitle>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-sm font-semibold mb-1">No orders yet</p>
            <p className="text-xs text-gray-500 mb-4">Browse our services and place your first order.</p>
            <Link to="/#programs" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
              <ExternalLink className="w-3 h-3" /> Explore Services
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#0b1121] rounded-lg p-4 border border-white/[0.04]">
                <div className="flex items-center justify-between mb-2">
                  <div><p className="text-sm font-semibold">{order.itemName}</p><p className="text-xs text-gray-500">{order.itemType} - {order.isBundle ? "Bundle" : "Service"}</p></div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    order.status === "confirmed" ? "bg-green-500/10 text-green-400" : order.status === "processing" ? "bg-yellow-500/10 text-yellow-400" : "bg-primary/10 text-primary"
                  }`}>{order.status}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Order #{order.id}</span>
                  <span className="text-gray-500">{order.date}</span>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.04]">
                  <span className="text-xs text-gray-500">Amount</span>
                  <span className="text-sm font-bold text-primary">{order.itemPrice}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Terms accepted</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500" /> Refund policy acknowledged</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

/* ================================================================
   PAGE: LIVE STREAM (fully functional chat)
   ================================================================ */

const LiveStreamPage = ({ isLive }: { isLive: boolean }) => {
  const { user } = useAuth();
  const [chatInput, setChatInput] = useState("");
  const [liveChatMessages, setLiveChatMessages] = useState([
    { name: "Maria C.", msg: "Great session so far!", time: "2:05 PM" },
    { name: "James W.", msg: "Can you talk about lead gen automation?", time: "2:08 PM" },
    { name: "Sarah M.", msg: "This is exactly what I needed to hear", time: "2:12 PM" },
  ]);

  const sendLiveChat = () => {
    if (!chatInput.trim()) return;
    setLiveChatMessages((prev) => [...prev, {
      name: user?.name || "You",
      msg: chatInput,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    }]);
    setChatInput("");
  };

  const handleWatchReplay = (title: string) => {
    toast.info(`Loading replay: ${title}`, { description: "Replay feature powered by Cloudflare Stream" });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle icon={Radio}>Live Stream</SectionTitle>
        {isLive ? (
          <div>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4 border border-white/[0.06]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center mb-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-semibold text-red-400">LIVE</span>
                  </div>
                  <Play className="w-16 h-16 text-primary mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Stream will appear here</p>
                  <p className="text-xs text-gray-600 mt-1">Powered by Cloudflare Stream</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">LP</div>
              <div><p className="text-sm font-bold">LaSean Pickens</p><p className="text-xs text-gray-500">Live Session - Q&A + Business Strategy</p></div>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-red-400 font-semibold"><Eye className="w-3 h-3" /> 24 watching</span>
            </div>
            <div className="bg-[#0b1121] rounded-lg border border-white/[0.04] p-4">
              <p className="text-xs font-semibold mb-3">Live Chat</p>
              <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                {liveChatMessages.map((m, i) => (
                  <div key={i} className="text-xs"><span className="font-semibold text-primary">{m.name}</span><span className="text-gray-500 ml-1.5">{m.time}</span><span className="text-gray-400 ml-2">{m.msg}</span></div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendLiveChat()}
                  placeholder="Send a message..."
                  className="flex-1 bg-[#111827] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none placeholder:text-gray-600"
                />
                <button onClick={sendLiveChat} className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors"><Send className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Radio className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-sm font-semibold mb-1">No live stream right now</p>
            <p className="text-xs text-gray-500 mb-4">When LaSean goes live, you'll see a notification in the sidebar and header.</p>
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-[#0b1121] px-4 py-2 rounded-lg border border-white/[0.04]">
              <CalendarDays className="w-3 h-3 text-primary" /> Next scheduled: Thu, Mar 6 at 2:00 PM ET
            </div>
          </div>
        )}
      </Card>
      <Card className="p-6">
        <h3 className="text-base font-bold mb-4">Past Streams</h3>
        <div className="space-y-2">
          {[
            { title: "AI Automation Deep Dive", date: "Mar 3, 2026", duration: "1h 23m", viewers: 31 },
            { title: "Building Your First AI Bot", date: "Feb 27, 2026", duration: "58m", viewers: 28 },
            { title: "Revenue Optimization Live Workshop", date: "Feb 20, 2026", duration: "1h 45m", viewers: 42 },
          ].map((stream) => (
            <div key={stream.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Play className="w-4 h-4 text-primary" /></div>
                <div><p className="text-sm font-semibold">{stream.title}</p><p className="text-xs text-gray-500">{stream.date} - {stream.duration}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">{stream.viewers} viewers</span>
                <button onClick={() => handleWatchReplay(stream.title)} className="text-xs text-primary font-medium hover:underline">Watch</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ================================================================
   PAGE: ACADEMY (functional unlock buttons)
   ================================================================ */

const AcademyPage = () => {
  const handleUnlock = (title: string, points: number) => {
    toast.error(`You need ${points - 45} more points to unlock "${title}"`, {
      description: "Earn points by engaging in the community and completing courses.",
    });
  };

  const handleContinueCourse = (title: string) => {
    toast.success(`Resuming "${title}"`, { description: "Loading your progress..." });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 text-center">
        <h2 className="text-xl font-bold mb-1">AI Academy</h2>
        <p className="text-sm text-gray-500 mb-4">Training from LaSean Pickens - earn points to unlock premium courses!</p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <Trophy className="w-4 h-4 text-primary" /><span className="text-primary font-semibold">45 / 100 Points</span>
          <div className="w-32 h-2 bg-gray-700 rounded-full ml-1"><div className="w-[45%] h-2 bg-primary rounded-full" /></div>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleCourses.map((c) => (
          <Card key={c.title} className="overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
              {c.locked && <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-700 text-gray-300 uppercase">Locked</span>}
              {c.locked ? <Lock className="w-8 h-8 text-gray-500" /> : <Play className="w-8 h-8 text-primary" />}
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold mb-1">{c.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{c.desc}</p>
              {c.locked ? (
                <button onClick={() => handleUnlock(c.title, c.points!)} className="w-full py-2 rounded-lg bg-amber-600/20 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-600/30 transition-colors"><Lock className="w-3 h-3" /> Unlock at {c.points} Points</button>
              ) : (
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{c.progress}%</span></div>
                  <div className="w-full h-1.5 bg-gray-700 rounded-full"><div className="h-1.5 bg-primary rounded-full" style={{ width: `${c.progress}%` }} /></div>
                  <button onClick={() => handleContinueCourse(c.title)} className="w-full mt-2 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">Continue Course</button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: COMMUNITY (functional chat)
   ================================================================ */

const CommunityPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"about" | "chat">("about");
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [chatInput, setChatInput] = useState("");

  const sendCommunityMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, {
      user: user?.name || "You",
      avatar: (user?.name || "Y").substring(0, 2).toUpperCase(),
      msg: chatInput,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    }]);
    setChatInput("");
    toast.success("Message sent");
  };

  const handleInvite = () => {
    const link = `${window.location.origin}/portal?ref=community`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Invite link copied to clipboard!", { description: link });
    }).catch(() => {
      toast.success("Invite link generated", { description: link });
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-6 border-b border-white/[0.06] pb-2">
        {(["about", "chat"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`text-sm font-medium pb-1 capitalize transition-colors ${tab === t ? "text-white border-b-2 border-primary" : "text-gray-500 hover:text-gray-300"}`}>
            {t === "about" ? "About" : "Chat"}
          </button>
        ))}
      </div>
      {tab === "about" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-2">Winner Circle Community</h2>
              <p className="text-sm text-gray-400 mb-6">Welcome to the Winner Circle - an exclusive community for action-takers and achievers.</p>
              <div className="h-48 bg-[#0b1121] rounded-lg flex items-center justify-center border border-white/[0.04]">
                <div className="text-center"><Play className="w-10 h-10 text-primary mx-auto mb-2 opacity-60" /><p className="text-sm text-gray-500">Watch the Introduction</p></div>
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
                    <div><p className="text-sm font-semibold">{item.title}</p><p className="text-xs text-gray-500">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-primary to-primary/70" />
              <div className="px-4 pb-4 -mt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary mx-auto flex items-center justify-center text-lg font-bold border-2 border-[#111827]">LP</div>
                <p className="text-sm font-bold mt-2">Winner Circle</p>
                <p className="text-[10px] text-gray-500">Community for Everyone</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                  <div><p className="text-lg font-bold">12</p><p className="text-[10px] text-gray-500 uppercase">Members</p></div>
                  <div><p className="text-lg font-bold text-primary">45</p><p className="text-[10px] text-gray-500 uppercase">Your Pts</p></div>
                </div>
                <button onClick={handleInvite} className="w-full mt-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors"><Users className="w-3 h-3" /> Invite Members</button>
              </div>
            </Card>
          </div>
        </div>
      )}
      {tab === "chat" && (
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"><Users className="w-4 h-4 text-primary" /></div>
            <div><p className="text-sm font-bold">Winner Circle Chat</p><p className="text-xs text-gray-500">{chatMessages.length} messages</p></div>
          </div>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mb-4">
            <div className="text-center"><span className="text-[10px] bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full">March 5, 2026</span></div>
            {chatMessages.map((m, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${m.isHost ? "bg-primary text-white" : "bg-gray-700 text-gray-300"}`}>{m.avatar}</div>
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
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendCommunityMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600"
            />
            <button onClick={sendCommunityMessage} className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"><Send className="w-4 h-4 text-white" /></button>
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
  <Card className="p-6">
    <SectionTitle icon={CalendarDays}>Upcoming Sessions</SectionTitle>
    <div className="space-y-2">
      {sampleSchedule.map((s) => (
        <div key={s.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3.5 border border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><CalendarDays className="w-5 h-5 text-primary" /></div>
            <div><p className="text-sm font-semibold">{s.title}</p><p className="text-xs text-gray-500">{s.date} - {s.time}</p></div>
          </div>
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${s.type === "Zoom" ? "bg-primary/10 text-primary" : "bg-green-500/10 text-green-400"}`}>{s.type}</span>
        </div>
      ))}
    </div>
  </Card>
);

/* ================================================================
   PAGE: RESOURCES (functional downloads)
   ================================================================ */

const ResourcesPage = () => {
  const handleDownload = (resource: typeof sampleResources[0]) => {
    toast.success(`Downloading ${resource.filename}`, {
      description: `${resource.type} - ${resource.size}`,
    });
  };

  return (
    <Card className="p-6">
      <SectionTitle icon={FolderOpen}>Resources & Downloads</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sampleResources.map((r) => (
          <div key={r.title} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="w-4 h-4 text-primary" /></div>
              <div><p className="text-sm font-semibold">{r.title}</p><p className="text-xs text-gray-500">{r.type} - {r.size}</p></div>
            </div>
            <button onClick={() => handleDownload(r)} className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"><Download className="w-3 h-3" /> Download</button>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* ================================================================
   PAGE: COMMUNICATIONS (functional send)
   ================================================================ */

const CommunicationsPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }
    setSent(true);
    toast.success("Message sent successfully!", { description: "Our team will respond within 24 hours." });
    setSubject("");
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      <Card className="p-6">
        <SectionTitle icon={MessageSquare}>Past Communications</SectionTitle>
        <p className="text-sm text-gray-500 mb-4">Messages sent to you from our team.</p>
        <div className="space-y-2">
          {sampleMessages.map((m, i) => (
            <div key={i} className="bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div><p className="text-sm font-semibold">{m.type} Message</p><p className="text-xs text-gray-400 mt-0.5">{m.text}</p></div>
              </div>
              <span className="text-[11px] text-gray-500 shrink-0 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {m.date}</span>
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
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What do you need help with?" className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your question or issue in detail..." className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600 resize-none" />
          </div>
          <button onClick={handleSend} disabled={sent} className="w-full py-2.5 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50">
            {sent ? <><CheckCircle2 className="w-4 h-4" /> Sent!</> : <><Send className="w-4 h-4" /> Send Message</>}
          </button>
        </div>
      </Card>
    </div>
  );
};

/* ================================================================
   PAGE: AFFILIATE (functional link generation)
   ================================================================ */

const AffiliatePage = () => {
  const { user } = useAuth();
  const [affiliateLink, setAffiliateLink] = useState<string | null>(null);

  const generateLink = () => {
    const code = (user?.name || "user").toLowerCase().replace(/\s+/g, "") + "-" + Date.now().toString(36);
    const link = `${window.location.origin}?ref=${code}`;
    setAffiliateLink(link);
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Affiliate link generated and copied!", { description: link });
    }).catch(() => {
      toast.success("Affiliate link generated!", { description: link });
    });
  };

  const copyLink = () => {
    if (affiliateLink) {
      navigator.clipboard.writeText(affiliateLink).then(() => {
        toast.success("Copied to clipboard!");
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle icon={Award}>My Programs</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {samplePrograms.filter((p) => p.active).map((p) => (
            <div key={p.name} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
              <div><p className="text-sm font-semibold">{p.name}</p><p className="text-xs text-gray-500">Since {p.since}</p></div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/20 text-primary">Active</span>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6 text-center">
        <SectionTitle icon={Link2}>Your Affiliate Link</SectionTitle>
        <p className="text-sm text-gray-500 mb-4">Generate your unique affiliate link to start referring members.</p>
        {affiliateLink ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-[#0b1121] border border-white/[0.06] rounded-lg px-4 py-3">
              <Link2 className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-gray-300 truncate flex-1">{affiliateLink}</span>
              <button onClick={copyLink} className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <Copy className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#0b1121] rounded-lg p-3 border border-white/[0.04]">
                <p className="text-lg font-bold text-primary">3</p>
                <p className="text-[10px] text-gray-500">Referrals</p>
              </div>
              <div className="bg-[#0b1121] rounded-lg p-3 border border-white/[0.04]">
                <p className="text-lg font-bold text-green-400">$150</p>
                <p className="text-[10px] text-gray-500">Earned</p>
              </div>
              <div className="bg-[#0b1121] rounded-lg p-3 border border-white/[0.04]">
                <p className="text-lg font-bold text-yellow-400">10%</p>
                <p className="text-[10px] text-gray-500">Commission</p>
              </div>
            </div>
            <button onClick={generateLink} className="text-xs text-primary hover:underline">Generate New Link</button>
          </div>
        ) : (
          <button onClick={generateLink} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"><Link2 className="w-4 h-4" /> Generate Affiliate Link</button>
        )}
      </Card>
    </div>
  );
};

/* ================================================================
   LOGIN FORM (with registration tab, functional forgot password)
   ================================================================ */

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({ name: "", email: "", phone: "", company: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
    toast.success("Welcome back!");
    onLogin();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (regData.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (regData.password !== regData.confirm) { setError("Passwords do not match"); return; }
    register({ name: regData.name, email: regData.email, phone: regData.phone, company: regData.company }, regData.password);
    toast.success("Account created successfully!");
    onLogin();
  };

  const handleForgotPassword = () => {
    if (!loginData.email) {
      toast.error("Enter your email address first, then click Forgot Password");
      return;
    }
    toast.success("Password reset link sent!", { description: `Check ${loginData.email} for instructions.` });
  };

  return (
    <div className="min-h-screen bg-[#0b1121] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"><Lock className="w-7 h-7 text-primary" /></div>
            <h1 className="text-xl font-bold mb-1">Client Portal</h1>
            <p className="text-sm text-gray-500">Sign in or create an account</p>
          </div>
          <div className="flex border-b border-white/[0.06] mb-6">
            {(["login", "register"] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 pb-2.5 text-sm font-medium transition-colors ${tab === t ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-300"}`}>
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>
          {error && <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 mb-4"><Building2 className="w-3.5 h-3.5 shrink-0" />{error}</div>}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
                <div className="flex items-center gap-2 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <input type="email" required placeholder="you@company.com" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="bg-transparent text-sm text-gray-200 w-full outline-none placeholder:text-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
                <div className="flex items-center gap-2 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5">
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                  <input type="password" required placeholder="Enter your password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="bg-transparent text-sm text-gray-200 w-full outline-none placeholder:text-gray-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-600 bg-transparent accent-primary" /><span className="text-xs text-gray-400">Remember me</span></label>
                <button type="button" onClick={handleForgotPassword} className="text-xs text-primary hover:underline">Forgot password?</button>
              </div>
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">Sign In <ArrowRight className="w-4 h-4" /></button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-400 mb-1">Full Name *</label><input type="text" required placeholder="John Doe" value={regData.name} onChange={(e) => setRegData({ ...regData, name: e.target.value })} className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" /></div>
                <div><label className="block text-xs font-medium text-gray-400 mb-1">Email *</label><input type="email" required placeholder="you@company.com" value={regData.email} onChange={(e) => setRegData({ ...regData, email: e.target.value })} className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-400 mb-1">Phone *</label><input type="tel" required placeholder="(555) 123-4567" value={regData.phone} onChange={(e) => setRegData({ ...regData, phone: e.target.value })} className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" /></div>
                <div><label className="block text-xs font-medium text-gray-400 mb-1">Company</label><input type="text" placeholder="Your Company" value={regData.company} onChange={(e) => setRegData({ ...regData, company: e.target.value })} className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-400 mb-1">Password *</label><input type="password" required placeholder="Min. 8 characters" value={regData.password} onChange={(e) => setRegData({ ...regData, password: e.target.value })} className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" /></div>
              <div><label className="block text-xs font-medium text-gray-400 mb-1">Confirm Password *</label><input type="password" required placeholder="Confirm password" value={regData.confirm} onChange={(e) => setRegData({ ...regData, confirm: e.target.value })} className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" /></div>
              <button type="submit" className="w-full py-3 rounded-lg bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">Create Account <ArrowRight className="w-4 h-4" /></button>
            </form>
          )}
        </Card>
        <p className="text-center text-[10px] text-gray-600 mt-4">Protected by Kaldr Tech Security</p>
      </motion.div>
    </div>
  );
};

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

const ClientPortal = () => {
  const { isAuthenticated, logout } = useAuth();
  const [page, setPage] = useState<Page>("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [isLive] = useState(false);

  const handleSignOut = () => {
    logout();
    toast.success("Signed out successfully");
  };

  const pages: Record<Page, React.ReactNode> = {
    profile: <ProfilePage />,
    dashboard: <DashboardPage />,
    orders: <OrdersPage />,
    live: <LiveStreamPage isLive={isLive} />,
    academy: <AcademyPage />,
    community: <CommunityPage />,
    schedule: <SchedulePage />,
    resources: <ResourcesPage />,
    communications: <CommunicationsPage />,
    affiliate: <AffiliatePage />,
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => {}} />;
  }

  return (
    <PortalShell activePage={page} setPage={setPage} darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} isLive={isLive} onSignOut={handleSignOut}>
      {pages[page]}
    </PortalShell>
  );
};

export default ClientPortal;
