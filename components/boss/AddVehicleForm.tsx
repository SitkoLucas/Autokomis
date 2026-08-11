"use client";

import { useEffect, useState, type FormEvent } from "react";
import { estimateFromPrice } from "@/lib/financing";
import { buildEquipmentFromSelection } from "@/lib/equipment-catalog";
import { Button } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";
import { VehicleEquipmentSection } from "@/components/vehicles/VehicleEquipmentSection";
import {
  getMakeName,
  parseNumericInput,
  VehicleDataFields,
  VehicleDescriptionField,
  type VehicleFormValues,
} from "@/components/vehicles/VehicleDataFields";
import {
  type PhotoItem,
  VehiclePhotoEditor,
} from "@/components/vehicles/VehiclePhotoEditor";

const initialForm: VehicleFormValues = {
  brandId: null,
  model: null,
  version: "",
  year: null,
  fuel: null,
  transmission: null,
  bodyType: null,
  price: "",
  mileage: "",
  description: "",
  serviceHistory: "",
  owners: "1",
  accidentFree: true,
};

export function AddVehicleForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<VehicleFormValues>(initialForm);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(null);
  const [equipmentSel, setEquipmentSel] = useState<Record<string, string[]>>({});

  const patchForm = (p: Partial<VehicleFormValues>) =>
    setForm((prev) => ({ ...prev, ...p }));

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function canSubmit(): boolean {
    const priceNum = parseNumericInput(form.price);
    const mileageNum = parseNumericInput(form.mileage);
    return (
      Boolean(form.brandId) &&
      Boolean(form.model) &&
      Boolean(form.year) &&
      Boolean(form.fuel) &&
      Boolean(form.transmission) &&
      Boolean(form.bodyType) &&
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
    const priceNum = parseNumericInput(form.price);
    const mileageNum = parseNumericInput(form.mileage);
    let ordered = [...photos];
    if (mainPhotoId) {
      const idx = ordered.findIndex((p) => p.id === mainPhotoId);
      if (idx > 0) {
        const [main] = ordered.splice(idx, 1);
        ordered.unshift(main);
      }
    }
    const payload = {
      type: "boss-add-vehicle" as const,
      make: getMakeName(form.brandId),
      model: form.model,
      version: form.version.trim() || undefined,
      year: form.year,
      fuel: form.fuel,
      transmission: form.transmission,
      bodyType: form.bodyType,
      price: priceNum,
      monthlyPrice: estimateFromPrice(priceNum),
      mileage: mileageNum,
      description: form.description.trim(),
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
    setForm(initialForm);
    setEquipmentSel({});
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
      <VehiclePhotoEditor
        photos={photos}
        onPhotosChange={setPhotos}
        mainPhotoId={mainPhotoId}
        onMainPhotoChange={setMainPhotoId}
      />
      <VehicleDataFields values={form} onChange={patchForm} />
      <VehicleEquipmentSection
        selection={equipmentSel}
        onSelectionChange={setEquipmentSel}
      />
      <VehicleDescriptionField
        value={form.description}
        onChange={(v) => patchForm({ description: v })}
      />
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
