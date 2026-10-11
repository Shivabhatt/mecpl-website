from pathlib import Path
import pymupdf

pdf = Path('attached_assets/COMPANY_PROFILE_2026_(1)_1791708267344.pdf')
out = Path('.agents/outputs/company-profile-2026')
out.mkdir(parents=True, exist_ok=True)
doc = pymupdf.open(pdf)
text_rows = []
for i, page in enumerate(doc):
    text = page.get_text('text')
    text_rows.append(f'===== PAGE {i+1} =====\n{text}\n')
    page.get_pixmap(matrix=pymupdf.Matrix(1.25, 1.25), alpha=False).save(out / f'page-{i+1:02d}.png')
(out / 'all-text.txt').write_text('\n'.join(text_rows), encoding='utf-8')
print(f'pages={len(doc)} rendered={out}')
for i, page in enumerate(doc):
    text=page.get_text('text')
    if any(term in text.lower() for term in ['safety award','quality award','vishwakarma','pcerf','award']):
        print(f'--- PAGE {i+1} ---')
        print(text[:4500])
