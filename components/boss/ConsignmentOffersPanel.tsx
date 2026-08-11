"use client";

import { useCallback, useEffect, useState } from "react";
import {
  approveConsignmentTerms,
  completeConsignmentSale,
  consignmentStatusLabel,
  formatCommissionValue,
  loadConsignments,
  publishConsignment,
  rejectConsignment,
  updateConsignmentListing,
  type CommissionType,
  type ConsignmentListing,
  type ConsignmentStatus,
  getSettlementForListing,
  commissionTypeLabel,
} from "@/lib/consignment";
import { formatMileage, formatPrice } from "@/lib/format";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { ConsignmentVehicleEditor } from "./ConsignmentVehicleEditor";
import { CommissionPreview, MarkSoldModal } from "./MarkSoldModal";

type ViewId = ConsignmentStatus;

const views: { id: ViewId; label: string }[] = [
  { id: "pending", label: "Do weryfikacji" },
  { id: "approved", label: "Zatwierdzone" },
  { id: "published", label: "W ofercie" },
  { id: "sold", label: "Sprzedane" },
  { id: "rejected", label: "Odrzucone" },
];

function TermsForm({
  listing,
  draft,
  onDraftChange,
}: {
  listing: ConsignmentListing;
  draft: ConsignmentListing;
  onDraftChange: (l: ConsignmentListing) => void;
}) {
  const publishPrice = draft.publishPrice ?? listing.expectedPrice;
  const commissionType = draft.commissionType ?? "percentage";
  const commissionValue = draft.commissionValue ?? 5;

  return (
    <div className="mt-6 space-y-4 rounded-2xl border border-border bg-bg-muted/30 p-4">
      <h4 className="font-semibold text-ink">Warunki sprzedaży</h4>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cena publikacji (PLN)">
          <input
            className={inputClass}
            inputMode="numeric"
            value={draft.publishPrice ?? ""}
            onChange={(e) =>
              onDraftChange({
                ...draft,
                publishPrice: Number(e.target.value.replace(/\s/g, "")) || 0,
              })
            }
          />
        </Field>
        <Field label="Typ prowizji">
          <select
            className={inputClass}
            value={commissionType}
            onChange={(e) =>
              onDraftChange({
                ...draft,
                commissionType: e.target.value as CommissionType,
              })
            }
          >
            <option value="percentage">Procent od ceny sprzedaży</option>
            <option value="fixed">Stała kwota</option>
          </select>
        </Field>
        <Field
          label={
            commissionType === "percentage"
              ? "Prowizja (%)"
              : "Prowizja (zł)"
          }
        >
          <input
            className={inputClass}
            inputMode="numeric"
            value={draft.commissionValue ?? ""}
            onChange={(e) =>
              onDraftChange({
                ...draft,
                commissionValue: Number(e.target.value.replace(/\s/g, "")) || 0,
              })
            }
          />
        </Field>
        <Field label="Notatka (opcjonalnie)">
          <input
            className={inputClass}
            value={draft.bossNote ?? ""}
            onChange={(e) =>
              onDraftChange({ ...draft, bossNote: e.target.value })
            }
          />
        </Field>
      </div>
      <CommissionPreview
        publishPrice={publishPrice}
        commissionType={commissionType}
        commissionValue={commissionValue}
      />
    </div>
  );
}

