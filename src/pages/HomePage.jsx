import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import BookingProblem from "../components/home/BookingProblem";
import AdvantagesSection from "../components/home/AdvantagesSection";
import FacilitiesSection from "../components/home/FacilitiesSection";
import BookingSteps from "../components/home/BookingSteps";
import HomeCTA from "../components/home/HomeCTA";
import "../styles/homepage.css";

export default function HomePage() {
  useEffect(() => {
    document.documentElement.classList.add("gb-home-active");
    return () => document.documentElement.classList.remove("gb-home-active");
  }, []);

  return (
    <div className="gb-home">
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
