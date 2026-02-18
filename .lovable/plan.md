
# Intro Animation: Navy Screen to Glowing "LASEAN PICKENS" to Site

## What You'll See

When anyone visits the site, they'll see a full-screen navy blue overlay for a brief moment. Then "LASEAN PICKENS" fades in with a blue glow (with "PICKENS" in the brand blue color), builds to a bright pulse, then the entire overlay fades out to reveal the site underneath. On desktop it runs for 2.5 seconds total; on mobile it's 1.5 seconds.

## Implementation

### New File: `src/components/IntroAnimation.tsx`

A self-contained component that:
- Renders a fixed, full-viewport overlay (`position: fixed`, `z-index: 9999`) so it sits above everything including the navbar
- Uses a deep navy background (`#0a0f1e`, slightly blue-tinted dark vs the site's pure dark)
- Animates "LASEAN" in white and "PICKENS" in the brand blue (`hsl(217 91% 60%)`)
- Uses `framer-motion` (already installed) for the sequence:
  1. **0s**: Navy screen, text invisible
  2. **0.3s**: "LASEAN PICKENS" fades in and scales up slightly
  3. **0.8s**: Blue glow pulses to full brightness on the text
  4. **1.5s (mobile) / 2.5s (desktop)**: Entire overlay fades to opacity 0
  5. After fade: component unmounts (`display: none`) so it doesn't block clicks
- Uses a `sessionStorage` flag so the animation only plays **once per browser session** (refreshing mid-session won't replay it, but opening a new tab will)
- Uses the existing `useIsMobile` hook to determine timing

### Framer Motion Sequence

```
Overlay: opacity 0 → 1 (instant) → hold → 0 (fade out)
Text:    opacity 0, scale 0.9 → opacity 1, scale 1 → glow builds → holds → fades with overlay
```

The text glow uses a CSS `text-shadow` animated via framer-motion's `style` prop, building from subtle to strong blue glow matching the site's `glow-blue` utility class aesthetic.

### Wire into `src/App.tsx`

Import and render `<IntroAnimation />` directly inside `App`, above the `<BrowserRouter>`. This ensures it overlays everything regardless of route.

## Animation Timeline (Desktop 2.5s)

```
0ms    - Navy overlay appears instantly (no flash)
300ms  - Text fades in + scales up
800ms  - Glow reaches peak brightness  
1800ms - Overlay begins fading out
2500ms - Fade complete, component unmounts
```

## Animation Timeline (Mobile 1.5s)

```
0ms    - Navy overlay appears instantly
200ms  - Text fades in
500ms  - Glow reaches peak brightness
1000ms - Overlay begins fading out
1500ms - Fade complete, component unmounts
```

## Technical Notes

- No new dependencies needed (framer-motion already installed)
- `useIsMobile` hook is already in `src/hooks/use-mobile.tsx`
- The overlay uses `pointer-events: none` after the animation starts fading, so if someone clicks early they won't be blocked
- `overflow: hidden` on body is set during animation to prevent scroll during the intro, then released
- Session storage key: `intro_played` — set to `"true"` after first play

## Files Changed

| File | Action |
|------|--------|
| `src/components/IntroAnimation.tsx` | Create new component |
| `src/App.tsx` | Import and render `<IntroAnimation />` |
