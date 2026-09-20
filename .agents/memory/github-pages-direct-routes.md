---
name: GitHub Pages direct routes
description: How to preserve HTTP 200 responses for direct links to MECPL client-side routes on GitHub Pages.
---

Generate a copy of the built app shell for every public client-side route in both clean-URL and trailing-slash forms. Keep `404.html` only as a fallback for unknown paths.

**Why:** GitHub Pages does not provide arbitrary SPA rewrites. Serving the app from `404.html` can render the correct client route, but the HTTP status remains 404 and fails direct-link requirements.

**How to apply:** Whenever a public route or static blog slug is added or removed, update the production route-shell list in the same change and verify the generated files match the root app shell.