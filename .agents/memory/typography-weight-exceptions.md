---
name: Typography weight exceptions
description: How to make intentionally light or heavy component typography render correctly alongside shared site-wide title rules.
---

For Home banner revisions, use restrained headline sizing and reference capitalization for headings, but render the company-name line in ALL CAPS. Use subtle, softly blended darkening localized behind the copy, not separate strips behind each line. Keep broader font experiments separate.

**Why:** The user rejected oversized uppercase headings, clarified that the company-name line must be all caps, rejected broad empty-space shading and per-line strips, then supplied a reference for blended darkening behind the text.

**How to apply:** Scope banner-specific adjustments to the Home hero, and request visual approval before committing or publishing those revisions.

When a component intentionally uses a font weight outside the shared title treatment, load that exact weight and make the component rule more specific than the shared typography utilities.

**Why:** Declaring a light weight is not enough if the font import omits it or a shared `!important` rule wins the cascade. Important declarations reverse CSS layer priority, so an earlier layered rule can beat a more specific unlayered exception.

**How to apply:** Verify the weight exists in the font source, inspect competing shared rules and their cascade layers, and place the exception in the winning layer when needed. For visual-editor headings, combine an explicit inline numeric weight with a higher-specificity component `!important` exception and disable `font-synthesis`; confirm the rendered result visually rather than relying only on declarations.

The authoritative typography layer must be declared before any component stylesheet first declares another layer. Application import order matters, not just rule order within the shared CSS file.

**Why:** Page CSS imported through application components can establish the base layer before the shared stylesheet loads. Its important rules then outrank the intended typography authority, even when the authority is declared first in its own file.

**How to apply:** Load the shared stylesheet before application/component modules that import CSS. Keep intentional size or weight exceptions in the correct winning layer rather than increasing specificity in a lower-priority layer.

For site-wide weight consistency, use the homepage's role scale: page-title heading 600, visible hero line 300, section and card headings 500, body copy 400, and labels, controls, statistics, and semantic emphasis 500. Preserve distinct hero and preloader treatments.

**Why:** The homepage is the visual reference for consistent weights across MECPL pages; aligning by role keeps hierarchy while preventing page-specific utilities from making equivalent text look heavier.

**How to apply:** Set shared weight tokens by semantic role, then verify computed weights across desktop routes. Keep compact annotation labels and call-to-action controls at their homepage-equivalent role weights instead of treating every paragraph or link identically.