"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";
import {
  ConsignmentPhotoUploader,
  consignmentPhotosValid,
} from "@/components/client/ConsignmentPhotoUploader";
import {
  equipmentFromSelection,
  VehicleEquipmentSection,
} from "@/components/vehicles/VehicleEquipmentSection";
import {
  getMakeName,
  parseNumericInput,
  VehicleDataFields,
  VehicleDescriptionField,
  type VehicleFormValues,
} from "@/components/vehicles/VehicleDataFields";
import { getClientSession } from "@/lib/client-auth-demo";
import type { SlotPhoto } from "@/lib/consignment-photo-slots";
import { submitConsignment } from "@/lib/consignment";
import { formatPrice } from "@/lib/format";
import { OrientationalCommissionInfo } from "./OrientationalCommissionInfo";

const STEPS = [
  "Podstawowe dane",
  "Historia i wyposażenie",
  "Zdjęcia",
  "Cena i oczekiwania",
  "Dane kontaktowe",
  "Podsumowanie",
] as const;

type StepIndex = 0 | 1 | 2 | 3 | 4 | 5;

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

export function ConsignmentWizardForm({
  defaultEmail,
}: {
  defaultEmail?: string;
} = {}) {
  const [step, setStep] = useState<StepIndex>(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<VehicleFormValues>(initialForm);
  const [equipmentSel, setEquipmentSel] = useState<Record<string, string[]>>({});
  const [photos, setPhotos] = useState<SlotPhoto[]>([]);
  const [expectedPrice, setExpectedPrice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(
    () => defaultEmail ?? getClientSession()?.email ?? "",
  );

  const patchForm = (p: Partial<VehicleFormValues>) =>
    setForm((prev) => ({ ...prev, ...p }));

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return (
          Boolean(form.brandId) &&
          Boolean(form.model) &&
          Boolean(form.year) &&
          Boolean(form.fuel) &&
          Boolean(form.transmission) &&
          Boolean(form.bodyType) &&
          parseNumericInput(form.mileage) >= 0
        );
      case 1:
        return true;
      case 2:
        return consignmentPhotosValid(photos);
      case 3:
        return parseNumericInput(expectedPrice) > 0;
      case 4:
        return name.trim().length > 1 && phone.trim().length > 5 && email.trim().includes("@");
      default:
        return true;
    }
  }, [step, form, photos, expectedPrice, name, phone, email]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!email.trim().includes("@")) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    submitConsignment({
      clientEmail: email.trim(),
      clientName: name.trim(),
      clientPhone: phone.trim(),
      make: getMakeName(form.brandId),
      model: form.model ?? "",
      version: form.version.trim(),
      year: form.year ?? 0,
      mileage: parseNumericInput(form.mileage),
      fuel: form.fuel ?? "benzyna",
      transmission: form.transmission ?? "manual",
      bodyType: form.bodyType ?? "hatchback",
      description: form.description.trim(),
      equipment: equipmentFromSelection(equipmentSel),
      serviceHistory: form.serviceHistory.trim() || undefined,
      accidentFree: form.accidentFree,
      owners: parseNumericInput(form.owners) || 1,
      photos,
      expectedPrice: parseNumericInput(expectedPrice),
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <SuccessState
        title="Zgłoszenie wysłane do weryfikacji"
        description="Komis skontaktuje się z Tobą po sprawdzeniu zgłoszenia. Warunki sprzedaży ustalane są indywidualnie."
        onClose={() => {
          setDone(false);
          setStep(0);
          setForm(initialForm);
          setEquipmentSel({});
          setPhotos([]);
          setExpectedPrice("");
          setName("");
          setPhone("");
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              i === step
                ? "bg-primary text-white"
                : i < step
                  ? "bg-primary/10 text-primary"
                  : "bg-bg-muted text-ink-muted"
            }`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 ? (
        <VehicleDataFields
          values={form}
          onChange={patchForm}
          showPrice={false}
          showHistory={false}
        />
      ) : null}

      {step === 1 ? (
        <>
          <VehicleDataFields
            values={form}
            onChange={patchForm}
            showPrice={false}
            showBasic={false}
          />
          <VehicleEquipmentSection
            selection={equipmentSel}
            onSelectionChange={setEquipmentSel}
          />
          <VehicleDescriptionField
            value={form.description}
            onChange={(v) => patchForm({ description: v })}
          />
        </>
      ) : null}

      {step === 2 ? (
        <ConsignmentPhotoUploader photos={photos} onChange={setPhotos} />
      ) : null}

      {step === 3 ? (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">Cena i oczekiwania</h3>
          <p className="text-sm text-ink-muted">
            Podaj oczekiwaną cenę sprzedaży. Ostateczna cena w ofercie zostanie
            ustalona z komisem po weryfikacji.
          </p>
          <Field label="Oczekiwana cena sprzedaży (PLN)" labelClassName="text-primary">
            <input
              className={inputClass}
              inputMode="numeric"
              placeholder="np. 59000"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
            />
          </Field>
          <OrientationalCommissionInfo
            basePrice={parseNumericInput(expectedPrice)}
          />
        </section>
      ) : null}

      {step === 4 ? (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-ink">Dane kontaktowe</h3>
          <Field label="Imię i nazwisko">
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Telefon">
            <input
              className={inputClass}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>
          <Field label="E-mail">
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
        </section>
      ) : null}

      {step === 5 ? (
        <section className="space-y-3 rounded-2xl border border-border bg-bg-muted/30 p-5 text-sm">
          <h3 className="text-lg font-semibold text-ink">Podsumowanie</h3>
          <p>
            <span className="text-ink-muted">Auto:</span>{" "}
            {getMakeName(form.brandId)} {form.model} {form.version} ({form.year})
          </p>
          <p>
            <span className="text-ink-muted">Przebieg:</span> {form.mileage} km
          </p>
          <p>
            <span className="text-ink-muted">Oczekiwana cena sprzedaży:</span>{" "}
            {formatPrice(parseNumericInput(expectedPrice))}
          </p>
          <OrientationalCommissionInfo
            basePrice={parseNumericInput(expectedPrice)}
            compact
          />
          <p>
            <span className="text-ink-muted">Zdjęcia:</span> {photos.length}
          </p>
          <p>
            <span className="text-ink-muted">Kontakt:</span> {name}, {phone}
          </p>
          <p className="text-ink-muted">
            Wyślesz auto do weryfikacji. Publikacja nastąpi dopiero po
            zatwierdzeniu warunków przez komis.
          </p>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        {step > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep((s) => (s - 1) as StepIndex)}
          >
            Wstecz
          </Button>
        ) : null}
        {step < 5 ? (
          <Button
            type="button"
            disabled={!stepValid}
            onClick={() => setStep((s) => (s + 1) as StepIndex)}
          >
            Dalej
          </Button>
        ) : (
          <Button type="submit" disabled={loading}>
            {loading ? "Wysyłanie..." : "Wyślij do weryfikacji"}
          </Button>
        )}
      </div>
    </form>
  );
}