export function ConsignmentOffersPanel() {
  const [view, setView] = useState<ViewId>("pending");
  const [listings, setListings] = useState<ConsignmentListing[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, ConsignmentListing>>({});
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    alt: string;
  } | null>(null);
  const [soldModal, setSoldModal] = useState<ConsignmentListing | null>(null);

  const refresh = useCallback(() => {
    const all = loadConsignments();
    setListings(all);
    setDrafts((prev) => {
      const next = { ...prev };
      for (const l of all) {
        if (!next[l.id]) next[l.id] = { ...l };
      }
      return next;
    });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = listings.filter((l) => l.status === view);

  function getDraft(listing: ConsignmentListing): ConsignmentListing {
    const existing = drafts[listing.id];
    if (existing) return existing;
    return {
      ...listing,
      publishPrice: listing.publishPrice ?? listing.expectedPrice,
      commissionType: listing.commissionType ?? "percentage",
      commissionValue: listing.commissionValue ?? 5,
    };
  }

  function setDraft(listing: ConsignmentListing) {
    setDrafts((prev) => ({ ...prev, [listing.id]: listing }));
  }

  function handleApprove(listing: ConsignmentListing) {
    const draft = getDraft(listing);
    if (
      !draft.publishPrice ||
      !draft.commissionType ||
      draft.commissionValue === undefined
    ) {
      return;
    }
    updateConsignmentListing(listing.id, draft);
    approveConsignmentTerms(listing.id, {
      publishPrice: draft.publishPrice,
      commissionType: draft.commissionType,
      commissionValue: draft.commissionValue,
      bossNote: draft.bossNote,
      listingPatch: draft,
    });
    refresh();
    setExpandedId(null);
  }

  function handleReject(listing: ConsignmentListing) {
    const draft = getDraft(listing);
    rejectConsignment(listing.id, draft.bossNote);
    refresh();
  }

  function handlePublish(listing: ConsignmentListing) {
    const draft = getDraft(listing);
    updateConsignmentListing(listing.id, draft);
    publishConsignment(listing.id);
    refresh();
  }

  function handleSaveEdit(listing: ConsignmentListing) {
    updateConsignmentListing(listing.id, getDraft(listing));
    refresh();
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink-muted">
        Zgłoszenia sprzedaży komisowej od klientów. Zatwierdź warunki, przygotuj
        ogłoszenie i opublikuj w ofercie.
      </p>

      <div className="flex flex-wrap gap-2">
        {views.map((v) => {
          const count = listings.filter((l) => l.status === v.id).length;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                view === v.id
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-ink hover:bg-bg-muted"
              }`}
            >
              {v.label} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-muted">Brak zgłoszeń w tej sekcji.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((listing) => {
            const draft = getDraft(listing);
            const expanded = expandedId === listing.id;
            const mainPhoto = listing.photos[0]?.dataUrl;
            const title = `${listing.make} ${listing.model}`;
            const settlement = getSettlementForListing(
              listing,
              listing.finalSalePrice ?? listing.publishPrice,
            );
            const discount =
              listing.publishPrice && listing.finalSalePrice
                ? listing.finalSalePrice - listing.publishPrice
                : null;

            return (
              <li
                key={listing.id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
                  <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-bg-muted sm:aspect-auto sm:h-52 sm:w-72 lg:h-56 lg:w-80">
                    {mainPhoto ? (
                      <button
                        type="button"
                        aria-label={`Powiększ zdjęcie: ${title}`}
                        className="group relative flex h-full min-h-[11rem] w-full cursor-pointer items-center justify-center sm:min-h-0"
                        onClick={() =>
                          setLightbox({
                            images: listing.photos.map((p) => p.dataUrl),
                            index: 0,
                            alt: title,
                          })
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mainPhoto}
                          alt={title}
                          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                        />
                        {listing.photos.length > 1 ? (
                          <span className="absolute bottom-2 right-2 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-white">
                            {listing.photos.length} zdj.
                          </span>
                        ) : null}
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent px-3 py-2 text-left text-[11px] font-medium text-white opacity-0 transition group-hover:opacity-100">
                          Kliknij, aby powiększyć
                        </span>
                      </button>
                    ) : (
                      <div className="flex h-full min-h-[9rem] items-center justify-center text-sm text-ink-muted">
                        Brak zdjęć
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-ink-muted">
                          {listing.year} · {formatMileage(listing.mileage)}
                        </p>
                        <h3 className="text-lg font-semibold text-ink">{title}</h3>
                        <p className="text-sm text-ink-muted">{listing.version}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {consignmentStatusLabel(listing.status)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-ink-muted">
                      Klient: {listing.clientName} · {listing.clientPhone}
                    </p>
                    <p className="text-sm text-ink-muted">
                      Oczekiwana cena: {formatPrice(listing.expectedPrice)}
                    </p>

                    {listing.status === "sold" && settlement ? (
                      <div className="mt-4 space-y-1 rounded-xl bg-bg-muted/50 p-4 text-sm">
                        <p>
                          Cena wystawienia:{" "}
                          <span className="font-medium">
                            {formatPrice(listing.publishPrice ?? 0)}
                          </span>
                        </p>
                        <p>
                          Rzeczywista cena sprzedaży:{" "}
                          <span className="font-medium">
                            {formatPrice(listing.finalSalePrice ?? 0)}
                          </span>
                        </p>
                        {discount !== null ? (
                          <p>
                            Różnica:{" "}
                            <span
                              className={
                                discount <= 0 ? "text-primary" : "text-ink"
                              }
                            >
                              {discount <= 0 ? "rabat " : "nadwyżka "}
                              {formatPrice(Math.abs(discount))}
                            </span>
                          </p>
                        ) : null}
                        {listing.commissionType &&
                        listing.commissionValue !== undefined ? (
                          <p>
                            Prowizja: {commissionTypeLabel(listing.commissionType)}{" "}
                            (
                            {formatCommissionValue(
                              listing.commissionType,
                              listing.commissionValue,
                            )}
                            )
                          </p>
                        ) : null}
                        <p>
                          Finalna prowizja komisu:{" "}
                          <span className="font-medium text-primary">
                            {formatPrice(settlement.commissionAmount)}
                          </span>
                        </p>
                        <p>
                          Finalna kwota dla właściciela:{" "}
                          <span className="font-medium">
                            {formatPrice(settlement.ownerPayout)}
                          </span>
                        </p>
                        {listing.soldAt ? (
                          <p className="text-ink-muted">
                            Data sprzedaży: {listing.soldAt}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {listing.status === "pending" ? (
                      <>
                        <TermsForm
                          listing={listing}
                          draft={draft}
                          onDraftChange={setDraft}
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button type="button" onClick={() => handleApprove(listing)}>
                            Zatwierdź warunki
                          </Button>
                          <Button
                            variant="secondary"
                            type="button"
                            onClick={() => handleReject(listing)}
                          >
                            Odrzuć
                          </Button>
                        </div>
                      </>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(listing.status === "pending" ||
                        listing.status === "approved" ||
                        listing.status === "published") && (
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={() =>
                            setExpandedId(expanded ? null : listing.id)
                          }
                        >
                          {expanded ? "Zwiń edycję" : "Edytuj ogłoszenie"}
                        </Button>
                      )}
                      {listing.status === "approved" ? (
                        <Button type="button" onClick={() => handlePublish(listing)}>
                          Opublikuj w ofercie
                        </Button>
                      ) : null}
                      {listing.status === "published" ? (
                        <Button
                          type="button"
                          onClick={() => setSoldModal(listing)}
                        >
                          Oznacz jako sprzedane
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {expanded ? (
                  <div className="border-t border-border p-4 sm:p-6">
                    <ConsignmentVehicleEditor
                      listing={draft}
                      onChange={(patch) =>
                        setDraft({ ...draft, ...patch })
                      }
                      showPublishPrice={
                        listing.status === "pending" ||
                        listing.status === "approved" ||
                        listing.status === "published"
                      }
                    />
                    {(listing.status === "approved" ||
                      listing.status === "published") && (
                      <div className="mt-4">
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={() => handleSaveEdit(listing)}
                        >
                          Zapisz zmiany
                        </Button>
                      </div>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      {lightbox ? (
        <ImageLightbox
          open
          onClose={() => setLightbox(null)}
          images={lightbox.images}
          index={lightbox.index}
          onIndexChange={(index) =>
            setLightbox((prev) => (prev ? { ...prev, index } : null))
          }
          alt={lightbox.alt}
        />
      ) : null}

      {soldModal ? (
        <MarkSoldModal
          listing={soldModal}
          open
          onClose={() => setSoldModal(null)}
          onConfirm={(finalSalePrice) => {
            completeConsignmentSale(soldModal.id, finalSalePrice);
            refresh();
            setSoldModal(null);
          }}
        />
      ) : null}
    </div>
  );
}
