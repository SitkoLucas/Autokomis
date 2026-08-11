"use client";

import { useState } from "react";
import {
  buildEquipmentFromSelection,
  countSelectedEquipment,
  equipmentCatalog,
} from "@/lib/equipment-catalog";
import { chipActive, chipBase, chipIdle } from "@/lib/vehicle-form-constants";
import type { EquipmentGroup } from "@/lib/vehicles";

export function VehicleEquipmentSection({
  selection,
  onSelectionChange,
}: {
  selection: Record<string, string[]>;
  onSelectionChange: (sel: Record<string, string[]>) => void;
}) {
  const [open, setOpen] = useState(false);
  const count = countSelectedEquipment(selection);

  function toggle(category: string, item: string) {
    const current = selection[category] ?? [];
    const has = current.includes(item);
    onSelectionChange({
      ...selection,
      [category]: has
        ? current.filter((x) => x !== item)
        : [...current, item],
    });
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-primary">Wyposażenie</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Otwórz kafelek i zaznacz pozycje kliknięciem.
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`mt-4 flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
          open
            ? "border-primary bg-primary/5"
            : "border-border bg-white hover:border-ink/30"
        }`}
      >
        <div>
          <p className="text-sm font-semibold text-primary">Wyposażenie</p>
          <p className="mt-0.5 text-sm text-ink-muted">
            {count === 0
              ? "0 pozycji wybranych"
              : `${count} ${
                  count === 1
                    ? "pozycja wybrana"
                    : count < 5
                      ? "pozycje wybrane"
                      : "pozycji wybranych"
                }`}
          </p>
        </div>
        <span
          className={`text-ink-muted transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {open ? (
        <div className="mt-3 space-y-6 rounded-2xl border border-border bg-bg-muted/30 p-4 sm:p-5">
          {equipmentCatalog.map((group) => (
            <div key={group.category}>
              <p className="mb-2 text-sm font-semibold text-primary">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const on = (selection[group.category] ?? []).includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      className={`${chipBase} ${on ? chipActive : chipIdle}`}
                      onClick={() => toggle(group.category, item)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function equipmentFromSelection(
  sel: Record<string, string[]>,
): EquipmentGroup[] {
  return buildEquipmentFromSelection(sel);
}

export function selectionFromEquipment(
  equipment: EquipmentGroup[],
): Record<string, string[]> {
  const sel: Record<string, string[]> = {};
  for (const group of equipment) {
    sel[group.category] = [...group.items];
  }
  return sel;
}
