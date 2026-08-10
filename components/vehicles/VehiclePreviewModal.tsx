"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FinancingModalContent } from "@/components/flows/BookingFlows";
import { InquiryForm, TradeInWithVehicleForm } from "@/components/flows/LeadForms";
import { Button } from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import {
  formatMileage,
  formatMonthly,
  formatPower,
  formatPrice,
} from "@/lib/format";
import type { InquiryContext } from "@/lib/leads";
import {
  drivetrainLabel,
  fuelLabel,
  statusLabel,
  transmissionLabel,
  vehicleDisplayName,
  type Vehicle,
} from "@/lib/vehicles";

type ActionModal = "inquiry" | "trade-in" | null;

function vehicleOfferUrl(origin: string, slug: string) {
  return `${origin}/oferta?slug=${encodeURIComponent(slug)}`;
}

export function VehiclePreviewModal({
  vehicle,
  open,
  onClose,
}: {
  vehicle: Vehicle;
  open: boolean;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [action, setAction] = useState<ActionModal>(null);

  useEffect(() => {
    if (open) setActiveImage(0);
  }, [open, vehicle.slug]);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://demo.local";
  const context: InquiryContext = {
    vehicleSlug: vehicle.slug,
    vehicleName: vehicleDisplayName(vehicle),
    price: vehicle.price,
    vehicleUrl: vehicleOfferUrl(origin, vehicle.slug),
  };

  const closeAction = useCallback(() => setAction(null), []);

  const specs = [
    { label: "Rok", value: String(vehicle.year) },
    { label: "Przebieg", value: formatMileage(vehicle.mileage) },
    { label: "Moc", value: formatPower(vehicle.power) },
    { label: "Paliwo", value: fuelLabel(vehicle.fuel) },
    { label: "Skrzynia", value: transmissionLabel(vehicle.transmission) },
    { label: "Napęd", value: drivetrainLabel(vehicle.drivetrain) },
    { label: "Silnik", value: vehicle.engine },
    { label: "Kolor", value: vehicle.color },
  ];

  const actionTitles: Record<Exclude<ActionModal, null>, string> = {
    inquiry: "Zapytaj o cenę indywidualną",
    "trade-in": "Auto w rozliczeniu",
  };

  return (
    <>
      <Modal
        open={open && action == null}
        onClose={onClose}
        title={vehicleDisplayName(vehicle)}
        size="xl"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-bg-muted">
                <Image
                  src={vehicle.images[activeImage] ?? vehicle.images[0]}
                  alt={vehicleDisplayName(vehicle)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                  priority
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink shadow-sm">
                  {statusLabel(vehicle.status, vehicle.reservedUntil)}
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {vehicle.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-bg-muted transition ${
                      activeImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </div>

            <section>
              <h3 className="text-xl font-semibold text-ink">Rozłóż na raty</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Cena przykładowa. Finalna kwota jest indywidualna. Dopasuj okres
                i wkład własny, a zostaw kontakt po ofertę.
              </p>
              <div className="mt-4">
                <FinancingModalContent
                  context={context}
                  monthlyPrice={vehicle.monthlyPrice}
                />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-semibold tracking-tight text-ink">
                {vehicle.make} {vehicle.model}
              </h4>
              <p className="mt-1 text-ink-muted">{vehicle.version}</p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-muted">
                <span>{vehicle.year}</span>
                <span>{formatMileage(vehicle.mileage)}</span>
                <span>{formatPower(vehicle.power)}</span>
                <span>{fuelLabel(vehicle.fuel)}</span>
                <span>{transmissionLabel(vehicle.transmission)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-bg-muted/40 px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                Cena przykładowa
              </p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                {formatPrice(vehicle.price)}
              </p>
              <p className="mt-1 text-sm font-medium text-primary">
                {formatMonthly(vehicle.monthlyPrice)}
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Cena indywidualna, ustalana po kontakcie. Możliwość rozłożenia na
                raty albo rozliczenia za inne auto.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-1">
                {vehicle.status !== "reserved" ? (
                  <Link
                    href={`/rezerwacje?slug=${vehicle.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                  >
                    Zarezerwuj pojazd
                  </Link>
                ) : null}
                <Button variant="secondary" onClick={() => setAction("trade-in")}>
                  Auto w rozliczeniu
                </Button>
                <Button variant="dark" onClick={() => setAction("inquiry")}>
                  Zapytaj o cenę indywidualną
                </Button>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Opis
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {vehicle.description}
              </p>
            </div>

            <div>
              <h5 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Parametry
              </h5>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border px-3 py-2.5"
                  >
                    <p className="text-[11px] uppercase tracking-wide text-ink-muted">
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-ink">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                Wyposażenie
              </h5>
              <div className="mt-3 space-y-3">
                {vehicle.equipment.map((group) => (
                  <div key={group.category}>
                    <p className="text-sm font-semibold text-ink">
                      {group.category}
                    </p>
                    <ul className="mt-1.5 space-y-1 text-sm text-ink-muted">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={action != null}
        onClose={closeAction}
        title={action ? actionTitles[action] : ""}
      >
        {action === "inquiry" ? (
          <InquiryForm
            context={context}
            onDone={() => {
              closeAction();
              onClose();
            }}
          />
        ) : null}
        {action === "trade-in" ? (
          <TradeInWithVehicleForm
            interestedInSlug={vehicle.slug}
            onDone={() => {
              closeAction();
              onClose();
            }}
          />
        ) : null}
      </Modal>
    </>
  );
}
