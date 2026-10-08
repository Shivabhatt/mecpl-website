---
name: MECPL preloader direction
description: User-supplied Framer reference and the intended loading-screen treatment.
---

Use the user's replacement image-expansion reference on a black screen, with the MECPL logo, divider, “Millennium,” a project image between “Millennium” and “Engineers & Contractors,” and “PVT. LTD.” on a second line. The user explicitly moved this design off the hero and onto the preloader. The project image is 60×60px on desktop and scales down at phone widths to keep the lockup on screen.

Reference: https://fabulous-environment-467627.framer.app/

**Why:** The user rejected the five-panel loader and supplied this replacement, then clarified that the full correct-spelling logo-and-name lockup belongs on the preloader, not the hero. They also asked for a prominent 60×60px project image, with smaller sizing at phone widths so the lockup fits, and required the website to start from its beginning after the loader.

**How to apply:** Preserve image cycling and full-screen expansion using MECPL's own images, keeping the logo, divider, and correctly spelled company name in one centered row. On startup, reset scroll to the top and delay the first hero video's playback and rotation until the reveal. Keep the hero's existing label and headline unchanged, preserve subsequent in-site navigation, and do not add the Framer runtime merely to render the loader.

Keep “PVT. LTD.” centered within the brand-copy area when adjusting its letter spacing; do not left-align it.

**Why:** The user clarified that the subtitle should remain centered.

**How to apply:** Limit future subtitle styling changes to its typography unless the user asks to reposition it.