import fitz
from pathlib import Path
pdf = Path('attached_assets/MECPL_BRAND_GUIDELINES_1789840227402.pdf')
out = Path('.agents/outputs/mecpl-brand')
doc = fitz.open(pdf)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    pix.save(out / f'page-{i+1}.png')
    (out / f'page-{i+1}.txt').write_text(page.get_text(), encoding='utf-8')
print(f'rendered {doc.page_count} pages')
