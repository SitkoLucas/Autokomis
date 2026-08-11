export type PhotoSlotDef = {
  id: string;
  label: string;
  hint: string;
  required: boolean;
  multiple?: boolean;
};

export const CONSIGNMENT_PHOTO_SLOTS: PhotoSlotDef[] = [
  {
    id: "front",
    label: "Przód samochodu",
    hint: "Stań kilka metrów przed autem i pokaż cały samochód.",
    required: true,
  },
  {
    id: "rear",
    label: "Tył samochodu",
    hint: "Pokaż tył auta w całości.",
    required: true,
  },
  {
    id: "left",
    label: "Lewy bok",
    hint: "Ustaw się tak, by widać było cały lewy bok.",
    required: true,
  },
  {
    id: "right",
    label: "Prawy bok",
    hint: "Ustaw się tak, by widać było cały prawy bok.",
    required: true,
  },
  {
    id: "interior-front",
    label: "Wnętrze z przodu",
    hint: "Zrób zdjęcie foteli z przodu, drzwi otwarte.",
    required: true,
  },
  {
    id: "rear-seats",
    label: "Tylna kanapa",
    hint: "Pokaż tylną kanapę i przestrzeń z tyłu.",
    required: true,
  },
  {
    id: "dashboard",
    label: "Deska rozdzielcza",
    hint: "Zdjęcie kokpitu z kierownicą i ekranem.",
    required: true,
  },
  {
    id: "odometer",
    label: "Licznik",
    hint: "Zrób wyraźne zdjęcie aktualnego przebiegu.",
    required: true,
  },
  {
    id: "trunk",
    label: "Bagażnik",
    hint: "Otwórz bagażnik i pokaż przestrzeń ładunkową.",
    required: true,
  },
  {
    id: "engine",
    label: "Silnik",
    hint: "Otwórz maskę i sfotografuj komorę silnika.",
    required: false,
  },
  {
    id: "extra",
    label: "Dodatkowe zdjęcia",
    hint: "Uszkodzenia, felgi, dokumenty, detale.",
    required: false,
    multiple: true,
  },
];

export type SlotPhoto = {
  id: string;
  slotId: string;
  name: string;
  dataUrl: string;
};
