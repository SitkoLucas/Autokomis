import { FeaturedVehicles, ContactTeaser, PurchaseProcess, ReviewsSection, SellCarSection, TradeInSection, TrustSection, WhyUs } from "@/components/home/HomeSections";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <TrustSection />
      <WhyUs />
      <SellCarSection />
      <TradeInSection />
      <PurchaseProcess />
      <ReviewsSection />
      <ContactTeaser />
    </>
  );
}
