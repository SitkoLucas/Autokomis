"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/oferta", label: "Oferta" },
  { href: "/#sprzedaj", label: "Sprzedaj auto" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-tight text-ink">
            AutoKomis
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            Procforce
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/oferta"
                ? pathname.startsWith("/oferta")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark sm:inline-flex"
          >
            Zadzwoń
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-4 flex-col gap-1">
              <span className="block h-0.5 w-full bg-ink" />
              <span className="block h-0.5 w-full bg-ink" />
              <span className="block h-0.5 w-full bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              Zadzwoń: {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
