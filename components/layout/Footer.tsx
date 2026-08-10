import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-ink">AutoKomis</p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Procforce
          </p>
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
              <Link href="/#sprzedaj" className="hover:text-ink">
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
      <div className="border-t border-border px-4 py-4 text-center text-xs text-ink-muted">
        {site.demoNote} Strona demonstracyjna Procforce.
      </div>
    </footer>
  );
}
