export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMonthly(value: number): string {
  return `od ${formatPrice(value)}/mies.`;
}

export function formatMileage(value: number): string {
  return `${new Intl.NumberFormat("pl-PL").format(value)} km`;
}

export function formatPower(value: number): string {
  return `${value} KM`;
}
