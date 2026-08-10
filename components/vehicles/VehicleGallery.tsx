"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { easeApple, modalBackdrop } from "@/lib/motion";

export function VehicleGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const open = (index: number) => setLightbox(index);
  const close = () => setLightbox(null);

  const next = useCallback(() => {
    setLightbox((i) => (i == null ? i : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setLightbox((i) =>
      i == null ? i : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev]);

  const main = images[0];
  const side = images.slice(1);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
        <button
          type="button"
          onClick={() => open(0)}
          className="relative col-span-1 aspect-[4/3] overflow-hidden rounded-3xl bg-bg-muted md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[420px]"
        >
          <Image
            src={main}
            alt={alt}
            fill
            priority
            className="object-cover transition duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </button>
        {side.length ? (
          side.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => open(i + 1)}
              className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl bg-bg-muted md:block"
            >
              <Image
                src={src}
                alt={`${alt} ${i + 2}`}
                fill
                className="object-cover transition duration-700 hover:scale-105"
                sizes="33vw"
              />
            </button>
          ))
        ) : (
          <button
            type="button"
            onClick={() => open(0)}
            className="relative hidden overflow-hidden rounded-3xl bg-bg-muted md:col-span-1 md:row-span-2 md:block"
          >
            <Image src={main} alt={alt} fill className="object-cover" sizes="33vw" />
          </button>
        )}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => open(i)}
            className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-bg-muted"
          >
            <Image src={src} alt="" fill className="object-cover" sizes="112px" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox != null ? (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <motion.button
              type="button"
              aria-label="Zamknij galerię"
              className="absolute inset-0 bg-ink/90"
              variants={modalBackdrop}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={close}
            />
            <motion.div
              className="relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, ease: easeApple } }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="relative h-[70vh] w-full">
                <Image
                  src={images[lightbox]}
                  alt={`${alt} ${lightbox + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
                >
                  Poprzednie
                </button>
                <span className="text-sm text-white/80">
                  {lightbox + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
                >
                  Następne
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink"
                >
                  Zamknij
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
