export type SellBrand = {
  id: string;
  name: string;
  logo: string;
  models: string[];
};

export const sellBrands: SellBrand[] = [
  {
    id: "volkswagen",
    name: "Volkswagen",
    logo: "/brands/volkswagen-logo.svg",
    models: [
      "Golf",
      "Passat",
      "Tiguan",
      "Polo",
      "T-Roc",
      "Touran",
      "Arteon",
      "T-Cross",
      "ID.3",
      "ID.4",
    ],
  },
  {
    id: "opel",
    name: "Opel",
    logo: "/brands/opel-logo.svg",
    models: [
      "Astra",
      "Corsa",
      "Insignia",
      "Mokka",
      "Grandland",
      "Crossland",
      "Combo",
      "Zafira",
    ],
  },
  {
    id: "skoda",
    name: "Skoda",
    logo: "/brands/skoda-logo.svg",
    models: [
      "Octavia",
      "Fabia",
      "Superb",
      "Kodiaq",
      "Karoq",
      "Kamiq",
      "Scala",
      "Enyaq",
    ],
  },
  {
    id: "toyota",
    name: "Toyota",
    logo: "/brands/toyota-logo.svg",
    models: [
      "Corolla",
      "Yaris",
      "RAV4",
      "C-HR",
      "Auris",
      "Avensis",
      "Camry",
      "Highlander",
      "Aygo",
      "Proace",
    ],
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "/brands/bmw-logo.svg",
    models: [
      "Seria 1",
      "Seria 2",
      "Seria 3",
      "Seria 4",
      "Seria 5",
      "X1",
      "X3",
      "X5",
      "X6",
      "iX",
    ],
  },
  {
    id: "audi",
    name: "Audi",
    logo: "/brands/audi-logo.svg",
    models: ["A3", "A4", "A5", "A6", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron"],
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    logo: "/brands/mercedes-benz-logo.svg",
    models: [
      "Klasa A",
      "Klasa B",
      "Klasa C",
      "Klasa E",
      "CLA",
      "GLA",
      "GLB",
      "GLC",
      "GLE",
      "Vito",
    ],
  },
  {
    id: "ford",
    name: "Ford",
    logo: "/brands/ford-logo.png",
    models: [
      "Focus",
      "Fiesta",
      "Mondeo",
      "Kuga",
      "Puma",
      "EcoSport",
      "Mustang",
      "Transit",
      "S-Max",
      "Galaxy",
    ],
  },
  {
    id: "renault",
    name: "Renault",
    logo: "/brands/renault-logo.svg",
    models: [
      "Clio",
      "Megane",
      "Captur",
      "Kadjar",
      "Austral",
      "Scenic",
      "Talisman",
      "Arkana",
      "Trafic",
    ],
  },
  {
    id: "peugeot",
    name: "Peugeot",
    logo: "/brands/peugeot-logo.svg",
    models: [
      "208",
      "308",
      "508",
      "2008",
      "3008",
      "5008",
      "Partner",
      "Rifter",
      "Traveller",
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    logo: "/brands/hyundai-logo.svg",
    models: [
      "i20",
      "i30",
      "Tucson",
      "Kona",
      "Santa Fe",
      "Ioniq",
      "Ioniq 5",
      "Bayon",
    ],
  },
  {
    id: "kia",
    name: "Kia",
    logo: "/brands/kia-logo.svg",
    models: [
      "Ceed",
      "Rio",
      "Sportage",
      "Niro",
      "Stonic",
      "Sorento",
      "XCeed",
      "EV6",
      "Picanto",
    ],
  },
  {
    id: "mazda",
    name: "Mazda",
    logo: "/brands/mazda-logo.svg",
    models: ["Mazda2", "Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5"],
  },
  {
    id: "volvo",
    name: "Volvo",
    logo: "/brands/volvo-logo.svg",
    models: ["V40", "V60", "V90", "S60", "S90", "XC40", "XC60", "XC90", "C40"],
  },
];

export const OTHER_BRAND_ID = "other";

export const bodyTypes = [
  { id: "hatchback", label: "Hatchback" },
  { id: "sedan", label: "Sedan" },
  { id: "kombi", label: "Kombi" },
  { id: "suv", label: "SUV" },
  { id: "coupe", label: "Coupe" },
  { id: "van", label: "Van / minivan" },
  { id: "cabrio", label: "Cabrio" },
] as const;

export type BodyTypeId = (typeof bodyTypes)[number]["id"];

export const transmissions = [
  { id: "manual", label: "Manualna" },
  { id: "automatic", label: "Automatyczna" },
] as const;

export type SellTransmissionId = (typeof transmissions)[number]["id"];

const YEAR_FROM = 2005;

export function getSellYears(now = new Date().getFullYear()): number[] {
  const years: number[] = [];
  for (let y = now; y >= YEAR_FROM; y -= 1) years.push(y);
  return years;
}

export function getBrandById(id: string): SellBrand | undefined {
  return sellBrands.find((b) => b.id === id);
}
