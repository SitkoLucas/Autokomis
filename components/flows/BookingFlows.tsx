"use client";

import { useMemo, useState } from "react";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { SuccessState } from "@/components/ui/SuccessState";
import { submitLeadDemo, type InquiryContext } from "@/lib/leads";

const TIMES = ["10:00", "12:00", "15:30", "17:00"];

function nextDays(count: number): { value: string; label: string }[] {
  const days: { value: string; label: string }[] = [];
  const start = new Date();
  for (let i = 1; days.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() === 0) continue;
    days.push({
      value: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("pl-PL", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    });
  }
  return days;
}

export function BookingFlow({
  context,
  onDone,
}: {
  context: InquiryContext;
  onDone?: () => void;
}) {
  const days = useMemo(() => nextDays(6), []);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [date, setDate] = useState(days[0]?.value || "");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(name: string, phone: string) {
    setLoading(true);
    await submitLeadDemo({
      type: "booking",
      name,
      phone,
      vehicle: context,
      bookingDate: date,
      bookingTime: time,
    });
    setLoading(false);
    setStep(4);
  }

  if (step === 4) {
    return (
      <SuccessState
        title="Oględziny zgłoszone"
        description={`${context.vehicleName}: ${date} o ${time}. Potwierdzimy telefonicznie.`}
        onClose={onDone}
      />
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-ink-muted">
        Kiedy chcesz zobaczyć{" "}
        <span className="font-semibold text-ink">{context.vehicleName}</span>?
      </p>

      {step === 1 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {days.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => {
                setDate(d.value);
                setStep(2);
              }}
              className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${
                date === d.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-ink/30"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {TIMES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTime(t);
                  setStep(3);
                }}
                className={`rounded-2xl border px-3 py-3 text-sm font-medium ${
                  time === t
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-ink/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <Button variant="ghost" onClick={() => setStep(1)}>
            Wróć do dnia
          </Button>
        </div>
      ) : null}

      {step === 3 ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            void submit(String(fd.get("name")), String(fd.get("phone")));
          }}
        >
          <p className="rounded-2xl bg-bg-muted px-4 py-3 text-sm text-ink-muted">
            Wybrany termin:{" "}
            <span className="font-semibold text-ink">
              {date} · {time}
            </span>
          </p>
          <Field label="Imię">
            <input name="name" required className={inputClass} />
          </Field>
          <Field label="Telefon">
            <input name="phone" required className={inputClass} inputMode="tel" />
          </Field>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setStep(2)}>
              Wróć
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Zapisywanie..." : "Umów oględziny"}
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export function ReserveFlow({
  context,
  onDone,
}: {
  context: InquiryContext;
  onDone?: () => void;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (done) {
    return (
      <SuccessState
        title="Rezerwacja zgłoszona"
        description={`Skontaktujemy się w sprawie rezerwacji: ${context.vehicleName}.`}
        onClose={onDone}
      />
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setLoading(true);
        await submitLeadDemo({
          type: "reserve",
          name: String(fd.get("name") || ""),
          phone: String(fd.get("phone") || ""),
          vehicle: context,
        });
        setLoading(false);
        setDone(true);
      }}
    >
      <p className="text-sm leading-relaxed text-ink-muted">
        Zostaw dane, skontaktujemy się w sprawie rezerwacji. W wersji
        produkcyjnej możliwy będzie zadatek online.
      </p>
      <div className="rounded-2xl bg-bg-muted px-4 py-3 text-sm">
        <span className="font-semibold text-ink">{context.vehicleName}</span>
      </div>
      <Field label="Imię">
        <input name="name" required className={inputClass} />
      </Field>
      <Field label="Telefon">
        <input name="phone" required className={inputClass} inputMode="tel" />
      </Field>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Wysyłanie..." : "Zarezerwuj auto"}
      </Button>
    </form>
  );
}

export function FinancingModalContent({
  context,
  monthlyPrice,
  onDone,
}: {
  context: InquiryContext;
  monthlyPrice: number;
  onDone?: () => void;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (done) {
    return (
      <SuccessState
        title="Dziękujemy"
        description="Przedstawimy możliwości finansowania i oddzwonimy."
        onClose={onDone}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border px-4 py-4">
        <p className="text-sm text-ink-muted">{context.vehicleName}</p>
        <p className="mt-1 text-2xl font-semibold text-ink">
          {context.price.toLocaleString("pl-PL")} zł
        </p>
        <p className="mt-1 text-sm font-medium text-primary">
          od {monthlyPrice.toLocaleString("pl-PL")} zł/mies.
        </p>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">
        To prezentacja możliwości finansowania. W produkcji podłączymy partnera
        kredytowego lub leasingowego. Zostaw kontakt, a przygotujemy ofertę.
      </p>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          setLoading(true);
          await submitLeadDemo({
            type: "financing",
            name: String(fd.get("name") || ""),
            phone: String(fd.get("phone") || ""),
            vehicle: context,
          });
          setLoading(false);
          setDone(true);
        }}
      >
        <Field label="Imię">
          <input name="name" required className={inputClass} />
        </Field>
        <Field label="Telefon">
          <input name="phone" required className={inputClass} inputMode="tel" />
        </Field>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Wysyłanie..." : "Zostaw kontakt"}
        </Button>
      </form>
    </div>
  );
}
