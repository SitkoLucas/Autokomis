"use client";

import { useState, type FormEvent } from "react";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";
import {
  submitLeadDemo,
  type InquiryContext,
  type LeadType,
} from "@/lib/leads";

export function InquiryForm({
  context,
  onDone,
}: {
  context: InquiryContext;
  onDone?: () => void;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    await submitLeadDemo({
      type: "inquiry",
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || "") || undefined,
      vehicle: context,
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <SuccessState
        title="Dziękujemy"
        description={`Oddzwonimy w sprawie: ${context.vehicleName}.`}
        onClose={onDone}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="rounded-2xl bg-bg-muted px-4 py-3 text-sm text-ink-muted">
        Zapytanie dotyczy:{" "}
        <span className="font-semibold text-ink">{context.vehicleName}</span>
        <br />
        Cena: {context.price.toLocaleString("pl-PL")} zł
      </div>
      <Field label="Imię">
        <input name="name" required className={inputClass} autoComplete="name" />
      </Field>
      <Field label="Telefon">
        <input
          name="phone"
          required
          className={inputClass}
          inputMode="tel"
          autoComplete="tel"
        />
      </Field>
      <Field label="Wiadomość (opcjonalnie)">
        <textarea
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Np. interesuje mnie jazda próbna w weekend"
        />
      </Field>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Wysyłanie..." : "Wyślij zapytanie"}
      </Button>
    </form>
  );
}

export function ContactLeadForm({
  type = "contact",
  titleSuccess = "Dziękujemy",
  descriptionSuccess = "Odezwiemy się tak szybko, jak to możliwe.",
}: {
  type?: LeadType;
  titleSuccess?: string;
  descriptionSuccess?: string;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    await submitLeadDemo({
      type,
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || "") || undefined,
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <SuccessState title={titleSuccess} description={descriptionSuccess} />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Imię">
        <input name="name" required className={inputClass} />
      </Field>
      <Field label="Telefon">
        <input name="phone" required className={inputClass} inputMode="tel" />
      </Field>
      <Field label="Wiadomość">
        <textarea name="message" rows={4} className={inputClass} />
      </Field>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Wysyłanie..." : "Wyślij"}
      </Button>
    </form>
  );
}

export function SellLeadForm({
  mode = "sell",
}: {
  mode?: "sell" | "trade-in";
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    await submitLeadDemo({
      type: mode,
      name: "Klient",
      phone: String(fd.get("phone") || ""),
      tradeIn: {
        make: String(fd.get("make") || ""),
        model: String(fd.get("model") || ""),
        year: String(fd.get("year") || ""),
        mileage: String(fd.get("mileage") || ""),
        expectedPrice: String(fd.get("expectedPrice") || ""),
      },
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <SuccessState
        title="Dziękujemy"
        description={
          mode === "sell"
            ? "Przygotujemy wstępną wycenę i oddzwonimy."
            : "Skontaktujemy się w sprawie rozliczenia Twojego auta."
        }
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Marka">
          <input name="make" required className={inputClass} />
        </Field>
        <Field label="Model">
          <input name="model" required className={inputClass} />
        </Field>
        <Field label="Rok">
          <input name="year" required className={inputClass} inputMode="numeric" />
        </Field>
        <Field label="Przebieg">
          <input
            name="mileage"
            required
            className={inputClass}
            inputMode="numeric"
          />
        </Field>
      </div>
      <Field label="Cena, jaka Państwa interesuje za pojazd">
        <input
          name="expectedPrice"
          required
          className={inputClass}
          inputMode="numeric"
        />
      </Field>
      <Field label="Telefon">
        <input name="phone" required className={inputClass} inputMode="tel" />
      </Field>
      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Wysyłanie..."
          : mode === "sell"
            ? "Wyceń moje auto"
            : "Wyślij zgłoszenie"}
      </Button>
    </form>
  );
}

export function TradeInWithVehicleForm({
  interestedInSlug,
  onDone,
}: {
  interestedInSlug: string;
  onDone?: () => void;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    await submitLeadDemo({
      type: "trade-in",
      name: "Klient",
      phone: String(fd.get("phone") || ""),
      interestedInSlug,
      tradeIn: {
        make: String(fd.get("make") || ""),
        model: String(fd.get("model") || ""),
        year: String(fd.get("year") || ""),
        mileage: String(fd.get("mileage") || ""),
        expectedPrice: String(fd.get("expectedPrice") || ""),
      },
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <SuccessState
        title="Dziękujemy"
        description="Oddzwonimy w sprawie rozliczenia i wybranego samochodu."
        onClose={onDone}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Marka Twojego auta">
          <input name="make" required className={inputClass} />
        </Field>
        <Field label="Model">
          <input name="model" required className={inputClass} />
        </Field>
        <Field label="Rok">
          <input name="year" required className={inputClass} inputMode="numeric" />
        </Field>
        <Field label="Przebieg">
          <input
            name="mileage"
            required
            className={inputClass}
            inputMode="numeric"
          />
        </Field>
      </div>
      <Field label="Cena, jaka Państwa interesuje za pojazd">
        <input
          name="expectedPrice"
          required
          className={inputClass}
          inputMode="numeric"
        />
      </Field>
      <Field label="Telefon">
        <input name="phone" required className={inputClass} inputMode="tel" />
      </Field>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Wysyłanie..." : "Zostaw auto w rozliczeniu"}
      </Button>
    </form>
  );
}
