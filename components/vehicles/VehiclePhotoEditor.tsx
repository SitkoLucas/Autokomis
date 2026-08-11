"use client";

import {
  useEffect,
  useState,
  type ClipboardEvent,
  type DragEvent,
} from "react";
import { filesFromList } from "@/lib/image-compress";

export type PhotoItem = {
  id: string;
  name: string;
  previewUrl: string;
};

const MAX_PHOTOS = 16;

export function VehiclePhotoEditor({
  photos,
  onPhotosChange,
  mainPhotoId,
  onMainPhotoChange,
}: {
  photos: PhotoItem[];
  onPhotosChange: (photos: PhotoItem[]) => void;
  mainPhotoId: string | null;
  onMainPhotoChange: (id: string | null) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [dragPhotoId, setDragPhotoId] = useState<string | null>(null);

  useEffect(() => {
    if (photos.length === 0) {
      onMainPhotoChange(null);
      return;
    }
    if (!mainPhotoId || !photos.some((p) => p.id === mainPhotoId)) {
      onMainPhotoChange(photos[0].id);
    }
  }, [photos, mainPhotoId, onMainPhotoChange]);

  function addImageFiles(files: File[]) {
    if (!files.length) return;
    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) return;
    const next = files.slice(0, room).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name || "zdjecie.png",
      previewUrl: URL.createObjectURL(file),
    }));
    onPhotosChange([...photos, ...next]);
  }

  function removePhoto(id: string) {
    const target = photos.find((p) => p.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    onPhotosChange(photos.filter((p) => p.id !== id));
  }

  function reorderPhotos(fromId: string, toId: string) {
    if (fromId === toId) return;
    const from = photos.findIndex((p) => p.id === fromId);
    const to = photos.findIndex((p) => p.id === toId);
    if (from < 0 || to < 0) return;
    const next = [...photos];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onPhotosChange(next);
  }

  function onPastePhotos(e: ClipboardEvent<HTMLDivElement>) {
    const items = e.clipboardData?.items;
    if (!items) return;
    const files: File[] = [];
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length) {
      e.preventDefault();
      addImageFiles(files);
    }
  }

  return (
    <section>
      <h3 className="text-lg font-semibold text-ink">Zdjęcia</h3>
      <p className="mt-1 text-sm text-ink-muted">
        Wklej (Ctrl+V), przeciągnij pliki albo wybierz z dysku. Ustaw kolejność
        i zdjęcie główne.
      </p>
      <div
        tabIndex={0}
        onPaste={onPastePhotos}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragOver(false);
          addImageFiles(filesFromList(e.dataTransfer.files));
        }}
        className={`mt-4 rounded-2xl border-2 border-dashed px-4 py-8 text-center outline-none transition focus:border-primary ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-bg-muted/40"
        }`}
      >
        <p className="text-sm font-medium text-ink">
          Upuść zdjęcia tutaj lub wklej ze schowka
        </p>
        <label className="mt-4 inline-flex cursor-pointer">
          <span className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-bg-muted">
            Wybierz pliki
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              addImageFiles(filesFromList(e.target.files));
              e.target.value = "";
            }}
          />
        </label>
      </div>

      {photos.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              draggable
              onDragStart={() => setDragPhotoId(photo.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragPhotoId) reorderPhotos(dragPhotoId, photo.id);
                setDragPhotoId(null);
              }}
              className="relative overflow-hidden rounded-xl border border-border bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.previewUrl}
                alt={photo.name}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex items-center justify-between gap-1 border-t border-border px-2 py-1.5">
                <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-ink">
                  <input
                    type="radio"
                    name="main-photo"
                    checked={mainPhotoId === photo.id}
                    onChange={() => onMainPhotoChange(photo.id)}
                    className="accent-primary"
                  />
                  Główne
                </label>
                <span className="text-[10px] text-ink-muted">#{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  className="text-[11px] font-semibold text-primary"
                  aria-label={`Usuń ${photo.name}`}
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function photosToDataUrls(photos: PhotoItem[]): { dataUrl: string; name: string }[] {
  return photos.map((p) => ({ dataUrl: p.previewUrl, name: p.name }));
}

export function slotPhotosFromDataUrls(
  items: { dataUrl: string; name: string }[],
): { id: string; slotId: string; name: string; dataUrl: string }[] {
  return items.map((item, i) => ({
    id: `photo-${i}-${Math.random().toString(36).slice(2, 6)}`,
    slotId: i === 0 ? "front" : "extra",
    name: item.name,
    dataUrl: item.dataUrl,
  }));
}
