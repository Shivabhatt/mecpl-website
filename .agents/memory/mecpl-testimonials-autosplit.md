---
name: MECPL testimonials AutoSplit line-mask reveal
description: How the testimonials text animation is implemented (GggpRoB pattern) and the key gotchas.
---

## Pattern (from codepen.io/GreenSock/pen/GggpRoB)

```js
(SplitText as any).create(quoteEl, {
  type: "words,lines",
  mask: "lines",          // overflow:hidden wrapper per line — hides text below baseline
  linesClass: "testi-line",
  autoSplit: true,        // re-splits on resize, returns fresh animation via onSplit
  onSplit: (instance) => {
    return gsap.from(instance.lines, {
      yPercent: 120,
      stagger: 0.1,
      scrollTrigger: {
        trigger: card,    // the 100vh card div, not the quote element
        scrub: true,
        start: "clamp(top center)",
        end: "clamp(bottom center)",
      },
    });
  },
});
```

## Key rules

**Why cast `(SplitText as any).create()`:** GSAP 3.15 TypeScript types may not expose the static `create()` method — cast to avoid TS error.

**Why `document.fonts.ready.then(...)`:** Montserrat must be loaded before SplitText measures line-breaks. Splitting before fonts load gives wrong line counts.

**Why `cancelled` flag:** The `fonts.ready` promise resolves async. Without a cancel guard, the split can fire after the component unmounts, creating orphaned ScrollTriggers.

**Why `mask:"lines"` requires removing `overflow:hidden` from the card:** The mask creates its own per-line `overflow:hidden` wrapper. A card-level `overflow:hidden` would clip lines during their `yPercent:120` entry phase before they finish animating.

**Why `minHeight:100vh` not `height:100vh`:** Fixed height clips content on small screens; `minHeight` lets content breathe.

**Cleanup:** Store all split instances in an outer array; call `.revert()` on each in the cleanup function. `gsap.context().revert()` alone is insufficient because the splits are created asynchronously.
