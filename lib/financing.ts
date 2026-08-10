/** Kalkulator rat (demo). Parametry orientacyjne, nie oferta wiążąca. */

export const FINANCING_DEFAULTS = {
  annualRatePercent: 8.9,
  minMonths: 24,
  maxMonths: 96,
  defaultMonths: 60,
  monthStep: 12,
  minDownPaymentPercent: 0,
  maxDownPaymentPercent: 40,
  defaultDownPaymentPercent: 10,
} as const;

export function calcMonthlyPayment(
  price: number,
  months: number,
  downPayment = 0,
  annualRatePercent = FINANCING_DEFAULTS.annualRatePercent,
): number {
  const principal = Math.max(0, price - downPayment);
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePercent / 100 / 12;
  if (r === 0) return Math.round(principal / months);
  const pow = Math.pow(1 + r, months);
  return Math.round((principal * r * pow) / (pow - 1));
}

/** Najniższa prezentowana rata: max okres + domyślny wkład własny. */
export function estimateFromPrice(price: number): number {
  const down = Math.round(
    (price * FINANCING_DEFAULTS.defaultDownPaymentPercent) / 100,
  );
  return calcMonthlyPayment(price, FINANCING_DEFAULTS.maxMonths, down);
}
