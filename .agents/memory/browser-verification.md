---
name: Browser verification
description: Avoid unnecessary browser installations and slow filesystem searches during rendered UI checks.
---

Check `command -v chromium` before assuming Playwright needs a new browser download. The environment provides system Chromium at `/repl/tools/bin/chromium`; existing Playwright tooling can launch it with an explicit executable path.

**Why:** An available Playwright package does not guarantee that its version-specific browser cache exists. Searching entire mounted worktrees for browser assets can traverse enormous dependency trees and time out.

**How to apply:** Resolve existing test tooling with targeted checks, then use system Chromium if the default cached executable is missing. Do not scan all of `/mnt` or install another browser merely because Playwright's expected cache path is absent.

Wait for the site's startup overlay to finish before capturing rendered sections; DOM availability and computed styles do not prove the underlying page is visible.

**Why:** Repeated short captures showed the black MECPL intro instead of the requested section even though the page DOM was already present. The `_preloaderDone` flag may become true before the overlay has been removed, so it is not sufficient for interaction checks.

**How to apply:** In browser checks, wait for `.mecpl-preloader` to become hidden or detach before interacting with, scrolling to, or capturing the target section. Do not change or bypass the shipped preloader to obtain screenshots.

When a fresh render disagrees with a successful edit result, recheck the current source before assuming a cache or hot-reload problem.

**Why:** The current source has differed from an earlier acknowledged patch during live editing; changing CSS alone cannot correct markup that is no longer present.

**How to apply:** Treat the latest file contents and fresh browser output as authoritative. Reconcile them before trying additional overrides, and preserve unrelated intervening edits.

Install Playwright's mocked clock before navigation when testing React timer lifecycles, not after the page has mounted.

**Why:** Timers scheduled with the original browser APIs are outside the mocked clock. Installing it later can make fake cleanup leave native timers running, producing apparent autoplay and pause failures even when the component cleanup is correct.

**How to apply:** Install the clock before opening the page, let startup finish, then pause it using the browser's current time before testing timing boundaries.