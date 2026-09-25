---
name: MECPL dependency install
description: Environment-specific package installation constraint for the imported MECPL monorepo.
---

When bringing up the MECPL website preview, install the website dependency graph with a filtered frozen-lockfile install instead of installing every workspace package. When adding a dependency to this workspace, target the website package explicitly with a pnpm filter; the generic package installer attempts a root add, which pnpm rejects.

**Why:** The full workspace install currently reaches the Replit package firewall while fetching the API code-generation tool Orval, even though the website does not depend on it. The package installer also has no workspace selector, so its root-level add triggers pnpm's workspace-root guard.

**How to apply:** Use the website workspace filter for preview-only installs and dependency additions. Handle the API/database and code-generation dependency graph separately when those services are actually needed.