from pathlib import Path
import fitz

source = Path("attached_assets/COMPANY_PROFILE_2026_(1)_1791708267344.pdf")
output = Path(".agents/outputs/company-profile-2026")
output.mkdir(parents=True, exist_ok=True)
document = fitz.open(source)
for start in range(0, len(document), 20):
    sheet = fitz.open()
    canvas = sheet.new_page(width=1200, height=950)
    for position, page_number in enumerate(range(start, min(start + 20, len(document)))):
        x, y = (position % 4) * 300, (position // 4) * 190
        page = document[page_number]
        preview = page.get_pixmap(matrix=fitz.Matrix(285 / page.rect.width, 285 / page.rect.width))
        canvas.insert_image(fitz.Rect(x + 5, y + 5, x + 290, y + 167), pixmap=preview)
        canvas.insert_text((x + 8, y + 185), f"Page {page_number + 1}", fontsize=12)
    target = output / f"certificates-contact-{start // 20 + 1}.png"
    canvas.get_pixmap().save(target)
    print(target)
