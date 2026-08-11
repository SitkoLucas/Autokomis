"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClientLoginForm } from "@/components/client/ClientLoginForm";
import { Button } from "@/components/ui/Form";
import { getClientSession } from "@/lib/client-auth-demo";

const benefits = [
  "nie musisz sam odbierać telefonów",
  "nie musisz umawiać oględzin",
  "komis profesjonalnie prezentuje samochód",
  "auto trafia do istniejącej bazy klientów komisu",
  "komis zajmuje się negocjacjami",
  "warunki sprzedaży i prowizja są ustalane wcześniej",
  "zachowujesz własność auta do momentu sprzedaży",
];

const processSteps = [
  {
    title: "Zgłaszasz samochód",
    text: "Dodajesz dane auta, wyposażenie, oczekiwaną cenę i zdjęcia.",
  },
  {
    title: "Komis weryfikuje zgłoszenie",
    text: "Sprawdzamy samochód i decydujemy, czy możemy przyjąć go do sprzedaży.",
  },
  {
    title: "Ustalamy warunki",
    text: "Komis ustala z właścicielem cenę sprzedaży oraz prowizję.",
  },
  {
    title: "Samochód trafia do oferty",
    text: "Po zaakceptowaniu warunków przygotowujemy profesjonalne ogłoszenie i publikujemy samochód pod marką komisu.",
  },
  {
    title: "Zajmujemy się sprzedażą",
    text: "Klienci kontaktują się z komisem. Komis obsługuje zapytania, prezentację samochodu i proces sprzedaży.",
  },
  {
    title: "Rozliczamy sprzedaż",
    text: "Po sprzedaży komis pobiera ustaloną prowizję, a pozostała kwota trafia do właściciela samochodu.",
  },
];

export function ConsignmentLanding() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(Boolean(getClientSession()));
  }, []);

  function scrollToLogin() {
    document.getElementById("logowanie")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="space-y-20">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Sprzedaż komisowa
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Wstaw auto w komis
        </h1>
        <p className="mt-5 text-lg text-ink">
          Nie chcesz sprzedawać samochodu samodzielnie? Powierz sprzedaż nam.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-muted">
          Twój samochód pozostaje Twoją własnością, a komis zajmuje się
          przygotowaniem oferty, kontaktem z kupującymi i sprzedażą. Po
          sprzedaży otrzymujesz ustaloną kwotę, a komis pobiera wcześniej
          uzgodnioną prowizję.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {loggedIn ? (
            <Button onClick={() => router.push("/panel-klienta")}>
              Przejdź do Panelu Klienta
            </Button>
          ) : (
            <Button onClick={scrollToLogin}>Przejdź do Panelu Klienta</Button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-ink">
          Jak działa sprzedaż komisowa?
        </h2>
        <ol className="mt-8 space-y-6">
          {processSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-border bg-bg-muted/40 px-6 py-10 sm:px-10">
        <h2 className="text-2xl font-semibold text-ink">
          Dlaczego warto wstawić auto w komis?
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {benefits.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-ink-muted">
              <span className="mt-1 text-primary" aria-hidden>
                ✓
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold text-ink">
          Wybierz model współpracy
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-6">
            <h3 className="font-semibold text-ink">Sprzedaj auto komisowi</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Komis kupuje samochód od Ciebie. Szybka wycena i bezpośredni
              odkup.
            </p>
            <Link
              href="/sprzedaj"
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Przejdź do odkupu
            </Link>
          </div>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
            <h3 className="font-semibold text-ink">Wstaw auto w komis</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Samochód nadal należy do Ciebie, a komis sprzedaje go w Twoim
              imieniu za ustaloną prowizję.
            </p>
            <button
              type="button"
              onClick={scrollToLogin}
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Zgłoś auto do weryfikacji
            </button>
          </div>
        </div>
      </section>

      <section
        id="logowanie"
        className="mx-auto max-w-md scroll-mt-24 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
      >
        <h2 className="text-xl font-semibold text-ink">
          Masz samochód do sprzedaży?
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Zaloguj się do Panelu Klienta i dodaj samochód do weryfikacji.
        </p>
        <div className="mt-6">
          <ClientLoginForm />
        </div>
      </section>
    </div>
  );
}
