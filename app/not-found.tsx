import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-ink">Nie znaleziono</h1>
      <p className="mt-3 text-ink-muted">
        Ta strona lub samochód nie istnieje w demo.
      </p>
      <Link
        href="/oferta"
        className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
      >
        Wróć do oferty
      </Link>
    </div>
  );
}
