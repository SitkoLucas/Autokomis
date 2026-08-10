import type { EquipmentGroup } from "./vehicles";

/** Katalog wyposażenia do szybkiego klikania w Panelu Szefa (posegregowany tematycznie). */
export const equipmentCatalog: EquipmentGroup[] = [
  {
    category: "Bezpieczeństwo",
    items: [
      "ABS, ESP, kontrola trakcji",
      "Przednie, boczne i inne poduszki powietrzne",
      "Czujniki parkowania tył",
      "Czujnik ciśnienia opon",
      "ISOFIX",
      "Mocowanie Isofix na fotelu pasażera",
      "Immobilizer",
      "Wspomaganie hamowania awaryjnego",
      "Rozpoznawanie znaków drogowych",
      "Euro 6, naklejka emisyjna 4 (zielona)",
    ],
  },
  {
    category: "Światła",
    items: [
      "Reflektory LED",
      "Światła do jazdy dziennej",
      "Światła przeciwmgielne",
      "Czujnik deszczu i światła",
    ],
  },
  {
    category: "Komfort wnętrza",
    items: [
      "Klimatyzacja automatyczna, 2 strefy",
      "Podgrzewane siedzenia",
      "Kierownica skórzana, wielofunkcyjna",
      "Podłokietnik",
      "Pojazd dla niepalących",
    ],
  },
  {
    category: "Asysty jazdy",
    items: [
      "Tempomat",
      "System kontroli dozwolonej prędkości",
      "System start-stop",
    ],
  },
  {
    category: "Szyby i lusterka",
    items: [
      "Elektryczne szyby",
      "Elektrycznie sterowane, składane lusterka boczne",
      "Przyciemniane szyby",
      "Automatycznie przyciemniane lusterko wewnętrzne",
      "Centralny zamek",
    ],
  },
  {
    category: "Koła i zawieszenie",
    items: [
      "Alufelgi",
      "Sportowe zawieszenie",
      "Opony zimowe",
      "Zestaw naprawczy opony",
      "Napęd na przednie koła",
    ],
  },
  {
    category: "Audio i multimedia",
    items: [
      "MMI Navigationssystem",
      "Audi Sound System / DSP",
      "Bluetooth",
      "Zestaw głośnomówiący",
      "Tuner/radio",
      "Odtwarzacz CD",
      "Port USB",
      "Komputer pokładowy",
    ],
  },
];

export function buildEquipmentFromSelection(
  selected: Record<string, string[]>,
): EquipmentGroup[] {
  return equipmentCatalog
    .map((group) => ({
      category: group.category,
      items: (selected[group.category] ?? []).filter((item) =>
        group.items.includes(item),
      ),
    }))
    .filter((group) => group.items.length > 0);
}

export function countSelectedEquipment(
  selected: Record<string, string[]>,
): number {
  return Object.values(selected).reduce((sum, items) => sum + items.length, 0);
}
