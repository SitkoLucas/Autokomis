"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { drawerPanel, modalBackdrop } from "@/lib/motion";

export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center md:hidden">
          <motion.button
            type="button"
            aria-label="Zamknij"
            className="absolute inset-0 bg-ink/50"
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative z-10 flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white"
            variants={drawerPanel}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-3 py-1 text-sm text-ink-muted"
              >
                Zamknij
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5 pb-8">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
