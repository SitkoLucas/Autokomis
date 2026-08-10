"use client";

import { useCallback, useEffect, useState } from "react";
import { BookingFlow, FinancingModalContent, ReserveFlow } from "@/components/flows/BookingFlows";
import { InquiryForm, TradeInWithVehicleForm } from "@/components/flows/LeadForms";
import { Button } from "@/components/ui/Form";
import { Modal } from "@/components/ui/Modal";
import { formatMonthly, formatPrice } from "@/lib/format";
import type { InquiryContext } from "@/lib/leads";
import { shareOrCopy } from "@/lib/share";
import { site, vehicleWhatsappMessage, whatsappUrl } from "@/lib/site";
import {
  vehicleDisplayName,
  type Vehicle,
} from "@/lib/vehicles";

type ModalKind =
  | "inquiry"
  | "booking"
  | "reserve"
  | "financing"
  | "trade-in"
  | null;

function buildContext(vehicle: Vehicle, origin: string): InquiryContext {
  return {
    vehicleSlug: vehicle.slug,
    vehicleName: vehicleDisplayName(vehicle),
    price: vehicle.price,
    vehicleUrl: `${origin}/oferta/${vehicle.slug}`,
  };
}

export function ShareButton({ vehicle }: { vehicle: Vehicle }) {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="relative">
      <button
        type="button"
        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-bg-muted"
        onClick={async () => {
          try {
            const url =
              typeof window !== "undefined"
                ? window.location.href
                : `/oferta/${vehicle.slug}`;
            const result = await shareOrCopy({
              title: vehicleDisplayName(vehicle),
              text: `Sprawdź ${vehicleDisplayName(vehicle)} w ${site.name}`,
              url,
            });
            if (result === "copied") {
              setToast("Skopiowano link");
              setTimeout(() => setToast(null), 2000);
            }
          } catch {
            // user aborted share
          }
        }}
      >
        Udostępnij
      </button>
      {toast ? (
        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs text-white">
          {toast}
        </span>
      ) : null}
    </div>
  );
}

export function StickyVehicleCta({ vehicle }: { vehicle: Vehicle }) {
  const [modal, setModal] = useState<ModalKind>(null);
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const context = buildContext(vehicle, origin || "https://demo.local");
  const wa = whatsappUrl(
    vehicleWhatsappMessage(vehicle.make, vehicle.model, vehicle.version),
  );

  const openFinancing = useCallback(() => setModal("financing"), []);
  const openTradeIn = useCallback(() => setModal("trade-in"), []);
  const openReserve = useCallback(() => setModal("reserve"), []);

  const titles: Record<Exclude<ModalKind, null>, string> = {
    inquiry: "Zapytaj o samochód",
    booking: "Umów oględziny",
    reserve: "Zarezerwuj auto",
    financing: "Oblicz finansowanie",
    "trade-in": "Zostaw auto w rozliczeniu",
  };

  return (
    <>
      {/* Desktop sticky panel */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-3xl border border-border bg-white p-6 shadow-[0_24px_60px_-40px_rgba(17,17,17,0.45)]">
          <p className="text-sm text-ink-muted">Cena</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
            {formatPrice(vehicle.price)}
          </p>
          <p className="mt-1 text-sm font-medium text-primary">
            {formatMonthly(vehicle.monthlyPrice)}
          </p>
          <div className="mt-6 grid gap-2">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Zadzwoń
            </a>
            <Button variant="secondary" onClick={() => setModal("inquiry")}>
              Zapytaj
            </Button>
            <Button variant="secondary" onClick={() => setModal("booking")}>
              Umów oględziny
            </Button>
            <Button variant="dark" onClick={() => setModal("reserve")}>
              Zarezerwuj auto
            </Button>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-ink hover:bg-bg-muted"
            >
              WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Numery kontaktowe są przykładowe (demo).
          </p>
        </div>
      </aside>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:p-4 lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {formatPrice(vehicle.price)}
            </p>
            <p className="truncate text-xs text-primary">
              {formatMonthly(vehicle.monthlyPrice)}
            </p>
          </div>
          <a
            href={site.phoneHref}
            className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white"
          >
            Zadzwoń
          </a>
          <button
            type="button"
            onClick={() => setModal("inquiry")}
            className="rounded-full border border-border px-3 py-2 text-xs font-semibold"
          >
            Zapytaj
          </button>
          <button
            type="button"
            onClick={() => setModal("booking")}
            className="rounded-full bg-ink px-3 py-2 text-xs font-semibold text-white"
          >
            Oględziny
          </button>
        </div>
        <div className="mx-auto mt-2 flex max-w-6xl gap-2">
          <button
            type="button"
            onClick={() => setModal("reserve")}
            className="flex-1 rounded-full border border-border py-2 text-xs font-semibold"
          >
            Zarezerwuj
          </button>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full border border-border py-2 text-center text-xs font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <Modal
        open={modal != null}
        onClose={() => setModal(null)}
        title={modal ? titles[modal] : ""}
      >
        {modal === "inquiry" ? (
          <InquiryForm context={context} onDone={() => setModal(null)} />
        ) : null}
        {modal === "booking" ? (
          <BookingFlow context={context} onDone={() => setModal(null)} />
        ) : null}
        {modal === "reserve" ? (
          <ReserveFlow context={context} onDone={() => setModal(null)} />
        ) : null}
        {modal === "financing" ? (
          <FinancingModalContent
            context={context}
            monthlyPrice={vehicle.monthlyPrice}
            onDone={() => setModal(null)}
          />
        ) : null}
        {modal === "trade-in" ? (
          <TradeInWithVehicleForm
            interestedInSlug={vehicle.slug}
            onDone={() => setModal(null)}
          />
        ) : null}
      </Modal>

      {/* Expose openers for page sections via custom events */}
      <VehicleActionsBridge
        onFinancing={openFinancing}
        onTradeIn={openTradeIn}
        onReserve={openReserve}
      />
    </>
  );
}

function VehicleActionsBridge({
  onFinancing,
  onTradeIn,
  onReserve,
}: {
  onFinancing: () => void;
  onTradeIn: () => void;
  onReserve: () => void;
}) {
  useEffect(() => {
    const fin = () => onFinancing();
    const trade = () => onTradeIn();
    const res = () => onReserve();
    window.addEventListener("ak-open-financing", fin);
    window.addEventListener("ak-open-trade-in", trade);
    window.addEventListener("ak-open-reserve", res);
    return () => {
      window.removeEventListener("ak-open-financing", fin);
      window.removeEventListener("ak-open-trade-in", trade);
      window.removeEventListener("ak-open-reserve", res);
    };
  }, [onFinancing, onTradeIn, onReserve]);
  return null;
}

export function openFinancingModal() {
  window.dispatchEvent(new Event("ak-open-financing"));
}

export function openTradeInModal() {
  window.dispatchEvent(new Event("ak-open-trade-in"));
}
