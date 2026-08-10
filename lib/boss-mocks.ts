import { calcDeposit } from "./reservation";
import { getVehicleBySlug } from "./vehicles";

export type BossReservation = {
  id: string;
  vehicleSlug: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  depositAmount: number;
  reservedUntil: string;
  createdAt: string;
};

export type PurchaseOfferStatus = "new" | "contact";

export type PurchaseOffer = {
  id: string;
  make: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  expectedPrice: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  engineCapacity: string;
  power: number;
  drivetrain?: string;
  condition: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  submittedAt: string;
  status: PurchaseOfferStatus;
  images: string[];
};

function depositForSlug(slug: string, businessDays: number): number {
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return 0;
  return calcDeposit(vehicle.price, businessDays).amount;
}

/** Rezerwacje demo powiązane z autami `status: reserved`. */
export const mockReservations: BossReservation[] = [
  {
    id: "res-a1",
    vehicleSlug: "audi-a1-sportback-sline-2014",
    clientName: "Anna Kowalska",
    clientPhone: "+48 501 234 567",
    clientEmail: "anna.kowalska@email.pl",
    depositAmount: depositForSlug("audi-a1-sportback-sline-2014", 5),
    reservedUntil: "2026-08-12",
    createdAt: "2026-08-05",
  },
  {
    id: "res-golf",
    vehicleSlug: "volkswagen-golf-vii-comfortline-2013",
    clientName: "Piotr Nowak",
    clientPhone: "+48 602 111 222",
    clientEmail: "piotr.nowak@email.pl",
    depositAmount: depositForSlug("volkswagen-golf-vii-comfortline-2013", 7),
    reservedUntil: "2026-08-15",
    createdAt: "2026-08-06",
  },
  {
    id: "res-tiguan",
    vehicleSlug: "volkswagen-tiguan-trend-fun-2014",
    clientName: "Marek Wiśniewski",
    clientPhone: "+48 783 444 555",
    clientEmail: "marek.wisniewski@email.pl",
    depositAmount: depositForSlug("volkswagen-tiguan-trend-fun-2014", 10),
    reservedUntil: "2026-08-17",
    createdAt: "2026-08-07",
  },
];

/** Oferty kupna / zgłoszenia sprzedaży od klientów (demo). */
export const mockPurchaseOffers: PurchaseOffer[] = [
  {
    id: "buy-tucson",
    make: "Hyundai",
    model: "Tucson",
    version: "1.6 T-GDi 48V Platinum 4WD DCT",
    year: 2022,
    mileage: 55500,
    expectedPrice: 59000,
    fuel: "Benzyna",
    transmission: "Automatyczna",
    bodyType: "Kombi",
    engineCapacity: "1 598 cm³",
    power: 180,
    drivetrain: "4WD",
    condition: "Używany",
    clientName: "Katarzyna Zielińska",
    clientPhone: "+48 512 998 776",
    clientEmail: "k.zielinska@email.pl",
    submittedAt: "2026-08-09",
    status: "new",
    images: [
      "/vehicles/hyundai-tucson-tgdi-2022-przod.png",
      "/vehicles/hyundai-tucson-tgdi-2022-tyl.png",
    ],
  },
  {
    id: "buy-focus",
    make: "Ford",
    model: "Focus",
    version: "1.5 EcoBoost Titanium",
    year: 2019,
    mileage: 98000,
    expectedPrice: 42000,
    fuel: "Benzyna",
    transmission: "Manualna",
    bodyType: "Kombi",
    engineCapacity: "1 497 cm³",
    power: 150,
    condition: "Używany",
    clientName: "Tomasz Lewandowski",
    clientPhone: "+48 600 333 121",
    clientEmail: "t.lewandowski@email.pl",
    submittedAt: "2026-08-08",
    status: "contact",
    images: ["/vehicles/ford-focus-ecoboost-2019-przod.png"],
  },
  {
    id: "buy-octavia",
    make: "Skoda",
    model: "Octavia",
    version: "1.6 TDI Ambition",
    year: 2018,
    mileage: 142000,
    expectedPrice: 35500,
    fuel: "Diesel",
    transmission: "Manualna",
    bodyType: "Liftback",
    engineCapacity: "1 598 cm³",
    power: 115,
    condition: "Używany",
    clientName: "Joanna Dąbrowska",
    clientPhone: "+48 791 220 440",
    clientEmail: "j.dabrowska@email.pl",
    submittedAt: "2026-08-07",
    status: "new",
    images: ["/vehicles/skoda-octavia-tdi-2018-przod.png"],
  },
];

/** Liczba dni kalendarzowych do wygaśnięcia (ujemne = po terminie). */
export function daysUntil(isoDate: string, from = new Date()): number {
  const end = new Date(`${isoDate}T23:59:59`);
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const ms = end.getTime() - start.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function reservationReminderLabel(daysLeft: number): string {
  if (daysLeft < 0) return "Rezerwacja wygasła";
  if (daysLeft === 0) return "Wygasa dziś";
  if (daysLeft === 1) return "Wygasa jutro";
  return `Wygasa za ${daysLeft} dni`;
}
