export type LeadType =
  | "inquiry"
  | "booking"
  | "reserve"
  | "financing"
  | "sell"
  | "trade-in"
  | "contact";

export type InquiryContext = {
  vehicleSlug: string;
  vehicleName: string;
  price: number;
  vehicleUrl: string;
};

export type LeadPayload = {
  type: LeadType;
  name: string;
  phone: string;
  message?: string;
  vehicle?: InquiryContext;
  bookingDate?: string;
  bookingTime?: string;
  tradeIn?: {
    make: string;
    model: string;
    year: string;
    mileage: string;
  };
  interestedInSlug?: string;
};

export async function submitLeadDemo(payload: LeadPayload): Promise<void> {
  // Demo: brak backendu. W produkcji: CRM / e-mail / SMS.
  await new Promise((r) => setTimeout(r, 450));
  if (typeof window !== "undefined") {
    console.info("[AutoKomis demo lead]", payload);
    try {
      const key = "autokomis-demo-leads";
      const prev = JSON.parse(sessionStorage.getItem(key) || "[]") as LeadPayload[];
      prev.push({ ...payload });
      sessionStorage.setItem(key, JSON.stringify(prev));
    } catch {
      // ignore storage errors
    }
  }
}
