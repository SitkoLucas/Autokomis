import { estimateFromPrice } from "./financing";
import type { SlotPhoto } from "./consignment-photo-slots";
import type { EquipmentGroup, FuelType, TransmissionType, Vehicle } from "./vehicles";

export type ConsignmentStatus =
  | "pending"
  | "approved"
  | "published"
  | "rejected"
  | "sold";

export type CommissionType = "percentage" | "fixed";

export type ConsignmentListing = {
  id: string;
  status: ConsignmentStatus;
  submittedAt: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;

  make: string;
  model: string;
  version: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  bodyType: string;
  power?: number;
  engine?: string;
  color?: string;
  description: string;
  equipment: EquipmentGroup[];
  serviceHistory?: string;
  accidentFree?: boolean;
  owners?: number;

  photos: SlotPhoto[];
  expectedPrice: number;

  publishPrice?: number;
  commissionType?: CommissionType;
  commissionValue?: number;
  approvedAt?: string;
  bossNote?: string;
  publishedAt?: string;
  slug?: string;

  finalSalePrice?: number;
  soldAt?: string;
};

const STORAGE_KEY = "autokomis-demo-consignments";
const SEED_VERSION_KEY = "autokomis-demo-consignments-seed-v";
const SEED_VERSION = 2;

/** Orientacyjna prowizja pokazywana klientowi przed zatwierdzeniem warunków. */
export const ORIENTATIONAL_COMMISSION = {
  type: "percentage" as const,
  value: 5,
};

export function getOrientationalSettlement(basePrice: number): {
  commissionAmount: number;
  ownerPayout: number;
} | null {
  if (!Number.isFinite(basePrice) || basePrice <= 0) return null;
  const commissionAmount = calcCommissionAmount(
    basePrice,
    ORIENTATIONAL_COMMISSION.type,
    ORIENTATIONAL_COMMISSION.value,
  );
  return {
    commissionAmount,
    ownerPayout: calcOwnerPayout(basePrice, commissionAmount),
  };
}

export function calcCommissionAmount(
  basePrice: number,
  commissionType: CommissionType,
  commissionValue: number,
): number {
  if (!Number.isFinite(basePrice) || basePrice <= 0) return 0;
  if (commissionType === "percentage") {
    return Math.round((basePrice * commissionValue) / 100);
  }
  return Math.round(commissionValue);
}

export function calcOwnerPayout(
  basePrice: number,
  commissionAmount: number,
): number {
  return Math.max(0, Math.round(basePrice - commissionAmount));
}

export function consignmentStatusLabel(status: ConsignmentStatus): string {
  switch (status) {
    case "pending":
      return "Oczekuje na weryfikację";
    case "approved":
      return "Zatwierdzone";
    case "published":
      return "W ofercie";
    case "rejected":
      return "Odrzucone";
    case "sold":
      return "Sprzedane";
  }
}

export function commissionTypeLabel(type: CommissionType): string {
  return type === "percentage" ? "Procent" : "Stała kwota";
}

