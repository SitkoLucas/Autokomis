"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calcCommissionAmount,
  calcOwnerPayout,
  type CommissionType,
  type ConsignmentListing,
} from "@/lib/consignment";
import { formatPrice } from "@/lib/format";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";

export function MarkSoldModal({
  listing,
  open,
  onClose,
  onConfirm,
}: {
  listing: ConsignmentListing;
  open: boolean;
  onClose: () => void;
  onConfirm: (finalSalePrice: number) => void;
}) {
  const publishPrice = listing.publishPrice ?? 0;
  const [salePriceInput, setSalePriceInput] = useState(String(publishPrice));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSalePriceInput(String(listing.publishPrice ?? ""));
    }
  }, [open, listing.publishPrice]);

  const finalSalePrice = Number(
    salePriceInput.replace(/\s/g, "").replace(",", "."),
  );

  const commissionAmount =
    listing.commissionType && listing.commissionValue !== undefined && finalSalePrice > 0
      ? calcCommissionAmount(
          finalSalePrice,
          listing.commissionType,
          listing.commissionValue,
        )
      : 0;

  const ownerPayout = calcOwnerPayout(finalSalePrice, commissionAmount);

  function handleConfirm() {
    if (!Number.isFinite(finalSalePrice) || finalSalePrice <= 0) return;
    setSubmitting(true);
    onConfirm(finalSalePrice);
    setSubmitting(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Rozliczenie sprzedaży" size="lg">
      <div className="space-y-5">
        <div className="rounded-xl bg-bg-muted/50 p-4 text-sm">
          <p className="text-ink-muted">Cena wystawienia</p>
          <p className="text-lg font-semibold text-ink">
            {formatPrice(publishPrice)}
          </p>
        </div>

        <Field label="Rzeczywista cena sprzedaży">
          <input
            className={inputClass}
            inputMode="numeric"
            value={salePriceInput}
            onChange={(e) => setSalePriceInput(e.target.value)}
          />
        </Field>

        {listing.commissionType && listing.commissionValue !== undefined ? (
          <div className="grid gap-3 rounded-xl border border-border p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="text-ink-muted">Prowizja komisu</p>
              <p className="text-lg font-semibold text-primary">
                {formatPrice(commissionAmount)}
              </p>
            </div>
            <div>
              <p className="text-ink-muted">Kwota dla właściciela</p>
              <p className="text-lg font-semibold text-ink">
                {formatPrice(ownerPayout)}
              </p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Anuluj
          </Button>
          <Button
            type="button"
            disabled={submitting || finalSalePrice <= 0}
            onClick={handleConfirm}
          >
            Potwierdź sprzedaż
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function CommissionPreview({
  publishPrice,
  commissionType,
  commissionValue,
}: {
  publishPrice: number;
  commissionType: CommissionType;
  commissionValue: number;
}) {
  const commission = useMemo(
    () => calcCommissionAmount(publishPrice, commissionType, commissionValue),
    [publishPrice, commissionType, commissionValue],
  );
  const payout = useMemo(
    () => calcOwnerPayout(publishPrice, commission),
    [publishPrice, commission],
  );

  if (publishPrice <= 0 || commissionValue <= 0) return null;

  return (
    <div className="grid gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm sm:grid-cols-2">
      <div>
        <p className="text-ink-muted">Prowizja komisu (podgląd)</p>
        <p className="font-semibold text-primary">{formatPrice(commission)}</p>
      </div>
      <div>
        <p className="text-ink-muted">Kwota dla właściciela (podgląd)</p>
        <p className="font-semibold text-ink">{formatPrice(payout)}</p>
      </div>
    </div>
  );
}
