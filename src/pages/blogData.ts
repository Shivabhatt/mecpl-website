export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  publishedDate: string;
  category: string;
  heroImage: string;
  deck: string;
  intro: string;
  highlights: string[];
  sections: BlogSection[];
  closing: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "construction-industry-trends",
    title: "Construction Industry Trends to Watch Out For",
    publishedDate: "April 13, 2018",
    category: "Industry Trends",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
    deck: "Technology, sustainability, and modular delivery are reshaping how modern construction teams plan and execute projects.",
    intro: "Keeping a close eye on current trends in the construction industry is indispensable for builders and contractors to stay ahead of the curve. Technological advancements have brought a new wave of applications and modernized the old processes. The construction industry is moving toward green buildings, utilization of building information modeling, implementation of AR and VR, and development of modular homes.",
    highlights: ["Green buildings", "BIM", "AR and VR", "Modular construction"],
    sections: [
      {
        heading: "Green Buildings",
        paragraphs: [
          "The rise in environmental awareness among consumers has shifted buying preferences. Contractors and engineers are increasingly designing eco-friendly homes, using sustainable building materials, and pursuing Leadership in Energy and Environmental Design (LEED) certification.",
          "According to the US Green Building Council, the green building industry in India is expected to grow rapidly because of government regulations and higher awareness. The cost of green buildings is often lower than conventional construction, so this trend continues to accelerate.",
        ],
      },
      {
        heading: "Building Information Modeling (BIM)",
        paragraphs: [
          "BIM creates a collaborative work environment among designers, engineers, suppliers, builders, and customers through 3D models. That collaboration leads to efficient, cost-effective, and sustainable solutions while reducing the chance of late-stage design errors.",
          "The NBS National BIM report found that most manufacturers believe BIM is central to the future of construction. Engineers and contractors in Pune have embraced it to manage complexity, improve safety, and even extend model planning into 6D workflows.",
        ],
      },
      {
        heading: "Implementation of VR and AR",
        paragraphs: [
          "Virtual reality models help engineers, designers, builders, and contractors visualize structures without depending on conventional scaled-up models. VR improves precision, supports client collaboration, and makes the 'try before you buy' approach practical.",
          "Construction teams are now merging VR with augmented reality for more accurate measurements, faster reviews, and better material details. Drones and real-time inspection tools are also becoming part of the same digital ecosystem.",
        ],
      },
      {
        heading: "Development of Modular Homes",
        paragraphs: [
          "Modular homes are built off-site and transported to the final construction site without compromising quality. They are especially useful at remote locations and suburban sites because work can begin once permits are in place.",
          "Modular construction is generally cheaper, faster, and more efficient than conventional on-site work. Some modular systems can also be disassembled and transported later, which makes them appealing for projects that need flexibility.",
        ],
      },
      {
        heading: "Why it matters",
        paragraphs: [
          "These major trends show that builders, engineers, and suppliers need to keep modernizing their projects to achieve better efficiency, lower costs, and stronger long-term profitability.",
        ],
      },
    ],
    closing: "Millennials have been finding innovative ways to use technology in the construction industry, and the companies that adapt fastest will set the pace for the next decade.",
  },
  {
    slug: "construction-site-material-storage",
    title: "How to Store Building Materials Wisely On-Site",
    publishedDate: "April 6, 2018",
    category: "Site Practice",
    heroImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
    deck: "Material storage affects durability, schedule, and waste control. On-site discipline protects quality before a single pour begins.",
    intro: "The storage of construction materials is important to keep their characteristics and specifications intact for construction. Lack of careful consideration of storage sites will result in the destruction of materials and the wastage of time and money to bring another set of materials.",
    highlights: ["Bricks", "Steel", "Cement", "Timber", "Blocks", "Aggregates"],
    sections: [
      {
        heading: "1. Storage of bricks",
        paragraphs: [
          "Bricks should be kept as close as possible to the site to reduce unloading and transportation effort. Different types of bricks and bricks of different sizes or strengths should be stacked separately on dry solid ground.",
          "The ideal stack is about 10 bricks high, 50 bricks long, and four bricks wide, with adjacent stacks kept around 0.8 meters apart.",
        ],
      },
      {
        heading: "2. Storage of steel",
        paragraphs: [
          "Steel should be stored to prevent distortion, deterioration, and corrosion. Different types, sizes, strengths, and lengths should be kept separately, and the bars of each class can be painted with different colors for easier distinction.",
          "Store steel at least 150 mm above ground level and apply a protective coating if it will remain in storage for a long time.",
        ],
      },
      {
        heading: "3. Storage of cement",
        paragraphs: [
          "Cement should be stored in a dry, moisture-proof, and leak-proof building with fewer windows. Keep cement bags at least 150 mm above ground level and leave about 600 mm of space between stacks and external walls.",
          "Stacks should be arranged for easy removal and use, usually ten bags high and four bags wide. The receipt date should be marked on the bags so the age of the cement is easy to determine.",
        ],
      },
      {
        heading: "4. Storage of aggregate",
        paragraphs: [
          "Aggregates should be stored on dry ground. If the ground is not dry, use a platform of planks or bricks to prevent contamination with dust, clay, and other matter.",
          "Keep fine and coarse aggregates separated, use dividing walls where practical, and choose a storage point with minimal wind loss.",
        ],
      },
      {
        heading: "5. Storage of timber",
        paragraphs: [
          "Timber stacks should be placed at least 150 mm above the ground on surfaced beams, sleepers, or brick pillars. Pieces of different lengths and sizes should be stored separately, and shorter pieces should be kept at the top.",
          "Provide at least 25 mm of air space between adjacent members, keep the stacks 450 mm apart, and protect timber from direct sunlight and rain. If timber is stored for long periods, coat the ends to prevent cracking.",
        ],
      },
      {
        heading: "6. Storage of concrete blocks",
        paragraphs: [
          "Different concrete blocks such as solid, hollow, autoclaved aerated, and stone masonry blocks should be stored separately and unloaded one block at a time.",
          "The blocks should be stacked in regular tiers to reduce breakage. Keep the stack height under 1.2 meters, with controlled length and width, and store newly cured blocks separately if they are less than 28 days old.",
        ],
      },
    ],
    closing: "Wise material storage is not just housekeeping. It is one of the simplest ways to protect quality, reduce waste, and preserve project momentum.",
  },
  {
    slug: "cement-setting-time",
    title: "8 Factors Affecting Setting and Hardening of Cement",
    publishedDate: "March 29, 2018",
    category: "Engineering Basics",
    heroImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
    deck: "Cement behavior is shaped by chemistry, fineness, water, curing, and storage. Small variations can change strength development and durability.",
    intro: "Cement is one of the most vital components used in the construction of a structure. Using high-quality cement is essential for improving quality, durability, and reliability. Setting and hardening of cement are important to provide high strength and resistance to sulfate attacks.",
    highlights: ["Composition", "Gypsum", "Fineness", "Curing", "Water", "Storage"],
    sections: [
      {
        heading: "1. Cement composition",
        paragraphs: [
          "The mineral composition and its ratio have a major effect on setting and hardening. Different mineral components react differently with water, and increasing the amount of $C_3A$ accelerates the setting and hardening rate.",
          "Adding mixed materials to the cement clinker can improve anti-erosion properties while reducing early strength and heat of hydration.",
        ],
      },
      {
        heading: "2. The amount of gypsum mixed",
        paragraphs: [
          "Gypsum is used as a retarding agent to regulate the setting time of cement. Without gypsum, $C_3A$ can dissolve in water too quickly and create a clotting effect that makes cement unusable.",
          "Too little gypsum removes the retarding effect, while too much gypsum can also influence setting. The gypsum content generally falls around 3% to 5% of the mass of cement, depending on the $C_3A$ content, fineness, and $SO_3$ in the clinker.",
        ],
      },
      {
        heading: "3. Cement fineness",
        paragraphs: [
          "Finer cement particles provide a larger surface area for hydration, so setting and hardening occur more quickly. When particles are too fine, however, shrinkage can increase during hardening and the material can react too readily with air and moisture.",
        ],
      },
      {
        heading: "4. Curing conditions",
        paragraphs: [
          "Temperature and moisture play a major role in the early development of strength. If the environment is too dry, water evaporates and hydration stops. If the temperature falls below 0 C, hydration ceases and the structure may be damaged.",
          "Steam curing and autoclave curing are often used when faster setting and hardening are needed.",
        ],
      },
      {
        heading: "5. Curing age",
        paragraphs: [
          "Setting and hardening are continuous processes. As hydration increases, gels rise and capillary porosity reduces, so strength increases with curing age. Cement gains strength quickly during the first 28 days and slows afterward.",
        ],
      },
      {
        heading: "6. Mixing of water content",
        paragraphs: [
          "If too much water is added, the number of capillary pores rises, the strength of the cement paste falls, and the setting time increases. The water-cement ratio must be controlled carefully even if the total volume changes.",
        ],
      },
      {
        heading: "7. Admixture impact",
        paragraphs: [
          "Admixtures that affect the hydration of $C_3S$ and $C_3A$ can change the setting and hardening behavior of cement. Accelerators improve hardening speed, while retarders delay it.",
        ],
      },
      {
        heading: "8. Storage conditions",
        paragraphs: [
          "Unfavorable storage conditions expose cement to moisture and slow the setting and hardening process. Protecting cement from moisture is essential if it is to perform consistently on site.",
        ],
      },
    ],
    closing: "The setting and hardening of cement is a delicate balance of chemistry, moisture, temperature, and handling. Respecting those variables is key to durable construction.",
  },
];

export const blogPostMap = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
