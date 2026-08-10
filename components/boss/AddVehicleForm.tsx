"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import {
  bodyTypes,
  getBrandById,
  getSellYears,
  sellBrands,
  transmissions,
} from "@/lib/sell-catalog";
import {
  buildEquipmentFromSelection,
  countSelectedEquipment,
  equipmentCatalog,
} from "@/lib/equipment-catalog";
import { estimateFromPrice } from "@/lib/financing";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";

type PhotoItem = {
  id: string;
  name: string;
  previewUrl: string;
};

const MAX_PHOTOS = 16;
const FUELS = [
  { id: "benzyna", label: "Benzyna" },
  { id: "diesel", label: "Diesel" },
  { id: "hybrid", label: "Hybryda" },
  { id: "electric", label: "Elektryczny" },
] as const;

const chipBase =
  "rounded-full border px-3.5 py-2 text-sm font-medium transition";
const chipIdle = "border-border bg-white text-ink hover:border-ink/30";
const chipActive = "border-primary bg-primary/10 text-primary";

function filesFromList(list: FileList | null): File[] {
  if (!list) return [];
  return Array.from(list).filter((f) => f.type.startsWith("image/"));
}

export function AddVehicleForm() {
  const years = useMemo(() => getSellYears(), []);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dragPhotoId, setDragPhotoId] = useState<string | null>(null);

  const [brandId, setBrandId] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [version, setVersion] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [fuel, setFuel] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(null);
  const [equipmentSel, setEquipmentSel] = useState<Record<string, string[]>>(
    {},
  );
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const equipmentCount = countSelectedEquipment(equipmentSel);

  const brand = brandId ? getBrandById(brandId) : undefined;
  const models = brand?.models ?? [];

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (photos.length === 0) {
      setMainPhotoId(null);
      return;
    }
    if (!mainPhotoId || !photos.some((p) => p.id === mainPhotoId)) {
      setMainPhotoId(photos[0].id);
    }
  }, [photos, mainPhotoId]);

  function addImageFiles(files: File[]) {
    if (!files.length) return;
    setPhotos((prev) => {
      const room = MAX_PHOTOS - prev.length;
      if (room <= 0) return prev;
      const next = files.slice(0, room).map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name || "zdjecie.png",
        previewUrl: URL.createObjectURL(file),
      }));
      return [...prev, ...next];
    });
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  function reorderPhotos(fromId: string, toId: string) {
    if (fromId === toId) return;
    setPhotos((prev) => {
      const from = prev.findIndex((p) => p.id === fromId);
      const to = prev.findIndex((p) => p.id === toId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function onPastePhotos(e: ClipboardEvent<HTMLDivElement>) {
    const items = e.clipboardData?.items;
    if (!items) return;
    const files: File[] = [];
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length) {
      e.preventDefault();
      addImageFiles(files);
    }
  }

  function toggleEquipment(category: string, item: string) {
    setEquipmentSel((prev) => {
      const current = prev[category] ?? [];
      const has = current.includes(item);
      return {
        ...prev,
        [category]: has
          ? current.filter((x) => x !== item)
          : [...current, item],
      };
    });
  }

  function canSubmit(): boolean {
    const priceNum = Number(price.replace(/\s/g, "").replace(",", "."));
    const mileageNum = Number(mileage.replace(/\s/g, "").replace(",", "."));
    return (
      Boolean(brandId) &&
      Boolean(model) &&
      Boolean(year) &&
      Boolean(fuel) &&
      Boolean(transmission) &&
      Boolean(bodyType) &&
      photos.length >= 1 &&
      Number.isFinite(priceNum) &&
      priceNum > 0 &&
      Number.isFinite(mileageNum) &&
      mileageNum >= 0
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit() || submitting) return;
    setSubmitting(true);
    const priceNum = Number(price.replace(/\s/g, "").replace(",", "."));
    const mileageNum = Number(mileage.replace(/\s/g, "").replace(",", "."));
    const ordered = [...photos];
    if (mainPhotoId) {
      const idx = ordered.findIndex((p) => p.id === mainPhotoId);
      if (idx > 0) {
        const [main] = ordered.splice(idx, 1);
        ordered.unshift(main);
      }
    }
    const payload = {
      type: "boss-add-vehicle" as const,
      make: brand?.name ?? brandId,
      model,
      version: version.trim() || undefined,
      year,
      fuel,
      transmission,
      bodyType,
      price: priceNum,
      monthlyPrice: estimateFromPrice(priceNum),
      mileage: mileageNum,
      description: description.trim(),
      equipment: buildEquipmentFromSelection(equipmentSel),
      photoCount: ordered.length,
      photoNames: ordered.map((p) => p.name),
      mainPhoto: ordered[0]?.name,
    };
    await new Promise((r) => setTimeout(r, 450));
    console.info("[AutoKomis Panel Szefa] dodaj ofertę", payload);
    try {
      const key = "autokomis-demo-boss-offers";
      const prev = JSON.parse(sessionStorage.getItem(key) || "[]") as unknown[];
      prev.push(payload);
      sessionStorage.setItem(key, JSON.stringify(prev));
    } catch {
      // ignore
    }
    setSubmitting(false);
    setDone(true);
  }

  function resetForm() {
    photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPhotos([]);
    setMainPhotoId(null);
    setBrandId(null);
    setModel(null);
    setVersion("");
    setYear(null);
    setFuel(null);
    setTransmission(null);
    setBodyType(null);
    setPrice("");
    setMileage("");
    setDescription("");
    setEquipmentSel({});
    setEquipmentOpen(false);
    setDone(false);
  }

  if (done) {
    return (
      <SuccessState
        title="Oferta przygotowana"
        description="Demo: dane oferty zapisane lokalnie. W produkcji auto pojawi się w katalogu po publikacji."
        onClose={resetForm}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section>
        <h3 className="text-lg font-semibold text-ink">Zdjęcia</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Wklej (Ctrl+V), przeciągnij pliki albo wybierz z dysku. Ustaw kolejność
          i zdjęcie główne.
        </p>
        <div
          tabIndex={0}
          onPaste={onPastePhotos}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setDragOver(false);
            addImageFiles(filesFromList(e.dataTransfer.files));
          }}
          className={`mt-4 rounded-2xl border-2 border-dashed px-4 py-8 text-center outline-none transition focus:border-primary ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border bg-bg-muted/40"
          }`}
        >
          <p className="text-sm font-medium text-ink">
            Upuść zdjęcia tutaj lub wklej ze schowka
          </p>
          <label className="mt-4 inline-flex cursor-pointer">
            <span className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-bg-muted">
              Wybierz pliki
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                addImageFiles(filesFromList(e.target.files));
                e.target.value = "";
              }}
            />
          </label>
        </div>

        {photos.length > 0 ? (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {photos.map((photo, index) => (
              <li
                key={photo.id}
                draggable
                onDragStart={() => setDragPhotoId(photo.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragPhotoId) reorderPhotos(dragPhotoId, photo.id);
                  setDragPhotoId(null);
                }}
                className="relative overflow-hidden rounded-xl border border-border bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.previewUrl}
                  alt={photo.name}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex items-center justify-between gap-1 border-t border-border px-2 py-1.5">
                  <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-ink">
                    <input
                      type="radio"
                      name="main-photo"
                      checked={mainPhotoId === photo.id}
                      onChange={() => setMainPhotoId(photo.id)}
                      className="accent-primary"
                    />
                    Główne
                  </label>
                  <span className="text-[10px] text-ink-muted">#{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="text-[11px] font-semibold text-primary"
                    aria-label={`Usuń ${photo.name}`}
                  >
                    Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-ink">Dane auta</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Wpisz cenę i przebieg. Resztę wybierz kliknięciem.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Cena (PLN)" labelClassName="text-primary">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="np. 45900"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Field>
          <Field label="Przebieg (km)" labelClassName="text-primary">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="np. 90000"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              required
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
                className={`${chipBase} ${brandId === b.id ? chipActive : chipIdle}`}
                onClick={() => {
                  setBrandId(b.id);
                  setModel(null);
                }}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {brandId ? (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-primary">Model</p>
            <div className="flex flex-wrap gap-2">
              {models.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`${chipBase} ${model === m ? chipActive : chipIdle}`}
                  onClick={() => setModel(m)}
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
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </Field>
          <Field label="Rok" labelClassName="text-primary">
            <select
              className={inputClass}
              value={year ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setYear(v ? Number(v) : null);
              }}
              required
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
              {FUELS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`${chipBase} ${fuel === f.id ? chipActive : chipIdle}`}
                  onClick={() => setFuel(f.id)}
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
                  className={`${chipBase} ${transmission === t.id ? chipActive : chipIdle}`}
                  onClick={() => setTransmission(t.id)}
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
                  className={`${chipBase} ${bodyType === b.id ? chipActive : chipIdle}`}
                  onClick={() => setBodyType(b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-primary">Wyposażenie</h3>
        <p className="mt-1 text-sm text-ink-muted">
          Otwórz kafelek i zaznacz pozycje kliknięciem.
        </p>
        <button
          type="button"
          onClick={() => setEquipmentOpen((v) => !v)}
          aria-expanded={equipmentOpen}
          className={`mt-4 flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
            equipmentOpen
              ? "border-primary bg-primary/5"
              : "border-border bg-white hover:border-ink/30"
          }`}
        >
          <div>
            <p className="text-sm font-semibold text-primary">Wyposażenie</p>
            <p className="mt-0.5 text-sm text-ink-muted">
              {equipmentCount === 0
                ? "0 pozycji wybranych"
                : `${equipmentCount} ${
                    equipmentCount === 1
                      ? "pozycja wybrana"
                      : equipmentCount < 5
                        ? "pozycje wybrane"
                        : "pozycji wybranych"
                  }`}
            </p>
          </div>
          <span
            className={`text-ink-muted transition ${equipmentOpen ? "rotate-180" : ""}`}
            aria-hidden
          >
            ▾
          </span>
        </button>

        {equipmentOpen ? (
          <div className="mt-3 space-y-6 rounded-2xl border border-border bg-bg-muted/30 p-4 sm:p-5">
            {equipmentCatalog.map((group) => (
              <div key={group.category}>
                <p className="mb-2 text-sm font-semibold text-primary">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const on = (equipmentSel[group.category] ?? []).includes(
                      item,
                    );
                    return (
                      <button
                        key={item}
                        type="button"
                        className={`${chipBase} ${on ? chipActive : chipIdle}`}
                        onClick={() => toggleEquipment(group.category, item)}
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

      <section>
        <div className="mt-2">
          <Field label="Opis oferty" labelClassName="text-primary">
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Krótki opis auta dla klientów..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="submit" disabled={!canSubmit() || submitting}>
          {submitting ? "Dodawanie..." : "Dodaj ofertę na stronie"}
        </Button>
        {!canSubmit() ? (
          <p className="text-sm text-ink-muted">
            Wymagane: zdjęcie, cena, przebieg, marka, model, rok, paliwo,
            skrzynia, nadwozie.
          </p>
        ) : null}
      </div>
    </form>
  );
}
