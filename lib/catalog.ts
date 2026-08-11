import { getPublishedConsignmentVehicles } from "./consignment";
import { vehicles, type Vehicle } from "./vehicles";

export function getCatalogVehicles(): Vehicle[] {
  if (typeof window === "undefined") return vehicles;
  const published = getPublishedConsignmentVehicles();
  const slugs = new Set(published.map((v) => v.slug));
  const stock = vehicles.filter((v) => !slugs.has(v.slug));
  return [...published, ...stock];
}

export function getCatalogVehicleBySlug(slug: string): Vehicle | undefined {
  if (typeof window !== "undefined") {
    const consignment = getPublishedConsignmentVehicles().find(
      (v) => v.slug === slug,
    );
    if (consignment) return consignment;
  }
  return vehicles.find((v) => v.slug === slug);
}

export function getCatalogMakes(all: Vehicle[]): string[] {
  return [...new Set(all.map((v) => v.make))].sort();
}

export function getCatalogModelsForMake(
  all: Vehicle[],
  make?: string,
): string[] {
  const list = make ? all.filter((v) => v.make === make) : all;
  return [...new Set(list.map((v) => v.model))].sort();
}
