import {
  vehicles,
  type FuelType,
  type TransmissionType,
  type Vehicle,
} from "./vehicles";

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "mileage-asc";

export type VehicleFiltersState = {
  make?: string;
  model?: string;
  priceFrom?: number;
  priceTo?: number;
  yearFrom?: number;
  yearTo?: number;
  mileageTo?: number;
  fuel?: FuelType;
  transmission?: TransmissionType;
  sort?: SortOption;
};

function num(v: string | null): number | undefined {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function parseFilters(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): VehicleFiltersState {
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) {
      return params.get(key) ?? undefined;
    }
    const raw = params[key];
    return Array.isArray(raw) ? raw[0] : raw;
  };

  return {
    make: get("make") || undefined,
    model: get("model") || undefined,
    priceFrom: num(get("priceFrom") ?? null),
    priceTo: num(get("priceTo") ?? null),
    yearFrom: num(get("yearFrom") ?? null),
    yearTo: num(get("yearTo") ?? null),
    mileageTo: num(get("mileageTo") ?? null),
    fuel: get("fuel") as FuelType | undefined,
    transmission: get("transmission") as TransmissionType | undefined,
    sort: (get("sort") as SortOption | undefined) || "newest",
  };
}

export function serializeFilters(filters: VehicleFiltersState): string {
  const p = new URLSearchParams();
  if (filters.make) p.set("make", filters.make);
  if (filters.model) p.set("model", filters.model);
  if (filters.priceFrom != null) p.set("priceFrom", String(filters.priceFrom));
  if (filters.priceTo != null) p.set("priceTo", String(filters.priceTo));
  if (filters.yearFrom != null) p.set("yearFrom", String(filters.yearFrom));
  if (filters.yearTo != null) p.set("yearTo", String(filters.yearTo));
  if (filters.mileageTo != null) p.set("mileageTo", String(filters.mileageTo));
  if (filters.fuel) p.set("fuel", filters.fuel);
  if (filters.transmission) p.set("transmission", filters.transmission);
  if (filters.sort && filters.sort !== "newest") p.set("sort", filters.sort);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function filterVehicles(
  list: Vehicle[] = vehicles,
  filters: VehicleFiltersState = {},
): Vehicle[] {
  let result = list.filter((v) => {
    if (filters.make && v.make !== filters.make) return false;
    if (filters.model && v.model !== filters.model) return false;
    if (filters.priceFrom != null && v.price < filters.priceFrom) return false;
    if (filters.priceTo != null && v.price > filters.priceTo) return false;
    if (filters.yearFrom != null && v.year < filters.yearFrom) return false;
    if (filters.yearTo != null && v.year > filters.yearTo) return false;
    if (filters.mileageTo != null && v.mileage > filters.mileageTo) return false;
    if (filters.fuel && v.fuel !== filters.fuel) return false;
    if (filters.transmission && v.transmission !== filters.transmission)
      return false;
    return true;
  });

  const sort = filters.sort || "newest";
  result = [...result].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "mileage-asc":
        return a.mileage - b.mileage;
      case "newest":
      default:
        return b.year - a.year || a.mileage - b.mileage;
    }
  });

  return result;
}

export function resultsLabel(count: number): string {
  if (count === 1) return "Znaleźliśmy 1 samochód";
  if (count >= 2 && count <= 4) return `Znaleźliśmy ${count} samochody`;
  return `Znaleźliśmy ${count} samochodów`;
}
