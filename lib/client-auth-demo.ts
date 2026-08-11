export type ClientSession = {
  email: string;
  loggedInAt: string;
};

/** Sesja podglądowa na stronie Panel Klienta (demo bez logowania). */
export const DEMO_CLIENT_SESSION: ClientSession = {
  email: "demo@klient.pl",
  loggedInAt: "2026-08-01",
};

const SESSION_KEY = "autokomis-demo-client-session";

export function getClientSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ClientSession;
  } catch {
    return null;
  }
}

export function loginDemo(email: string, password: string): ClientSession | null {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password.trim()) return null;
  const session: ClientSession = {
    email: trimmedEmail,
    loggedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutDemo(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}
