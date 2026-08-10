"use client";

import { useState } from "react";
import {
  daysUntil,
  mockReservations,
  reservationReminderLabel,
} from "@/lib/boss-mocks";
import { formatPrice } from "@/lib/format";
import { getVehicleBySlug } from "@/lib/vehicles";
import { Button } from "@/components/ui/Form";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

export function ReservationsPanel() {
  const items = [...mockReservations].sort(
    (a, b) => daysUntil(a.reservedUntil) - daysUntil(b.reservedUntil),
  );
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    alt: string;
  } | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        Auta z aktywną rezerwacją. Przy końcu terminu przypomnienie o kontakcie
        z klientem.
      </p>
      <ul className="space-y-4">
        {items.map((res) => {
          const vehicle = getVehicleBySlug(res.vehicleSlug);
          const left = daysUntil(res.reservedUntil);
          const urgent = left <= 2;
          const title = vehicle
            ? `${vehicle.make} ${vehicle.model}`
            : res.vehicleSlug;
          const image = vehicle?.images[0];

          return (
            <li
              key={res.id}
              className={`overflow-hidden rounded-2xl border bg-white ${
                urgent ? "border-primary/50 ring-1 ring-primary/20" : "border-border"
              }`}
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-bg-muted sm:w-40">
                  {image ? (
                    <button
                      type="button"
                      aria-label={`Powiększ zdjęcie: ${title}`}
                      className="h-full w-full cursor-pointer"
                      onClick={() =>
                        setLightbox({
                          images: vehicle?.images?.length
                            ? vehicle.images
                            : [image],
                          index: 0,
                          alt: title,
                        })
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {title}
                      </h3>
                      {vehicle ? (
                        <p className="text-sm text-ink-muted">
                          {vehicle.version} · {formatPrice(vehicle.price)}
                        </p>
                      ) : null}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        urgent
                          ? "bg-primary/10 text-primary"
                          : "bg-bg-muted text-ink-muted"
                      }`}
                    >
                      {reservationReminderLabel(left)}
                    </span>
                  </div>

                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-ink-muted">Klient</dt>
                      <dd className="font-medium text-ink">{res.clientName}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Kwota rezerwacji</dt>
                      <dd className="font-medium text-ink">
                        {formatPrice(res.depositAmount)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Wygasa</dt>
                      <dd className="font-medium text-ink">
                        {new Date(
                          `${res.reservedUntil}T12:00:00`,
                        ).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-muted">Kontakt</dt>
                      <dd className="font-medium text-ink">
                        {res.clientPhone}
                      </dd>
                    </div>
                  </dl>

                  {urgent ? (
                    <p className="mt-3 rounded-xl bg-primary/5 px-3 py-2 text-sm text-ink">
                      Przypomnienie: wyślij e-mail albo zadzwoń do klienta, zanim
                      rezerwacja wygaśnie.
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={`mailto:${res.clientEmail}`}>
                      <Button type="button" variant="secondary">
                        Wyślij e-mail
                      </Button>
                    </a>
                    <a href={`tel:${res.clientPhone.replace(/\s/g, "")}`}>
                      <Button type="button" variant="primary">
                        Zadzwoń
                      </Button>
                    </a>
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
