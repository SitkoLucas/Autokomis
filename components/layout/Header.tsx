"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/oferta", label: "Oferta" },
  { href: "/rezerwacje", label: "Rezerwacje" },
  { href: "/sprzedaj", label: "Sprzedaj auto" },
  { href: "/wstaw-auto-w-komis", label: "Wstaw auto w komis" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/panel-klienta", label: "(Panel Klienta)" },
  { href: "/panel-szefa", label: "(Panel Szefa)" },
];

function isActive(pathname: string, href: string) {
  if (href === "/oferta") {
    return pathname.startsWith("/oferta");
  }
  if (
    href === "/rezerwacje" ||
    href === "/sprzedaj" ||
    href === "/wstaw-auto-w-komis" ||
    href === "/panel-klienta" ||
    href === "/panel-szefa"
  ) {
    return pathname.startsWith(href);
  }
  return pathname === href;
}

function getActiveIndex(pathname: string) {
  return links.findIndex((link) => isActive(pathname, link.href));
}

function getAdjacentHref(pathname: string, direction: "prev" | "next") {
  const activeIndex = getActiveIndex(pathname);
  const currentIndex =
    activeIndex === -1
      ? direction === "next"
        ? -1
        : 0
      : activeIndex;

  const offset = direction === "next" ? 1 : -1;
  const nextIndex =
    (currentIndex + offset + links.length) % links.length;

  return links[nextIndex].href;
}

function ChevronLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const activeIndex = getActiveIndex(pathname);
  const activeLabel =
    activeIndex === -1 ? "Strona główna" : links[activeIndex].label;
  const prevHref = getAdjacentHref(pathname, "prev");
  const nextHref = getAdjacentHref(pathname, "next");

  const navButtonClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/90 text-ink shadow-sm backdrop-blur-md transition hover:bg-white";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 max-md:grid max-md:grid-cols-[auto_1fr_auto] max-md:gap-3 sm:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label={site.shortName}
          >
            <img
              src="/logo-autokomisu.png"
              alt={site.shortName}
              className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
              width={48}
              height={48}
            />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-base font-semibold tracking-tight text-ink">
                {site.shortName}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Procforce
              </span>
            </span>
          </Link>

          <p
            className="truncate text-center text-sm font-semibold text-primary md:hidden"
            aria-current={activeIndex !== -1 ? "page" : undefined}
          >
            {activeLabel}
          </p>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
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

          <div className="flex items-center justify-end gap-2">
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
              aria-expanded={open}
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
              {links.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium ${
                      active ? "text-primary" : "text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
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

      <nav
        className="fixed bottom-4 left-4 z-30 md:hidden"
        aria-label="Poprzednia zakładka"
      >
        <Link
          href={prevHref}
          className={navButtonClass}
          aria-label="Poprzednia zakładka"
        >
          <ChevronLeftIcon />
        </Link>
      </nav>

      <nav
        className="fixed bottom-4 right-4 z-30 md:hidden"
        aria-label="Następna zakładka"
      >
        <Link
          href={nextHref}
          className={navButtonClass}
          aria-label="Następna zakładka"
        >
          <ChevronRightIcon />
        </Link>
      </nav>
    </>
  );
}
