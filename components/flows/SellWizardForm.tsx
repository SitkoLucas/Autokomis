"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";
import { submitLeadDemo } from "@/lib/leads";
import {
  OTHER_BRAND_ID,
  bodyTypes,
  getBrandById,
  getSellYears,
  sellBrands,
  transmissions,
  type BodyTypeId,
  type SellTransmissionId,
} from "@/lib/sell-catalog";

const STEPS = [
  "Marka",
  "Model",
  "Nadwozie",
  "Rok",
  "Przebieg",
  "Skrzynia",
  "Zdjęcia",
  "Kontakt",
] as const;

type StepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type VehiclePhoto = {
  id: string;
  name: string;
  previewUrl: string;
};

const OTHER_MODEL = "__other__";
const MAX_PHOTOS = 12;

const choiceClass = (selected: boolean) =>
  `rounded-2xl border px-3 py-3 text-sm font-medium transition ${
    selected
      ? "border-primary bg-primary/5 text-ink ring-2 ring-primary/20"
      : "border-border bg-white text-ink hover:border-ink/25 hover:bg-bg-muted"
  }`;

function filesFromList(list: FileList | File[]): File[] {
  return Array.from(list).filter((f) => f.type.startsWith("image/"));
}

export function SellWizardForm() {
  const years = useMemo(() => getSellYears(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<StepIndex>(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [brandId, setBrandId] = useState<string | null>(null);
  const [customMake, setCustomMake] = useState("");
  const [modelId, setModelId] = useState<string | null>(null);
  const [customModel, setCustomModel] = useState("");
  const [bodyType, setBodyType] = useState<BodyTypeId | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState<SellTransmissionId | null>(
    null,
  );
  const [photos, setPhotos] = useState<VehiclePhoto[]>([]);
  const [expectedPrice, setExpectedPrice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup only on unmount
  }, []);

  const selectedBrand =
    brandId && brandId !== OTHER_BRAND_ID ? getBrandById(brandId) : undefined;

  const makeLabel =
    brandId === OTHER_BRAND_ID
      ? customMake.trim()
      : (selectedBrand?.name ?? "");

  const modelLabel =
    modelId === OTHER_MODEL || brandId === OTHER_BRAND_ID
      ? customModel.trim()
      : (modelId ?? "");

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

  function onDropPhotos(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    addImageFiles(filesFromList(e.dataTransfer.files));
  }

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return brandId === OTHER_BRAND_ID
          ? customMake.trim().length >= 2
          : Boolean(brandId);
      case 1:
        if (brandId === OTHER_BRAND_ID || modelId === OTHER_MODEL) {
          return customModel.trim().length >= 1;
        }
        return Boolean(modelId);
      case 2:
        return Boolean(bodyType);
      case 3:
        return Boolean(year);
      case 4:
        return (
          mileage.trim().length > 0 && Number(mileage.replace(/\s/g, "")) >= 0
        );
      case 5:
        return Boolean(transmission);
      case 6:
        return photos.length >= 1;
      case 7:
        return (
          expectedPrice.trim().length > 0 &&
          name.trim().length >= 2 &&
          phone.trim().length >= 6
        );
      default:
        return false;
    }
  }

  function goNext() {
    if (!canProceed() || step >= 7) return;
    setStep((s) => (s + 1) as StepIndex);
  }

  function goBack() {
    if (step <= 0) return;
    setStep((s) => (s - 1) as StepIndex);
  }

  function selectBrand(id: string) {
    setBrandId(id);
    setModelId(null);
    setCustomModel("");
    if (id !== OTHER_BRAND_ID) setCustomMake("");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canProceed() || !bodyType || !year || !transmission) return;
    setLoading(true);
    await submitLeadDemo({
      type: "sell",
      name: name.trim(),
      phone: phone.trim(),
      tradeIn: {
        make: makeLabel,
        model: modelLabel,
        year: String(year),
        mileage: mileage.trim(),
        expectedPrice: expectedPrice.trim(),
        bodyType,
        transmission,
        photoCount: photos.length,
        photoNames: photos.map((p) => p.name),
      },
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <SuccessState
        title="Dziękujemy"
        description="Przygotujemy wstępną wycenę i oddzwonimy."
      />
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="font-medium text-ink">
            Krok {step + 1} z {STEPS.length}: {STEPS[step]}
          </p>
          <p className="text-ink-muted">{Math.round(progress)}%</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">Wybierz markę samochodu</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {sellBrands.map((brand) => {
              const selected = brandId === brand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => selectBrand(brand.id)}
                  className={`${choiceClass(selected)} flex flex-col items-center gap-2 py-4`}
                >
                  <span className="relative flex h-10 w-14 items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt=""
                      width={56}
                      height={40}
                      className="max-h-10 w-auto object-contain"
                    />
                  </span>
                  <span className="text-center text-xs leading-tight">
                    {brand.name}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => selectBrand(OTHER_BRAND_ID)}
              className={`${choiceClass(brandId === OTHER_BRAND_ID)} flex flex-col items-center justify-center gap-1 py-4`}
            >
              <span className="text-lg font-semibold text-ink-muted">+</span>
              <span className="text-center text-xs leading-tight">Inna</span>
            </button>
          </div>
          {brandId === OTHER_BRAND_ID ? (
            <Field label="Nazwa marki">
              <input
                value={customMake}
                onChange={(e) => setCustomMake(e.target.value)}
                className={inputClass}
                placeholder="Np. Seat"
                autoFocus
              />
            </Field>
          ) : null}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Model marki {makeLabel || "wybranej"}
          </p>
          {selectedBrand ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {selectedBrand.models.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => {
                    setModelId(model);
                    setCustomModel("");
                  }}
                  className={choiceClass(modelId === model)}
                >
                  {model}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setModelId(OTHER_MODEL)}
                className={choiceClass(modelId === OTHER_MODEL)}
              >
                Inny model
              </button>
            </div>
          ) : (
            <p className="text-sm text-ink-muted">
              Wpisz model swojego samochodu.
            </p>
          )}
          {modelId === OTHER_MODEL || brandId === OTHER_BRAND_ID ? (
            <Field label="Nazwa modelu">
              <input
                value={customModel}
                onChange={(e) => {
                  setCustomModel(e.target.value);
                  if (brandId === OTHER_BRAND_ID) setModelId(OTHER_MODEL);
                }}
                className={inputClass}
                placeholder="Np. Leon"
                autoFocus
              />
            </Field>
          ) : null}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">Jaki to rodzaj nadwozia?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {bodyTypes.map((bt) => (
              <button
                key={bt.id}
                type="button"
                onClick={() => setBodyType(bt.id)}
                className={choiceClass(bodyType === bt.id)}
              >
                {bt.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">Rok produkcji</p>
          <div className="grid max-h-72 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-5">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={choiceClass(year === y)}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-4">
          <Field label="Przebieg (km)">
            <input
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              className={inputClass}
              inputMode="numeric"
              placeholder="Np. 120000"
              autoFocus
            />
          </Field>
        </div>
      ) : null}

      {step === 5 ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">Rodzaj skrzyni biegów</p>
          <div className="grid grid-cols-2 gap-2">
            {transmissions.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTransmission(t.id)}
                className={`${choiceClass(transmission === t.id)} py-5 text-base`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 6 ? (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            Wklej zdjęcia pojazdu (Ctrl+V) albo przeciągnij pliki. Max.{" "}
            {MAX_PHOTOS}.
          </p>
          <div
            role="region"
            aria-label="Obszar wklejania zdjęć pojazdu"
            tabIndex={0}
            onPaste={onPastePhotos}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDropPhotos}
            className={`rounded-2xl border-2 border-dashed px-4 py-10 text-center outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-border bg-bg-muted/60"
            }`}
          >
            <p className="text-sm font-medium text-ink">
              Kliknij tutaj i wklej zdjęcie
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Albo przeciągnij pliki albo wybierz z dysku
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-4"
              onClick={() => fileInputRef.current?.click()}
            >
              Wybierz pliki
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addImageFiles(filesFromList(e.target.files));
                e.target.value = "";
              }}
            />
          </div>
          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.previewUrl}
                    alt={photo.name}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-ink/80 px-2 py-0.5 text-xs font-semibold text-white opacity-90 hover:bg-ink"
                    aria-label={`Usuń ${photo.name}`}
                  >
                    Usuń
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-ink-muted">
              Dodaj przynajmniej jedno zdjęcie, żeby przejść dalej.
            </p>
          )}
        </div>
      ) : null}

      {step === 7 ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-bg-muted px-4 py-3 text-sm text-ink-muted">
            <p className="font-semibold text-ink">
              {makeLabel} {modelLabel}
            </p>
            <p className="mt-1">
              {bodyTypes.find((b) => b.id === bodyType)?.label}, {year},{" "}
              {transmissions.find((t) => t.id === transmission)?.label},{" "}
              {mileage} km, zdjęć: {photos.length}
            </p>
          </div>
          <Field label="Cena, jaka Cię interesuje (zł)">
            <input
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
              className={inputClass}
              inputMode="numeric"
              placeholder="Np. 45000"
            />
          </Field>
          <Field label="Imię">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              autoComplete="name"
            />
          </Field>
          <Field label="Numer kontaktowy">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              inputMode="tel"
              autoComplete="tel"
            />
          </Field>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-1">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={goBack}>
            Wstecz
          </Button>
        ) : null}
        {step < 7 ? (
          <Button
            type="button"
            onClick={goNext}
            disabled={!canProceed()}
            className="ml-auto"
          >
            Dalej
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!canProceed() || loading}
            className="ml-auto"
          >
            {loading ? "Wysyłanie..." : "Wyślij"}
          </Button>
        )}
      </div>
    </form>
  );
}
