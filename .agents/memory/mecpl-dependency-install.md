---
name: MECPL dependency install
description: Environment-specific package installation constraint for the imported MECPL monorepo.
---

When bringing up the MECPL website preview, install the website dependency graph with a filtered frozen-lockfile install instead of installing every workspace package.

**Why:** The full workspace install currently reaches the Replit package firewall while fetching the API code-generation tool Orval, even though the website does not depend on it. The filtered website install completes and is sufficient for the preview.

**How to apply:** Use the website workspace filter for preview-only work. Handle the API/database and code-generation dependency graph separately when those services are actually needed.