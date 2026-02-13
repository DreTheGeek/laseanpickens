

# Hero Background Video, Em Dash Removal, and Vapi Credentials

## 1. Hero Background Video

Copy `LaSean_at_Conference.mp4` to `public/videos/` (public folder is best for large video files to avoid bundling overhead). Then update the Hero section in `Index.tsx` to render a `<video>` element as a full-bleed background behind the voice widget, with:

- Autoplay, muted, loop, playsInline attributes
- `object-cover` styling to fill the hero
- A dark overlay gradient so text and the voice widget remain readable
- The existing content (voice widget, CTAs, scroll indicator) layered on top via `z-index`

This sets up a scalable pattern for adding more videos later.

## 2. Remove All Em Dashes

Replace every `—` across the site with appropriate punctuation. Here are the specific changes:

**AuthorityBio.tsx (3 instances):**
- "Founder and CEO of Kaldr — a portfolio..." becomes "Founder and CEO of Kaldr, a portfolio..."
- "doesn't just talk about systems — he builds them" becomes "doesn't just talk about systems. He builds them."
- "automation, and strategic infrastructure — so they can" becomes "automation, and strategic infrastructure, so they can"

**FeaturedEvent.tsx (1 instance):**
- "AI-powered lead gen system — built live" becomes "AI-powered lead gen system, built live"

**Newsletter.tsx (1 instance):**
- "strategies, and systems thinking — delivered to" becomes "strategies, and systems thinking, delivered to"

**SocialProof.tsx (1 instance):**
- "He doesn't just consult — he delivers." becomes "He doesn't just consult. He delivers."

**useVapi.ts and HeroVoiceWidget.tsx (code comments only):**
- Clean up em dashes in comments as well for consistency.

## 3. Vapi Voice Agent Credentials

Since Vapi public keys are publishable (client-side SDK), it is safe to store them directly in the codebase. I will ask you for your Vapi Public Key and Agent ID, then update `src/hooks/useVapi.ts` to replace the placeholder values. This will make the "Talk to LaSean" voice widget fully functional.

## 4. Verify Smooth Scrolling

The smooth scroll CSS (`scroll-behavior: smooth`) is already in `src/index.css`. I will navigate the preview and click nav links to confirm they animate properly to each section.

---

## Technical Summary

| Task | Files Modified |
|------|---------------|
| Background video | `public/videos/LaSean_at_Conference.mp4` (new), `src/pages/Index.tsx` |
| Em dash removal | `AuthorityBio.tsx`, `FeaturedEvent.tsx`, `Newsletter.tsx`, `SocialProof.tsx`, `useVapi.ts`, `HeroVoiceWidget.tsx` |
| Vapi credentials | `src/hooks/useVapi.ts` (after you provide keys) |
| Scroll verification | Testing only, no file changes |
