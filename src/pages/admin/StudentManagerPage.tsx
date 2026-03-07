import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Users,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Search,
  BarChart3,
} from "lucide-react";

interface StudentManagerPageProps {
  darkMode: boolean;
}

interface Enrollment {
  id: string;
  email: string;
  course_id: string;
  course_title: string;
  status: string;
  enrolled_at: string;
}

interface StudentRow {
  email: string;
  courseCount: number;
  enrolledSince: string;
  status: string;
  enrollments: Enrollment[];
}

interface CourseProgress {
  courseId: string;
  courseTitle: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;
}

export default function StudentManagerPage({ darkMode }: StudentManagerPageProps) {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);
  const [progressMap, setProgressMap] = useState<Record<string, CourseProgress[]>>({});
  const [progressLoading, setProgressLoading] = useState<string | null>(null);

  const cardClass = darkMode
    ? "bg-[#111827] border-white/[0.06]"
    : "bg-white border-gray-200";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-500";
  const inputClass = darkMode
    ? "bg-[#0b1121] border-white/[0.06] text-white"
    : "bg-white border-gray-200 text-gray-900";

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lp_course_enrollments")
      .select("id, email, course_id, course_title, status, enrolled_at")
      .order("enrolled_at", { ascending: false });

    if (error) {
      console.error("Error fetching enrollments:", error);
      setLoading(false);
      return;
    }

    const grouped: Record<string, StudentRow> = {};
    for (const row of data || []) {
      if (!grouped[row.email]) {
        grouped[row.email] = {
          email: row.email,
          courseCount: 0,
          enrolledSince: row.enrolled_at,
          status: row.status || "active",
          enrollments: [],
        };
      }
      grouped[row.email].courseCount += 1;
      grouped[row.email].enrollments.push(row);
      if (row.enrolled_at < grouped[row.email].enrolledSince) {
        grouped[row.email].enrolledSince = row.enrolled_at;
      }
    }

    setStudents(Object.values(grouped));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const loadProgress = async (email: string, enrollments: Enrollment[]) => {
    if (progressMap[email]) return;
    setProgressLoading(email);

    const results: CourseProgress[] = [];

    for (const enrollment of enrollments) {
      const { data: progressData } = await supabase
        .from("lp_student_progress")
        .select("lesson_id, completed")
        .eq("email", email)
        .eq("course_id", enrollment.course_id);

      const total = progressData?.length || 0;
      const completed = progressData?.filter((p) => p.completed).length || 0;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      results.push({
        courseId: enrollment.course_id,
        courseTitle: enrollment.course_title || enrollment.course_id,
        completedLessons: completed,
        totalLessons: total,
        percent,
      });
    }

    setProgressMap((prev) => ({ ...prev, [email]: results }));
    setProgressLoading(null);
  };

  const toggleExpand = (email: string, enrollments: Enrollment[]) => {
    if (expandedEmail === email) {
      setExpandedEmail(null);
    } else {
      setExpandedEmail(email);
      loadProgress(email, enrollments);
    }
  };

  const filtered = students.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-cyan-400" />
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Student Manager</h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              darkMode ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-50 text-cyan-600"
            }`}
          >
            {students.length} students
          </span>
        </div>
      </div>

      {/* Search */}
      <div className={`${cardClass} border rounded-xl p-4`}>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textSecondary}`} />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${inputClass} placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40`}
          />
        </div>
      </div>

      {/* Table */}
      <div className={`${cardClass} border rounded-xl overflow-hidden`}>
        {loading ? (
          <div className={`p-8 text-center ${textSecondary}`}>Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className={`p-8 text-center ${textSecondary}`}>No students found.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className={darkMode ? "border-b border-white/[0.06]" : "border-b border-gray-200"}>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textSecondary}`}>
                  Email
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textSecondary}`}>
                  Courses Enrolled
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textSecondary}`}>
                  Enrolled Since
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textSecondary}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${textSecondary}`}>
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((student) => (
                <StudentTableRow
                  key={student.email}
                  student={student}
                  darkMode={darkMode}
                  expanded={expandedEmail === student.email}
                  onToggle={() => toggleExpand(student.email, student.enrollments)}
                  progress={progressMap[student.email]}
                  progressLoading={progressLoading === student.email}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StudentTableRow({
  student,
  darkMode,
  expanded,
  onToggle,
  progress,
  progressLoading,
}: {
  student: StudentRow;
  darkMode: boolean;
  expanded: boolean;
  onToggle: () => void;
  progress?: CourseProgress[];
  progressLoading: boolean;
}) {
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-500";

  const statusColor =
    student.status === "active"
      ? "bg-green-500/10 text-green-400"
      : student.status === "paused"
      ? "bg-amber-500/10 text-amber-400"
      : "bg-gray-500/10 text-gray-400";

  return (
    <>
      <tr
        className={`cursor-pointer transition-colors ${
          darkMode ? "hover:bg-white/[0.02]" : "hover:bg-gray-50"
        }`}
        onClick={onToggle}
      >
        <td className={`px-6 py-4 text-sm font-medium ${textPrimary}`}>{student.email}</td>
        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            {student.courseCount}
          </div>
        </td>
        <td className={`px-6 py-4 text-sm ${textSecondary}`}>
          {new Date(student.enrolledSince).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 text-sm">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {student.status}
          </span>
        </td>
        <td className="px-6 py-4 text-sm">
          {expanded ? (
            <ChevronUp className={`w-4 h-4 ${textSecondary}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${textSecondary}`} />
          )}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} className={`px-6 py-4 ${darkMode ? "bg-[#0b1121]" : "bg-gray-50"}`}>
            {progressLoading ? (
              <div className={`text-sm ${textSecondary}`}>Loading progress...</div>
            ) : !progress || progress.length === 0 ? (
              <div className={`text-sm ${textSecondary}`}>No progress data found.</div>
            ) : (
              <div className="space-y-3">
                {progress.map((cp) => (
                  <div
                    key={cp.courseId}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      darkMode ? "bg-[#111827] border border-white/[0.06]" : "bg-white border border-gray-200"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${textPrimary}`}>{cp.courseTitle}</div>
                      <div className={`text-xs ${textSecondary}`}>
                        {cp.completedLessons} / {cp.totalLessons} lessons completed
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                      <div className="w-24 h-2 rounded-full bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-cyan-500 transition-all"
                          style={{ width: `${cp.percent}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${textPrimary} w-10 text-right`}>
                        {cp.percent}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
