import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  CalendarDays,
  Video,
  Clock,
  Users,
  Plus,
  Edit3,
  Trash2,
  Link2,
  Copy,
  Play,
  XCircle,
} from "lucide-react";

interface LiveClassesPageProps {
  darkMode: boolean;
}

interface LiveClass {
  id: string;
  title: string;
  description: string;
  class_type: string;
  scheduled_at: string;
  duration_minutes: number;
  zoom_link: string;
  meeting_id: string;
  meeting_password: string;
  tier_slug: string;
  max_attendees: number;
  status: string;
  recording_url: string;
  is_recurring: boolean;
  recurrence_rule: string;
  created_at: string;
  registration_count?: number;
}

interface ClassForm {
  title: string;
  description: string;
  class_type: string;
  scheduled_at: string;
  duration_minutes: number;
  zoom_link: string;
  meeting_id: string;
  meeting_password: string;
  tier_slug: string;
  max_attendees: number;
  is_recurring: boolean;
  recurrence_rule: string;
  recording_url: string;
}

const emptyForm: ClassForm = {
  title: "",
  description: "",
  class_type: "webinar",
  scheduled_at: "",
  duration_minutes: 60,
  zoom_link: "",
  meeting_id: "",
  meeting_password: "",
  tier_slug: "",
  max_attendees: 100,
  is_recurring: false,
  recurrence_rule: "weekly",
  recording_url: "",
};

const CLASS_TYPES = ["webinar", "workshop", "coaching", "q-and-a", "mastermind"];
const RECURRENCE_RULES = ["weekly", "biweekly", "monthly"];

