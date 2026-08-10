import type { Metadata } from "next";
import { OfferCatalog } from "@/components/vehicles/OfferCatalog";
import { parseFilters } from "@/lib/filters";

export const metadata: Metadata = {
  title: "Oferta",
  description: "Przeglądaj przykładową ofertę samochodów AutoKomis Procforce.",
};

export default async function OfertaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialFilters = parseFilters(params);

  return (
    <div className="bg-bg-muted/40">
      <OfferCatalog initialFilters={initialFilters} />
    </div>
  );
}
