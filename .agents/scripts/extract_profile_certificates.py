"""Extract original certificate images, without the surrounding profile page."""
from pathlib import Path
import subprocess
import math
import pymupdf as fitz

document = fitz.open("attached_assets/COMPANY_PROFILE_2026_(1)_1791708267344.pdf")
output = Path("artifacts/mecpl-website/public/assets/awards/profile-certificates")
output.mkdir(parents=True, exist_ok=True)
temporary = Path("/tmp/mecpl-profile-certificate-images")
temporary.mkdir(parents=True, exist_ok=True)
images = {}
for page_number in range(8, 33):
    if page_number == 27:  # Small Giants letter, not one of the Awards issuer groups.
        continue
    page = document[page_number - 1]
    blocks = sorted([
        image for image in page.get_image_info(xrefs=True)
        if fitz.Rect(image["bbox"]).width > 150 and fitz.Rect(image["bbox"]).height > 90
    ], key=lambda image: image["bbox"][1])
    for index, block in enumerate(blocks, 1):
        name = f"profile-p{page_number:02d}-{index}.webp"
        original = fitz.Pixmap(document, block["xref"])
        if original.colorspace and original.colorspace.n != 3:
            original = fitz.Pixmap(fitz.csRGB, original)
        png = temporary / name.replace(".webp", ".png")
        original.save(png)
        images[(page_number, index)] = png
        if page_number == 22 or (page_number == 32 and index == 2):
            # ISO certificate and Maharashtra safety-week certificate have no
            # matching Awards issuer card; don't publish unrelated documents.
            (output / name).unlink(missing_ok=True)
            continue
        angle = round(math.degrees(math.atan2(block["transform"][1], block["transform"][0])))
        if (page_number, index) == (32, 1):
            angle = 180  # This legacy certificate was scanned upside down.
        rotation = ["-rotate", str(angle)] if angle else []
        subprocess.run([
            "convert", str(png), *rotation, "-resize", "1400x1600>", "-quality", "87",
            "-define", "webp:method=6", str(output / name),
        ], check=True)
        print(name, (output / name).stat().st_size, f"rotation={angle}")

# A temporary visual check for certificates whose issuer needs confirming.
checks = [(11, 1), (11, 2), (12, 1), (17, 1), (20, 1), (21, 1), (22, 1), (32, 1), (32, 2)]
sheet = fitz.open()
canvas = sheet.new_page(width=1500, height=1650)
for index, key in enumerate(checks):
    x, y = (index % 3) * 500, (index // 3) * 550
    canvas.insert_image(fitz.Rect(x + 8, y + 8, x + 492, y + 515), filename=str(images[key]))
    canvas.insert_text((x + 12, y + 538), f"Profile page {key[0]}, image {key[1]}", fontsize=14)
canvas.get_pixmap().save("/tmp/profile-certificates-check.png")
