---
name: MECPL mobile asset verification
description: How to distinguish missing assets from mobile preview rendering or stale-capture reports on the MECPL homepage.
---

For homepage project photos and client logos, verify the exact mobile viewport in a real browser before changing asset paths or layout. A successful image load is confirmed by `complete`, nonzero `naturalWidth`/`naturalHeight`, visible computed styles, and a rendered section capture; HTTP 200 alone is not sufficient.

**Why:** Mobile screenshots can show an earlier or stale preview state even when the current bundle loads and renders the same assets correctly. Replacing working responsive behavior based only on the screenshot risks regressing the page.

**How to apply:** Reproduce at 402×874, inspect the selected project and visible client cards, then patch only if the DOM metrics or rendered capture still fail. Keep the existing root-relative asset behavior when `BASE_PATH="/"`.