

# Replace Placeholder Avatars with LaSean's Photos

The site is fully built with all sections, voice widget, pricing, and content. The remaining task is to swap the placeholder "LP" initials with your actual photos.

---

## What will change

### 1. Copy photos into the project
- Copy all 3 uploaded photos into `src/assets/` for proper bundling
  - `Good_Headshot-2.png` — Hero voice widget avatar (circular crop)
  - `nice_1-2.png` — Authority Bio section
  - `S0pFG12gH0Ama-5k4MYu0_dmVTJFw6-2.png` — Kaldr Ecosystem section

### 2. Hero Voice Widget (`HeroVoiceWidget.tsx`)
- Replace the dark gradient with "LP" text with LaSean's headshot as the circular avatar
- The photo will be displayed with `object-cover` to fill the circle cleanly
- The speaking animation overlay and glow effects remain on top

### 3. Authority Bio Section (`AuthorityBio.tsx`)
- Replace the "LP" placeholder box with the desk/computer photo in a styled rounded container

### 4. Kaldr Ecosystem Section (`KaldrShowcase.tsx`)
- Replace the "KALDR" text placeholder with the bookshelf photo, keeping the blue glow border styling

---

## What stays the same
- All voice chat functionality, transcript, and Vapi integration
- All pricing tiers, manifesto, social proof, lead capture, and footer sections
- The Black & Electric Blue theme and all animations
- Mobile responsiveness

