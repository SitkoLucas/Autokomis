"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  filterVehicles,
  resultsLabel,
  serializeFilters,
  type SortOption,
  type VehicleFiltersState,
} from "@/lib/filters";
import {
  getMakes,
  getModelsForMake,
  getVehicleBySlug,
  vehicles,
  type FuelType,
  type TransmissionType,
} from "@/lib/vehicles";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { Drawer } from "@/components/ui/Drawer";
import { VehicleCard } from "./VehicleCard";
import { VehiclePreviewModal } from "./VehiclePreviewModal";

function FiltersForm({
  value,
  onChange,
}: {
  value: VehicleFiltersState;
  onChange: (next: VehicleFiltersState) => void;
}) {
  const models = useMemo(() => getModelsForMake(value.make), [value.make]);

  return (
    <div className="space-y-4">
      <Field label="Marka">
        <select
          className={inputClass}
          value={value.make || ""}
          onChange={(e) =>
            onChange({ ...value, make: e.target.value || undefined, model: undefined })
          }
        >
          <option value="">Wszystkie</option>
          {getMakes().map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Model">
        <select
          className={inputClass}
          value={value.model || ""}
          onChange={(e) =>
            onChange({ ...value, model: e.target.value || undefined })
          }
        >
          <option value="">Wszystkie</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Cena od">
          <input
            className={inputClass}
            type="number"
            inputMode="numeric"
            placeholder="np. 100000"
            value={value.priceFrom ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                priceFrom: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </Field>
        <Field label="Cena do">
          <input
            className={inputClass}
            type="number"
            inputMode="numeric"
            placeholder="np. 250000"
            value={value.priceTo ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                priceTo: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Rok od">
          <input
            className={inputClass}
            type="number"
            inputMode="numeric"
            value={value.yearFrom ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                yearFrom: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </Field>
        <Field label="Rok do">
          <input
            className={inputClass}
            type="number"
            inputMode="numeric"
            value={value.yearTo ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                yearTo: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          />
        </Field>
      </div>
      <Field label="Przebieg do">
        <input
          className={inputClass}
          type="number"
          inputMode="numeric"
          placeholder="np. 100000"
          value={value.mileageTo ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              mileageTo: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </Field>
      <Field label="Paliwo">
        <select
          className={inputClass}
          value={value.fuel || ""}
          onChange={(e) =>
            onChange({
              ...value,
              fuel: (e.target.value || undefined) as FuelType | undefined,
            })
          }
        >
          <option value="">Wszystkie</option>
          <option value="benzyna">Benzyna</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybryda</option>
          <option value="electric">Elektryczny</option>
        </select>
      </Field>
      <Field label="Skrzynia">
        <select
          className={inputClass}
          value={value.transmission || ""}
          onChange={(e) =>
            onChange({
              ...value,
              transmission: (e.target.value || undefined) as
                | TransmissionType
                | undefined,
            })
          }
        >
          <option value="">Wszystkie</option>
          <option value="automatic">Automatyczna</option>
          <option value="manual">Manualna</option>
        </select>
      </Field>
      <Field label="Sortowanie">
        <select
          className={inputClass}
          value={value.sort || "newest"}
          onChange={(e) =>
            onChange({ ...value, sort: e.target.value as SortOption })
          }
        >
          <option value="newest">Najnowsze</option>
          <option value="price-asc">Cena: rosnąco</option>
          <option value="price-desc">Cena: malejąco</option>
          <option value="mileage-asc">Przebieg: rosnąco</option>
        </select>
      </Field>
    </div>
  );
}

export function OfferCatalog({
  initialFilters,
}: {
  initialFilters: VehicleFiltersState;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [, startTransition] = useTransition();

  const results = useMemo(() => filterVehicles(vehicles, filters), [filters]);
  const deepLinkedVehicle = useMemo(() => {
    const slug = searchParams.get("slug");
    return slug ? getVehicleBySlug(slug) : undefined;
  }, [searchParams]);

  const apply = (next: VehicleFiltersState) => {
    setFilters(next);
    startTransition(() => {
      router.replace(`/oferta${serializeFilters(next)}`, { scroll: false });
    });
  };

  const reset = () => apply({ sort: "newest" });

  const closeDeepLink = () => {
    startTransition(() => {
      router.replace(`/oferta${serializeFilters(filters)}`, { scroll: false });
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Oferta
          </h1>
          <p className="mt-2 text-sm text-ink-muted" aria-live="polite">
            {resultsLabel(results.length)}
          </p>
        </div>
        <Button
          variant="secondary"
          className="md:hidden"
          onClick={() => setDrawerOpen(true)}
        >
          Filtry
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden rounded-3xl border border-border bg-white p-5 lg:block">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-ink">Filtry</p>
            <button
              type="button"
              className="text-xs font-medium text-primary"
              onClick={reset}
            >
              Wyczyść
            </button>
          </div>
          <FiltersForm value={filters} onChange={apply} />
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-bg-muted px-6 py-16 text-center">
              <p className="text-lg font-semibold text-ink">
                Brak aut dla wybranych filtrów
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Zmień kryteria albo wyczyść filtry.
              </p>
              <Button className="mt-6" onClick={reset}>
                Wyczyść filtry
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((v) => (
                <VehicleCard key={v.slug} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Filtry"
      >
        <FiltersForm
          value={filters}
          onChange={(next) => {
            apply(next);
          }}
        />
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={reset}>
            Wyczyść
          </Button>
          <Button className="flex-1" onClick={() => setDrawerOpen(false)}>
            Pokaż ({results.length})
          </Button>
        </div>
      </Drawer>

      {deepLinkedVehicle ? (
        <VehiclePreviewModal
          vehicle={deepLinkedVehicle}
          open
          onClose={closeDeepLink}
        />
      ) : null}
    </div>
  );
}
