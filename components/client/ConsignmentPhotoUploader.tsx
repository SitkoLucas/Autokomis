"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CONSIGNMENT_PHOTO_SLOTS,
  type SlotPhoto,
} from "@/lib/consignment-photo-slots";
import { compressImageFile, filesFromList } from "@/lib/image-compress";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

export function ConsignmentPhotoUploader({
  photos,
  onChange,
}: {
  photos: SlotPhoto[];
  onChange: (photos: SlotPhoto[]) => void;
}) {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    alt: string;
  } | null>(null);
  const [loadingSlot, setLoadingSlot] = useState<string | null>(null);

  function photosForSlot(slotId: string): SlotPhoto[] {
    return photos.filter((p) => p.slotId === slotId);
  }

  async function addToSlot(slotId: string, files: File[]) {
    if (!files.length) return;
    setLoadingSlot(slotId);
    try {
      const slot = CONSIGNMENT_PHOTO_SLOTS.find((s) => s.id === slotId);
      const isMultiple = slot?.multiple ?? false;
      const compressed = await Promise.all(
        files.map((f) => compressImageFile(f)),
      );
      const withoutSlot = isMultiple
        ? photos
        : photos.filter((p) => p.slotId !== slotId);
      const added: SlotPhoto[] = compressed.map((c, i) => ({
        id: `${slotId}-${Date.now()}-${i}`,
        slotId,
        name: c.name,
        dataUrl: c.dataUrl,
      }));
      onChange([...withoutSlot, ...added]);
    } finally {
      setLoadingSlot(null);
    }
  }

  function removePhoto(id: string) {
    onChange(photos.filter((p) => p.id !== id));
  }

  function slotStatus(slotId: string, required: boolean): string {
    const count = photosForSlot(slotId).length;
    if (count > 0) return "dodano";
    return required ? "brak zdjęcia" : "opcjonalne";
  }

  const requiredMissing = CONSIGNMENT_PHOTO_SLOTS.some(
    (s) => s.required && photosForSlot(s.id).length === 0,
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink-muted">
        Dodaj zdjęcia według podpowiedzi. Wymagane ujęcia muszą być uzupełnione,
        zanim wyślesz zgłoszenie do weryfikacji.
      </p>

      <div className="space-y-4">
        {CONSIGNMENT_PHOTO_SLOTS.map((slot) => {
          const slotPhotos = photosForSlot(slot.id);
          const status = slotStatus(slot.id, slot.required);
          const isAdded = slotPhotos.length > 0;

          return (
            <div
              key={slot.id}
              className={`rounded-2xl border p-4 transition ${
                isAdded
                  ? "border-primary/30 bg-primary/5"
                  : slot.required
                    ? "border-border bg-white"
                    : "border-dashed border-border bg-bg-muted/30"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold text-ink">{slot.label}</h4>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                        status === "dodano"
                          ? "bg-primary/10 text-primary"
                          : status === "opcjonalne"
                            ? "bg-bg-muted text-ink-muted"
                            : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{slot.hint}</p>
                </div>

                <label className="inline-flex shrink-0 cursor-pointer">
                  <span className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-bg-muted">
                    {loadingSlot === slot.id
                      ? "Przetwarzanie..."
                      : isAdded
                        ? "Podmień"
                        : "Dodaj zdjęcie"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    capture={slot.id === "odometer" ? undefined : "environment"}
                    multiple={slot.multiple}
                    className="sr-only"
                    disabled={loadingSlot !== null}
                    onChange={(e) => {
                      void addToSlot(slot.id, filesFromList(e.target.files));
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {slotPhotos.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-3">
                  {slotPhotos.map((photo, idx) => (
                    <li
                      key={photo.id}
                      className="relative w-28 overflow-hidden rounded-xl border border-border sm:w-32"
                    >
                      <button
                        type="button"
                        className="block w-full"
                        onClick={() =>
                          setLightbox({
                            images: slotPhotos.map((p) => p.dataUrl),
                            index: idx,
                            alt: slot.label,
                          })
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.dataUrl}
                          alt={slot.label}
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute right-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-primary shadow"
                      >
                        Usuń
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>

      {requiredMissing ? (
        <p className="text-sm text-amber-800">
          Uzupełnij wszystkie wymagane zdjęcia przed wysłaniem zgłoszenia.
        </p>
      ) : null}

      {lightbox ? (
        <ImageLightbox
          open
          onClose={() => setLightbox(null)}
          images={lightbox.images}
          index={lightbox.index}
          onIndexChange={(index) =>
            setLightbox((prev) => (prev ? { ...prev, index } : null))
          }
          alt={lightbox.alt}
          title={lightbox.alt}
        />
      ) : null}
    </div>
  );
}

export function consignmentPhotosValid(photos: SlotPhoto[]): boolean {
  return CONSIGNMENT_PHOTO_SLOTS.filter((s) => s.required).every(
    (s) => photos.some((p) => p.slotId === s.id),
  );
}
