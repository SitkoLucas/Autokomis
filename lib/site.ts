export const site = {
  name: "AutoKomis Procforce",
  shortName: "AutoKomis",
  phone: "+48 000 000 000",
  phoneHref: "tel:+48000000000",
  email: "kontakt@autokomis-procforce.pl",
  whatsapp: "48000000000",
  address: "ul. Przykładowa 1, 00-000 Warszawa",
  hours: [
    { days: "Poniedziałek-piątek", time: "9:00-18:00" },
    { days: "Sobota", time: "9:00-14:00" },
    { days: "Niedziela", time: "Umówione spotkania" },
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
