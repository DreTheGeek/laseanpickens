import { useState, useEffect, useCallback } from "react";
import {
  GraduationCap,
  Video,
  FileText,
  Plus,
  Edit3,
  Trash2,
  ToggleLeft,
  ToggleRight,
  BookOpen,
  Upload,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

/* ================================================================
   TYPES
   ================================================================ */

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  tier: string;
  category: string;
  estimated_hours: number | null;
  published: boolean;
  total_lessons: number;
  created_at: string;
}

interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  content_type: "video" | "text" | "document";
  video_url: string;
  text_content: string;
  document_url: string;
  duration_minutes: number | null;
  is_free_preview: boolean;
  order_position: number;
  created_at: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  category: string;
  tier: string;
  is_gated: boolean;
  is_published: boolean;
  download_count: number;
  created_at: string;
}

type Tab = "courses" | "lessons" | "resources";

interface CourseForm {
  title: string;
  slug: string;
  description: string;
  tier: string;
  category: string;
  estimated_hours: string;
  published: boolean;
}

interface LessonForm {
  title: string;
  description: string;
  content_type: "video" | "text" | "document";
  video_url: string;
  text_content: string;
  document_url: string;
  duration_minutes: string;
  is_free_preview: boolean;
  order_position: string;
}

interface ResourceForm {
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: string;
  category: string;
  tier: string;
  is_gated: boolean;
  is_published: boolean;
}

const TIERS = ["ai-automation", "transformation", "done-for-you", "consulting"];
const FILE_TYPES = ["pdf", "video", "zip", "doc", "spreadsheet"];
const RESOURCE_CATEGORIES = ["playbook", "template", "swipe-file", "guide", "tutorial", "checklist"];

const emptyCourseForm: CourseForm = {
  title: "",
  slug: "",
  description: "",
  tier: "",
  category: "",
  estimated_hours: "",
  published: false,
};

const emptyLessonForm: LessonForm = {
  title: "",
  description: "",
  content_type: "video",
  video_url: "",
  text_content: "",
  document_url: "",
  duration_minutes: "",
  is_free_preview: false,
  order_position: "",
};

