from pathlib import Path
import fitz

source = "attached_assets/COMPANY_PROFILE_2026_(1)_1790940156656.pdf"
output = Path(".agents/outputs/certifications")
output.mkdir(parents=True, exist_ok=True)
doc = fitz.open(source)
print("Pages:", len(doc))
for start in range(0, len(doc), 20):
    sheet_doc = fitz.open()
    sheet = sheet_doc.new_page(width=1000, height=850)
    for index in range(start, min(start + 20, len(doc))):
        page = doc[index]
        pix = page.get_pixmap(matrix=fitz.Matrix(240 / page.rect.width, 240 / page.rect.width))
        x, y = ((index - start) % 4) * 250, ((index - start) // 4) * 170
        sheet.insert_image(fitz.Rect(x, y + 20, x + 240, y + 165), stream=pix.tobytes("png"), keep_proportion=True)
        sheet.insert_text((x + 5, y + 12), f"Page {index + 1}", fontsize=10)
    sheet.get_pixmap().save(output / f"sheet-{start + 1}.png")
    sheet_doc.close()
for index, page in enumerate(doc):
    text = page.get_text()
    if any(term in text.lower() for term in ("certification", "greenpro", "iso 9001", "iso 14001", "iso 45001", "crisil")):
        print(f"\n--- PAGE {index + 1} ---\n{text[:6500]}")
        page.get_pixmap(matrix=fitz.Matrix(1, 1)).save(output / f"page-{index + 1}.png")
        (output / f"page-{index + 1}.txt").write_text(text)