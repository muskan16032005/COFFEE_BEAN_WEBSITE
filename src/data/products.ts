export type CategoryId = "single-origin" | "espresso" | "blend" | "decaf";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  origin: string;
  region: string;
  category: CategoryId;
  price: number;
  weightG: number;
  roast: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  description: string;
  process: string;
  altitude: string;
  varietal: string;
  brew: BrewMethod[];
  accent: string;
  image: string;
}

export type BrewMethod = "pourover" | "espresso" | "press" | "batch";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "single-origin", label: "Single Origin" },
  { id: "espresso", label: "Espresso" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

export const ROAST_LABEL: Record<Product["roast"], string> = {
  1: "Light",
  2: "Light–Med",
  3: "Medium",
  4: "Med–Dark",
  5: "Dark",
};

export const BREW_LABEL: Record<BrewMethod, string> = {
  pourover: "Pour-over",
  espresso: "Espresso",
  press: "French press",
  batch: "Batch brew",
};

export const PRODUCTS: Product[] = [
  {
    id: "dawn-patrol",
    name: "Dawn Patrol",
    tagline: "A sunrise in a cup — floral, bright, unmistakably Yirgacheffe.",
    origin: "Ethiopia",
    region: "Yirgacheffe, Gedeo Zone",
    category: "single-origin",
    price: 19.5,
    weightG: 250,
    roast: 1,
    notes: ["bergamot", "apricot", "jasmine"],
    description:
      "Grown by the Idido cooperative at over 2,000 metres, this washed heirloom lot opens like a perfume bottle — bergamot and jasmine up top, a silky apricot middle, and a clean black-tea finish. Roasted light to keep every petal intact.",
    process: "Washed",
    altitude: "2,000–2,200 m",
    varietal: "Heirloom",
    brew: ["pourover", "batch"],
    accent: "#e8c47c",
    image:
      "https://image.qwenlm.ai/generated-images/c7f3338b-e98e-4311-b631-4b18ec76a0e0/_result.png",
  },
  {
    id: "kettle-black",
    name: "Kettle Black",
    tagline: "Kenyan AA with a blackcurrant spine and a brown-sugar tail.",
    origin: "Kenya",
    region: "Nyeri County",
    category: "single-origin",
    price: 21.0,
    weightG: 250,
    roast: 2,
    notes: ["blackcurrant", "grapefruit", "raw sugar"],
    description:
      "A classic double-washed AA from the slopes of Mount Kenya. Juicy and structured: blackcurrant and grapefruit acidity carried by raw-sugar sweetness. Built for people who like their coffee loud, in the best way.",
    process: "Double washed",
    altitude: "1,700–1,900 m",
    varietal: "SL28 · SL34",
    brew: ["pourover", "press"],
    accent: "#c65a45",
    image:
      "https://image.qwenlm.ai/generated-images/3a883375-68a3-4eb3-a046-c27d6d77b936/_result.png",
  },
  {
    id: "cloud-forest",
    name: "Cloud Forest",
    tagline: "Huehuetenango grown above the clouds — honeyed and calm.",
    origin: "Guatemala",
    region: "Huehuetenango",
    category: "single-origin",
    price: 18.0,
    weightG: 250,
    roast: 3,
    notes: ["wild honey", "orange zest", "panela"],
    description:
      "From the Villatoro family's third-generation farm, dried slowly on patio and raised beds. Round and comforting — wild honey sweetness, a flick of orange zest, and a long panela finish that makes it our favourite afternoon cup.",
    process: "Washed, patio-dried",
    altitude: "1,800 m",
    varietal: "Bourbon · Caturra",
    brew: ["pourover", "press", "batch"],
    accent: "#9aa86a",
    image:
      "https://image.qwenlm.ai/generated-images/ac184bf7-6bc1-4720-9d11-4c2886936f4d/_result.png",
  },
  {
    id: "copper-ridge",
    name: "Copper Ridge",
    tagline: "Our house espresso — caramel sweetness, zero bitterness.",
    origin: "Colombia & Brazil",
    region: "Huila · Cerrado",
    category: "espresso",
    price: 16.5,
    weightG: 250,
    roast: 4,
    notes: ["caramel", "cacao", "toasted almond"],
    description:
      "Two continents, one idea: espresso that tastes like caramel without turning bitter. Colombian washed lots give the structure, a natural Brazilian anchors the body. Pulls a syrupy shot and still sings through milk.",
    process: "Washed + Natural",
    altitude: "1,150–1,700 m",
    varietal: "Castillo · Mundo Novo",
    brew: ["espresso", "batch"],
    accent: "#dd8a45",
    image:
      "https://image.qwenlm.ai/generated-images/d320ca25-5704-40d1-8836-932f1c22f874/_result.png",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    tagline: "The darkest roast we dare make — smoky, sweet, unapologetic.",
    origin: "Brazil & Sumatra",
    region: "Mogiana · Mandheling",
    category: "blend",
    price: 15.75,
    weightG: 250,
    roast: 5,
    notes: ["dark chocolate", "molasses", "cedar"],
    description:
      "For the 6 a.m. crews and the midnight-oil burners. A heavy-bodied blend pushed just short of second crack — dark chocolate and molasses up front, a whisper of cedar smoke behind. Built for moka pots, cold brew and strong opinions.",
    process: "Natural + Wet-hulled",
    altitude: "900–1,500 m",
    varietal: "Catuaí · Typica",
    brew: ["espresso", "press", "batch"],
    accent: "#e0a35c",
    image:
      "https://image.qwenlm.ai/generated-images/b1c7f3bd-5931-4a9e-829c-080ecb8df94a/_result.png",
  },
  {
    id: "velvet-hour",
    name: "Velvet Hour",
    tagline: "Sugarcane decaf so good, nobody believes it's decaf.",
    origin: "Colombia",
    region: "Cauca",
    category: "decaf",
    price: 17.5,
    weightG: 250,
    roast: 3,
    notes: ["milk chocolate", "brown sugar", "hazelnut"],
    description:
      "Decaffeinated with sugarcane-derived ethyl acetate — a gentle process that leaves the coffee tasting like coffee. Milk chocolate, brown sugar and a hazelnut finish. The 9 p.m. cup you don't have to apologise for.",
    process: "Sugarcane E.A. decaf",
    altitude: "1,600–1,800 m",
    varietal: "Caturra · Pink Bourbon",
    brew: ["pourover", "espresso", "batch"],
    accent: "#c98d8d",
    image:
      "https://image.qwenlm.ai/generated-images/637552c9-7dde-4136-972a-4ba18a807028/_result.png",
  },
];

export const FREE_SHIPPING_AT = 40;
export const SHIPPING_FLAT = 6;

export const fmt = (n: number): string =>
  `$${n.toFixed(2)}`;

export const categoryLabel = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

/** Most recent Tuesday — our roast day. */
export const roastDateLabel = (): string => {
  const d = new Date();
  const diff = (d.getDay() - 2 + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
