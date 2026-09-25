---
name: MECPL About section preview checks
description: A screenshot limitation encountered when verifying individual sections on the About page.
---

An `appPreview` capture of an About route with a section hash may remain at the page hero because the SPA target is rendered after initial browser hash navigation. This does not show whether the target section's styling is correct.

**Why:** The About-page timeline hash capture repeatedly showed the hero even though the target section exists in the rendered component.

**How to apply:** Use the isolated component preview for direct visual checks of a section. Treat a full-page hash capture that stays at the top as inconclusive rather than as evidence that the section failed to update.