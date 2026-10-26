"""Check gallery records against the client-approved workbook, without dependencies."""
import json
import re
import sys
import zipfile
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
WORKBOOK = ROOT / "attached_assets/Project_Details_-_Till_Date_(1)_(1)_1792840011505.xlsx"
DATA = ROOT / "artifacts/mecpl-website/src/data/projectMapData.ts"
NS = {"s": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def normalize(value):
    return " ".join(value.split())


def workbook_projects():
    projects = []
    with zipfile.ZipFile(WORKBOOK) as archive:
        strings = [
            "".join(element.itertext())
            for element in ElementTree.fromstring(archive.read("xl/sharedStrings.xml")).findall("s:si", NS)
        ]
        for sheet, status in [("sheet1", "Completed"), ("sheet2", "Ongoing")]:
            category = None
            index = 0
            root = ElementTree.fromstring(archive.read(f"xl/worksheets/{sheet}.xml"))
            for row in root.findall(".//s:row", NS):
                cells = {}
                for cell in row.findall("s:c", NS):
                    value = cell.find("s:v", NS)
                    if value is not None:
                        text = strings[int(value.text)] if cell.get("t") == "s" else value.text
                        cells[re.sub(r"\d", "", cell.get("r"))] = normalize(text)
                if cells.get("B") in ["Residential", "Commercial", "Industrial"] and not cells.get("C"):
                    category = cells["B"]
                if cells.get("A", "").isdigit() and cells.get("B") and cells.get("C"):
                    if category is None:
                        raise ValueError("Project appears before its category")
                    index += 1
                    projects.append({
                        "id": f"{status.lower()}-{index}",
                        "name": cells["B"],
                        "client": cells["C"],
                        "location": cells["D"],
                        "type": category,
                        "status": status,
                    })
    return projects


def verify():
    expected = workbook_projects()
    actual = []
    source = DATA.read_text()
    for status, body in re.findall(r"const (completed|ongoing): ProjectRow\[\] = \[([\s\S]*?)\n\];", source):
        for index, line in enumerate(body.strip().splitlines(), 1):
            name, client, location, category, *_ = json.loads(line.strip().rstrip(","))
            actual.append({
                "id": f"{status}-{index}", "name": name, "client": client,
                "location": location, "type": category, "status": status.title(),
            })
    if actual != expected:
        raise ValueError("Gallery data differs from the approved workbook")
    if len(expected) != 86:
        raise ValueError(f"Expected 86 approved projects, found {len(expected)}")
    return expected


if __name__ == "__main__":
    projects = verify()
    if "--json" in sys.argv:
        print(json.dumps(projects))
    else:
        print(f"All {len(projects)} projects match the client-approved workbook.")
        print("Categories:", dict(Counter(project["type"] for project in projects)))
        print("Statuses:", dict(Counter(project["status"] for project in projects)))
