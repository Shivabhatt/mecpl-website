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
  introContinuation?: string;
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
    intro: "Keeping a close eye on current trends in the construction industry is indispensable for builders and contractors to stay ahead of the curve. Technological advancements have brought a new wave of applications and modernized the old processes. The construction industry is moving toward green buildings, utilization of building information modeling, Implementation of AR & VR, and development of modular homes.",
    introContinuation: "Following are some of the trends that construction companies in India need to look out for:",
    highlights: ["Green Buildings", "Building Information Modeling (BIM)", "Implementation of VR & AR", "Development of modular homes"],
    sections: [
      {
        heading: "Green Buildings",
        paragraphs: [
          "The rise in environmental awareness among consumers has shifted their buying preferences. The change in consumer preferences led contractors and engineers to emphasize designing eco-friendly homes, use sustainable building materials, and avail certification of Leadership in Energy and Environmental Design (LEED). The top construction companies in India have been increasingly participating in LEED programs. Acquiring its certification provides construction projects with a global symbol of sustainability. According to the report from The US Green Building Council (USGBC), the green building industry in India is expected to grow by 20 percent in 2018, owing to government regulations regarding the reduction of greenhouse emissions and an increase in awareness among consumers about the benefits of green buildings. Nearly 1,990 projects are part of the LEED program in India. The USGBC’s study also observed that the cost of constructing green buildings is less than that of conventional buildings. Though this trend has been around for the past few years in the construction industry, it will progress rapidly this year.",
        ],
      },
      {
        heading: "Building Information Modeling (BIM)",
        paragraphs: [
          "BIM creates a collaborative work environment among designers, engineers, suppliers, builders, and customers through 3D models. This leads to the development of efficient, cost-effective, and sustainable solutions. The elimination of errors in the early stages of design can avoid last-minute changes. This reduces overall construction costs and improves safety. According to the annual NBS National BIM report, 78% of the manufacturers believe that the future of the construction industry lies in BIM. Engineers and contractors in Pune, India have been instrumental in acquiring knowledge about the effective utilization of BIM. This has helped them to review the complexities and risks involved in construction and enhance operational safety. The progress in technology has now enabled the creation of a collaborative environment through 6D models too.",
        ],
      },
      {
        heading: "Implementation of VR & AR",
        paragraphs: [
          "Virtual reality (VR) models help engineers, designers, builders, and contractors to visualize structures, eliminating dependability on conventional scaled-up models. The precision in VR mapping is another benefit that cannot be achieved with physical models. VR also helps contractors to work in collaboration with clients. The ‘try before you buy’ notion is gaining prominence across the construction sector. VR headsets enable both of them to visualize the proposed layout, discuss changes, and move forward with a well-thought-out plan.",
          "Construction companies in Pune have adopted a unique approach: merging virtual reality with augmented reality (AR). AR can offer accurate measurements, reduce risks, and provide precise material details. The laser tripod scanners have been replaced and templates for VR models have been created in real time. The utilization of VR and AR is still in its infancy and its use will be widespread in coming years. Along with merging AR and VR, the construction industry is keen to deploy drones to inspect remote locations, collect information, track project progress, and determine safety measures.",
        ],
      },
      {
        heading: "Development of modular homes",
        paragraphs: [
          "Modular homes are constructed off-site and transported to the original construction site without compromising quality. They have gained a huge prominence in past few years, particularly at remote locations and suburban areas. Builders have preferred modular construction as they can start working off-site once all the permits are availed. Moreover, construction of modular buildings is cheaper, faster, and more efficient than on-site construction. Some of the modular designs can be disassembled and transported at any time. According to Westchester Modular report, modular construction projects complete 65 times faster than on-site construction projects. This is a new concept in the industry and builders facing declining profits have preferred this method to lower construction costs of new projects.",
        ],
      },
    ],
    closing: "These are some of the major trends to watch out for. Millennials have been eagerly finding innovative ways to use technology in the construction industry. Builders, contractors, engineers, and suppliers need to monitor innovations and modernize their projects to achieve optimum efficiency and profitability.",
  },
  {
    slug: "construction-site-material-storage",
    title: "How to Store Building Materials Wisely On-Site",
    publishedDate: "April 6, 2018",
    category: "Site Practice",
    heroImage: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=1600&auto=format&fit=crop",
    deck: "Material storage affects durability, schedule, and waste control. On-site discipline protects quality before a single pour begins.",
    intro: "The storage of construction materials is important to keep their characteristics and specifications intact for construction. Lack of careful consideration of storage sites will result in the destruction of materials and the wastage of time and money to bring another set of materials.",
    highlights: ["Bricks", "Steel", "Cement", "Timber", "Blocks", "Aggregates"],
    sections: [
      {
        heading: "1. Storage of bricks",
        paragraphs: [
          "Bricks are one of the vital materials on construction sites. Bricks should be kept as close as possible to the site to save efforts of unloading and transportation. Different types of bricks should be kept separately. Moreover, bricks of different sizes and strengths should be stacked separately. Bricks should be kept on dry solid ground. The ideal stacks should be 10 bricks high, 50 bricks long, and four bricks wide. The adjacent stacks should be kept 0.8 meters wide from each other.",
        ],
      },
      {
        heading: "2. Storage of steel",
        paragraphs: [
          "Steel should be stored in order to prevent distortion, deterioration, and corrosion. Different types of steel should be kept separately. The bars of different sizes, strengths, and lengths should be stored separately. Bars of each class should be painted with different colors to facilitate distinction. Store the steel above at least 150 mm from ground level. If it is stored for a long time, a protective coating should be applied.",
        ],
      },
      {
        heading: "3. Storage of cement",
        paragraphs: [
          "Cement should be stored in a building that is dry, moisture-proof, and leak-proof. There needs to be less number of windows. Keep the cement bag at least above 150 mm from ground level. Keep at least 600 mm of space between stacks and exterior walls. Cement bags should be kept as close as possible to avoid the free flow of air. The height of the stack should be 10 bags and the width should be four bags. Most importantly, cement bags should be stacked in a manner that it will be easier to remove and use. Put the date of receipt on the bags to determine the age of the cement.",
        ],
      },
      {
        heading: "4. Storage of aggregate",
        paragraphs: [
          "Aggregates should be stored on a dry ground. If the ground is not dry, a platform made of planks or bricks should be made to prevent contamination with dust, clay, and other matters. Maintain the necessary distance between fine and coarse aggregates to prevent them from mixing. If feasible, dividing walls should be constructed. Choose the place from where loss due to the effect of wind is less.",
        ],
      },
      {
        heading: "5. Storage of timber",
        paragraphs: [
          "The stacks of timber should be placed at least 150 mm above the ground on surfaced beams sleepers or brick pillars. Timbers of different lengths and sizes should be stored differently. Materials of the same length should be bound together and put together in layers. An air space of a minimum of 25 mm should be provided between adjacent members. The shorter pieces should be kept at the top; while longer pieces should be kept at the bottom. The distance between adjacent stacks should be kept at least 450 mm. The stacks should be protected from direct sunlight and rain. If timber is stored for a long time, the ends should be coated with crystalline wax, coal tar, and aluminum leaf paints to prevent cracking.",
        ],
      },
      {
        heading: "6. Storage of concrete blocks",
        paragraphs: [
          "Different concrete blocks such as solid, hollow, autoclaved aerated, and stone masonry should be stored separately. Avoid dumping them on the site. The unloading should take place one block at a time. The concrete blocks need to be stored as close as possible to the site. They should be stacked in regular tiers to reduce breakage. The height of the stack should not exceed 1.2 meters, length 3 meters, and width 2 to 3 blocks. If they are cured for less than 28 days, then they should be stacked separately.",
        ],
      },
    ],
    closing: "Wise material storage is not just housekeeping. It is one of the simplest ways to protect quality, reduce waste, and preserve project momentum.",
  },
  {
    slug: "cement-setting-time",
    title: "8 Factors Affecting Setting & Hardening of Cement",
    publishedDate: "March 29, 2018",
    category: "Engineering Basics",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
    deck: "Cement behavior is shaped by chemistry, fineness, water, curing, and storage. Small variations can change strength development and durability.",
    intro: "Cement is one of the most vital components used in the construction of the structure. Using high-quality cement is essential for improving the quality of construction, durability, and reliability. Setting and hardening of cement are important to provide high strength and provide resistance to sulfate attacks. The intricate balance of mineral components in cement significantly influences its setting and hardening dynamics, with heightened C3A levels expediting the process. Furthermore, the incorporation of diverse materials not only enhances anti-erosion properties but also mitigates early strength and heat of hydration, emphasizing the nuanced interplay of factors in cement composition.",
    highlights: ["Composition", "Gypsum", "Fineness", "Curing", "Water", "Storage"],
    sections: [
      {
        heading: "1. Cement composition",
        paragraphs: [
          "The mineral composition and its ratio have a major effect on the setting and hardening of the cement. Different mineral components react in different ways with water. If the amount of C3A is increased, then setting and hardening rate is accelerated. Moreover, if mixed materials are put into a cement linker, then anti-erosion properties will increase and early strength & heat of hydration will reduce.",
        ],
      },
      {
        heading: "2. The amount of gypsum mixed",
        paragraphs: [
          "Gypsum is one of the most vital components of cement and is used as a retarding agent to regulate the setting time of cement. If gypsum is not added, the C3A can dissolve in water immediately and generate a clotting agent which will make cement useless. When cement is hydrated, gypsum reacts with C3A to form a protection film on cement particles and restricts the hydration of C3A along with delaying the setting time. If too little gypsum is mixed, the retardation effect will not take place. If too much gypsum is added, it will speed up the setting. The content of gypsum to be added depends on the amount of C3A in cement. Moreover, it depends on the fineness in the cement and the content of SO3 in the linker. The amount of gypsum mixed should be around 3%–5% of the mass of cement.",
        ],
      },
      {
        heading: "3. Cement fineness",
        paragraphs: [
          "The size of cement particles has an enormous effect on hydration, strength, and setting & hardening. If cement particles are finer, the total surface area will be larger. Consequently, the area in contact with water will be bigger. So, hydration will be rapid, and setting & hardening will speed up. If the size of cement particles is too small, it will easily react with water. The carbon dioxide from the air will damage the cement. If cement is very fine, its shrinkage will be large in the process of hardening.",
        ],
      },
      {
        heading: "4. Curing conditions",
        paragraphs: [
          "The curing conditions are essential in the early stages of the development of strength in cement. Sufficient temperature and moisture will affect the setting and hardening. If moisture is very dry, the water from the cement evaporates and the hardening process ceases due to insufficient hydration. As the temperature rises during the curing process, the hydration of cement and the development of early strength accelerate. If the temperature falls below 0 °C, hydration of cement will cease and strength will not be developed. Moreover, the structure of cement will be destroyed. Steam curing and autoclave curing are used to accelerate the setting and hardening process.",
        ],
      },
      {
        heading: "5. Curing age",
        paragraphs: [
          "The setting and hardening of cement is a continuous process. As the hydrating degree of clinker minerals in cement particles increases, gels will escalate and capillary porosities will reduce. Consequently, the strength of cement rises as the curing age increases. The cement is developed quickly in 28 days and the development process is slowed after that.",
        ],
      },
      {
        heading: "6. Mixing of water content",
        paragraphs: [
          "If mixing water contents are increased, the number of capillary porosities will rise, the strength of the cement paste will reduce, and the setting time will increase. The water-cement ratio should be maintained even if the amount of water and cement in the mixture is changed.",
        ],
      },
      {
        heading: "7. Admixture impact",
        paragraphs: [
          "The setting and hardening of cement depend on C3S,C3A. Admixtures that affect the hydration of C3S,C3A can affect the setting and hardening of cement. If accelerator agents are used, hardening speed can be improved. On the other hand, if retarding agents are used, hardening of cement can be delayed.",
        ],
      },
      {
        heading: "8. Storage conditions",
        paragraphs: [
          "Unfavorable storage conditions expose cement to moisture. The setting and hardening will be decelerated with the presence of moisture. Avoiding exposure to moisture is important.",
        ],
      },
    ],
    closing: "The setting and hardening of cement is a delicate balance of chemistry, moisture, temperature, and handling. Respecting those variables is key to durable construction.",
  },
];

export const blogPostMap = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
