---
name: MECPL Preloader Fix
description: Two bugs in Preloader.tsx and how they were fixed
---

## Bug 1: Preloader turns white in light mode
`html[data-theme="light"] .bg-black { background-color: #ffffff !important; }` (index.css global rule) overrides the Preloader's `bg-black` class, making it appear white.

**Fix:** Add `.preloader-force-text` class to the preloader wrapper (already present) and add a targeted CSS override after the global rule:
```css
html[data-theme="light"] .preloader-force-text { background-color: #000000 !important; color: #ffffff !important; }
```

**Why:** The preloader sits outside `.hp-root` so hp-root's dark overrides don't apply to it.

## Bug 2: GSAP "target [object NodeList] not found" warning
The simplified Preloader has no `.preloader-line` elements, but still calls `gsap.from(lines, ...)` where `lines` is an empty NodeList. GSAP emits a warning when given an empty NodeList.

**Fix:** Guard the tween with `if (lines.length > 0)`:
```tsx
if (lines.length > 0) {
  tl.from(lines, { yPercent: 100, opacity: 0, duration: 0.65, stagger: 0.08 });
}
tl.to(wrapperRef.current, { opacity: 0, ... });
```

**How to apply:** Any time a `.preloader-line` class is removed from the preloader JSX, this guard prevents the spurious GSAP warning.
