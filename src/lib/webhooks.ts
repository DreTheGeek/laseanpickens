import { supabase } from "./supabase";

const N8N_BASE = "https://primary-production-75e9.up.railway.app/webhook";

function post(path: string, data: Record<string, unknown>) {
  fetch(`${N8N_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

export function submitNewsletter(email: string) {
  const created_at = new Date().toISOString();
  post("lp-newsletter-signup", { email, source: "newsletter", created_at });
  supabase.from("lp_subscribers").upsert({ email, source: "newsletter", status: "active", subscribed_at: created_at }, { onConflict: "email" }).then(() => {});
}

export function submitLeadCapture(data: { name: string; email: string; company: string; message: string }) {
  const created_at = new Date().toISOString();
  post("lp-lead-capture", { ...data, source: "contact_form", created_at });
  supabase.from("lp_leads").insert({ name: data.name, email: data.email, company: data.company, message: data.message, source: "contact_form", status: "new" }).then(() => {});
}

export function submitChecklistSignup(email: string) {
  const created_at = new Date().toISOString();
  post("lp-newsletter-signup", { email, source: "checklist_download", created_at });
  supabase.from("lp_subscribers").upsert({ email, source: "checklist_download", status: "active", subscribed_at: created_at }, { onConflict: "email" }).then(() => {});
}

export function submitExitIntentSignup(email: string) {
  const created_at = new Date().toISOString();
  post("lp-newsletter-signup", { email, source: "exit_intent", created_at });
  supabase.from("lp_subscribers").upsert({ email, source: "exit_intent", status: "active", subscribed_at: created_at }, { onConflict: "email" }).then(() => {});
}

export function submitAssessmentEmail(email: string, score: number, grade: string) {
  const created_at = new Date().toISOString();
  post("lp-lead-capture", { email, name: "", company: "", message: `AI Readiness Assessment: ${grade} (${score} points)`, source: "assessment", score, grade, created_at });
  supabase.from("lp_leads").insert({ email, source: "assessment", score, grade, status: "new", message: `AI Readiness Assessment: ${grade} (${score} points)` }).then(() => {});
}

export function submitQuizResults(email: string | null, answers: Record<string, string>, recommendedTier: string, recommendedServices: string[]) {
  supabase.from("lp_quiz_results").insert({
    email,
    answers,
    recommended_tier: recommendedTier,
    recommended_services: recommendedServices,
    session_id: sessionStorage.getItem("lp_session") || null,
  }).then(() => {});
}
