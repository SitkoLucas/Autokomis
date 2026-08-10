"use client";

import { Modal } from "@/components/ui/Modal";

export function ImageLightbox({
  open,
  onClose,
  images,
  index,
  onIndexChange,
  alt,
  title = "Zdjęcie",
}: {
  open: boolean;
  onClose: () => void;
  images: string[];
  index: number;
  onIndexChange: (index: number) => void;
  alt: string;
  title?: string;
}) {
  if (images.length === 0) return null;

  const safeIndex = ((index % images.length) + images.length) % images.length;
  const src = images[safeIndex] ?? images[0];
  const hasMany = images.length > 1;

  return (
    <Modal open={open} onClose={onClose} title={title} size="xl">
      <div className="space-y-4">
        <div className="relative flex min-h-[40vh] items-center justify-center rounded-2xl bg-bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[70vh] w-full object-contain"
          />
          {hasMany ? (
            <>
              <button
                type="button"
                aria-label="Poprzednie zdjęcie"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-ink shadow-sm hover:bg-white"
                onClick={() =>
                  onIndexChange(
                    (safeIndex - 1 + images.length) % images.length,
                  )
                }
              >
                Poprzednie
              </button>
              <button
                type="button"
                aria-label="Następne zdjęcie"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-ink shadow-sm hover:bg-white"
                onClick={() =>
                  onIndexChange((safeIndex + 1) % images.length)
                }
              >
                Następne
              </button>
            </>
          ) : null}
        </div>

        {hasMany ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((thumb, i) => (
              <button
                key={thumb}
                type="button"
                aria-label={`Zdjęcie ${i + 1}`}
                aria-current={i === safeIndex}
                onClick={() => onIndexChange(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-bg-muted ${
                  i === safeIndex
                    ? "border-primary"
                    : "border-transparent hover:border-border"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
