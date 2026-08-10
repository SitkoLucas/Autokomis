export type VehicleStatus = "new" | "available" | "reserved";

export type FuelType = "benzyna" | "diesel" | "hybrid" | "electric";
export type TransmissionType = "manual" | "automatic";
export type DrivetrainType = "fwd" | "rwd" | "awd";

export type EquipmentGroup = {
  category: string;
  items: string[];
};

export type Vehicle = {
  slug: string;
  make: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  price: number;
  monthlyPrice: number;
  fuel: FuelType;
  transmission: TransmissionType;
  power: number;
  drivetrain: DrivetrainType;
  engine: string;
  color: string;
  bodyType: string;
  doors: number;
  seats: number;
  vin: string;
  origin: string;
  firstRegistration: string;
  owners: number;
  serviceHistory: string;
  accidentFree: boolean;
  status: VehicleStatus;
  featured: boolean;
  description: string;
  equipment: EquipmentGroup[];
  images: string[];
};

const eq = (
  safety: string[],
  comfort: string[],
  media: string[],
  packs: string[] = [],
): EquipmentGroup[] => {
  const groups: EquipmentGroup[] = [
    { category: "Bezpieczeństwo", items: safety },
    { category: "Komfort", items: comfort },
    { category: "Multimedie", items: media },
  ];
  if (packs.length) groups.push({ category: "Pakiety", items: packs });
  return groups;
};

