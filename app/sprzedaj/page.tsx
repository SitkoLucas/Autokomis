import type { Metadata } from "next";
import { SellWizardForm } from "@/components/flows/SellWizardForm";

export const metadata: Metadata = {
  title: "Sprzedaj auto",
  description:
    "Wycena odkupu samochodu. Wybierz markę, model i podaj dane kontaktowe.",
};

export default function SprzedajPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Odkup
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          Sprzedaj auto
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Kilka kliknięć: marka, model, zdjęcia i dane kontaktowe. Przygotujemy
          wstępną wycenę i oddzwonimy.
        </p>
      </div>
      <div className="mt-10 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <SellWizardForm />
      </div>
    </div>
  );
}
