"use client";

import { useState } from "react";
import { logoutDemo } from "@/lib/client-auth-demo";
import type { ClientSession } from "@/lib/client-auth-demo";
import { ConsignmentWizardForm } from "./ConsignmentWizardForm";
import { MyConsignmentsPanel } from "./MyConsignmentsPanel";

type TabId = "add" | "mine";

export function ClientPanel({
  session,
  demoMode = false,
  showAllListings = false,
}: {
  session: ClientSession;
  demoMode?: boolean;
  showAllListings?: boolean;
}) {
  const [tab, setTab] = useState<TabId>("add");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {demoMode ? "Podgląd jako:" : "Zalogowano:"}{" "}
          <span className="font-medium text-ink">{session.email}</span>
        </p>
        {demoMode ? (
          <span className="text-xs font-medium text-ink-muted">Tryb demo</span>
        ) : (
          <button
            type="button"
            onClick={() => {
              logoutDemo();
              window.location.reload();
            }}
            className="text-sm font-medium text-primary hover:underline"
          >
            Wyloguj
          </button>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Sekcje panelu klienta"
        className="flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {(
          [
            { id: "add" as const, label: "Wstaw auto w komis" },
            { id: "mine" as const, label: "Moje zgłoszenia" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? "bg-primary text-white"
                : "border border-border bg-white text-ink hover:bg-bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8" role="tabpanel">
        {tab === "add" ? (
          <ConsignmentWizardForm defaultEmail={session.email} />
        ) : null}
        {tab === "mine" ? (
          <MyConsignmentsPanel
            clientEmail={session.email}
            showAll={showAllListings}
          />
        ) : null}
      </div>
    </div>
  );
}
