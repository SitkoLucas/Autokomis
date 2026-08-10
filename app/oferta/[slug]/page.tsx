import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetail } from "@/components/vehicles/VehicleDetail";
import {
  getVehicleBySlug,
  vehicles,
  vehicleDisplayName,
} from "@/lib/vehicles";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: "Nie znaleziono" };
  return {
    title: vehicleDisplayName(vehicle),
    description: vehicle.description,
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();
  return <VehicleDetail vehicle={vehicle} />;
}
