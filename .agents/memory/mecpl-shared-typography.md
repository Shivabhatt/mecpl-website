---
name: MECPL shared typography
description: Home and About rollout of the supplied Barlow Condensed/Manrope specification through one reusable typography configuration.
---

Follow the user's supplied typography specification on Home and About: Barlow Condensed for display headings and statistics, Manrope for body/UI/card text, with the specified role-based sizes, weights, spacing and responsive values.

**Why:** The user supplied a new specification and requested its application to Home, then asked to extend the same shared system to About.

**How to apply:** Preserve content, media, colors and layouts. Apply uppercase only to the roles named by the specification, not whole sections or body paragraphs. Keep the entire “Rising as we speak” title black as separately requested.

Centralize reusable font configuration and named text roles in one shared file, rather than duplicating typography values in inline styles or individual components.

**Why:** The user explicitly wants a clear single reference for each font/style combination, usable throughout the website.

**How to apply:** Components should reference the central role definitions. Treat the shared preset as the typography source of truth rather than adding another page-specific font override.

Activate the new specification on Home and About only until the user requests rollout to other pages.

**Why:** The user first limited rollout to Home, then specifically requested Home and About.

**How to apply:** Keep other routes' page content unchanged; shared navigation only receives the preset on Home or About. The common footer uses the Home preset site-wide as separately requested.

Verify every visible text role, not just font-family declarations: headings, body, labels, statistics, nested spans, founder credits, cards, testimonials, navigation and footer.

**Why:** Earlier typography changes were visually inconsistent despite declared fonts, particularly when legacy important styles or nested elements overrode the intended roles.

**How to apply:** Check rendered wrapping and computed family, size, weight, line height, casing and letter spacing. Also verify font faces actually loaded and check a non-Home route for unintended changes.

For Home and About casing, keep banner headings uppercase and other main headings in Title Case. On About, render the specified section labels—Our story, Our purpose, Our values, Our journey, Our founder, Our leadership, Awards & certifications, Today, we build across, and The journey continues—in uppercase; keep other supporting copy in sentence case.

**Why:** The user specified the general Home/About casing, then explicitly requested all caps for these About section labels.

**How to apply:** Preserve other heading and explanatory copy. Scope the uppercase exception to the named About labels, and do not let CSS `capitalize` alter intentional lowercase words in unrelated titles.

Important CSS cascade-layer priority can outrank selector specificity in this project.

**Why:** Component-local important overrides previously lost to the existing shared typography layer.

**How to apply:** Keep typography precedence deliberate in the central configuration; inspect layer priority before increasing selector specificity.