"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { loginDemo } from "@/lib/client-auth-demo";
import { Button, Field, inputClass } from "@/components/ui/Form";

export function ClientLoginForm({
  redirectTo = "/panel-klienta",
  onSuccess,
  demoOnly = false,
}: {
  redirectTo?: string;
  onSuccess?: () => void;
  /** Tylko podgląd UI, bez zapisu sesji i przekierowania. */
  demoOnly?: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (demoOnly) {
      setError("Demo: logowanie jest niedostępne. Poniżej zobacz podgląd panelu.");
      return;
    }
    setLoading(true);
    const session = loginDemo(email, password);
    setLoading(false);
    if (!session) {
      setError("Podaj e-mail i hasło.");
      return;
    }
    onSuccess?.();
    router.push(redirectTo);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="E-mail">
        <input
          type="email"
          className={inputClass}
          autoComplete="email"
          placeholder="twoj@email.pl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field label="Hasło">
        <input
          type="password"
          className={inputClass}
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>
      {error ? <p className="text-sm text-primary">{error}</p> : null}
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Logowanie..." : "Zaloguj się do Panelu Klienta"}
      </Button>
      <div className="flex flex-wrap gap-4 text-sm">
        <button
          type="button"
          className="font-medium text-primary hover:underline"
          onClick={() =>
            setError("Demo: rejestracja będzie dostępna w wersji produkcyjnej.")
          }
        >
          Załóż konto
        </button>
        <button
          type="button"
          className="font-medium text-ink-muted hover:text-ink"
          onClick={() =>
            setError("Demo: reset hasła będzie dostępny w wersji produkcyjnej.")
          }
        >
          Nie pamiętam hasła
        </button>
      </div>
    </form>
  );
}