const emptyResourceForm: ResourceForm = {
  title: "",
  description: "",
  file_url: "",
  file_type: "pdf",
  file_size: "",
  category: "guide",
  tier: "",
  is_gated: false,
  is_published: false,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ================================================================
   COMPONENT
   ================================================================ */

export default function ContentManagerPage({ darkMode }: { darkMode: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("courses");

  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<CourseForm>(emptyCourseForm);

  // Lessons state
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState<LessonForm>(emptyLessonForm);

  // Resources state
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourceFormOpen, setResourceFormOpen] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [resourceForm, setResourceForm] = useState<ResourceForm>(emptyResourceForm);

  // Styling helpers
  const card = darkMode
    ? "bg-[#111827] border border-white/[0.06] rounded-xl"
    : "bg-white border border-gray-200 rounded-xl";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-500";
  const inputClass = darkMode
    ? "w-full bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
    : "w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500";
  const selectClass = darkMode
    ? "bg-[#0b1121] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
    : "bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-cyan-500";
  const tableHeader = darkMode ? "text-gray-400 border-b border-white/[0.06]" : "text-gray-500 border-b border-gray-200";
  const tableRow = darkMode ? "border-b border-white/[0.04] hover:bg-white/[0.02]" : "border-b border-gray-100 hover:bg-gray-50";

  /* ----------------------------------------------------------------
     DATA FETCHING
     ---------------------------------------------------------------- */

  const fetchCourses = useCallback(async () => {
    setCoursesLoading(true);
    const { data } = await supabase
      .from("lp_courses")
      .select("*")
      .order("created_at", { ascending: false });
    setCourses(data ?? []);
    setCoursesLoading(false);
  }, []);

  const fetchLessons = useCallback(async (courseId: string) => {
    if (!courseId) {
      setLessons([]);
      return;
    }
    setLessonsLoading(true);
    const { data } = await supabase
      .from("lp_lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("order_position", { ascending: true });
    setLessons(data ?? []);
    setLessonsLoading(false);
  }, []);

  const fetchResources = useCallback(async () => {
    setResourcesLoading(true);
    const { data } = await supabase
      .from("lp_content_resources")
      .select("*")
      .order("created_at", { ascending: false });
    setResources(data ?? []);
    setResourcesLoading(false);
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchResources();
  }, [fetchCourses, fetchResources]);

  useEffect(() => {
    if (selectedCourseId) fetchLessons(selectedCourseId);
  }, [selectedCourseId, fetchLessons]);

  /* ----------------------------------------------------------------
     COURSES CRUD
     ---------------------------------------------------------------- */

  const openNewCourse = () => {
    setEditingCourseId(null);
    setCourseForm(emptyCourseForm);
    setCourseFormOpen(true);
  };

  const openEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    setCourseForm({
      title: c.title,
      slug: c.slug,
      description: c.description ?? "",
      tier: c.tier ?? "",
      category: c.category ?? "",
      estimated_hours: c.estimated_hours?.toString() ?? "",
      published: c.published,
    });
    setCourseFormOpen(true);
  };

  const saveCourse = async () => {
    const payload = {
      title: courseForm.title,
      slug: courseForm.slug || slugify(courseForm.title),
      description: courseForm.description,
      tier: courseForm.tier || null,
      category: courseForm.category || null,
      estimated_hours: courseForm.estimated_hours ? parseFloat(courseForm.estimated_hours) : null,
      published: courseForm.published,
    };

    if (editingCourseId) {
      await supabase.from("lp_courses").update(payload).eq("id", editingCourseId);
    } else {
      await supabase.from("lp_courses").insert(payload);
    }

    setCourseFormOpen(false);
    fetchCourses();
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course? All associated lessons will also be removed.")) return;
    await supabase.from("lp_lessons").delete().eq("course_id", id);
    await supabase.from("lp_courses").delete().eq("id", id);
    fetchCourses();
  };

  const toggleCoursePublished = async (c: Course) => {
    await supabase.from("lp_courses").update({ published: !c.published }).eq("id", c.id);
    fetchCourses();
  };

  /* ----------------------------------------------------------------
     LESSONS CRUD
     ---------------------------------------------------------------- */

  const openNewLesson = () => {
    setEditingLessonId(null);
    setLessonForm({
      ...emptyLessonForm,
      order_position: String(lessons.length + 1),
    });
    setLessonFormOpen(true);
  };

  const openEditLesson = (l: Lesson) => {
    setEditingLessonId(l.id);
    setLessonForm({
      title: l.title,
      description: l.description ?? "",
      content_type: l.content_type,
      video_url: l.video_url ?? "",
      text_content: l.text_content ?? "",
      document_url: l.document_url ?? "",
      duration_minutes: l.duration_minutes?.toString() ?? "",
      is_free_preview: l.is_free_preview,
      order_position: l.order_position?.toString() ?? "",
    });
    setLessonFormOpen(true);
  };

  const saveLesson = async () => {
    const payload = {
      course_id: selectedCourseId,
      title: lessonForm.title,
      description: lessonForm.description,
      content_type: lessonForm.content_type,
      video_url: lessonForm.video_url || null,
      text_content: lessonForm.text_content || null,
      document_url: lessonForm.document_url || null,
      duration_minutes: lessonForm.duration_minutes ? parseInt(lessonForm.duration_minutes) : null,
      is_free_preview: lessonForm.is_free_preview,
      order_position: lessonForm.order_position ? parseInt(lessonForm.order_position) : lessons.length + 1,
    };

    if (editingLessonId) {
      await supabase.from("lp_lessons").update(payload).eq("id", editingLessonId);
    } else {
      await supabase.from("lp_lessons").insert(payload);
    }

    // Update total_lessons count on the course
    const { count } = await supabase
      .from("lp_lessons")
      .select("id", { count: "exact", head: true })
      .eq("course_id", selectedCourseId);
    await supabase
      .from("lp_courses")
      .update({ total_lessons: count ?? 0 })
      .eq("id", selectedCourseId);

    setLessonFormOpen(false);
    fetchLessons(selectedCourseId);
    fetchCourses();
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Delete this lesson?")) return;
    await supabase.from("lp_lessons").delete().eq("id", id);

    const { count } = await supabase
      .from("lp_lessons")
      .select("id", { count: "exact", head: true })
      .eq("course_id", selectedCourseId);
    await supabase
      .from("lp_courses")
      .update({ total_lessons: count ?? 0 })
      .eq("id", selectedCourseId);

    fetchLessons(selectedCourseId);
    fetchCourses();
  };

  const toggleFreePreview = async (l: Lesson) => {
    await supabase.from("lp_lessons").update({ is_free_preview: !l.is_free_preview }).eq("id", l.id);
    fetchLessons(selectedCourseId);
  };

  /* ----------------------------------------------------------------
     RESOURCES CRUD
     ---------------------------------------------------------------- */

  const openNewResource = () => {
    setEditingResourceId(null);
    setResourceForm(emptyResourceForm);
    setResourceFormOpen(true);
  };

  const openEditResource = (r: Resource) => {
    setEditingResourceId(r.id);
    setResourceForm({
      title: r.title,
      description: r.description ?? "",
      file_url: r.file_url ?? "",
      file_type: r.file_type ?? "pdf",
      file_size: r.file_size ?? "",
      category: r.category ?? "guide",
      tier: r.tier ?? "",
      is_gated: r.is_gated,
      is_published: r.is_published,
    });
    setResourceFormOpen(true);
  };

  const saveResource = async () => {
    const payload = {
      title: resourceForm.title,
      description: resourceForm.description,
      file_url: resourceForm.file_url || null,
      file_type: resourceForm.file_type,
      file_size: resourceForm.file_size || null,
      category: resourceForm.category,
      tier: resourceForm.tier || null,
      is_gated: resourceForm.is_gated,
      is_published: resourceForm.is_published,
    };

    if (editingResourceId) {
      await supabase.from("lp_content_resources").update(payload).eq("id", editingResourceId);
    } else {
      await supabase.from("lp_content_resources").insert(payload);
    }

    setResourceFormOpen(false);
    fetchResources();
  };

  const deleteResource = async (id: string) => {
    if (!confirm("Delete this resource?")) return;
    await supabase.from("lp_content_resources").delete().eq("id", id);
    fetchResources();
  };

  /* ----------------------------------------------------------------
     SHARED UI COMPONENTS
     ---------------------------------------------------------------- */

  const Spinner = () => (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const EmptyState = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Icon className={`w-10 h-10 ${textSecondary}`} />
      <p className={textSecondary}>{text}</p>
    </div>
  );

  const Badge = ({ label, color }: { label: string; color: string }) => (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>{label}</span>
  );

  /* ----------------------------------------------------------------
     TAB BAR
     ---------------------------------------------------------------- */

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "lessons", label: "Lessons", icon: BookOpen },
    { id: "resources", label: "Resources", icon: FileText },
  ];

  /* ----------------------------------------------------------------
     RENDER - COURSES TAB
     ---------------------------------------------------------------- */

  const renderCourses = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${textPrimary}`}>Courses</h2>
        <button
          onClick={openNewCourse}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Course
        </button>
      </div>

      {courseFormOpen && (
        <div className={`${card} p-5 space-y-4`}>
          <h3 className={`font-semibold ${textPrimary}`}>
            {editingCourseId ? "Edit Course" : "New Course"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Title</label>
              <input
                className={inputClass}
                value={courseForm.title}
                onChange={(e) =>
                  setCourseForm({
                    ...courseForm,
                    title: e.target.value,
                    slug: editingCourseId ? courseForm.slug : slugify(e.target.value),
                  })
                }
                placeholder="Course title"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Slug</label>
              <input
                className={inputClass}
                value={courseForm.slug}
                onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                placeholder="auto-generated-slug"
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-xs mb-1 ${textSecondary}`}>Description</label>
              <textarea
                className={`${inputClass} min-h-[80px]`}
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                placeholder="Course description"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Tier</label>
              <select
                className={selectClass}
                value={courseForm.tier}
                onChange={(e) => setCourseForm({ ...courseForm, tier: e.target.value })}
              >
                <option value="">All tiers</option>
                {TIERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Category</label>
              <input
                className={inputClass}
                value={courseForm.category}
                onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                placeholder="e.g. marketing, operations"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Estimated Hours</label>
              <input
                className={inputClass}
                type="number"
                value={courseForm.estimated_hours}
                onChange={(e) => setCourseForm({ ...courseForm, estimated_hours: e.target.value })}
                placeholder="0"
              />
            </div>
            <div className="flex items-center gap-3 pt-5">
              <button
                type="button"
                onClick={() => setCourseForm({ ...courseForm, published: !courseForm.published })}
                className="text-cyan-400"
              >
                {courseForm.published ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
              <span className={`text-sm ${textPrimary}`}>Published</span>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={saveCourse}
              disabled={!courseForm.title}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {editingCourseId ? "Update" : "Create"}
            </button>
            <button
              onClick={() => setCourseFormOpen(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${darkMode ? "bg-white/5 text-gray-300 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={card}>
        {coursesLoading ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <EmptyState icon={GraduationCap} text="No courses yet. Create your first course to get started." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={tableHeader}>
                  <th className="text-left px-4 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium">Tier</th>
                  <th className="text-left px-4 py-3 font-medium">Lessons</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} className={tableRow}>
                    <td className={`px-4 py-3 ${textPrimary} font-medium`}>{c.title}</td>
                    <td className={`px-4 py-3 ${textSecondary}`}>
                      {c.tier ? (
                        <Badge label={c.tier} color="bg-cyan-500/10 text-cyan-400" />
                      ) : (
                        <span className={textSecondary}>All</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 ${textSecondary}`}>{c.total_lessons ?? 0}</td>
                    <td className="px-4 py-3">
                      {c.published ? (
                        <Badge label="Published" color="bg-green-500/10 text-green-400" />
                      ) : (
                        <Badge label="Draft" color={darkMode ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500"} />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleCoursePublished(c)}
                          className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                          title={c.published ? "Unpublish" : "Publish"}
                        >
                          {c.published ? (
                            <Eye className="w-4 h-4 text-green-400" />
                          ) : (
                            <EyeOff className={`w-4 h-4 ${textSecondary}`} />
                          )}
                        </button>
                        <button
                          onClick={() => openEditCourse(c)}
                          className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                          title="Edit"
                        >
                          <Edit3 className={`w-4 h-4 ${textSecondary}`} />
                        </button>
                        <button
                          onClick={() => deleteCourse(c.id)}
                          className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
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

  /* ----------------------------------------------------------------
     RENDER - LESSONS TAB
     ---------------------------------------------------------------- */

  const renderLessons = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className={`text-lg font-semibold ${textPrimary}`}>Lessons</h2>
          <div className="relative">
            <select
              className={`${selectClass} pr-8 min-w-[220px]`}
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${textSecondary}`} />
          </div>
        </div>
        {selectedCourseId && (
          <button
            onClick={openNewLesson}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Lesson
          </button>
        )}
      </div>

      {!selectedCourseId ? (
        <div className={card}>
          <EmptyState icon={BookOpen} text="Select a course above to manage its lessons." />
        </div>
      ) : (
        <>
          {lessonFormOpen && (
            <div className={`${card} p-5 space-y-4`}>
              <h3 className={`font-semibold ${textPrimary}`}>
                {editingLessonId ? "Edit Lesson" : "New Lesson"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Title</label>
                  <input
                    className={inputClass}
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    placeholder="Lesson title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Description</label>
                  <textarea
                    className={`${inputClass} min-h-[60px]`}
                    value={lessonForm.description}
                    onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                    placeholder="Brief description"
                  />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Content Type</label>
                  <div className="flex items-center gap-4 pt-1">
                    {(["video", "text", "document"] as const).map((t) => (
                      <label key={t} className={`flex items-center gap-1.5 text-sm cursor-pointer ${textPrimary}`}>
                        <input
                          type="radio"
                          name="content_type"
                          checked={lessonForm.content_type === t}
                          onChange={() => setLessonForm({ ...lessonForm, content_type: t })}
                          className="accent-cyan-500"
                        />
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Duration (minutes)</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={lessonForm.duration_minutes}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration_minutes: e.target.value })}
                    placeholder="0"
                  />
                </div>
                {lessonForm.content_type === "video" && (
                  <div className="md:col-span-2">
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Video URL</label>
                    <input
                      className={inputClass}
                      value={lessonForm.video_url}
                      onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                )}
                {lessonForm.content_type === "text" && (
                  <div className="md:col-span-2">
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Text Content</label>
                    <textarea
                      className={`${inputClass} min-h-[120px]`}
                      value={lessonForm.text_content}
                      onChange={(e) => setLessonForm({ ...lessonForm, text_content: e.target.value })}
                      placeholder="Lesson content..."
                    />
                  </div>
                )}
                {lessonForm.content_type === "document" && (
                  <div className="md:col-span-2">
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Document URL</label>
                    <input
                      className={inputClass}
                      value={lessonForm.document_url}
                      onChange={(e) => setLessonForm({ ...lessonForm, document_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                )}
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Order Position</label>
                  <input
                    className={inputClass}
                    type="number"
                    value={lessonForm.order_position}
                    onChange={(e) => setLessonForm({ ...lessonForm, order_position: e.target.value })}
                    placeholder="1"
                  />
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => setLessonForm({ ...lessonForm, is_free_preview: !lessonForm.is_free_preview })}
                    className="text-cyan-400"
                  >
                    {lessonForm.is_free_preview ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <span className={`text-sm ${textPrimary}`}>Free Preview</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={saveLesson}
                  disabled={!lessonForm.title}
                  className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {editingLessonId ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setLessonFormOpen(false)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium ${darkMode ? "bg-white/5 text-gray-300 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors`}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={card}>
            {lessonsLoading ? (
              <Spinner />
            ) : lessons.length === 0 ? (
              <EmptyState icon={Video} text="No lessons yet. Add the first lesson to this course." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={tableHeader}>
                      <th className="text-left px-4 py-3 font-medium">#</th>
                      <th className="text-left px-4 py-3 font-medium">Title</th>
                      <th className="text-left px-4 py-3 font-medium">Type</th>
                      <th className="text-left px-4 py-3 font-medium">Duration</th>
                      <th className="text-left px-4 py-3 font-medium">Free Preview</th>
                      <th className="text-right px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons.map((l) => (
                      <tr key={l.id} className={tableRow}>
                        <td className={`px-4 py-3 ${textSecondary}`}>{l.order_position}</td>
                        <td className={`px-4 py-3 ${textPrimary} font-medium`}>{l.title}</td>
                        <td className="px-4 py-3">
                          <Badge
                            label={l.content_type}
                            color={
                              l.content_type === "video"
                                ? "bg-purple-500/10 text-purple-400"
                                : l.content_type === "text"
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-orange-500/10 text-orange-400"
                            }
                          />
                        </td>
                        <td className={`px-4 py-3 ${textSecondary}`}>
                          {l.duration_minutes ? `${l.duration_minutes} min` : "-"}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleFreePreview(l)} className="text-cyan-400">
                            {l.is_free_preview ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5 text-gray-500" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditLesson(l)}
                              className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                              title="Edit"
                            >
                              <Edit3 className={`w-4 h-4 ${textSecondary}`} />
                            </button>
                            <button
                              onClick={() => deleteLesson(l.id)}
                              className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
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
        </>
      )}
    </div>
  );

  /* ----------------------------------------------------------------
     RENDER - RESOURCES TAB
     ---------------------------------------------------------------- */

  const renderResources = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${textPrimary}`}>Resources</h2>
        <button
          onClick={openNewResource}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Resource
        </button>
      </div>

      {resourceFormOpen && (
        <div className={`${card} p-5 space-y-4`}>
          <h3 className={`font-semibold ${textPrimary}`}>
            {editingResourceId ? "Edit Resource" : "New Resource"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-xs mb-1 ${textSecondary}`}>Title</label>
              <input
                className={inputClass}
                value={resourceForm.title}
                onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                placeholder="Resource title"
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-xs mb-1 ${textSecondary}`}>Description</label>
              <textarea
                className={`${inputClass} min-h-[60px]`}
                value={resourceForm.description}
                onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>File URL</label>
              <input
                className={inputClass}
                value={resourceForm.file_url}
                onChange={(e) => setResourceForm({ ...resourceForm, file_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>File Size</label>
              <input
                className={inputClass}
                value={resourceForm.file_size}
                onChange={(e) => setResourceForm({ ...resourceForm, file_size: e.target.value })}
                placeholder="e.g. 2.4 MB"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>File Type</label>
              <select
                className={selectClass}
                value={resourceForm.file_type}
                onChange={(e) => setResourceForm({ ...resourceForm, file_type: e.target.value })}
              >
                {FILE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Category</label>
              <select
                className={selectClass}
                value={resourceForm.category}
                onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })}
              >
                {RESOURCE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textSecondary}`}>Tier</label>
              <select
                className={selectClass}
                value={resourceForm.tier}
                onChange={(e) => setResourceForm({ ...resourceForm, tier: e.target.value })}
              >
                <option value="">All tiers</option>
                {TIERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-6 pt-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setResourceForm({ ...resourceForm, is_gated: !resourceForm.is_gated })}
                  className="text-cyan-400"
                >
                  {resourceForm.is_gated ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
                <span className={`text-sm ${textPrimary}`}>Gated</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setResourceForm({ ...resourceForm, is_published: !resourceForm.is_published })}
                  className="text-cyan-400"
                >
                  {resourceForm.is_published ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
                <span className={`text-sm ${textPrimary}`}>Published</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={saveResource}
              disabled={!resourceForm.title}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-40 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {editingResourceId ? "Update" : "Create"}
            </button>
            <button
              onClick={() => setResourceFormOpen(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium ${darkMode ? "bg-white/5 text-gray-300 hover:bg-white/10" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} transition-colors`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={card}>
        {resourcesLoading ? (
          <Spinner />
        ) : resources.length === 0 ? (
          <EmptyState icon={Upload} text="No resources yet. Upload your first resource." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={tableHeader}>
                  <th className="text-left px-4 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Tier</th>
                  <th className="text-left px-4 py-3 font-medium">Published</th>
                  <th className="text-left px-4 py-3 font-medium">Downloads</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r.id} className={tableRow}>
                    <td className={`px-4 py-3 ${textPrimary} font-medium`}>{r.title}</td>
                    <td className="px-4 py-3">
                      <Badge label={r.file_type ?? "file"} color="bg-cyan-500/10 text-cyan-400" />
                    </td>
                    <td className={`px-4 py-3 ${textSecondary} capitalize`}>{r.category ?? "-"}</td>
                    <td className={`px-4 py-3 ${textSecondary}`}>
                      {r.tier ? (
                        <Badge label={r.tier} color="bg-purple-500/10 text-purple-400" />
                      ) : (
                        "All"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {r.is_published ? (
                        <Badge label="Published" color="bg-green-500/10 text-green-400" />
                      ) : (
                        <Badge label="Draft" color={darkMode ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500"} />
                      )}
                    </td>
                    <td className={`px-4 py-3 ${textSecondary}`}>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        {r.download_count ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditResource(r)}
                          className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                          title="Edit"
                        >
                          <Edit3 className={`w-4 h-4 ${textSecondary}`} />
                        </button>
                        <button
                          onClick={() => deleteResource(r.id)}
                          className={`p-1.5 rounded-lg transition-colors ${darkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
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

  /* ----------------------------------------------------------------
     MAIN RENDER
     ---------------------------------------------------------------- */

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className={`flex gap-1 ${card} p-1`}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? "bg-cyan-500 text-white"
                : darkMode
                ? "text-gray-400 hover:text-white hover:bg-white/5"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "courses" && renderCourses()}
      {activeTab === "lessons" && renderLessons()}
      {activeTab === "resources" && renderResources()}
    </div>
  );
}
