from pathlib import Path

import fitz


pdf_path = Path("attached_assets/MECPL_BRAND_GUIDELINES_1788095124226.pdf")
output_dir = Path(".agents/outputs/mecpl-brand-guidelines")
output_dir.mkdir(parents=True, exist_ok=True)

document = fitz.open(pdf_path)
for page_number, page in enumerate(document, start=1):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pixmap.save(output_dir / f"page-{page_number}.png")
    (output_dir / f"page-{page_number}.txt").write_text(
        page.get_text(),
        encoding="utf-8",
    )

print(f"Rendered {document.page_count} pages to {output_dir}")