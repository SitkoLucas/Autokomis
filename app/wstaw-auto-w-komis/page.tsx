import type { Metadata } from "next";
import { ConsignmentLanding } from "@/components/consignment/ConsignmentLanding";

export const metadata: Metadata = {
  title: "Wstaw auto w komis",
  description:
    "Sprzedaż komisowa: powierz sprzedaż samochodu komisowi. Auto pozostaje Twoją własnością do momentu transakcji.",
};

export default function WstawAutoWKomisPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ConsignmentLanding />
    </div>
  );
}
