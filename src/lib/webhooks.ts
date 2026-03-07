const N8N_BASE = "https://primary-production-75e9.up.railway.app/webhook";

function post(path: string, data: Record<string, unknown>) {
  fetch(`${N8N_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

export function submitNewsletter(email: string) {
  post("lp-newsletter-signup", { email, source: "newsletter", created_at: new Date().toISOString() });
}

export function submitLeadCapture(data: { name: string; email: string; company: string; message: string }) {
  post("lp-lead-capture", { ...data, source: "contact_form", created_at: new Date().toISOString() });
}

export function submitChecklistSignup(email: string) {
  post("lp-newsletter-signup", { email, source: "checklist_download", created_at: new Date().toISOString() });
}

export function submitExitIntentSignup(email: string) {
  post("lp-newsletter-signup", { email, source: "exit_intent", created_at: new Date().toISOString() });
}

export function submitAssessmentEmail(email: string, score: number, grade: string) {
  post("lp-lead-capture", { email, name: "", company: "", message: `AI Readiness Assessment: ${grade} (${score} points)`, source: "assessment", score, grade, created_at: new Date().toISOString() });
}
