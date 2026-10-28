import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import BookingProblem from "../components/home/BookingProblem";
import AdvantagesSection from "../components/home/AdvantagesSection";
import FacilitiesSection from "../components/home/FacilitiesSection";
import BookingSteps from "../components/home/BookingSteps";
import VenueMap from "../components/VenueMap";
import HomeCTA from "../components/home/HomeCTA";

export default function HomePage() {
  return (
    <div className="bg-[#102a22] text-ink dark:bg-[#0c1613]">
      <HeroSection />
      <AboutSection />
      <BookingProblem />
      <AdvantagesSection />
      <FacilitiesSection />
      <BookingSteps />
      <VenueMap className="bg-[#f7f3ea] dark:bg-[#0f1f19]" />
      <HomeCTA />
    </div>
  );
}
