"""Export the visually verified profile photographs without page captions/borders.

Run from the repository root with PyMuPDF available. The manifest records the
user-supplied source, page numbers and exact image choices for reproducibility.
These small, optimized static assets follow the website's existing asset hosting
so its independent static build does not acquire an API/storage dependency.
"""
import json
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
WEBSITE = ROOT / "artifacts/mecpl-website"
manifest = json.loads((WEBSITE / "docs/project-map-photo-sources.json").read_text())
document = fitz.open(ROOT / manifest["source"])
destination = WEBSITE / "public/assets/projects"

for photo in manifest["photos"]:
    page = document[photo["page"] - 1]
    image = page.get_images(full=True)[photo["imageIndex"]]
    # Raw embedded bitmaps can be flipped or stretched. Rendering the exact
    # image rectangle applies the PDF's display transform and keeps the source
    # photograph's intended orientation/proportions, without text or borders.
    rectangle, = page.get_image_rects(image[0])
    longest_edge = min(1280, max(image[2], image[3]))
    zoom = longest_edge / max(rectangle.width, rectangle.height)
    pixmap = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=rectangle, alpha=False)
    path = destination / photo["filename"]
    path.write_bytes(pixmap.tobytes("jpg", jpg_quality=82))
    print(f"{photo['id']}: {path.name} ({pixmap.width}x{pixmap.height}, {path.stat().st_size} bytes)")
