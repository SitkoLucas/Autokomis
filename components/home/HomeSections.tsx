import Link from "next/link";
import { SellLeadForm } from "@/components/flows/LeadForms";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";
import { getFeaturedVehicles } from "@/lib/vehicles";

export function FeaturedVehicles() {
  const list = getFeaturedVehicles(6);
  return (
    <Section id="wybrane">
      <SectionHeading
        eyebrow="Oferta"
        title="Najnowsze samochody"
        description="Aktualna oferta. Kliknij auto, żeby zobaczyć zdjęcia, opis i warunki zakupu."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => (
          <VehicleCard key={v.slug} vehicle={v} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/oferta"
          className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90"
        >
          Zobacz całą ofertę
        </Link>
      </div>
    </Section>
  );
}

const trustItems = [
  {
    title: "Sprawdzony VIN",
    text: "Numer VIN sprawdzony, dane zgodne z dokumentami.",
  },
  {
    title: "Historia pojazdu",
    text: "Przebieg, serwis i naprawy w przejrzystym raporcie.",
  },
  {
    title: "Możliwość sprawdzenia w serwisie",
    text: "Możesz sprawdzić auto u niezależnego mechanika przed zakupem.",
  },
  {
    title: "Pomiar lakieru",
    text: "Grubość lakieru zmierzona, poprawki wskazane bez owijania.",
  },
  {
    title: "Udokumentowane pochodzenie",
    text: "Pełna dokumentacja pochodzenia i własności.",
  },
  {
    title: "Finansowanie",
    text: "Rata dopasowana do Ciebie: kredyt lub leasing.",
  },
  {
    title: "Auto w rozliczeniu",
    text: "Twoje auto w rozliczeniu, wycena online w kilka minut.",
  },
];

export function TrustSection() {
  return (
    <Section id="zaufanie" muted>
      <SectionHeading
        eyebrow="Zaufanie"
        title="Kupujesz ze spokojem"
        description="Co robimy, zanim auto trafi do Ciebie. Transparentnie, bez niespodzianek."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-border bg-white px-5 py-6"
          >
            <div className="mb-3 h-1.5 w-10 rounded-full bg-primary" />
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="mt-2 text-sm text-ink-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const whyItems = [
  {
    title: "Selekcja zamiast chaosu",
    text: "Pokazujemy auta, które da się sprzedać z czystym sumieniem: historia, stan, warunki.",
  },
  {
    title: "Kontakt w kilka sekund",
    text: "Telefon, WhatsApp, zapytanie, oględziny i rezerwacja. Klient nie zgaduje, co robić dalej.",
  },
  {
    title: "Sprzedaż także po godzinach",
    text: "Strona pracuje jak cyfrowy sprzedawca 24/7: zbiera leady, gdy salon jest zamknięty.",
  },
  {
    title: "Odkup i rozliczenie",
    text: "Drugi funnel: klient może sprzedać auto albo zostawić je w rozliczeniu bez dzwonienia w ciemno.",
  },
];

export function WhyUs() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Dlaczego my"
        title="Dlaczego warto kupić u nas"
        description="Od pierwszego wejścia klient dostaje pełną opiekę: dokładne informacje o pojeździe, możliwość jazdy próbnej i sprawdzenia auta pod każdym kątem, którego potrzebuje. To nie wizytówka komisu, tylko platforma sprzedażowa online, która od razu buduje zaufanie i prowadzi do kontaktu."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {whyItems.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-border px-6 py-7"
          >
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function SellCarSection() {
  return (
    <Section id="sprzedaj" muted>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Odkup
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Chcesz sprzedać samochód?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Otrzymaj wstępną wycenę. W produkcji lead trafi prosto do komisu.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-white p-6">
          <SellLeadForm mode="sell" />
        </div>
      </div>
    </Section>
  );
}

export function TradeInSection() {
  return (
    <Section id="rozliczenie">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Rozliczenie
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Zostaw auto w rozliczeniu
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Kupujesz z oferty i oddajesz poprzednie auto? Zostaw dane. Na detailu
            auta formularz pamięta, którym samochodem jesteś zainteresowany.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-bg-muted p-6">
          <SellLeadForm mode="trade-in" />
        </div>
      </div>
    </Section>
  );
}

const steps = [
  { title: "Wybierz auto", text: "Filtry, rata, historia i zdjęcia premium." },
  {
    title: "Skontaktuj się",
    text: "Telefon, zapytanie, WhatsApp albo umów oględziny.",
  },
  {
    title: "Zarezerwuj spokojnie",
    text: "1% ceny za dzień roboczy (max 10 dni). Niewstawienie się oznacza przepadek zaliczki.",
  },
  {
    title: "Odbierz klucz",
    text: "Jasne warunki i domknięcie sprzedaży w salonie.",
  },
];

export function PurchaseProcess() {
  return (
    <Section muted>
      <SectionHeading
        eyebrow="Proces"
        title="Jak wygląda zakup"
        description="Prosty flow od pierwszego kliknięcia do odbioru."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="rounded-3xl border border-border bg-white px-5 py-6"
          >
            <p className="text-sm font-semibold text-primary">0{i + 1}</p>
            <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ReviewsSection() {
  return (
    <Section id="opinie">
      <SectionHeading
        eyebrow="Opinie"
        title="Co mówią klienci"
        description="Przykładowe opinie demonstracyjne. Nie pochodzą z realnego komisu."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.id}
            className="rounded-3xl border border-border bg-white px-6 py-7"
          >
            <div className="text-primary" aria-label={`${r.rating} na 5`}>
              {"★".repeat(r.rating)}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-ink">
              „{r.text}”
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold text-ink-muted">
              {r.name} · opinia demo
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function ContactTeaser() {
  return (
    <Section id="kontakt" muted>
      <div className="grid gap-8 rounded-[2rem] border border-border bg-white px-6 py-10 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Kontakt
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            Odwiedź nas albo napisz
          </h2>
          <p className="mt-4 max-w-lg text-ink-muted">
            Dane poniżej są przykładowe. Po wdrożeniu podmienimy je na prawdziwy
            adres, telefon i mapę komisu.
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-ink">Adres</dt>
              <dd className="text-ink-muted">{site.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Telefon</dt>
              <dd>
                <a href={site.phoneHref} className="text-primary hover:underline">
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
              <li key={h.days} className="flex justify-between gap-4 border-b border-border py-2">
                <span>{h.days}</span>
                <span className="font-medium text-ink">{h.time}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Formularz kontaktowy
          </Link>
        </div>
      </div>
    </Section>
  );
}
