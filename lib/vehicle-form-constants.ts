export const VEHICLE_FUELS = [
  { id: "benzyna", label: "Benzyna" },
  { id: "diesel", label: "Diesel" },
  { id: "hybrid", label: "Hybryda" },
  { id: "electric", label: "Elektryczny" },
] as const;

export const chipBase =
  "rounded-full border px-3.5 py-2 text-sm font-medium transition";
export const chipIdle = "border-border bg-white text-ink hover:border-ink/30";
export const chipActive = "border-primary bg-primary/10 text-primary";
