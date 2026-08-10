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
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Kontakt
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          Napisz lub zadzwoń
        </h1>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-ink">Opis</dt>
            <dd className="text-ink-muted">{site.description}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Adres</dt>
            <dd className="text-ink-muted">{site.address}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Telefon</dt>
            <dd>
              <a href={site.phoneHref} className="text-primary">
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">E-mail</dt>
            <dd>
              <a href={`mailto:${site.email}`} className="text-primary">
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
        <div className="relative mt-8 h-56 overflow-hidden rounded-3xl border border-border bg-bg-muted">
          <Image
            src="/streetview-komis.png"
            alt="Street View komisu AutoZakątek przy DW719"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">Formularz</h2>
        <div className="mt-5">
          <ContactLeadForm />
        </div>
      </div>
    </div>
  );
}
