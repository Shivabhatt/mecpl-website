---
name: Browser verification
description: Avoid unnecessary browser installations and slow filesystem searches during rendered UI checks.
---

Check `command -v chromium` before assuming Playwright needs a new browser download. The environment provides system Chromium at `/repl/tools/bin/chromium`; existing Playwright tooling can launch it with an explicit executable path.

**Why:** An available Playwright package does not guarantee that its version-specific browser cache exists. Searching entire mounted worktrees for browser assets can traverse enormous dependency trees and time out.

**How to apply:** Resolve existing test tooling with targeted checks, then use system Chromium if the default cached executable is missing. Do not scan all of `/mnt` or install another browser merely because Playwright's expected cache path is absent.

Wait for the site's startup overlay to finish before capturing rendered sections; DOM availability and computed styles do not prove the underlying page is visible.

**Why:** Repeated short captures showed the black MECPL intro instead of the requested section even though the page DOM was already present.

**How to apply:** In browser checks, wait for the intro overlay to disappear before scrolling to and capturing the target section. Do not change or bypass the shipped preloader to obtain screenshots.