---
name: MECPL Projects map direction
description: Why the Projects page uses a static editorial silhouette instead of a street map.
---

Use the static editorial Pune-region silhouette with red selectable project dots on the MECPL Projects page. Keep the large project image on the left and the selected project image/details on the right.

**Why:** The user explicitly asked to restore the earlier reference design. It matches the site’s editorial visual language and avoids the mobile reliability issue previously encountered with WebGL mapping.

**How to apply:** Preserve the three-part composition and responsive stacking. Keep project dots interactive, but do not replace the silhouette with Leaflet, MapLibre, or another street-map implementation unless the user changes direction.

Keep the map as shown on the `gh-pages` branch, rather than the workbook-based replacement.

**Why:** On 2026-10-24 the user explicitly withdrew the map/photo changes and said, “keep it how it is in gh-pages.”

**How to apply:** Preserve the published map's individual project dots, original photo cards and interactions. Do not reintroduce the workbook selector, grouped counts or additional photo mappings unless requested again.

The category-tab gallery must show only the client-approved workbook projects, independently of the unchanged map.

**Why:** The user supplied the approved list and explicitly said, “only update category wise project , do not update map.” When adding client names, they later confirmed using the spreadsheet’s full project list rather than retaining the existing gallery subset.

**How to apply:** Use workbook names, clients, locations, categories and statuses for gallery cards. Do not add unlisted projects or let gallery filtering/data changes alter the map's existing selection.