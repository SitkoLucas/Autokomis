"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button, Field, inputClass } from "@/components/ui/Form";
import { serializeFilters } from "@/lib/filters";
import { imageReveal } from "@/lib/motion";
import { getMakes, getModelsForMake } from "@/lib/vehicles";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        variants={imageReveal}
        initial="hidden"
        animate="show"
      >
        <Image
          src="/vehicles/porsche-911.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
        <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          AutoKomis Procforce
        </p>
        <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
          Samochody, które warto kupić.
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-muted">
          Pewna historia. Jasne warunki. Bez niespodzianek.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/oferta"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Zobacz ofertę
          </Link>
          <Link
            href="/#sprzedaj"
            className="inline-flex rounded-full border border-ink/15 bg-white/80 px-6 py-3 text-sm font-semibold text-ink backdrop-blur hover:bg-white"
          >
            Sprzedaj auto
          </Link>
        </div>
      </div>
    </section>
  );
}

export function QuickSearch() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const models = useMemo(() => getModelsForMake(make || undefined), [make]);

  return (
    <section id="szukaj" className="relative z-10 -mt-10 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-white p-5 shadow-[0_30px_80px_-48px_rgba(17,17,17,0.45)] sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Szybkie wyszukiwanie
            </h2>
            <p className="text-sm text-ink-muted">
              Znajdź auto i przejdź od razu do oferty.
            </p>
          </div>
        </div>
        <form
          className="mt-5 grid gap-3 md:grid-cols-4"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(
              `/oferta${serializeFilters({
                make: make || undefined,
                model: model || undefined,
                priceTo: priceTo ? Number(priceTo) : undefined,
                sort: "newest",
              })}`,
            );
          }}
        >
          <Field label="Marka">
            <select
              className={inputClass}
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
              }}
            >
              <option value="">Wszystkie</option>
              {getMakes().map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Model">
            <select
              className={inputClass}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="">Wszystkie</option>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Cena do">
            <input
              className={inputClass}
              type="number"
              inputMode="numeric"
              placeholder="np. 200000"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </Field>
          <div className="flex items-end">
            <Button type="submit" className="w-full py-3">
              Pokaż auta
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
