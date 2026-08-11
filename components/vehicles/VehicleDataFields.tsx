"use client";

import { useMemo } from "react";
import {
  bodyTypes,
  getBrandById,
  getSellYears,
  sellBrands,
  transmissions,
} from "@/lib/sell-catalog";
import {
  chipActive,
  chipBase,
  chipIdle,
  VEHICLE_FUELS,
} from "@/lib/vehicle-form-constants";
import { Field, inputClass } from "@/components/ui/Form";

export type VehicleFormValues = {
  brandId: string | null;
  model: string | null;
  version: string;
  year: number | null;
  fuel: string | null;
  transmission: string | null;
  bodyType: string | null;
  price: string;
  mileage: string;
  description: string;
  serviceHistory: string;
  owners: string;
  accidentFree: boolean;
};

export function VehicleDataFields({
  values,
  onChange,
  showPrice = true,
  priceLabel = "Cena (PLN)",
  showHistory = true,
  showBasic = true,
}: {
  values: VehicleFormValues;
  onChange: (patch: Partial<VehicleFormValues>) => void;
  showPrice?: boolean;
  priceLabel?: string;
  showHistory?: boolean;
  showBasic?: boolean;
}) {
  const years = useMemo(() => getSellYears(), []);
  const brand = values.brandId ? getBrandById(values.brandId) : undefined;
  const models = brand?.models ?? [];

  return (
    <>
      {showBasic ? (
      <section>
        <h3 className="text-lg font-semibold text-ink">Dane auta</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Wpisz dane. Resztę wybierz kliknięciem.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {showPrice ? (
            <Field label={priceLabel} labelClassName="text-primary">
              <input
                className={inputClass}
                inputMode="numeric"
                placeholder="np. 45900"
                value={values.price}
                onChange={(e) => onChange({ price: e.target.value })}
              />
            </Field>
          ) : null}
          <Field label="Przebieg (km)" labelClassName="text-primary">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="np. 90000"
              value={values.mileage}
              onChange={(e) => onChange({ mileage: e.target.value })}
            />
          </Field>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-primary">Marka</p>
          <div className="flex flex-wrap gap-2">
            {sellBrands.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`${chipBase} ${values.brandId === b.id ? chipActive : chipIdle}`}
                onClick={() => onChange({ brandId: b.id, model: null })}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {values.brandId ? (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-primary">Model</p>
            <div className="flex flex-wrap gap-2">
              {models.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`${chipBase} ${values.model === m ? chipActive : chipIdle}`}
                  onClick={() => onChange({ model: m })}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Wersja (opcjonalnie)" labelClassName="text-primary">
            <input
              className={inputClass}
              placeholder="np. 1.2 Turbo Selection"
              value={values.version}
              onChange={(e) => onChange({ version: e.target.value })}
            />
          </Field>
          <Field label="Rok" labelClassName="text-primary">
            <select
              className={inputClass}
              value={values.year ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                onChange({ year: v ? Number(v) : null });
              }}
            >
              <option value="">Wybierz rok</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Paliwo</p>
            <div className="flex flex-wrap gap-2">
              {VEHICLE_FUELS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`${chipBase} ${values.fuel === f.id ? chipActive : chipIdle}`}
                  onClick={() => onChange({ fuel: f.id })}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Skrzynia</p>
            <div className="flex flex-wrap gap-2">
              {transmissions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`${chipBase} ${values.transmission === t.id ? chipActive : chipIdle}`}
                  onClick={() => onChange({ transmission: t.id })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-primary">Nadwozie</p>
            <div className="flex flex-wrap gap-2">
              {bodyTypes.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`${chipBase} ${values.bodyType === b.id ? chipActive : chipIdle}`}
                  onClick={() => onChange({ bodyType: b.id })}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {showHistory ? (
      <section className="mt-8">
        <h3 className="text-lg font-semibold text-ink">Historia</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Historia serwisowa" labelClassName="text-primary">
            <input
              className={inputClass}
              placeholder="np. Serwis ASO, książka serwisowa"
              value={values.serviceHistory}
              onChange={(e) => onChange({ serviceHistory: e.target.value })}
            />
          </Field>
          <Field label="Liczba właścicieli" labelClassName="text-primary">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="np. 1"
              value={values.owners}
              onChange={(e) => onChange({ owners: e.target.value })}
            />
          </Field>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={values.accidentFree}
            onChange={(e) => onChange({ accidentFree: e.target.checked })}
            className="accent-primary"
          />
          Auto bezwypadkowe
        </label>
      </section>
      ) : null}
    </>
  );
}

export function VehicleDescriptionField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <section>
      <Field label="Opis oferty" labelClassName="text-primary">
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="Krótki opis auta dla klientów..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Field>
    </section>
  );
}

export function parseNumericInput(raw: string): number {
  return Number(raw.replace(/\s/g, "").replace(",", "."));
}

export function getMakeName(brandId: string | null): string {
  if (!brandId) return "";
  return getBrandById(brandId)?.name ?? brandId;
}