export function formatCommissionValue(
  type: CommissionType,
  value: number,
): string {
  return type === "percentage" ? `${value}%` : `${value.toLocaleString("pl-PL")} zł`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateSlug(listing: ConsignmentListing): string {
  const base = slugify(
    `${listing.make}-${listing.model}-${listing.year}-${listing.id.slice(-6)}`,
  );
  return `komis-${base}`;
}

function mapFuel(fuel: string): FuelType {
  if (fuel === "diesel" || fuel === "hybrid" || fuel === "electric") return fuel;
  return "benzyna";
}

function mapTransmission(t: string): TransmissionType {
  return t === "automatic" ? "automatic" : "manual";
}

function bodyTypeLabel(bodyType: string): string {
  const labels: Record<string, string> = {
    sedan: "Sedan",
    kombi: "Kombi",
    hatchback: "Hatchback",
    suv: "SUV",
    van: "Van",
    coupe: "Coupe",
    cabrio: "Cabrio",
    pickup: "Pickup",
  };
  return labels[bodyType] ?? bodyType;
}

export function toVehicle(listing: ConsignmentListing): Vehicle | null {
  if (listing.status !== "published") return null;
  const price = listing.publishPrice ?? listing.expectedPrice;
  const images = listing.photos.map((p) => p.dataUrl).filter(Boolean);
  if (images.length === 0) {
    images.push("/vehicles/opel-grandland-x-selection-2017-przod.png");
  }

  return {
    slug: listing.slug ?? generateSlug(listing),
    make: listing.make,
    model: listing.model,
    version: listing.version || "",
    year: listing.year,
    mileage: listing.mileage,
    price,
    monthlyPrice: estimateFromPrice(price),
    fuel: mapFuel(listing.fuel),
    transmission: mapTransmission(listing.transmission),
    power: listing.power ?? 100,
    drivetrain: "fwd",
    engine: listing.engine ?? "",
    color: listing.color ?? "",
    bodyType: bodyTypeLabel(listing.bodyType),
    doors: 5,
    seats: 5,
    vin: "",
    origin: "Polska",
    firstRegistration: `${listing.year}-01-01`,
    owners: listing.owners ?? 1,
    serviceHistory: listing.serviceHistory ?? "Brak informacji",
    accidentFree: listing.accidentFree ?? true,
    status: "available",
    featured: false,
    description: listing.description,
    equipment: listing.equipment,
    images,
    listingSource: "consignment",
  };
}

const seedListings: ConsignmentListing[] = [
  {
    id: "cons-seed-tucson",
    status: "pending",
    submittedAt: "2026-08-08",
    clientEmail: "k.zielinska@email.pl",
    clientName: "Katarzyna Zielińska",
    clientPhone: "+48 512 998 776",
    make: "Hyundai",
    model: "Tucson",
    version: "1.6 T-GDi Platinum",
    year: 2022,
    mileage: 55500,
    fuel: "benzyna",
    transmission: "automatic",
    bodyType: "suv",
    description:
      "Auto serwisowane w ASO, pełna historia. Chętnie wstawię w komis, nie sprzedaję samodzielnie.",
    equipment: [],
    serviceHistory: "Serwis ASO",
    accidentFree: true,
    owners: 1,
    photos: [
      {
        id: "seed-1",
        slotId: "front",
        name: "hyundai-tucson-komis.png",
        dataUrl: "/vehicles/hyundai-tucson-komis.png",
      },
    ],
    expectedPrice: 59000,
  },
  {
    id: "cons-seed-fabia",
    status: "pending",
    submittedAt: "2026-08-09",
    clientEmail: "demo@email.pl",
    clientName: "Jan Demo",
    clientPhone: "+48 600 111 222",
    make: "Skoda",
    model: "Fabia",
    version: "1.0 TSI Ambition",
    year: 2019,
    mileage: 78000,
    fuel: "benzyna",
    transmission: "manual",
    bodyType: "hatchback",
    description: "Pierwszy właściciel, garażowane. Szukam sprzedaży przez komis.",
    equipment: [],
    accidentFree: true,
    owners: 1,
    photos: [
      {
        id: "seed-2",
        slotId: "front",
        name: "skoda-fabia-komis.png",
        dataUrl: "/vehicles/skoda-fabia-komis.png",
      },
    ],
    expectedPrice: 42000,
  },
];

function mergeSeedIntoStored(all: ConsignmentListing[]): ConsignmentListing[] {
  const byId = new Map(all.map((l) => [l.id, l]));
  for (const seed of seedListings) {
    const existing = byId.get(seed.id);
    if (existing) {
      byId.set(seed.id, { ...existing, photos: seed.photos });
    } else {
      byId.set(seed.id, seed);
    }
  }
  return [...byId.values()].sort(
    (a, b) => b.submittedAt.localeCompare(a.submittedAt),
  );
}

export function loadConsignments(): ConsignmentListing[] {
  if (typeof window === "undefined") return seedListings;
  try {
    const storedVersion = sessionStorage.getItem(SEED_VERSION_KEY);
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      sessionStorage.setItem(SEED_VERSION_KEY, String(SEED_VERSION));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(seedListings));
      return seedListings;
    }
    let all = JSON.parse(raw) as ConsignmentListing[];
    if (storedVersion !== String(SEED_VERSION)) {
      all = mergeSeedIntoStored(all);
      sessionStorage.setItem(SEED_VERSION_KEY, String(SEED_VERSION));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }
    return all;
  } catch {
    return seedListings;
  }
}

