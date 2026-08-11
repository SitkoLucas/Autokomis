"use client";

import { useEffect, useState } from "react";
import {
  calcCommissionAmount,
  calcOwnerPayout,
  commissionTypeLabel,
  consignmentStatusLabel,
  formatCommissionValue,
  getConsignmentsForClient,
  loadConsignments,
  getSettlementForListing,
  type ConsignmentListing,
} from "@/lib/consignment";
import { formatPrice } from "@/lib/format";
import { OrientationalCommissionInfo } from "./OrientationalCommissionInfo";

export function MyConsignmentsPanel({
  clientEmail,
  showAll = false,
}: {
  clientEmail: string;
  showAll?: boolean;
}) {
  const [listings, setListings] = useState<ConsignmentListing[]>([]);

  useEffect(() => {
    setListings(
      showAll ? loadConsignments() : getConsignmentsForClient(clientEmail),
    );
  }, [clientEmail, showAll]);

  if (listings.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        Nie masz jeszcze zgłoszeń. Użyj zakładki „Wstaw auto w komis”, aby dodać
        samochód do weryfikacji.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {listings.map((listing) => {
        const preview = getSettlementForListing(
          listing,
          listing.status === "sold" ? listing.finalSalePrice : listing.publishPrice,
        );
        const showTerms =
          listing.status === "approved" ||
          listing.status === "published" ||
          listing.status === "sold";

        return (
          <li
            key={listing.id}
            className="rounded-2xl border border-border bg-white p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-ink">
                  {listing.make} {listing.model}
                </h3>
                <p className="text-sm text-ink-muted">
                  {listing.version} · {listing.year}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {consignmentStatusLabel(listing.status)}
              </span>
            </div>

            <div className="mt-3 text-sm">
              <p className="text-ink-muted">
                Twoja oczekiwana cena sprzedaży:{" "}
                <span className="font-semibold text-ink">
                  {formatPrice(listing.expectedPrice)}
                </span>
              </p>
            </div>

            {listing.status === "pending" ? (
              <div className="mt-4 space-y-3">
                <OrientationalCommissionInfo
                  basePrice={listing.expectedPrice}
                  compact
                />
                <p className="text-sm text-ink-muted">
                  Komis skontaktuje się z Tobą po sprawdzeniu zgłoszenia.
                </p>
              </div>
            ) : null}

            {listing.status === "sold" ? (
              <div className="mt-4 rounded-xl bg-bg-muted/50 p-4 text-sm">
                <p className="font-semibold text-ink">Samochód sprzedany</p>
                {preview ? (
                  <ul className="mt-2 space-y-1 text-ink-muted">
                    <li>
                      Cena sprzedaży:{" "}
                      <span className="font-medium text-ink">
                        {formatPrice(listing.finalSalePrice ?? 0)}
                      </span>
                    </li>
                    <li>
                      Prowizja komisu:{" "}
                      <span className="font-medium text-ink">
                        {formatPrice(preview.commissionAmount)}
                      </span>
                    </li>
                    <li>
                      Kwota dla Ciebie:{" "}
                      <span className="font-medium text-ink">
                        {formatPrice(preview.ownerPayout)}
                      </span>
                    </li>
                  </ul>
                ) : null}
              </div>
            ) : showTerms && preview && listing.publishPrice ? (
              <div className="mt-4 rounded-xl border border-border p-4 text-sm">
                <p className="font-medium text-ink">Uzgodnione warunki</p>
                <ul className="mt-2 space-y-1 text-ink-muted">
                  <li>
                    Cena publikacji:{" "}
                    <span className="text-ink">
                      {formatPrice(listing.publishPrice)}
                    </span>
                  </li>
                  {listing.commissionType && listing.commissionValue !== undefined ? (
                    <>
                      <li>
                        Prowizja:{" "}
                        {commissionTypeLabel(listing.commissionType)} (
                        {formatCommissionValue(
                          listing.commissionType,
                          listing.commissionValue,
                        )}
                        )
                      </li>
                      <li>
                        Przewidywana kwota dla Ciebie:{" "}
                        <span className="font-medium text-ink">
                          {formatPrice(
                            calcOwnerPayout(
                              listing.publishPrice,
                              calcCommissionAmount(
                                listing.publishPrice,
                                listing.commissionType,
                                listing.commissionValue,
                              ),
                            ),
                          )}
                        </span>
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>
            ) : listing.status === "rejected" ? (
              <p className="mt-3 text-sm text-ink-muted">
                Zgłoszenie zostało odrzucone. Skontaktuj się z komisem, jeśli
                masz pytania.
              </p>
            ) : null}

            {listing.bossNote ? (
              <p className="mt-3 text-sm text-ink-muted">
                Notatka komisu: {listing.bossNote}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
