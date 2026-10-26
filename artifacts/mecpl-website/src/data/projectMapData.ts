// Client-approved portfolio supplied in the October 2026 project-list workbook.
// The category gallery uses these records; the published map remains independent.
// Additional verified photographs: docs/project-map-photo-sources.json.
type ProjectRow = [
  name: string,
  client: string,
  location: string,
  type: "Industrial" | "Commercial" | "Residential",
  image?: string,
  imageSource?: string,
];

const completed: ProjectRow[] = [
  ["Mahindra Electric", "Mahindra Vehicle Manufactures Ltd", "Chakan", "Industrial", "MAHINDRA-1.webp"],
  ["Factory Building", "Chedda Electricals & Electronics Pvt Ltd", "Shirwal", "Industrial"],
  ["R & D Centre", "Praj Industries Ltd", "Pirangut", "Industrial", "PRAJ-INDUSTRIES.webp"],
  ["Factory Building", "Bekaert Industries", "Ranjangaon", "Industrial", "BEKAERT-INDUSTRIES-PVT.LTD_.webp"],
  ["Factory Building", "Amtek Auto Ltd", "Sanaswadi", "Industrial", "AMTEK-AUTO-LTD.webp"],
  ["Factory Building", "Amtek Auto Ltd", "Ranjangaon", "Industrial"],
  ["Factory Building", "Kumar Motars Pvt Ltd", "Pirangut", "Industrial", "kumar-motors-pirangut.jpg"],
  ["Panchshil Avenue", "Panchshil Group", "Kalyani Nagar", "Commercial"],
  ["Panchshil Business Park", "Panchshil Group", "Viman Nagar", "Commercial"],
  ["Gera Commerzone", "Raheja Group", "Kharadi", "Commercial", "KRC-scaled-e1700730314593.jpg"],
  ["Panchsil Tech Park - UGS II", "Panchshil Group", "Hinjewadi", "Commercial"],
  ["Eon Free Zone II", "Panchshil Group", "Kharadi", "Commercial", "eon-phase-ii-kharadi.jpg"],
  ["World Trade Center", "Panchshil Group", "Kharadi", "Commercial", "world-trade-center-official.webp", "https://www.panchshil.com/office-parks/world-trade-center"],
  ["Commercial Bldg", "Syntel International Pvt Ltd", "Talawade", "Commercial"],
  ["Service Apartments", "Accord Leisure Management Servises", "Baner", "Commercial"],
  ["Indira National School", "Shree Chanakya Education Society", "Thathawade", "Commercial"],
  ["GDST School Building", "GDST School", "Lavasa", "Commercial"],
  ["Indira College of Engineering & Management Phase III", "Shree Chanakya Education Society", "Wakad", "Commercial"],
  ["Engineering & Management College Campus", "Shree Chanakya Education Society", "Parandwadi", "Commercial", "indira-engineering-parandwadi.jpg"],
  ["Commercial Building", "Pride Magnus", "Baner", "Commercial"],
  ["Facility Bldg", "Starent Network Pvt ltd", "Hinjewadi", "Commercial"],
  ["Food Plaza", "Shree Vinayak Hospitality Pvt Ltd", "Lonavala", "Commercial", "triose-food-plaza-lonavala.jpg"],
  ["Global Development Center", "Syntel International Pvt Ltd", "Talawade", "Commercial", "syntel-global-development-talawade.jpg"],
  ["Marisoft IV - A Block (Orchid Hotel & Life Style)", "just Home Associates", "Kalyani Nagar", "Commercial"],
  ["Indira Universe Accadamic Campus", "Shree Chanakya Education Society", "Wakad", "Commercial"],
  ["Tata Research Centre", "Tata Consultancy Services", "Hadapsar", "Commercial", "tata-research-centre-hadapsar.jpg"],
  ["Bio-Tech Building", "INTERNATIONAL BIOTECH PARK", "Hinjewadi", "Commercial", "international-biotech-park-hinjewadi.jpg"],
  ["Multiplex Theatre & Shopping Complex", "VASCON ENGINEERS PVT. LTD.", "Kalyani Nagar", "Commercial"],
  ["Software Building", "XANSA INDIA LTD, MIDC", "Talewade", "Commercial", "xansa-india-talawade.jpg"],
  ["Residential Area, Business Centre, Airport Lounge & Base Hospital", "SAHARA INDIA COMMERCIAL CORPORATION LTD.", "Amby Valley", "Commercial"],
  ["Universal Temple for Shri. Ramakrishna", "RAMAKRISHNA MATH", "Dandekar Bridge, Pune", "Commercial", "Ramkrishna-Math.jpg"],
  ["Kalwa Plant - Refurbishing Project", "INTERNATIONAL BESTFOODS LTD.", "Thane", "Commercial"],
  ["MUWCI Phase - I MUWCI Phase - II", "MAHINDRA UNITED WORLD COLLEGE OF INDIA", "Paud", "Commercial", "mahindra-united-world-college.jpg"],
  ["Raheja Vistas - T7 to T10", "Raheja Group", "NIBM", "Residential", "Raheja-Vistas-scaled.jpg"],
  ["KP31 Bungalow", "Panchshil Group", "Koregaon Park", "Residential"],
  ["Raheja Sterling", "Raheja Group", "NIBM", "Residential"],
  ["Godrej Park Ridge / Godrej Sky Green", "Godrej Group", "Manjari", "Residential", "Godrej-Park-Ridge-.jpg"],
  ["Kalpataru Jade", "Kalpataru Group", "Baner", "Residential", "Kalpataru.jpeg"],
  ["Pride Atlantic Towers", "Pride Group", "Charoli", "Residential", "Atlantic.webp"],
  ["Godrej Nurture", "Godrej Group", "Mamurdi", "Residential", "nurture-scaled.jpg"],
  ["Godrej Forest Groove", "Godrej Group", "Mamurdi", "Residential", "Godrej-Forest-grove.jpg"],
  ["Godrej Rejuve", "Godrej Group", "Keshav Nagar", "Residential", "Rejuve.jpg"],
  ["Cereza", "Malpani Group", "Punawala", "Residential"],
  ["Godrej 24", "Godrej Group", "Hinjewadi", "Residential", "godrej-24-hinjewadi.jpg"],
  ["Kingsbury F & G", "Pride Group", "Charoli", "Residential", "Kingsbury.jpg"],
  ["Vivanta", "Malpani Group", "Balewadi", "Residential"],
  ["Highrise Towers", "Panchshil Group", "Kharadi", "Residential", "HIGH-RISE-1-scaled.jpg"],
  ["Godrej Infinity", "Godrej Group", "Keshav Nagar", "Residential", "GODREJ-INFINITY.jpg"],
  ["Gera's Greenville-IV- Song of Joy", "Gera Developers", "Kharadi", "Residential", "gera-songs-of-joy-01-large.webp"],
  ["Pride World City", "Pride Group", "Charoli", "Residential", "pride-world-city-charoli.jpg"],
  ["Gera's Green Trinity Towers", "Gera Developers", "Kharadi", "Residential", "gera-green-trinity-kharadi.jpg"],
  ["Residential Towers", "Panchshil Group", "Lohia Nagar", "Residential"],
  ["Nandan Euphora", "NANDAN BUILDCON", "Dhanori", "Residential"],
  ["Construction of RCC Work for Trump Tower", "PANCHSHIL GROUP", "Kalyani Nagar", "Residential", "Trump-Tower.jpg"],
  ["Yoo Villas", "PANCHSHIL GROUP", "Wagholi", "Residential", "yoovilla-1.webp"],
  ["Nandan Aspira & Festive", "NANDAN BUILDERS", "Aundh", "Residential"],
  ["Nandan Edura", "NANDAN BUILDCON", "Erandwane", "Residential", "nandan-edura-erandwane.jpg"],
  ["NP3 Villas", "LAVASA CORPORATION LTD", "Lavasa", "Residential"],
  ["Construction of HDH Building", "NANDAN ASSOCIATES", "Balewadi", "Residential"],
  ["Saphire Park", "PRIDE PURPLE", "Wakad", "Residential"],
  ["Villas", "LAVASA CORPORATION LTD", "Lavasa", "Residential", "lavasa-villas.jpg"],
];

