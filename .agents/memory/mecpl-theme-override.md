---
name: MECPL ThemeProvider Override
description: How to maintain a dark homepage on a site where ThemeProvider always forces data-theme="light"
---

## The Rule
For the MECPL homepage (HomePage.tsx), wrap everything in `<div className="hp-root">` with **inline styles** (`style={{ background: "#0a0a0a", color: "#f0f0f0" }}`). Add high-specificity CSS overrides in index.css using `html[data-theme="light"] .hp-root` (specificity score ~31) to win over the global light-mode rules (score ~21).

**Why:** `ThemeContext.tsx` unconditionally sets `document.documentElement.setAttribute("data-theme", "light")` and never toggles. Global CSS then maps dark Tailwind classes (e.g. `text-white → #111827`, `bg-black → #ffffff`) to light equivalents.

**How to apply:**
- Use **inline styles** for section backgrounds (`style={{ background: "#0a0a0a" }}`); inline styles always win over any class.
- Do NOT put `data-animate-page` on `.hp-root` — that would activate the global `useGsapPageAnimations` hook and conflict with the homepage's own GSAP effects.
- The `html[data-theme="light"] .hp-root` block lives at the bottom of index.css (after the global overrides) to ensure the cascade order is correct.
- All section backgrounds use inline style, not Tailwind `bg-black` class (which gets overridden globally).