export function saveConsignments(listings: ConsignmentListing[]): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export function getConsignmentById(id: string): ConsignmentListing | undefined {
  return loadConsignments().find((l) => l.id === id);
}

export function getConsignmentsForClient(email: string): ConsignmentListing[] {
  const normalized = email.trim().toLowerCase();
  return loadConsignments().filter(
    (l) => l.clientEmail.trim().toLowerCase() === normalized,
  );
}

export function getPublishedConsignmentVehicles(): Vehicle[] {
  return loadConsignments()
    .filter((l) => l.status === "published")
    .map((l) => toVehicle(l))
    .filter((v): v is Vehicle => v !== null);
}

export function submitConsignment(
  listing: Omit<ConsignmentListing, "id" | "status" | "submittedAt">,
): ConsignmentListing {
  const all = loadConsignments();
  const created: ConsignmentListing = {
    ...listing,
    id: `cons-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    submittedAt: new Date().toISOString().slice(0, 10),
  };
  all.unshift(created);
  saveConsignments(all);
  return created;
}

export function updateConsignmentListing(
  id: string,
  patch: Partial<ConsignmentListing>,
): ConsignmentListing | null {
  const all = loadConsignments();
  const idx = all.findIndex((l) => l.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch };
  saveConsignments(all);
  return all[idx];
}

export function approveConsignmentTerms(
  id: string,
  terms: {
    publishPrice: number;
    commissionType: CommissionType;
    commissionValue: number;
    bossNote?: string;
    listingPatch?: Partial<ConsignmentListing>;
  },
): ConsignmentListing | null {
  return updateConsignmentListing(id, {
    ...terms.listingPatch,
    status: "approved",
    publishPrice: terms.publishPrice,
    commissionType: terms.commissionType,
    commissionValue: terms.commissionValue,
    bossNote: terms.bossNote,
    approvedAt: new Date().toISOString().slice(0, 10),
  });
}

export function publishConsignment(id: string): ConsignmentListing | null {
  const listing = getConsignmentById(id);
  if (!listing || listing.status !== "approved") return null;
  return updateConsignmentListing(id, {
    status: "published",
    slug: listing.slug ?? generateSlug(listing),
    publishedAt: new Date().toISOString().slice(0, 10),
  });
}

export function rejectConsignment(
  id: string,
  bossNote?: string,
): ConsignmentListing | null {
  return updateConsignmentListing(id, {
    status: "rejected",
    bossNote,
  });
}

export function completeConsignmentSale(
  id: string,
  finalSalePrice: number,
): ConsignmentListing | null {
  const listing = getConsignmentById(id);
  if (!listing || listing.status !== "published") return null;
  return updateConsignmentListing(id, {
    status: "sold",
    finalSalePrice,
    soldAt: new Date().toISOString().slice(0, 10),
  });
}

export function getSettlementForListing(
  listing: ConsignmentListing,
  salePrice?: number,
): {
  basePrice: number;
  commissionAmount: number;
  ownerPayout: number;
} | null {
  const basePrice = salePrice ?? listing.finalSalePrice ?? listing.publishPrice;
  if (
    basePrice === undefined ||
    listing.commissionType === undefined ||
    listing.commissionValue === undefined
  ) {
    return null;
  }
  const commissionAmount = calcCommissionAmount(
    basePrice,
    listing.commissionType,
    listing.commissionValue,
  );
  return {
    basePrice,
    commissionAmount,
    ownerPayout: calcOwnerPayout(basePrice, commissionAmount),
  };
}
