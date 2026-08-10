"use client";

import Image from "next/image";
import Link from "next/link";
import {
  fuelLabel,
  statusLabel,
  transmissionLabel,
  type Vehicle,
} from "@/lib/vehicles";
import { formatMileage, formatMonthly, formatPrice } from "@/lib/format";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/oferta/${vehicle.slug}`}
      className="group block overflow-hidden rounded-3xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-28px_rgba(17,17,17,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-muted">
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink shadow-sm">
          {statusLabel(vehicle.status)}
        </span>
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-sm font-semibold text-white">
            Zobacz samochód
          </span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-ink-muted">{vehicle.version}</p>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted">
          <span>{vehicle.year}</span>
          <span>{formatMileage(vehicle.mileage)}</span>
          <span>{fuelLabel(vehicle.fuel)}</span>
          <span>{transmissionLabel(vehicle.transmission)}</span>
        </div>
        <div>
          <p className="text-xl font-semibold text-ink">
            {formatPrice(vehicle.price)}
          </p>
          <p className="text-sm font-medium text-primary">
            {formatMonthly(vehicle.monthlyPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
}
