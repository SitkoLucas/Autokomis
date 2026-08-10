import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={site.shortName}>
            <img
              src="/logo-autokomisu.png"
              alt={site.shortName}
              className="h-14 w-14 rounded-full object-cover"
              width={56}
              height={56}
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-semibold tracking-tight text-ink">
                {site.shortName}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Procforce
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            Cyfrowy sprzedawca autokomisu dostępny 24/7. Demo możliwości
            Procforce dla nowoczesnej sprzedaży samochodów.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Nawigacja</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>
              <Link href="/oferta" className="hover:text-ink">
                Oferta
              </Link>
            </li>
            <li>
              <Link href="/rezerwacje" className="hover:text-ink">
                Rezerwacje
              </Link>
            </li>
            <li>
              <Link href="/sprzedaj" className="hover:text-ink">
                Sprzedaj auto
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-ink">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li>{site.address}</li>
            <li>
              <a href={site.phoneHref} className="hover:text-ink">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-ink">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-center text-xs text-ink-muted sm:text-left">
            {site.demoNote} Strona demonstracyjna Procforce.
          </p>
          <a
            href="https://procforce.pl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-3"
            aria-label="Procforce - partner technologiczny"
          >
            <span className="text-sm font-medium text-ink-muted">
              Partner technologiczny
            </span>
            <img
              src="/procforce-logo.svg"
              alt="Procforce"
              className="h-7 w-auto"
              width={140}
              height={45}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
