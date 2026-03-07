import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nrzkgyscaloxgmaajbau.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yemtneXNjYWxveGdtYWFqYmF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODQ0MDksImV4cCI6MjA4ODM2MDQwOX0.bc02ztYBoOHGKwo3fC-0BoXVcRJkF2LG1RlYvWvD94A";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
