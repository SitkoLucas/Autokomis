"use client";

import { useEffect, useMemo, useState } from "react";
import { sellBrands } from "@/lib/sell-catalog";
import type { ConsignmentListing } from "@/lib/consignment";
import type { SlotPhoto } from "@/lib/consignment-photo-slots";
import {
  equipmentFromSelection,
  selectionFromEquipment,
  VehicleEquipmentSection,
} from "@/components/vehicles/VehicleEquipmentSection";
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

function listingToForm(listing: ConsignmentListing): VehicleFormValues {
  const brand = sellBrands.find((b) => b.name === listing.make);
  return {
    brandId: brand?.id ?? null,
    model: listing.model,
    version: listing.version,
    year: listing.year,
    fuel: listing.fuel,
    transmission: listing.transmission,
    bodyType: listing.bodyType,
    price: String(listing.publishPrice ?? listing.expectedPrice),
    mileage: String(listing.mileage),
    description: listing.description,
    serviceHistory: listing.serviceHistory ?? "",
    owners: String(listing.owners ?? 1),
    accidentFree: listing.accidentFree ?? true,
  };
}

function slotPhotosToItems(photos: SlotPhoto[]): PhotoItem[] {
  return photos.map((p) => ({
    id: p.id,
    name: p.name,
    previewUrl: p.dataUrl,
  }));
}

function itemsToSlotPhotos(items: PhotoItem[]): SlotPhoto[] {
  return items.map((p, i) => ({
    id: p.id,
    slotId: i === 0 ? "front" : "extra",
    name: p.name,
    dataUrl: p.previewUrl,
  }));
}

export function ConsignmentVehicleEditor({
  listing,
  onChange,
  showPublishPrice = true,
}: {
  listing: ConsignmentListing;
  onChange: (patch: Partial<ConsignmentListing>) => void;
  showPublishPrice?: boolean;
}) {
  const [form, setForm] = useState(() => listingToForm(listing));
  const [equipmentSel, setEquipmentSel] = useState(() =>
    selectionFromEquipment(listing.equipment),
  );
  const [photos, setPhotos] = useState<PhotoItem[]>(() =>
    slotPhotosToItems(listing.photos),
  );
  const [mainPhotoId, setMainPhotoId] = useState<string | null>(null);

  useEffect(() => {
    setForm(listingToForm(listing));
    setEquipmentSel(selectionFromEquipment(listing.equipment));
    setPhotos(slotPhotosToItems(listing.photos));
  }, [listing.id]);

  const patchForm = (p: Partial<VehicleFormValues>) => {
    const next = { ...form, ...p };
    setForm(next);
    onChange({
      make: getMakeName(next.brandId),
      model: next.model ?? listing.model,
      version: next.version,
      year: next.year ?? listing.year,
      fuel: next.fuel ?? listing.fuel,
      transmission: next.transmission ?? listing.transmission,
      bodyType: next.bodyType ?? listing.bodyType,
      mileage: parseNumericInput(next.mileage),
      description: next.description,
      serviceHistory: next.serviceHistory || undefined,
      owners: parseNumericInput(next.owners) || 1,
      accidentFree: next.accidentFree,
      publishPrice: showPublishPrice
        ? parseNumericInput(next.price) || listing.publishPrice
        : listing.publishPrice,
      equipment: equipmentFromSelection(equipmentSel),
    });
  };

  useEffect(() => {
    onChange({
      equipment: equipmentFromSelection(equipmentSel),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipmentSel]);

  useEffect(() => {
    let ordered = [...photos];
    if (mainPhotoId) {
      const idx = ordered.findIndex((p) => p.id === mainPhotoId);
      if (idx > 0) {
        const [main] = ordered.splice(idx, 1);
        ordered.unshift(main);
      }
    }
    onChange({ photos: itemsToSlotPhotos(ordered) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, mainPhotoId]);

  const priceLabel = useMemo(
    () => (showPublishPrice ? "Cena publikacji (PLN)" : "Cena (PLN)"),
    [showPublishPrice],
  );

  return (
    <div className="space-y-8">
      <VehiclePhotoEditor
        photos={photos}
        onPhotosChange={setPhotos}
        mainPhotoId={mainPhotoId}
        onMainPhotoChange={setMainPhotoId}
      />
      <VehicleDataFields
        values={form}
        onChange={patchForm}
        showPrice={showPublishPrice}
        priceLabel={priceLabel}
      />
      <VehicleEquipmentSection
        selection={equipmentSel}
        onSelectionChange={setEquipmentSel}
      />
      <VehicleDescriptionField
        value={form.description}
        onChange={(v) => patchForm({ description: v })}
      />
    </div>
  );
}
