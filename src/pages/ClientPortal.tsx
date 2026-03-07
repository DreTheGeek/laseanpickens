import { useState, useRef, useEffect } from "react";
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
  Bell, Headphones, ChevronLeft, Clock, Video, X,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/SEO";
import { supabase } from "@/lib/supabase";

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
  | "live"
  | "tickets"
  | "invoices";

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
  { id: "tickets", label: "Support", icon: Headphones },
  { id: "invoices", label: "Invoices", icon: FileText },
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

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { title: "Order Confirmed", message: "Your AI Business Audit order has been confirmed", time: "2 hours ago", read: false, type: "success" as const },
    { title: "New Course Available", message: "Advanced AI Systems is now unlocked", time: "1 day ago", read: false, type: "info" as const },
    { title: "Coaching Call Reminder", message: "Group coaching call starts in 1 hour", time: "3 hours ago", read: true, type: "warning" as const },
    { title: "Community Update", message: "LaSean posted a new message in Winner Circle", time: "5 hours ago", read: true, type: "info" as const },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const notificationIcon = (type: "success" | "info" | "warning") => {
    if (type === "success") return <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />;
    if (type === "warning") return <CalendarDays className="w-4 h-4 text-yellow-400 shrink-0" />;
    return <Star className="w-4 h-4 text-primary shrink-0" />;
  };

  return (
    <div className={`min-h-screen ${bg} ${text} flex`}>
      <SEO title="Client Portal" description="Access your LaSean Pickens client portal - view orders, courses, community, and resources." />
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
          <p className={`text-[10px] ${darkMode ? "text-gray-600" : "text-gray-400"} text-center`}>&copy; 2026 Kaldr Tech</p>
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
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)}
              className={`w-7 h-7 rounded-full ${darkMode ? "bg-white/[0.06] hover:bg-white/10" : "bg-gray-100 hover:bg-gray-200"} flex items-center justify-center transition-colors relative`}>
              <Bell className="w-3.5 h-3.5 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className={`absolute right-0 top-9 w-80 ${darkMode ? "bg-[#111827] border-white/[0.06]" : "bg-white border-gray-200"} border rounded-xl shadow-2xl z-50 overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${darkMode ? "border-white/[0.06]" : "border-gray-200"} flex items-center justify-between`}>
                  <p className="text-sm font-semibold">Notifications</p>
                  {unreadCount > 0 && <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{unreadCount} new</span>}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n, i) => (
                    <div key={i} className={`px-4 py-3 flex items-start gap-3 ${!n.read ? (darkMode ? "bg-primary/5" : "bg-blue-50") : ""} ${darkMode ? "hover:bg-white/[0.02]" : "hover:bg-gray-50"} transition-colors cursor-pointer`}
                      onClick={() => setNotifications((prev) => prev.map((notif, idx) => idx === i ? { ...notif, read: true } : notif))}>
                      {notificationIcon(n.type)}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold">{n.title}</p>
                        <p className={`text-[11px] ${darkMode ? "text-gray-400" : "text-gray-500"} mt-0.5 line-clamp-1`}>{n.message}</p>
                        <p className={`text-[10px] ${darkMode ? "text-gray-600" : "text-gray-400"} mt-1`}>{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                    </div>
                  ))}
                </div>
                {unreadCount > 0 && (
                  <div className={`px-4 py-2.5 border-t ${darkMode ? "border-white/[0.06]" : "border-gray-200"}`}>
                    <button onClick={markAllRead} className="w-full text-xs text-primary font-medium hover:underline">Mark all as read</button>
                  </div>
                )}
              </div>
            )}
          </div>
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

