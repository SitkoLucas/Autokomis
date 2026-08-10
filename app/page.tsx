import { FeaturedVehicles, PurchaseProcess, ReviewsSection, TradeInSection, TrustSection, WhyUs } from "@/components/home/HomeSections";
import { Hero } from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <TrustSection />
      <WhyUs />
      <TradeInSection />
      <PurchaseProcess />
      <ReviewsSection />
    </>
  );
}