const ongoing: ProjectRow[] = [
  ["Panchshil SRA Bldg's", "Bluerays Developers LLP", "Dhanori", "Residential", "SRA-DHANORI-scaled.jpg"],
  ["Pride - Wellington Phase I + Miami + Montreal", "Pride Group", "Charoli", "Residential", "WhatsApp-Image-2025-05-06-at-17.24.37_0a4a5d3c-scaled.jpg"],
  ["Panchshil Villas", "Panchshil Infrastructure Holdings Pvt Ltd", "Wagholi", "Residential"],
  ["VTP - Sierra + Mhada", "M/S Prasanna Developers", "Sus - Pashan", "Residential", "VTP-scaled.jpg"],
  ["Malpani Soul String", "Malpani Estates", "Pashan", "Residential", "Malpani-Soul-String-scaled.jpg"],
  ["Raheja Vistas - T1 to T3", "Cavalcade Properties Pvt Ltd", "NIBM", "Residential", "Raheja-Vistas-scaled.jpg"],
  ["ANP Autograph", "ANP Landmarks LLP", "Punawale", "Residential", "anp-autograph-official.webp", "https://www.anpcorp.in/anp-autograph"],
  ["Bungalow Khandala", "Casa Maria Properties LLP", "Khandala", "Residential"],
  ["Riverdale Grand", "Duvilles Estates", "Kharadi", "Residential"],
  ["Lodha Giardino - MLCP + Towers", "Lodha Group", "Kharadi", "Residential"],
  ["Godrej Emerald Waters + Optimum Towers", "Godrej Properties Ltd", "Pimpri", "Residential", "Godrej-Emerald-Waters.jpg"],
  ["Solitaire World Kothrud", "Built To Live Realty Development No.1 LLP", "Kothrud", "Residential", "2.Solitaire-World-Kothrud.jpg"],
  ["The Lords, Pristine", "Kanha Buildspaces LLP", "Pashan", "Residential"],
  ["Godrej Evergreen Square", "Godrej Projects Development Ltd", "Hinjewadi PH III", "Residential"],
  ["Godrej Aqua Retreat", "Maan-Hinje Township Developers Private Limited.", "Hinjewadi", "Residential"],
  ["Lodha Sylvan", "Lodha Group", "Hinjewadi PH III", "Residential"],
  ["Pride Valencia", "Pride Group", "Charoli", "Residential"],
  ["ANP Universe", "ANP Lifespaces LLP", "Balewadi", "Commercial", "anp-universe-official.webp", "https://www.anpcorp.in/anp-universe"],
  ["Panchshil - Vantage Tower A & B", "P-One Infrastructure Pvt Ltd", "Wagholi", "Commercial"],
  ["Raheja Baner B94 - 97", "Pact Real Estate Pvt Ltd", "Baner", "Commercial"],
  ["Panchshil Divya Yash", "LA - Com Consultancy LLP", "Bavdhan", "Commercial"],
  ["Raheja K - 57", "K Raheja Corp", "Kharadi", "Commercial"],
  ["Omicron 39", "Omicron F5 Business Landmarks", "Baner", "Commercial"],
  ["Eon 42", "Eon Kharadi Infrastructure Pvt Ltd", "Kharadi", "Commercial"],
  ["Xcaliber Infotech Pvt. Ltd", "Xcaliber Infotech Pvt. Ltd", "Hinjewadi PH III", "Commercial"],
];

