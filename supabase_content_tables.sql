-- LaSean Pickens - Content Management System Tables
-- Run this in Supabase SQL Editor

-- 1. Courses
CREATE TABLE IF NOT EXISTS lp_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  tier_slug TEXT,
  category TEXT DEFAULT 'general',
  unlock_points INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  order_position INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  estimated_hours DECIMAL(5,1),
  instructor_name TEXT DEFAULT 'LaSean Pickens',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lp_courses_published ON lp_courses(is_published);
CREATE INDEX IF NOT EXISTS idx_lp_courses_tier ON lp_courses(tier_slug);
CREATE INDEX IF NOT EXISTS idx_lp_courses_order ON lp_courses(order_position);

-- 2. Lessons
CREATE TABLE IF NOT EXISTS lp_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES lp_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT DEFAULT 'video',
  video_url TEXT,
  video_provider TEXT,
  text_content TEXT,
  document_url TEXT,
  duration_minutes INTEGER,
  order_position INTEGER DEFAULT 0,
  is_free_preview BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lp_lessons_course ON lp_lessons(course_id, order_position);

-- 3. Student progress (per lesson)
CREATE TABLE IF NOT EXISTS lp_student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  lesson_id UUID NOT NULL REFERENCES lp_lessons(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES lp_courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  progress_percent DECIMAL(5,2) DEFAULT 0,
  last_position_seconds INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(email, lesson_id)
);
CREATE INDEX IF NOT EXISTS idx_lp_student_progress_email ON lp_student_progress(email);
CREATE INDEX IF NOT EXISTS idx_lp_student_progress_course ON lp_student_progress(course_id, email);

-- 4. Live classes
CREATE TABLE IF NOT EXISTS lp_live_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  class_type TEXT DEFAULT 'webinar',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  timezone TEXT DEFAULT 'America/New_York',
  zoom_link TEXT,
  meeting_id TEXT,
  meeting_password TEXT,
  recording_url TEXT,
  recording_thumbnail_url TEXT,
  max_attendees INTEGER,
  tier_slug TEXT,
  course_id UUID REFERENCES lp_courses(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT false,
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lp_live_classes_scheduled ON lp_live_classes(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_lp_live_classes_status ON lp_live_classes(status);

-- 5. Class registrations
CREATE TABLE IF NOT EXISTS lp_class_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES lp_live_classes(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT now(),
  attended BOOLEAN DEFAULT false,
  attended_at TIMESTAMPTZ,
  UNIQUE(class_id, email)
);
CREATE INDEX IF NOT EXISTS idx_lp_class_registrations_class ON lp_class_registrations(class_id);
CREATE INDEX IF NOT EXISTS idx_lp_class_registrations_email ON lp_class_registrations(email);

-- 6. Announcements
CREATE TABLE IF NOT EXISTS lp_announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  audience TEXT DEFAULT 'all',
  priority TEXT DEFAULT 'normal',
  is_published BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lp_announcements_published ON lp_announcements(is_published, created_at DESC);

-- 7. Content resources (admin-uploaded files)
CREATE TABLE IF NOT EXISTS lp_content_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size TEXT,
  file_size_bytes BIGINT,
  category TEXT DEFAULT 'general',
  tier_slug TEXT,
  is_gated BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lp_content_resources_published ON lp_content_resources(is_published);
CREATE INDEX IF NOT EXISTS idx_lp_content_resources_category ON lp_content_resources(category);

-- 8. Course enrollments
CREATE TABLE IF NOT EXISTS lp_course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  course_id UUID NOT NULL REFERENCES lp_courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  UNIQUE(email, course_id)
);
CREATE INDEX IF NOT EXISTS idx_lp_course_enrollments_email ON lp_course_enrollments(email);
CREATE INDEX IF NOT EXISTS idx_lp_course_enrollments_course ON lp_course_enrollments(course_id);

-- RLS Policies
ALTER TABLE lp_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_class_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_content_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_course_enrollments ENABLE ROW LEVEL SECURITY;

-- Read policies (authenticated users can read published content)
CREATE POLICY "Anyone can read published courses" ON lp_courses FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can read published lessons" ON lp_lessons FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can read published classes" ON lp_live_classes FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can read published announcements" ON lp_announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can read published resources" ON lp_content_resources FOR SELECT USING (is_published = true);

-- Users can manage their own progress and registrations
CREATE POLICY "Users can read own progress" ON lp_student_progress FOR SELECT USING (email = auth.jwt()->>'email');
CREATE POLICY "Users can insert own progress" ON lp_student_progress FOR INSERT WITH CHECK (email = auth.jwt()->>'email');
CREATE POLICY "Users can update own progress" ON lp_student_progress FOR UPDATE USING (email = auth.jwt()->>'email');

CREATE POLICY "Users can read own registrations" ON lp_class_registrations FOR SELECT USING (email = auth.jwt()->>'email');
CREATE POLICY "Users can insert own registrations" ON lp_class_registrations FOR INSERT WITH CHECK (email = auth.jwt()->>'email');

CREATE POLICY "Users can read own enrollments" ON lp_course_enrollments FOR SELECT USING (email = auth.jwt()->>'email');
CREATE POLICY "Users can insert own enrollments" ON lp_course_enrollments FOR INSERT WITH CHECK (email = auth.jwt()->>'email');

-- Admin full access (service role bypasses RLS, but for anon key admin access):
-- These allow any authenticated user to write. In production, add an admin check.
CREATE POLICY "Admin can manage courses" ON lp_courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage lessons" ON lp_lessons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage classes" ON lp_live_classes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage announcements" ON lp_announcements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage resources" ON lp_content_resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage enrollments" ON lp_course_enrollments FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for content files
-- Run this separately or via Supabase dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('lp-content', 'lp-content', true);
