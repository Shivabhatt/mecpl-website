---
name: MECPL media optimization
description: Media-size and loading constraints for MECPL's static website.
---

For MECPL's static website, optimize project JPEGs in place when their URLs are widely shared, use WebP for large project PNGs, and transcode muted background MP4s with fast-start metadata, no audio, and a bounded width. Add first-frame posters so media sections paint before video buffering completes.

**Why:** The original homepage and project videos were multi-megabyte 1080p files, and several project images exceeded 0.7 MB; the browser could take long enough to make sections appear empty even though the assets eventually loaded.

**How to apply:** Keep original filenames for broadly referenced JPEG/MP4 assets, preserve visual dimensions and responsive CSS, and verify actual `transferSize` through a clean browser run after every media batch. Do not preload every rotating video at initial page load.