import { supabase } from "./supabase";

let sessionId: string | null = null;

function getSessionId() {
  if (!sessionId) {
    sessionId = sessionStorage.getItem("lp_session") || crypto.randomUUID();
    sessionStorage.setItem("lp_session", sessionId);
  }
  return sessionId;
}

export function trackPageView() {
  const params = new URLSearchParams(window.location.search);
  supabase.from("lp_page_views").insert({
    page_path: window.location.pathname,
    referrer: document.referrer || null,
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
  }).then(() => {});
}
