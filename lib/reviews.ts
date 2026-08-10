export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
};

/** Przykładowe opinie wyłącznie na potrzeby demo prezentacyjnego. */
export const reviews: Review[] = [
  {
    id: "1",
    name: "Anna K.",
    rating: 5,
    text: "Szybki kontakt, jasne warunki i zero niespodzianek przy odbiorze. Tak powinno wyglądać kupno auta.",
  },
  {
    id: "2",
    name: "Marek W.",
    rating: 5,
    text: "Umówiłem oględziny online, dostałem pełną historię pojazdu i mogłem spokojnie podjąć decyzję.",
  },
  {
    id: "3",
    name: "Joanna P.",
    rating: 5,
    text: "Zostawiłam poprzednie auto w rozliczeniu. Proces był prosty, a komunikacja bardzo konkretna.",
  },
];
