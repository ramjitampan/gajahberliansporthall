import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import BookingProblem from "../components/home/BookingProblem";
import AdvantagesSection from "../components/home/AdvantagesSection";
import FacilitiesSection from "../components/home/FacilitiesSection";
import BookingSteps from "../components/home/BookingSteps";
import HomeCTA from "../components/home/HomeCTA";

export default function HomePage() {
  return (
    <div className="bg-[#102a22] text-ink">
      <HeroSection />
      <AboutSection />
      <BookingProblem />
      <AdvantagesSection />
      <FacilitiesSection />
      <BookingSteps />
      <HomeCTA />
    </div>
  );
}