export const vehicles: Vehicle[] = [
  {
    slug: "bmw-320i-m-sport-2021",
    make: "BMW",
    model: "320i",
    version: "M Sport",
    year: 2021,
    mileage: 68000,
    price: 139900,
    monthlyPrice: 1890,
    fuel: "benzyna",
    transmission: "automatic",
    power: 184,
    drivetrain: "rwd",
    engine: "2.0 TwinPower Turbo",
    color: "Mineral White",
    bodyType: "Sedan",
    doors: 4,
    seats: 5,
    vin: "WBA8E9C0*DEMO*001",
    origin: "Polska",
    firstRegistration: "2021-03",
    owners: 1,
    serviceHistory: "Pełna historia w ASO BMW. Ostatni przegląd przy 65 tys. km.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Elegancki sedan w pakiecie M Sport. Przejrzysta historia, zadbany egzemplarz idealny do codziennej jazdy i dłuższych tras.",
    equipment: eq(
      ["ABS", "ESP", "6 airbagów", "Asystent pasa ruchu"],
      ["Klimatyzacja automatyczna", "Podgrzewane fotele", "Tempomat aktywny"],
      ["BMW Live Cockpit", "Apple CarPlay", "Android Auto", "Kamera cofania"],
      ["Pakiet M Sport", "Felgi 18\""],
    ),
    images: ["/vehicles/bmw-320i.webp", "/vehicles/bmw-320i-2.webp"],
  },
  {
    slug: "bmw-m4-competition-2022",
    make: "BMW",
    model: "M4",
    version: "Competition",
    year: 2022,
    mileage: 24000,
    price: 349900,
    monthlyPrice: 4290,
    fuel: "benzyna",
    transmission: "automatic",
    power: 510,
    drivetrain: "rwd",
    engine: "3.0 TwinTurbo",
    color: "Isle of Man Green",
    bodyType: "Coupe",
    doors: 2,
    seats: 4,
    vin: "WBS41AZ0*DEMO*002",
    origin: "Niemcy",
    firstRegistration: "2022-06",
    owners: 1,
    serviceHistory: "Serwisowany wyłącznie w ASO. Książka serwisowa kompletna.",
    accidentFree: true,
    status: "new",
    featured: true,
    description:
      "M4 Competition w kolekcjonerskim stanie. Moc, precyzja i charakter, którego nie da się pomylić z niczym innym.",
    equipment: eq(
      ["ABS", "DSC", "M Mode", "Asystent martwego pola"],
      ["Fotele M Carbon", "Harman Kardon", "Head-Up Display"],
      ["iDrive 8", "Apple CarPlay", "Kamera 360"],
      ["Pakiet Competition", "Carbon exterior"],
    ),
    images: ["/vehicles/bmw-m4.webp", "/vehicles/bmw-m4-2.jpg"],
  },
  {
    slug: "audi-a6-45-tdi-quattro-2020",
    make: "Audi",
    model: "A6",
    version: "45 TDI Quattro S line",
    year: 2020,
    mileage: 98000,
    price: 159900,
    monthlyPrice: 2150,
    fuel: "diesel",
    transmission: "automatic",
    power: 231,
    drivetrain: "awd",
    engine: "3.0 TDI",
    color: "Mythos Black",
    bodyType: "Sedan",
    doors: 4,
    seats: 5,
    vin: "WAUZZZF2*DEMO*003",
    origin: "Niemcy",
    firstRegistration: "2020-09",
    owners: 2,
    serviceHistory: "Przeglądy zgodnie z harmonogramem. Faktury dostępne.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Reprezentacyjna A6 Quattro. Spokojna dynamika diesla, bogate wyposażenie i komfort na długich dystansach.",
    equipment: eq(
      ["ABS", "ESP", "Side Assist", "Pre Sense"],
      ["Matrix LED", "Skórzana tapicerka", "Fotele pamięciowe"],
      ["Virtual Cockpit", "MMI Navigation", "Bang & Olufsen"],
      ["S line", "Quattro"],
    ),
    images: ["/vehicles/audi-a6.webp", "/vehicles/audi-a6-2.webp"],
  },
  {
    slug: "audi-rs3-sportback-2023",
    make: "Audi",
    model: "RS3",
    version: "Sportback",
    year: 2023,
    mileage: 12000,
    price: 289900,
    monthlyPrice: 3690,
    fuel: "benzyna",
    transmission: "automatic",
    power: 400,
    drivetrain: "awd",
    engine: "2.5 TFSI",
    color: "Kemora Gray",
    bodyType: "Hatchback",
    doors: 5,
    seats: 5,
    vin: "WAUZZZGY*DEMO*004",
    origin: "Niemcy",
    firstRegistration: "2023-04",
    owners: 1,
    serviceHistory: "Jeden właściciel, serwis ASO Audi.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "RS3 Sportback: pięciocylindrowy charakter i napęd Quattro w codziennym, praktycznym nadwoziu.",
    equipment: eq(
      ["ABS", "ESC", "RS Drive Modes", "Asystent parkowania"],
      ["Fotele RS", "Ambient light", "Podgrzewana kierownica"],
      ["Virtual Cockpit Plus", "Audi Connect", "Kamera cofania"],
      ["Pakiet RS", "Wydech sportowy"],
    ),
    images: ["/vehicles/audi-rs3.webp", "/vehicles/audi-rs3-2.jpg"],
  },
  {
    slug: "mercedes-glc-220d-4matic-2021",
    make: "Mercedes-Benz",
    model: "GLC",
    version: "220d 4MATIC AMG Line",
    year: 2021,
    mileage: 72000,
    price: 189900,
    monthlyPrice: 2490,
    fuel: "diesel",
    transmission: "automatic",
    power: 194,
    drivetrain: "awd",
    engine: "2.0 CDI",
    color: "Obsidian Black",
    bodyType: "SUV",
    doors: 5,
    seats: 5,
    vin: "WDC2538*DEMO*005",
    origin: "Polska",
    firstRegistration: "2021-11",
    owners: 1,
    serviceHistory: "Serwis Mercedes. Wymiana oleju na bieżąco.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Uniwersalny SUV w linii AMG. Idealny kompromis między stylem, praktycznością i napędem 4x4.",
    equipment: eq(
      ["ABS", "ESP", "Active Brake Assist", "Blind Spot"],
      ["Panorama", "Klimatyzacja 2-strefowa", "Keyless-Go"],
      ["MBUX", "Apple CarPlay", "Kamera 360"],
      ["AMG Line", "Felgi 19\""],
    ),
    images: ["/vehicles/mercedes-glc.webp", "/vehicles/mercedes-glc-2.webp"],
  },
  {
    slug: "volvo-xc60-b4-inscription-2020",
    make: "Volvo",
    model: "XC60",
    version: "B4 Inscription",
    year: 2020,
    mileage: 85000,
    price: 149900,
    monthlyPrice: 1990,
    fuel: "hybrid",
    transmission: "automatic",
    power: 197,
    drivetrain: "awd",
    engine: "2.0 B4 Mild Hybrid",
    color: "Crystal White",
    bodyType: "SUV",
    doors: 5,
    seats: 5,
    vin: "YV1UZ08*DEMO*006",
    origin: "Szwecja",
    firstRegistration: "2020-05",
    owners: 2,
    serviceHistory: "Historia serwisowa Volvo. Przeglądy potwierdzone.",
    accidentFree: true,
    status: "available",
    featured: false,
    description:
      "XC60 Inscription: bezpieczeństwo, komfort i skandynawska jakość wykończenia.",
    equipment: eq(
      ["City Safety", "Pilot Assist", "BLIS", "Whiplash Protection"],
      ["Skóra Nappa", "Podgrzewane fotele tył", "Hak holowniczy"],
      ["Sensus Navigation", "Harman Kardon", "Apple CarPlay"],
      ["Inscription", "Oświetlenie LED"],
    ),
    images: ["/vehicles/volvo-xc60.webp", "/vehicles/mercedes-glc-2.webp"],
  },
  {
    slug: "volkswagen-tiguan-elegance-2022",
    make: "Volkswagen",
    model: "Tiguan",
    version: "Elegance 2.0 TSI",
    year: 2022,
    mileage: 41000,
    price: 134900,
    monthlyPrice: 1790,
    fuel: "benzyna",
    transmission: "automatic",
    power: 190,
    drivetrain: "fwd",
    engine: "2.0 TSI",
    color: "Pure White",
    bodyType: "SUV",
    doors: 5,
    seats: 5,
    vin: "WVGZZZ5N*DEMO*007",
    origin: "Polska",
    firstRegistration: "2022-02",
    owners: 1,
    serviceHistory: "Serwisowany w ASO Volkswagen.",
    accidentFree: true,
    status: "available",
    featured: false,
    description:
      "Popularny Tiguan w bogatej wersji Elegance. Przestronny, oszczędny w eksploatacji, gotowy do jazdy.",
    equipment: eq(
      ["ABS", "ESP", "Front Assist", "Lane Assist"],
      ["Klimatyzacja 3-strefowa", "Podgrzewane fotele", "Elektryczna klapa"],
      ["Discover Pro", "Digital Cockpit", "App-Connect"],
      ["Elegance", "IQ.Light"],
    ),
    images: ["/vehicles/vw-tiguan.webp", "/vehicles/hero-alt.webp"],
  },
  {
    slug: "skoda-superb-style-2021",
    make: "Skoda",
    model: "Superb",
    version: "Style 2.0 TDI",
    year: 2021,
    mileage: 79000,
    price: 109900,
    monthlyPrice: 1490,
    fuel: "diesel",
    transmission: "automatic",
    power: 150,
    drivetrain: "fwd",
    engine: "2.0 TDI",
    color: "Magnetic Brown",
    bodyType: "Liftback",
    doors: 5,
    seats: 5,
    vin: "TMBJJ7N*DEMO*008",
    origin: "Czechy",
    firstRegistration: "2021-07",
    owners: 1,
    serviceHistory: "Książka serwisowa Skoda. Przebieg udokumentowany.",
    accidentFree: true,
    status: "available",
    featured: false,
    description:
      "Superb Style: ogromny bagażnik, komfortowa kabina i rozsądne koszty utrzymania.",
    equipment: eq(
      ["ABS", "ESC", "Front Assist", "Blind Spot Detection"],
      ["Canton", "Podgrzewane fotele", "Virtual Pedal"],
      ["Columbus", "Virtual Cockpit", "Android Auto"],
      ["Style", "Felgi 18\""],
    ),
    images: ["/vehicles/skoda-superb.webp", "/vehicles/bmw-320i-2.webp"],
  },
  {
    slug: "porsche-911-carrera-4s-2019",
    make: "Porsche",
    model: "911",
    version: "Carrera 4S",
    year: 2019,
    mileage: 38000,
    price: 549900,
    monthlyPrice: 6490,
    fuel: "benzyna",
    transmission: "automatic",
    power: 450,
    drivetrain: "awd",
    engine: "3.0 TwinTurbo",
    color: "GT Silver Metallic",
    bodyType: "Coupe",
    doors: 2,
    seats: 4,
    vin: "WP0ZZZ99*DEMO*009",
    origin: "Niemcy",
    firstRegistration: "2019-08",
    owners: 2,
    serviceHistory: "Serwis Porsche Centre. Faktury i raporty dostępne.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Ikona motoryzacji. Carrera 4S łączy codzienną użyteczność z emocjami, których nie da się opisać na papierze.",
    equipment: eq(
      ["ABS", "PSM", "Sport Chrono", "Asystent parkowania"],
      ["Sport Seats Plus", "Podgrzewane fotele", "Entry & Drive"],
      ["PCM", "BOSE", "Apple CarPlay"],
      ["Sport Chrono", "PASM"],
    ),
    images: ["/vehicles/porsche-911.webp", "/vehicles/porsche-911-2.jpg"],
  },
  {
    slug: "ford-mustang-gt-2020",
    make: "Ford",
    model: "Mustang",
    version: "GT 5.0",
    year: 2020,
    mileage: 45000,
    price: 189900,
    monthlyPrice: 2550,
    fuel: "benzyna",
    transmission: "automatic",
    power: 450,
    drivetrain: "rwd",
    engine: "5.0 V8",
    color: "Race Red",
    bodyType: "Coupe",
    doors: 2,
    seats: 4,
    vin: "1FA6P8CF*DEMO*010",
    origin: "USA",
    firstRegistration: "2020-12",
    owners: 1,
    serviceHistory: "Serwis niezależny specjalizujący się w Mustangach.",
    accidentFree: true,
    status: "reserved",
    featured: false,
    description:
      "Amerykańska klasyka z V8. Dźwięk, charakter i radość z jazdy w czystej postaci.",
    equipment: eq(
      ["ABS", "AdvanceTrac", "Line Lock", "Kamera cofania"],
      ["Recaro", "Klimatyzacja automatyczna", "Podgrzewane fotele"],
      ["SYNC 3", "Apple CarPlay", "Android Auto"],
      ["Performance Pack", "Wydech Active Valve"],
    ),
    images: ["/vehicles/ford-mustang.webp", "/vehicles/ford-mustang-2.jpg"],
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(limit = 6): Vehicle[] {
  return vehicles.filter((v) => v.featured).slice(0, limit);
}

export function getSimilarVehicles(vehicle: Vehicle, limit = 4): Vehicle[] {
  return vehicles
    .filter((v) => v.slug !== vehicle.slug)
    .map((v) => ({
      v,
      score:
        (v.make === vehicle.make ? 3 : 0) +
        (v.bodyType === vehicle.bodyType ? 2 : 0) +
        (Math.abs(v.price - vehicle.price) < 80000 ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.v);
}

export function getMakes(): string[] {
  return [...new Set(vehicles.map((v) => v.make))].sort();
}

export function getModelsForMake(make?: string): string[] {
  const list = make
    ? vehicles.filter((v) => v.make === make)
    : vehicles;
  return [...new Set(list.map((v) => v.model))].sort();
}

export function vehicleDisplayName(v: Pick<Vehicle, "make" | "model" | "version">): string {
  return [v.make, v.model, v.version].filter(Boolean).join(" ");
}

export function statusLabel(status: VehicleStatus): string {
  switch (status) {
    case "new":
      return "Nowość";
    case "reserved":
      return "Zarezerwowany";
    default:
      return "Dostępny";
  }
}

export function fuelLabel(fuel: FuelType): string {
  switch (fuel) {
    case "benzyna":
      return "Benzyna";
    case "diesel":
      return "Diesel";
    case "hybrid":
      return "Hybryda";
    case "electric":
      return "Elektryczny";
  }
}

export function transmissionLabel(t: TransmissionType): string {
  return t === "automatic" ? "Automatyczna" : "Manualna";
}

export function drivetrainLabel(d: DrivetrainType): string {
  switch (d) {
    case "fwd":
      return "Przedni";
    case "rwd":
      return "Tylny";
    case "awd":
      return "4x4";
  }
}
