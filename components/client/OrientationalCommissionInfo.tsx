"use client";

import { useMemo } from "react";
import {
  formatCommissionValue,
  getOrientationalSettlement,
  ORIENTATIONAL_COMMISSION,
} from "@/lib/consignment";
import { formatPrice } from "@/lib/format";

export function OrientationalCommissionInfo({
  basePrice,
  compact = false,
}: {
  basePrice: number;
  compact?: boolean;
}) {
  const settlement = useMemo(
    () => getOrientationalSettlement(basePrice),
    [basePrice],
  );

  if (!settlement) return null;

  return (
    <div
      className={`rounded-xl border border-border bg-bg-muted/40 text-sm ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <p className="font-medium text-ink">
        Orientacyjna prowizja komisu (
        {formatCommissionValue(
          ORIENTATIONAL_COMMISSION.type,
          ORIENTATIONAL_COMMISSION.value,
        )}
        )
      </p>
      <div
        className={`mt-2 grid gap-2 ${compact ? "" : "sm:grid-cols-2 sm:gap-4"}`}
      >
        <p className="text-ink-muted">
          Prowizja komisu:{" "}
          <span className="font-semibold text-primary">
            {formatPrice(settlement.commissionAmount)}
          </span>
        </p>
        <p className="text-ink-muted">
          Szacunkowo dla Ciebie:{" "}
          <span className="font-semibold text-ink">
            {formatPrice(settlement.ownerPayout)}
          </span>
        </p>
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Kwoty orientacyjne. Ostateczne warunki sprzedaży i prowizji ustala komis
        po weryfikacji zgłoszenia.
      </p>
    </div>
  );
}
