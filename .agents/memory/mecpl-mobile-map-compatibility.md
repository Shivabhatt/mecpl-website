---
name: MECPL Projects map direction
description: Why the Projects page uses a static editorial silhouette instead of a street map.
---

Use the static editorial Pune-region silhouette with red selectable project dots on the MECPL Projects page. Keep the large project image on the left and the selected project image/details on the right.

**Why:** The user explicitly asked to restore the earlier reference design. It matches the site’s editorial visual language and avoids the mobile reliability issue previously encountered with WebGL mapping.

**How to apply:** Preserve the three-part composition and responsive stacking. Keep project dots interactive, but do not replace the silhouette with Leaflet, MapLibre, or another street-map implementation unless the user changes direction.