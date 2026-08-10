import { FeaturedVehicles, ContactTeaser, PurchaseProcess, ReviewsSection, SellCarSection, TradeInSection, TrustSection, WhyUs } from "@/components/home/HomeSections";
import { Hero, QuickSearch } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickSearch />
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
