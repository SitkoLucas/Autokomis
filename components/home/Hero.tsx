"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { imageReveal } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        variants={imageReveal}
        initial="hidden"
        animate="show"
      >
        <div className="absolute top-0 right-0 bottom-[4%] left-[4%] sm:bottom-[5%] sm:left-[5%] md:bottom-[6%] md:left-[6%]">
          <Image
            src="/vehicles/hero-komis.png"
            alt="Autokomis Procforce, plac z samochodami"
            fill
            priority
            className="object-cover object-[52%_38%]"
            sizes="100vw"
          />
        </div>
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
          Sprawdzone pojazdy. Pewna historia. Jasne warunki. Bez niespodzianek. Bez
          czekania.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/oferta"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Zobacz ofertę
          </Link>
          <Link
            href="/#rozliczenie"
            className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
          >
            Zostaw auto w rozliczeniu
          </Link>
          <Link
            href="/sprzedaj"
            className="inline-flex rounded-full border border-ink/15 bg-white/80 px-6 py-3 text-sm font-semibold text-ink backdrop-blur hover:bg-white"
          >
            Sprzedaj auto
          </Link>
        </div>
      </div>
    </section>
  );
}
