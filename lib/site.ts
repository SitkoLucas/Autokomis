export const site = {
  name: "AutoKomis Procforce",
  shortName: "AutoKomis",
  description: "Komis samochodowy",
  phone: "+48 510 484 037",
  phoneHref: "tel:+48510484037",
  email: "kontakt@autokomis-procforce.pl",
  whatsapp: "48510484037",
  address: "Wiejska 2 Grodzisk Mazowiecki",
  hours: [
    { days: "Poniedziałek-piątek", time: "9:00-18:00" },
    { days: "Sobota", time: "9:00-14:00" },
    { days: "Niedziela", time: "Umów spotkanie" },
  ],
  demoNote: "Wersja prezentacyjna. Przykładowe treści i oferty.",
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function vehicleWhatsappMessage(
  make: string,
  model: string,
  version: string,
): string {
  const name = [make, model, version].filter(Boolean).join(" ");
  return `Dzień dobry, jestem zainteresowany ${name} z Państwa oferty. Czy samochód jest nadal dostępny?`;
}