function mapRows(rows: ProjectRow[], status: "Completed" | "Ongoing") {
  return rows.map(([name, client, location, type, image, imageSource], index) => ({
    id: `${status.toLowerCase()}-${index + 1}`,
    name, client, location, type, status,
    image: image ? `${import.meta.env.BASE_URL}assets/projects/${image}` : undefined,
    imageSource,
  }));
}

export const workbookProjects = [
  ...mapRows(completed, "Completed"),
  ...mapRows(ongoing, "Ongoing"),
];

export const projectMapProjects = workbookProjects;

// Editorial positions, not surveyed coordinates. The workbook supplies localities only.
const positions: Record<string, [number, number]> = {
  Chakan: [58, 17], Shirwal: [52, 91], Pirangut: [27, 62],
  Ranjangaon: [87, 36], Sanaswadi: [83, 45], "Kalyani Nagar": [66, 53],
  "Viman Nagar": [70, 46], Hinjewadi: [37, 37], Kharadi: [78, 55],
  Talawade: [49, 24], Baner: [45, 48], Tathawade: [40, 30],
  Lavasa: [18, 75], Wakad: [45, 37], Parandwadi: [33, 24],
  Lonavala: [25, 17], Hadapsar: [74, 70], "Amby Valley": [18, 32],
  "Dandekar Bridge, Pune": [52, 72], Thane: [12, 10], Paud: [24, 52],
  NIBM: [63, 81], "Koregaon Park": [65, 62], Manjari: [84, 73],
  Charoli: [65, 29], Mamurdi: [40, 20], "Keshav Nagar": [80, 64],
  Punawale: [35, 30], Balewadi: [43, 43], "Lohia Nagar": [57, 65],
  Dhanori: [65, 40], Wagholi: [85, 55], Aundh: [51, 48],
  Erandwane: [45, 66], "Sus - Pashan": [33, 46], Pashan: [38, 52],
  Khandala: [17, 18], Pimpri: [53, 33], Kothrud: [37, 68],
  "Hinjewadi PH III": [29, 38], Bavdhan: [31, 58],
};

const localityAliases: Record<string, string> = {
  Talewade: "Talawade", Thathawade: "Tathawade", Punawala: "Punawale",
};

function groupLocations() {
  const groups = new Map<string, {
    name: string;
    left: number;
    top: number;
    projects: typeof projectMapProjects;
  }>();

  for (const project of projectMapProjects) {
    const name = localityAliases[project.location] ?? project.location;
    const position = positions[name];
    if (!position) throw new Error(`Missing editorial map position for ${name}`);
    let group = groups.get(name);
    if (!group) {
      group = { name, left: position[0], top: position[1], projects: [] };
      groups.set(name, group);
    }
    group.projects.push(project);
  }
  return [...groups.values()];
}

export const projectMapLocations = groupLocations();
