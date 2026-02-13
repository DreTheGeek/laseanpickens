

# LaSean Pickens — Personal Brand Platform with Interactive Voice AI Hero

Building the complete personal brand site with a standout feature: an interactive "Talk to LaSean" voice chat widget in the hero section.

---

## 1. Hero Section — "Talk to LaSean" Voice Chat Widget
- LaSean's headshot displayed as a large, circular avatar with an electric blue glowing ring/pulse animation
- Below the avatar: **"Talk to LaSean"** button that initiates a voice conversation
- When idle: the avatar sits elegantly with the headline *"Leverage Beats Labor"* and a subtle "Click to start a conversation" prompt
- When active/speaking: the avatar ring pulses/animates to indicate the AI is talking, with a visual speaking indicator
- **Desktop-only live transcript box**: A sleek chat transcript area appears below the avatar that displays real-time captions of both the user and AI LaSean's conversation as it happens
- On mobile: the voice chat still works but the transcript box is hidden for a cleaner experience
- Vapi integration wired up with placeholder configuration — you'll plug in your Vapi agent ID and API key later
- Two CTAs flanking or below the widget: **"Book a Consultation"** and **"View Programs"**

## 2. Authority Bio Section
- LaSean's full bio in an editorial layout with a second photo
- Glowing stat cards with placeholder metrics (e.g., "AI Systems Built", "Businesses Powered")

## 3. Expertise Pillars Grid
- Icon cards for each specialization: AI Automation, SaaS, Content Monetization, Real Estate, Capital Leverage
- Dark cards with electric blue hover glow effects

## 4. Kaldr Ecosystem Showcase
- Highlight Kaldr's business verticals with the third photo
- *"I don't just teach systems. I build them."*

## 5. Coaching & Consulting Pricing Tiers
- Three cards: Strategy Call, Growth Program, Elite Partnership
- Placeholder pricing with feature lists and sign-up CTAs
- "Most Popular" badge on the middle tier

## 6. Philosophy / Manifesto
- Bold quote section with LaSean's core beliefs
- Electric blue accent typography on dark background

## 7. Social Proof (Placeholder)
- Testimonial cards with placeholder content, ready to swap in real quotes

## 8. Lead Capture / Book a Call
- Contact form (name, email, message) with electric blue submit button
- Alternative CTA for direct booking link

## 9. Footer
- Social links, copyright, minimalist dark design

---

## Design System
- **Background**: Deep black (#0a0a0a) with subtle gradients
- **Primary Accent**: Electric blue (#3b82f6 / #60a5fa)
- **Text**: White and light gray
- **Cards**: Dark charcoal with blue border/glow on hover
- **Voice Widget**: Circular avatar with animated blue glow ring, transcript area with dark glass-morphism styling

## Voice Chat Technical Approach
- Vapi Web SDK integration with placeholder agent ID
- Start/stop conversation triggered by clicking the avatar or "Talk to LaSean" button
- Real-time transcript component that listens to Vapi's speech events and renders captions live (desktop only, hidden on mobile via responsive classes)
- Speaking state visually reflected by avatar animation changes