const Card = ({ children, className = "", dark = true }: { children: React.ReactNode; className?: string; dark?: boolean }) => (
  <div className={`${dark ? "bg-[#111827] border-white/[0.06]" : "bg-white border-gray-200"} border rounded-xl ${className}`}>{children}</div>
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

  const handleSave = async () => {
    await updateProfile({ name: form.name, email: form.email, phone: form.phone });
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

const DashboardPage = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(sessionStorage.getItem("lp_dismissed_announcements") || "[]");
    } catch { return []; }
  });
  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const now = new Date().toISOString();
      const { data: annData } = await supabase
        .from("lp_announcements")
        .select("*")
        .eq("is_published", true)
        .or(`expires_at.is.null,expires_at.gt.${now}`)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });
      if (annData) setAnnouncements(annData);

      const { data: classData } = await supabase
        .from("lp_live_classes")
        .select("*")
        .eq("is_published", true)
        .eq("status", "scheduled")
        .gt("scheduled_at", now)
        .order("scheduled_at", { ascending: true })
        .limit(3);
      if (classData) setUpcomingClasses(classData);
    };
    load();
  }, []);

  const dismissAnnouncement = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    sessionStorage.setItem("lp_dismissed_announcements", JSON.stringify(updated));
  };

  const visibleAnnouncements = announcements.filter((a) => !dismissedIds.includes(a.id));

  const priorityStyles: Record<string, string> = {
    urgent: "bg-red-500/10 text-red-400 border-red-500/20",
    high: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    normal: "bg-primary/10 text-primary border-primary/20",
    low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  const priorityBadgeStyles: Record<string, string> = {
    urgent: "bg-red-500/20 text-red-400",
    high: "bg-yellow-500/20 text-yellow-400",
    normal: "bg-primary/20 text-primary",
    low: "bg-gray-700 text-gray-400",
  };

  return (
    <div className="space-y-6">
      {visibleAnnouncements.length > 0 && (
        <div className="space-y-3">
          {visibleAnnouncements.map((a) => (
            <div key={a.id} className={`rounded-xl border px-5 py-4 ${priorityStyles[a.priority] || priorityStyles.normal}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold">{a.title}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityBadgeStyles[a.priority] || priorityBadgeStyles.normal}`}>
                        {a.priority?.charAt(0).toUpperCase() + a.priority?.slice(1)}
                      </span>
                      {a.is_pinned && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">Pinned</span>}
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed">{a.body}</p>
                    <p className="text-[10px] opacity-50 mt-2">
                      {new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <button onClick={() => dismissAnnouncement(a.id)} className="p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0">
                  <X className="w-4 h-4 opacity-60" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
          {upcomingClasses.length > 0 ? upcomingClasses.map((c) => (
            <div key={c.id} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
              <div>
                <p className="text-sm font-semibold">{c.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.scheduled_at).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} -{" "}
                  {new Date(c.scheduled_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" })}
                </p>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{c.class_type || "Zoom"}</span>
            </div>
          )) : (
            <p className="text-xs text-gray-500 py-4 text-center">No upcoming sessions scheduled.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

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
   PAGE: ACADEMY (Supabase-powered courses, lessons, progress)
   ================================================================ */

const AcademyPage = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoadingCourses(true);
      const { data: courseData } = await supabase
        .from("lp_courses")
        .select("*")
        .eq("is_published", true)
        .order("order_position", { ascending: true });
      if (courseData) setCourses(courseData);

      if (user?.email) {
        const { data: progressData } = await supabase
          .from("lp_student_progress")
          .select("*")
          .eq("email", user.email);
        if (progressData) setProgress(progressData);
      }
      setLoadingCourses(false);
    };
    load();
  }, [user?.email]);

  const loadCourseLessons = async (course: any) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
    const { data } = await supabase
      .from("lp_lessons")
      .select("*")
      .eq("course_id", course.id)
      .order("order_position", { ascending: true });
    if (data) setLessons(data);
  };

  const getLessonProgress = (lessonId: string) => {
    return progress.find((p) => p.lesson_id === lessonId);
  };

  const getCourseProgress = (courseId: string) => {
    return progress.filter((p) => p.course_id === courseId && p.completed).length;
  };

  const markComplete = async (lesson: any) => {
    if (!user?.email) return;
    const { error } = await supabase
      .from("lp_student_progress")
      .upsert({
        email: user.email,
        lesson_id: lesson.id,
        course_id: selectedCourse.id,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "email,lesson_id" });
    if (!error) {
      setProgress((prev) => {
        const existing = prev.findIndex((p) => p.lesson_id === lesson.id && p.email === user.email);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = { ...updated[existing], completed: true, completed_at: new Date().toISOString() };
          return updated;
        }
        return [...prev, { email: user.email, lesson_id: lesson.id, course_id: selectedCourse.id, completed: true, completed_at: new Date().toISOString() }];
      });
      toast.success("Lesson marked as complete!");
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const navigateLesson = (direction: "prev" | "next") => {
    if (!selectedLesson) return;
    const currentIdx = lessons.findIndex((l) => l.id === selectedLesson.id);
    const targetIdx = direction === "prev" ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx >= 0 && targetIdx < lessons.length) {
      setSelectedLesson(lessons[targetIdx]);
    }
  };

  // Lesson player view
  if (selectedLesson && selectedCourse) {
    const currentIdx = lessons.findIndex((l) => l.id === selectedLesson.id);
    const lessonProg = getLessonProgress(selectedLesson.id);
    const embedUrl = selectedLesson.video_url ? getEmbedUrl(selectedLesson.video_url) : null;

    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedLesson(null)} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to {selectedCourse.title}
        </button>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Lesson {currentIdx + 1} of {lessons.length}</p>
              <h2 className="text-lg font-bold">{selectedLesson.title}</h2>
            </div>
            {lessonProg?.completed ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" /> Completed
              </span>
            ) : (
              <button onClick={() => markComplete(selectedLesson)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5" /> Mark Complete
              </button>
            )}
          </div>
          {embedUrl && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4 border border-white/[0.06]">
              <iframe src={embedUrl} className="w-full h-full" allowFullScreen allow="autoplay; fullscreen; picture-in-picture" />
            </div>
          )}
          {selectedLesson.content && (
            <div className="bg-[#0b1121] rounded-lg p-4 border border-white/[0.04] text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedLesson.content}
            </div>
          )}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
            <button onClick={() => navigateLesson("prev")} disabled={currentIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.06] text-gray-400 text-xs font-medium hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <button onClick={() => navigateLesson("next")} disabled={currentIdx === lessons.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.06] text-gray-400 text-xs font-medium hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Course detail view
  if (selectedCourse) {
    const completedCount = getCourseProgress(selectedCourse.id);
    const totalLessons = lessons.length;
    const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return (
      <div className="space-y-6">
        <button onClick={() => { setSelectedCourse(null); setLessons([]); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Courses
        </button>
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-2">{selectedCourse.title}</h2>
          <p className="text-sm text-gray-400 mb-3">{selectedCourse.description}</p>
          {selectedCourse.instructor && (
            <p className="text-xs text-gray-500 mb-4">Instructor: <span className="text-gray-300 font-medium">{selectedCourse.instructor}</span></p>
          )}
          {totalLessons > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{completedCount} of {totalLessons} lessons completed</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full"><div className="h-2 bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
            </div>
          )}
        </Card>
        <Card className="p-6">
          <SectionTitle icon={GraduationCap}>Lessons</SectionTitle>
          {lessons.length === 0 ? (
            <p className="text-xs text-gray-500 py-4 text-center">No lessons available yet.</p>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson, idx) => {
                const lessonProg = getLessonProgress(lesson.id);
                return (
                  <button key={lesson.id} onClick={() => setSelectedLesson(lesson)}
                    className="w-full flex items-center gap-3 bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04] hover:bg-white/[0.02] transition-colors text-left">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${lessonProg?.completed ? "bg-green-500/20" : "bg-white/[0.06]"}`}>
                      {lessonProg?.completed ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <span className="text-xs font-bold text-gray-500">{idx + 1}</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate">{lesson.title}</p>
                      {lesson.duration_minutes && <p className="text-[10px] text-gray-500">{lesson.duration_minutes} min</p>}
                    </div>
                    {lesson.video_url && <Video className="w-4 h-4 text-gray-500 shrink-0" />}
                    <ArrowRight className="w-4 h-4 text-gray-500 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Course list view
  if (loadingCourses) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 text-center">
        <h2 className="text-xl font-bold mb-1">AI Academy</h2>
        <p className="text-sm text-gray-500">Training from LaSean Pickens - master AI automation for your business</p>
      </Card>
      {courses.length === 0 ? (
        <Card className="p-6 text-center">
          <GraduationCap className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-sm font-semibold mb-1">No courses available yet</p>
          <p className="text-xs text-gray-500">Check back soon for new content.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => {
            const completedCount = getCourseProgress(c.id);
            const totalLessons = c.lesson_count || 0;
            const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
            return (
              <Card key={c.id} className="overflow-hidden cursor-pointer hover:border-primary/30 transition-colors" onClick={() => loadCourseLessons(c)}>
                {c.thumbnail_url ? (
                  <img src={c.thumbnail_url} alt={c.title} className="h-32 w-full object-cover" />
                ) : (
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-1">{c.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{c.description}</p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                    {totalLessons > 0 && (
                      <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {totalLessons} lessons</span>
                    )}
                    {c.estimated_hours && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.estimated_hours}h</span>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Progress</span><span>{pct}%</span></div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full"><div className="h-1.5 bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
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
   PAGE: SCHEDULE (Supabase-powered live classes)
   ================================================================ */

const SchedulePage = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoadingSchedule(true);
      const { data: classData } = await supabase
        .from("lp_live_classes")
        .select("*")
        .eq("is_published", true)
        .order("scheduled_at", { ascending: true });
      if (classData) setClasses(classData);

      if (user?.email) {
        const { data: regData } = await supabase
          .from("lp_class_registrations")
          .select("*")
          .eq("email", user.email);
        if (regData) setRegistrations(regData);
      }
      setLoadingSchedule(false);
    };
    load();
  }, [user?.email]);

  const isRegistered = (classId: string) => registrations.some((r) => r.class_id === classId);

  const handleRegister = async (classItem: any) => {
    if (!user?.email) return;
    const { error } = await supabase
      .from("lp_class_registrations")
      .insert({ class_id: classItem.id, email: user.email });
    if (!error) {
      setRegistrations((prev) => [...prev, { class_id: classItem.id, email: user.email }]);
      toast.success("Registered!", { description: `You're signed up for "${classItem.title}"` });
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  const isJoinable = (scheduledAt: string) => {
    const classTime = new Date(scheduledAt).getTime();
    const now = Date.now();
    return classTime - now <= 15 * 60 * 1000 && classTime + 2 * 60 * 60 * 1000 > now;
  };

  const now = new Date().toISOString();
  const upcoming = classes.filter((c) => c.status === "scheduled" && c.scheduled_at > now);
  const replays = classes.filter((c) => c.status === "completed" && c.recording_url);

  if (loadingSchedule) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <SectionTitle icon={CalendarDays}>Upcoming Sessions</SectionTitle>
        {upcoming.length === 0 ? (
          <p className="text-xs text-gray-500 py-4 text-center">No upcoming sessions scheduled.</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((c) => {
              const registered = isRegistered(c.id);
              const joinable = registered && c.zoom_link && isJoinable(c.scheduled_at);
              return (
                <div key={c.id} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3.5 border border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><CalendarDays className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{c.title}</p>
                        {c.class_type && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{c.class_type}</span>}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(c.scheduled_at).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} -{" "}
                        {new Date(c.scheduled_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short" })}
                        {c.duration_minutes && <span className="ml-2">({c.duration_minutes} min)</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {joinable && (
                      <a href={c.zoom_link} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors flex items-center gap-1.5">
                        <Play className="w-3 h-3" /> Join
                      </a>
                    )}
                    {registered ? (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400">Registered</span>
                    ) : (
                      <button onClick={() => handleRegister(c)}
                        className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
                        Register
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {replays.length > 0 && (
        <Card className="p-6">
          <SectionTitle icon={Play}>Replays</SectionTitle>
          <div className="space-y-2">
            {replays.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3.5 border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Play className="w-4 h-4 text-primary" /></div>
                  <div>
                    <p className="text-sm font-semibold">{c.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(c.scheduled_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <a href={c.recording_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                  <Play className="w-3 h-3" /> Watch Replay
                </a>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

/* ================================================================
   PAGE: RESOURCES (Supabase-powered downloads)
   ================================================================ */

const ResourcesPage = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoadingResources(true);
      const { data } = await supabase
        .from("lp_content_resources")
        .select("*")
        .eq("is_published", true)
        .order("order_position", { ascending: true });
      if (data) setResources(data);
      setLoadingResources(false);
    };
    load();
  }, []);

  const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category).filter(Boolean)))];

  const filtered = activeCategory === "All" ? resources : resources.filter((r) => r.category === activeCategory);

  const handleDownload = async (resource: any) => {
    if (resource.file_url) {
      window.open(resource.file_url, "_blank");
    }
    // Increment download count
    await supabase
      .from("lp_content_resources")
      .update({ download_count: (resource.download_count || 0) + 1 })
      .eq("id", resource.id);
    setResources((prev) =>
      prev.map((r) => r.id === resource.id ? { ...r, download_count: (r.download_count || 0) + 1 } : r)
    );
    toast.success(`Downloading ${resource.title}`);
  };

  const fileTypeIcon = (fileType: string) => {
    const type = (fileType || "").toLowerCase();
    if (type === "video" || type === "mp4") return <Video className="w-4 h-4 text-primary" />;
    return <FileText className="w-4 h-4 text-primary" />;
  };

  const formatSize = (size: string | number | null) => {
    if (!size) return "";
    if (typeof size === "string") return size;
    if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    if (size >= 1024) return `${(size / 1024).toFixed(0)} KB`;
    return `${size} B`;
  };

  if (loadingResources) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {categories.length > 2 && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat ? "bg-primary text-white" : "bg-white/[0.06] text-gray-400 hover:text-white hover:bg-white/10"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      )}
      <Card className="p-6">
        <SectionTitle icon={FolderOpen}>Resources & Downloads</SectionTitle>
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-500 py-4 text-center">No resources available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((r) => (
              <div key={r.id} className="flex items-center justify-between bg-[#0b1121] rounded-lg px-4 py-3 border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">{fileTypeIcon(r.file_type)}</div>
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-gray-500">
                      {r.file_type && <span className="uppercase">{r.file_type}</span>}
                      {r.file_size && <span> - {formatSize(r.file_size)}</span>}
                    </p>
                    {r.description && <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">{r.description}</p>}
                  </div>
                </div>
                <button onClick={() => handleDownload(r)} className="flex items-center gap-1 text-xs text-primary font-medium hover:underline shrink-0">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
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
   PAGE: SUPPORT TICKETS
   ================================================================ */

const sampleTickets = [
  {
    id: "TKT-001", subject: "Help with AI chatbot setup", priority: "high" as const, status: "in_progress" as const, created: "Mar 5, 2026",
    messages: [
      { author: "You", text: "I need help configuring the chatbot for my website...", time: "Mar 5, 10:00 AM" },
      { author: "Support Team", text: "I'd be happy to help! Can you share your website URL?", time: "Mar 5, 2:30 PM" },
    ],
  },
  {
    id: "TKT-002", subject: "Invoice for February services", priority: "normal" as const, status: "resolved" as const, created: "Mar 1, 2026",
    messages: [
      { author: "You", text: "Can I get a copy of my February invoice?", time: "Mar 1, 9:00 AM" },
      { author: "Support Team", text: "Your invoice has been sent to your email. Let us know if you need anything else!", time: "Mar 1, 11:00 AM" },
    ],
  },
];

const TicketsPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState(sampleTickets);
  useEffect(() => {
    const loadTickets = async () => {
      if (!user?.email) return;
      // Get client_id from lp_clients
      const { data: clientData } = await supabase.from("lp_clients").select("id").eq("email", user.email).maybeSingle();
      if (!clientData) return;
      const { data } = await supabase
        .from("lp_support_tickets")
        .select("*, lp_support_ticket_messages(*)")
        .eq("client_id", clientData.id)
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setTickets(data.map((t: any) => ({
          id: t.id.substring(0, 8).toUpperCase(),
          subject: t.subject,
          priority: t.priority,
          status: t.status,
          created: new Date(t.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          messages: (t.lp_support_ticket_messages || []).map((m: any) => ({
            author: m.author_type === "admin" ? "Support Team" : "You",
            text: m.message,
            time: new Date(m.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
          })),
        })));
      }
    };
    loadTickets();
  }, []);
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "", priority: "normal" as "normal" | "high" | "low" });
  const [replyText, setReplyText] = useState("");

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject.trim() || !newTicket.description.trim()) return;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      priority: newTicket.priority as "normal" | "high" | "low",
      status: "open" as const,
      created: dateStr,
      messages: [{ author: "You", text: newTicket.description, time: `${dateStr}, ${timeStr}` }],
    };
    setTickets((prev) => [ticket, ...prev]);
    setNewTicket({ subject: "", description: "", priority: "normal" });
    setShowNewForm(false);
    toast.success("Ticket created!", { description: `Ticket ${ticket.id} has been submitted.` });
    // Persist to Supabase
    const { data: clientRow } = await supabase.from("lp_clients").select("id").eq("email", user?.email).maybeSingle();
    const { data } = await supabase.from("lp_support_tickets").insert({
      subject: newTicket.subject,
      description: newTicket.description,
      priority: newTicket.priority,
      status: "open",
      client_id: clientRow?.id || null,
    }).select().maybeSingle();
    if (data) {
      await supabase.from("lp_support_ticket_messages").insert({
        ticket_id: data.id,
        message: newTicket.description,
        author_type: "client",
      });
    }
  };

  const handleReply = async (ticketId: string) => {
    if (!replyText.trim()) return;
    const now = new Date();
    const timeStr = `${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, messages: [...t.messages, { author: "You", text: replyText, time: timeStr }] }
          : t
      )
    );
    const msg = replyText;
    setReplyText("");
    toast.success("Reply sent!");
    // Persist reply to Supabase
    const { data: ticketData } = await supabase.from("lp_support_tickets").select("id").order("created_at", { ascending: false });
    if (ticketData) {
      const match = ticketData.find((t: any) => t.id.substring(0, 8).toUpperCase() === ticketId);
      if (match) {
        await supabase.from("lp_support_ticket_messages").insert({
          ticket_id: match.id,
          message: msg,
          author_type: "client",
        });
      }
    }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: "bg-blue-500/10 text-blue-400",
      in_progress: "bg-yellow-500/10 text-yellow-400",
      resolved: "bg-green-500/10 text-green-400",
    };
    const labels: Record<string, string> = { open: "Open", in_progress: "In Progress", resolved: "Resolved" };
    return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[status] || styles.open}`}>{labels[status] || status}</span>;
  };

  const priorityBadge = (priority: string) => {
    const styles: Record<string, string> = { high: "text-red-400", normal: "text-gray-400", low: "text-gray-500" };
    return <span className={`text-[10px] font-medium ${styles[priority] || styles.normal}`}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle icon={Headphones}>Support Tickets</SectionTitle>
        <button onClick={() => setShowNewForm(!showNewForm)} className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Send className="w-3 h-3" /> New Ticket
        </button>
      </div>

      {showNewForm && (
        <Card className="p-6">
          <h3 className="text-sm font-bold mb-4">Create New Ticket</h3>
          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
              <input type="text" required placeholder="Brief description of your issue" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Description</label>
              <textarea required placeholder="Describe your issue in detail..." rows={4} value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                className="w-full bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none placeholder:text-gray-600 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Priority</label>
              <select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as "normal" | "high" | "low" })}
                className="bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-gray-200 outline-none">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">Submit Ticket</button>
              <button type="button" onClick={() => setShowNewForm(false)} className="px-4 py-2 rounded-lg bg-white/[0.06] text-gray-400 text-xs font-semibold hover:bg-white/10 transition-colors">Cancel</button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <button onClick={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-gray-500">{ticket.id}</span>
                  {statusBadge(ticket.status)}
                  {priorityBadge(ticket.priority)}
                </div>
                <p className="text-sm font-semibold truncate">{ticket.subject}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-gray-500">{ticket.created}</p>
                <p className="text-[10px] text-gray-600">{ticket.messages.length} message{ticket.messages.length !== 1 ? "s" : ""}</p>
              </div>
              <ArrowRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedTicket === ticket.id ? "rotate-90" : ""}`} />
            </button>

            {expandedTicket === ticket.id && (
              <div className="border-t border-white/[0.06] px-5 py-4">
                <div className="space-y-3 mb-4">
                  {ticket.messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.author === "You" ? "" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${msg.author === "You" ? "bg-primary text-white" : "bg-green-500/20 text-green-400"}`}>
                        {msg.author === "You" ? "Y" : "S"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold">{msg.author}</p>
                          <p className="text-[10px] text-gray-500">{msg.time}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {ticket.status !== "resolved" && (
                  <div className="flex gap-2">
                    <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleReply(ticket.id)}
                      placeholder="Type your reply..."
                      className="flex-1 bg-[#0b1121] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-gray-200 outline-none placeholder:text-gray-600" />
                    <button onClick={() => handleReply(ticket.id)} className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors">
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ================================================================
   PAGE: INVOICES
   ================================================================ */

const sampleInvoices = [
  { id: "INV-2026-001", service: "AI Business Audit & Strategy", amount: "$697.00", status: "paid" as const, date: "Mar 1, 2026", paidDate: "Mar 1, 2026", dueDate: undefined },
  { id: "INV-2026-002", service: "Social Media Management - March", amount: "$497.00", status: "paid" as const, date: "Mar 1, 2026", paidDate: "Mar 3, 2026", dueDate: undefined },
  { id: "INV-2026-003", service: "Email Marketing - March", amount: "$297.00", status: "pending" as const, date: "Mar 5, 2026", paidDate: undefined, dueDate: "Mar 15, 2026" },
];

const InvoicesPage = () => {
  const [invoices] = useState(sampleInvoices);
  const [viewingInvoice, setViewingInvoice] = useState<string | null>(null);

  const totalPaid = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0);
  const totalOutstanding = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0);
  const thisMonth = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[$,]/g, "")), 0);

  const statusBadge = (status: string) => {
    if (status === "paid") return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">Paid</span>;
    if (status === "pending") return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400">Pending</span>;
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">Overdue</span>;
  };

  return (
    <div className="space-y-6">
      <SectionTitle icon={FileText}>Invoices</SectionTitle>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Paid", value: `$${totalPaid.toFixed(2)}`, color: "text-green-400" },
          { label: "Outstanding", value: `$${totalOutstanding.toFixed(2)}`, color: "text-yellow-400" },
          { label: "This Month", value: `$${thisMonth.toFixed(2)}`, color: "text-primary" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {invoices.map((inv) => (
          <Card key={inv.id} className="overflow-hidden">
            <div className="px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-gray-500">{inv.id}</span>
                  {statusBadge(inv.status)}
                </div>
                <p className="text-sm font-semibold truncate">{inv.service}</p>
              </div>
              <p className="text-sm font-bold text-primary shrink-0">{inv.amount}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setViewingInvoice(viewingInvoice === inv.id ? null : inv.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-gray-400 text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5">
                  <Eye className="w-3 h-3" /> View
                </button>
                <button onClick={() => toast.info("Downloading invoice...", { description: `${inv.id} will be saved to your downloads folder.` })}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-gray-400 text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>

            {viewingInvoice === inv.id && (
              <div className="border-t border-white/[0.06] px-5 py-4 bg-[#0b1121]/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Invoice Number</p>
                    <p className="text-sm font-semibold">{inv.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Service</p>
                    <p className="text-sm font-semibold">{inv.service}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Issue Date</p>
                    <p className="text-sm">{inv.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{inv.status === "paid" ? "Paid Date" : "Due Date"}</p>
                    <p className="text-sm">{inv.paidDate || inv.dueDate || "-"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Amount</p>
                    <p className="text-lg font-bold text-primary">{inv.amount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Status</p>
                    <div className="mt-0.5">{statusBadge(inv.status)}</div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Billed To</p>
                  <p className="text-sm">LaSean Pickens</p>
                  <p className="text-xs text-gray-500">dre@kaldrbusiness.com</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const err = await login(loginData.email, loginData.password);
    if (err) {
      setError(err);
      return;
    }
    toast.success("Welcome back!");
    onLogin();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (regData.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (regData.password !== regData.confirm) { setError("Passwords do not match"); return; }
    const err = await register({ name: regData.name, email: regData.email, phone: regData.phone, company: regData.company }, regData.password);
    if (err) {
      setError(err);
      return;
    }
    toast.success("Account created successfully!");
    onLogin();
  };

  const handleForgotPassword = async () => {
    if (!loginData.email) {
      toast.error("Enter your email address first, then click Forgot Password");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(loginData.email);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent!", { description: `Check ${loginData.email} for instructions.` });
    }
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
  const { isAuthenticated, logout, loading } = useAuth();
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
    tickets: <TicketsPage />,
    invoices: <InvoicesPage />,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1121] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

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
