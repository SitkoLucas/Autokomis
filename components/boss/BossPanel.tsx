"use client";

import { useState } from "react";
import { AddVehicleForm } from "./AddVehicleForm";
import { PurchaseOffersPanel } from "./PurchaseOffersPanel";
import { ReservationsPanel } from "./ReservationsPanel";

type TabId = "add" | "reservations" | "purchase";

const tabs: { id: TabId; label: string }[] = [
  { id: "add", label: "Dodaj auto na stronę" },
  { id: "reservations", label: "Rezerwacje" },
  { id: "purchase", label: "Oferty kupna" },
];

export function BossPanel() {
  const [tab, setTab] = useState<TabId>("add");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sekcje panelu szefa"
        className="flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-ink hover:bg-bg-muted"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8" role="tabpanel">
        {tab === "add" ? <AddVehicleForm /> : null}
        {tab === "reservations" ? <ReservationsPanel /> : null}
        {tab === "purchase" ? <PurchaseOffersPanel /> : null}
      </div>
    </div>
  );
}
