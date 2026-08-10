import { site } from "@/lib/site";

export function DemoBanner() {
  return (
    <div className="bg-ink px-4 py-2 text-center text-xs text-white/90 sm:text-sm">
      {site.demoNote}
    </div>
  );
}
