"use client";

import { useState } from "react";
import { mockPurchaseOffers, type PurchaseOffer } from "@/lib/boss-mocks";
import { formatMileage, formatPower, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Form";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

function statusLabel(status: PurchaseOffer["status"]): string {
  return status === "new" ? "Nowe" : "Do kontaktu";
}

export function PurchaseOffersPanel() {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    alt: string;
  } | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        Zgłoszenia sprzedaży aut od klientów ze strony „Sprzedaj auto”.
      </p>
      <ul className="space-y-4">
        {mockPurchaseOffers.map((offer) => {
          const mainImage = offer.images[0];
          const title = `${offer.make} ${offer.model}`;
          return (
            <li
              key={offer.id}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row">
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-bg-muted sm:w-48">
                  {mainImage ? (
                    <button
                      type="button"
                      aria-label={`Powiększ zdjęcie: ${title}`}
                      className="h-full w-full cursor-pointer"
                      onClick={() =>
                        setLightbox({
                          images: offer.images,
                          index: 0,
                          alt: title,
                        })
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mainImage}
                        alt={title}
                        className="h-full w-full object-contain"
                      />
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
                      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                        {offer.condition} · {offer.year}
                      </p>
                      <h3 className="mt-0.5 text-lg font-semibold text-ink">
                        {title}
                      </h3>
                      <p className="text-sm text-ink-muted">{offer.version}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        offer.status === "new"
                          ? "bg-primary/10 text-primary"
                          : "bg-bg-muted text-ink-muted"
                      }`}
                    >
                      {statusLabel(offer.status)}
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-semibold text-ink">
                    {formatPrice(offer.expectedPrice)}
                    <span className="ml-2 text-sm font-normal text-ink-muted">
                      oferowana cena klienta
                    </span>
                  </p>

                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-ink-muted">Przebieg</dt>
                      <dd className="font-medium text-ink">
                        {formatMileage(offer.mileage)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Paliwo</dt>
                      <dd className="font-medium text-ink">{offer.fuel}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Skrzynia</dt>
                      <dd className="font-medium text-ink">
                        {offer.transmission}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Nadwozie</dt>
                      <dd className="font-medium text-ink">{offer.bodyType}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Pojemność</dt>
                      <dd className="font-medium text-ink">
                        {offer.engineCapacity}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Moc</dt>
                      <dd className="font-medium text-ink">
                        {formatPower(offer.power)}
                      </dd>
                    </div>
                    {offer.drivetrain ? (
                      <div>
                        <dt className="text-ink-muted">Napęd</dt>
                        <dd className="font-medium text-ink">
                          {offer.drivetrain}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  {offer.images.length > 1 ? (
                    <div className="mt-3 flex gap-2">
                      {offer.images.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          aria-label={`Powiększ zdjęcie ${i + 1}: ${title}`}
                          className="h-14 w-20 overflow-hidden rounded-lg bg-bg-muted"
                          onClick={() =>
                            setLightbox({
                              images: offer.images,
                              index: i,
                              alt: title,
                            })
                          }
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt=""
                            className="h-full w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-3">
                    <div className="text-sm">
                      <p className="font-medium text-ink">{offer.clientName}</p>
                      <p className="text-ink-muted">
                        {offer.clientPhone} · zgłoszenie{" "}
                        {new Date(
                          `${offer.submittedAt}T12:00:00`,
                        ).toLocaleDateString("pl-PL")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a href={`mailto:${offer.clientEmail}`}>
                        <Button type="button" variant="secondary">
                          E-mail
                        </Button>
                      </a>
                      <a href={`tel:${offer.clientPhone.replace(/\s/g, "")}`}>
                        <Button type="button">Zadzwoń</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <ImageLightbox
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
        images={lightbox?.images ?? []}
        index={lightbox?.index ?? 0}
        onIndexChange={(index) =>
          setLightbox((prev) => (prev ? { ...prev, index } : prev))
        }
        alt={lightbox?.alt ?? ""}
        title={lightbox?.alt ?? "Zdjęcie"}
      />
    </div>
  );
}
