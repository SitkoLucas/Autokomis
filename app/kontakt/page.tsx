import type { Metadata } from "next";
import Image from "next/image";
import { ContactLeadForm } from "@/components/flows/LeadForms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się z AutoKomis Procforce. Dane przykładowe (demo).",
};

export default function KontaktPage() {
  return (
    <div className="bg-bg-muted">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6">
        <div className="grid gap-8 rounded-[2rem] border border-border bg-white px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Kontakt
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Odwiedź nas albo napisz
            </h1>
            <p className="mt-4 max-w-lg text-ink-muted">
              Dane poniżej są przykładowe. Po wdrożeniu podmienimy je na prawdziwy
              adres, telefon i mapę komisu.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-ink">Adres</dt>
                <dd className="text-ink">{site.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Telefon</dt>
                <dd>
                  <a
                    href={site.phoneHref}
                    className="text-primary hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">E-mail</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-primary hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="font-semibold text-ink">Godziny otwarcia</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {site.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between gap-4 border-b border-border py-2"
                >
                  <span>{h.days}</span>
                  <span className="font-medium text-ink">{h.time}</span>
                </li>
              ))}
            </ul>
            <a
              href="#formularz"
              className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Formularz kontaktowy
            </a>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative h-64 overflow-hidden rounded-3xl border border-border bg-white sm:h-80">
            <Image
              src="/streetview-komis.png"
              alt="Street View komisu AutoZakątek przy DW719"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div
            id="formularz"
            className="scroll-mt-24 rounded-3xl border border-border bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-ink">Formularz</h2>
            <div className="mt-5">
              <ContactLeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
