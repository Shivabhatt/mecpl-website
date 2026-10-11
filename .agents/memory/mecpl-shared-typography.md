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

Use the centralized Barlow Condensed/Manrope typography on Home and About, and apply the same font families to Projects (including completed and ongoing projects), Certifications, Awards, and Careers.

**Why:** The user expanded the shared typography rollout to these additional page groups.

**How to apply:** Keep sizing, layout, and casing page-owned unless specifically requested; leave other routes outside this scope unchanged. The common footer uses the Home preset site-wide as separately requested.

While editing other routes, do not alter About page typography or copy; preserve its last-build state unless the user explicitly reopens that scope.

**Why:** The user explicitly repeated that About should remain unchanged while other page work continues.

**How to apply:** Keep About-specific changes scoped to an explicit About request, and avoid broad shared typography edits that change About unintentionally.

Verify every visible text role, not just font-family declarations: headings, body, labels, statistics, nested spans, founder credits, cards, testimonials, navigation and footer.

**Why:** Earlier typography changes were visually inconsistent despite declared fonts, particularly when legacy important styles or nested elements overrode the intended roles. A role class can also silently fall back when its required ancestor wrapper is absent.

**How to apply:** Check rendered wrapping and computed family, size, weight, line height, casing and letter spacing. Confirm the page wrapper activates the chosen role, and extend the active shared typography selectors for new sections rather than adding local overrides. Also verify font faces actually loaded and check a non-Home route for unintended changes.

For Home and About casing, keep banner headings uppercase and other main headings in Title Case. On About, render the specified section labels—Our story, Our purpose, Our values, Our journey, Our founder, Our leadership, Awards & certifications, Today, we build across, and The journey continues—in uppercase; keep other supporting copy in sentence case.

**Why:** The user specified the general Home/About casing, then explicitly requested all caps for these About section labels.

**How to apply:** Preserve other heading and explanatory copy. Scope the uppercase exception to the named About labels, and do not let CSS `capitalize` alter intentional lowercase words in unrelated titles.

For Projects, Certifications, Awards, and Careers, use 80px medium-weight (500) uppercase Barlow Condensed banners, 48px Title Case Barlow section headings, sentence-case Manrope copy, and 10px uppercase Manrope labels.

**Why:** The user asked these pages to match the typography and casing patterns used on Home, About, and Careers.

**How to apply:** Use Barlow Condensed for banners and main section headings, Manrope for body/UI, and keep About itself unchanged during work on these routes.

Important CSS cascade-layer priority can outrank selector specificity in this project.

**Why:** Component-local important overrides previously lost to the existing shared typography layer.

**How to apply:** Keep typography precedence deliberate in the central configuration; inspect layer priority before increasing selector specificity.