export default function LiveClassesPage({ darkMode }: LiveClassesPageProps) {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ClassForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cardClass = darkMode
    ? "bg-[#111827] border-white/[0.06]"
    : "bg-white border-gray-200";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-500";
  const inputClass = darkMode
    ? "bg-[#0b1121] border-white/[0.06] text-white"
    : "bg-white border-gray-200 text-gray-900";

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lp_live_classes")
      .select("*")
      .order("scheduled_at", { ascending: false });

    if (error) {
      console.error("Error fetching classes:", error);
      setLoading(false);
      return;
    }

    // Fetch registration counts
    const classIds = (data || []).map((c) => c.id);
    const { data: regData } = await supabase
      .from("lp_class_registrations")
      .select("class_id")
      .in("class_id", classIds);

    const regCounts: Record<string, number> = {};
    for (const reg of regData || []) {
      regCounts[reg.class_id] = (regCounts[reg.class_id] || 0) + 1;
    }

    setClasses(
      (data || []).map((c) => ({
        ...c,
        registration_count: regCounts[c.id] || 0,
      }))
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (cls: LiveClass) => {
    setForm({
      title: cls.title || "",
      description: cls.description || "",
      class_type: cls.class_type || "webinar",
      scheduled_at: cls.scheduled_at ? cls.scheduled_at.slice(0, 16) : "",
      duration_minutes: cls.duration_minutes || 60,
      zoom_link: cls.zoom_link || "",
      meeting_id: cls.meeting_id || "",
      meeting_password: cls.meeting_password || "",
      tier_slug: cls.tier_slug || "",
      max_attendees: cls.max_attendees || 100,
      is_recurring: cls.is_recurring || false,
      recurrence_rule: cls.recurrence_rule || "weekly",
      recording_url: cls.recording_url || "",
    });
    setEditingId(cls.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      class_type: form.class_type,
      scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
      duration_minutes: form.duration_minutes,
      zoom_link: form.zoom_link || null,
      meeting_id: form.meeting_id || null,
      meeting_password: form.meeting_password || null,
      tier_slug: form.tier_slug || null,
      max_attendees: form.max_attendees,
      is_recurring: form.is_recurring,
      recurrence_rule: form.is_recurring ? form.recurrence_rule : null,
      recording_url: form.recording_url || null,
    };

    if (editingId) {
      await supabase.from("lp_live_classes").update(payload).eq("id", editingId);
    } else {
      await supabase.from("lp_live_classes").insert({ ...payload, status: "scheduled" });
    }

    setSaving(false);
    setShowForm(false);
    fetchClasses();
  };

  const handleCancel = async (id: string) => {
    await supabase.from("lp_live_classes").update({ status: "cancelled" }).eq("id", id);
    fetchClasses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this class permanently?")) return;
    await supabase.from("lp_live_classes").delete().eq("id", id);
    fetchClasses();
  };

  const copyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      scheduled: "bg-blue-500/10 text-blue-400",
      live: "bg-green-500/10 text-green-400 animate-pulse",
      completed: "bg-gray-500/10 text-gray-400",
      cancelled: "bg-red-500/10 text-red-400",
    };
    return styles[status] || styles.scheduled;
  };

  const typeBadge = darkMode
    ? "bg-purple-500/10 text-purple-400"
    : "bg-purple-50 text-purple-600";

  const labelClass = `block text-xs font-medium mb-1 ${textSecondary}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-6 h-6 text-cyan-400" />
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Live Classes</h1>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Schedule Class
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className={`${cardClass} border rounded-xl p-6 space-y-4`}>
          <h2 className={`text-lg font-semibold ${textPrimary}`}>
            {editingId ? "Edit Class" : "Schedule New Class"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select
                value={form.class_type}
                onChange={(e) => setForm({ ...form, class_type: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              >
                {CLASS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Date & Time</label>
              <input
                type="datetime-local"
                value={form.scheduled_at}
                onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Duration (minutes)</label>
              <input
                type="number"
                value={form.duration_minutes}
                onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Max Attendees</label>
              <input
                type="number"
                value={form.max_attendees}
                onChange={(e) => setForm({ ...form, max_attendees: Number(e.target.value) })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Zoom Link</label>
              <input
                type="url"
                value={form.zoom_link}
                onChange={(e) => setForm({ ...form, zoom_link: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Meeting ID</label>
              <input
                type="text"
                value={form.meeting_id}
                onChange={(e) => setForm({ ...form, meeting_id: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Meeting Password</label>
              <input
                type="text"
                value={form.meeting_password}
                onChange={(e) => setForm({ ...form, meeting_password: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Tier Slug</label>
              <input
                type="text"
                value={form.tier_slug}
                onChange={(e) => setForm({ ...form, tier_slug: e.target.value })}
                placeholder="e.g. ai-automation"
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            {editingId && (
              <div className="md:col-span-2">
                <label className={labelClass}>Recording URL (after completion)</label>
                <input
                  type="url"
                  value={form.recording_url}
                  onChange={(e) => setForm({ ...form, recording_url: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
                />
              </div>
            )}
            <div className="md:col-span-2 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_recurring}
                  onChange={(e) => setForm({ ...form, is_recurring: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className={`text-sm ${textPrimary}`}>Recurring</span>
              </label>
              {form.is_recurring && (
                <select
                  value={form.recurrence_rule}
                  onChange={(e) => setForm({ ...form, recurrence_rule: e.target.value })}
                  className={`px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40 text-sm`}
                >
                  {RECURRENCE_RULES.map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setShowForm(false)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                darkMode
                  ? "border-white/[0.06] text-gray-400 hover:text-white"
                  : "border-gray-200 text-gray-500 hover:text-gray-900"
              } transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title || !form.scheduled_at}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? "Saving..." : editingId ? "Update" : "Schedule"}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`${cardClass} border rounded-xl overflow-hidden`}>
        {loading ? (
          <div className={`p-8 text-center ${textSecondary}`}>Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className={`p-8 text-center ${textSecondary}`}>No live classes scheduled.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? "border-b border-white/[0.06]" : "border-b border-gray-200"}>
                  {["Title", "Type", "Date/Time", "Duration", "Registrations", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider ${textSecondary}`}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody
                className={`divide-y ${darkMode ? "divide-white/[0.06]" : "divide-gray-200"}`}
              >
                {classes.map((cls) => (
                  <tr
                    key={cls.id}
                    className={`transition-colors ${
                      darkMode ? "hover:bg-white/[0.02]" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className={`px-5 py-4 text-sm font-medium ${textPrimary}`}>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{cls.title}</span>
                        {cls.zoom_link && (
                          <button
                            onClick={() => copyLink(cls.zoom_link, cls.id)}
                            title="Copy Zoom link"
                            className={`${textSecondary} hover:text-cyan-400 transition-colors`}
                          >
                            {copiedId === cls.id ? (
                              <Copy className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Link2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                        {cls.recording_url && (
                          <a
                            href={cls.recording_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View recording"
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeBadge}`}>
                        {cls.class_type?.replace("-", " ")}
                      </span>
                    </td>
                    <td className={`px-5 py-4 text-sm ${textSecondary}`}>
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {cls.scheduled_at
                          ? new Date(cls.scheduled_at).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "-"}
                      </div>
                    </td>
                    <td className={`px-5 py-4 text-sm ${textSecondary}`}>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {cls.duration_minutes}m
                      </div>
                    </td>
                    <td className={`px-5 py-4 text-sm ${textSecondary}`}>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {cls.registration_count || 0}
                        {cls.max_attendees ? ` / ${cls.max_attendees}` : ""}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge(
                          cls.status
                        )}`}
                      >
                        {cls.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(cls)}
                          title="Edit"
                          className={`${textSecondary} hover:text-cyan-400 transition-colors`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {cls.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancel(cls.id)}
                            title="Cancel class"
                            className={`${textSecondary} hover:text-red-400 transition-colors`}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(cls.id)}
                          title="Delete"
                          className={`${textSecondary} hover:text-red-400 transition-colors`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
