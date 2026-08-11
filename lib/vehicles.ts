import { estimateFromPrice } from "./financing";

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
  /** ISO YYYY-MM-DD, tylko gdy status === "reserved" */
  reservedUntil?: string;
  featured: boolean;
  description: string;
  equipment: EquipmentGroup[];
  images: string[];
  /** Wewnętrzne: stock vs komis. Nie pokazywać publicznie. */
  listingSource?: "stock" | "consignment";
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
    slug: "opel-grandland-x-selection-2017",
    make: "Opel",
    model: "Grandland X",
    version: "1.2 Turbo Selection",
    year: 2017,
    mileage: 90000,
    price: 45000,
    monthlyPrice: estimateFromPrice(45000),
    fuel: "benzyna",
    transmission: "manual",
    power: 131,
    drivetrain: "fwd",
    engine: "1.2 Turbo (1199 ccm)",
    color: "White Jade",
    bodyType: "SUV",
    doors: 5,
    seats: 5,
    vin: "W0VZHZ*DEMO*GLX17",
    origin: "Niemcy",
    firstRegistration: "2017-07",
    owners: 2,
    serviceHistory:
      "HU ważny do 09/2027. Serwisowany egzemplarz. Gwarancja dealera.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Opel Grandland X w linii Selection, pierwsza rejestracja 07/2017. Benzyna 1.2 Turbo 131 KM, ręczna skrzynia, przebieg 90 000 km. Kolor White Jade, wnętrze w czarnej tkaninie. Tempomat, alufelgi, światła dzienne, system start-stop. SUV 5-osobowy, gotowy do jazdy.",
    equipment: eq(
      [
        "ABS, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "ISOFIX",
        "Immobilizer",
        "Euro 6, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja ręczna",
        "Wyposażenie wnętrza: tkanina, czarny",
        "Tempomat",
        "Światła do jazdy dziennej",
        "Elektryczne szyby",
        "Elektrycznie sterowane lusterka boczne",
        "Centralny zamek",
        "Alufelgi",
        "System start-stop",
        "Napęd na przednie koła",
        "Pojazd dla niepalących",
      ],
      ["Odtwarzacz CD", "Komputer pokładowy"],
      ["Linia Selection", "Zakres modeli X", "1.2 TURBO"],
    ),
    images: [
      "/vehicles/opel-grandland-x-selection-2017-przod.png",
      "/vehicles/opel-grandland-x-selection-2017-tyl.png",
      "/vehicles/opel-grandland-x-selection-2017-wnetrze.png",
    ],
  },
  {
    slug: "audi-a1-sportback-sline-2014",
    make: "Audi",
    model: "A1 Sportback",
    version: "1.4 TFSI 3x S line",
    year: 2014,
    mileage: 126704,
    price: 52000,
    monthlyPrice: estimateFromPrice(52000),
    fuel: "benzyna",
    transmission: "manual",
    power: 140,
    drivetrain: "fwd",
    engine: "1.4 TFSI (1395 ccm)",
    color: "Daytonagrau Metallic",
    bodyType: "Hatchback",
    doors: 5,
    seats: 5,
    vin: "WAUZZZ8X*DEMO*A11410",
    origin: "Niemcy",
    firstRegistration: "2014-10",
    owners: 2,
    serviceHistory:
      "Ostatni serwis 07/2025 przy 114 903 km. TÜV i przegląd nowe. Serwisowany egzemplarz z niemieckiego salonu. Gwarancja dealera. Numer pojazdu B1-D-20-0089.",
    accidentFree: true,
    status: "reserved",
    reservedUntil: "2026-08-12",
    featured: true,
    description:
      "Audi A1 Sportback 8X w pakiecie 3x S line, pierwsza rejestracja 10/2014. Benzyna 1.4 TFSI 140 KM, ręczna skrzynia, przebieg 126 704 km. Kolor Daytonagrau Metallic, wnętrze częściowo skórzane, czarne. Bi-Xenon, tempomat, PDC tył, podgrzewane fotele, nawigacja. Bezwypadkowy, 2 właścicieli, wersja niemiecka.",
    equipment: eq(
      [
        "ABS, ESP, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "Czujniki parkowania tył (PDC)",
        "Czujnik ciśnienia opon",
        "ISOFIX",
        "Immobilizer",
        "Euro 5, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja automatyczna",
        "Wyposażenie wnętrza: częściowo ze skóry, czarny",
        "Sportowe fotele",
        "Podgrzewane siedzenia",
        "Wsparcie odcinka lędźwiowego",
        "Kierownica skórzana, wielofunkcyjna",
        "Podłokietnik",
        "Tempomat",
        "System kontroli dozwolonej prędkości",
        "Lampy biksenonowe",
        "System czyszczenia reflektorów",
        "Światła do jazdy dziennej",
        "Światła przeciwmgielne",
        "Czujnik deszczu i światła",
        "Elektryczne szyby",
        "Elektrycznie sterowane lusterka boczne",
        "Centralny zamek",
        "Alufelgi",
        "Przyciemniane szyby",
        "Sportowe zawieszenie",
        "Pakiet sportowy",
        "Ogrzewanie postojowe",
        "System start-stop",
        "Napęd na przednie koła",
        "Opony letnie",
        "Opony zimowe",
        "Zestaw zimowy",
        "Zestaw naprawczy opony",
        "Pojazd dla niepalących",
        "Wspomaganie kierownicy",
      ],
      [
        "System nawigacji",
        "System dźwiękowy",
        "Bluetooth",
        "Zestaw głośnomówiący",
        "Sterowanie głosowe",
        "Radio DAB",
        "Tuner/radio",
        "Odtwarzacz CD",
        "Komputer pokładowy",
      ],
      [
        "3x S line Sportpaket",
        "Zakres modeli 8X",
        "Temp / BiXen / PDC / Shz / SH",
        "TÜV & INSP. NEU + GARANTIE",
      ],
    ),
    images: [
      "/vehicles/audi-a1-sportback-sline-2014-przod.png",
      "/vehicles/audi-a1-sportback-sline-2014-bok.png",
      "/vehicles/audi-a1-sportback-sline-2014-tyl.png",
      "/vehicles/audi-a1-sportback-sline-2014-wnetrze.png",
    ],
  },
  {
    slug: "volkswagen-golf-vii-comfortline-2013",
    make: "Volkswagen",
    model: "Golf",
    version: "VII Lim. Comfortline BMT",
    year: 2013,
    mileage: 120127,
    price: 44999,
    monthlyPrice: estimateFromPrice(44999),
    fuel: "benzyna",
    transmission: "automatic",
    power: 105,
    drivetrain: "fwd",
    engine: "1.2 TSI (1197 ccm)",
    color: "Niebieski Metaliczny",
    bodyType: "Hatchback",
    doors: 5,
    seats: 5,
    vin: "WVWZZZAU*DEMO*GOLF13",
    origin: "Niemcy",
    firstRegistration: "2013-12",
    owners: 4,
    serviceHistory:
      "Ostatni serwis 12/2025 przy 112 923 km. HU nowy. Serwisowany egzemplarz z niemieckiego salonu.",
    accidentFree: true,
    status: "reserved",
    reservedUntil: "2026-08-15",
    featured: true,
    description:
      "Volkswagen Golf VII Lim. Comfortline BMT, pierwsza rejestracja 12/2013. Benzyna 1.2 TSI 105 KM, automatyczna skrzynia, przebieg 120 127 km. Kolor niebieski metaliczny, wnętrze w szarej tkaninie. Nawigacja, podgrzewane fotele, czujniki parkowania przód/tył z kamerą. Wersja niemiecka, gotowy do jazdy.",
    equipment: eq(
      [
        "ABS, ESP, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "Czujniki parkowania przód i tył",
        "Kamera parkowania",
        "Czujnik ciśnienia opon",
        "ISOFIX",
        "Immobilizer",
        "Asystent ruszania pod górę",
        "System ostrzegania o zmęczeniu",
        "System powiadomienia awaryjnego",
        "Euro 6, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja automatyczna",
        "Wyposażenie wnętrza: tkanina, szary",
        "Podgrzewane siedzenia",
        "Wsparcie odcinka lędźwiowego",
        "Kierownica skórzana, wielofunkcyjna",
        "Łopatki zmiany biegów",
        "Podłokietnik",
        "Czujnik deszczu i światła",
        "Światła do jazdy dziennej",
        "Światła długie z zabezpieczeniem przed oślepianiem",
        "System czyszczenia reflektorów",
        "Elektryczne szyby",
        "Elektrycznie sterowane, składane lusterka boczne",
        "Centralny zamek",
        "Alufelgi",
        "Przyciemniane szyby",
        "Bagażnik na narty",
        "System start-stop",
        "Napęd na przednie koła",
        "Opony letnie",
        "Opony zimowe",
        "Zestaw naprawczy opony",
        "Pojazd dla niepalących",
        "Wspomaganie kierownicy",
      ],
      [
        "Ekran dotykowy",
        "System nawigacji",
        "System dźwiękowy",
        "Bluetooth",
        "Zestaw głośnomówiący",
        "Sterowanie głosowe",
        "Radio DAB",
        "Tuner/radio",
        "Odtwarzacz CD",
        "Port USB",
        "Komputer pokładowy",
      ],
      [
        "Linia Comfortline BMT",
        "Zakres modeli 5G1/BE1",
        "Navi / Automatik / Sitzheizung",
      ],
    ),
    images: [
      "/vehicles/vw-golf-vii-comfortline-2013-przod.png",
      "/vehicles/vw-golf-vii-comfortline-2013-bok.png",
      "/vehicles/vw-golf-vii-comfortline-2013-bok-tyl.png",
      "/vehicles/vw-golf-vii-comfortline-2013-tyl.png",
      "/vehicles/vw-golf-vii-comfortline-2013-wnetrze.png",
    ],
  },
  {
    slug: "volkswagen-tiguan-trend-fun-2014",
    make: "Volkswagen",
    model: "Tiguan",
    version: "Trend & Fun BMT",
    year: 2014,
    mileage: 89571,
    price: 40000,
    monthlyPrice: estimateFromPrice(40000),
    fuel: "benzyna",
    transmission: "manual",
    power: 122,
    drivetrain: "fwd",
    engine: "1.4 TSI (1390 ccm)",
    color: "Czarny Metaliczny",
    bodyType: "SUV",
    doors: 5,
    seats: 5,
    vin: "WVGZZZ5N*DEMO*TIG14",
    origin: "Niemcy",
    firstRegistration: "2014-02",
    owners: 2,
    serviceHistory:
      "Ostatni serwis 07/2025 przy 85 068 km. HU nowy. Serwisowany egzemplarz z niemieckiego salonu. Gwarancja dealera.",
    accidentFree: true,
    status: "reserved",
    reservedUntil: "2026-08-17",
    featured: true,
    description:
      "Volkswagen Tiguan 5N2 w linii Trend & Fun BMT, pierwsza rejestracja 02/2014. Benzyna 1.4 TSI 122 KM, ręczna skrzynia, przebieg 89 571 km. Kolor czarny metaliczny, wnętrze materiałowe. Kamera cofania, klima automatyczna 2-strefowa, nawigacja, system ostrzegania o zmęczeniu. Wersja niemiecka, 2 właścicieli, gotowy do jazdy.",
    equipment: eq(
      [
        "ABS, ESP, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "Kamera parkowania tył",
        "Czujnik ciśnienia opon",
        "ISOFIX",
        "Immobilizer",
        "Asystent ruszania pod górę",
        "Wspomaganie hamowania awaryjnego",
        "System ostrzegania o zmęczeniu",
        "Rozpoznawanie znaków drogowych",
        "Euro 5, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja automatyczna, 2 strefy",
        "Wyposażenie wnętrza: tkanina",
        "Podgrzewane siedzenia",
        "Kierownica skórzana",
        "Podłokietnik",
        "Tempomat",
        "System kontroli dozwolonej prędkości",
        "Reflektory LED",
        "Światła do jazdy dziennej",
        "Światła przeciwmgielne",
        "Automatycznie przyciemniane lusterko wewnętrzne",
        "Elektryczne szyby",
        "Elektrycznie sterowane lusterka boczne",
        "Centralny zamek",
        "Alufelgi",
        "Przyciemniane szyby",
        "Bariera cargo",
        "System start-stop",
        "Napęd na przednie koła",
        "Opony zimowe",
        "Zestaw naprawczy opony",
        "Pojazd dla niepalących",
        "Wspomaganie kierownicy",
      ],
      [
        "System nawigacji",
        "System dźwiękowy",
        "Bluetooth",
        "Tuner/radio",
        "Odtwarzacz CD",
        "Port USB",
        "Komputer pokładowy",
      ],
      [
        "Linia Trend & Fun BMT",
        "Zakres modeli 5N2",
        "Garantie / Rückfahrkamera / Müdigkeitserkennung",
      ],
    ),
    images: [
      "/vehicles/vw-tiguan-trend-fun-2014-przod.png",
      "/vehicles/vw-tiguan-trend-fun-2014-bok.png",
      "/vehicles/vw-tiguan-trend-fun-2014-tyl.png",
      "/vehicles/vw-tiguan-trend-fun-2014-wnetrze.png",
    ],
  },
  {
    slug: "opel-mokka-x-innovation-2017",
    make: "Opel",
    model: "Mokka X",
    version: "INNOVATION",
    year: 2017,
    mileage: 90884,
    price: 60000,
    monthlyPrice: estimateFromPrice(60000),
    fuel: "benzyna",
    transmission: "automatic",
    power: 140,
    drivetrain: "fwd",
    engine: "1.4 Turbo (1364 ccm)",
    color: "Licht Grau M2",
    bodyType: "SUV",
    doors: 5,
    seats: 5,
    vin: "W0L0XER0*DEMO*MOKKA17",
    origin: "Niemcy",
    firstRegistration: "2017-08",
    owners: 2,
    serviceHistory:
      "Serwisowany egzemplarz z niemieckiego salonu. HU nowy. Gwarancja dealera.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Opel Mokka X w linii INNOVATION, pierwsza rejestracja 08/2017. Benzyna 1.4 Turbo 140 KM, automatyczna skrzynia, przebieg 90 884 km. Kolor Licht Grau M2, pełna skóra czarna, szyberdach. Reflektory LED, kamera i czujniki parkowania przód/tył, Apple CarPlay i Android Auto, Bose, podgrzewane fotele i kierownica. Wersja niemiecka, gotowy do jazdy.",
    equipment: eq(
      [
        "ABS, ESP, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "Czujniki parkowania przód i tył",
        "Kamera parkowania",
        "Czujnik ciśnienia opon",
        "ISOFIX",
        "Immobilizer",
        "Asystent ruszania pod górę",
        "Asystent świateł drogowych",
        "Euro 6",
      ],
      [
        "Klimatyzacja automatyczna",
        "Wyposażenie wnętrza: wszystko ze skóry, czarny",
        "Sportowe fotele",
        "Podgrzewane siedzenia",
        "Podgrzewana kierownica",
        "Kierownica skórzana, wielofunkcyjna",
        "Tempomat",
        "Szyberdach",
        "Reflektory LED",
        "Światła dzienne LED",
        "Światła przeciwmgielne",
        "Czujnik deszczu i światła",
        "Elektryczne szyby",
        "Elektrycznie sterowane lusterka boczne",
        "Bezkluczykowy centralny zamek",
        "Alufelgi",
        "Bagażnik dachowy",
        "Pakiet sportowy",
        "Podłokietnik",
        "Napęd na przednie koła",
        "Opony całoroczne",
        "Zestaw zimowy",
        "Pojazd dla niepalących",
      ],
      [
        "Ekran dotykowy",
        "System nawigacji",
        "Przygotowanie pod nawigację",
        "Apple CarPlay",
        "Android Auto",
        "System dźwiękowy Bose",
        "Bluetooth",
        "Zestaw głośnomówiący",
        "Sterowanie głosowe",
        "Tuner/radio",
        "Port USB",
        "Kokpit cyfrowy",
        "Komputer pokładowy",
        "Wbudowana obsługa strumieniowania muzyki",
      ],
      [
        "Linia INNOVATION",
        "Automatyczna skrzynia biegów",
        "Schiebedach / Voll-Lederausstattung",
      ],
    ),
    images: [
      "/vehicles/opel-mokka-x-innovation-2017-przod.png",
      "/vehicles/opel-mokka-x-innovation-2017-bok.png",
      "/vehicles/opel-mokka-x-innovation-2017-tyl.png",
      "/vehicles/opel-mokka-x-innovation-2017-wnetrze.png",
      "/vehicles/opel-mokka-x-innovation-2017-detale.png",
    ],
  },
  {
    slug: "audi-a3-design-2017",
    make: "Audi",
    model: "A3",
    version: "design",
    year: 2017,
    mileage: 80766,
    price: 54000,
    monthlyPrice: estimateFromPrice(54000),
    fuel: "benzyna",
    transmission: "manual",
    power: 116,
    drivetrain: "fwd",
    engine: "1.0 TFSI (999 ccm)",
    color: "Florettsilber Metallic",
    bodyType: "Hatchback",
    doors: 3,
    seats: 5,
    vin: "WAUZZZ8V*DEMO*A31705",
    origin: "Niemcy",
    firstRegistration: "2017-05",
    owners: 2,
    serviceHistory:
      "Serwisowany egzemplarz z niemieckiego salonu. HU nowy. Gwarancja dealera (GSC).",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Audi A3 8V w linii design, pierwsza rejestracja 05/2017. Benzyna 1.0 TFSI 116 KM, ręczna skrzynia, przebieg 80 766 km. Kolor Florettsilber Metallic, hatchback 3-drzwiowy. Reflektory LED, MMI Navigation, Audi Sound System z DSP, klima automatyczna 2-strefowa, tempomat i podgrzewane fotele. Wersja niemiecka, 2 właścicieli, gotowy do jazdy.",
    equipment: eq(
      [
        "ABS, ESP, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "Czujniki parkowania tył",
        "Czujnik ciśnienia opon",
        "ISOFIX",
        "Mocowanie Isofix na fotelu pasażera",
        "Immobilizer",
        "Wspomaganie hamowania awaryjnego",
        "Rozpoznawanie znaków drogowych",
        "Euro 6, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja automatyczna, 2 strefy",
        "Podgrzewane siedzenia",
        "Kierownica skórzana, wielofunkcyjna",
        "Tempomat",
        "System kontroli dozwolonej prędkości",
        "Reflektory LED",
        "Światła do jazdy dziennej",
        "Światła przeciwmgielne",
        "Czujnik deszczu i światła",
        "Automatycznie przyciemniane lusterko wewnętrzne",
        "Elektryczne szyby",
        "Elektrycznie sterowane, składane lusterka boczne",
        "Centralny zamek",
        "Alufelgi",
        "Przyciemniane szyby",
        "Sportowe zawieszenie",
        "Podłokietnik",
        "System start-stop",
        "Napęd na przednie koła",
        "Opony zimowe",
        "Zestaw naprawczy opony",
        "Bariera cargo",
        "Pojazd dla niepalących",
      ],
      [
        "MMI Navigationssystem",
        "Audi Sound System / DSP",
        "Bluetooth",
        "Zestaw głośnomówiący",
        "Tuner/radio",
        "Odtwarzacz CD",
        "Port USB",
        "Komputer pokładowy",
      ],
      ["Linia design", "Zakres modeli 8V", "GARANTIE / LED-Scheinwerfer"],
    ),
    images: [
      "/vehicles/audi-a3-design-2017-przod.png",
      "/vehicles/audi-a3-design-2017-bok.png",
      "/vehicles/audi-a3-design-2017-bok-tyl.png",
      "/vehicles/audi-a3-design-2017-tyl.png",
      "/vehicles/audi-a3-design-2017-wnetrze.png",
    ],
  },
  {
    slug: "volkswagen-golf-vii-allstar-2016",
    make: "Volkswagen",
    model: "Golf",
    version: "VII ALLSTAR",
    year: 2016,
    mileage: 67682,
    price: 59900,
    monthlyPrice: estimateFromPrice(59900),
    fuel: "benzyna",
    transmission: "manual",
    power: 110,
    drivetrain: "fwd",
    engine: "1.2 TSI (1197 ccm)",
    color: "Tungsten Silver Metallic",
    bodyType: "Hatchback",
    doors: 5,
    seats: 5,
    vin: "WVWZZZAU*DEMO*329302",
    origin: "Niemcy",
    firstRegistration: "2016-06",
    owners: 2,
    serviceHistory:
      "VW SCHECKHEFT gepflegt. Pełna książka serwisowa, zadbany egzemplarz z niemieckiego salonu.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Volkswagen Golf VII w linii ALLSTAR z 2016 roku. Wersja niemiecka, bezwypadkowa, z przebiegiem 67 682 km i silnikiem 1.2 TSI 110 KM. Ręczna skrzynia, klima automatyczna 2-strefowa, podgrzewane fotele i kierownica, bogate asystenty jazdy oraz czujniki parkowania z kamerą. Auto z historią VW SCHECKHEFT, gotowe do codziennej jazdy.",
    equipment: eq(
      [
        "Przednie, boczne i inne poduszki powietrzne",
        "Układy asystujące (Viele Assistenzsysteme)",
        "Czujniki parkowania przód i tył",
        "Kamera parkowania",
        "Euro 6, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja automatyczna, 2 strefy",
        "Podgrzewane fotele",
        "Podgrzewana kierownica",
        "Siedzenia w tkaninie, szare",
      ],
      ["System multimedialny z nawigacją", "Radio / Media / Telefon"],
      ["Linia ALLSTAR", "Numer pojazdu dealera 51-329302"],
    ),
    images: [
      "/vehicles/vw-golf-vii-allstar-2016-przod.png",
      "/vehicles/vw-golf-vii-allstar-2016-bok.png",
      "/vehicles/vw-golf-vii-allstar-2016-tyl.png",
      "/vehicles/vw-golf-vii-allstar-2016-wnetrze.png",
    ],
  },
  {
    slug: "opel-adam-unlimited-2017",
    make: "Opel",
    model: "Adam",
    version: "UNLIMITED",
    year: 2017,
    mileage: 47000,
    price: 49800,
    monthlyPrice: estimateFromPrice(49800),
    fuel: "benzyna",
    transmission: "manual",
    power: 87,
    drivetrain: "fwd",
    engine: "1.4 (1398 ccm)",
    color: "Pomarańczowy",
    bodyType: "Hatchback",
    doors: 3,
    seats: 4,
    vin: "W0L0AHL08*DEMO*ADAM17",
    origin: "Niemcy",
    firstRegistration: "2017-11",
    owners: 2,
    serviceHistory:
      "TÜV NEU + SERVICE NEU. HU nowy. Zadbany egzemplarz z niemieckiego salonu.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "Opel Adam UNLIMITED z 2017 roku. Wersja niemiecka, przebieg 47 000 km, silnik 1.4 87 KM i ręczna skrzynia. Klimatyzacja ręczna, czujniki parkowania tył, alufelgi, Apple CarPlay i Android Auto. Wnętrze częściowo skórzane, TÜV i serwis świeżo zrobione.",
    equipment: eq(
      [
        "Przednie, boczne i inne poduszki powietrzne",
        "ABS",
        "Asystent ruszania pod górę",
        "Czujnik ciśnienia opon",
        "Czujniki parkowania tył",
        "Euro 6, naklejka emisyjna 4 (zielona)",
      ],
      [
        "Klimatyzacja ręczna",
        "Elektryczne szyby",
        "Elektrycznie sterowane lusterka boczne",
        "Centralny zamek",
        "Czujnik światła",
        "Wyposażenie wnętrza: częściowo ze skóry, czarny",
        "Alufelgi",
      ],
      [
        "Ekran dotykowy",
        "Apple CarPlay",
        "Android Auto",
        "Bluetooth",
      ],
      ["Linia UNLIMITED", "TÜV NEU + SERVICE NEU"],
    ),
    images: [
      "/vehicles/opel-adam-unlimited-2017-przod.png",
      "/vehicles/opel-adam-unlimited-2017-tyl.png",
      "/vehicles/opel-adam-unlimited-2017-tyl-prawy.png",
      "/vehicles/opel-adam-unlimited-2017-wnetrze.png",
      "/vehicles/opel-adam-unlimited-2017-srodek.png",
    ],
  },
  {
    slug: "bmw-218-gran-tourer-advantage-2015",
    make: "BMW",
    model: "218 Gran Tourer",
    version: "Advantage",
    year: 2015,
    mileage: 98400,
    price: 54500,
    monthlyPrice: estimateFromPrice(54500),
    fuel: "benzyna",
    transmission: "automatic",
    power: 136,
    drivetrain: "fwd",
    engine: "1.5 (1499 ccm)",
    color: "Atlantikgrau Metallic",
    bodyType: "Van/Mikrobus",
    doors: 5,
    seats: 5,
    vin: "WBA2****DEMO*F4615",
    origin: "Niemcy",
    firstRegistration: "2015-07",
    owners: 2,
    serviceHistory:
      "Ostatni serwis 10/2024 przy 88 921 km. HU nowy. Serwisowany egzemplarz z niemieckiego salonu.",
    accidentFree: true,
    status: "available",
    featured: true,
    description:
      "BMW 218 Gran Tourer F46 w linii Advantage, pierwsza rejestracja 07/2015. Benzyna 1.5 136 KM, automatyczna skrzynia, przebieg 98 400 km. Kolor Atlantikgrau Metallic, wnętrze w czarnej skórze. Reflektory LED, zaczep przyczepy AHK, czujniki parkowania tył. Bezwypadkowy, 2 właścicieli, gotowy do jazdy.",
    equipment: eq(
      [
        "ABS, ESP, kontrola trakcji",
        "Przednie, boczne i inne poduszki powietrzne",
        "Czujniki parkowania tył",
        "Czujnik ciśnienia opon",
        "ISOFIX",
        "Immobilizer",
        "Układ alarmowy",
      ],
      [
        "Klimatyzacja ręczna",
        "Wyposażenie wnętrza: wszystko ze skóry, czarny",
        "Podgrzewane siedzenia",
        "Podgrzewana szyba przednia",
        "Kierownica skórzana",
        "Podłokietnik",
        "Tempomat",
        "Asystent świateł drogowych",
        "Reflektory LED",
        "Światła adaptacyjne",
        "Światła do jazdy dziennej",
        "Światła przeciwmgielne",
        "Czujnik deszczu",
        "Elektryczne szyby",
        "Centralny zamek",
        "Alufelgi",
        "Bagażnik dachowy",
        "Zaczep przyczepy, demontowany (AHK)",
        "System start-stop",
        "Napęd na przednie koła",
        "Opony letnie",
        "Zestaw naprawczy opony",
      ],
      [
        "Bluetooth",
        "Zestaw głośnomówiący",
        "Radio DAB",
        "Odtwarzacz CD",
        "Port USB",
        "System nawigacji",
        "Przygotowanie pod nawigację",
        "Komputer pokładowy",
        "Wbudowana obsługa strumieniowania muzyki",
      ],
      ["Linia Advantage", "Zakres modeli F46"],
    ),
    images: [
      "/vehicles/bmw-218-gran-tourer-2015-przod.png",
      "/vehicles/bmw-218-gran-tourer-2015-bok.png",
      "/vehicles/bmw-218-gran-tourer-2015-tyl.png",
      "/vehicles/bmw-218-gran-tourer-2015-wnetrze.png",
    ],
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

export function formatReservedUntil(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${d}.${m}.${y}`;
}

export function statusLabel(
  status: VehicleStatus,
  reservedUntil?: string,
): string {
  switch (status) {
    case "new":
      return "Nowość";
    case "reserved":
      return reservedUntil
        ? `Zarezerwowany do ${formatReservedUntil(reservedUntil)}`
        : "Zarezerwowany";
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
