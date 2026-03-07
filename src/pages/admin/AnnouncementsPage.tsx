import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Bell,
  Pin,
  Edit3,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  AlertCircle,
  Megaphone,
} from "lucide-react";

interface AnnouncementsPageProps {
  darkMode: boolean;
}

interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: string;
  priority: string;
  is_published: boolean;
  is_pinned: boolean;
  expires_at: string | null;
  created_at: string;
}

interface AnnouncementForm {
  title: string;
  body: string;
  audience: string;
  priority: string;
  is_published: boolean;
  is_pinned: boolean;
  expires_at: string;
}

const emptyForm: AnnouncementForm = {
  title: "",
  body: "",
  audience: "all",
  priority: "normal",
  is_published: true,
  is_pinned: false,
  expires_at: "",
};

const AUDIENCES = ["all", "ai-automation", "transformation", "done-for-you", "consulting"];
const PRIORITIES = ["low", "normal", "high", "urgent"];

export default function AnnouncementsPage({ darkMode }: AnnouncementsPageProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AnnouncementForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const cardClass = darkMode
    ? "bg-[#111827] border-white/[0.06]"
    : "bg-white border-gray-200";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-500";
  const inputClass = darkMode
    ? "bg-[#0b1121] border-white/[0.06] text-white"
    : "bg-white border-gray-200 text-gray-900";

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lp_announcements")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching announcements:", error);
    }
    setAnnouncements(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const openNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (a: Announcement) => {
    setForm({
      title: a.title || "",
      body: a.body || "",
      audience: a.audience || "all",
      priority: a.priority || "normal",
      is_published: a.is_published ?? true,
      is_pinned: a.is_pinned ?? false,
      expires_at: a.expires_at ? a.expires_at.slice(0, 16) : "",
    });
    setEditingId(a.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      title: form.title,
      body: form.body,
      audience: form.audience,
      priority: form.priority,
      is_published: form.is_published,
      is_pinned: form.is_pinned,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
    };

    if (editingId) {
      await supabase.from("lp_announcements").update(payload).eq("id", editingId);
    } else {
      await supabase.from("lp_announcements").insert(payload);
    }

    setSaving(false);
    setShowForm(false);
    fetchAnnouncements();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    await supabase.from("lp_announcements").delete().eq("id", id);
    fetchAnnouncements();
  };

  const togglePin = async (id: string, current: boolean) => {
    await supabase.from("lp_announcements").update({ is_pinned: !current }).eq("id", id);
    fetchAnnouncements();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("lp_announcements").update({ is_published: !current }).eq("id", id);
    fetchAnnouncements();
  };

  const priorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      low: "bg-gray-500/10 text-gray-400",
      normal: "bg-blue-500/10 text-blue-400",
      high: "bg-amber-500/10 text-amber-400",
      urgent: "bg-red-500/10 text-red-400",
    };
    return styles[priority] || styles.normal;
  };

  const audienceBadge = darkMode
    ? "bg-purple-500/10 text-purple-400"
    : "bg-purple-50 text-purple-600";

  const labelClass = `block text-xs font-medium mb-1 ${textSecondary}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-cyan-400" />
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Announcements</h1>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className={`${cardClass} border rounded-xl p-6 space-y-4`}>
          <h2 className={`text-lg font-semibold ${textPrimary}`}>
            {editingId ? "Edit Announcement" : "New Announcement"}
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
              <label className={labelClass}>Body</label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={5}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div>
              <label className={labelClass}>Audience</label>
              <select
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              >
                {AUDIENCES.map((a) => (
                  <option key={a} value={a}>
                    {a === "all"
                      ? "All Students"
                      : a.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Expires At (optional)</label>
              <input
                type="datetime-local"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${inputClass} focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
              />
            </div>
            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className={`text-sm ${textPrimary}`}>Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_pinned}
                  onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className={`text-sm ${textPrimary}`}>Pinned</span>
              </label>
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
              disabled={saving || !form.title}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? "Saving..." : editingId ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      )}

      {/* Announcements List */}
      {loading ? (
        <div className={`${cardClass} border rounded-xl p-8 text-center ${textSecondary}`}>
          Loading announcements...
        </div>
      ) : announcements.length === 0 ? (
        <div className={`${cardClass} border rounded-xl p-8 text-center ${textSecondary}`}>
          No announcements yet.
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className={`${cardClass} border rounded-xl p-5`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    {a.is_pinned && (
                      <Pin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    )}
                    <h3 className={`text-sm font-semibold ${textPrimary}`}>{a.title}</h3>
                    {a.priority === "urgent" && (
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    )}
                  </div>

                  <p className={`text-sm ${textSecondary} mb-3`}>
                    {a.body && a.body.length > 100 ? a.body.slice(0, 100) + "..." : a.body}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${audienceBadge}`}>
                      {a.audience === "all" ? "All Students" : a.audience?.replace(/-/g, " ")}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge(
                        a.priority
                      )}`}
                    >
                      {a.priority}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        a.is_published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-gray-500/10 text-gray-400"
                      }`}
                    >
                      {a.is_published ? "published" : "draft"}
                    </span>
                    <span className={`text-xs ${textSecondary}`}>
                      {new Date(a.created_at).toLocaleDateString()}
                    </span>
                    {a.expires_at && (
                      <span className={`text-xs ${textSecondary}`}>
                        Expires: {new Date(a.expires_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => togglePublish(a.id, a.is_published)}
                    title={a.is_published ? "Unpublish" : "Publish"}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-white/[0.06]" : "hover:bg-gray-100"
                    } ${textSecondary}`}
                  >
                    {a.is_published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => togglePin(a.id, a.is_pinned)}
                    title={a.is_pinned ? "Unpin" : "Pin"}
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-white/[0.06]" : "hover:bg-gray-100"
                    } ${a.is_pinned ? "text-cyan-400" : textSecondary}`}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openEdit(a)}
                    title="Edit"
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-white/[0.06]" : "hover:bg-gray-100"
                    } ${textSecondary}`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    title="Delete"
                    className={`p-1.5 rounded-lg transition-colors ${
                      darkMode ? "hover:bg-white/[0.06]" : "hover:bg-gray-100"
                    } ${textSecondary} hover:text-red-400`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
