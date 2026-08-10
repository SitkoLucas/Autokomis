import { vehicles, type Vehicle } from "./vehicles";

export const MAX_RESERVATION_BUSINESS_DAYS = 10;
export const MIN_RESERVATION_BUSINESS_DAYS = 1;

/** 1% ceny za każdy dzień roboczy (max 10%). */
export function calcDeposit(
  price: number,
  businessDays: number,
): { percent: number; amount: number } {
  const days = clampBusinessDays(businessDays);
  const percent = days;
  const amount = Math.round((price * percent) / 100);
  return { percent, amount };
}

export function clampBusinessDays(days: number): number {
  if (!Number.isFinite(days)) return MIN_RESERVATION_BUSINESS_DAYS;
  return Math.min(
    MAX_RESERVATION_BUSINESS_DAYS,
    Math.max(MIN_RESERVATION_BUSINESS_DAYS, Math.round(days)),
  );
}

/** Czy dzień to sobota lub niedziela. */
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/** Data końca rezerwacji: dziś + N dni roboczych (bez sobót i niedziel). */
export function addBusinessDays(from: Date, businessDays: number): Date {
  const days = clampBusinessDays(businessDays);
  const result = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result)) added += 1;
  }
  return result;
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatBusinessDate(date: Date): string {
  return date.toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isVehicleReservable(
  vehicle: Vehicle,
  today = new Date(),
): boolean {
  if (vehicle.status !== "reserved") return true;
  if (!vehicle.reservedUntil) return false;
  return vehicle.reservedUntil < toIsoDate(today);
}

export function getReservableVehicles(today = new Date()): Vehicle[] {
  return vehicles.filter((v) => isVehicleReservable(v, today));
}
