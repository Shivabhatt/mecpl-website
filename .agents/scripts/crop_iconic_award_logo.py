"""Capture the genuine 2018 award badge from the supplied company profile."""
from pathlib import Path
import pymupdf as fitz

source = "attached_assets/COMPANY_PROFILE_2026_(1)_1791708267344.pdf"
target = Path("artifacts/mecpl-website/public/assets/awards/iconic-brand-2018.png")
with fitz.open(source) as profile:
    page = profile[24]
    badge = page.get_pixmap(
        matrix=fitz.Matrix(3, 3),
        clip=fitz.Rect(207, 230, 398, 425),
        alpha=False,
    )
    badge.save(target)
    print(target, badge.width, badge.height)
